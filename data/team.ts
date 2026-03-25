export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  phone?: string
  email?: string
  image: string
}

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Александър Соколов',
    role: 'Управляващ директор',
    bio: 'Александър е основател на New Key Properties и води агенцията с ясна мисия — да бъде най-честната агенция за недвижими имоти в София. Подхожда към всяка сделка с пълна прозрачност и истинска грижа за клиента.',
    phone: '0879826292',
    email: 'office@newkey.bg',
    image: '/team/placeholder.svg',
  },
  {
    id: '2',
    name: 'Борил Соколов',
    role: 'Брокер',
    bio: 'Борил работи рамо до рамо с клиентите на агенцията, помагайки им да намерят правилния имот в София. Отличава се с внимание към детайла, честност и истинска отдаденост на работата си.',
    image: '/team/placeholder.svg',
  },
]
