'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Начало' },
  { href: '/listings', label: 'Имоти' },
  { href: '/kvartali', label: 'Квартали' },
  { href: '/about', label: 'За Нас' },
  { href: '/team', label: 'Екипът ни' },
  { href: '/blog', label: 'Блог' },
  { href: '/konsultatsiya', label: 'Консултация' },
  { href: '/contact', label: 'Контакти' },
]

type SocialLinks = { facebook: string; instagram: string; linkedin: string }

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
)

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

function SocialLinks({ links, size = 'sm' }: { links: SocialLinks; size?: 'sm' | 'md' }) {
  const cls = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  const socials = [
    { href: links.facebook, label: 'Facebook', Icon: FacebookIcon },
    { href: links.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: links.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  ]
  return (
    <>
      {socials.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-brand-gold/50 hover:text-brand-gold transition-all hover:scale-110"
        >
          <span className={cls}><Icon /></span>
        </a>
      ))}
    </>
  )
}

type Props = {
  phone: string
  phoneDisplay: string
  socialLinks: SocialLinks
}

export default function Header({ phone, phoneDisplay, socialLinks }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-green/96 backdrop-blur-xl shadow-2xl shadow-brand-green-dark/30'
          : 'bg-brand-green'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <Image
              src="/logo.png"
              alt="New Key Properties"
              width={180}
              height={68}
              className={`w-auto transition-all duration-300 ${scrolled ? 'h-14' : 'h-20'}`}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-xs xl:text-sm font-medium uppercase tracking-widest transition-colors group ${
                  pathname === l.href ? 'text-brand-gold' : 'text-brand-gold/70 hover:text-brand-gold'
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-brand-gold transition-all duration-300 ${
                    pathname === l.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right: socials + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-3 mr-3">
              <SocialLinks links={socialLinks} size="sm" />
            </div>
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 bg-brand-gold text-brand-green font-bold px-5 py-2.5 rounded-xl hover:bg-brand-gold-light transition-all hover:shadow-lg hover:shadow-brand-gold/20 active:scale-95 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              {phoneDisplay}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-brand-gold p-2 rounded-xl hover:bg-brand-gold/10 transition-colors"
            aria-label="Меню"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-brand-gold rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-2.5' : ''}`} />
              <span className={`block h-0.5 bg-brand-gold rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-0.5 bg-brand-gold rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-brand-green-dark border-t border-brand-gold/10 overflow-hidden"
          >
            <div className="px-5 py-6 space-y-1">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center py-3.5 px-3 text-sm font-medium border-b border-brand-gold/10 transition-all ${
                      pathname === l.href
                        ? 'text-brand-gold'
                        : 'text-brand-gold/60 hover:text-brand-gold hover:pl-5'
                    }`}
                  >
                    {pathname === l.href && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-3 shrink-0" />
                    )}
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-5 space-y-3">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2.5 bg-brand-gold text-brand-green font-bold px-4 py-3.5 rounded-xl w-full"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  {phoneDisplay}
                </a>
                <div className="flex items-center justify-center gap-6 pt-3 border-t border-brand-gold/10">
                  <SocialLinks links={socialLinks} size="md" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
