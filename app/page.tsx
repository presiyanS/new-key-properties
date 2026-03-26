import Link from 'next/link'
import PropertyCard from '@/components/PropertyCard'
import BlogCard from '@/components/BlogCard'
import FAQ from '@/components/FAQ'
import { getFeaturedListings, getBlogPosts, getHomePage } from '@/lib/sanity'
import { blogPosts as staticPosts } from '@/data/blog'

export const revalidate = 60

export default async function HomePage() {
  const [featuredListings, sanityPosts, cms] = await Promise.all([getFeaturedListings(), getBlogPosts(), getHomePage()])
  const pool = sanityPosts.length > 0 ? sanityPosts : staticPosts
  const recentPosts = pool.slice(0, 3)

  const stats = cms?.stats?.length > 0 ? cms.stats : [
    { value: 'Само София', label: 'Нашият пазар' },
    { value: '100%', label: 'Отдаденост' },
    { value: 'Персонален', label: 'Подход към всеки' },
    { value: '0', label: 'Скрити такси' },
  ]
  const services = cms?.services?.length > 0 ? cms.services : [
    { title: 'Продажби', desc: 'Продаваме вашия имот на най-добра цена — прозрачно, бързо и без излишен стрес.' },
    { title: 'Наеми', desc: 'Намираме надеждни наематели или идеалния имот под наем за вас в София.' },
    { title: 'Намиране на имот', desc: 'Търсим и намираме имоти по вашите конкретни критерии — като за нас самите.' },
    { title: 'Инвестиции', desc: 'Реален анализ на доходност и пазарни тенденции — помагаме ви да инвестирате умно.' },
  ]
  const whyUsPoints = cms?.whyUsPoints?.length > 0 ? cms.whyUsPoints : [
    { title: 'Честност на първо място', desc: 'Никога не скриваме информация. Пълна прозрачност при всяка стъпка от сделката.' },
    { title: 'Работим като за себе си', desc: 'Подхождаме към всяка сделка сякаш купуваме или продаваме собствен имот.' },
    { title: 'Ограничен брой клиенти', desc: 'Максимум 10 клиента на месец — за максимален фокус и качество на услугата.' },
    { title: 'Дълбоко познаваме пазара', desc: 'Задълбочени познания за всеки квартал, ценови нива и тенденции в София.' },
  ]

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center bg-brand-green overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-gold/5 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-brand-gold/5 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Left: text ── */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-gold/15 border border-brand-gold/30 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
                <span className="text-brand-gold text-sm font-medium">{cms?.heroBadge ?? 'Агенция за недвижими имоти · София'}</span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {cms?.heroLine1 ?? 'Вашият Нов'}<br />
                <span className="text-brand-gold">{cms?.heroLineGold ?? 'Дом'}</span> {cms?.heroLine3 ?? 'Започва'}<br />
                Тук
              </h1>

              <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
                {cms?.heroSubtitle ?? 'New Key Properties — честна агенция, която наистина се грижи за клиентите си. Намираме правилния имот за вас в София с пълна прозрачност и максимална отдаденост.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/listings"
                  className="bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold-light transition-colors text-center text-lg shadow-lg shadow-brand-gold/20"
                >
                  Разгледайте Имотите
                </Link>
              <Link
                  href="/contact"
                  className="border-2 border-brand-gold/60 text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/10 transition-colors text-center text-lg"
                >
                  Свържете се с нас
                </Link>
              </div>
            </div>

            {/* ── Right: creative composition ── */}
            <div className="hidden lg:flex items-center justify-center relative" style={{minHeight: '520px'}}>

              {/* ── Outer architectural frame ── */}
              <div className="relative w-[420px] h-[480px]">

                {/* Subtle grid pattern background */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c9a84c" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* House/building outline SVG — large, architectural */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* main building outline */}
                  <path d="M 60 460 L 60 200 L 210 80 L 360 200 L 360 460 Z" stroke="#c9a84c" strokeWidth="1.5" strokeOpacity="0.25"/>
                  {/* roof ridge line */}
                  <line x1="210" y1="80" x2="210" y2="180" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.2"/>
                  {/* floor lines */}
                  <line x1="60" y1="300" x2="360" y2="300" stroke="#c9a84c" strokeWidth="0.75" strokeOpacity="0.15"/>
                  <line x1="60" y1="380" x2="360" y2="380" stroke="#c9a84c" strokeWidth="0.75" strokeOpacity="0.15"/>
                  {/* window outlines */}
                  <rect x="110" y="220" width="60" height="55" rx="4" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.2"/>
                  <rect x="250" y="220" width="60" height="55" rx="4" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.2"/>
                  <rect x="110" y="315" width="60" height="50" rx="4" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.2"/>
                  <rect x="250" y="315" width="60" height="50" rx="4" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.2"/>
                  {/* door */}
                  <path d="M 175 460 L 175 395 Q 210 375 245 395 L 245 460" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.2"/>
                  {/* decorative corner accents */}
                  <path d="M 20 20 L 20 60 L 60 60" stroke="#c9a84c" strokeWidth="1.5" strokeOpacity="0.4"/>
                  <path d="M 400 20 L 400 60 L 360 60" stroke="#c9a84c" strokeWidth="1.5" strokeOpacity="0.4"/>
                  <path d="M 20 460 L 20 420 L 60 420" stroke="#c9a84c" strokeWidth="1.5" strokeOpacity="0.4"/>
                  <path d="M 400 460 L 400 420 L 360 420" stroke="#c9a84c" strokeWidth="1.5" strokeOpacity="0.4"/>
                </svg>

                {/* ── Central NK monogram ── */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex flex-col items-center">
                    {/* Glowing circle behind monogram */}
                    <div className="absolute w-48 h-48 rounded-full bg-brand-gold/5 blur-2xl" />
                    {/* NK letters */}
                    <span
                      className="font-serif font-bold text-brand-gold select-none"
                      style={{
                        fontSize: '9rem',
                        lineHeight: 1,
                        opacity: 0.18,
                        letterSpacing: '-0.05em',
                      }}
                    >
                      NK
                    </span>
                    {/* tagline below */}
                    <p className="text-brand-gold/50 text-xs uppercase tracking-[0.35em] mt-2 font-medium">
                      New Key Properties
                    </p>
                  </div>
                </div>

                {/* ── Floating value cards ── */}

                {/* Top-left: Честност */}
                <div className="absolute top-16 -left-8 bg-brand-green-light/80 border border-brand-gold/30 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-gold rounded-full" />
                    <span className="text-brand-gold font-semibold text-sm tracking-wide">Честност</span>
                  </div>
                  <p className="text-white/40 text-xs mt-0.5 pl-4">Пълна прозрачност</p>
                </div>

                {/* Top-right: Доверие */}
                <div className="absolute top-28 -right-10 bg-brand-green-light/80 border border-brand-gold/30 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-gold rounded-full" />
                    <span className="text-brand-gold font-semibold text-sm tracking-wide">Доверие</span>
                  </div>
                  <p className="text-white/40 text-xs mt-0.5 pl-4">Дългосрочни резултати</p>
                </div>

                {/* Bottom-left: Sofia */}
                <div className="absolute bottom-24 -left-6 bg-brand-gold/10 border border-brand-gold/25 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl">
                  <p className="text-white/60 text-xs uppercase tracking-widest">Само</p>
                  <p className="text-brand-gold font-bold text-lg leading-none">София</p>
                </div>

                {/* Bottom-right: Резултати */}
                <div className="absolute bottom-16 -right-8 bg-brand-green-light/80 border border-brand-gold/30 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
                    <span className="text-brand-gold font-semibold text-sm tracking-wide">Резултати</span>
                  </div>
                  <p className="text-white/40 text-xs mt-0.5 pl-4">Без компромиси</p>
                </div>

                {/* Gold key icon — top center */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-brand-gold rounded-xl shadow-lg shadow-brand-gold/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-green" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.65 10A5.99 5.99 0 007 6c-3.31 0-6 2.69-6 6s2.69 6 6 6a5.99 5.99 0 005.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                  </svg>
                </div>

              </div>
            </div>

          </div>{/* end grid */}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-gold/40">
          <span className="text-xs uppercase tracking-widest">Разгледайте</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-brand-gold py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s: { value: string; label: string }) => (
              <div key={s.label}>
                <p className="font-serif text-brand-green font-bold text-3xl lg:text-4xl">{s.value}</p>
                <p className="text-brand-green/60 text-sm font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-bold text-brand-green mb-4">{cms?.servicesTitle ?? 'Нашите Услуги'}</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              {cms?.servicesSubtitle ?? 'Пълен спектър от услуги в сферата на недвижимите имоти в София.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s: { title: string; desc: string }, i: number) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
              >
                <div className="w-14 h-14 bg-brand-green rounded-xl flex items-center justify-center text-brand-gold mb-5 group-hover:bg-brand-green-light transition-colors">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Listings ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-4xl font-bold text-brand-green mb-2">Избрани Имоти</h2>
              <p className="text-gray-500">Внимателно подбрани оферти от нашия портфолио</p>
            </div>
            <Link
              href="/listings"
              className="hidden sm:inline-flex items-center gap-2 text-brand-green font-semibold hover:text-brand-gold transition-colors"
            >
              Всички имоти
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((l) => (
              <PropertyCard key={l._id} listing={l} />
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
      <section className="py-24 bg-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold text-white mb-6">
                {cms?.whyUsTitle ?? <>Защо <span className="text-brand-gold">New Key Properties</span>?</>}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-10">
                {cms?.whyUsSubtitle ?? 'Не сме просто поредната агенция. Работим с ограничен брой клиенти на месец, за да гарантираме, че всеки получава пълното ни внимание и най-доброто от нас.'}
              </p>

              <div className="space-y-5">
                {whyUsPoints.map((item: { title: string; desc: string }) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-brand-gold font-semibold mb-0.5">{item.title}</h4>
                      <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="mt-10 inline-block bg-brand-gold text-brand-green font-bold px-7 py-3.5 rounded-xl hover:bg-brand-gold-light transition-colors"
              >
                Научете повече за нас
              </Link>
            </div>

            {/* CTA card */}
            <div className="bg-brand-green-light/30 rounded-3xl p-8 border border-brand-gold/20">
              <p className="text-brand-gold/60 uppercase text-xs tracking-widest text-center mb-2">Безплатна консултация</p>
              <h3 className="font-serif text-2xl font-bold text-white text-center mb-4">{cms?.ctaCardTitle ?? 'Готови ли сте да действате?'}</h3>
              <p className="text-white/60 text-sm text-center leading-relaxed mb-8">
                {cms?.ctaCardDesc ?? 'Пазарът на имоти в София се движи бързо. Добрите оферти изчезват. Свържете се с нас сега — броят на клиентите, с които работим, е ограничен.'}
              </p>
              <div className="space-y-3">
                <a
                  href="tel:0879826292"
                  className="flex items-center justify-center gap-3 bg-brand-gold text-brand-green font-bold py-4 rounded-xl hover:bg-brand-gold-light transition-colors w-full text-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  0879 826 292
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center border-2 border-brand-gold/60 text-brand-gold font-bold py-3.5 rounded-xl hover:bg-brand-gold/10 transition-colors w-full"
                >
                  Изпратете запитване
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQ items={cms?.faq} />

      {/* ── Blog preview ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-4xl font-bold text-brand-green mb-2">Полезна Информация</h2>
              <p className="text-gray-500">Анализи, съвети и новини от пазара на недвижими имоти</p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-2 text-brand-green font-semibold hover:text-brand-gold transition-colors"
            >
              Всички статии
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 bg-brand-gold">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold text-brand-green mb-4">
            {cms?.finalCtaTitle ?? 'Честност. Доверие. Резултати.'}
          </h2>
          <p className="text-brand-green/70 text-lg mb-10">
            {cms?.finalCtaSubtitle ?? 'Свържете се с New Key Properties още днес и направете правилната стъпка на пазара на имоти в София.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0879826292"
              className="bg-brand-green text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-green-dark transition-colors text-lg"
            >
              Обадете се сега
            </a>
            <a
              href="mailto:office@newkey.bg"
              className="border-2 border-brand-green text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-green/10 transition-colors text-lg"
            >
              office@newkey.bg
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
