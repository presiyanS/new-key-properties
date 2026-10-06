/**
 * Adds a new blog post: what taxes a private seller owes (or doesn't) when
 * selling a property in Bulgaria. Chosen because no existing post covers the
 * seller's side - earlier posts only mention the buyer's transaction costs.
 *
 * Written by hand in Claude Code (not via the market-post cron / Anthropic
 * API). Facts checked 2026-10-06 directly against the law texts on lex.bg:
 * ЗДДФЛ чл. 13, 33, 48, 53, 67 (amended up to ДВ бр. 30/2026) and ЗМДТ чл. 45.
 * Landed as a Sanity DRAFT; proofread separately before publishing.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/add-property-sale-taxes-post.mjs
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

const slug = 'danaci-pri-prodazhba-na-imot-koga-dalzhite-danak'

const content = `Когато решите да продадете имот, първият въпрос обикновено е цената. Вторият, който често идва твърде късно, е: ще дължа ли данък върху парите от продажбата? Отговорът зависи от няколко конкретни условия в Закона за данъците върху доходите на физическите лица (ЗДДФЛ) - колко време сте притежавали имота, колко имота продавате през годината и как сте го придобили. В тази статия обясняваме правилата ясно и с пример, за да знаете предварително какво Ви очаква, а не след подписването на нотариалния акт.

**Кога не дължите данък**

Според чл. 13 от ЗДДФЛ доходът от продажбата не се облага в три основни случая:

- **Един жилищен имот, притежаван повече от 3 години.** Ако през годината продадете един апартамент или къща и от датата на придобиването до датата на продажбата са минали повече от три години, не дължите данък.
- **До два имота от всякакъв вид, притежавани повече от 5 години.** Когато продавате до два имота (жилищни или не - например гараж, офис или парцел) и са минали повече от пет години от придобиването им, доходът също е необлагаем. Земеделските земи и горите са освободени при този срок независимо от броя им.
- **Имот, получен по наследство или по завещание**, както и реституиран имот - тук доходът е необлагаем независимо от това колко време сте го притежавали.

Важен детайл: сроковете се броят от датата на придобиване до датата на продажба, а не по календарни години. Ако сте купили апартамента на 15 ноември 2023 г., продажбата е необлагаема едва след 15 ноември 2026 г. - сделка няколко седмици по-рано може да Ви струва хиляди евро данък.

**Кога дължите данък и колко**

Ако нито едно от условията по-горе не е изпълнено - например продавате апартамент, купен преди по-малко от три години, или продавате втори жилищен имот през същата година, който притежавате по-малко от пет години - доходът се облага.

Данъкът се изчислява така (чл. 33 от ЗДДФЛ): от продажната цена се изважда цената, на която сте придобили имота, а от получената разлика се приспадат 10% нормативно признати разходи. Върху остатъка се плаща данък 10%.

Пример: купили сте апартамент през 2024 г. за 150 000 евро и го продавате през 2026 г. за 180 000 евро.
- Разлика: 180 000 - 150 000 = 30 000 евро
- Минус 10% признати разходи: 30 000 - 3 000 = 27 000 евро
- Данък 10%: 2 700 евро

На практика ефективната тежест е около 9% от печалбата, а не от цялата цена на имота. Ако продавате на загуба или на същата цена, данък не се дължи.

**Капанът с дарения имот**

Ако сте получили имота като дарение (например от родител) и го продадете, преди да изтекат сроковете за освобождаване, законът приема цената на придобиване за нула. Това означава, че облагаемият доход се изчислява върху почти цялата продажна цена - при продажба за 180 000 евро данъкът би бил около 16 200 евро. Тук разликата между дарение и наследство е огромна: наследеният имот е необлагаем по всяко време, а дареният - само след изтичане на сроковете от три или пет години. Ако обмисляте продажба на дарен имот, проверете датата в нотариалния акт, преди да поемете ангажимент към купувач.

**Как и кога се декларира**

Облагаемият доход от продажба на имот се декларира в годишната данъчна декларация по чл. 50 от ЗДДФЛ, която се подава от 10 януари до 30 април на следващата година. В същия срок - до 30 април - се плаща и данъкът. За продажба, извършена през 2026 г., крайният срок е 30 април 2027 г. Пазете нотариалните актове - както за покупката, така и за продажбата - защото именно те доказват цената на придобиване. Без документално доказана цена на придобиване законът отново приема тази цена за нула.

**Какво още е добре да знаете като продавач**

- **Местният данък при прехвърляне** (който Столична община начислява върху стойността на имота) по закон се плаща от купувача, освен ако страните не са се договорили друго (чл. 45 от Закона за местните данъци и такси). Уточнете това изрично още в предварителния договор, за да няма изненади при нотариуса.
- **Данъкът върху сградата** за годината, в която продавате, се разпределя: купувачът го дължи от началото на месеца, следващ продажбата, освен ако не е платен от Вас като продавач. Добре е предварително да проверите в общината дали нямате неплатени местни данъци и такси за имота, защото нотариусът ще ги провери при сделката.
- **Предсрочно погасяване на ипотечен кредит.** Ако имотът е ипотекиран, проверете в договора с банката дали има такса за предсрочно погасяване и колко време отнема заличаването на ипотеката.

**Заключение**

Данъкът при продажба на имот в много случаи е нула - но само ако условията са изпълнени точно, до деня. Една и съща сделка може да бъде необлагаема или да струва няколко хиляди евро в зависимост от датата на подписване и от начина, по който сте придобили имота. Тази статия представя общите правила за местни физически лица и не замества индивидуална консултация със счетоводител, особено ако живеете в чужбина или продавате няколко имота. Ако обмисляте продажба на имот в София, свържете се с нас на 0879 826 292 - ще прегледаме документите Ви и ще Ви кажем честно кога е най-подходящият момент за сделката. Работим с ограничен брой клиенти на месец, за да отделим на всеки нужното внимание.`

const contentEn = `When you decide to sell a property, the first question is usually the price. The second one, which often comes too late, is: will I owe tax on the money from the sale? The answer depends on a few specific conditions in Bulgaria's Personal Income Tax Act (ЗДДФЛ) - how long you've owned the property, how many properties you sell during the year, and how you acquired it. In this article we explain the rules clearly and with an example, so you know in advance what to expect, not after signing the notary deed.

**When you don't owe tax**

Under Article 13 of the Personal Income Tax Act, income from a sale is not taxed in three main cases:

- **One residential property owned for more than 3 years.** If during the year you sell one apartment or house and more than three years have passed from the date of acquisition to the date of sale, you owe no tax.
- **Up to two properties of any kind owned for more than 5 years.** When you sell up to two properties (residential or not - for example a garage, office, or plot) and more than five years have passed since you acquired them, the income is also tax-free. Agricultural land and forests are exempt after this period regardless of how many you sell.
- **Property received by inheritance or bequest**, as well as restituted property - here the income is tax-free no matter how long you've owned it.

An important detail: the periods are counted from the date of acquisition to the date of sale, not by calendar year. If you bought the apartment on 15 November 2023, the sale only becomes tax-free after 15 November 2026 - a transaction a few weeks earlier could cost you thousands of euro in tax.

**When you owe tax and how much**

If none of the conditions above is met - for example, you're selling an apartment bought less than three years ago, or selling a second residential property in the same year that you've owned for less than five years - the income is taxable.

The tax is calculated like this (Article 33 of the Personal Income Tax Act): the price you acquired the property for is subtracted from the sale price, and 10% statutory expenses are deducted from the difference. A 10% tax is paid on the remainder.

Example: you bought an apartment in 2024 for €150,000 and sell it in 2026 for €180,000.
- Difference: €180,000 - €150,000 = €30,000
- Minus 10% statutory expenses: €30,000 - €3,000 = €27,000
- 10% tax: €2,700

In practice the effective burden is about 9% of the profit, not of the property's full price. If you sell at a loss or at the same price, no tax is due.

**The gifted-property trap**

If you received the property as a gift (for example from a parent) and sell it before the exemption periods run out, the law treats the acquisition price as zero. That means the taxable income is calculated on almost the entire sale price - for a €180,000 sale the tax would be around €16,200. The difference between a gift and an inheritance is huge here: inherited property is tax-free at any time, while gifted property is only tax-free once the three- or five-year periods have passed. If you're considering selling a gifted property, check the date on the notary deed before committing to a buyer.

**How and when to declare it**

Taxable income from a property sale is declared in the annual tax return under Article 50 of the Personal Income Tax Act, filed between 10 January and 30 April of the following year. The tax is also paid within the same deadline - by 30 April. For a sale made in 2026, the deadline is 30 April 2027. Keep your notary deeds - for both the purchase and the sale - because they are what proves your acquisition price. Without a documented acquisition price, the law again treats that price as zero.

**What else to know as a seller**

- **The local transfer tax** (charged by Sofia Municipality on the property's value) is by law paid by the buyer, unless the parties agree otherwise (Article 45 of the Local Taxes and Fees Act). Spell this out in the preliminary contract so there are no surprises at the notary.
- **The building tax** for the year you sell is split: the buyer owes it from the start of the month following the sale, unless you as the seller have already paid it. It's worth checking with the municipality in advance that you have no unpaid local taxes or fees on the property, because the notary will check this at the transaction.
- **Early mortgage repayment.** If the property is mortgaged, check your bank contract for an early repayment fee and how long it takes to remove the mortgage.

**Conclusion**

The tax on selling a property is zero in many cases - but only if the conditions are met exactly, to the day. The same transaction can be tax-free or cost several thousand euro depending on the signing date and on how you acquired the property. This article sets out the general rules for Bulgarian tax residents and does not replace individual advice from an accountant, especially if you live abroad or are selling several properties. If you're considering selling a property in Sofia, contact us at 0879 826 292 - we'll review your documents and tell you honestly when the right moment for the transaction is. We work with a limited number of clients per month so we can give each one the attention they need.`

const researchNotes = `Тема: данъци за ПРОДАВАЧА при продажба на имот (физическо лице). Избрана, защото нито една от съществуващите 23 статии не я покрива - проверено пълното съдържание на всички статии за "данък", "продажб", "нотари", "такс": досегашните статии говорят само за разходите на КУПУВАЧА (местен данък при придобиване, нотариални такси, вписване) и за данъка върху доход от наем (статията за доходността от 2026-09-21). "Как да продадете имота си на най-добра цена" (2026-03-01) не споменава данъци изобщо.

Написана ръчно в Claude Code на 2026-10-06, НЕ чрез cron-а / Anthropic API.

ИЗТОЧНИК - първичен текст на законите от lex.bg (изтеглен и прочетен директно, последно изменение ДВ бр. 30 от 2026 г.):
- ЗДДФЛ чл. 13, ал. 1, т. 1, б. "а": необлагаем е доходът от продажба на "един недвижим жилищен имот, ако между датата на придобиването и датата на продажбата или замяната са изминали повече от три години" (през данъчната година).
- ЗДДФЛ чл. 13, ал. 1, т. 1, б. "б": "до два недвижими имота, както и селскостопански и горски имоти независимо от броя им, ако ... са изминали повече от 5 години".
- ЗДДФЛ чл. 13, ал. 1, т. 26: необлагаеми са "доходите от продажба или замяна на имущество, придобито по наследство и завет, както и на имущество, реституирано по реда на нормативен акт".
- ЗДДФЛ чл. 33, ал. 1: облагаемият доход = положителната разлика между продажна цена и цена на придобиване, намалена с 10 на сто разходи.
- ЗДДФЛ чл. 33, ал. 6, т. 3: цената на придобиване е "нула - когато няма документално доказана цена на придобиване, включително за имущество, придобито по дарение".
- ЗДДФЛ чл. 48, ал. 1: ставка 10 на сто.
- ЗДДФЛ чл. 53, ал. 1: декларацията се подава от 10 януари до 30 април на следващата година.
- ЗДДФЛ чл. 67, ал. 5: данъкът се внася до 30 април на следващата година.
- ЗМДТ чл. 45, ал. 1: данъкът при придобиване "се заплаща от приобретателя ... освен ако е уговорено друго".
- ЗМДТ (данък върху сградите): при прехвърляне "приобретателят дължи данъка от началото на месеца, следващ месеца, през който е настъпила промяната в собствеността ... освен ако данъкът е платен от прехвърлителя".

Второ потвърждение (вторични източници, съвпадат с текста на закона): nula.bg (правилата за 3 и 5 години, броене от дата до дата), realistimo.com / marica.bg (10% признати разходи, декларация по чл. 50).

Примерите (150 000 / 180 000 евро) са илюстративни изчисления, не пазарни данни. 16 200 евро = (180 000 - 0) x 0,9 x 10%.

Умишлено НЕ са включени: правилата за чуждестранни лица/нерезиденти (различен режим - насочваме към счетоводител) и конкретни размери на местния данък в София (не е тема на статията).

Снимка: ул. Оборище, София (Wikimedia Commons, CC BY-SA 3.0) - не се ползва в друга статия.`

const draftId = `drafts.${crypto.randomBytes(12).toString('hex')}`

const doc = {
  _id: draftId,
  _type: 'blogPost',
  title: 'Данъци при продажба на имот: кога дължите данък и кога не',
  titleEn: 'Taxes when selling a property: when you owe tax and when you don’t',
  slug: { _type: 'slug', current: slug },
  excerpt: 'Продавате имот и се чудите дали ще дължите данък върху сумата? Обясняваме кога продажбата е необлагаема, как се изчислява данъкът, кога се декларира и кои са капаните - с конкретен пример в евро.',
  excerptEn: "Selling a property and wondering whether you'll owe tax on the proceeds? We explain when a sale is tax-free, how the tax is calculated, when it must be declared, and the common traps - with a worked example in euro.",
  content,
  contentEn,
  date: '2026-10-06',
  category: 'Правни съвети',
  externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Oborishte_Str_Sofia.jpg',
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
