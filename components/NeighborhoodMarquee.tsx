'use client'

/**
 * Infinite auto-scrolling strip showing Sofia neighbourhoods + brand phrases.
 * Seamless loop via a duplicated list.
 * Pauses on hover so visitors can read.
 */

const items = [
  { type: 'hood', text: 'Драгалевци' },
  { type: 'dot' },
  { type: 'hood', text: 'Младост' },
  { type: 'dot' },
  { type: 'phrase', text: 'Честност · Доверие · Резултати' },
  { type: 'dot' },
  { type: 'hood', text: 'Лозенец' },
  { type: 'dot' },
  { type: 'hood', text: 'Витоша' },
  { type: 'dot' },
  { type: 'phrase', text: 'Само София' },
  { type: 'dot' },
  { type: 'hood', text: 'Студентски Град' },
  { type: 'dot' },
  { type: 'hood', text: 'Борово' },
  { type: 'dot' },
  { type: 'phrase', text: '0 скрити такси' },
  { type: 'dot' },
  { type: 'hood', text: 'Дружба' },
  { type: 'dot' },
  { type: 'hood', text: 'Красно Село' },
  { type: 'dot' },
  { type: 'phrase', text: 'Персонален подход' },
  { type: 'dot' },
  { type: 'hood', text: 'Оборище' },
  { type: 'dot' },
  { type: 'hood', text: 'Изток' },
  { type: 'dot' },
  { type: 'phrase', text: 'Максимум 10 клиента / месец' },
  { type: 'dot' },
  { type: 'hood', text: 'Иван Вазов' },
  { type: 'dot' },
  { type: 'hood', text: 'Кръстова Вада' },
  { type: 'dot' },
]

export default function NeighborhoodMarquee() {
  const doubled = [...items, ...items]

  return (
    <div className="bg-brand-green-dark/70 border-t border-brand-gold/10 border-b border-brand-gold/10 py-3 overflow-hidden">
      <div className="flex whitespace-nowrap marquee-track select-none">
        {doubled.map((item, i) => {
          if (item.type === 'dot') {
            return (
              <span key={i} className="mx-4 text-brand-gold/25 text-base leading-none self-center">
                ◆
              </span>
            )
          }
          if (item.type === 'phrase') {
            return (
              <span
                key={i}
                className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] self-center"
              >
                {item.text}
              </span>
            )
          }
          return (
            <span
              key={i}
              className="text-brand-gold/50 text-xs uppercase tracking-[0.15em] font-medium self-center"
            >
              {item.text}
            </span>
          )
        })}
      </div>
    </div>
  )
}
