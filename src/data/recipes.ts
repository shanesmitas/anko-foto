import { z } from 'astro/zod';
import {
  canValidatePublicRecipe,
  capabilityById,
  evidenceCatalog,
  type Capability
} from './capabilities';

const bilingualSchema = z.object({ ja: z.string().min(1), en: z.string().min(1) });
const settingSchema = z.object({
  capabilityId: z.string(),
  value: z.string(),
  label: bilingualSchema
});
export const recipeSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  visibility: z.enum(['public', 'draft']),
  title: bilingualSchema,
  summary: bilingualSchema,
  tryFirst: z.array(bilingualSchema).min(2),
  settings: z.array(settingSchema).min(1),
  directionalAdjustments: z
    .array(
      z.object({
        controlId: z.string(),
        direction: z.enum(['faster', 'slower', 'higher', 'lower', 'brighter', 'darker'])
      })
    )
    .optional(),
  adjust: bilingualSchema,
  why: bilingualSchema,
  safety: bilingualSchema,
  image: z.enum(['sunset', 'night', 'dog', 'flower', 'coast', 'portrait', 'food', 'document']),
  attribution: z.string(),
  evidenceRefs: z.array(z.string()).min(1)
});

export type Recipe = z.infer<typeof recipeSchema>;

const r = (recipe: Recipe) => recipe;

