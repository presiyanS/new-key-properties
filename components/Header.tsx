'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Начало' },
  { href: '/listings', label: 'Имоти' },
  { href: '/about', label: 'За Нас' },
  { href: '/team', label: 'Екипът ни' },
  { href: '/blog', label: 'Блог' },
  { href: '/contact', label: 'Контакти' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-brand-green sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="New Key Properties"
              width={180}
              height={68}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                  pathname === l.href
                    ? 'text-brand-gold border-b-2 border-brand-gold pb-0.5'
                    : 'text-brand-gold/80 hover:text-brand-gold'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA Phone */}
          <a
            href="tel:0879826292"
            className="hidden lg:flex items-center gap-2 bg-brand-gold text-brand-green font-bold px-5 py-2.5 rounded-lg hover:bg-brand-gold-light transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            0879 826 292
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-brand-gold p-2 rounded-lg hover:bg-brand-green-light transition-colors"
            aria-label="Меню"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-brand-green-dark border-t border-brand-gold/20">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block py-3 px-2 font-medium border-b border-brand-gold/10 transition-colors ${
                  pathname === l.href ? 'text-brand-gold' : 'text-brand-gold/70 hover:text-brand-gold'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="tel:0879826292"
              className="flex items-center gap-2 mt-4 bg-brand-gold text-brand-green font-bold px-4 py-3 rounded-lg"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              0879 826 292
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
