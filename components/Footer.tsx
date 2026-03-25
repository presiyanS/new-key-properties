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

        {/* Social Media */}
        <div className="mt-10 flex items-center gap-4">
          <span className="text-xs text-brand-gold/40 uppercase tracking-widest">Последвайте ни</span>
          <a href="https://www.facebook.com/profile.php?id=61582999994088" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-brand-gold/50 hover:text-brand-gold transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/new_key_properties" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-brand-gold/50 hover:text-brand-gold transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/new-key-properties/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-brand-gold/50 hover:text-brand-gold transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>

        <div className="mt-8 pt-8 border-t border-brand-gold/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-gold/40">
          <p>© {new Date().getFullYear()} New Key Properties. Всички права запазени.</p>
          <p>Агенция за недвижими имоти – София, България</p>
          <Link href="/studio" className="text-brand-gold/20 hover:text-brand-gold/50 transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  )
}