export const recipes: Recipe[] = [
  r({
    slug: 'everyday-photo',
    visibility: 'public',
    title: { ja: 'まずは、いつもの写真', en: 'Everyday photo' },
    summary: {
      ja: '迷ったら写真モードと1×。光の方向だけ見て撮ろう。',
      en: 'When in doubt, use Photo at 1× and notice where the light comes from.'
    },
    tryFirst: [
      { ja: '「写真」を選ぶ', en: 'Choose Photo' },
      { ja: '1×で、写したい所をタップ', en: 'Use 1× and tap your subject' },
      { ja: '両手で持って撮る', en: 'Hold with two hands and shoot' }
    ],
    settings: [
      {
        capabilityId: 'mode.photo',
        value: 'photo',
        label: { ja: 'モード：写真', en: 'Mode: Photo' }
      },
      { capabilityId: 'zoom.photo', value: '1x', label: { ja: '倍率：1×', en: 'Zoom: 1×' } }
    ],
    adjust: {
      ja: '暗ければ、明るい場所へ一歩移動。',
      en: 'If it is dark, move one step toward better light.'
    },
    why: {
      ja: '1×は自然な見え方で、最初の一枚に向いています。',
      en: '1× gives a natural view and is a dependable starting point.'
    },
    safety: {
      ja: '画面だけでなく、足元も見よう。',
      en: 'Watch your footing as well as the screen.'
    },
    image: 'coast',
    attribution: 'ai-coast',
    evidenceRefs: ['shot-photo']
  }),
  r({
    slug: 'wide-landscape',
    visibility: 'public',
    title: { ja: '景色を広く入れる', en: 'Fit in a wide landscape' },
    summary: {
      ja: '海、山、大きな建物には0.5×を試そう。',
      en: 'Try 0.5× for coastlines, mountains, or large buildings.'
    },
    tryFirst: [
      { ja: '「写真」を選ぶ', en: 'Choose Photo' },
      { ja: '0.5×を選ぶ', en: 'Choose 0.5×' },
      { ja: '水平を意識して撮る', en: 'Keep the horizon level' }
    ],
    settings: [
      {
        capabilityId: 'mode.photo',
        value: 'photo',
        label: { ja: 'モード：写真', en: 'Mode: Photo' }
      },
      { capabilityId: 'zoom.photo', value: '0.5x', label: { ja: '倍率：0.5×', en: 'Zoom: 0.5×' } }
    ],
    adjust: {
      ja: '端が曲がって見えたら、少し下がって1×も試そう。',
      en: 'If the edges look stretched, step back and compare with 1×.'
    },
    why: { ja: '0.5×は一度に広い範囲を写します。', en: '0.5× captures a wider field of view.' },
    safety: {
      ja: '崖や車道へ下がらない。安全な展望場所で撮ろう。',
      en: 'Never step toward a cliff or road; use a safe overlook.'
    },
    image: 'coast',
    attribution: 'ai-coast',
    evidenceRefs: ['shot-photo']
  }),
  r({
    slug: 'sunset',
    visibility: 'public',
    title: { ja: '夕焼けを残す', en: 'Keep the sunset color' },
    summary: {
      ja: '明るい空をタップして、色が残る明るさに。',
      en: 'Tap the bright sky so its color stays visible.'
    },
    tryFirst: [
      { ja: '「写真」と1×を選ぶ', en: 'Choose Photo and 1×' },
      { ja: '空の明るい部分をタップ', en: 'Tap the bright part of the sky' },
      { ja: '明るすぎたら少し暗く調整', en: 'If too bright, adjust a little darker' }
    ],
    settings: [
      {
        capabilityId: 'mode.photo',
        value: 'photo',
        label: { ja: 'モード：写真', en: 'Mode: Photo' }
      },
      { capabilityId: 'zoom.photo', value: '1x', label: { ja: '倍率：1×', en: 'Zoom: 1×' } }
    ],
    adjust: {
      ja: '空が白いなら、数値を決めずに少し暗い方向へ。',
      en: 'If the sky turns white, move a little darker without chasing a fixed number.'
    },
    why: {
      ja: '明るい場所を基準にすると、空の色が残りやすくなります。',
      en: 'Metering from the bright area helps preserve sky color.'
    },
    safety: {
      ja: '車や自転車の近くでは立ち止まらない。',
      en: 'Do not stop near moving traffic or bicycles.'
    },
    image: 'sunset',
    attribution: 'ai-sunset',
    evidenceRefs: ['shot-photo']
  }),
  r({
    slug: 'people-portrait',
    visibility: 'public',
    title: { ja: '人をやわらかく撮る', en: 'A softer people portrait' },
    summary: {
      ja: 'ポートレートで背景を整理。まず相手に声をかけよう。',
      en: 'Use Portrait to simplify the background—and ask first.'
    },
    tryFirst: [
      { ja: '撮ってよいか聞く', en: 'Ask before taking the photo' },
      { ja: '「ポートレート」を選ぶ', en: 'Choose Portrait' },
      { ja: '顔をタップして撮る', en: 'Tap the face and shoot' }
    ],
    settings: [
      {
        capabilityId: 'mode.portrait',
        value: 'portrait',
        label: { ja: 'モード：ポートレート', en: 'Mode: Portrait' }
      }
    ],
    adjust: {
      ja: '輪郭が不自然なら、背景から少し離れてもらおう。',
      en: 'If edges look odd, ask the person to move farther from the background.'
    },
    why: {
      ja: '人物と背景の距離があると、分離が分かりやすくなります。',
      en: 'Distance between person and background makes separation clearer.'
    },
    safety: {
      ja: '写真を共有する前にも本人へ確認しよう。',
      en: 'Ask again before sharing someone’s photo.'
    },
    image: 'portrait',
    attribution: 'ai-portrait',
    evidenceRefs: ['shot-portrait']
  }),
  r({
    slug: 'night-city',
    visibility: 'public',
    title: { ja: '夜の街と光', en: 'Night streets and lights' },
    summary: {
      ja: 'ナイトビジョンで、体を壁のように安定させよう。',
      en: 'Use Night Vision and make your body a steady support.'
    },
    tryFirst: [
      { ja: '「詳細」から「ナイトビジョン」', en: 'Open Details, then Night Vision' },
      { ja: '両手で持つ', en: 'Hold with both hands' },
      { ja: '撮影後も少し止まる', en: 'Stay still just after shooting' }
    ],
    settings: [
      {
        capabilityId: 'mode.night',
        value: 'night-vision',
        label: { ja: 'モード：ナイトビジョン', en: 'Mode: Night Vision' }
      }
    ],
    adjust: {
      ja: 'ぶれたら、壁や手すりに腕を添えてもう一枚。',
      en: 'If it blurs, brace your arms on a wall or rail and retry.'
    },
    why: {
      ja: '暗い場面では、端末を動かさないことが大切です。',
      en: 'Keeping the phone still matters most in low light.'
    },
    safety: {
      ja: '暗い道では周囲を優先。立ち止まるなら安全な歩道で。',
      en: 'Prioritize awareness at night and stop only on a safe sidewalk.'
    },
    image: 'night',
    attribution: 'ai-night',
    evidenceRefs: ['shot-details']
  }),
  r({
    slug: 'moving-subject',
    visibility: 'public',
    title: { ja: '動くものを止める', en: 'Freeze a moving subject' },
    summary: {
      ja: 'プロの出発点は1/350。ぶれたら速い方向へ。',
      en: 'Start Pro at 1/350; if it blurs, move the shutter faster.'
    },
    tryFirst: [
      {
        ja: '画面下のモード列から「プロ」を選び、1×にする',
        en: 'Choose Pro from the bottom mode strip, then use 1×'
      },
      { ja: 'Sを1/350、ISO・WB・AFは自動', en: 'Set S to 1/350; leave ISO, WB, and AF on Auto' },
      { ja: '動きを追いながら撮る', en: 'Follow the motion while shooting' }
    ],
    settings: [
      { capabilityId: 'mode.pro', value: 'pro', label: { ja: 'モード：プロ', en: 'Mode: Pro' } },
      { capabilityId: 'zoom.pro', value: '1x', label: { ja: '倍率：1×', en: 'Zoom: 1×' } },
      { capabilityId: 'pro.shutter', value: '1/350', label: { ja: 'S：1/350', en: 'S: 1/350' } },
      { capabilityId: 'pro.iso', value: 'auto', label: { ja: 'ISO：自動', en: 'ISO: Auto' } },
      { capabilityId: 'pro.wb', value: 'auto', label: { ja: 'WB：自動', en: 'WB: Auto' } },
      { capabilityId: 'pro.af', value: 'auto', label: { ja: 'AF：自動', en: 'AF: Auto' } }
    ],
    directionalAdjustments: [{ controlId: 'pro.shutter', direction: 'faster' }],
    adjust: {
      ja: 'まだぶれるなら、目標値を決めずにシャッターを速い方向へ。',
      en: 'If it still blurs, move the shutter faster without assuming an endpoint.'
    },
    why: {
      ja: '短い露光は、動いている間に写る距離を減らします。',
      en: 'A shorter exposure reduces how far the subject moves in the frame.'
    },
    safety: {
      ja: '道路や競技エリアへ入らない。安全な場所から追おう。',
      en: 'Stay out of roads and play areas; track from a safe place.'
    },
    image: 'dog',
    attribution: 'ai-dog',
    evidenceRefs: [
      'shot-details',
      'device-prior-pro-values',
      'shot-pro-iso',
      'shot-pro-wb',
      'shot-pro-af'
    ]
  }),
  r({
    slug: 'pet-action',
    visibility: 'public',
    title: { ja: 'ペットの一瞬', en: 'A quick pet moment' },
    summary: {
      ja: 'まず写真モードで顔をタップ。明るい場所が味方。',
      en: 'Start in Photo, tap the face, and use brighter light.'
    },
    tryFirst: [
      { ja: '「写真」と1×を選ぶ', en: 'Choose Photo and 1×' },
      { ja: 'ペットの目の高さへ', en: 'Get near the pet’s eye level' },
      { ja: '顔をタップして数枚撮る', en: 'Tap the face and take a few shots' }
    ],
    settings: [
      {
        capabilityId: 'mode.photo',
        value: 'photo',
        label: { ja: 'モード：写真', en: 'Mode: Photo' }
      },
      { capabilityId: 'zoom.photo', value: '1x', label: { ja: '倍率：1×', en: 'Zoom: 1×' } }
    ],
    adjust: {
      ja: 'ぶれるなら明るい場所へ移り、動くものの撮り方も試そう。',
      en: 'If it blurs, find brighter light or try the moving-subject recipe.'
    },
    why: {
      ja: '明るい光は短い時間で写す助けになります。',
      en: 'More light helps the camera capture motion in less time.'
    },
    safety: {
      ja: '動物を驚かせず、フラッシュは避けよう。',
      en: 'Do not startle animals; avoid flash.'
    },
    image: 'dog',
    attribution: 'ai-dog',
    evidenceRefs: ['shot-photo']
  }),
  r({
    slug: 'flower-closeup',
    visibility: 'public',
    title: { ja: '花を近くで', en: 'Flower close-up' },
    summary: {
      ja: '近づきすぎず、花の中心をタップ。',
      en: 'Do not get too close; tap the flower’s center.'
    },
    tryFirst: [
      { ja: '「写真」と1×を選ぶ', en: 'Choose Photo and 1×' },
      { ja: '花の中心をタップ', en: 'Tap the center' },
      { ja: 'ピントが合う距離まで少し下がる', en: 'Step back until focus locks' }
    ],
    settings: [
      {
        capabilityId: 'mode.photo',
        value: 'photo',
        label: { ja: 'モード：写真', en: 'Mode: Photo' }
      },
      { capabilityId: 'zoom.photo', value: '1x', label: { ja: '倍率：1×', en: 'Zoom: 1×' } }
    ],
    adjust: {
      ja: '風で動くなら、風が弱まる瞬間を待とう。',
      en: 'If wind moves it, wait for a calm moment.'
    },
    why: {
      ja: '少し距離を取ると、カメラが合わせやすくなります。',
      en: 'A little distance helps the camera find focus.'
    },
    safety: {
      ja: '花壇に入らず、植物に触れない。',
      en: 'Stay out of flower beds and do not touch plants.'
    },
    image: 'flower',
    attribution: 'ai-flower',
    evidenceRefs: ['shot-photo']
  }),
  r({
    slug: 'food-window-light',
    visibility: 'public',
    title: { ja: '食べものをおいしそうに', en: 'Food by window light' },
    summary: {
      ja: '窓の近くで、斜め上から。',
      en: 'Move near a window and shoot slightly from above.'
    },
    tryFirst: [
      { ja: '「写真」と1×を選ぶ', en: 'Choose Photo and 1×' },
      { ja: '皿の明るい所をタップ', en: 'Tap a bright part of the plate' },
      { ja: '影が少し残る向きで撮る', en: 'Keep a little side shadow' }
    ],
    settings: [
      {
        capabilityId: 'mode.photo',
        value: 'photo',
        label: { ja: 'モード：写真', en: 'Mode: Photo' }
      },
      { capabilityId: 'zoom.photo', value: '1x', label: { ja: '倍率：1×', en: 'Zoom: 1×' } }
    ],
    adjust: {
      ja: '色が変なら、別の照明を消して窓の光だけを試そう。',
      en: 'If color looks odd, switch off other lights and try window light alone.'
    },
    why: {
      ja: '一方向のやわらかい光は形を見せやすくします。',
      en: 'Soft light from one direction reveals shape.'
    },
    safety: {
      ja: '熱い皿や飲みものから端末を離そう。',
      en: 'Keep the phone away from hot dishes and drinks.'
    },
    image: 'food',
    attribution: 'ai-food',
    evidenceRefs: ['shot-photo']
  }),
  r({
    slug: 'panorama',
    visibility: 'public',
    title: { ja: '長い景色をパノラマに', en: 'Sweep a panorama' },
    summary: {
      ja: 'ゆっくり一定に動かして、広い景色を一枚へ。',
      en: 'Move slowly and evenly to join a wide view.'
    },
    tryFirst: [
      { ja: '「詳細」から「パノラマ」', en: 'Open Details, then Panorama' },
      { ja: '始点と終点を決める', en: 'Choose start and end points' },
      { ja: '表示に合わせてゆっくり動く', en: 'Follow the guide slowly' }
    ],
    settings: [
      {
        capabilityId: 'mode.panorama',
        value: 'panorama',
        label: { ja: 'モード：パノラマ', en: 'Mode: Panorama' }
      }
    ],
    adjust: {
      ja: 'つながりが曲がったら、速さを一定にしてやり直そう。',
      en: 'If joins bend, retry at a steadier speed.'
    },
    why: {
      ja: '端末を動かしながら複数の部分を一枚につなぎます。',
      en: 'The phone joins multiple sections while you sweep.'
    },
    safety: {
      ja: '回りながら歩かない。足を止めて撮ろう。',
      en: 'Stand still instead of walking while turning.'
    },
    image: 'coast',
    attribution: 'ai-coast',
    evidenceRefs: ['shot-details']
  }),
  r({
    slug: 'high-resolution',
    visibility: 'draft',
    title: { ja: '細部を大きく残す', en: 'Keep more detail' },
    summary: {
      ja: '動かない景色なら最大画素を試す。',
      en: 'Try Maximum Pixels for a still, detailed scene.'
    },
    tryFirst: [
      { ja: '「詳細」から「最大画素」', en: 'Open Details, then Maximum Pixels' },
      { ja: '明るい場所を選ぶ', en: 'Choose a bright scene' },
      { ja: '両手で安定させる', en: 'Steady with both hands' }
    ],
    settings: [
      {
        capabilityId: 'mode.ultra-res',
        value: 'ultra-res',
        label: { ja: 'モード：最大画素', en: 'Mode: Maximum Pixels' }
      }
    ],
    adjust: {
      ja: '動く被写体や暗い場面では、写真モードとも比べよう。',
      en: 'For motion or darkness, compare with ordinary Photo mode.'
    },
    why: {
      ja: '細かい部分を残したい、動きの少ない場面向けです。',
      en: 'It suits still scenes where fine detail matters.'
    },
    safety: {
      ja: '容量が増えることがあるので、空き容量も確認。',
      en: 'Files may be larger, so check available storage.'
    },
    image: 'coast',
    attribution: 'ai-coast',
    evidenceRefs: ['shot-details']
  }),
  r({
    slug: 'timelapse',
    visibility: 'public',
    title: { ja: '時間を早送りする', en: 'Speed up time' },
    summary: {
      ja: '雲や影の変化を、固定した端末で。',
      en: 'Capture changing clouds or shadows with a fixed phone.'
    },
    tryFirst: [
      { ja: '「詳細」から「タイムラプス」', en: 'Open Details, then Timelapse' },
      { ja: '端末を安全に固定', en: 'Secure the phone safely' },
      { ja: 'しばらく動かさず撮る', en: 'Record without moving it' }
    ],
    settings: [
      {
        capabilityId: 'mode.timelapse',
        value: 'timelapse',
        label: { ja: 'モード：タイムラプス', en: 'Mode: Timelapse' }
      }
    ],
    adjust: {
      ja: '揺れるなら、より安定した場所へ置こう。',
      en: 'If it shakes, move it to a more stable support.'
    },
    why: {
      ja: '長い時間の変化を短い動画にします。',
      en: 'It compresses a long change into a short video.'
    },
    safety: {
      ja: '端末を落下場所や通路へ置かない。',
      en: 'Never place the phone where it can fall or block a path.'
    },
    image: 'sunset',
    attribution: 'ai-sunset',
    evidenceRefs: ['shot-details']
  }),
  r({
    slug: 'slow-motion',
    visibility: 'public',
    title: { ja: '動きをゆっくり見る', en: 'Slow the action down' },
    summary: { ja: '明るい場所でスローモーション。', en: 'Use Slow motion in brighter light.' },
    tryFirst: [
      { ja: '「スローモーション」を選ぶ', en: 'Choose Slow motion' },
      { ja: '明るい向きで構える', en: 'Face the brighter direction' },
      { ja: '動きの前から録画', en: 'Start before the action' }
    ],
    settings: [
      {
        capabilityId: 'mode.slow-motion',
        value: 'slow-motion',
        label: { ja: 'モード：スローモーション', en: 'Mode: Slow motion' }
      }
    ],
    adjust: {
      ja: '暗く見えるなら、より明るい場所へ。フレーム数は端末で確認。',
      en: 'If it looks dark, find brighter light. Confirm frame-rate choices on the device.'
    },
    why: {
      ja: '短い動きを引き伸ばして再生します。',
      en: 'It stretches a short action during playback.'
    },
    safety: {
      ja: '危険な動きを撮影のために頼まない。',
      en: 'Never ask someone to do something dangerous for a shot.'
    },
    image: 'dog',
    attribution: 'ai-dog',
    evidenceRefs: ['shot-slow-motion']
  }),
  r({
    slug: 'selfie',
    visibility: 'public',
    title: { ja: '自然な自撮り', en: 'A natural selfie' },
    summary: {
      ja: '前面カメラで、窓や空のやわらかい光へ向こう。',
      en: 'Use the front camera and face soft window or sky light.'
    },
    tryFirst: [
      { ja: '前面カメラへ切り替え', en: 'Switch to the front camera' },
      { ja: '「写真」を選ぶ', en: 'Choose Photo' },
      { ja: '目線の少し上で撮る', en: 'Hold just above eye level' }
    ],
    settings: [
      {
        capabilityId: 'lens.front',
        value: 'front',
        label: { ja: 'カメラ：前面', en: 'Camera: Front' }
      },
      {
        capabilityId: 'mode.photo',
        value: 'photo',
        label: { ja: 'モード：写真', en: 'Mode: Photo' }
      }
    ],
    adjust: {
      ja: '顔に強い影が出たら、光の方へ向きを変えよう。',
      en: 'If shadows are harsh, turn toward the light.'
    },
    why: {
      ja: '前からのやわらかい光は表情を見せやすくします。',
      en: 'Soft frontal light makes expressions clearer.'
    },
    safety: {
      ja: '位置情報や制服など、写り込みを共有前に確認。',
      en: 'Before sharing, check for location clues or school details.'
    },
    image: 'portrait',
    attribution: 'ai-portrait',
    evidenceRefs: ['shot-photo']
  }),
  r({
    slug: 'tilt-shift',
    visibility: 'draft',
    title: { ja: 'ミニチュア風に遊ぶ', en: 'Try a miniature look' },
    summary: {
      ja: 'チルトシフトで、少し高い安全な場所から街を見る。',
      en: 'Use Tilt shift from a safe, slightly raised viewpoint.'
    },
    tryFirst: [
      { ja: '「詳細」から「チルトシフト」', en: 'Open Details, then Tilt shift' },
      { ja: '道路や建物を斜めに入れる', en: 'Frame streets or buildings diagonally' },
      { ja: '効果を比べて撮る', en: 'Compare the effect' }
    ],
    settings: [
      {
        capabilityId: 'mode.tilt-shift',
        value: 'tilt-shift',
        label: { ja: 'モード：チルトシフト', en: 'Mode: Tilt shift' }
      }
    ],
    adjust: {
      ja: '効果が分かりにくければ、細かなものが多い景色を選ぼう。',
      en: 'If the effect is subtle, choose a scene with many small details.'
    },
    why: {
      ja: 'ぼける範囲が、街を小さな模型のように見せます。',
      en: 'Selective blur can make a city resemble a small model.'
    },
    safety: {
      ja: '高い場所では柵の内側から。身を乗り出さない。',
      en: 'Stay behind barriers and never lean over an edge.'
    },
    image: 'night',
    attribution: 'ai-night',
    evidenceRefs: ['shot-details']
  }),
  r({
    slug: 'scan-document',
    visibility: 'public',
    title: { ja: '紙を読みやすく写す', en: 'Capture a readable page' },
    summary: {
      ja: 'スキャンで紙をまっすぐ、影を避けて。',
      en: 'Use Scan, square up the page, and avoid shadows.'
    },
    tryFirst: [
      { ja: '「詳細」から「スキャン」', en: 'Open Details, then Scan' },
      { ja: '紙と平行に構える', en: 'Hold parallel to the page' },
      { ja: '自分の影を外して撮る', en: 'Move your shadow off the page' }
    ],
    settings: [
      {
        capabilityId: 'mode.scan',
        value: 'scan',
        label: { ja: 'モード：スキャン', en: 'Mode: Scan' }
      }
    ],
    adjust: {
      ja: '端がゆがむなら、紙の真上へ少しずつ移動。',
      en: 'If edges skew, move gradually above the center.'
    },
    why: {
      ja: '紙の形を見つけ、読みやすく整えるためのモードです。',
      en: 'The mode is designed to detect and straighten a page.'
    },
    safety: {
      ja: '個人情報がある紙は共有しない。',
      en: 'Do not share pages containing personal information.'
    },
    image: 'document',
    attribution: 'ai-document',
    evidenceRefs: ['shot-details']
  }),
  r({
    slug: 'video-basics',
    visibility: 'public',
    title: { ja: 'ぶれにくい動画の基本', en: 'Steadier video basics' },
    summary: {
      ja: 'FHD 30を出発点に、短く安定したカットを。',
      en: 'Start with FHD 30 and record short, steady clips.'
    },
    tryFirst: [
      { ja: '「動画」を選ぶ', en: 'Choose Video' },
      { ja: 'FHD 30を確認', en: 'Confirm FHD 30' },
      { ja: '両手で持ち、ゆっくり動く', en: 'Use two hands and move slowly' }
    ],
    settings: [
      {
        capabilityId: 'mode.video',
        value: 'video',
        label: { ja: 'モード：動画', en: 'Mode: Video' }
      },
      {
        capabilityId: 'video.quality',
        value: 'FHD 30',
        label: { ja: '品質：FHD 30', en: 'Quality: FHD 30' }
      },
      { capabilityId: 'zoom.video', value: '1x', label: { ja: '倍率：1×', en: 'Zoom: 1×' } }
    ],
    adjust: {
      ja: '見づらければ、止まったカットを短く重ねよう。',
      en: 'If it is hard to watch, combine shorter stationary clips.'
    },
    why: {
      ja: '急な動きを減らすと、映像の内容が伝わりやすくなります。',
      en: 'Less abrupt movement makes the subject easier to follow.'
    },
    safety: {
      ja: '歩きながら画面を見続けない。',
      en: 'Do not keep watching the screen while walking.'
    },
    image: 'sunset',
    attribution: 'ai-sunset',
    evidenceRefs: ['shot-video']
  })
];

