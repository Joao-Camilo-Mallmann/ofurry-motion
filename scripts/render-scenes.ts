import path from 'path';
import fs from 'fs';
import { bundle } from '@remotion/bundler';
import { getCompositions, renderMedia, RenderMediaOnProgress } from '@remotion/renderer';

interface RenderOptions {
  format: 'prores' | 'webm' | 'mp4';
  video?: string;
  scene?: string;
  full?: boolean;
  outDir: string;
  entryPoint: string;
}

function parseArgs(): RenderOptions {
  const args = process.argv.slice(2);
  let format: 'prores' | 'webm' | 'mp4' = 'prores';
  let video: string | undefined = undefined;
  let scene: string | undefined = undefined;
  let full: boolean = false;
  let customOutDir: string | undefined = undefined;

  for (const arg of args) {
    if (arg.startsWith('--format=')) {
      const f = arg.split('=')[1].toLowerCase();
      if (f === 'prores' || f === 'webm' || f === 'mp4') {
        format = f;
      }
    } else if (arg.startsWith('--video=')) {
      video = arg.split('=')[1].trim();
    } else if (arg.startsWith('--scene=')) {
      scene = arg.split('=')[1].trim();
    } else if (arg.startsWith('--id=')) {
      scene = arg.split('=')[1].trim();
    } else if (arg === '--full') {
      full = true;
    } else if (arg.startsWith('--outDir=')) {
      customOutDir = path.resolve(process.cwd(), arg.split('=')[1].trim());
    } else if (!arg.startsWith('-')) {
      // Positional argument: first is video, second is scene
      if (!video) {
        video = arg.trim();
      } else if (!scene) {
        scene = arg.trim();
      }
    }
  }

  // If rendering full sequence and format was not explicitly set to prores/webm, default to mp4
  if (full && !args.some((a) => a.startsWith('--format='))) {
    format = 'mp4';
  }

  let outDir: string;
  if (customOutDir) {
    outDir = customOutDir;
  } else if (video) {
    outDir = path.resolve(process.cwd(), 'videos', video, 'out');
  } else {
    outDir = path.resolve(process.cwd(), 'out/scenes');
  }

  return {
    format,
    video,
    scene,
    full,
    outDir,
    entryPoint: path.resolve(process.cwd(), 'src/index.ts'),
  };
}

