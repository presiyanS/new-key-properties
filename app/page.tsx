import Link from 'next/link'
import PropertyCard from '@/components/PropertyCard'
import BlogCard from '@/components/BlogCard'
import FAQ from '@/components/FAQ'
import AnimatedSection from '@/components/AnimatedSection'
import AnimatedHeroBackground from '@/components/AnimatedHeroBackground'
import AnimatedSkylineHero from '@/components/AnimatedSkylineHero'
import NeighborhoodMarquee from '@/components/NeighborhoodMarquee'
import CounterStat from '@/components/CounterStat'
import { getFeaturedListings, getBlogPosts, getHomePage } from '@/lib/sanity'
import { blogPosts as staticPosts } from '@/data/blog'

export const revalidate = 60

export default async function HomePage() {
  const [featuredListings, sanityPosts, cms] = await Promise.all([
    getFeaturedListings(),
    getBlogPosts(),
    getHomePage(),
  ])
  const pool = sanityPosts.length > 0 ? sanityPosts : staticPosts
  const recentPosts = pool.slice(0, 3)

  const stats = cms?.stats?.length > 0
    ? cms.stats
    : [
        { value: 'Само София', label: 'Нашият пазар' },
        { value: '100%', label: 'Отдаденост' },
        { value: 'Персонален', label: 'Подход към всеки' },
        { value: '0', label: 'Скрити такси' },
      ]

  const services = cms?.services?.length > 0
    ? cms.services
    : [
        {
          title: 'Продажби',
          desc: 'Квалифицираме сериозни купувачи — не управляваме безкрайни огледи. По-малко суматоха, по-бърза продажба на реална цена.',
          icon: 'sale',
        },
        {
          title: 'Наеми',
          desc: 'Намираме надеждни наематели или идеалния имот под наем за Вас в София.',
          icon: 'rent',
        },
        {
          title: 'Намиране на имот',
          desc: 'Търсим и намираме имоти по Вашите конкретни критерии — като за нас самите.',
          icon: 'search',
        },
        {
          title: 'Инвестиции',
          desc: 'Реален анализ на доходност и пазарни тенденции — помагаме Ви да инвестирате умно.',
          icon: 'invest',
        },
      ]

  const processSteps = cms?.processSteps?.length > 0
    ? cms.processSteps
    : [
        { title: 'Консултация', desc: 'Разговаряме задълбочено за Вашите нужди, бюджет и конкретни предпочитания. Безплатно и без ангажименти — само честен разговор.' },
        { title: 'Проучване', desc: 'Намираме имоти, отговарящи точно на Вашите критерии. Показваме само сериозни, реалистични оферти — без губене на Вашето време.' },
        { title: 'Резултат', desc: 'Придружаваме Ви до финалното подписване и след него. Работим докато намерим правилното решение — без бързане към комисионна.' },
      ]

  const whyUsPoints = cms?.whyUsPoints?.length > 0
    ? cms.whyUsPoints
    : [
        {
          title: 'Честност на първо място',
          desc: 'Никога не скриваме информация. Пълна прозрачност при всяка стъпка от сделката.',
        },
        {
          title: 'Работим като за себе си',
          desc: 'Подхождаме към всяка сделка сякаш купуваме или продаваме собствен имот.',
        },
        {
          title: 'Ограничен брой клиенти',
          desc: 'Максимум 10 клиента на месец — за максимален фокус, лично внимание и реални резултати за всеки.',
        },
        {
          title: 'Дълбоко познаваме пазара',
          desc: 'Задълбочени познания за всеки квартал, ценови нива и тенденции в София.',
        },
      ]

  const serviceIcons: Record<string, React.ReactNode> = {
    sale: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      </svg>
    ),
    rent: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
    search: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    invest: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center bg-brand-green overflow-hidden">
        {/* Animated floating orb background */}
        <AnimatedHeroBackground />

        {/* Sofia cityscape silhouette */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: '200px' }}>
          <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
            <text x="720" y="22" textAnchor="middle" fill="#c9a84c" fillOpacity="0.45" fontFamily="Georgia, serif" fontSize="11" letterSpacing="10">СОФИЯ · БЪЛГАРИЯ</text>
            <line x1="420" y1="18" x2="590" y2="18" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.35"/>
            <line x1="850" y1="18" x2="1020" y2="18" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.35"/>
            <rect x="0" y="140" width="55" height="60" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.18" fill="none"/>
            <rect x="60" y="122" width="45" height="78" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.18" fill="none"/>
            <rect x="112" y="135" width="38" height="65" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.18" fill="none"/>
            <rect x="158" y="115" width="52" height="85" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.18" fill="none"/>
            <rect x="1190" y="125" width="50" height="75" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.18" fill="none"/>
            <rect x="1248" y="108" width="42" height="92" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.18" fill="none"/>
            <rect x="1298" y="130" width="60" height="70" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.18" fill="none"/>
            <rect x="1366" y="118" width="74" height="82" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.18" fill="none"/>
            <rect x="218" y="145" width="35" height="55" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.40" fill="none"/>
            <rect x="260" y="128" width="48" height="72" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.40" fill="none"/>
            <rect x="270" y="118" width="28" height="10" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.40" fill="none"/>
            <rect x="315" y="108" width="55" height="92" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.40" fill="none"/>
            <rect x="325" y="98" width="35" height="10" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.40" fill="none"/>
            <line x1="342" y1="98" x2="342" y2="78" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.40"/>
            <line x1="337" y1="82" x2="347" y2="82" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.35"/>
            <rect x="378" y="120" width="40" height="80" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.38" fill="none"/>
            <rect x="425" y="112" width="30" height="88" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.38" fill="none"/>
            <rect x="462" y="130" width="110" height="70" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.45" fill="none"/>
            <rect x="472" y="122" width="90" height="8" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.40" fill="none"/>
            <line x1="490" y1="122" x2="490" y2="105" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.35"/>
            <line x1="517" y1="122" x2="517" y2="98" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.35"/>
            <line x1="544" y1="122" x2="544" y2="98" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.35"/>
            <path d="M 610 200 L 610 138 L 655 100 L 700 138 L 700 200" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.45" fill="none"/>
            <path d="M 628 138 Q 655 115 682 138" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.35" fill="none"/>
            <line x1="655" y1="100" x2="655" y2="80" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.45"/>
            <line x1="650" y1="85" x2="660" y2="85" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.35"/>
            <rect x="594" y="148" width="16" height="52" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.35" fill="none"/>
            <path d="M 594 148 Q 602 135 610 148" stroke="#c9a84c" strokeWidth="0.7" strokeOpacity="0.30" fill="none"/>
            <rect x="700" y="148" width="16" height="52" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.35" fill="none"/>
            <path d="M 700 148 Q 708 135 716 148" stroke="#c9a84c" strokeWidth="0.7" strokeOpacity="0.30" fill="none"/>
            <rect x="740" y="88" width="45" height="112" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.45" fill="none"/>
            <rect x="746" y="78" width="33" height="10" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.40" fill="none"/>
            <line x1="762" y1="78" x2="762" y2="58" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.45"/>
            <line x1="757" y1="63" x2="767" y2="63" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.35"/>
            <rect x="795" y="105" width="38" height="95" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.40" fill="none"/>
            <rect x="840" y="72" width="50" height="128" stroke="#c9a84c" strokeWidth="1.4" strokeOpacity="0.50" fill="none"/>
            <rect x="848" y="62" width="34" height="10" stroke="#c9a84c" strokeWidth="1.2" strokeOpacity="0.45" fill="none"/>
            <line x1="865" y1="62" x2="865" y2="38" stroke="#c9a84c" strokeWidth="1.4" strokeOpacity="0.50"/>
            <circle cx="865" cy="37" r="3" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.50" fill="none"/>
            <rect x="898" y="95" width="42" height="105" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.40" fill="none"/>
            <rect x="948" y="115" width="35" height="85" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.38" fill="none"/>
            <rect x="992" y="105" width="48" height="95" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.40" fill="none"/>
            <rect x="1000" y="95" width="32" height="10" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.35" fill="none"/>
            <rect x="1048" y="120" width="40" height="80" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.38" fill="none"/>
            <rect x="1096" y="100" width="52" height="100" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.40" fill="none"/>
            <rect x="1104" y="90" width="36" height="10" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.35" fill="none"/>
            <line x1="1122" y1="90" x2="1122" y2="70" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.38"/>
            <rect x="1156" y="128" width="32" height="72" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.35" fill="none"/>
            <line x1="0" y1="199" x2="1440" y2="199" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.35"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-gold/15 border border-brand-gold/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
                <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
                <span className="text-brand-gold text-sm font-medium tracking-wide">
                  {cms?.heroBadge ?? 'Агенция за недвижими имоти · София'}
                </span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
                <span className="block animate-fade-up" style={{ animationDelay: '0.1s' }}>
                  {cms?.heroLine1 ?? 'Вашият Нов'}
                </span>
                <span className="block animate-fade-up text-gradient-gold" style={{ animationDelay: '0.2s' }}>
                  {cms?.heroLineGold ?? 'Дом'}{' '}
                  <span className="text-white">{cms?.heroLine3 ?? 'Започва'}</span>
                </span>
                <span className="block animate-fade-up" style={{ animationDelay: '0.3s' }}>
                  Тук
                </span>
              </h1>

              <p
                className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl animate-fade-up"
                style={{ animationDelay: '0.4s' }}
              >
                {cms?.heroSubtitle ??
                  'New Key Properties — агенция, която работи различно. Фокусираме се върху резултати, не върху брой огледи. По-малко суматоха. Повече затворени сделки. В София.'}
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 animate-fade-up"
                style={{ animationDelay: '0.5s' }}
              >
                <Link
                  href="/listings"
                  className="bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold-light transition-all text-center text-lg shadow-xl shadow-brand-gold/20 hover:shadow-brand-gold/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Разгледайте Имотите
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-brand-gold/50 text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/10 hover:border-brand-gold transition-all text-center text-lg"
                >
                  Свържете се с нас
                </Link>
              </div>
            </div>

            {/* Right: animated skyline composition */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <AnimatedSkylineHero badges={cms?.heroBadges} />
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-gold/40">
          <span className="text-xs uppercase tracking-widest">Разгледайте</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Neighborhood marquee strip ── */}
      <NeighborhoodMarquee />

      {/* ── Stats (count-up on scroll) ── */}
      <section className="bg-brand-gold py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s: { value: string; label: string }, i: number) => (
              <AnimatedSection key={s.label} delay={i * 0.1}>
                <CounterStat value={s.value} label={s.label} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-serif text-4xl font-bold text-brand-green mb-4">
              {cms?.servicesTitle ?? 'Нашите Услуги'}
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              {cms?.servicesSubtitle ?? 'Пълен спектър от услуги в сферата на недвижимите имоти в София.'}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s: { title: string; desc: string; icon?: string }, i: number) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1 h-full">
                  <div className="w-14 h-14 bg-brand-green rounded-xl flex items-center justify-center text-brand-gold mb-5 group-hover:bg-brand-green-light group-hover:scale-105 transition-all shadow-md shadow-brand-green/10">
                    {serviceIcons[s.icon ?? 'sale'] ?? serviceIcons.sale}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Work (Process) ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">Нашият метод</span>
            <h2 className="font-serif text-4xl font-bold text-brand-green mt-3 mb-4">
              {cms?.processTitle ?? 'Как Работим'}
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              {cms?.processSubtitle ?? 'Три прости стъпки до Вашия идеален имот — без изненади, без стрес.'}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-brand-gold/20 via-brand-gold/60 to-brand-gold/20" />

            {processSteps.map((item: { title: string; desc: string }, i: number) => {
              const stepIcons = [
                <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
                <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
                <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
              ]
              const step = String(i + 1).padStart(2, '0')
              return (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="text-center group">
                  <div className="relative inline-flex">
                    <div className="w-20 h-20 bg-brand-green rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-green/20 group-hover:shadow-brand-green/30 group-hover:-translate-y-1 transition-all duration-300">
                      <div className="text-brand-gold">{stepIcons[i] ?? stepIcons[0]}</div>
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-brand-gold rounded-full flex items-center justify-center">
                      <span className="font-bold text-brand-green text-xs">{step}</span>
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm lg:text-base">{item.desc}</p>
                </div>
              </AnimatedSection>
              )
            })}
          </div>

          <AnimatedSection className="text-center mt-12" delay={0.4}>
            <Link
              href="/konsultatsiya"
              className="inline-flex items-center gap-2 bg-brand-green text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-green-light transition-all shadow-lg shadow-brand-green/20 hover:shadow-brand-green/30 hover:-translate-y-0.5"
            >
              {cms?.processButtonText ?? 'Започнете безплатна консултация'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Featured Listings ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-end justify-between mb-12">
            <div>
              <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">{cms?.featuredLabel ?? 'Портфолио'}</span>
              <h2 className="font-serif text-4xl font-bold text-brand-green mt-1 mb-1">{cms?.featuredTitle ?? 'Избрани Имоти'}</h2>
              <p className="text-gray-500">{cms?.featuredSubtitle ?? 'Внимателно подбрани оферти от нашия портфолио'}</p>
            </div>
            <Link
              href="/listings"
              className="hidden sm:inline-flex items-center gap-2 text-brand-green font-semibold hover:text-brand-gold transition-colors group"
            >
              {cms?.featuredLinkText ?? 'Всички имоти'}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredListings.map((l, i) => (
              <AnimatedSection key={l._id} delay={i * 0.1}>
                <PropertyCard listing={l} />
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/listings"
              className="inline-block bg-brand-green text-brand-gold font-bold px-6 py-3 rounded-xl hover:bg-brand-green-light transition-colors"
            >
              Всички имоти
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-24 bg-brand-green relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-brand-gold/3 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">Нашата разлика</span>
              <h2 className="font-serif text-4xl font-bold text-white mt-3 mb-6">
                {cms?.whyUsTitle ?? (
                  <>Защо <span className="text-brand-gold">New Key Properties</span>?</>
                )}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-10">
                {cms?.whyUsSubtitle ??
                  'Не сме просто поредната агенция. Работим с ограничен брой клиенти на месец, за да гарантираме, че всеки получава пълното ни внимание и най-доброто от нас.'}
              </p>

              <div className="space-y-5">
                {whyUsPoints.map((item: { title: string; desc: string }, i: number) => (
                  <AnimatedSection key={item.title} delay={i * 0.1}>
                    <div className="flex items-start gap-4 group">
                      <div className="w-7 h-7 rounded-full bg-brand-gold flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-brand-gold font-semibold mb-0.5">{item.title}</h4>
                        <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              <Link
                href="/about"
                className="mt-10 inline-flex items-center gap-2 bg-brand-gold text-brand-green font-bold px-7 py-3.5 rounded-xl hover:bg-brand-gold-light transition-all hover:shadow-lg hover:shadow-brand-gold/20 hover:-translate-y-0.5"
              >
                Научете повече за нас
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </AnimatedSection>

            {/* CTA card */}
            <AnimatedSection direction="right" delay={0.15}>
              <div className="bg-brand-green-light/30 rounded-3xl p-8 lg:p-10 border border-brand-gold/20 backdrop-blur-sm shadow-2xl">
                <p className="text-brand-gold/60 uppercase text-xs tracking-widest text-center mb-2">
                  Безплатна консултация
                </p>
                <h3 className="font-serif text-2xl font-bold text-white text-center mb-4">
                  {cms?.ctaCardTitle ?? 'Готови ли сте да действате?'}
                </h3>
                <p className="text-white/60 text-sm text-center leading-relaxed mb-8">
                  {cms?.ctaCardDesc ??
                    'Пазарът на имоти в София се движи бързо. Добрите оферти изчезват. Свържете се с нас сега — броят на клиентите, с които работим, е ограничен.'}
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:0879826292"
                    className="flex items-center justify-center gap-3 bg-brand-gold text-brand-green font-bold py-4 rounded-xl hover:bg-brand-gold-light transition-all w-full text-lg hover:shadow-lg hover:shadow-brand-gold/20 active:scale-98"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    0879 826 292
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center border-2 border-brand-gold/60 text-brand-gold font-bold py-3.5 rounded-xl hover:bg-brand-gold/10 hover:border-brand-gold transition-all w-full"
                  >
                    Изпратете запитване
                  </Link>
                </div>

                {/* Trust indicator */}
                <div className="flex items-center justify-center gap-2 mt-6 text-white/30 text-xs">
                  <svg className="w-3.5 h-3.5 text-brand-gold/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                  100% безплатно и без ангажименти
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQ items={cms?.faq} />

      {/* ── Blog preview ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-end justify-between mb-12">
            <div>
              <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">Знания</span>
              <h2 className="font-serif text-4xl font-bold text-brand-green mt-1 mb-1">Полезна Информация</h2>
              <p className="text-gray-500">Анализи, съвети и новини от пазара на недвижими имоти</p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-2 text-brand-green font-semibold hover:text-brand-gold transition-colors group"
            >
              Всички статии
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {recentPosts.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.1}>
                <BlogCard post={p} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 bg-brand-gold relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <AnimatedSection>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-green mb-4">
              {cms?.finalCtaTitle ?? 'Честност. Доверие. Резултати.'}
            </h2>
            <p className="text-brand-green/70 text-lg mb-10 max-w-xl mx-auto">
              {cms?.finalCtaSubtitle ??
                'Свържете се с New Key Properties още днес и направете правилната стъпка на пазара на имоти в София.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0879826292"
                className="bg-brand-green text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-green-dark transition-all text-lg shadow-lg shadow-brand-green/20 hover:shadow-brand-green/30 hover:-translate-y-0.5"
              >
                Обадете се сега
              </a>
              <a
                href="mailto:office@newkey.bg"
                className="border-2 border-brand-green text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-green/10 transition-all text-lg"
              >
                office@newkey.bg
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
