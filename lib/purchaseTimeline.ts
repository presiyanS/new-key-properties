// Content for the /ot-oferta-do-klyuchove "offer to keys" timeline.
// Durations are the official service times or ranges confirmed in at least
// two sources (checked 2026-10-24). Anything that depends on the deal is
// worded as "depends on / agreed in the contract", never as a promise.
// Each step can be limited to cash or mortgage buyers and to ready or new buildings.

import type { Locale } from './i18n/config'

export type Financing = 'cash' | 'mortgage'
export type BuildingStage = 'ready' | 'new'

export type TimelineLink = { href: string; label: string }

export type TimelineStep = {
  id: string
  title: string
  /** Short duration label, e.g. "3–7 работни дни". */
  duration: string
  /** Who does this step. */
  who: string
  detail: string
  links?: TimelineLink[]
  /** Shown only for this way of paying / this kind of building; omitted means always. */
  financing?: Financing
  stage?: BuildingStage
}

type Content = { steps: TimelineStep[] }

const bg: Content = {
  steps: [
    {
      id: 'oferta',
      title: 'Оглед, оферта и договаряне',
      duration: 'Зависи от Вас',
      who: 'Вие и продавачът',
      detail:
        'Огледайте имота внимателно и договорете не само цената, а и срока до нотариуса, какво остава в имота и кога ще бъде освободен. Запишете всичко договорено - то влиза в предварителния договор.',
      links: [{ href: '/proverka-na-imot', label: 'Какво да проверите при оглед' }],
    },
    {
      id: 'kredit-kandidatstvane',
      financing: 'mortgage',
      title: 'Кандидатстване за кредит',
      duration: '1–3 седмици',
      who: 'Вие и банката',
      detail:
        'Банката проверява дохода и кредитната Ви история и казва до каква сума може да Ви финансира. Започнете възможно най-рано - така ще знаете бюджета си, преди да дадете капаро.',
      links: [{ href: '/kolko-moga-da-si-pozvolya', label: 'Колко можете да си позволите' }],
    },
    {
      id: 'stroitel',
      stage: 'new',
      title: 'Проверка на строителя и проекта',
      duration: 'Няколко дни',
      who: 'Вие или Ваш адвокат',
      detail:
        'Проверете дали строителят е собственик на земята или има право на строеж, дали има разрешение за строеж и одобрен проект, и дали земята не е ипотекирана. Разгледайте сгради, които вече е завършил.',
      links: [{ href: '/proverka-na-imot', label: 'Чеклист за ново строителство' }],
    },
    {
      id: 'predvaritelen',
      title: 'Предварителен договор и капаро',
      duration: '1 ден',
      who: 'Вие и продавачът',
      detail:
        'Подписвате писмен договор с цената, капарото и срока до нотариуса. Размерът на капарото е по договорка - често около 10%. Ако купувачът се откаже, губи капарото; ако продавачът се откаже, връща го в двоен размер (чл. 93 ЗЗД).',
    },
    {
      id: 'predvaritelen-kredit',
      financing: 'mortgage',
      title: 'Условие за кредита в договора',
      duration: 'При подписването',
      who: 'Вие',
      detail:
        'Запишете в предварителния договор какво става с капарото, ако банката откаже кредита, и оставете достатъчно време до нотариуса. От подаването на документите в банката до получаването на парите обикновено минават 3–6 седмици.',
    },
    {
      id: 'etapi',
      stage: 'new',
      title: 'Плащания по етапи на строежа',
      duration: 'До завършване на сградата',
      who: 'Вие и строителят',
      detail:
        'По-сигурно е вноските да са обвързани с актовете - например част при Акт 14 (груб строеж) и остатъкът при Акт 16. Кога точно се подписва нотариалният акт зависи от договора със строителя - уточнете го предварително.',
    },
    {
      id: 'akt16',
      stage: 'new',
      title: 'Изчакване на Акт 16',
      duration: 'Месеци до година',
      who: 'Строителят и ДНСК',
      detail:
        'След Акт 15 държавна комисия проверява сградата. На практика от Акт 15 до Акт 16 минават от няколко месеца до година. След протокола (Акт 16) ДНСК издава разрешение за ползване до 5 работни дни. Без него в имота не може законно да се живее.',
    },
    {
      id: 'dokumenti',
      title: 'Документи и правна проверка',
      duration: '3–7 работни дни',
      who: 'Продавачът, нотариусът или Ваш адвокат',
      detail:
        'Удостоверение за тежести от Агенцията по вписванията (3 или 7 работни дни), удостоверение за данъчна оценка от Столична община (1, 3 или 5 дни) и схема от кадастъра (3 или 7 работни дни). Може да върви успоредно с проверката от банката.',
      links: [{ href: '/proverka-na-imot', label: 'Какво да проверите' }],
    },
    {
      id: 'banka-ocenka',
      financing: 'mortgage',
      title: 'Оценка на имота и окончателно одобрение',
      duration: '1–2 седмици',
      who: 'Банката',
      detail:
        'Оценител на банката оглежда имота (обикновено 3–7 работни дни), юристите на банката проверяват документите, след което банката одобрява кредита окончателно. Банката финансира до 85% от своята оценка, която може да е под цената.',
    },
    {
      id: 'notarius',
      title: 'Сделка при нотариуса',
      duration: '1 ден',
      who: 'Вие, продавачът и нотариусът',
      detail:
        'Подписвате нотариалния акт и нотариусът го вписва в имотния регистър. Преди това се плащат местният данък и таксите - пресметнете ги предварително.',
      links: [{ href: '/kalkulator', label: 'Калкулатор на разходите' }],
    },
    {
      id: 'notarius-kredit',
      financing: 'mortgage',
      title: 'Ипотека и изплащане на продавача',
      duration: '1–3 работни дни след сделката',
      who: 'Банката и нотариусът',
      detail:
        'Заедно с покупката се подписва и учредяването на ипотеката в полза на банката. След вписването ѝ банката превежда парите на продавача.',
    },
    {
      id: 'klyuchove',
      title: 'Предаване на ключовете',
      duration: 'По договорка',
      who: 'Вие и продавачът',
      detail:
        'Подпишете приемо-предавателен протокол и запишете в него показанията на уредите за ток, вода, парно и газ. Те ще Ви трябват за смяната на партидите.',
    },
    {
      id: 'partidi',
      title: 'Партиди и общината',
      duration: 'До 30 дни',
      who: 'Вие',
      detail:
        'Прехвърлете партидите за ток, вода, парно и газ на Ваше име с копие от нотариалния акт. При Софийска вода това е безплатно до 30 дни след сделката. В общината не подавате декларация - при покупка нотариусът изпраща данните служебно (ЗМДТ, чл. 14, ал. 3).',
    },
  ],
}

