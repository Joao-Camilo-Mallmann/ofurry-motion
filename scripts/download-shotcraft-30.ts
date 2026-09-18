import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { spawnSync } from 'child_process';

const TARGET_DIR = join(process.cwd(), 'public', 'presets', 'videos');

if (!existsSync(TARGET_DIR)) {
  mkdirSync(TARGET_DIR, { recursive: true });
}

// The 31 prioritized V1 shots
export const V1_PRESET_MP4S = [
  'basic-3d-scene.mp4',
  'cursor-flyover.mp4',
  'blur-slide.mp4',
  'brace-expand.mp4',
  'cel-flash-stomp.mp4',
  'countdown-arc-scatter.mp4',
  'glitch-cycle.mp4',
  'paper-title-card.mp4',
  'text-as-mask.mp4',
  'title-demote-to-label.mp4',
  'split-text-stagger.mp4',
  'scramble-decode.mp4',
  'word-relay-filmstrip.mp4',
  'counter-confetti.mp4',
  'ring-diagram-annotation-reveal.mp4',
  'timeline-travel.mp4',
  'value-stagger-gradient.mp4',
  'beat-step-list-theme-cycle.mp4',
  'bezier-source-converge-merge.mp4',
  'panel-to-canvas.mp4',
  'card-stack.mp4',
  'pop-burst-confirm.mp4',
  'list-reveal.mp4',
  'product-card-progressive-assemble.mp4',
  'radial-ripple-phone-chips.mp4',
  'research-card-stack-scroll.mp4',
  'segmented-thumb-hero.mp4',
  'skeleton-reveal.mp4',
  'svg-shape-morph.mp4',
  'icon-flip-bloom.mp4',
  'bottom-push-stack-wipe.mp4',
];

console.log(`🚀 Starting download of ${V1_PRESET_MP4S.length} Video-Shotcraft V1 preview MP4s to: ${TARGET_DIR}`);

let downloaded = 0;
let skipped = 0;

for (const filename of V1_PRESET_MP4S) {
  const destPath = join(TARGET_DIR, filename);
  if (existsSync(destPath)) {
    console.log(`  ⏩ [EXISTS] ${filename}`);
    skipped++;
    continue;
  }

  console.log(`  ⬇️ Downloading ${filename}...`);
  const result = spawnSync('gh', [
    'release',
    'download',
    'gallery-media',
    '--repo',
    'Vincentwei1021/video-shotcraft',
    '--dir',
    TARGET_DIR,
    '--pattern',
    filename,
    '--clobber',
  ], { stdio: 'inherit' });

  if (result.status === 0 && existsSync(destPath)) {
    console.log(`  ✅ [OK] ${filename}`);
    downloaded++;
  } else {
    console.error(`  ❌ [FAILED] Could not download ${filename}`);
  }
}

console.log(`\n🎉 Download complete! Total: ${V1_PRESET_MP4S.length} | Downloaded: ${downloaded} | Pre-existing: ${skipped}`);
