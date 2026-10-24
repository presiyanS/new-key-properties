'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { localizeHref } from '@/lib/i18n/config'
import { timelineSteps, type BuildingStage, type Financing } from '@/lib/purchaseTimeline'
import { Choice } from './calculatorFields'

/** Offer-to-keys timeline on /ot-oferta-do-klyuchove; the steps change with how the buyer pays and what they buy. */
export default function PurchaseTimeline() {
  const { locale, dict } = useLocale()
  const t = dict.timeline
  const [financing, setFinancing] = useState<Financing>('mortgage')
  const [stage, setStage] = useState<BuildingStage>('ready')
  const steps = timelineSteps(locale, financing, stage)

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 sm:p-8 mb-8 space-y-5 print:hidden">
        <Choice
          label={t.financing}
          value={financing}
          onChange={setFinancing}
          options={[
            { value: 'cash', label: t.cash },
            { value: 'mortgage', label: t.mortgage },
          ]}
        />
        <Choice
          label={t.stage}
          value={stage}
          onChange={setStage}
          options={[
            { value: 'ready', label: t.ready },
            { value: 'new', label: t.newBuild },
          ]}
        />
      </div>

      <ol className="relative">
        {steps.map((step, i) => (
          <li key={step.id} className="relative pl-14 pb-8 last:pb-0 break-inside-avoid">
            {/* Vertical line joining the numbered dots */}
            {i < steps.length - 1 && <span className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-brand-gold/30" aria-hidden="true" />}
            <span className="absolute left-0 top-0 w-10 h-10 rounded-full bg-brand-green text-brand-gold font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-2">
                <h2 className="font-semibold text-gray-900 text-lg">{step.title}</h2>
                <span className="text-xs font-semibold text-brand-green bg-brand-gold/15 border border-brand-gold/30 rounded-full px-3 py-1 whitespace-nowrap">
                  {step.duration}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                {t.who}: {step.who}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">{step.detail}</p>
              {step.links && (
                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 print:hidden">
                  {step.links.map((l) => (
                    <Link
                      key={l.href}
                      href={localizeHref(l.href, locale)}
                      className="text-sm text-brand-green font-medium hover:text-brand-gold transition-colors"
                    >
                      {l.label} →
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