const en: Content = {
  steps: [
    {
      id: 'oferta',
      title: 'Viewing, offer and negotiation',
      duration: 'Up to you',
      who: 'You and the seller',
      detail:
        'View the property carefully and agree not just the price but also the deadline for the notary, what stays in the property and when it will be vacated. Write everything down - it goes into the preliminary contract.',
      links: [{ href: '/proverka-na-imot', label: 'What to check at a viewing' }],
    },
    {
      id: 'kredit-kandidatstvane',
      financing: 'mortgage',
      title: 'Applying for a mortgage',
      duration: '1–3 weeks',
      who: 'You and the bank',
      detail:
        'The bank checks your income and credit history and tells you how much it can lend. Start as early as possible - that way you know your budget before you pay a deposit.',
      links: [{ href: '/kolko-moga-da-si-pozvolya', label: 'How much can you afford' }],
    },
    {
      id: 'stroitel',
      stage: 'new',
      title: 'Checking the builder and the project',
      duration: 'A few days',
      who: 'You or your lawyer',
      detail:
        'Check that the builder owns the land or holds a building right, that there is a building permit and an approved design, and that the land is not mortgaged. Look at buildings they have already finished.',
      links: [{ href: '/proverka-na-imot', label: 'New-build checklist' }],
    },
    {
      id: 'predvaritelen',
      title: 'Preliminary contract and deposit',
      duration: '1 day',
      who: 'You and the seller',
      detail:
        'You sign a written contract with the price, the deposit and the deadline for the notary. The deposit is agreed between the parties - often around 10%. If the buyer backs out, they lose the deposit; if the seller backs out, they pay it back double (Obligations and Contracts Act, Art. 93).',
    },
    {
      id: 'predvaritelen-kredit',
      financing: 'mortgage',
      title: 'Mortgage condition in the contract',
      duration: 'At signing',
      who: 'You',
      detail:
        'Write into the preliminary contract what happens to the deposit if the bank turns the loan down, and leave enough time before the notary. From handing in your documents at the bank to receiving the money usually takes 3–6 weeks.',
    },
    {
      id: 'etapi',
      stage: 'new',
      title: 'Payments in construction stages',
      duration: 'Until the building is finished',
      who: 'You and the builder',
      detail:
        'It is safer to tie payments to the official stages - for example part at Act 14 (shell complete) and the rest at Act 16. When exactly the notarial deed is signed depends on the contract with the builder - agree it in advance.',
    },
    {
      id: 'akt16',
      stage: 'new',
      title: 'Waiting for Act 16',
      duration: 'Months to a year',
      who: 'The builder and the Construction Control Directorate (DNSK)',
      detail:
        'After Act 15 a state commission inspects the building. In practice, Act 15 to Act 16 takes from a few months to a year. After the commission\'s protocol (Act 16), DNSK issues the occupancy permit within 5 working days. Without it, nobody can legally live in the property.',
    },
    {
      id: 'dokumenti',
      title: 'Documents and legal checks',
      duration: '3–7 working days',
      who: 'The seller, the notary or your lawyer',
      detail:
        'Certificate of encumbrances from the Registry Agency (3 or 7 working days), tax valuation certificate from Sofia Municipality (1, 3 or 5 days) and the cadastral scheme (3 or 7 working days). This can run alongside the bank\'s checks.',
      links: [{ href: '/proverka-na-imot', label: 'What to check' }],
    },
    {
      id: 'banka-ocenka',
      financing: 'mortgage',
      title: 'Valuation and final approval',
      duration: '1–2 weeks',
      who: 'The bank',
      detail:
        'The bank\'s valuer inspects the property (usually 3–7 working days), the bank\'s lawyers check the documents, and then the bank gives final approval. The bank lends up to 85% of its own valuation, which may be below the price.',
    },
    {
      id: 'notarius',
      title: 'Signing at the notary',
      duration: '1 day',
      who: 'You, the seller and the notary',
      detail:
        'You sign the notarial deed and the notary registers it in the property register. The local tax and the fees are paid before that - work them out in advance.',
      links: [{ href: '/kalkulator', label: 'Costs calculator' }],
    },
    {
      id: 'notarius-kredit',
      financing: 'mortgage',
      title: 'Mortgage and paying the seller',
      duration: '1–3 working days after signing',
      who: 'The bank and the notary',
      detail:
        'Together with the purchase, the mortgage in favour of the bank is signed. Once it is registered, the bank transfers the money to the seller.',
    },
    {
      id: 'klyuchove',
      title: 'Handing over the keys',
      duration: 'As agreed',
      who: 'You and the seller',
      detail:
        'Sign a handover protocol and write down the meter readings for electricity, water, heating and gas. You will need them to move the utility accounts into your name.',
    },
    {
      id: 'partidi',
      title: 'Utility accounts and the municipality',
      duration: 'Within 30 days',
      who: 'You',
      detail:
        'Move the electricity, water, heating and gas accounts into your name with a copy of the notarial deed. At Sofiyska Voda this is free within 30 days of the purchase. You do not file a declaration with the municipality - for a purchase, the notary sends the details automatically (Local Taxes and Fees Act, Art. 14(3)).',
    },
  ],
}

export function getPurchaseTimeline(locale: Locale): Content {
  return locale === 'en' ? en : bg
}

/** Steps that apply to this buyer, in order. */
export function timelineSteps(locale: Locale, financing: Financing, stage: BuildingStage): TimelineStep[] {
  return getPurchaseTimeline(locale).steps.filter(
    (s) => (!s.financing || s.financing === financing) && (!s.stage || s.stage === stage),
  )
}
