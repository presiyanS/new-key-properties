// Content for the /proverka-na-imot "before you buy" checklist.
// Every item id must stay stable: visitors' ticked boxes are saved in their
// browser under these ids, so renaming one un-ticks it for everyone.
// Keep the wording general and practical - this is guidance, not legal advice
// (the page tells people to have a lawyer check the specific deal).

import type { Locale } from './i18n/config'

export type ChecklistItem = { id: string; title: string; detail: string }
export type ChecklistSection = { id: string; title: string; intro: string; items: ChecklistItem[] }

type Content = { sections: ChecklistSection[]; redFlagsTitle: string; redFlagsIntro: string; redFlags: string[] }

const bg: Content = {
  sections: [
    {
      id: 'dokumenti',
      title: 'Документи, които да поискате от продавача',
      intro: 'Поискайте копия още преди да дадете капаро. Честен продавач няма причина да ги крие.',
      items: [
        {
          id: 'notarialen-akt',
          title: 'Документ за собственост',
          detail: 'Обикновено нотариален акт. Ако имотът е наследен, дарен или придобит по друг начин, поискайте и съответния документ (удостоверение за наследници, договор за дарение и т.н.).',
        },
        {
          id: 'shema',
          title: 'Схема или скица от кадастъра',
          detail: 'Издава се от Агенцията по геодезия, картография и кадастър (АГКК). За апартамент е схема, за къща или земя - скица. Сравнете площта и разпределението с това, което виждате на място.',
        },
        {
          id: 'danachna-otsenka',
          title: 'Удостоверение за данъчна оценка',
          detail: 'Издава се от общината и е нужно за сделката при нотариуса. Ако данъчната оценка е по-висока от цената, местният данък и таксите се смятат върху нея.',
        },
        {
          id: 'akt-16',
          title: 'Документ за въвеждане в експлоатация',
          detail: 'За по-нови сгради - разрешение за ползване или удостоверение за въвеждане в експлоатация. Без него в имота не може законно да се живее.',
        },
        {
          id: 'lichni-danni',
          title: 'Данни за всички собственици',
          detail: 'Разберете кой точно е собственик. Ако имотът е купен по време на брак, обикновено и двамата съпрузи трябва да подпишат. Ако е наследен, трябва да подпишат всички наследници.',
        },
      ],
    },
    {
      id: 'pravna-proverka',
      title: 'Правна проверка на имота',
      intro: 'Тази проверка струва малко, а може да Ви предпази от загубата на целия имот. Ако не сте сигурни как да я направите, възложете я на адвокат.',
      items: [
        {
          id: 'tezhesti',
          title: 'Удостоверение за тежести',
          detail: 'Издава се от Агенцията по вписванията. Показва дали върху имота има вписани ипотеки, възбрани или искови молби (дела). Поискайте актуално удостоверение точно преди сделката, а не такова отпреди седмици.',
        },
        {
          id: 'istoria',
          title: 'История на собствеността',
          detail: 'Проверете кога и как продавачът е придобил имота. Ако имотът често сменя собствениците си или е купен преди броени седмици, задайте допълнителни въпроси.',
        },
        {
          id: 'palnomoshtno',
          title: 'Проверка на пълномощно',
          detail: 'Ако продавачът не идва лично, а изпраща пълномощник, помолете нотариуса да провери пълномощното в регистъра на Нотариалната камара - дали е истинско и дали не е оттеглено. Фалшивите пълномощни са известна схема за имотни измами.',
        },
        {
          id: 'zadalzhenia',
          title: 'Неплатени данъци и сметки',
          detail: 'Нотариусът проверява по електронен път дали продавачът има публични задължения (например данъци). За сметките за ток, вода, парно и таксите към входа поискайте от продавача доказателство, че са платени.',
        },
        {
          id: 'naemateli',
          title: 'Кой живее в имота',
          detail: 'Ако имотът е отдаден под наем, разберете до кога е договорът и кога наемателите ще напуснат. Договор за наем, вписан в имотния регистър, остава в сила и за новия собственик. Запишете срока за освобождаване в предварителния договор.',
        },
      ],
    },
    {
      id: 'ogled',
      title: 'Оглед на място',
      intro: 'Снимките показват най-хубавото. Огледът трябва да покаже всичко останало.',
      items: [
        {
          id: 'saotvetstvie',
          title: 'Съвпада ли имотът с документите',
          detail: 'Затворени тераси, премахнати стени или пристроени помещения, които ги няма в схемата, може да са направени без разрешение. Поискайте документи за всяка такава промяна.',
        },
        {
          id: 'instalatsii',
          title: 'Състояние на инсталациите',
          detail: 'Проверете ел. таблото, тръбите, следи от влага и мухъл по ъглите и под мивките, дограмата и отоплението. Голям ремонт може да струва хиляди евро.',
        },
        {
          id: 'sgrada',
          title: 'Сградата и общите части',
          detail: 'Огледайте входа, асансьора, покрива и фасадата. Попитайте за месечната такса за поддръжка и дали предстоят големи ремонти, за които ще трябва да платите и Вие.',
        },
        {
          id: 'razlichno-vreme',
          title: 'Оглед в различно време',
          detail: 'Елате поне два пъти - в делничен ден и вечер. Шум от улица, заведение или съседи често не се чува в неделя следобед.',
        },
        {
          id: 'kvartal',
          title: 'Кварталът наоколо',
          detail: 'Разходете се пеша и вижте транспорта, паркирането, училищата и магазините. Проверете дали наблизо не се строи нещо, което ще закрие гледката или ще вдига шум години наред.',
        },
      ],
    },
    {
      id: 'novo-stroitelstvo',
      title: 'Ако купувате ново строителство',
      intro: 'Пропуснете тази част, ако сградата е завършена и има Акт 16.',
      items: [
        {
          id: 'pravo-na-stroezh',
          title: 'Права на строителя върху земята',
          detail: 'Проверете дали строителят е собственик на земята или има учредено право на строеж, и дали земята не е ипотекирана в полза на банка.',
        },
        {
          id: 'razreshenie',
          title: 'Разрешение за строеж',
          detail: 'Поискайте разрешението и одобрения проект. Сравнете ги с това, което Ви продават - етаж, площ, разпределение.',
        },
        {
          id: 'etapi',
          title: 'Етап на строежа',
          detail: 'Акт 14 означава завършен груб строеж, Акт 15 - завършена сграда, а Акт 16 установява, че сградата е годна за ползване. Колкото по-ранен е етапът, толкова по-голям е рискът.',
        },
        {
          id: 'plashtania',
          title: 'Плащания, обвързани с етапите',
          detail: 'По-сигурно е вноските да са обвързани с актовете - например част при Акт 14 и остатъкът при Акт 16. Внимавайте, ако се иска почти цялата сума много рано.',
        },
        {
          id: 'stroitel',
          title: 'Репутацията на строителя',
          detail: 'Разгледайте сгради, които вече е завършил, и ако е възможно, поговорете с хора, които живеят там. Закъсненията и качеството се виждат най-добре на място.',
        },
      ],
    },
    {
      id: 'predi-podpis',
      title: 'Преди да подпишете',
      intro: 'Предварителният договор е това, което Ви защитава. Не го подписвайте набързо.',
      items: [
        {
          id: 'predvaritelen-dogovor',
          title: 'Писмен предварителен договор',
          detail: 'Устната уговорка не Ви защитава. В договора трябва да са цената, капарото, срокът до нотариуса и какво се случва, ако някоя страна се откаже.',
        },
        {
          id: 'kredit',
          title: 'Условие за кредита',
          detail: 'Ако купувате с ипотечен кредит, договорете какво става с капарото, ако банката откаже. Иначе рискувате да го загубите.',
        },
        {
          id: 'realna-tsena',
          title: 'Реалната цена в нотариалния акт',
          detail: 'Ако Ви предложат в акта да се впише по-ниска цена от реално платената, откажете. Това е невярно деклариране, за което се носи наказателна отговорност, а ако сделката се развали, ще Ви е трудно да докажете, че сте платили повече.',
        },
        {
          id: 'razhodi',
          title: 'Сметка на всички разходи',
          detail: 'Освен цената ще платите местен данък, нотариални и регистрационни такси. Пресметнете ги предварително с нашия калкулатор.',
        },
        {
          id: 'advokat',
          title: 'Независим адвокат',
          detail: 'Наемете адвокат, който работи само за Вас, а не за продавача. Хонорарът е малък на фона на цената на имота.',
        },
      ],
    },
  ],
  redFlagsTitle: 'Тревожни сигнали',
  redFlagsIntro: 'Нито един от тях не означава задължително измама, но всеки е причина да спрете и да проверите внимателно.',
  redFlags: [
    'Продавачът отказва да покаже документите преди капарото.',
    'Иска се капаро в брой, без писмен договор.',
    'Цената е много по-ниска от тази на подобни имоти в района.',
    'Продавачът винаги изпраща пълномощник и избягва лична среща.',
    'Имотът е купен от продавача съвсем наскоро.',
    'Предлага Ви се по-ниска цена в нотариалния акт.',
    'Притискат Ви да решите „днес“, без време за проверка.',
  ],
}

