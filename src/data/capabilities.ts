import { z } from 'astro/zod';

export const evidenceCatalog = {
  'shot-photo': 'evidence/screenshots/06-photo-mode.png',
  'shot-portrait': 'evidence/screenshots/07-portrait-mode.png',
  'shot-details': 'evidence/screenshots/08-details-mode-grid.png',
  'shot-pro-af': 'evidence/screenshots/09-pro-af-expanded.png',
  'shot-pro-wb': 'evidence/screenshots/10-pro-wb-expanded.png',
  'shot-pro-shutter': 'evidence/screenshots/11-pro-shutter-expanded.png',
  'shot-pro-iso': 'evidence/screenshots/12-pro-iso-expanded.png',
  'shot-pro-ev': 'evidence/screenshots/13-pro-ev-expanded.png',
  'shot-video': 'evidence/screenshots/05-video-mode.png',
  'shot-slow-motion': 'evidence/screenshots/04-slow-motion-mode.png',
  'device-prior-pro-values': 'research/sources.md:[device-prior-pro-values]',
  'device-pro-expanded-2026-09-04': 'research/sources.md:[device-pro-expanded-2026-09-04]',
  'official-g66j': 'https://jp-jp.support.motorola.com/app/answers/detail/a_id/192473/'
} as const;

export type EvidenceId = keyof typeof evidenceCatalog;

const statusSchema = z.enum([
  'observed_device',
  'official_provisional',
  'equivalent_only',
  'inferred',
  'unknown'
]);
const publicUseSchema = z.enum([
  'allowed',
  'allowed_with_provisional_label',
  'about_only',
  'prohibited'
]);

export const capabilitySchema = z.object({
  id: z.string(),
  kind: z.enum(['mode', 'lens', 'control', 'value', 'device']),
  label: z.object({ ja: z.string(), en: z.string() }),
  status: statusSchema,
  publicUse: publicUseSchema,
  values: z.array(z.string()).optional(),
  allowedModes: z.array(z.string()).optional(),
  observedValues: z.array(z.string()),
  verifiedRange: z
    .object({ min: z.string(), max: z.string(), step: z.string().nullable() })
    .nullable(),
  modes: z.array(z.string()),
  lenses: z.array(z.string()),
  evidenceRefs: z.array(z.string()).min(1),
  caveat: z.object({ ja: z.string(), en: z.string() }).optional()
});

export type Capability = z.infer<typeof capabilitySchema>;

export const device = {
  regulatoryModel: 'XT2529-3',
  provisionalBaselineModel: 'moto g66j 5G',
  verifiedIdentity: null as null | {
    commercialName: string;
    evidenceRef: EvidenceId;
  }
};

