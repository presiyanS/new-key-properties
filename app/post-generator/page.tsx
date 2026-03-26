import type { Metadata } from 'next'
import PostGeneratorClient from './PostGeneratorClient'

export const metadata: Metadata = {
  title: 'Генератор на постове | New Key Properties',
  robots: { index: false, follow: false },
}

const reasons = [
  {
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
      </svg>
    ),
    title: 'Пълна честност — винаги',
    desc: 'Казваме истината за пазара, дори когато тя не е в интерес на бързата сделка. Дори когато означава да Ви кажем "изчакайте". Репутацията ни е по-ценна от всяка комисиона.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
    title: 'Максимум 10 клиента на месец',
    desc: 'Работим с ограничен брой клиенти, за да сме наистина там за всеки от тях. Не разделяме вниманието си между 30 сделки — когато сме Ваши брокери, сме изцяло Ваши.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    title: 'Специалисти в София',
    desc: 'Работим изключително в столицата — познаваме всеки квартал, всяка улица, реалните цени и реалните тенденции. Не сме генерalists — сме Sofia specialists.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z" />
      </svg>
    ),
    title: 'Работим като за себе си',
    desc: 'Всяка сделка, всяко решение — питаме се: "Какво бихме направили, ако това беше нашият имот?" Именно затова клиентите ни ни препоръчват на приятелите си.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
      </svg>
    ),
    title: 'Без скрити такси',
    desc: 'Всичко е на масата от първия разговор. Комисионата, условията, очакванията — прозрачно и ясно. Никога не разбирате за допълнителни разходи на подписването.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
    title: 'Безплатна консултация',
    desc: 'Преди всяко решение — говорете с нас. 30–45 минути, по телефон или лично, напълно безплатно. Ако след консултацията решите да не работите с нас — добре. Поне ще сте по-информирани.',
  },
]

const stats = [
  { value: '≤10', label: 'клиента на месец — за максимално внимание' },
  { value: '0', label: 'скрити такси — прозрачност от първия разговор' },
  { value: '100%', label: 'отдаденост — работим като за собствен имот' },
  { value: '18%', label: 'ръст на имотния пазар в София за 2025 г.' },
]

export default function PostGeneratorPage() {
  return (
    <>
      <PostGeneratorClient />

      {/* Защо да изберете нас */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-brand-gold rounded-full" />
              <span className="text-brand-green text-sm font-semibold">Доверие - Честност - Резултати</span>
            </div>
            <h2 className="font-serif text-5xl font-bold text-brand-green mb-4">
              Защо да изберете<br />
              <span className="text-brand-gold">New Key Properties?</span>
            </h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto leading-relaxed">
              Не сме най-голямата агенция в Sofia. Но се стремим да бъдем най-честната — и агенцията, за която клиентите говорят на приятелите си.
            </p>
          </div>

          {/* Reasons grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {reasons.map((r, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-7 hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <div className="w-14 h-14 bg-brand-green rounded-2xl flex items-center justify-center text-brand-gold mb-5 group-hover:scale-105 transition-transform">
                  {r.icon}
                </div>
                <h3 className="font-bold text-brand-green text-xl mb-3">{r.title}</h3>
                <p className="text-gray-500 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-brand-green rounded-3xl p-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="font-serif text-5xl font-bold text-brand-gold mb-3">{s.value}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <h3 className="font-serif text-3xl font-bold text-brand-green mb-4">
              Готови ли сте за честен разговор?
            </h3>
            <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
              Безплатна консултация, без задължения. Казваме Ви истината за пазара — и после решавате Вие.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:0879826292"
                className="bg-brand-green text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-green/90 transition-colors text-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                0879 826 292
              </a>
              <a
                href="mailto:office@newkey.bg"
                className="border-2 border-brand-green text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-green/5 transition-colors text-lg"
              >
                office@newkey.bg
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
