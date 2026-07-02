/**
 * The Next.js dev server matches dynamic-route params against the URL segment
 * in percent-encoded form (uppercase from browsers, lowercase from some
 * clients), while `next build` uses the raw value to name export directories.
 * So in development we register encoded aliases alongside each raw param;
 * production builds emit only the raw (Thai-named) directories.
 */
export function devEncodedVariants(value: string): string[] {
  const out = [value];
  if (process.env.NODE_ENV === 'development') {
    const encoded = encodeURIComponent(value);
    if (encoded !== value) out.push(encoded, encoded.toLowerCase());
  }
  return out;
}