export type ValidationIssue = { slug: string; message: string };

function displayValue(value: string) {
  return value.replace(/x$/, '×');
}

export function settingLabel(
  setting: Pick<Recipe['settings'][number], 'capabilityId' | 'value'>,
  locale: 'ja' | 'en'
) {
  const capability = capabilityById.get(setting.capabilityId);
  if (!capability) return setting.value;
  const value = displayValue(setting.value);
  if (capability.kind === 'mode')
    return `${locale === 'ja' ? 'モード：' : 'Mode: '}${capability.label[locale]}`;
  if (setting.capabilityId.startsWith('zoom.'))
    return `${locale === 'ja' ? '倍率：' : 'Zoom: '}${value}`;
  if (setting.capabilityId === 'lens.front')
    return locale === 'ja' ? 'カメラ：前面' : 'Camera: Front';
  if (setting.capabilityId === 'lens.rear')
    return locale === 'ja' ? 'カメラ：背面' : 'Camera: Rear';
  if (setting.capabilityId === 'pro.shutter') return `S${locale === 'ja' ? '：' : ': '}${value}`;
  if (setting.capabilityId === 'pro.iso')
    return `ISO${locale === 'ja' ? '：' : ': '}${value === 'auto' ? (locale === 'ja' ? '自動' : 'Auto') : value}`;
  if (setting.capabilityId === 'pro.wb')
    return `WB${locale === 'ja' ? '：' : ': '}${value === 'auto' ? (locale === 'ja' ? '自動' : 'Auto') : value}`;
  if (setting.capabilityId === 'pro.af')
    return `AF${locale === 'ja' ? '：' : ': '}${value === 'auto' ? (locale === 'ja' ? '自動' : 'Auto') : value}`;
  if (setting.capabilityId === 'video.quality')
    return `${locale === 'ja' ? '品質：' : 'Quality: '}${value}`;
  return `${capability.label[locale]}${locale === 'ja' ? '：' : ': '}${value}`;
}

