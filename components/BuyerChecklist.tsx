'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { localizeHref } from '@/lib/i18n/config'
import { getBuyerChecklist, type ChecklistItem } from '@/lib/buyerChecklist'

// Ticked items are remembered in the visitor's own browser only (nothing is
// sent to us). Storage can be blocked, e.g. in private mode, so every access
// is wrapped and the checklist still works without it.
const STORAGE_KEY = 'nkp-buyer-checklist'

function loadChecked(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

function saveChecked(checked: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
  } catch {}
}

export default function BuyerChecklist() {
  const { locale, dict } = useLocale()
  const t = dict.checklist
  const content = getBuyerChecklist(locale)
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  // Read saved ticks after the first render so server and browser HTML match.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChecked(loadChecked())
  }, [])

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] }
    setChecked(next)
    saveChecked(next)
  }

  const reset = () => {
    setChecked({})
    saveChecked({})
  }

  const allItems = content.sections.flatMap((s) => s.items)
  const done = allItems.filter((i) => checked[i.id]).length
  const percent = Math.round((done / allItems.length) * 100)

  const renderItem = (item: ChecklistItem) => {
    const isChecked = !!checked[item.id]
    return (
      <li key={item.id} className="break-inside-avoid">
        <label className="flex gap-4 cursor-pointer group">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => toggle(item.id)}
            className="mt-1 w-5 h-5 shrink-0 accent-brand-green cursor-pointer"
          />
          <span>
            <span className={`block font-semibold transition-colors ${isChecked ? 'text-gray-400 line-through' : 'text-gray-900 group-hover:text-brand-green'}`}>
              {item.title}
            </span>
            <span className="block text-gray-600 text-sm leading-relaxed mt-1">
              {item.detail}
              {item.id === 'razhodi' && (
                <>
                  {' '}
                  <Link href={localizeHref('/kalkulator', locale)} className="text-brand-green font-medium hover:text-brand-gold transition-colors whitespace-nowrap print:hidden">
                    {t.calculatorLink} →
                  </Link>
                </>
              )}
            </span>
          </span>
        </label>
      </li>
    )
  }

  return (
    <div>
      {/* Progress bar - stays visible while scrolling */}
      <div className="sticky top-20 z-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-8 print:hidden">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-sm font-semibold text-brand-green">
            {t.progress} {done} {t.of} {allItems.length}
          </span>
          <div className="flex items-center gap-4 text-sm">
            <button type="button" onClick={() => window.print()} className="text-gray-500 hover:text-brand-green transition-colors">
              {t.print}
            </button>
            {done > 0 && (
              <button type="button" onClick={reset} className="text-gray-500 hover:text-brand-green transition-colors">
                {t.reset}
              </button>
            )}
          </div>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-gold transition-all duration-300" style={{ width: `${percent}%` }} />
        </div>
        <p className="text-xs text-gray-400 mt-2">{t.savedNote}</p>
      </div>

      <div className="space-y-8 print:space-y-6">
        {content.sections.map((section, sIdx) => (
          <section key={section.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 print:shadow-none print:border-0 print:rounded-none print:p-0">
            {/* On paper the heading stays on the same page as its first item. */}
            <div className="break-inside-avoid">
              <h2 className="font-serif text-2xl font-bold text-brand-green mb-2 print:text-xl">
                <span className="text-brand-gold mr-2">{sIdx + 1}.</span>
                {section.title}
              </h2>
              <p className="text-gray-500 mb-6 print:mb-3 print:text-sm">{section.intro}</p>
              <ul>{renderItem(section.items[0])}</ul>
            </div>
            <ul className="space-y-4 mt-4 print:space-y-2 print:mt-2">{section.items.slice(1).map(renderItem)}</ul>
          </section>
        ))}

        {/* Red flags - information, not tick boxes */}
        <section className="bg-red-50 border border-red-100 rounded-2xl p-6 sm:p-8 break-inside-avoid print:bg-white print:border-red-300">
          <h2 className="font-serif text-2xl font-bold text-red-900 mb-2">{content.redFlagsTitle}</h2>
          <p className="text-red-800/80 mb-6">{content.redFlagsIntro}</p>
          <ul className="space-y-3">
            {content.redFlags.map((flag) => (
              <li key={flag} className="flex gap-3 text-red-900">
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
