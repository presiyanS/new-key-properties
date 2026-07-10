import 'server-only'
import { headers } from 'next/headers'
import type { Locale } from './config'
import { defaultLocale } from './config'
import bg from './dictionaries/bg'
import en from './dictionaries/en'

const dictionaries = { bg, en }

export async function getLocale(): Promise<Locale> {
  const headersList = await headers()
  const locale = headersList.get('x-locale')
  return locale === 'en' ? 'en' : defaultLocale
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}

export type Dictionary = typeof bg
