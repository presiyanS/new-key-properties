/**
 * Bulgarian Cyrillic → Latin transliteration (streamlined system used for
 * Bulgarian place names, e.g. "Стрелбище" → "Strelbishte"). Used to build
 * readable URL slugs for listings from their (Cyrillic) neighborhood name.
 */
const BG_TO_LATIN: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z', и: 'i',
  й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's',
  т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sht',
  ъ: 'a', ь: 'y', ю: 'yu', я: 'ya',
}

export function transliterateBg(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map((ch) => BG_TO_LATIN[ch] ?? ch)
    .join('')
}

/** Transliterates then normalizes into a URL-safe slug (lowercase, hyphen-separated). */
export function slugify(text: string): string {
  return transliterateBg(text)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
