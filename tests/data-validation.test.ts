import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import {
  capabilities,
  capabilitySchema,
  canPromoteProvisionalCapability,
  device,
  evidenceCatalog
} from '../src/data/capabilities';
import {
  publicRecipes,
  recipeEvidenceRefs,
  recipes,
  unresolvedRangeControlIds,
  validateAllRecipes,
  validateRecipe
} from '../src/data/recipes';

describe('capability registry', () => {
  it('is structurally valid and references known evidence', () => {
    for (const capability of capabilities) {
      expect(() => capabilitySchema.parse(capability)).not.toThrow();
      expect(Array.isArray(capability.observedValues)).toBe(true);
      expect(Array.isArray(capability.modes)).toBe(true);
      expect(Array.isArray(capability.lenses)).toBe(true);
      expect(capability).toHaveProperty('verifiedRange');
      for (const ref of capability.evidenceRefs) expect(ref in evidenceCatalog).toBe(true);
    }
    for (const target of Object.values(evidenceCatalog)) {
      if (!target.startsWith('http'))
        expect(existsSync(target.split(':[')[0].split('#')[0])).toBe(true);
    }
  });

  it('registers every observed feature taught in public control views', () => {
    const ids = new Set(capabilities.map((item) => item.id));
    for (const id of ['mode.photobooth', 'mode.dual-capture-video', 'pro.raw', 'pro.histogram']) {
      expect(ids.has(id)).toBe(true);
    }
  });

  it('does not expose provisional device specifications to recipes', () => {
    const provisional = capabilities.filter((item) => item.status === 'official_provisional');
    expect(provisional.length).toBeGreaterThan(0);
    expect(provisional.every((item) => item.publicUse !== 'allowed')).toBe(true);
  });

  it('promotes only explicitly eligible official capabilities after identity verification', () => {
    const originalIdentity = device.verifiedIdentity;
    device.verifiedIdentity = {
      commercialName: device.provisionalBaselineModel,
      evidenceRef: 'device-prior-pro-values'
    };
    const aboutOnly = capabilities.find((item) => item.id === 'device.g66j')!;
    expect(canPromoteProvisionalCapability(aboutOnly)).toBe(false);
    expect(
      canPromoteProvisionalCapability({
        ...aboutOnly,
        kind: 'control',
        publicUse: 'allowed_with_provisional_label'
      })
    ).toBe(true);
    device.verifiedIdentity = originalIdentity;
  });
});

