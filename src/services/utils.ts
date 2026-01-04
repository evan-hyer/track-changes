/**
 * Sanitizes a string for use in a SOQL query.
 *
 * @param input - The string to sanitize.
 * @returns The sanitized string.
 */
export function sanitizeSoqlString(input: string): string {
  return input.replaceAll('\\', String.raw`\\`).replaceAll("'", String.raw`\'`);
}

/**
 * Escapes a string for use in HTML.
 *
 * @param unsafe - The string to escape.
 * @returns The escaped string.
 */
export function escapeHtml(unsafe: null | string | undefined): string {
  if (!unsafe) {
    return '';
  }

  return String(unsafe)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
