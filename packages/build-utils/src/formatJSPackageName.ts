/**
 * Formats passed value making it a path to a global variable.
 * @param value - value to format.
 */
export function formatJSPackageName(value: string): string {
  return value
    .replace(/^@dominate-color-js\/\//, 'dominate-color-js.')
    .replace(/-[a-z]/, match => match[1].toUpperCase());
}