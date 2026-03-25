'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Колко струва услугата ви?',
    a: 'Комисионната ни е стандартна за пазара и се договаря индивидуално в зависимост от типа и стойността на сделката. При покупка — работим изцяло в интерес на купувача, без скрити такси. Безплатната ни консултация не ви задължава с нищо.',
  },
  {
    q: 'Работите ли само в определени квартали на София?',
    a: 'Обслужваме целия град София, но имаме особено задълбочени познания в квартали като Драгалевци, Младост, Овча купел, Дружба, Манастирски ливади и централните части. Навсякъде в столицата можем да ви помогнем с пълен ангажимент.',
  },
  {
    q: 'Как работи безплатната консултация?',
    a: 'Свързвате се с нас по телефон или имейл, уговаряме удобно за вас време и провеждаме разговор от 30–45 минути — по телефон или на живо. Обсъждаме вашите нужди, бюджет и планове. Без задължения и без натиск.',
  },
  {
    q: 'Защо да работя с агент, вместо сам да търся имот?',
    a: 'Добрите имоти изчезват бързо — понякога за дни. Агентът ви дава достъп до оферти преди да са публикувани, спестява ви часове оглед на неподходящи имоти, проверява документи и ви представлява при преговорите. Нашият интерес съвпада с вашия — намираме правилния имот, не просто поредния.',
  },
  {
    q: 'Помагате ли и при наеми, не само покупки?',
    a: 'Да — работим при наеми, покупки, продажби и инвестиционни консултации. Независимо дали търсите имот за живеене, за отдаване под наем или като инвестиция, нашият екип е на ваше разположение.',
  },
  {
    q: 'Колко бързо може да се осъществи сделка?',
    a: 'Зависи от типа сделка. Наем може да се финализира за 1–2 седмици. Покупко-продажба с ипотека отнема обичайно 4–8 седмици. При готов финансов ресурс — понякога под 3 седмици. Ние следим всеки срок и ви държим информирани на всяка стъпка.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl font-bold text-brand-green mb-4">Често Задавани Въпроси</h2>
          <p className="text-gray-500 text-lg">Отговори на най-честите въпроси, които получаваме от клиентите.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                <span className={`shrink-0 w-6 h-6 rounded-full bg-brand-green flex items-center justify-center transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
                  <svg className="w-3 h-3 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