const capabilityRecords = [
  {
    id: 'mode.photo',
    kind: 'mode',
    label: { ja: '写真', en: 'Photo' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['photo'],
    evidenceRefs: ['shot-photo']
  },
  {
    id: 'mode.portrait',
    kind: 'mode',
    label: { ja: 'ポートレート', en: 'Portrait' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['portrait'],
    evidenceRefs: ['shot-portrait']
  },
  {
    id: 'mode.video',
    kind: 'mode',
    label: { ja: '動画', en: 'Video' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['video'],
    evidenceRefs: ['shot-video']
  },
  {
    id: 'mode.pro',
    kind: 'mode',
    label: { ja: 'プロ', en: 'Pro' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['pro'],
    evidenceRefs: ['shot-details', 'shot-pro-shutter']
  },
  {
    id: 'mode.night',
    kind: 'mode',
    label: { ja: 'ナイトビジョン', en: 'Night Vision' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['night-vision'],
    evidenceRefs: ['shot-details']
  },
  {
    id: 'mode.panorama',
    kind: 'mode',
    label: { ja: 'パノラマ', en: 'Panorama' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['panorama'],
    evidenceRefs: ['shot-details']
  },
  {
    id: 'mode.ultra-res',
    kind: 'mode',
    label: { ja: '最大画素', en: 'Maximum Pixels' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['ultra-res'],
    evidenceRefs: ['shot-details']
  },
  {
    id: 'mode.timelapse',
    kind: 'mode',
    label: { ja: 'タイムラプス', en: 'Timelapse' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['timelapse'],
    evidenceRefs: ['shot-details']
  },
  {
    id: 'mode.slow-motion',
    kind: 'mode',
    label: { ja: 'スローモーション', en: 'Slow motion' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['slow-motion'],
    evidenceRefs: ['shot-slow-motion']
  },
  {
    id: 'mode.scan',
    kind: 'mode',
    label: { ja: 'スキャン', en: 'Scan' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['scan'],
    evidenceRefs: ['shot-details']
  },
  {
    id: 'mode.tilt-shift',
    kind: 'mode',
    label: { ja: 'チルトシフト', en: 'Tilt shift' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['tilt-shift'],
    evidenceRefs: ['shot-details']
  },
  {
    id: 'mode.photobooth',
    kind: 'mode',
    label: { ja: 'フォトブース', en: 'Photobooth' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['photobooth'],
    evidenceRefs: ['shot-details']
  },
  {
    id: 'mode.dual-capture-video',
    kind: 'mode',
    label: { ja: 'デュアル撮影動画', en: 'Dual Capture Video' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['dual-capture-video'],
    evidenceRefs: ['shot-details'],
    caveat: {
      ja: '画面構成やカメラの組み合わせは未確認です。',
      en: 'Layouts and camera combinations are unconfirmed.'
    }
  },
  {
    id: 'lens.rear',
    kind: 'lens',
    label: { ja: '背面カメラ', en: 'Rear camera' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['rear'],
    allowedModes: ['photo', 'portrait', 'pro', 'video', 'slow-motion'],
    evidenceRefs: ['shot-photo']
  },
  {
    id: 'lens.front',
    kind: 'lens',
    label: { ja: '前面カメラ', en: 'Front camera' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['front'],
    allowedModes: ['photo', 'portrait', 'video'],
    evidenceRefs: ['shot-photo']
  },
  {
    id: 'zoom.photo',
    kind: 'lens',
    label: { ja: '写真の倍率', en: 'Photo zoom choice' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['0.5x', '1x', '2x'],
    allowedModes: ['photo'],
    evidenceRefs: ['shot-photo'],
    caveat: {
      ja: '2×が独立した望遠レンズかは未確認です。',
      en: 'Whether 2× is a separate telephoto lens is unconfirmed.'
    }
  },
  {
    id: 'zoom.video',
    kind: 'lens',
    label: { ja: '動画の倍率', en: 'Video zoom choice' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['0.5x', '1x', '2x'],
    allowedModes: ['video'],
    evidenceRefs: ['shot-video'],
    caveat: {
      ja: '2×が独立した望遠レンズかは未確認です。',
      en: 'Whether 2× is a separate telephoto lens is unconfirmed.'
    }
  },
  {
    id: 'zoom.pro',
    kind: 'lens',
    label: { ja: 'プロの倍率', en: 'Pro zoom choice' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['0.5x', '1x'],
    allowedModes: ['pro'],
    evidenceRefs: ['device-prior-pro-values'],
    caveat: {
      ja: '新しいプロ画面では倍率表示が見えないため、以前の実機記録を根拠にしています。',
      en: 'The newer Pro captures do not show the zoom selector; this uses the earlier device record.'
    }
  },
  {
    id: 'pro.shutter',
    kind: 'control',
    label: { ja: 'シャッター速度', en: 'Shutter speed' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['auto', '1/350'],
    evidenceRefs: ['device-prior-pro-values'],
    allowedModes: ['pro'],
    lenses: ['1x'],
    caveat: { ja: '全範囲の端点は未確認です。', en: 'The full range endpoints are unconfirmed.' }
  },
  {
    id: 'pro.iso',
    kind: 'control',
    label: { ja: 'ISO', en: 'ISO' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['auto', '100', '200'],
    evidenceRefs: ['device-prior-pro-values', 'shot-pro-iso'],
    allowedModes: ['pro'],
    lenses: ['1x'],
    caveat: {
      ja: '表示で確認できた値だけを掲載しています。',
      en: 'Only values visible in evidence are listed.'
    }
  },
  {
    id: 'pro.wb',
    kind: 'control',
    label: { ja: 'ホワイトバランス', en: 'White balance' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['auto'],
    evidenceRefs: ['device-prior-pro-values', 'shot-pro-wb'],
    allowedModes: ['pro'],
    lenses: ['1x']
  },
  {
    id: 'pro.af',
    kind: 'control',
    label: { ja: 'フォーカス', en: 'Focus' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['auto'],
    evidenceRefs: ['device-prior-pro-values', 'shot-pro-af'],
    allowedModes: ['pro'],
    lenses: ['1x']
  },
  {
    id: 'pro.ev',
    kind: 'control',
    label: { ja: '露出補正', en: 'Exposure compensation' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['-4', '0.0', '+4'],
    evidenceRefs: ['shot-pro-ev', 'device-pro-expanded-2026-09-04'],
    allowedModes: ['pro'],
    verifiedRange: { min: '-4', max: '+4', step: null },
    caveat: { ja: '刻み幅は未確認です。', en: 'The step interval is unconfirmed.' }
  },
  {
    id: 'video.quality',
    kind: 'value',
    label: { ja: '動画品質', en: 'Video quality' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['FHD 30'],
    evidenceRefs: ['shot-video'],
    allowedModes: ['video']
  },
  {
    id: 'pro.raw',
    kind: 'control',
    label: { ja: 'RAW形式', en: 'RAW format' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['control-visible'],
    evidenceRefs: ['shot-pro-shutter'],
    allowedModes: ['pro'],
    caveat: {
      ja: 'RAWのみかRAW+JPEGかは未確認です。',
      en: 'RAW-only versus RAW+JPEG is unconfirmed.'
    }
  },
  {
    id: 'pro.histogram',
    kind: 'control',
    label: { ja: 'ライブヒストグラム', en: 'Live histogram' },
    status: 'observed_device',
    publicUse: 'allowed',
    values: ['visible'],
    evidenceRefs: ['shot-pro-shutter'],
    allowedModes: ['pro']
  },
  {
    id: 'device.g66j',
    kind: 'device',
    label: { ja: 'moto g66j 5G（暫定）', en: 'moto g66j 5G (provisional)' },
    status: 'official_provisional',
    publicUse: 'about_only',
    evidenceRefs: ['official-g66j'],
    caveat: {
      ja: '端末の正確な商品名が確認されるまで、撮影設定の根拠には使いません。',
      en: 'Not used to validate recipe settings until the exact device identity is confirmed.'
    }
  },
  {
    id: 'pro.full-ranges',
    kind: 'value',
    label: { ja: 'プロ設定の全範囲', en: 'Full Pro ranges' },
    status: 'unknown',
    publicUse: 'prohibited',
    evidenceRefs: ['shot-pro-shutter', 'shot-pro-iso', 'shot-pro-wb', 'shot-pro-af']
  }
];

export const capabilities: Capability[] = capabilityRecords.map((record) =>
  capabilitySchema.parse({
    ...record,
    observedValues: 'values' in record ? record.values : [],
    verifiedRange: 'verifiedRange' in record ? record.verifiedRange : null,
    modes: 'allowedModes' in record ? record.allowedModes : [],
    lenses:
      'lenses' in record
        ? record.lenses
        : record.id.startsWith('zoom.') && 'values' in record
          ? record.values
          : []
  })
);

export const capabilityById = new Map(capabilities.map((item) => [item.id, item]));

export function canPromoteProvisionalCapability(capability: Capability) {
  return Boolean(
    capability.status === 'official_provisional' &&
    capability.publicUse === 'allowed_with_provisional_label' &&
    device.verifiedIdentity?.commercialName === device.provisionalBaselineModel
  );
}

export function canValidatePublicRecipe(capability: Capability) {
  return (
    (capability.status === 'observed_device' && capability.publicUse === 'allowed') ||
    canPromoteProvisionalCapability(capability)
  );
}
