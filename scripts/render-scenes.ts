import path from 'path';
import fs from 'fs';
import { bundle } from '@remotion/bundler';
import { getCompositions, renderMedia, RenderMediaOnProgress } from '@remotion/renderer';

interface RenderOptions {
  format: 'prores' | 'webm' | 'mp4';
  id?: string;
  outDir: string;
  entryPoint: string;
}

function parseArgs(): RenderOptions {
  const args = process.argv.slice(2);
  let format: 'prores' | 'webm' | 'mp4' = 'prores';
  let id: string | undefined = undefined;
  let outDir = path.resolve(process.cwd(), 'out/scenes');

  for (const arg of args) {
    if (arg.startsWith('--format=')) {
      const f = arg.split('=')[1].toLowerCase();
      if (f === 'prores' || f === 'webm' || f === 'mp4') {
        format = f;
      }
    } else if (arg.startsWith('--id=')) {
      id = arg.split('=')[1].trim();
    } else if (arg.startsWith('--outDir=')) {
      outDir = path.resolve(process.cwd(), arg.split('=')[1].trim());
    }
  }

  return {
    format,
    id,
    outDir,
    entryPoint: path.resolve(process.cwd(), 'src/index.ts'),
  };
}

async function main() {
  const options = parseArgs();
  console.log('====================================================');
  console.log('🎬 OFurry Motion Scene Batch Renderer');
  console.log(`📦 Output format: ${options.format.toUpperCase()} (Alpha: ${options.format !== 'mp4'})`);
  console.log(`📁 Destination:   ${options.outDir}`);
  if (options.id) {
    console.log(`🎯 Target Scene:  ${options.id}`);
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

  console.log('🔍 Discovering scene compositions...');
  const compositions = await getCompositions(bundleLocation);
  
  // Filter for scene-level compositions
  let sceneCompositions = compositions.filter(
    (c) => c.id.startsWith('COE-Cena-') || c.id.startsWith('Scene-')
  );

  if (options.id) {
    const target = options.id.toLowerCase();
    sceneCompositions = sceneCompositions.filter((c) => {
      const idLower = c.id.toLowerCase();
      // Match by exact composition ID, scene number index, or substring
      return (
        idLower === target ||
        idLower.includes(target) ||
        idLower.includes(`cena-${target}-`) ||
        idLower.includes(`cena-${target}`) ||
        idLower.includes(`cena-0${target}-`)
      );
    });
  }

  if (sceneCompositions.length === 0) {
    console.error(`❌ No compositions found matching query: ${options.id || 'all'}`);
    process.exit(1);
  }

  console.log(`Found ${sceneCompositions.length} scene(s) to render.\n`);

  // Codec and container configurations
  const codecConfig = {
    prores: {
      codec: 'prores' as const,
      proResProfile: '4444' as const,
      pixelFormat: 'yuva444p10le' as const,
      extension: 'mov',
    },
    webm: {
      codec: 'vp9' as const,
      pixelFormat: 'yuva420p' as const,
      extension: 'webm',
    },
    mp4: {
      codec: 'h264' as const,
      pixelFormat: 'yuv420p' as const,
      extension: 'mp4',
    },
  }[options.format];

  for (let i = 0; i < sceneCompositions.length; i++) {
    const comp = sceneCompositions[i];
    const outputFile = path.join(options.outDir, `${comp.id}.${codecConfig.extension}`);
    console.log(`▶ [${i + 1}/${sceneCompositions.length}] Rendering: ${comp.id}`);
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
      outputLocation: outputFile,
      onProgress,
      overwrite: true,
    });

    const durationSec = ((Date.now() - renderStartTime) / 1000).toFixed(1);
    console.log(`\r  ✓ Complete in ${durationSec}s                               \n`);
  }

  console.log('🎉 All scenes rendered successfully!');
}

main().catch((err) => {
  console.error('Render error:', err);
  process.exit(1);
});
