/**
 * Adds a new blog post: buying (and selling) a home when you are married -
 * the default marital property regime (СИО), what counts as personal property,
 * buying with money from parents, mortgages taken before the marriage, why
 * both spouses must sign when selling, the family home rule, and marriage
 * contracts / the separation regime.
 * Written by hand in Claude Code (the weekly market-post cron was removed on
 * 2026-11-02).
 *
 * Facts checked 2026-11-09. Primary source: the official text of the Family
 * Code (Семеен кодекс, consolidated to 30.12.2025, published by the Ministry of
 * Labour and Social Policy). Each point is also confirmed by at least one
 * independent legal commentary on trudipravo.bg (journal "Собственост и право").
 * Landed as a Sanity DRAFT so Presiyan can review before publishing.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/add-property-marriage-sio-post.mjs
 */

import { createClient } from '@sanity/client'
import crypto from 'crypto'

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) { console.error('❌  Missing SANITY_API_WRITE_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const slug = 'pokupka-na-imot-v-brak-sio'

const content = `"Имотът е на мое име, значи е мой" - това е едно от най-честите погрешни схващания, които чуваме от клиенти. Ако сте женени или омъжени, отговорът на въпроса "чий е имотът" често не зависи от това кой е записан в нотариалния акт, а от това кога и с какви пари е купен. Тук обясняваме простичко правилата от Семейния кодекс, които е добре да знаете, преди да купите или продадете жилище.

**Режимът по подразбиране: съпружеска имуществена общност**

Семейният кодекс познава три режима на имуществените отношения между съпрузите: законов режим на общност, законов режим на разделност и договорен режим (брачен договор). Ако при сключването на брака не сте избрали нищо, за Вас важи общността - така наречената СИО. В тази ситуация са повечето семейства в България.

При СИО имотите, купени по време на брака, принадлежат общо на двамата съпрузи, независимо на чие име са придобити. Законът предполага, че и двамата са допринесли за покупката. Приносът не е само пари - той може да бъде и труд, грижа за децата и работа в домакинството. Затова дори единият от съпрузите да е плащал всичко, другият по правило също е собственик.

Важен детайл: моментът, който има значение, е подписването на нотариалния акт, а не на предварителния договор. Ако сте подписали предварителен договор преди сватбата, но нотариалният акт е след нея, имотът по правило попада в общността.

**Какво остава лично Ваше**

Лично Ваше имущество, което не попада в общността, са:

- имотите, които сте притежавали преди брака;

- имотите, които сте получили по време на брака по наследство или като дарение;

- имотите, купени по време на брака изцяло с лични средства - например с пари от продажбата на апартамент, който сте имали преди брака.

Ако имотът е купен отчасти с лични средства, Ваша лична собственост е съответната част от него, освен ако тя е незначителна.

**Пари от родителите: как да ги защитите**

Много млади семейства купуват първото си жилище с помощта на родителите. Тук често възникват недоразумения. Съдебната практика приема, че пари, дадени от родители, не се смятат автоматично за дарение само за тяхното дете. Ако по-късно възникне спор, този от съпрузите, който твърди, че имотът (или част от него) е лично негов или неин, трябва да докаже произхода на парите. С тълкувателно решение от началото на 2025 г. Върховният касационен съд потвърди, че самото плащане от личната сметка на единия от съпрузите не е достатъчно - нужно е да се докаже откъде са дошли парите в тази сметка.

На практика това означава: ако родителите Ви дават пари за жилище и искате те да останат лично Ваши, направете писмен договор за дарение, в който ясно сте посочени като надарен или надарена, и пазете банковите документи, които показват пътя на парите до продавача. Ако родителите искат да подкрепят и двамата съпрузи, това също е добре да е записано ясно.

**Ипотека, изтеглена преди брака**

Ако сте купили имот преди брака с ипотечен кредит, той остава Ваша лична собственост, дори вноските да се плащат по време на брака. Участието на съпруга или съпругата Ви в изплащането на кредита не дава право на собственост върху имота. То може да даде право само на парично вземане за вложените средства, но не и на част от имота.

Обратно - ако имотът е купен по време на брака с кредит, той по правило е общ, дори кредитът да е само на името на единия от съпрузите и само той или тя да плаща вноските.

**Продажба: защо подписват и двамата съпрузи**

Докато трае бракът, общото имущество се продава съвместно от двамата съпрузи. Ако единият от тях продаде общ имот без участието на другия, сделката може да бъде оспорена от другия съпруг или съпруга в 6-месечен срок от узнаването, но не по-късно от три години от сделката.

Това е важно и за купувачите. Ако купувате имот от продавач, който е бил женен, или от продавачка, която е била омъжена, към момента на придобиването му, проверете дали на сделката ще присъстват и двамата съпрузи. В противен случай рискувате години след покупката сделката да бъде оспорена. Внимателната проверка на документите на продавача е част от работата, която вършим за всеки наш клиент.

Има и още едно правило, което малцина знаят: ако семейното жилище е лична собственост на единия от съпрузите и семейството няма друго жилище, то може да бъде продадено само със съгласието на другия. Ако такова съгласие липсва, е нужно разрешение от районния съд, който проверява дали продажбата не вреди на децата и семейството.

**При развод**

При прекратяване на общността дяловете на съпрузите са равни - по половина. Съдът може да определи по-голям дял на единия от съпрузите само в изрично предвидени случаи - например ако неговият или нейният принос значително надхвърля приноса на другия или ако при него или нея остават да живеят непълнолетните деца и това създава особени затруднения.

**Брачен договор и режим на разделност**

Ако искате имотите, които всеки от Вас купува, да бъдат само на този, който ги купува, можете да изберете законовия режим на разделност или да сключите брачен договор. И двете са възможни както при сключването на брака, така и по време на него.

Брачният договор се сключва лично от двамата, в писмена форма с нотариална заверка на съдържанието и на подписите. С него можете да уредите например правата върху имотите, придобити преди и по време на брака, и последиците при развод. Не може обаче да се уговори имот, който единият от съпрузите е притежавал преди брака, да стане общ.

Изборът на режим не е въпрос на недоверие. Той е особено полезен, когато единият от съпрузите има собствен бизнес, когато в покупката участват пари от родителите или когато някой от Вас вече има имот от предишна връзка.

**Практични съвети**

- Преди покупка си изяснете с какви пари купувате и запазете документите за произхода им - договори за дарение, банкови извлечения, документи за продажба на предишен имот.

- Ако родителите помагат, оформете помощта с писмен договор за дарение, а не само с банков превод.

- Ако продавачът е женен или продавачката е омъжена, проверете дали имотът е общ и дали и двамата съпрузи ще подпишат.

- Ако сте пред брак и единият от Вас вече има имот или бизнес, помислете за брачен договор отрано.

Тази статия е обща информация, а не правна консултация. Всеки случай има своите особености, затова при по-сложни ситуации - пари от различни източници, предишни бракове, имоти в чужбина - се консултирайте с адвокат.

В New Key Properties проверяваме документите на всеки имот и казваме на клиентите си честно какво сме открили, още преди да дадат капаро. Ако планирате покупка или продажба на имот в София, обадете се на 0879 826 292 за безплатна консултация.`

const contentEn = `"The property is in my name, so it's mine" - this is one of the most common misconceptions we hear from clients. If you are married, the answer to "whose property is it" often does not depend on whose name is on the notarial deed, but on when it was bought and with what money. Here we explain in plain terms the rules of the Bulgarian Family Code that are worth knowing before you buy or sell a home.

**The default regime: marital community of property**

The Family Code recognises three regimes for property relations between spouses: the statutory community regime, the statutory separation regime, and a contractual regime (a marriage contract). If you did not choose anything when you got married, community of property applies to you - known in Bulgarian as СИО. Most families in Bulgaria are in this situation.

Under community of property, homes bought during the marriage belong jointly to both spouses, regardless of whose name they were acquired in. The law presumes that both contributed to the purchase. Contribution is not only money - it can also be work, childcare and housework. So even if one spouse paid for everything, the other is, as a rule, also an owner.

An important detail: the moment that counts is the signing of the notarial deed, not the preliminary contract. If you signed a preliminary contract before the wedding but the notarial deed came after it, the property as a rule falls into the community.

**What stays yours personally**

Your personal property, which does not fall into the community, includes:

- property you owned before the marriage;

- property you received during the marriage by inheritance or as a gift;

- property bought during the marriage entirely with personal funds - for example with money from selling an apartment you owned before the marriage.

If the property was bought partly with personal funds, the corresponding part of it is your personal property, unless that part is insignificant.

**Money from parents: how to protect it**

Many young families buy their first home with help from their parents. This is where misunderstandings often arise. Court practice holds that money given by parents is not automatically considered a gift to their own child alone. If a dispute arises later, the spouse who claims that the property (or part of it) is personally theirs has to prove where the money came from. In an interpretative decision from early 2025, the Supreme Court of Cassation confirmed that payment from one spouse's personal account is not enough on its own - it must be shown where the money in that account came from.

In practice this means: if your parents give you money for a home and you want it to remain yours personally, sign a written gift agreement that clearly names you as the recipient, and keep the bank documents that show the path of the money to the seller. If the parents want to support both spouses, it is also good to state that clearly.

**A mortgage taken out before the marriage**

If you bought a property before the marriage with a mortgage, it remains your personal property, even if the instalments are paid during the marriage. The fact that your spouse helped repay the loan does not make them a co-owner. It may only give them a monetary claim for the funds they contributed, not a share of the property.

Conversely - if the property was bought during the marriage with a loan, it is as a rule joint, even if the loan is in only one spouse's name and only that spouse pays the instalments.

**Selling: why both spouses sign**

While the marriage lasts, joint property is sold by both spouses together. If one spouse sells a joint property without the other, the sale can be challenged by the other spouse within 6 months of learning about it, but no later than three years after the sale.

This matters for buyers too. If you are buying from a seller who was married when they acquired the property, check that both spouses will be present at the transaction. Otherwise you risk the sale being challenged years after your purchase. Careful checking of the seller's documents is part of the work we do for every client.

There is one more rule few people know: if the family home is the personal property of one spouse and the family has no other home, it can only be sold with the other spouse's consent. Without that consent, permission from the district court is required, and the court checks that the sale does not harm the children and the family.

**In a divorce**

When the community ends, the spouses' shares are equal - half each. The court can award a larger share to one spouse only in specifically defined cases - for example if their contribution significantly exceeds the other's, or if the underage children stay with them and this creates particular difficulties.

**Marriage contract and the separation regime**

If you want the property each of you buys to be only theirs, you can choose the statutory separation regime or sign a marriage contract. Both are possible either when you marry or during the marriage.

A marriage contract is signed personally by both spouses, in writing, with notarial certification of both its content and the signatures. In it you can settle, for example, the rights to property acquired before and during the marriage and the consequences of a divorce. However, you cannot agree that property one spouse owned before the marriage becomes joint.

Choosing a regime is not a matter of distrust. It is especially useful when one spouse has their own business, when parents' money is involved in a purchase, or when one of you already owns property from a previous relationship.

**Practical tips**

- Before buying, be clear about what money you are buying with and keep documents proving where it came from - gift agreements, bank statements, documents from selling a previous property.

- If your parents are helping, formalise their help with a written gift agreement, not just a bank transfer.

- If you are buying from a married seller, check whether the property is joint and whether both spouses will sign.

- If you are about to marry and one of you already owns property or a business, consider a marriage contract early.

This article is general information, not legal advice. Every case has its own specifics, so in more complex situations - money from different sources, previous marriages, property abroad - consult a lawyer.

At New Key Properties we check the documents of every property and tell our clients honestly what we have found, before they pay a deposit. If you are planning to buy or sell a property in Sofia, call 0879 826 292 for a free consultation.`

const researchNotes = `Проверено на 2026-11-09. Основен източник: официалният текст на Семейния кодекс (актуализиран към 30.12.2025, публикуван от МТСП: mlsp.government.bg/uploads/35/sv/sv-1/semeen-kodeks-30122025.pdf). Всяка точка е потвърдена и от поне една независима правна статия в trudipravo.bg (сп. "Собственост и право"):

- Трите режима, общността по подразбиране, промяна по време на брака: чл. 18 СК; trudipravo.bg ("Действие на режима на имуществените отношения...")

- СИО независимо на чие име, предполагаем принос, видове принос: чл. 21, ал. 1-3 СК; trudipravo.bg ("Кога придобитото чрез кредит жилище е СИО")

- Меродавен е нотариалният акт, не предварителният договор: trudipravo.bg ("Кога придобитото чрез кредит жилище е СИО", ППВС № 5/1972); следва и от общите правила (чл. 18 ЗЗД)

- Лично имущество - преди брака, наследство, дарение: чл. 22, ал. 1 СК; trudipravo.bg (няколко статии)

- Изцяло/отчасти с лични средства: чл. 23 СК; trudipravo.bg ("Преобразуване на лично имущество...")

- Пари от родители не се предполагат за дарение само на детето; тежест на доказване: trudipravo.bg ("Кога придобитото чрез кредит жилище е СИО", Реш. № 222/2011 I г.о.); ТР № 2/2022 ОСГК на ВКС от 20.01.2025 - trudipravo.bg ("Трансформация на лично имущество... със средства от влог на съпруг", сп. "Собственост и право" 2025, кн. 3)

- Имот, купен преди брака с кредит, остава личен; само парично вземане: trudipravo.bg ("Кога придобитото чрез кредит жилище е СИО", Реш. № 512/2010, № 44/2009 III г.о.); следва от чл. 22, ал. 1 СК

- Имот, купен по време на брака с кредит само на единия, е общ: trudipravo.bg (същата статия, Реш. № 127/2006 I г.о.); чл. 21 СК

- Разпореждане съвместно; оспорване в 6 месеца от узнаването, най-късно 3 години: чл. 24, ал. 3-4 СК; trudipravo.bg ("Промени в имуществените отношения между съпрузите")

- Семейно жилище - лична собственост, съгласие / разрешение от районния съдия: чл. 26 СК (и чл. 34 при разделност); trudipravo.bg ("Разпореждане със семейното жилище - собственост на единия от съпрузите")

- Равни дялове; по-голям дял при деца / значително по-голям принос: чл. 28, чл. 29 СК

- Брачен договор - лично, писмено, нотариална заверка на съдържание и подписи; може и по време на брака; предбрачно имущество не може да стане СИО: чл. 37-39 СК; trudipravo.bg ("Относно формата за действителност на брачния договор")

Умишлено НЕ са включени: регистърът по чл. 19 СК (не можахме да потвърдим как работи на практика за справки), конкретни нотариални такси за брачен договор, декларации в нотариалния акт за "лични средства" (източниците сочат, че са само доказателство, а не гаранция - твърде нюансирано за общ текст), съсобственост при фактическо съжителство (не е проверено).`

const draftId = `drafts.${crypto.randomUUID().replace(/-/g, '').slice(0, 24)}`

const doc = {
  _id: draftId,
  _type: 'blogPost',
  title: 'Купуване на имот в брак: чий е имотът и какво трябва да знаете',
  titleEn: 'Buying property while married: who owns it and what you need to know',
  slug: { _type: 'slug', current: slug },
  excerpt: 'Имотът е на Ваше име, но дали е само Ваш? Обясняваме простичко кога жилището е общо със съпруга или съпругата Ви, кога остава лично, как да защитите парите от родителите и защо при продажба подписват и двамата.',
  excerptEn: 'The property is in your name, but is it only yours? We explain in plain terms when a home is joint with your spouse, when it stays personal, how to protect money from your parents, and why both spouses sign when selling.',
  content,
  contentEn,
  date: '2026-11-09',
  category: 'Правни съвети',
  externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Sofia_-_panoramio_-_zonemars_%2814%29.jpg',
  researchNotes,
}

const existing = await client.fetch(
  `*[_type=="blogPost" && slug.current==$slug][0]{_id}`,
  { slug },
)
if (existing) {
  console.error('❌  A post with this slug already exists:', existing._id)
  process.exit(1)
}

const created = await client.create(doc)
console.log('✅  Created blog post DRAFT:', created._id, created.slug.current)