function exactTokens(text: string) {
  const tokens: string[] = [];
  const pattern =
    /(?<shutter>\d+\/\d+)|(?<zoom>\d+(?:\.\d+)?)[x×]|(?<quality>FHD\s*\d+)|(?<kelvin>[\d,]+\s*K)|(?<iso>ISO\s*[+-]?\d+)|(?<ev>EV\s*[+-]?\d+(?:\.\d+)?)|(?<duration>\d+(?:\.\d+)?\s*(?:seconds?|sec|秒))|(?<number>[+-]?\d+(?:\.\d+)?)/gi;
  for (const match of text.matchAll(pattern)) {
    const groups = match.groups ?? {};
    if (groups.shutter) tokens.push(`shutter:${groups.shutter}`);
    else if (groups.zoom) tokens.push(`zoom:${groups.zoom}`);
    else if (groups.quality)
      tokens.push(`quality:${groups.quality.toUpperCase().replace(/\s+/g, ' ')}`);
    else if (groups.kelvin) tokens.push(`kelvin:${groups.kelvin.replace(/[\s,]/g, '')}`);
    else if (groups.iso) tokens.push(`iso:${groups.iso.replace(/\s+/g, '').toUpperCase()}`);
    else if (groups.ev) tokens.push(`ev:${groups.ev.replace(/\s+/g, '').toUpperCase()}`);
    else if (groups.duration) tokens.push(`duration:${groups.duration.toLowerCase()}`);
    else if (groups.number) tokens.push(`number:${groups.number}`);
  }
  return tokens;
}

