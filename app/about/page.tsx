import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import { getAboutPage } from '@/lib/sanity'
import { draftMode } from 'next/headers'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'За Нас',
  description:
    'Научете повече за New Key Properties – честна агенция за недвижими имоти в София с истинска грижа за клиентите.',
}

const valueIcons: React.ReactNode[] = [
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>,
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>,
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>,
  <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>,
  <svg key="5" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>,
  <svg key="6" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>,
]

export default async function AboutPage() {
  const { isEnabled: preview } = await draftMode()
  const cms = await getAboutPage(preview)

  const missionParagraphs =
    cms?.missionParagraphs?.length > 0
      ? cms.missionParagraphs
      : [
          'Вярваме, че пазарът на недвижими имоти се нуждае от повече честност. Твърде много хора са разочаровани от агенции, които мислят само за комисионната — не за резултата.',
          'Ние работим различно. Фокусираме се върху затворени сделки, не върху брой огледи. Квалифицираме сериозните купувачи, подготвяме имота стратегически и преговаряме от Ваше име.',
          'Нашата цел е да станем най-доверената агенция в София — не чрез реклама, а чрез реални резултати, доволни клиенти и репутация, изградена с честна работа.',
        ]

  const missionValues =
    cms?.missionValues?.length > 0
      ? cms.missionValues
      : [
          { label: 'Доверие', desc: 'Изграждаме дългосрочни отношения, основани на честна работа и реални резултати.' },
          { label: 'Честност', desc: 'Казваме истината — дори когато тя не е това, което клиентът иска да чуе.' },
          { label: 'Резултати', desc: 'Фокусираме се върху намирането на правилното решение, не на бързата комисионна.' },
        ]

  const heroStats =
    cms?.heroStats?.length > 0
      ? cms.heroStats
      : [
          { value: '≤10', label: 'клиента/месец' },
          { value: '0', label: 'скрити такси' },
          { value: '100%', label: 'отдаденост' },
        ]

  const specializations =
    cms?.specializations?.length > 0
      ? cms.specializations
      : [
          { title: 'Продажби', items: ['Оценка на имота', 'Маркетинг и представяне', 'Преговори от Ваше име', 'Цялостна правна подкрепа'] },
          { title: 'Наеми', items: ['Намиране на наематели', 'Проверка на кандидати', 'Договори за наем', 'Управление на имота'] },
          { title: 'Намиране на имот', items: ['Анализ на нуждите', 'Активно търсене', 'Проверка на документи', 'Преговори и покупка'] },
        ]

  const values =
    cms?.values?.length > 0
      ? cms.values
      : [
          { title: 'Прозрачност', desc: 'Никакви скрити такси, никакви изненади. Знаете точно с какво разполагате и какво Ви струва.' },
          { title: 'Личен подход', desc: 'Всеки клиент е уникален. Слушаме внимателно и намираме решения, съобразени с Вашата конкретна ситуация.' },
          { title: 'Качество пред количество', desc: 'Работим с ограничен брой клиенти на месец, за да гарантираме максимално качество на услугата.' },
          { title: 'Дългосрочно мислене', desc: 'Интересуваме се от Вашите дългосрочни цели, не само от текущата сделка.' },
          { title: 'Пазарна компетентност', desc: 'Следим пазара постоянно и Ви даваме реална картина — без преувеличения в нито една посока.' },
          { title: 'Ангажираност', desc: 'Остаме достъпни и ангажирани от първия контакт до финалното подписване и след него.' },
        ]

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-green py-28 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-72 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <p className="text-brand-gold/60 uppercase text-xs tracking-widest mb-5 font-medium animate-fade-in">За Нас</p>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-up">
              {cms?.heroTitle ?? 'Агенция, Която Наистина'}<br />
              <span className="text-brand-gold">{cms?.heroTitleGold ?? 'Се Грижи'}</span> за Вас
            </h1>
            <p className="text-white/70 text-xl leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {cms?.heroSubtitle ??
                'New Key Properties не е просто поредната агенция за имоти. Ние сме екип от хора, за които честността и грижата за клиента не са маркетингови фрази — те са начин на работа.'}
            </p>
            <div className="flex items-center gap-6 mt-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {heroStats.map((stat: { value: string; label: string }, i: number) => (
                <div key={i} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-12 bg-brand-gold/20" />}
                  <div className="text-center">
                    <p className="font-serif text-3xl font-bold text-brand-gold">{stat.value}</p>
                    <p className="text-white/50 text-xs uppercase tracking-wider mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">Нашата история</span>
              <h2 className="font-serif text-4xl font-bold text-brand-green mt-3 mb-6">
                {cms?.missionTitle ?? 'Нашата Мисия'}
              </h2>
              {missionParagraphs.map((p: string, i: number) => (
                <p key={i} className="text-gray-600 text-lg leading-relaxed mb-5">
                  {p}
                </p>
              ))}
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="bg-brand-green rounded-3xl p-10 shadow-2xl shadow-brand-green/20 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-brand-gold/5 blur-2xl" />
                <div className="h-px bg-gradient-to-r from-brand-gold/40 to-transparent mb-8" />
                <h3 className="font-serif text-2xl font-bold text-white mb-8">
                  {cms?.missionCardTitle ?? 'Доверие – Честност – Резултати'}
                </h3>
                <div className="space-y-7">
                  {missionValues.map((v: { label: string; desc: string }) => (
                    <div key={v.label} className="flex gap-5 items-start group">
                      <div className="w-8 h-8 rounded-lg bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-gold/20 transition-colors">
                        <svg className="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-brand-gold font-bold text-lg mb-1">{v.label}</h4>
                        <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-gradient-to-r from-brand-gold/40 to-transparent mt-8" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">Принципи</span>
            <h2 className="font-serif text-4xl font-bold text-brand-green mt-3 mb-4">
              {cms?.valuesTitle ?? 'Нашите Ценности'}
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              {cms?.valuesSubtitle ?? 'Принципите, с които подхождаме към всяка сделка и всеки клиент.'}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v: { title: string; desc: string }, i: number) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center text-brand-gold group-hover:bg-brand-green-light transition-colors shadow-sm shadow-brand-green/10">
                      {valueIcons[i] ?? valueIcons[0]}
                    </div>
                    <span className="font-serif text-brand-gold/25 font-bold text-2xl">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-brand-green transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we do ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">Специализация</span>
            <h2 className="font-serif text-4xl font-bold text-brand-green mt-3 mb-6">
              {cms?.specializationTitle ?? 'С Какво Се Занимаваме'}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-14 max-w-2xl mx-auto">
              {cms?.specializationSubtitle ?? 'New Key Properties специализира изключително в жилищни и инвестиционни имоти в София — продажби, наеми и намиране на имоти за покупка.'}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {specializations.map((s: { title: string; items: string[] }, i: number) => {
              const colors = ['bg-brand-green', 'bg-brand-gold', 'bg-brand-green-light']
              return (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 h-full">
                  <div className={`w-2 h-8 rounded-full ${colors[i] ?? colors[0]} mb-5`} />
                  <h3 className="font-bold text-brand-green text-xl mb-5">{s.title}</h3>
                  <ul className="space-y-3">
                    {s.items.map((item: string) => (
                      <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                        <span className="w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-brand-green relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-gold/5 blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <AnimatedSection>
            <h2 className="font-serif text-4xl font-bold text-white mb-4">
              {cms?.ctaTitle ?? 'Готови ли сте да работите с нас?'}
            </h2>
            <p className="text-white/60 text-lg mb-10">
              {cms?.ctaSubtitle ?? 'Местата са ограничени. Свържете се с нас сега и вижте как можем да Ви помогнем.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold-light transition-all text-lg shadow-lg shadow-brand-gold/20 hover:-translate-y-0.5"
              >
                Свържете се с нас
              </Link>
              <Link
                href="/team"
                className="border-2 border-brand-gold/60 text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/10 hover:border-brand-gold transition-all text-lg"
              >
                Запознайте се с екипа
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
