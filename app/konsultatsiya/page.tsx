import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import AnimatedSection from '@/components/AnimatedSection'
import { getConsultationPage, getSiteSettings } from '@/lib/sanity'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Безплатна Консултация | New Key Properties',
  description:
    'Запишете се за безплатна консултация с нашите брокери. Честен съвет без скрити такси — помагаме Ви да купите, продадете или наемете имот в София.',
}

export default async function KonsultatsiyaPage() {
  const [cms, settings] = await Promise.all([getConsultationPage(), getSiteSettings()])

  const phone = settings?.phone ?? '0879826292'
  const phoneDisplay = settings?.phoneDisplay ?? '0879 826 292'

  const benefits =
    cms?.benefits?.length > 0
      ? cms.benefits
      : [
          { title: 'Напълно безплатно', desc: 'Без никакви задължения. Консултацията е безплатна — говорим честно и без да се опитваме да Ви "продадем" нещо.' },
          { title: 'Честен съвет', desc: 'Казваме Ви истината — дори ако тя означава да изчакате или да не купувате точно сега. Вашият интерес е на първо място.' },
          { title: 'Пазарна оценка', desc: 'Получавате реална оценка на цените в квартала, който Ви интересува — без преувеличения и без скрити агенди.' },
          { title: 'Личен брокер', desc: 'Работите директно с Александър или Борил — не с колцентър, не с начинаещ стажант. Лично внимание от първия контакт.' },
        ]

  const stats =
    cms?.stats?.length > 0
      ? cms.stats
      : [
          { value: '≤10', label: 'клиента на месец — за максимално внимание към всеки' },
          { value: '0', label: 'скрити такси — прозрачност от първия разговор' },
          { value: '100%', label: 'отдаденост — работим като за собствен имот' },
        ]

  const steps =
    cms?.steps?.length > 0
      ? cms.steps
      : [
          { title: 'Попълнете формата', desc: 'Кажете ни накратко с какво можем да помогнем.' },
          { title: 'Обаждаме Ви се', desc: 'Свързваме се с Вас до 24 часа, за да уточним час.' },
          { title: 'Консултация', desc: '30-45 мин. разговор — по телефон или лично в София.' },
          { title: 'Решавате Вие', desc: 'Без натиск. Работим заедно само ако решите сам.' },
        ]

  const faq =
    cms?.faq?.length > 0
      ? cms.faq
      : [
          { q: 'Наистина ли е безплатно?', a: 'Да, напълно безплатно. Нямаме скрити такси за консултацията. Ако решите да работите с нас след това — тогава обсъждаме условия.' },
          { q: 'Колко продължава консултацията?', a: 'Обикновено 30-45 минути — по телефон или лично в удобно за Вас място в София.' },
          { q: 'Трябва ли да съм готов да купувам/продавам веднага?', a: 'Не. Много хора идват при нас с въпроси, планират покупка след 3-6 месеца, или просто искат да разберат пазара. Всичко е добре дошло.' },
          { q: 'Работите ли само в определени квартали?', a: 'Работим в цяла София, но специализираме в: Драгалевци, Младост, Овча купел, Дружба, Monastery Livadi и центъра.' },
        ]

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
                {cms?.heroBadge ?? `Ограничени места за месец ${new Date().toLocaleDateString('bg-BG', { month: 'long', year: 'numeric' })}`}
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-up">
              {cms?.heroTitle ?? 'Безплатна'}<br />
              <span className="text-brand-gold">{cms?.heroTitleGold ?? 'Консултация'}</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed mb-10 max-w-2xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {cms?.heroSubtitle ?? 'Имате въпроси за имотния пазар в София? Мислите да купувате, продавате или наемате? Говорете с нас — честно, без задължения и напълно безплатно.'}
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <a
                href="#form"
                className="bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold-light transition-all text-lg shadow-lg shadow-brand-gold/20 hover:-translate-y-0.5"
              >
                {cms?.heroBookButton ?? 'Запишете се сега'}
              </a>
              <a
                href={`tel:${phone}`}
                className="border-2 border-brand-gold/50 text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/10 hover:border-brand-gold transition-all text-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                {cms?.heroCallButton ?? phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">Ползи</span>
            <h2 className="font-serif text-4xl font-bold text-brand-green mt-3 mb-4">
              {cms?.benefitsTitle ?? 'Какво получавате'}
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              {cms?.benefitsSubtitle ?? 'При консултацията с New Key Properties нямате какво да губите — само да спечелите.'}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b: { title: string; desc: string }, i: number) => (
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
              <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">Процесът</span>
              <h2 className="font-serif text-4xl font-bold text-brand-green mt-3 mb-4">
                {cms?.formSectionTitle ?? 'Запишете се за консултация'}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">
                {cms?.formSectionSubtitle ?? 'Попълнете формата и ще се свържем с Вас в рамките на 24 часа, за да уточним удобен час.'}
              </p>
              <div className="space-y-5">
                {steps.map((s: { title: string; desc: string }, i: number) => (
                  <div key={i} className="flex gap-5 items-start">
                    <div className="w-11 h-11 bg-brand-green rounded-xl flex items-center justify-center shrink-0 shadow-sm shadow-brand-green/20">
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
                  {cms?.formCardBadge ?? 'Безплатно'}
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-green mt-2 mb-2">
                  {cms?.formCardTitle ?? 'Вашето запитване'}
                </h3>
                <p className="text-gray-400 text-sm mb-8">
                  {cms?.formCardSubtitle ?? 'Отговаряме в рамките на 24 часа.'}
                </p>
                <ContactForm
                  nameLabel={settings?.formNameLabel}
                  namePlaceholder={settings?.formNamePlaceholder}
                  phoneLabel={settings?.formPhoneLabel}
                  phonePlaceholder={settings?.formPhonePlaceholder}
                  emailLabel={settings?.formEmailLabel}
                  emailPlaceholder={settings?.formEmailPlaceholder}
                  messageLabel={settings?.formMessageLabel}
                  messagePlaceholder={settings?.formMessagePlaceholder}
                  submitText={settings?.formSubmitText}
                  loadingText={settings?.formLoadingText}
                  successTitle={settings?.formSuccessTitle}
                  successMessage={settings?.formSuccessMessage}
                  errorMessage={settings?.formErrorMessage}
                  footerNote={settings?.formFooterNote}
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
            <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">Въпроси</span>
            <h2 className="font-serif text-4xl font-bold text-brand-green mt-3">
              {cms?.faqTitle ?? 'Често задавани въпроси'}
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {faq.map((item: { q: string; a: string }, i: number) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="border border-gray-200 rounded-2xl p-6 hover:border-brand-green/30 hover:shadow-sm transition-all">
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
              {cms?.bottomCtaTitle ?? 'Готови ли сте?'}
            </h2>
            <p className="text-white/70 text-lg mb-10">
              {cms?.bottomCtaSubtitle ?? 'Първата стъпка е безплатна. Свържете се с нас днес.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#form"
                className="bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold-light transition-all text-lg shadow-lg shadow-brand-gold/20 hover:-translate-y-0.5"
              >
                {cms?.bottomCtaButton1 ?? 'Запишете се онлайн'}
              </a>
              <a
                href={`tel:${phone}`}
                className="border-2 border-brand-gold/50 text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/10 hover:border-brand-gold transition-all text-lg"
              >
                {cms?.bottomCtaButton2 ?? 'Обадете се сега'}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
