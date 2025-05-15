export function truncateText(text: string, maxChars: number): string {
  return text.length > maxChars ? text.slice(0, maxChars) + "..." : text;
}
