import type { Metadata } from 'next'
import Link from 'next/link'
import TeamMemberCard from '@/components/TeamMemberCard'
import AnimatedSection from '@/components/AnimatedSection'
import { getTeamMembers, getTeamPage, getSiteSettings } from '@/lib/sanity'
import { draftMode } from 'next/headers'
import { team as staticTeam } from '@/data/team'
import { getLocale, getDictionary } from '@/lib/i18n/getDictionary'
import { localizeHref, hreflangAlternates } from '@/lib/i18n/config'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  if (locale === 'en') {
    return {
      title: 'Our Team',
      description:
        'Meet the New Key Properties team – experienced brokers with dedication and genuine care for clients.',
      alternates: hreflangAlternates('/team', locale),
    }
  }
  return {
    title: 'Екипът ни',
    description:
      'Запознайте се с екипа на New Key Properties – брокери с опит, отдаденост и истинска грижа за клиентите.',
    alternates: hreflangAlternates('/team', locale),
  }
}

export default async function TeamPage() {
  const { isEnabled: preview } = await draftMode()
  const [sanityTeam, cms, settings] = await Promise.all([
    getTeamMembers(preview),
    getTeamPage(preview),
    getSiteSettings(preview),
  ])
  const rawTeam = sanityTeam.length > 0 ? sanityTeam : staticTeam
  const locale = await getLocale()
  const dict = getDictionary(locale)
  const phone = settings?.phone ?? '0879826292'
  const phoneDisplay = settings?.phoneDisplay ?? '0879 826 292'

  function t(bg: string | undefined, en: string | undefined, bgDefault: string, enDefault: string) {
    return locale === 'en' ? (en ?? enDefault) : (bg ?? bgDefault)
  }

  const team = rawTeam.map((m) => ({
    ...m,
    name: locale === 'en' ? (m.nameEn ?? m.name) : m.name,
    role: locale === 'en' ? (m.roleEn ?? m.role) : m.role,
    bio: locale === 'en' ? (m.bioEn ?? m.bio) : m.bio,
  }))

  const philosophyItems = (
    cms?.philosophyItems?.length > 0
      ? cms.philosophyItems
      : [
          { title: 'Качество над количество', titleEn: 'Quality over quantity', text: 'Работим с ограничен брой клиенти на месец — не защото не искаме повече работа, а защото вярваме, че качеството е по-важно от количеството. Всеки клиент заслужава пълното ни внимание.', textEn: "We work with a limited number of clients each month — not because we don't want more work, but because we believe quality matters more than quantity. Every client deserves our full attention." },
          { title: 'Работим като за себе си', titleEn: 'We work as if it were our own', text: 'Когато работим с Вас, третираме Вашия имот и Вашите интереси така, сякаш са наши. Това не е маркетинг — това е начинът, по който сме решили да работим.', textEn: "When we work with you, we treat your property and your interests as if they were our own. This isn't marketing — it's how we've chosen to work." },
        ]
  ).map((item: { title: string; titleEn?: string; text: string; textEn?: string }) => ({
    title: locale === 'en' ? (item.titleEn ?? item.title) : item.title,
    text: locale === 'en' ? (item.textEn ?? item.text) : item.text,
  }))

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-green py-28 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <p className="text-brand-gold/60 uppercase text-xs tracking-widest mb-5 font-medium animate-fade-in">
              {dict.nav.team}
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-up">
              {t(cms?.heroTitle, cms?.heroTitleEn, 'Хората, на', 'The people')}<br />
              <span className="text-brand-gold">{t(cms?.heroTitleGold, cms?.heroTitleGoldEn, 'които можете да разчитате', 'you can rely on')}</span>
            </h1>
            <p
              className="text-white/70 text-xl leading-relaxed animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              {t(
                cms?.heroSubtitle,
                cms?.heroSubtitleEn,
                'Нашият екип е малък, но всеотдаен. Всеки от нас подхожда към работата с максимална грижа и честност.',
                'Our team is small, but dedicated. Each of us approaches our work with maximum care and honesty.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ── Team grid ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">
              {t(cms?.teamGridLabel, cms?.teamGridLabelEn, 'Нашите хора', 'Our people')}
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-green mt-3">
              {t(cms?.teamGridTitle, cms?.teamGridTitleEn, 'Запознайте се с нас', 'Meet the team')}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.1}>
                <TeamMemberCard member={member} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">{dict.team.philosophyEyebrow}</span>
            <h2 className="font-serif text-4xl font-bold text-brand-green mt-3 mb-8">
              {t(cms?.philosophyTitle, cms?.philosophyTitleEn, 'Нашата философия', 'Our philosophy')}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            {philosophyItems.map((item: { title: string; text: string }, i: number) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 h-full">
                  <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center mb-5">
                    <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-brand-green text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-brand-gold relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <AnimatedSection>
            <h2 className="font-serif text-4xl font-bold text-brand-green mb-4">
              {t(cms?.ctaTitle, cms?.ctaTitleEn, 'Свържете се с нашия екип', 'Get in touch with our team')}
            </h2>
            <p className="text-brand-green/70 text-lg mb-10">
              {t(
                cms?.ctaSubtitle,
                cms?.ctaSubtitleEn,
                'Готови сме да отговорим на Вашите въпроси и да Ви помогнем с намирането на правилния имот.',
                "We're ready to answer your questions and help you find the right property."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${phone}`}
                className="bg-brand-green text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-green-dark transition-all text-lg shadow-lg shadow-brand-green/20 hover:-translate-y-0.5"
              >
                {phoneDisplay}
              </a>
              <Link
                href={localizeHref('/contact', locale)}
                className="border-2 border-brand-green text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-green/10 transition-all text-lg"
              >
                {dict.team.ctaButton}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
