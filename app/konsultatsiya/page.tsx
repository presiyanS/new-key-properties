import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Безплатна Консултация | New Key Properties',
  description: 'Запишете се за безплатна консултация с нашите брокери. Честен съвет без скрити такси — помагаме ви да купите, продадете или наемете имот в София.',
}

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
    ),
    title: 'Напълно безплатно',
    desc: 'Без никакви задължения. Консултацията е безплатна — говорим честно и без да се опитваме да ви "продадем" нещо.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
      </svg>
    ),
    title: 'Честен съвет',
    desc: 'Казваме ви истината — дори ако тя означава да изчакате или да не купувате точно сега. Вашият интерес е на първо място.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z" />
      </svg>
    ),
    title: 'Пазарна оценка',
    desc: 'Получавате реална оценка на цените в квартала, който ви интересува — без преувеличения и без скрити агенди.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
    title: 'Личен брокер',
    desc: 'Работите директно с Александър или Борил — не с колцентър, не с начинаещ стажант. Лично внимание от първия контакт.',
  },
]

const faq = [
  {
    q: 'Наистина ли е безплатно?',
    a: 'Да, напълно безплатно. Нямаме скрити такси за консултацията. Ако решите да работите с нас след това — тогава обсъждаме условия.',
  },
  {
    q: 'Колко продължава консултацията?',
    a: 'Обикновено 30-45 минути — по телефон или лично в удобно за вас място в София.',
  },
  {
    q: 'Трябва ли да съм готов да купувам/продавам веднага?',
    a: 'Не. Много хора идват при нас с въпроси, планират покупка след 3-6 месеца, или просто искат да разберат пазара. Всичко е добре дошло.',
  },
  {
    q: 'Работите ли само в определени квартали?',
    a: 'Работим в цяла София, но специализираме в: Драгалевци, Младост, Овча купел, Дружба, Manor Livadi и центъра.',
  },
]

export default function KonsultatsiyaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-green py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
              <span className="text-brand-gold text-sm font-medium">Ограничени места за месец {new Date().toLocaleDateString('bg-BG', { month: 'long', year: 'numeric' })}</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Безплатна<br />
              <span className="text-brand-gold">Консултация</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed mb-8 max-w-2xl">
              Имате въпроси за имотния пазар в София? Мислите да купувате, продавате или наемате?
              Говорете с нас — честно, без задължения и напълно безплатно.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#form"
                className="bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/90 transition-colors text-lg"
              >
                Запишете се сега
              </a>
              <a
                href="tel:0879826292"
                className="border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                0879 826 292
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-bold text-brand-green mb-4">Какво получавате</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">При консултацията с New Key Properties нямате какво да губите — само да спечелите.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center text-brand-gold mb-4">
                  {b.icon}
                </div>
                <h3 className="font-bold text-brand-green text-lg mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof / trust section */}
      <section className="py-16 bg-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-serif text-5xl font-bold text-brand-gold mb-2">≤10</p>
              <p className="text-white/70">клиента на месец — за максимално внимание към всеки</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-bold text-brand-gold mb-2">0</p>
              <p className="text-white/70">скрити такси — прозрачност от първия разговор</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-bold text-brand-gold mb-2">100%</p>
              <p className="text-white/70">отдаденост — работим като за собствен имот</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section id="form" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left copy */}
            <div>
              <h2 className="font-serif text-4xl font-bold text-brand-green mb-4">Запишете се за консултация</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Попълнете формата и ще се свържем с вас в рамките на 24 часа, за да уточним удобен час.
              </p>

              {/* Steps */}
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Попълнете формата', desc: 'Кажете ни накратко с какво можем да помогнем.' },
                  { step: '02', title: 'Обаждаме ви се', desc: 'Свързваме се с вас до 24 часа, за да уточним час.' },
                  { step: '03', title: 'Консултация', desc: '30-45 мин. разговор — по телефон или лично в София.' },
                  { step: '04', title: 'Решавате вие', desc: 'Без натиск. Работим заедно само ако решите сам.' },
                ].map((s) => (
                  <div key={s.step} className="flex gap-5 items-start">
                    <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-brand-gold font-bold text-xs">{s.step}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-green mb-1">{s.title}</p>
                      <p className="text-gray-500 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-serif text-2xl font-bold text-brand-green mb-2">Вашето запитване</h3>
              <p className="text-gray-400 text-sm mb-8">Отговаряме в рамките на 24 часа.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-brand-green text-center mb-12">Често задавани въпроси</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-brand-green text-lg mb-2">{item.q}</h3>
                <p className="text-gray-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-brand-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-4">Готови ли сте?</h2>
          <p className="text-white/70 text-lg mb-8">Първата стъпка е безплатна. Свържете се с нас днес.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#form"
              className="bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/90 transition-colors text-lg"
            >
              Запишете се онлайн
            </a>
            <a
              href="tel:0879826292"
              className="border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              Обадете се сега
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
