import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import AnimatedSection from '@/components/AnimatedSection'
import { getConsultationPage, getSiteSettings } from '@/lib/sanity'
import { draftMode } from 'next/headers'
import { getLocale, getDictionary } from '@/lib/i18n/getDictionary'
import { hreflangAlternates } from '@/lib/i18n/config'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  if (locale === 'en') {
    return {
      title: 'Free Consultation | New Key Properties',
      description:
        'Book a free consultation with our brokers. Honest advice, no hidden fees — we help you buy, sell, or rent a property in Sofia.',
      alternates: hreflangAlternates('/konsultatsiya', locale),
    }
  }
  return {
    title: 'Безплатна Консултация | New Key Properties',
    description:
      'Запишете се за безплатна консултация с нашите брокери. Честен съвет без скрити такси — помагаме Ви да купите, продадете или наемете имот в София.',
    alternates: hreflangAlternates('/konsultatsiya', locale),
  }
}

export default async function KonsultatsiyaPage() {
  const { isEnabled: preview } = await draftMode()
  const [cms, settings] = await Promise.all([getConsultationPage(preview), getSiteSettings(preview)])
  const locale = await getLocale()
  const dict = getDictionary(locale)

  const phone = settings?.phone ?? '0879826292'
  const phoneDisplay = settings?.phoneDisplay ?? '0879 826 292'

  // Picks the CMS value for the current locale, falling back to a hardcoded
  // default when neither the CMS field nor its English counterpart is set.
  function t(bg: string | undefined, en: string | undefined, bgDefault: string, enDefault: string) {
    return locale === 'en' ? (en ?? enDefault) : (bg ?? bgDefault)
  }

  // Site-settings form copy is Bulgarian-only in the CMS (no En field) — only
  // apply it on the bg site, so English visitors get the dictionary defaults.
  const bgOnly = <T,>(v: T | undefined) => (locale === 'bg' ? v : undefined)

  const monthLocale = locale === 'en' ? 'en-US' : 'bg-BG'
  const heroBadgeDefault = locale === 'en'
    ? `Limited spots for ${new Date().toLocaleDateString(monthLocale, { month: 'long', year: 'numeric' })}`
    : `Ограничени места за месец ${new Date().toLocaleDateString(monthLocale, { month: 'long', year: 'numeric' })}`

  const benefits = (
    cms?.benefits?.length > 0
      ? cms.benefits
      : [
          { title: 'Напълно безплатно', titleEn: 'Completely free', desc: 'Без никакви задължения. Консултацията е безплатна — говорим честно и без да се опитваме да Ви "продадем" нещо.', descEn: 'No obligation whatsoever. The consultation is free — we talk honestly, without trying to "sell" you anything.' },
          { title: 'Честен съвет', titleEn: 'Honest advice', desc: 'Казваме Ви истината — дори ако тя означава да изчакате или да не купувате точно сега. Вашият интерес е на първо място.', descEn: 'We tell you the truth — even if it means waiting, or not buying right now. Your interest comes first.' },
          { title: 'Пазарна оценка', titleEn: 'Market assessment', desc: 'Получавате реална оценка на цените в квартала, който Ви интересува — без преувеличения и без скрити агенди.', descEn: "You get a realistic assessment of prices in the neighborhood you're interested in — no exaggeration, no hidden agenda." },
          { title: 'Личен брокер', titleEn: 'Personal broker', desc: 'Работите директно с Александър или Борил — не с колцентър, не с начинаещ стажант. Лично внимание от първия контакт.', descEn: 'You work directly with Alexander or Boril — not a call center, not a junior intern. Personal attention from the first contact.' },
        ]
  ).map((b: { title: string; titleEn?: string; desc: string; descEn?: string }) => ({
    title: locale === 'en' ? (b.titleEn ?? b.title) : b.title,
    desc: locale === 'en' ? (b.descEn ?? b.desc) : b.desc,
  }))

  const stats = (
    cms?.stats?.length > 0
      ? cms.stats
      : [
          { value: 'Ограничен', valueEn: 'Limited', label: 'брой клиенти на месец — за максимално внимание към всеки', labelEn: 'clients per month — for maximum attention to each one' },
          { value: '0', valueEn: '0', label: 'скрити такси — прозрачност от първия разговор', labelEn: 'hidden fees — transparency from the first conversation' },
          { value: '100%', valueEn: '100%', label: 'отдаденост — работим като за собствен имот', labelEn: 'dedication — we work as if it were our own property' },
        ]
  ).map((s: { value: string; valueEn?: string; label: string; labelEn?: string }) => ({
    value: locale === 'en' ? (s.valueEn ?? s.value) : s.value,
    label: locale === 'en' ? (s.labelEn ?? s.label) : s.label,
  }))

  const steps = (
    cms?.steps?.length > 0
      ? cms.steps
      : [
          { title: 'Попълнете формата', titleEn: 'Fill out the form', desc: 'Кажете ни накратко с какво можем да помогнем.', descEn: 'Tell us briefly how we can help.' },
          { title: 'Обаждаме Ви се', titleEn: 'We call you', desc: 'Свързваме се с Вас до 24 часа, за да уточним час.', descEn: "We get in touch within 24 hours to arrange a time." },
          { title: 'Консултация', titleEn: 'Consultation', desc: '30-45 мин. разговор — по телефон или лично в София.', descEn: '30-45 min. conversation — by phone or in person in Sofia.' },
          { title: 'Решавате Вие', titleEn: 'You decide', desc: 'Без натиск. Работим заедно само ако решите сам.', descEn: 'No pressure. We only work together if you decide to.' },
        ]
  ).map((s: { title: string; titleEn?: string; desc: string; descEn?: string }) => ({
    title: locale === 'en' ? (s.titleEn ?? s.title) : s.title,
    desc: locale === 'en' ? (s.descEn ?? s.desc) : s.desc,
  }))

  const faq = (
    cms?.faq?.length > 0
      ? cms.faq
      : [
          { q: 'Наистина ли е безплатно?', qEn: 'Is it really free?', a: 'Да, напълно безплатно. Нямаме скрити такси за консултацията. Ако решите да работите с нас след това — тогава обсъждаме условия.', aEn: 'Yes, completely free. There are no hidden fees for the consultation. If you decide to work with us afterward, we discuss terms then.' },
          { q: 'Колко продължава консултацията?', qEn: 'How long does the consultation last?', a: 'Обикновено 30-45 минути — по телефон или лично в удобно за Вас място в София.', aEn: 'Usually 30-45 minutes — by phone or in person at a location convenient for you in Sofia.' },
          { q: 'Трябва ли да съм готов да купувам/продавам веднага?', qEn: 'Do I need to be ready to buy or sell right away?', a: 'Не. Много хора идват при нас с въпроси, планират покупка след 3-6 месеца, или просто искат да разберат пазара. Всичко е добре дошло.', aEn: 'No. Many people come to us with questions, plan to buy in 3-6 months, or simply want to understand the market. All of that is welcome.' },
          { q: 'Работите ли само в определени квартали?', qEn: 'Do you only work in certain neighborhoods?', a: 'Работим в цяла София, но специализираме в: Драгалевци, Младост, Овча купел, Дружба, Манастирски ливади и центъра.', aEn: 'We work across all of Sofia, but we specialize in: Dragalevtsi, Mladost, Ovcha Kupel, Druzhba, Manastirski Livadi, and the city center.' },
        ]
  ).map((f: { q: string; qEn?: string; a: string; aEn?: string }) => ({
    q: locale === 'en' ? (f.qEn ?? f.q) : f.q,
    a: locale === 'en' ? (f.aEn ?? f.a) : f.a,
  }))

  const benefitIcons = [
    <svg key="0" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  ]

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
              <span className="text-brand-gold text-sm font-medium">
                {t(cms?.heroBadge, cms?.heroBadgeEn, heroBadgeDefault, heroBadgeDefault)}
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-up">
              {t(cms?.heroTitle, cms?.heroTitleEn, 'Безплатна', 'Free')}<br />
              <span className="text-brand-gold">{t(cms?.heroTitleGold, cms?.heroTitleGoldEn, 'Консултация', 'consultation')}</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed mb-10 max-w-2xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t(
                cms?.heroSubtitle,
                cms?.heroSubtitleEn,
                'Имате въпроси за имотния пазар в София? Мислите да купувате, продавате или наемате? Говорете с нас — честно, без задължения и напълно безплатно.',
                'Have questions about the Sofia property market? Thinking about buying, selling, or renting? Talk to us — honestly, with no obligation, and completely free.'
              )}
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <a
                href="#form"
                className="bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold-light transition-all text-lg shadow-lg shadow-brand-gold/20 hover:-translate-y-0.5"
              >
                {t(cms?.heroBookButton, cms?.heroBookButtonEn, 'Запишете се сега', 'Book now')}
              </a>
              <a
                href={`tel:${phone}`}
                className="border-2 border-brand-gold/50 text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/10 hover:border-brand-gold transition-all text-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                {t(cms?.heroCallButton, cms?.heroCallButtonEn, phoneDisplay, phoneDisplay)}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">{dict.konsultatsiya.benefitsEyebrow}</span>
            <h2 className="font-serif text-4xl font-bold text-brand-green mt-3 mb-4">
              {t(cms?.benefitsTitle, cms?.benefitsTitleEn, 'Какво получавате', 'What you get')}
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              {t(
                cms?.benefitsSubtitle,
                cms?.benefitsSubtitleEn,
                'При консултацията с New Key Properties нямате какво да губите — само да спечелите.',
                'With a New Key Properties consultation, you have nothing to lose — only to gain.'
              )}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b: { title: string; desc: string }, i: number) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-gray-50 rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group h-full">
                  <div className="w-14 h-14 bg-brand-green rounded-xl flex items-center justify-center text-brand-gold mb-5 group-hover:bg-brand-green-light transition-colors shadow-xs shadow-brand-green/10">
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

      {/* ── Stats ── */}
      <section className="py-16 bg-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((s: { value: string; label: string }, i: number) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="group">
                  <p className="font-serif text-5xl font-bold text-brand-gold mb-2 group-hover:scale-105 transition-transform inline-block">{s.value}</p>
                  <p className="text-white/70">{s.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form section ── */}
      <section id="form" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <AnimatedSection direction="left">
              <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">{dict.konsultatsiya.processEyebrow}</span>
              <h2 className="font-serif text-4xl font-bold text-brand-green mt-3 mb-4">
                {t(cms?.formSectionTitle, cms?.formSectionTitleEn, 'Запишете се за консултация', 'Book a consultation')}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">
                {t(
                  cms?.formSectionSubtitle,
                  cms?.formSectionSubtitleEn,
                  'Попълнете формата и ще се свържем с Вас в рамките на 24 часа, за да уточним удобен час.',
                  "Fill out the form and we'll get in touch within 24 hours to arrange a convenient time."
                )}
              </p>
              <div className="space-y-5">
                {steps.map((s: { title: string; desc: string }, i: number) => (
                  <div key={i} className="flex gap-5 items-start">
                    <div className="w-11 h-11 bg-brand-green rounded-xl flex items-center justify-center shrink-0 shadow-xs shadow-brand-green/20">
                      <span className="text-brand-gold font-bold text-xs">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-green mb-0.5">{s.title}</p>
                      <p className="text-gray-500 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100">
                <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">
                  {t(cms?.formCardBadge, cms?.formCardBadgeEn, 'Безплатно', 'Free')}
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-green mt-2 mb-2">
                  {t(cms?.formCardTitle, cms?.formCardTitleEn, 'Вашето запитване', 'Your inquiry')}
                </h3>
                <p className="text-gray-400 text-sm mb-8">
                  {t(cms?.formCardSubtitle, cms?.formCardSubtitleEn, 'Отговаряме в рамките на 24 часа.', 'We respond within 24 hours.')}
                </p>
                <ContactForm
                  endpoint="/api/submit-consultation"
                  nameLabel={bgOnly(settings?.formNameLabel)}
                  namePlaceholder={bgOnly(settings?.formNamePlaceholder)}
                  phoneLabel={bgOnly(settings?.formPhoneLabel)}
                  phonePlaceholder={bgOnly(settings?.formPhonePlaceholder)}
                  emailLabel={bgOnly(settings?.formEmailLabel)}
                  emailPlaceholder={bgOnly(settings?.formEmailPlaceholder)}
                  messageLabel={bgOnly(settings?.formMessageLabel)}
                  messagePlaceholder={bgOnly(settings?.formMessagePlaceholder)}
                  submitText={bgOnly(settings?.formSubmitText)}
                  loadingText={bgOnly(settings?.formLoadingText)}
                  successTitle={bgOnly(settings?.formSuccessTitle)}
                  successMessage={bgOnly(settings?.formSuccessMessage)}
                  errorMessage={bgOnly(settings?.formErrorMessage)}
                  footerNote={bgOnly(settings?.formFooterNote)}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">{dict.konsultatsiya.questionsEyebrow}</span>
            <h2 className="font-serif text-4xl font-bold text-brand-green mt-3">
              {t(cms?.faqTitle, cms?.faqTitleEn, 'Често задавани въпроси', 'Frequently asked questions')}
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {faq.map((item: { q: string; a: string }, i: number) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="border border-gray-200 rounded-2xl p-6 hover:border-brand-green/30 hover:shadow-xs transition-all">
                  <h3 className="font-bold text-brand-green text-lg mb-2">{item.q}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 bg-brand-green relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-gold/5 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <AnimatedSection>
            <h2 className="font-serif text-4xl font-bold text-white mb-4">
              {t(cms?.bottomCtaTitle, cms?.bottomCtaTitleEn, 'Готови ли сте?', 'Ready?')}
            </h2>
            <p className="text-white/70 text-lg mb-10">
              {t(cms?.bottomCtaSubtitle, cms?.bottomCtaSubtitleEn, 'Първата стъпка е безплатна. Свържете се с нас днес.', 'The first step is free. Get in touch with us today.')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#form"
                className="bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold-light transition-all text-lg shadow-lg shadow-brand-gold/20 hover:-translate-y-0.5"
              >
                {t(cms?.bottomCtaButton1, cms?.bottomCtaButton1En, 'Запишете се онлайн', 'Book online')}
              </a>
              <a
                href={`tel:${phone}`}
                className="border-2 border-brand-gold/50 text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/10 hover:border-brand-gold transition-all text-lg"
              >
                {t(cms?.bottomCtaButton2, cms?.bottomCtaButton2En, 'Обадете се сега', 'Call now')}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
