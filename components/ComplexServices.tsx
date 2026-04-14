import AnimatedSection from '@/components/AnimatedSection'

const services = [
  {
    num: '01',
    title: 'Банково кредитиране',
    desc: 'Съдействие чрез специализиран партньор — регистриран кредитен посредник. Помагаме с предварително одобрение, сравнение на оферти, калкулации на вноски и подготовка на документите.',
    perks: ['Бързо предварително одобрение', 'Конкурентни лихви', 'Пълна административна помощ'],
    badge: 'Безплатно за клиентите ни',
    badgeFree: true,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l9-3 9 3v2H3V6zm0 0v12a1 1 0 001 1h16a1 1 0 001-1V6M9 12h6m-3-3v6" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Интериорен дизайн',
    desc: 'Нашите партньори-дизайнери превръщат всеки имот в стилно и функционално пространство, съобразено с вашия вкус и бюджет. Предлагат концепции, 2D и 3D визуализации.',
    perks: ['Индивидуален проект', 'Реалистични 3D визуализации', 'Оптимално използване на бюджета'],
    badge: 'Отстъпка за клиентите ни',
    badgeFree: false,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Ремонт и довършване',
    desc: 'Сътрудничим с опитни фирми и екипи за довършителни работи и ремонти — от частични обновявания до цялостни реновации. Гарантирано качество и спазване на срокове.',
    perks: ['Професионално изпълнение', 'Гаранция за извършените работи', 'Спазване на срокове'],
    badge: 'Отстъпка за клиентите ни',
    badgeFree: false,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
]

const whyUs = [
  { label: 'Всичко на едно място', desc: 'Ние организираме комуникацията с всички страни вместо вас.' },
  { label: 'Проверени партньори', desc: 'Само фирми с доказан опит и препоръки от реални клиенти.' },
  { label: 'Персонализирани решения', desc: 'Всичко е съобразено с вашите нужди и бюджет — нищо на шаблон.' },
]

export default function ComplexServices() {
  return (
    <section className="relative bg-brand-green overflow-hidden py-28">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-gold/15 border border-brand-gold/30 rounded-full px-5 py-2 mb-7">
            <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse" />
            <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest">Ексклузивно за клиентите ни</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Ние не просто намираме имота
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Осигуряваме пълен пакет услуги чрез проверени партньори — от финансиране до интериорен дизайн и довършителни работи. Всичко е осигурено от нас.
          </p>
        </AnimatedSection>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {services.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.12}>
              <div className="relative group h-full flex flex-col border border-brand-gold/20 rounded-2xl p-8 bg-white/[0.04] hover:bg-white/[0.08] hover:border-brand-gold/50 transition-all duration-500">

                {/* Number */}
                <span className="absolute top-7 right-7 font-serif text-6xl font-bold text-brand-gold/10 group-hover:text-brand-gold/20 transition-colors leading-none select-none">
                  {s.num}
                </span>

                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold/20 transition-colors">
                  {s.icon}
                </div>

                {/* Title */}
                <h3 className="font-bold text-white text-xl mb-3">{s.title}</h3>

                {/* Description */}
                <p className="text-white/55 text-sm leading-relaxed mb-6 flex-grow">{s.desc}</p>

                {/* Perks */}
                <ul className="space-y-2 mb-7">
                  {s.perks.map((perk, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-white/70">
                      <svg className="w-4 h-4 text-brand-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {perk}
                    </li>
                  ))}
                </ul>

                {/* Badge */}
                <div className={`self-start px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                  s.badgeFree
                    ? 'bg-brand-gold text-brand-green'
                    : 'bg-brand-gold/15 border border-brand-gold/40 text-brand-gold'
                }`}>
                  {s.badge}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Why our partners */}
        <AnimatedSection delay={0.3}>
          <div className="border-t border-brand-gold/15 pt-12">
            <p className="text-center text-brand-gold/50 text-xs uppercase tracking-widest font-medium mb-8">
              Защо нашите партньори
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {whyUs.map((w, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 rounded-full border border-brand-gold/30 bg-brand-gold/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold mb-1">{w.label}</p>
                  <p className="text-white/45 text-sm leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </div>

      {/* Bottom gold glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
    </section>
  )
}
