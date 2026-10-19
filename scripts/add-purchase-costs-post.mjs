/**
 * Adds a new blog post: the buyer's transaction costs when buying a property
 * in Sofia (local acquisition tax, notary fee, registration fee). Chosen
 * because 8 existing posts mention these costs in passing, with differing
 * totals (3-4%, 3-6%, ~8%), but none explains how each one is calculated.
 *
 * Written by hand in Claude Code (not via the market-post cron / Anthropic
 * API). Facts checked 2026-10-19 against primary texts: ЗМДТ чл. 45-50
 * (kik-info.com, current to ДВ бр. 55/2026), Столичен общински съвет
 * Решение № 51/30.12.2019 and № 1036/18.12.2025 (council.sofia.bg), Тарифа за
 * нотариалните такси (notary-chamber.bg) and Тарифа за държавните такси,
 * събирани от АВ, чл. 2 (registryagency.bg).
 * Landed as a Sanity DRAFT; proofread separately before publishing.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/add-purchase-costs-post.mjs
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

const slug = 'razhodi-pri-pokupka-na-imot-v-sofia-danatsi-i-taksi'

const content = `Когато планирате бюджета си за покупка на имот, цената в обявата е само част от сметката. При нотариуса купувачът обикновено плаща още местен данък, нотариална такса и такса за вписване. В различни статии ще срещнете различни общи проценти - 3%, 6%, дори 8% - и често не става ясно какво точно включват. В тази статия разглеждаме всеки от тези разходи поотделно: колко е, как се изчислява и на какво основание. Накрая ще намерите и конкретен пример в евро.

**Кой плаща разходите по сделката**

Според чл. 45 от Закона за местните данъци и такси (ЗМДТ) местният данък се плаща от купувача, освен ако страните не са уговорили друго. На практика купувачът обикновено поема и нотариалната такса, и таксата за вписване, но и това подлежи на договаряне. Затова е добре да запишете в предварителния договор кой какви разходи поема, за да няма изненади в деня на сделката.

**1. Местен данък при придобиване - 3% в София**

Това е най-големият разход. Законът позволява на всяка община да определи данъка между 0,1% и 3% от стойността на имота. Столичният общински съвет е определил максималния размер от 3%, който се прилага от 1 януари 2020 г. Дотогава ставката беше 2,5%. Някои сайтове и калкулатори все още посочват старата ставка - не разчитайте на тях, ако купувате в София.

Важно е да знаете върху каква сума се изчислява данъкът. Според чл. 46 от ЗМДТ основата е уговорената цена, но ако тя е по-ниска от данъчната оценка на имота, данъкът се изчислява върху данъчната оценка. При повечето жилища в София пазарната цена е по-висока от данъчната оценка, затова данъкът обикновено се изчислява върху цената по сделката.

Данъкът се плаща при прехвърлянето на имота. Нотариусът не може да изповяда сделката, докато не се увери, че данъкът е платен (чл. 49 и чл. 50 от ЗМДТ).

**2. Нотариална такса**

Нотариалната такса се определя по Тарифата за нотариалните такси и зависи от стойността на сделката. Таксата е стъпаловидна - процентът намалява с увеличаването на сумата. След въвеждането на еврото сумите в тарифата се преизчисляват по фиксирания курс. За имоти на стойност между около 51 000 и 256 000 евро, в който диапазон попадат повечето апартаменти в София, таксата е 373,50 евро плюс 0,2% от сумата над 51 129,19 евро. Максималната нотариална такса е 3 067,75 евро.

Ако нотариусът е регистриран по ДДС, към таксата се начислява 20% ДДС. Тарифата предвижда и надбавки - например 25% при изповядване на сделката извън кантората в работно време и 50% извън кантората в неработно време. Попитайте нотариуса предварително за точната сума, за да я включите в бюджета си.

**3. Такса за вписване в Имотния регистър**

След подписването нотариалният акт се вписва в Имотния регистър към Агенцията по вписванията. Според чл. 2 от Тарифата за държавните такси, събирани от агенцията, таксата е 0,1% от цената, по която е таксуван нотариалният акт, но не по-малко от 5,11 евро. Обикновено таксата се плаща чрез нотариуса в деня на сделката.

**Пример: апартамент за 180 000 евро в София**

Да предположим, че купувате апартамент за 180 000 евро и цената е по-висока от данъчната му оценка:

- **Местен данък (3%):** 5 400 евро
- **Нотариална такса:** 631,24 евро (757,49 евро с ДДС, ако нотариусът е регистриран по ДДС)
- **Такса за вписване (0,1%):** 180 евро

Общо: около 6 210-6 340 евро, или около 3,5% от цената на имота. Това са разходите, определени от закона. Всички останали разходи зависят от конкретната сделка.

**Какво не влиза в тази сметка**

- **Комисиона на посредника.** Тя не е определена от закон, а се договаря с агенцията. Поискайте размера ѝ писмено, преди да започнете огледите.
- **Разходи по ипотечен кредит.** Ако купувате с кредит, добавете таксите на банката, оценката на имота и разходите за учредяване и вписване на ипотеката. Поискайте пълна разбивка от банката, преди да подпишете.
- **Документи за проверка на имота.** Удостоверение за тежести, скица и удостоверение за данъчна оценка - всяко струва сравнително малко, но е добре да ги предвидите.
- **Данък сгради и такса битови отпадъци.** След покупката тези годишни задължения се дължат от купувача от началото на месеца след сделката, освен ако продавачът вече ги е платил.

Затова когато видите обща цифра от 6% или 8%, тя почти винаги включва и комисиона, и разходи по кредита. Законовите разходи в София са около 3,5% от цената на имота.

**Защо не си струва да посочите по-ниска цена в нотариалния акт**

Понякога купувачи получават предложение в нотариалния акт да се посочи по-ниска цена от реално платената, за да се плати по-малко данък. Освен че това е незаконно, то носи и реални рискове за Вас. Ако по-късно възникне спор с продавача, ще можете да докажете само цената, записана в документите. А ако след години продадете имота, по-ниската цена на придобиване означава по-голяма облагаема печалба и по-висок данък върху дохода. Спестените няколкостотин евро днес могат да Ви струват много повече по-късно.

**Заключение**

Ако купувате имот в София, предвидете за данъци и такси около 3,5% от цената, а отделно - комисиона и разходите по кредита, ако имате такъв. Поискайте точна сметка от нотариуса и запишете в предварителния договор кой какви разходи поема. Ако искате да изчислим заедно с Вас всички разходи за конкретен имот, преди да вземете решение, свържете се с нас на 0879 826 292. Работим с ограничен брой клиенти на месец, за да отделим на всеки нужното внимание.`

const contentEn = `When you plan your budget for buying a property, the listed price is only part of the bill. At the notary, the buyer usually also pays a local tax, a notary fee and a registration fee. Different articles quote different overall percentages - 3%, 6%, even 8% - and it's often unclear what they include. In this article we look at each of these costs separately: how much it is, how it's calculated and what the legal basis is. At the end you'll find a worked example in euro.

**Who pays the transaction costs**

Under Article 45 of the Local Taxes and Fees Act (ЗМДТ), the local tax is paid by the buyer, unless the parties have agreed otherwise. In practice, the buyer usually also covers the notary fee and the registration fee, but that is negotiable too. That's why it's worth stating in the preliminary contract who pays which costs, so there are no surprises on the day of the sale.

**1. Local acquisition tax - 3% in Sofia**

This is the largest cost. The law allows each municipality to set the tax between 0.1% and 3% of the property's value. Sofia Municipal Council has set the maximum rate of 3%, which has applied since 1 January 2020. Before that, the rate was 2.5%. Some websites and calculators still show the old rate - don't rely on them if you're buying in Sofia.

It's important to know which amount the tax is calculated on. Under Article 46 of the Local Taxes and Fees Act, the base is the agreed price, but if it's lower than the property's tax assessment value, the tax is calculated on the tax assessment value instead. For most homes in Sofia the market price is higher than the tax assessment value, so the tax is usually calculated on the sale price.

The tax is paid when the property is transferred. The notary can't complete the sale until they've confirmed that the tax has been paid (Articles 49 and 50 of the Local Taxes and Fees Act).

**2. Notary fee**

The notary fee is set by the Notary Fees Tariff and depends on the value of the transaction. The fee is tiered - the percentage falls as the amount rises. Since the euro was introduced, the amounts in the tariff are converted at the fixed rate. For properties worth between about €51,000 and €256,000, the range most Sofia apartments fall into, the fee is €373.50 plus 0.2% of the amount above €51,129.19. The maximum notary fee is €3,067.75.

If the notary is VAT-registered, 20% VAT is added to the fee. The tariff also provides for surcharges - for example 25% if the deed is signed outside the notary's office during working hours, and 50% outside the office after working hours. Ask the notary for the exact amount in advance so you can include it in your budget.

**3. Property Register registration fee**

Once signed, the notary deed is entered in the Property Register at the Registry Agency. Under Article 2 of the Tariff of State Fees collected by the agency, the fee is 0.1% of the price on which the notary deed was charged, but no less than €5.11. The fee is usually paid through the notary on the day of the sale.

**Example: a €180,000 apartment in Sofia**

Let's say you're buying an apartment for €180,000 and the price is higher than its tax assessment value:

- **Local tax (3%):** €5,400
- **Notary fee:** €631.24 (€757.49 with VAT, if the notary is VAT-registered)
- **Registration fee (0.1%):** €180

Total: about €6,210-6,340, or about 3.5% of the property price. These are the costs set by law. Everything else depends on the specific transaction.

**What isn't included in this calculation**

- **The agent's commission.** It isn't set by law but agreed with the agency. Ask for the amount in writing before you start viewings.
- **Mortgage costs.** If you're buying with a loan, add the bank's fees, the property valuation and the costs of setting up and registering the mortgage. Ask the bank for a full breakdown before you sign.
- **Documents for checking the property.** A certificate of encumbrances, a cadastral sketch and a tax assessment certificate - each is relatively cheap, but it's worth budgeting for them.
- **Building tax and waste collection fee.** After the purchase, these annual charges are owed by the buyer from the start of the month after the sale, unless the seller has already paid them.

So when you see an overall figure of 6% or 8%, it almost always includes the commission and the loan costs as well. The legally set costs in Sofia come to about 3.5% of the property price.

**Why it's not worth stating a lower price in the notary deed**

Buyers are sometimes offered the option of stating a lower price in the notary deed than the one actually paid, to pay less tax. Besides being illegal, this carries real risks for you. If a dispute with the seller arises later, you'll only be able to prove the price written in the documents. And if you sell the property years later, a lower purchase price means a larger taxable gain and higher income tax. The few hundred euro saved today can cost you much more later.

**Conclusion**

If you're buying a property in Sofia, budget about 3.5% of the price for taxes and fees, plus the commission and loan costs, if you have a loan. Ask the notary for an exact breakdown and state in the preliminary contract who pays which costs. If you'd like us to work out all the costs for a specific property together with you before you decide, contact us on 0879 826 292. We work with a limited number of clients each month so we can give each one the attention they need.`

const researchNotes = `Тема: разходи на купувача при покупка на имот в София (местен данък, нотариална такса, такса вписване). Избрана, защото нито една от съществуващите 25 статии не я разглежда самостоятелно - проверено пълното съдържание на всички статии за "данък", "такса", "вписване", "нотариалн": 8 статии споменават разходите мимоходом, с различни общи проценти ("3-4% + 2-3%" - 2025-01-20, "3% до 6%" - 2026-08-31, "около 8%" - 2026-07-18 и 2026-07-27). Статията обяснява, че законовите разходи са ~3,5%, а по-високите цифри включват комисиона и кредит. Таксата за вписване (0,1%, мин. 5,11 евро) е спомената в статията от 2026-08-10 - тук е част от пълната сметка.

Написана ръчно в Claude Code на 2026-10-19, НЕ чрез cron-а / Anthropic API.

ИЗТОЧНИЦИ - първични текстове:
- ЗМДТ чл. 45 (данъкът се плаща от приобретателя, освен ако е уговорено друго), чл. 46, ал. 1-2 (основа: уговорената цена, а ако е по-ниска от данъчната оценка - данъчната оценка; ал. 1 в евро, в сила от 01.01.2026), чл. 47, ал. 2 (общинският съвет определя 0,1-3 на сто), чл. 49, ал. 2 и чл. 50, ал. 1 (плаща се при прехвърлянето; нотариусът изповядва сделката след като установи, че данъкът е платен). Прочетено на kik-info.com, редакция ДВ бр. 55/2026 (minfin.bg върна 403).
- Столичен общински съвет, Решение № 51/30.12.2019, в сила от 01.01.2020 - ставката се променя от 2,5% на 3,0% (council.sofia.bg, мотиви). Потвърдено като действащо в Решение № 1036/18.12.2025 (council.sofia.bg): "чл.35, ал.2 от Наредбата ... данъкът е в размер 3 на сто върху оценката на прехвърляното имущество". dogovori.net все още показва 2,5% - остаряло, затова в статията има предупреждение.
- Тарифа за нотариалните такси, т. 8 (официален PDF на Нотариалната камара): 100 001-500 000 лв. -> 730,50 лв. + 0,2% над 100 000 лв.; таван 6000 лв. В евро по курс 1,95583: 51 129,19-255 645,94 евро -> 373,50 евро + 0,2% над 51 129,19 евро; таван 3 067,75 евро. Т. 23: надбавки 25% / 50% / двоен размер. Официално постановление за преизчисляване на тарифата в евро не беше намерено - сумите са превалутирани по фиксирания курс (както правят pravatami.bg и irinakonstantinova.com; pravatami.bg дава 471,24 евро за 100 000 евро - съвпада с нашата формула).
- Тарифа за държавните такси, събирани от АВ, чл. 2, ал. 1 (PDF на registryagency.bg): 0,1% върху цената, по която е таксуван актът, но не по-малко от 10 лв.; registryagency.bg (страница "Вписване на акт по недвижим имот"): "Минималната такса за вписване е 5.11 евро".
- Данък сгради / такса битови отпадъци от месеца след сделката - ЗМДТ, проверено при статията от 2026-10-06.
- По-ниска цена в акта -> по-висок данък при бъдеща продажба: ЗДДФЛ чл. 33, ал. 1 (проверено при статията от 2026-10-06).

Примерът (180 000 евро) е илюстративно изчисление: 180 000 евро = 352 049,40 лв. -> 730,50 + 0,2% x 252 049,40 = 1 234,60 лв. = 631,24 евро; с ДДС 757,49 евро; 3% = 5 400; 0,1% = 180. Общо 6 211,24 / 6 337,49 евро = 3,45-3,52%.

Умишлено НЕ са включени: конкретни размери на комисиона (не са законово определени), банкови такси и такси за вписване на ипотека (зависят от банката / не са проверени), такси за удостоверения (малки и се променят), "типично съотношение" между пазарна цена и данъчна оценка (формулирано само качествено - "при повечето жилища").

Снимка: ул. Граф Игнатиев, София (Wikimedia Commons, "Ulitsa Graf Ignatiev Sofia 2012 PD.jpg", CC BY-SA 3.0) - не се ползва в друга статия.`

const draftId = `drafts.${crypto.randomBytes(12).toString('hex')}`

const doc = {
  _id: draftId,
  _type: 'blogPost',
  title: 'Разходи при покупка на имот в София: колко плащате освен цената',
  titleEn: 'Costs of buying a property in Sofia: what you pay on top of the price',
  slug: { _type: 'slug', current: slug },
  excerpt: 'Освен цената на имота купувачът плаща местен данък, нотариална такса и такса за вписване. Обясняваме колко е всяка от тях, как се изчислява и защо законовите разходи в София са около 3,5% - с конкретен пример в евро.',
  excerptEn: 'On top of the property price, the buyer pays a local tax, a notary fee and a registration fee. We explain how much each one is, how it’s calculated and why the legally set costs in Sofia come to about 3.5% - with a worked example in euro.',
  content,
  contentEn,
  date: '2026-10-19',
  category: 'Правни съвети',
  externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Ulitsa_Graf_Ignatiev_Sofia_2012_PD.jpg',
  researchNotes,
}

const existing = await client.fetch(
  `*[_type=="blogPost" && slug.current==$slug][0]{_id}`,
  { slug }
)
if (existing) {
  console.error('❌  A post with this slug already exists:', existing._id)
  process.exit(1)
}

const created = await client.createIfNotExists(doc)
console.log('✅  Created blog post DRAFT:', created._id, created.slug.current)
