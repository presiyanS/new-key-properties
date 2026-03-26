import type { Metadata } from 'next'
import Link from 'next/link'
import { getAboutPage } from '@/lib/sanity'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'За Нас',
  description: 'Научете повече за New Key Properties – честна агенция за недвижими имоти в София с истинска грижа за клиентите.',
}

export default async function AboutPage() {
  const cms = await getAboutPage()

  const missionParagraphs = cms?.missionParagraphs?.length > 0 ? cms.missionParagraphs : [
    'Вярваме, че пазарът на недвижими имоти се нуждае от повече честност. Твърде много хора са разочаровани от агенции, които мислят само за комисионната — не за резултата.',
    'Ние работим различно. Фокусираме се върху затворени сделки, не върху брой огледи. Квалифицираме сериозните купувачи, подготвяме имота стратегически и преговаряме от ваше име. Работим с ограничен брой клиенти, за да можем да отделим пълното си внимание на всеки — и да подхождаме към всяка сделка, сякаш е наша собствена.',
    'Нашата цел е да станем най-доверената агенция в София — не чрез реклама, а чрез реални резултати, доволни клиенти и репутация, изградена с честна работа.',
  ]

  const missionValues = cms?.missionValues?.length > 0 ? cms.missionValues : [
    { label: 'Доверие', desc: 'Изграждаме дългосрочни отношения, основани на честна работа и реални резултати.' },
    { label: 'Честност', desc: 'Казваме истината — дори когато тя не е това, което клиентът иска да чуе.' },
    { label: 'Резултати', desc: 'Фокусираме се върху намирането на правилното решение, не на бързата комисионна.' },
  ]

  const values = cms?.values?.length > 0 ? cms.values : [
    { title: 'Прозрачност', desc: 'Никакви скрити такси, никакви изненади. Знаете точно с какво разполагате и какво ви струва.' },
    { title: 'Личен подход', desc: 'Всеки клиент е уникален. Слушаме внимателно и намираме решения, съобразени с вашата конкретна ситуация.' },
    { title: 'Качество пред количество', desc: 'Работим с ограничен брой клиенти на месец, за да гарантираме максимално качество на услугата.' },
    { title: 'Дългосрочно мислене', desc: 'Интересуваме се от вашите дългосрочни цели, не само от текущата сделка.' },
    { title: 'Пазарна компетентност', desc: 'Следим пазара постоянно и ви даваме реална картина — без преувеличения в нито една посока.' },
    { title: 'Ангажираност', desc: 'Остаме достъпни и ангажирани от първия контакт до финалното подписване и след него.' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-green py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-brand-gold/60 uppercase text-sm tracking-widest mb-4">За Нас</p>
            <h1 className="font-serif text-5xl font-bold text-white mb-6">
              {cms?.heroTitle ?? 'Агенция, Която Наистина'}<br />
              <span className="text-brand-gold">{cms?.heroTitleGold ?? 'Се Грижи'}</span> за Вас
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              {cms?.heroSubtitle ?? 'New Key Properties не е просто поредната агенция за имоти. Ние сме екип от хора, за които честността и грижата за клиента не са маркетингови фрази — те са начин на работа.'}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold text-brand-green mb-6">{cms?.missionTitle ?? 'Нашата Мисия'}</h2>
              {missionParagraphs.map((p: string, i: number) => (
                <p key={i} className="text-gray-600 text-lg leading-relaxed mb-6">{p}</p>
              ))}
            </div>
            <div className="bg-brand-green rounded-3xl p-10">
              <h3 className="font-serif text-2xl font-bold text-white mb-8">{cms?.missionCardTitle ?? 'Доверие – Честност – Резултати'}</h3>
              <div className="space-y-6">
                {missionValues.map((v: { label: string; desc: string }) => (
                  <div key={v.label} className="border-l-2 border-brand-gold pl-5">
                    <h4 className="text-brand-gold font-bold text-lg mb-1">{v.label}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-bold text-brand-green mb-4">{cms?.valuesTitle ?? 'Нашите Ценности'}</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              {cms?.valuesSubtitle ?? 'Принципите, с които подхождаме към всяка сделка и всеки клиент.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v: { title: string; desc: string }, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-brand-gold/40 font-serif font-bold text-4xl mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-brand-green mb-6">С Какво Се Занимаваме</h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            New Key Properties специализира изключително в жилищни и инвестиционни имоти в София — продажби, наеми и намиране на имоти за покупка.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              { title: 'Продажби', items: ['Оценка на имота', 'Маркетинг и представяне', 'Преговори от ваше име', 'Цялостна правна подкрепа'] },
              { title: 'Наеми', items: ['Намиране на наематели', 'Проверка на кандидати', 'Договори за наем', 'Управление на имота'] },
              { title: 'Намиране на имот', items: ['Анализ на нуждите', 'Активно търсене', 'Проверка на документи', 'Преговори и покупка'] },
            ].map((s) => (
              <div key={s.title} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                <h3 className="font-bold text-brand-green text-xl mb-5">{s.title}</h3>
                <ul className="space-y-3">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                      <span className="w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-green">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-4">{cms?.ctaTitle ?? 'Готови ли сте да работите с нас?'}</h2>
          <p className="text-white/60 text-lg mb-10">
            {cms?.ctaSubtitle ?? 'Местата са ограничени. Свържете се с нас сега и вижте как можем да ви помогнем.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold-light transition-colors text-lg">
              Свържете се с нас
            </Link>
            <Link href="/team" className="border-2 border-brand-gold/60 text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/10 transition-colors text-lg">
              Запознайте се с екипа
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
