import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/*.jpg', { eager: true });

/** Resolve a filename from src/assets/ (as stored in content JSON) to its image. */
export function assetImage(filename: string): ImageMetadata {
  const entry = images[`../assets/${filename}`];
  if (!entry) throw new Error(`Missing asset image: src/assets/${filename}`);
  return entry.default;
}

export const formatBaht = (n: number) => `฿${n.toLocaleString('en-US')}`;
