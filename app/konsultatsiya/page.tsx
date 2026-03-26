import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { getConsultationPage } from '@/lib/sanity'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Безплатна Консултация | New Key Properties',
  description: 'Запишете се за безплатна консултация с нашите брокери. Честен съвет без скрити такси — помагаме ви да купите, продадете или наемете имот в София.',
}

export default async function KonsultatsiyaPage() {
  const cms = await getConsultationPage()

  const benefits = cms?.benefits?.length > 0 ? cms.benefits : [
    { title: 'Напълно безплатно', desc: 'Без никакви задължения. Консултацията е безплатна — говорим честно и без да се опитваме да ви "продадем" нещо.' },
    { title: 'Честен съвет', desc: 'Казваме ви истината — дори ако тя означава да изчакате или да не купувате точно сега. Вашият интерес е на първо място.' },
    { title: 'Пазарна оценка', desc: 'Получавате реална оценка на цените в квартала, който ви интересува — без преувеличения и без скрити агенди.' },
    { title: 'Личен брокер', desc: 'Работите директно с Александър или Борил — не с колцентър, не с начинаещ стажант. Лично внимание от първия контакт.' },
  ]

  const stats = cms?.stats?.length > 0 ? cms.stats : [
    { value: '≤10', label: 'клиента на месец — за максимално внимание към всеки' },
    { value: '0', label: 'скрити такси — прозрачност от първия разговор' },
    { value: '100%', label: 'отдаденост — работим като за собствен имот' },
  ]

  const steps = cms?.steps?.length > 0 ? cms.steps : [
    { title: 'Попълнете формата', desc: 'Кажете ни накратко с какво можем да помогнем.' },
    { title: 'Обаждаме ви се', desc: 'Свързваме се с вас до 24 часа, за да уточним час.' },
    { title: 'Консултация', desc: '30-45 мин. разговор — по телефон или лично в София.' },
    { title: 'Решавате вие', desc: 'Без натиск. Работим заедно само ако решите сам.' },
  ]

  const faq = cms?.faq?.length > 0 ? cms.faq : [
    { q: 'Наистина ли е безплатно?', a: 'Да, напълно безплатно. Нямаме скрити такси за консултацията. Ако решите да работите с нас след това — тогава обсъждаме условия.' },
    { q: 'Колко продължава консултацията?', a: 'Обикновено 30-45 минути — по телефон или лично в удобно за вас място в София.' },
    { q: 'Трябва ли да съм готов да купувам/продавам веднага?', a: 'Не. Много хора идват при нас с въпроси, планират покупка след 3-6 месеца, или просто искат да разберат пазара. Всичко е добре дошло.' },
    { q: 'Работите ли само в определени квартали?', a: 'Работим в цяла София, но специализираме в: Драгалевци, Младост, Овча купел, Дружба, Monastery Livadi и центъра.' },
  ]

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
              <span className="text-brand-gold text-sm font-medium">{cms?.heroBadge ?? `Ограничени места за месец ${new Date().toLocaleDateString('bg-BG', { month: 'long', year: 'numeric' })}`}</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {cms?.heroTitle ?? 'Безплатна'}<br />
              <span className="text-brand-gold">{cms?.heroTitleGold ?? 'Консултация'}</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed mb-8 max-w-2xl">
              {cms?.heroSubtitle ?? 'Имате въпроси за имотния пазар в София? Мислите да купувате, продавате или наемате? Говорете с нас — честно, без задължения и напълно безплатно.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#form" className="bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/90 transition-colors text-lg">
                Запишете се сега
              </a>
              <a href="tel:0879826292" className="border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-lg flex items-center gap-2">
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
            <h2 className="font-serif text-4xl font-bold text-brand-green mb-4">{cms?.benefitsTitle ?? 'Какво получавате'}</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">{cms?.benefitsSubtitle ?? 'При консултацията с New Key Properties нямате какво да губите — само да спечелите.'}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b: { title: string; desc: string }, i: number) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center text-brand-gold mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </div>
                <h3 className="font-bold text-brand-green text-lg mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((s: { value: string; label: string }, i: number) => (
              <div key={i}>
                <p className="font-serif text-5xl font-bold text-brand-gold mb-2">{s.value}</p>
                <p className="text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form section */}
      <section id="form" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-4xl font-bold text-brand-green mb-4">Запишете се за консултация</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Попълнете формата и ще се свържем с вас в рамките на 24 часа, за да уточним удобен час.
              </p>
              <div className="space-y-6">
                {steps.map((s: { title: string; desc: string }, i: number) => (
                  <div key={i} className="flex gap-5 items-start">
                    <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-brand-gold font-bold text-xs">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-green mb-1">{s.title}</p>
                      <p className="text-gray-500 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
            {faq.map((item: { q: string; a: string }, i: number) => (
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
            <a href="#form" className="bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/90 transition-colors text-lg">
              Запишете се онлайн
            </a>
            <a href="tel:0879826292" className="border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-lg">
              Обадете се сега
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