const en: Content = {
  sections: [
    {
      id: 'dokumenti',
      title: 'Documents to ask the seller for',
      intro: 'Ask for copies before you pay any deposit. An honest seller has no reason to hide them.',
      items: [
        {
          id: 'notarialen-akt',
          title: 'Proof of ownership',
          detail: 'Usually a notarial deed. If the property was inherited, gifted or acquired another way, also ask for that document (certificate of heirs, deed of gift, etc.).',
        },
        {
          id: 'shema',
          title: 'Cadastral scheme or sketch',
          detail: 'Issued by the Geodesy, Cartography and Cadastre Agency (AGKK). For an apartment it is a "scheme", for a house or land a "sketch". Compare the area and layout with what you see on site.',
        },
        {
          id: 'danachna-otsenka',
          title: 'Tax valuation certificate',
          detail: 'Issued by the municipality and needed for the deal at the notary. If the tax valuation is higher than the price, the local tax and the fees are calculated on it.',
        },
        {
          id: 'akt-16',
          title: 'Proof the building is complete',
          detail: 'For newer buildings - a permit for use or a certificate of commissioning. Without it, nobody can legally live in the property.',
        },
        {
          id: 'lichni-danni',
          title: 'Details of every owner',
          detail: 'Find out exactly who owns the property. If it was bought during a marriage, both spouses usually have to sign. If it was inherited, all heirs have to sign.',
        },
      ],
    },
    {
      id: 'pravna-proverka',
      title: 'Legal check of the property',
      intro: 'This check costs little and can protect you from losing the whole property. If you are not sure how to do it, ask a lawyer to do it.',
      items: [
        {
          id: 'tezhesti',
          title: 'Certificate of encumbrances',
          detail: 'Issued by the Registry Agency. It shows whether any mortgages, attachment orders or lawsuits are registered against the property. Get a fresh certificate right before the deal, not one from weeks earlier.',
        },
        {
          id: 'istoria',
          title: 'Ownership history',
          detail: 'Check when and how the seller acquired the property. If it changes owners often, or was bought only weeks ago, ask more questions.',
        },
        {
          id: 'palnomoshtno',
          title: 'Check any power of attorney',
          detail: 'If the seller sends a representative instead of coming in person, ask the notary to check the power of attorney in the Notary Chamber register - that it is genuine and has not been revoked. Fake powers of attorney are a known property fraud scheme.',
        },
        {
          id: 'zadalzhenia',
          title: 'Unpaid taxes and bills',
          detail: 'The notary checks electronically whether the seller owes public debts (such as taxes). For electricity, water, heating and building fees, ask the seller for proof they are paid.',
        },
        {
          id: 'naemateli',
          title: 'Who lives there',
          detail: 'If the property is rented out, find out when the lease ends and when the tenants will leave. A lease registered in the property register stays in force for the new owner. Write the move-out date into the preliminary contract.',
        },
      ],
    },
    {
      id: 'ogled',
      title: 'Viewing on site',
      intro: 'Photos show the best side. The viewing should show you everything else.',
      items: [
        {
          id: 'saotvetstvie',
          title: 'Does it match the documents',
          detail: 'Enclosed balconies, removed walls or added rooms that are not in the scheme may have been done without a permit. Ask for documents for every such change.',
        },
        {
          id: 'instalatsii',
          title: 'Condition of the installations',
          detail: 'Check the fuse box, the pipes, signs of damp and mould in corners and under sinks, the windows and the heating. A major renovation can cost thousands of euros.',
        },
        {
          id: 'sgrada',
          title: 'The building and common areas',
          detail: 'Look at the entrance, the lift, the roof and the facade. Ask about the monthly maintenance fee and whether major repairs are coming that you will have to pay towards.',
        },
        {
          id: 'razlichno-vreme',
          title: 'Visit at different times',
          detail: 'Come at least twice - on a weekday and in the evening. Noise from a street, a bar or neighbours often is not heard on a Sunday afternoon.',
        },
        {
          id: 'kvartal',
          title: 'The surrounding area',
          detail: 'Walk around and look at transport, parking, schools and shops. Check whether anything is being built nearby that will block the view or make noise for years.',
        },
      ],
    },
    {
      id: 'novo-stroitelstvo',
      title: 'If you are buying a new build',
      intro: 'Skip this part if the building is finished and has Act 16.',
      items: [
        {
          id: 'pravo-na-stroezh',
          title: "The developer's rights to the land",
          detail: 'Check that the developer owns the land or holds a building right on it, and that the land is not mortgaged to a bank.',
        },
        {
          id: 'razreshenie',
          title: 'Building permit',
          detail: 'Ask for the permit and the approved design. Compare them with what you are being sold - floor, area, layout.',
        },
        {
          id: 'etapi',
          title: 'Construction stage',
          detail: 'Act 14 means the rough structure is done, Act 15 that the building is finished, and Act 16 confirms it is fit for use. The earlier the stage, the bigger the risk.',
        },
        {
          id: 'plashtania',
          title: 'Payments tied to the stages',
          detail: 'It is safer when instalments are tied to the acts - for example part at Act 14 and the rest at Act 16. Be careful if almost the full amount is asked for very early.',
        },
        {
          id: 'stroitel',
          title: "The developer's track record",
          detail: 'Look at buildings they have finished and, if you can, talk to people who live there. Delays and build quality are easiest to judge on site.',
        },
      ],
    },
    {
      id: 'predi-podpis',
      title: 'Before you sign',
      intro: 'The preliminary contract is what protects you. Do not sign it in a hurry.',
      items: [
        {
          id: 'predvaritelen-dogovor',
          title: 'A written preliminary contract',
          detail: 'A verbal agreement does not protect you. The contract should state the price, the deposit, the deadline for the notary and what happens if either side backs out.',
        },
        {
          id: 'kredit',
          title: 'A mortgage condition',
          detail: 'If you are buying with a mortgage, agree what happens to the deposit if the bank says no. Otherwise you risk losing it.',
        },
        {
          id: 'realna-tsena',
          title: 'The real price in the deed',
          detail: 'If someone suggests writing a lower price in the deed than you actually pay, refuse. It is a false declaration that carries criminal liability, and if the deal falls apart it will be hard to prove you paid more.',
        },
        {
          id: 'razhodi',
          title: 'A full list of costs',
          detail: 'On top of the price you will pay local tax, notary and registration fees. Work them out in advance with our calculator.',
        },
        {
          id: 'advokat',
          title: 'An independent lawyer',
          detail: 'Hire a lawyer who works only for you, not for the seller. The fee is small compared with the price of the property.',
        },
      ],
    },
  ],
  redFlagsTitle: 'Warning signs',
  redFlagsIntro: 'None of these always means fraud, but each one is a reason to stop and check carefully.',
  redFlags: [
    'The seller refuses to show documents before the deposit.',
    'A cash deposit is asked for without a written contract.',
    'The price is much lower than similar properties in the area.',
    'The seller always sends a representative and avoids meeting in person.',
    'The seller bought the property only very recently.',
    'You are offered a lower price in the notarial deed.',
    'You are pressed to decide "today", with no time to check.',
  ],
}

export function getBuyerChecklist(locale: Locale): Content {
  return locale === 'en' ? en : bg
}