describe('recipes', () => {
  it('has 10–15 complete bilingual public recipes', () => {
    expect(publicRecipes.length).toBeGreaterThanOrEqual(10);
    expect(publicRecipes.length).toBeLessThanOrEqual(15);
    expect(recipes.every((recipe) => recipe.title.ja && recipe.title.en)).toBe(true);
  });

  it('passes derived evidence validation', () => {
    expect(validateAllRecipes()).toEqual([]);
  });

  it('rejects an exact value not in the observed set', () => {
    const unsupported = structuredClone(publicRecipes[0]);
    unsupported.settings[0] = {
      capabilityId: 'pro.iso',
      value: '800',
      label: { ja: 'ISO：800', en: 'ISO: 800' }
    };
    expect(validateRecipe(unsupported).map((issue) => issue.message)).toContain(
      '800 is not verified for pro.iso'
    );
  });

  it('rejects label, prose, status, and mode-context bypasses', () => {
    const labelBypass = structuredClone(publicRecipes[0]);
    labelBypass.settings[0].label.en = 'Mode: ISO 800';
    expect(
      validateRecipe(labelBypass).some((issue) => issue.message.includes('canonical setting'))
    ).toBe(true);

    const proseBypass = structuredClone(
      publicRecipes.find((item) => item.slug === 'moving-subject')!
    );
    proseBypass.adjust.en = 'Move to 1/500.';
    expect(
      validateRecipe(proseBypass).some((issue) => issue.message.includes('Unverified exact value'))
    ).toBe(true);

    const provisionalBypass = structuredClone(publicRecipes[0]);
    provisionalBypass.settings.push({
      capabilityId: 'device.g66j',
      value: 'moto g66j 5G',
      label: { ja: '端末：moto g66j 5G', en: 'Device: moto g66j 5G' }
    });
    expect(
      validateRecipe(provisionalBypass).some((issue) => issue.message.includes('not allowed'))
    ).toBe(true);

    const contextBypass = structuredClone(
      publicRecipes.find((item) => item.slug === 'moving-subject')!
    );
    contextBypass.settings[0] = {
      capabilityId: 'mode.photo',
      value: 'photo',
      label: { ja: 'モード：写真', en: 'Mode: Photo' }
    };
    expect(
      validateRecipe(contextBypass).some((issue) => issue.message.includes('not verified in mode'))
    ).toBe(true);

    const multipleModeBypass = structuredClone(publicRecipes[0]);
    multipleModeBypass.settings.push({
      capabilityId: 'mode.pro',
      value: 'pro',
      label: { ja: 'モード：プロ', en: 'Mode: Pro' }
    });
    multipleModeBypass.evidenceRefs.push('shot-details');
    expect(
      validateRecipe(multipleModeBypass).some((issue) =>
        issue.message.includes('exactly one canonical mode')
      )
    ).toBe(true);

    const contextualValueBypass = structuredClone(
      publicRecipes.find((item) => item.slug === 'moving-subject')!
    );
    contextualValueBypass.settings[1].value = '2x';
    contextualValueBypass.settings[1].label = { ja: '倍率：2×', en: 'Zoom: 2×' };
    expect(
      validateRecipe(contextualValueBypass).some((issue) =>
        issue.message.includes('not verified for zoom.pro')
      )
    ).toBe(true);

    const lensBypass = structuredClone(
      publicRecipes.find((item) => item.slug === 'moving-subject')!
    );
    lensBypass.settings[1].value = '0.5x';
    lensBypass.settings[1].label = { ja: '倍率：0.5×', en: 'Zoom: 0.5×' };
    expect(
      validateRecipe(lensBypass).some((issue) =>
        issue.message.includes('pro.shutter is not verified for lens 0.5x')
      )
    ).toBe(true);

    const directionBypass = structuredClone(publicRecipes[0]);
    directionBypass.directionalAdjustments = [{ controlId: 'pro.shutter', direction: 'faster' }];
    expect(
      validateRecipe(directionBypass).some((issue) =>
        issue.message.includes('Directional control pro.shutter is not verified in mode photo')
      )
    ).toBe(true);

    const unitBypass = structuredClone(publicRecipes[0]);
    unitBypass.adjust.en = 'Wait for 2 seconds.';
    expect(
      validateRecipe(unitBypass).some((issue) => issue.message.includes('duration:2 seconds'))
    ).toBe(true);

    const evidenceBypass = structuredClone(publicRecipes[0]);
    evidenceBypass.evidenceRefs = ['shot-video'];
    expect(
      validateRecipe(evidenceBypass).some((issue) =>
        issue.message.includes('has no supporting evidence reference')
      )
    ).toBe(true);
  });

  it('derives displayed evidence from canonical setting capabilities', () => {
    const moving = publicRecipes.find((item) => item.slug === 'moving-subject')!;
    expect(recipeEvidenceRefs(moving)).toEqual(
      expect.arrayContaining(['device-prior-pro-values', 'shot-pro-shutter'])
    );
  });

  it('derives unresolved range controls from the registry', () => {
    const moving = publicRecipes.find((item) => item.slug === 'moving-subject')!;
    expect(unresolvedRangeControlIds(moving)).toEqual(['pro.shutter']);
  });

  it('contains no author-controlled unresolved-range override', () => {
    expect(JSON.stringify(recipes)).not.toContain('requires_unverified_range');
  });
});
