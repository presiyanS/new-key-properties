import type { Metadata } from 'next'
import Link from 'next/link'
import TeamMemberCard from '@/components/TeamMemberCard'
import { getTeamMembers } from '@/lib/sanity'
import { team as staticTeam } from '@/data/team'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Екипът ни',
  description: 'Запознайте се с екипа на New Key Properties – брокери с опит, отдаденост и истинска грижа за клиентите.',
}

export default async function TeamPage() {
  const sanityTeam = await getTeamMembers()
  const team = sanityTeam.length > 0 ? sanityTeam : staticTeam
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-green py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-brand-gold/60 uppercase text-sm tracking-widest mb-4">Екипът ни</p>
            <h1 className="font-serif text-5xl font-bold text-white mb-6">
              Хора, на Които<br />
              <span className="text-brand-gold">Можете да Разчитате</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              Нашият екип е малък, но всеотдаен. Всеки от нас подхожда към работата с максимална грижа и честност.
            </p>
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-brand-green mb-6">Нашата Философия</h2>
          <p className="text-gray-600 text-xl leading-relaxed mb-8">
            Работим с ограничен брой клиенти на месец — не защото не искаме повече работа, а защото вярваме, че качеството е по-важно от количеството. Всеки клиент заслужава пълното ни внимание.
          </p>
          <p className="text-gray-500 text-lg leading-relaxed">
            Когато работим с Вас, третираме Вашия имот и Вашите интереси така, сякаш са наши. Това не е маркетинг — това е начинът, по който сме решили да работим.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-gold">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold text-brand-green mb-4">Свържете се с нашия екип</h2>
          <p className="text-brand-green/70 text-lg mb-10">
            Готови сме да отговорим на Вашите въпроси и да Ви помогнем с намирането на правилния имот.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0879826292" className="bg-brand-green text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-green-dark transition-colors text-lg">
              0879 826 292
            </a>
            <Link href="/contact" className="border-2 border-brand-green text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-green/10 transition-colors text-lg">
              Изпратете запитване
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
