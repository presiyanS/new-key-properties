import type { Metadata } from 'next'
import RentalYieldCalculator from '@/components/RentalYieldCalculator'
import { getSiteSettings } from '@/lib/sanity'
import { draftMode } from 'next/headers'
import { getLocale } from '@/lib/i18n/getDictionary'
import { hreflangAlternates } from '@/lib/i18n/config'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const url = `https://www.newkey.bg${locale === 'en' ? '/en/dohodnost-ot-naem' : '/dohodnost-ot-naem'}`
  const image = { url: '/og-default.png', width: 1200, height: 630 }
  const { title, description } =
    locale === 'en'
      ? {
          title: 'Rental yield calculator for Sofia | New Key Properties',
          description:
            'See the real return on a rental property in Sofia: after empty months, tax on rent, local fees, upkeep and buying costs. Free, no sign-up.',
        }
      : {
          title: 'Калкулатор за доходност от наем в София | New Key Properties',
          description:
            'Вижте реалната доходност от отдаване под наем на имот в София: след празни месеци, данък върху наема, местни такси, поддръжка и разходи по покупката.',
        }
  return {
    // absolute: the layout would otherwise add a second "| New Key Properties"
    title: { absolute: title },
    description,
    alternates: hreflangAlternates('/dohodnost-ot-naem', locale),
    openGraph: { title, description, url, siteName: 'New Key Properties', type: 'website', images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  }
}

const textBg = {
  heroBadge: 'Безплатно · Без регистрация',
  heroTitle: 'Колко реално ще Ви носи',
  heroTitleGold: 'имотът под наем?',
  heroSubtitle: 'Доходността в обявите обикновено е просто наем делено на цена. Тук ще видите какво остава след празни месеци, данък, местни такси, поддръжка и разходите по покупката.',
  ctaTitle: 'Обмисляте имот за инвестиция?',
  ctaSubtitle: 'Ще Ви кажем честно какъв наем е реалистичен за конкретния квартал и имот, преди да купите. Работим с ограничен брой клиенти на месец, за да отделим на всеки нужното внимание.',
}

const textEn: typeof textBg = {
  heroBadge: 'Free · No sign-up',
  heroTitle: 'How much will a rental',
  heroTitleGold: 'really earn you?',
  heroSubtitle: 'The yield in listings is usually just rent divided by price. Here you see what is left after empty months, tax, local fees, upkeep and the costs of buying.',
  ctaTitle: 'Considering a property as an investment?',
  ctaSubtitle: "We'll tell you honestly what rent is realistic for the specific neighborhood and property before you buy. We work with a limited number of clients each month so every one gets the attention they need.",
}

export default async function RentalYieldPage() {
  const { isEnabled: preview } = await draftMode()
  const settings = await getSiteSettings(preview)
  const locale = await getLocale()
  const t = locale === 'en' ? textEn : textBg
  const phone = settings?.phone ?? '0879826292'
  const phoneDisplay = settings?.phoneDisplay ?? '0879 826 292'

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-green py-20 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
              <span className="text-brand-gold text-sm font-medium">{t.heroBadge}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight animate-fade-up">
              {t.heroTitle}<br />
              <span className="text-brand-gold">{t.heroTitleGold}</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ── Calculators ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <RentalYieldCalculator />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-brand-green mb-4">{t.ctaTitle}</h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">{t.ctaSubtitle}</p>
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold-light transition-all text-lg shadow-lg shadow-brand-gold/20 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            {phoneDisplay}
          </a>
        </div>
      </section>
    </>
  )
}
