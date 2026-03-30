/** Asegura enlace absoluto para abrir en nueva pestaña. */
export function normalizeExternalHref(raw: string): string {
  const url = raw.trim();
  if (!url) return "#";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}
