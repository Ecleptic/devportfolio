/** Resolve legacy local filenames or durable Sanity image URLs from the CMS export. */
export function resolveProjectImage(
  value: string | undefined,
  imagesByName: ReadonlyMap<string, string>,
  width?: number
): string | undefined {
  const source = value?.trim();
  if (!source) {
    return undefined;
  }

  const filename = imagesByName.get(source.toLowerCase());
  if (filename) {
    return `/images/${encodeURIComponent(filename)}`;
  }

  try {
    const url = new URL(source);
    if (
      url.protocol === 'https:' &&
      url.hostname === 'cdn.sanity.io' &&
      !url.port &&
      !url.username &&
      !url.password &&
      /^\/images\/[^/]+\/[^/]+\/[^/]+$/.test(url.pathname)
    ) {
      if (width) {
        url.searchParams.set('w', String(width));
        url.searchParams.set('q', '85');
        url.searchParams.set('auto', 'format');
        url.searchParams.set('fit', 'max');
      }
      return url.href;
    }
  } catch {
    // Unknown filenames and invalid URLs intentionally keep the text-only card.
  }

  return undefined;
}
