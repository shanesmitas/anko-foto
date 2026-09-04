import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const base = '/anko-foto';

for (const locale of ['ja', 'en'] as const) {
  for (const theme of ['light', 'dark'] as const) {
    test(`${locale} ${theme} representative pages have no accessibility violations`, async ({
      page
    }) => {
      const prefix = locale === 'en' ? '/en' : '';
      await page.emulateMedia({ colorScheme: theme });
      await page.goto(`${base}${prefix}/`);
      await page.evaluate(
        (value) => document.documentElement.setAttribute('data-theme', value),
        theme
      );
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);

      await page.goto(`${base}${prefix}/recipes/moving-subject/`);
      await page.evaluate(
        (value) => document.documentElement.setAttribute('data-theme', value),
        theme
      );
      const recipeResults = await new AxeBuilder({ page }).analyze();
      expect(recipeResults.violations).toEqual([]);
    });
  }
}
