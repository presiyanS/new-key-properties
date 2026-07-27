export type TeamMember = {
  id: string
  name: string
  nameEn?: string
  role: string
  roleEn?: string
  bio: string
  bioEn?: string
  phone?: string
  email?: string
  image: string
}

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Александър Соколов',
    nameEn: 'Alexander Sokolov',
    role: 'Управляващ директор',
    roleEn: 'Managing Director',
    bio: 'Александър е основател на New Key Properties и води агенцията с ясна мисия — да бъде най-честната агенция за недвижими имоти в София. Подхожда към всяка сделка с пълна прозрачност и истинска грижа за клиента.',
    bioEn: 'Alexander is the founder of New Key Properties and leads the agency with a clear mission — to be the most honest real estate agency in Sofia. He approaches every deal with full transparency and genuine care for the client.',
    phone: '0879826292',
    email: 'a.sokolov@newkey.bg',
    image: '/team/alexander-sokolov.jpg',
  },
  {
    id: '3',
    name: 'Кольо Томчев',
    nameEn: 'Kolyo Tomchev',
    role: 'Старши консултант',
    roleEn: 'Senior Consultant',
    bio: 'Кольо е опитен специалист с задълбочено познаване на пазара на недвижими имоти в София. Работи с всеки клиент индивидуално, намирайки решения, съобразени с техните нужди и бюджет.',
    bioEn: 'Kolyo is an experienced specialist with in-depth knowledge of the Sofia real estate market. He works with every client individually, finding solutions tailored to their needs and budget.',
    image: '/team/placeholder.svg',
  },
  {
    id: '2',
    name: 'Борил Соколов',
    nameEn: 'Boril Sokolov',
    role: 'Старши консултант',
    roleEn: 'Senior Consultant',
    bio: 'Борил работи рамо до рамо с клиентите на агенцията, помагайки им да намерят правилния имот в София. Отличава се с внимание към детайла, честност и истинска отдаденост на работата си.',
    bioEn: 'Boril works shoulder to shoulder with the agency\'s clients, helping them find the right property in Sofia. He stands out for his attention to detail, honesty, and genuine dedication to his work.',
    image: '/team/placeholder.svg',
  },
]