async function main() {
  const options = parseArgs();
  console.log('====================================================');
  console.log('🎬 OFurry Motion Renderer (Video-Scoped Architecture)');
  if (options.video) {
    console.log(`📁 Target Video:  ${options.video.toUpperCase()}`);
  }
  console.log(`📦 Output format: ${options.format.toUpperCase()} (Alpha: ${options.format !== 'mp4'})`);
  console.log(`💾 Destination:   ${options.outDir}`);
  if (options.full) {
    console.log(`🎥 Mode:          Full Sequence (full.${options.format === 'prores' ? 'mov' : options.format})`);
  } else if (options.scene) {
    console.log(`🎯 Target Scene:  ${options.scene}`);
  } else {
    console.log(`🎞️ Mode:          All Scenes for ${options.video ?? 'All Videos'}`);
  }
  console.log('====================================================\n');

  if (!fs.existsSync(options.outDir)) {
    fs.mkdirSync(options.outDir, { recursive: true });
  }

  console.log('⏳ Bundling Remotion project...');
  const bundleStartTime = Date.now();
  const bundleLocation = await bundle({
    entryPoint: options.entryPoint,
    webpackOverride: (config) => config,
  });
  console.log(`✓ Bundled in ${((Date.now() - bundleStartTime) / 1000).toFixed(1)}s\n`);

  console.log('🔍 Discovering compositions...');
  const compositions = await getCompositions(bundleLocation);

  let targetCompositions = compositions;

  // 1. Full Sequence Mode
  if (options.full) {
    const videoTarget = (options.video ?? '').toLowerCase();
    targetCompositions = compositions.filter((c) => {
      const idLower = c.id.toLowerCase();
      if (videoTarget) {
        return (
          idLower === `${videoTarget}-full-sequence` ||
          idLower === `${videoTarget}composition` ||
          idLower.startsWith(`${videoTarget}-full`)
        );
      }
      return idLower.includes('full-sequence') || idLower.includes('composition');
    });
  } else {
    // 2. Scene-Level Compositions Filter
    targetCompositions = compositions.filter((c) => {
      const idLower = c.id.toLowerCase();
      // Exclude full sequences unless specifically targeted
      if (idLower.includes('full-sequence') || idLower.endsWith('composition') || idLower === 'placeholder') {
        return false;
      }
      if (options.video) {
        return idLower.startsWith(`${options.video.toLowerCase()}-`);
      }
      return idLower.includes('-cena-') || idLower.startsWith('scene-') || idLower.includes('cena');
    });

    // 3. Filter specific scene ID/number if provided
    if (options.scene) {
      const target = options.scene.toLowerCase();
      const numTarget = target.replace(/^0+/, '').padStart(2, '0');
      
      const exactOrIndexMatches = targetCompositions.filter((c) => {
        const idLower = c.id.toLowerCase();
        return (
          idLower === target ||
          idLower.includes(`-cena-${numTarget}-`) ||
          idLower.includes(`-cena-${target}-`) ||
          idLower.endsWith(`-${target}`)
        );
      });

      if (exactOrIndexMatches.length > 0) {
        targetCompositions = exactOrIndexMatches;
      } else {
        targetCompositions = targetCompositions.filter((c) => {
          const idLower = c.id.toLowerCase();
          return idLower.includes(target);
        });
      }
    }
  }

  if (targetCompositions.length === 0) {
    console.error(`❌ No compositions found matching criteria: video=${options.video || 'any'}, scene=${options.scene || 'all'}, full=${options.full}`);
    console.log('Available compositions were:');
    compositions.forEach((c) => console.log(`  - ${c.id}`));
    process.exit(1);
  }

  console.log(`Found ${targetCompositions.length} composition(s) to render.\n`);

  // Codec and container configurations
  const codecConfig = {
    prores: {
      codec: 'prores' as const,
      proResProfile: '4444' as const,
      pixelFormat: 'yuva444p10le' as const,
      imageFormat: 'png' as const,
      extension: 'mov',
    },
    webm: {
      codec: 'vp9' as const,
      pixelFormat: 'yuva420p' as const,
      imageFormat: 'png' as const,
      extension: 'webm',
    },
    mp4: {
      codec: 'h264' as const,
      pixelFormat: 'yuv420p' as const,
      imageFormat: 'jpeg' as const,
      extension: 'mp4',
    },
  }[options.format];

  for (let i = 0; i < targetCompositions.length; i++) {
    const comp = targetCompositions[i];
    const fileName = options.full ? `full.${codecConfig.extension}` : `${comp.id}.${codecConfig.extension}`;
    const outputFile = path.join(options.outDir, fileName);

    console.log(`▶ [${i + 1}/${targetCompositions.length}] Rendering: ${comp.id}`);
    console.log(`  ⏱ Duration: ${comp.durationInFrames} frames (${(comp.durationInFrames / comp.fps).toFixed(1)}s)`);
    console.log(`  💾 Output:   ${outputFile}`);

    const renderStartTime = Date.now();

    const onProgress: RenderMediaOnProgress = ({ progress }) => {
      const pct = Math.floor(progress * 100);
      process.stdout.write(`\r  ⚡ Progress: ${pct}%`);
    };

    await renderMedia({
      composition: comp,
      serveUrl: bundleLocation,
      codec: codecConfig.codec,
      proResProfile: (codecConfig as { proResProfile?: '4444' }).proResProfile,
      pixelFormat: codecConfig.pixelFormat,
      imageFormat: codecConfig.imageFormat,
      outputLocation: outputFile,
      onProgress,
      overwrite: true,
    });

    const durationSec = ((Date.now() - renderStartTime) / 1000).toFixed(1);
    console.log(`\r  ✓ Complete in ${durationSec}s                               \n`);
  }

  console.log('🎉 Render job completed successfully!');
}

main().catch((err) => {
  console.error('Render error:', err);
  process.exit(1);
});
