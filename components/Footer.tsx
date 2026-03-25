import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-brand-green-dark text-brand-gold/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image src="/logo.png" alt="New Key Properties" width={160} height={60} className="h-14 w-auto mb-5" />
            <p className="text-sm leading-relaxed mb-4">
              Честност. Доверие. Резултати.<br />
              Вашият надежден партньор на пазара на недвижими имоти в София.
            </p>
            <p className="text-xs text-brand-gold/40 italic">
              Работим с ограничен брой клиенти на месец – за максимално качество.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-brand-gold font-semibold uppercase tracking-widest text-xs mb-5">Навигация</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/', label: 'Начало' },
                { href: '/listings', label: 'Имоти' },
                { href: '/about', label: 'За Нас' },
                { href: '/team', label: 'Екипът ни' },
                { href: '/blog', label: 'Блог' },
                { href: '/contact', label: 'Контакти' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-brand-gold font-semibold uppercase tracking-widest text-xs mb-5">Услуги</h3>
            <ul className="space-y-2.5 text-sm">
              <li>Продажба на имоти</li>
              <li>Отдаване под наем</li>
              <li>Намиране на имот</li>
              <li>Инвестиционни консултации</li>
              <li>Пазарни анализи</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-brand-gold font-semibold uppercase tracking-widest text-xs mb-5">Контакти</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>София, България</span>
              </li>
              <li>
                <a href="tel:0879826292" className="flex items-center gap-2.5 hover:text-brand-gold transition-colors">
                  <svg className="w-4 h-4 shrink-0 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  0879 826 292
                </a>
              </li>
              <li>
                <a href="mailto:office@newkey.bg" className="flex items-center gap-2.5 hover:text-brand-gold transition-colors">
                  <svg className="w-4 h-4 shrink-0 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  office@newkey.bg
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-brand-gold/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-gold/40">
          <p>© {new Date().getFullYear()} New Key Properties. Всички права запазени.</p>
          <p>Агенция за недвижими имоти – София, България</p>
        </div>
      </div>
    </footer>
  )
}
