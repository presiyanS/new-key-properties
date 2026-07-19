import type { Metadata } from 'next'
import ValuationForm from '@/components/ValuationForm'
import AnimatedSection from '@/components/AnimatedSection'
import { getSiteSettings } from '@/lib/sanity'
import { draftMode } from 'next/headers'
import { getLocale } from '@/lib/i18n/getDictionary'
import { hreflangAlternates } from '@/lib/i18n/config'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const url = `https://www.newkey.bg${locale === 'en' ? '/en/otsenka' : '/otsenka'}`
  const image = { url: '/og-otsenka.png', width: 1200, height: 630 }

  if (locale === 'en') {
    const title = 'Free Property Valuation | New Key Properties'
    const description =
      'Get a free, honest market valuation of your property in Sofia. No obligation — our brokers respond within 24 hours with a fair price estimate.'
    return {
      title,
      description,
      alternates: hreflangAlternates('/otsenka', locale),
      openGraph: { title, description, url, siteName: 'New Key Properties', type: 'website', images: [image] },
      twitter: { card: 'summary_large_image', title, description, images: [image.url] },
    }
  }
  const title = 'Безплатна Оценка на Имот | New Key Properties'
  const description =
    'Получете безплатна и честна пазарна оценка на Вашия имот в София. Без ангажимент — нашите брокери отговарят до 24 часа с точна ценова оценка.'
  return {
    title,
    description,
    alternates: hreflangAlternates('/otsenka', locale),
    openGraph: { title, description, url, siteName: 'New Key Properties', type: 'website', images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  }
}

const benefitIcons = [
  <svg key="0" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3v-6m-3 6v-9m-2 9h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z" /></svg>,
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
]

const textBg = {
  heroBadge: 'Напълно безплатно · Без ангажимент',
  heroTitle: 'Колко струва',
  heroTitleGold: 'моят имот?',
  heroSubtitle: 'Получете честна и точна пазарна оценка на Вашия имот в София — базирана на реални сделки в квартала, не на завишени очаквания. Отговаряме до 24 часа.',
  heroButton: 'Заявете безплатна оценка',
  benefitsEyebrow: 'Защо да изберете нас',
  benefitsTitle: 'Оценка, на която можете да разчитате',
  benefitsSubtitle: 'Не завишаваме цени, за да спечелим клиент. Казваме Ви истината за пазара — защото Ви ценим като бъдещ клиент, не като еднократна сделка.',
  benefits: [
    { title: 'Реални пазарни данни', desc: 'Базираме оценката на актуални сделки и обяви в конкретния квартал — не на усещане.' },
    { title: 'Честна цена', desc: 'Не Ви казваме каквото искате да чуете. Казваме Ви истината, дори ако тя означава по-ниска цена от очакваната.' },
    { title: 'Без ангажимент', desc: 'Оценката е напълно безплатна. Не сте длъжни да работите с нас след това.' },
    { title: 'Лично внимание', desc: 'Работим с ограничен брой клиенти на месец — Вашата заявка получава реално внимание, не автоматичен отговор.' },
  ],
  formEyebrow: 'Заявка',
  formTitle: 'Заявете Вашата оценка',
  formSubtitle: 'Попълнете формата с няколко детайла за имота и ще се свържем с Вас в рамките на 24 часа.',
  formCardBadge: 'Безплатно',
  formCardTitle: 'Данни за имота',
}

const textEn: typeof textBg = {
  heroBadge: 'Completely Free · No Obligation',
  heroTitle: "What's My",
  heroTitleGold: 'Property Worth?',
  heroSubtitle: "Get a fair, accurate market valuation of your property in Sofia — based on real deals in the neighborhood, not inflated expectations. We respond within 24 hours.",
  heroButton: 'Request a Free Valuation',
  benefitsEyebrow: 'Why Choose Us',
  benefitsTitle: 'A Valuation You Can Trust',
  benefitsSubtitle: "We don't inflate prices to win a client. We tell you the truth about the market — because we value you as a future client, not a one-time deal.",
  benefits: [
    { title: 'Real Market Data', desc: 'We base the valuation on actual recent deals and listings in your specific neighborhood — not a gut feeling.' },
    { title: 'An Honest Price', desc: "We don't tell you what you want to hear. We tell you the truth, even if it means a lower price than expected." },
    { title: 'No Obligation', desc: "The valuation is completely free. You're not required to work with us afterward." },
    { title: 'Personal Attention', desc: 'We work with a limited number of clients each month — your request gets real attention, not an automated reply.' },
  ],
  formEyebrow: 'Request',
  formTitle: 'Request Your Valuation',
  formSubtitle: "Fill in a few details about the property and we'll get back to you within 24 hours.",
  formCardBadge: 'Free',
  formCardTitle: 'Property Details',
}

export default async function OtsenkaPage() {
  const { isEnabled: preview } = await draftMode()
  const settings = await getSiteSettings(preview)
  const locale = await getLocale()
  const t = locale === 'en' ? textEn : textBg
  const phone = settings?.phone ?? '0879826292'
  const phoneDisplay = settings?.phoneDisplay ?? '0879 826 292'

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-green py-28 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-brand-gold/3 blur-2xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
              <span className="text-brand-gold text-sm font-medium">{t.heroBadge}</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-up">
              {t.heroTitle}<br />
              <span className="text-brand-gold">{t.heroTitleGold}</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed mb-10 max-w-2xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <a
                href="#form"
                className="bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold-light transition-all text-lg shadow-lg shadow-brand-gold/20 hover:-translate-y-0.5"
              >
                {t.heroButton}
              </a>
              <a
                href={`tel:${phone}`}
                className="border-2 border-brand-gold/50 text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/10 hover:border-brand-gold transition-all text-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                {phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">{t.benefitsEyebrow}</span>
            <h2 className="font-serif text-4xl font-bold text-brand-green mt-3 mb-4">{t.benefitsTitle}</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">{t.benefitsSubtitle}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.benefits.map((b, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-gray-50 rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group h-full">
                  <div className="w-14 h-14 bg-brand-green rounded-xl flex items-center justify-center text-brand-gold mb-5 group-hover:bg-brand-green-light transition-colors shadow-sm shadow-brand-green/10">
                    {benefitIcons[i] ?? benefitIcons[0]}
                  </div>
                  <h3 className="font-bold text-brand-green text-lg mb-2 group-hover:text-brand-green-light transition-colors">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form section ── */}
      <section id="form" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">{t.formEyebrow}</span>
            <h2 className="font-serif text-4xl font-bold text-brand-green mt-3 mb-4">{t.formTitle}</h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xl mx-auto">{t.formSubtitle}</p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100">
              <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">{t.formCardBadge}</span>
              <h3 className="font-serif text-2xl font-bold text-brand-green mt-2 mb-8">{t.formCardTitle}</h3>
              <ValuationForm locale={locale} />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
