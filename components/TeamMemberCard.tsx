import Image from 'next/image'
import type { TeamMember } from '@/data/team'

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 text-center p-8 hover:shadow-lg transition-shadow">
      <div className="relative w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden border-4 border-brand-gold ring-4 ring-brand-green/10">
        <Image src={member.image} alt={member.name} fill className="object-cover" />
      </div>
      <h3 className="font-bold text-gray-900 text-xl mb-1">{member.name}</h3>
      <p className="text-brand-gold font-semibold text-sm uppercase tracking-wide mb-4">{member.role}</p>
      <p className="text-gray-500 text-sm leading-relaxed mb-5">{member.bio}</p>
      {member.phone && (
        <a
          href={`tel:${member.phone}`}
          className="inline-flex items-center gap-2 text-brand-green font-medium text-sm hover:text-brand-gold transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          {member.phone}
        </a>
      )}
      {member.email && (
        <a
          href={`mailto:${member.email}`}
          className="inline-flex items-center gap-2 text-brand-green font-medium text-sm hover:text-brand-gold transition-colors mt-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {member.email}
        </a>
      )}
    </div>
  )
}
