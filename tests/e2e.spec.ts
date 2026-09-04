import { expect, test } from '@playwright/test';
import { publicRecipes } from '../src/data/recipes';

const base = '/anko-foto';
const staticRoutes = [
  '/',
  '/recipes/',
  '/controls/',
  '/controls/camera-map/',
  '/controls/pro/',
  '/modes/',
  '/help/',
  '/challenges/',
  '/safety/',
  '/about/'
];
const goalSlugs = [
  'sunset',
  'moving-subject',
  'night-city',
  'people-portrait',
  'pet-action',
  'flower-closeup',
  'food-window-light',
  'wide-landscape',
  'panorama',
  'selfie'
];

test.describe('bilingual static routes', () => {
  for (const locale of ['ja', 'en'] as const) {
    const prefix = locale === 'en' ? '/en' : '';
    test(`${locale} home offers ten one-selection goals within one short scroll`, async ({
      page
    }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${base}${prefix}/`);
      await expect(page.locator('.goal-card')).toHaveCount(10);
      for (const slug of goalSlugs) {
        await page.goto(`${base}${prefix}/`);
        const started = Date.now();
        await page.locator(`.goal-card[href$="/recipes/${slug}/"]`).click();
        const settings = page.locator('.first-settings');
        await expect(settings).toBeVisible();
        expect(Date.now() - started).toBeLessThan(10_000);
        const reach = await settings.evaluate(
          (item) => item.getBoundingClientRect().top + scrollY - innerHeight
        );
        expect(reach).toBeLessThanOrEqual(390);
      }
    });

    test(`${locale} recipe routes all render`, async ({ page }) => {
      for (const recipe of publicRecipes) {
        const response = await page.goto(`${base}${prefix}/recipes/${recipe.slug}/`);
        expect(response?.status()).toBe(200);
        await expect(page.locator('.first-settings')).toBeVisible();
      }
    });
  }

  test('all static pages render with locale parity', async ({ page }) => {
    for (const route of staticRoutes) {
      for (const prefix of ['', '/en']) {
        expect((await page.goto(`${base}${prefix}${route}`))?.status()).toBe(200);
      }
    }
  });

  test('language switch preserves every generated public path', async ({ page }) => {
    const paths = [...staticRoutes, ...publicRecipes.map((recipe) => `/recipes/${recipe.slug}/`)];
    for (const path of paths) {
      await page.goto(`${base}${path}`);
      await expect(page.locator('.language-jump')).toHaveAttribute('href', `${base}/en${path}`);
      await page.goto(`${base}/en${path}`);
      await expect(page.locator('.language-jump')).toHaveAttribute('href', `${base}${path}`);
    }
  });

  test('draft recipes have no public routes', async ({ request }) => {
    expect((await request.get(`${base}/recipes/high-resolution/`)).status()).toBe(404);
    expect((await request.get(`${base}/en/recipes/tilt-shift/`)).status()).toBe(404);
  });
});

for (const width of [360, 390, 430, 768, 1280]) {
  test(`layout at ${width}px has no overflow or bottom-nav overlap`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.addInitScript(() => {
      (window as Window & { __guideCls?: number }).__guideCls = 0;
      new PerformanceObserver((entries) => {
        for (const entry of entries.getEntries() as Array<PerformanceEntry & { value: number }>) {
          (window as Window & { __guideCls?: number }).__guideCls! += entry.value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(`${base}/`);
    await page.waitForLoadState('networkidle');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    const cards = page.locator('.goal-card');
    await expect(cards.first()).toBeVisible();
    if (width < 800) {
      const nav = page.locator('.bottom-nav');
      await expect(nav).toBeVisible();
      const rect = await nav.boundingBox();
      expect(rect?.y).toBeGreaterThan(700);
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      const footerBottom = await page
        .locator('main')
        .evaluate((item) => item.getBoundingClientRect().bottom);
      const navTop = (await nav.boundingBox())?.y ?? 0;
      expect(footerBottom).toBeLessThanOrEqual(navTop + 1);
    }
    const images = await page.locator('img').evaluateAll((items) =>
      items.map((item) => {
        const rect = item.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      })
    );
    expect(images.every((item) => item.width > 0 && item.height > 0)).toBe(true);
    const cls = await page.evaluate(
      () => (window as Window & { __guideCls?: number }).__guideCls ?? 0
    );
    expect(cls).toBeLessThan(0.1);
  });
}

test('keyboard focus follows document order and stays visible', async ({ page }) => {
  await page.goto(`${base}/`);
  const focused: string[] = [];
  for (let i = 0; i < 8; i += 1) {
    await page.keyboard.press('Tab');
    focused.push(
      await page.evaluate(() => document.activeElement?.getAttribute('href') ?? 'control')
    );
  }
  expect(focused[0]).toContain('#_top');
  expect(new Set(focused).size).toBeGreaterThan(3);
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
  expect(outline).not.toBe('none');
});

test('core reading and navigation work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${base}/`);
  await page.locator('.goal-card').first().click();
  await expect(page.locator('.first-settings')).toBeVisible();
  await page.locator('.language-jump').click();
  await expect(page).toHaveURL(/\/en\/recipes\//);
  await context.close();
});

test('runtime resource requests remain same-origin', async ({ page }) => {
  const foreign: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.origin !== 'http://127.0.0.1:4321') foreign.push(request.url());
  });
  for (const route of ['/', '/en/', '/recipes/moving-subject/', '/controls/', '/help/']) {
    await page.goto(`${base}${route}`);
    await page.waitForLoadState('networkidle');
  }
  expect(foreign).toEqual([]);
});

test('screenshot teaching views use inspected marker coordinates', async ({ page }) => {
  await page.goto(`${base}/controls/`);
  await expect(page.locator('.screenshot-card')).toHaveCount(3);
  const expected = [
    [
      '--marker-x:50%;--marker-y:8%',
      '--marker-x:50%;--marker-y:69%',
      '--marker-x:50%;--marker-y:88%',
      '--marker-x:50%;--marker-y:79%'
    ],
    [
      '--marker-x:50%;--marker-y:33%',
      '--marker-x:50%;--marker-y:45%',
      '--marker-x:50%;--marker-y:57%'
    ],
    [
      '--marker-x:30%;--marker-y:8%',
      '--marker-x:89%;--marker-y:18%',
      '--marker-x:50%;--marker-y:68%'
    ]
  ];
  for (const [index, card] of (await page.locator('.screenshot-card').all()).entries()) {
    await expect(card.locator('.screen-marker')).toHaveCount(expected[index].length);
    expect(
      await card
        .locator('.screen-marker')
        .evaluateAll((items) => items.map((item) => item.getAttribute('style')))
    ).toEqual(expected[index]);
  }
});
