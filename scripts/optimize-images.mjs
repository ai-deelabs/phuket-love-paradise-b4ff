// Pre-optimizes assets/ JPGs into public/img WebP variants for the static
// export (next/image optimization is unavailable with output:'export').
// Idempotent: skips outputs that already exist and are newer than the source.
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const SRC = 'assets';
const OUT = 'public/img';
const VARIANTS = [
  { suffix: '-1600', width: 1600, quality: 72 },
  { suffix: '-800', width: 800, quality: 74 },
  { suffix: '-thumb', width: 200, height: 200, quality: 74 },
];
// data-source scans never shipped on pages
const SKIP = /^(brochure_|price_|plan_|divingbrochure_)/;

mkdirSync(OUT, { recursive: true });
let made = 0;
for (const file of readdirSync(SRC).filter((f) => f.endsWith('.jpg') && !SKIP.test(f))) {
  const base = file.replace(/\.jpg$/, '');
  const srcPath = join(SRC, file);
  const srcTime = statSync(srcPath).mtimeMs;
  for (const v of VARIANTS) {
    const outPath = join(OUT, `${base}${v.suffix}.webp`);
    if (existsSync(outPath) && statSync(outPath).mtimeMs > srcTime) continue;
    let img = sharp(srcPath);
    img = v.height
      ? img.resize(v.width, v.height, { fit: 'cover' })
      : img.resize({ width: v.width, withoutEnlargement: true });
    await img.webp({ quality: v.quality }).toFile(outPath);
    made++;
  }
}
console.log(`optimize-images: ${made} file(s) written to ${OUT}`);