function capabilityValueTokens(capability: Capability) {
  return capability.observedValues.flatMap((value) => {
    if (capability.id.startsWith('zoom.')) return [`zoom:${value.replace(/x$/, '')}`];
    if (capability.id === 'pro.shutter' && value !== 'auto') return [`shutter:${value}`];
    if (capability.id === 'pro.iso' && value !== 'auto') return [`iso:ISO${value}`];
    if (capability.id === 'pro.wb' && value !== 'auto')
      return [`kelvin:${value.replace(/[\s,]/g, '')}`];
    if (capability.id === 'pro.ev') return [`ev:EV${value}`];
    if (capability.id === 'video.quality')
      return [`quality:${value.toUpperCase().replace(/\s+/g, ' ')}`];
    return [];
  });
}

function activeModes(recipe: Recipe) {
  return recipe.settings.flatMap((setting) => {
    const capability = capabilityById.get(setting.capabilityId);
    return capability?.kind === 'mode' ? [setting.value] : [];
  });
}

function activeLenses(recipe: Recipe) {
  return recipe.settings.flatMap((setting) => {
    const capability = capabilityById.get(setting.capabilityId);
    return capability?.kind === 'lens' ? [setting.value] : [];
  });
}

function modeIsCompatible(capability: Capability, modes: string[]) {
  return !capability.allowedModes || modes.some((mode) => capability.allowedModes?.includes(mode));
}

