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
        'Огледайте имота внимателно и договорете не само цената, но и срока до нотариуса, какво остава в имота и кога ще бъде освободен. Запишете всичко договорено - то влиза в предварителния договор.',
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
        'Подписвате писмен договор с цената, капарото и срока до нотариуса. Размерът на капарото е по договорка - законът не определя процент. Ако купувачът не изпълни договора, продавачът може да задържи капарото; ако продавачът не го изпълни, купувачът може да поиска капарото в двоен размер (чл. 93 ЗЗД).',
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
        'По-сигурно е вноските да са обвързани с етапите на строежа - например част при Акт 14 (завършен груб строеж) и остатъкът след въвеждането на сградата в експлоатация. Кога точно се подписва нотариалният акт зависи от договора със строителя - уточнете го предварително.',
    },
    {
      id: 'akt16',
      stage: 'new',
      title: 'Въвеждане на сградата в експлоатация',
      duration: 'Зависи от сградата',
      who: 'Строителят, ДНСК или общината',
      detail:
        'При по-големите сгради държавна комисия съставя Акт 16, след което ДНСК издава разрешение за ползване до 5 работни дни. На практика от Акт 15 до Акт 16 минават от няколко месеца до година. При по-малките жилищни сгради Акт 16 няма - общината издава удостоверение за въвеждане в експлоатация. Без един от двата документа в имота не може законно да се живее.',
    },
    {
      id: 'dokumenti',
      title: 'Документи и правна проверка',
      duration: '3–7 работни дни',
      who: 'Продавачът, нотариусът или Ваш адвокат',
      detail:
        'Удостоверение за тежести от Агенцията по вписванията (3 или 7 работни дни), удостоверение за данъчна оценка от Столична община (1, 3 или 5 дни) и схема от кадастъра (3 или 7 работни дни).',
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
        'Подписвате нотариалния акт, след което той се вписва в имотния регистър. Местният данък се плаща преди или при сделката и нотариусът проверява, че е платен. Пресметнете данъка и таксите предварително.',
      links: [{ href: '/kalkulator', label: 'Калкулатор на разходите' }],
    },
    {
      id: 'notarius-kredit',
      financing: 'mortgage',
      title: 'Ипотека и изплащане на продавача',
      duration: 'Обикновено 1–3 работни дни',
      who: 'Банката и нотариусът',
      detail:
        'Заедно с покупката се учредява и ипотека в полза на банката. След като сделката и ипотеката бъдат вписани, банката превежда парите на продавача.',
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
      title: 'Смяна на партидите',
      duration: 'До 30 дни',
      who: 'Вие',
      detail:
        'Прехвърлете партидите за ток, вода, парно и газ на Ваше име. Ще Ви трябват нотариалният акт, личната карта и показанията на уредите. При Софийска вода смяната е безплатна в срок до 30 дни. В общината не подавате декларация - при покупка данните стигат до нея служебно (ЗМДТ, чл. 14, ал. 3).',
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
        'You sign a written contract with the price, the deposit and the deadline for the notary. The amount of the deposit is agreed between the parties - the law sets no percentage. If the buyer fails to go through with the deal, the seller may keep the deposit; if the seller fails, the buyer may claim double the deposit back (Obligations and Contracts Act, Art. 93).',
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
        'It is safer to tie payments to the construction stages - for example part at Act 14 (shell complete) and the rest once the building is officially approved for use. When exactly the notarial deed is signed depends on the contract with the builder - agree it in advance.',
    },
    {
      id: 'akt16',
      stage: 'new',
      title: 'Approval of the building for use',
      duration: 'Depends on the building',
      who: 'The builder, the Construction Control Directorate (DNSK) or the municipality',
      detail:
        'For larger buildings a state commission draws up Act 16, after which DNSK issues an occupancy permit within 5 working days. In practice, Act 15 to Act 16 takes from a few months to a year. Smaller residential buildings have no Act 16 - the municipality issues a certificate of commissioning instead. Without one of these two documents, nobody can legally live in the property.',
    },
    {
      id: 'dokumenti',
      title: 'Documents and legal checks',
      duration: '3–7 working days',
      who: 'The seller, the notary or your lawyer',
      detail:
        'Certificate of encumbrances from the Registry Agency (3 or 7 working days), tax valuation certificate from Sofia Municipality (1, 3 or 5 days) and the cadastral scheme (3 or 7 working days).',
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
        'You sign the notarial deed, which is then entered in the property register. The local tax is paid before or at the signing, and the notary checks that it has been paid. Work out the tax and fees in advance.',
      links: [{ href: '/kalkulator', label: 'Costs calculator' }],
    },
    {
      id: 'notarius-kredit',
      financing: 'mortgage',
      title: 'Mortgage and paying the seller',
      duration: 'Usually 1–3 working days',
      who: 'The bank and the notary',
      detail:
        'Together with the purchase, a mortgage is set up in favour of the bank. Once the deed and the mortgage are registered, the bank transfers the money to the seller.',
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
      title: 'Moving the utility accounts',
      duration: 'Within 30 days',
      who: 'You',
      detail:
        'Move the electricity, water, heating and gas accounts into your name. You will need the notarial deed, your ID and the meter readings. At Sofiyska Voda the change is free within 30 days. You do not file a declaration with the municipality - for a purchase, it receives the details automatically (Local Taxes and Fees Act, Art. 14(3)).',
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
