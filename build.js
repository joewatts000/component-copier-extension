/* eslint-disable no-undef */
import { watch } from 'fs';

const isWatchMode = process.argv.includes('--watch');

async function build() {
  await Bun.build({
    entrypoints: ['./src/content/index.js'],
    outdir: './dist',
    naming: 'content.js',
    minify: true,
  });

  await Bun.build({
    entrypoints: ['./src/background/index.js'],
    outdir: './dist',
    naming: 'background.js',
    minify: true,
  });

  await Bun.write(
    './dist/manifest.json',
    await Bun.file('./public/manifest.json').text()
  );
  await Bun.write(
    './dist/icon48.png',
    await Bun.file('./public/icon48.png').arrayBuffer()
  );
  await Bun.write(
    './dist/icon128.png',
    await Bun.file('./public/icon128.png').arrayBuffer()
  );

  console.log('Build completed!');
}

build();

if (isWatchMode) {
  console.log('Watching for changes...');
  watch('./src', { recursive: true }, (eventType, filename) => {
    console.log(`Changes detected in ${filename}`);
    build();
  });
  watch('./public', { recursive: true }, (eventType, filename) => {
    console.log(`Changes detected in ${filename}`);
    build();
  });
}