function lensIsCompatible(capability: Capability, lenses: string[]) {
  return capability.lenses.length === 0 || lenses.some((lens) => capability.lenses.includes(lens));
}

export function validateRecipe(recipe: Recipe): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const modes = activeModes(recipe);
  const lenses = activeLenses(recipe);
  if (recipe.visibility === 'public' && modes.length !== 1) {
    issues.push({
      slug: recipe.slug,
      message: `Public recipes require exactly one canonical mode; found ${modes.length}`
    });
  }
  for (const ref of recipe.evidenceRefs) {
    if (!(ref in evidenceCatalog))
      issues.push({ slug: recipe.slug, message: `Unknown evidence: ${ref}` });
  }
  for (const setting of recipe.settings) {
    const capability = capabilityById.get(setting.capabilityId);
    if (!capability) {
      issues.push({ slug: recipe.slug, message: `Unknown capability: ${setting.capabilityId}` });
      continue;
    }
    if (recipe.visibility === 'public' && !canValidatePublicRecipe(capability)) {
      issues.push({
        slug: recipe.slug,
        message: `${setting.capabilityId} is not allowed for public recipes`
      });
    }
    if (!capability.observedValues.includes(setting.value)) {
      issues.push({
        slug: recipe.slug,
        message: `${setting.value} is not verified for ${setting.capabilityId}`
      });
    }
    if (!modeIsCompatible(capability, modes)) {
      issues.push({
        slug: recipe.slug,
        message: `${setting.capabilityId} is not verified in mode ${modes.join(', ') || 'none'}`
      });
    }
    if (!lensIsCompatible(capability, lenses)) {
      issues.push({
        slug: recipe.slug,
        message: `${setting.capabilityId} is not verified for lens ${lenses.join(', ') || 'none'}`
      });
    }
    if (!capability.evidenceRefs.some((ref) => recipe.evidenceRefs.includes(ref))) {
      issues.push({
        slug: recipe.slug,
        message: `${setting.capabilityId} has no supporting evidence reference on the recipe`
      });
    }
    for (const locale of ['ja', 'en'] as const) {
      if (setting.label[locale] !== settingLabel(setting, locale)) {
        issues.push({
          slug: recipe.slug,
          message: `Authored ${locale} label does not match canonical setting`
        });
      }
    }
  }
  for (const adjustment of recipe.directionalAdjustments ?? []) {
    const capability = capabilityById.get(adjustment.controlId);
    if (!capability || capability.kind !== 'control') {
      issues.push({
        slug: recipe.slug,
        message: `Directional adjustment has unknown control: ${adjustment.controlId}`
      });
      continue;
    }
    if (recipe.visibility === 'public' && !canValidatePublicRecipe(capability)) {
      issues.push({
        slug: recipe.slug,
        message: `Directional control ${adjustment.controlId} is not allowed for public recipes`
      });
    }
    if (!modeIsCompatible(capability, modes)) {
      issues.push({
        slug: recipe.slug,
        message: `Directional control ${adjustment.controlId} is not verified in mode ${modes.join(', ') || 'none'}`
      });
    }
    if (!lensIsCompatible(capability, lenses)) {
      issues.push({
        slug: recipe.slug,
        message: `Directional control ${adjustment.controlId} is not verified for lens ${lenses.join(', ') || 'none'}`
      });
    }
  }
  if (recipe.visibility === 'public') {
    const allowedTokens = new Set(
      recipe.settings.flatMap((setting) => {
        const capability = capabilityById.get(setting.capabilityId);
        return capability ? capabilityValueTokens(capability) : [];
      })
    );
    const copy = [
      recipe.title,
      recipe.summary,
      ...recipe.tryFirst,
      recipe.adjust,
      recipe.why,
      recipe.safety
    ];
    for (const localized of copy) {
      for (const locale of ['ja', 'en'] as const) {
        for (const token of exactTokens(localized[locale])) {
          if (!allowedTokens.has(token)) {
            issues.push({
              slug: recipe.slug,
              message: `Unverified exact value in ${locale} copy: ${token}`
            });
          }
        }
      }
    }
  }
  return issues;
}

export function validateAllRecipes(items = recipes) {
  const parsed = items.map((item) => recipeSchema.parse(item));
  const duplicateSlugs = parsed.filter(
    (item, index) => parsed.findIndex((other) => other.slug === item.slug) !== index
  );
  return [
    ...duplicateSlugs.map((item) => ({ slug: item.slug, message: 'Duplicate slug' })),
    ...parsed.flatMap(validateRecipe)
  ];
}

export function recipeEvidenceRefs(recipe: Recipe) {
  return [
    ...new Set([
      ...recipe.evidenceRefs,
      ...recipe.settings.flatMap(
        (setting) => capabilityById.get(setting.capabilityId)?.evidenceRefs ?? []
      )
    ])
  ];
}

export function unresolvedRangeControlIds(recipe: Recipe) {
  return [
    ...new Set(
      (recipe.directionalAdjustments ?? [])
        .map((adjustment) => capabilityById.get(adjustment.controlId))
        .filter((capability): capability is Capability => Boolean(capability))
        .filter((capability) => capability.verifiedRange === null)
        .map((capability) => capability.id)
    )
  ];
}

export const publicRecipes = recipes.filter((recipe) => recipe.visibility === 'public');
