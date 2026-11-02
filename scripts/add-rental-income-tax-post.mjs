/**
 * Adds a new blog post: how landlords in Bulgaria are taxed on rental income
 * (10% tax on 90% of the rent, quarterly advance payments, company tenants
 * withholding the tax, annual return, 5% e-filing discount, short-term rentals).
 * Written by hand in Claude Code - the weekly market-post cron was removed on
 * 2026-11-02 so the agency no longer pays for Anthropic API credits.
 *
 * Facts checked 2026-11-02 via web search; each core fact matched in at least
 * two sources: innovires.com, novinata.bg (29.10.2026), ruskov-law.eu, kik-info.com.
 * Landed as a Sanity DRAFT so Presiyan can review before publishing.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/add-rental-income-tax-post.mjs
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

const slug = 'danak-dohodi-ot-naem-kak-se-deklarira-2026'

const content = `Все повече собственици в София отдават жилището си под наем - като допълнителен доход, като инвестиция или просто защото са се преместили. Много от тях обаче не са сигурни какво точно дължат на държавата, кога и как. Добрата новина е, че правилата са сравнително прости и не са се променяли от години. Лошата - че НАП все по-лесно открива недекларирани наеми. Ето какво трябва да знаете, ако отдавате имот като физическо лице.

**Колко е данъкът**

Доходът от наем се облага с плосък данък от 10%, но не върху цялата сума. Законът позволява да приспаднете 10% нормативно признати разходи - автоматично, без да събирате фактури и касови бележки. Тоест данъкът се изчислява върху 90% от получения наем и реалната тежест е около 9% от брутния наем.

Пример: ако отдавате апартамент за 700 евро на месец, за година получавате 8 400 евро. След приспадане на 10% разходи облагаемият доход е 7 560 евро, а данъкът - 756 евро годишно.

Важно е да се знае, че физическите лица не могат да приспадат реалните си разходи (ремонт, обзавеждане, кредит) вместо нормативните 10%. Няма и необлагаем минимум - данък се дължи от първото евро наем.

**Авансов данък на всяко тримесечие**

Данъкът не се плаща само веднъж годишно. Ако наемателят Ви е физическо лице, Вие сами декларирате и внасяте авансов данък за всяко от първите три тримесечия на годината:

- за януари - март: до 30 април;

- за април - юни: до 31 юли;

- за юли - септември: до 31 октомври.

За последното тримесечие (октомври - декември) авансов данък не се внася - той се урежда директно с годишната данъчна декларация. При наем от 700 евро на месец авансовият данък за едно тримесечие е 189 евро.

**Когато наемателят е фирма**

Ако отдавате имота на фирма или на самоосигуряващо се лице (например офис, или жилище, наето от фирма за неин служител), правилата са по-лесни за Вас: наемателят е длъжен да изчисли и удържи авансовия данък при всяко плащане и сам да го внесе в бюджета. Вие получавате наема, намален с удържания данък.

Това обаче не Ви освобождава от годишната декларация - доходът трябва да бъде деклариран, а удържаният данък се приспада от годишното Ви задължение.

**Годишната данъчна декларация**

Всички доходи от наем за календарната година се декларират в Приложение № 4 към годишната данъчна декларация по чл. 50 от ЗДДФЛ. Срокът е 30 април на следващата година - за наемите, получени през 2026 г., това е 30 април 2027 г. Тъй като България вече е в еврозоната, доходите за 2026 г. се декларират в евро.

Ако подадете декларацията по електронен път (с ПИК на НАП или електронен подпис) и платите данъка до 31 март, получавате 5% отстъпка от дължимия данък, но не повече от 255,65 евро. Условието е и двете - и подаването, и плащането - да са направени до 31 март.

**Какво рискувате, ако не декларирате**

Неплатеният данък се дължи винаги, заедно с лихва за забава, а за неподадена декларация се налага глоба. Да разчитате, че "никой няма да разбере", е все по-рискована стратегия. НАП получава данни от фирмите-наематели, а по европейските правила за обмен на информация (DAC7) онлайн платформи като Airbnb и Booking подават към НАП данни за доходите на домакините. Наемът, получен в брой, също е облагаем доход.

**Краткосрочен наем (Airbnb, Booking)**

Отдаването за по няколко нощувки е по-сложен случай от класическия дългосрочен наем. В зависимост от начина, по който е организирано, то може да изисква категоризация на обекта по Закона за туризма и в някои случаи да се разглежда като търговска дейност с различно данъчно третиране. Ако планирате краткосрочно отдаване, препоръчваме да се консултирате със счетоводител, преди да публикувате първата обява.

**Практични съвети**

- Сключвайте писмен договор за наем - той защитава и Вас, и наемателя, и е основа за коректното деклариране.

- Отбелязвайте си в календара трите срока за авансов данък (30 април, 31 юли, 31 октомври).

- Ако наемателят е фирма, поискайте документ за удържания данък - ще Ви трябва за годишната декларация.

- Заложете данъка в сметката си за доходност от самото начало - около 9% от брутния наем отиват за данък. Можете да го направите с нашия [калкулатор за доходност от наем](/dohodnost-ot-naem).

Тази статия е обща информация, а не данъчна консултация. За Вашия конкретен случай, особено при няколко имота, краткосрочен наем или наематели от чужбина, се консултирайте със счетоводител.

В New Key Properties помагаме на собственици да отдадат имота си на коректни наематели, с ясен договор и реалистична наемна цена, а не с обещания, които не се сбъдват. Ако обмисляте да отдадете имот в София, обадете се на 0879 826 292 за безплатна консултация.`

const contentEn = `More and more owners in Sofia rent out their home - as extra income, as an investment, or simply because they have moved. Many of them, however, are not sure exactly what they owe the state, when, and how. The good news is that the rules are fairly simple and have not changed for years. The bad news is that the National Revenue Agency (NRA) is finding undeclared rentals more and more easily. Here is what you need to know if you rent out property as a private individual.

**How much is the tax**

Rental income is taxed at a flat 10%, but not on the full amount. The law lets you deduct 10% as statutory expenses - automatically, without collecting invoices or receipts. In other words, the tax is calculated on 90% of the rent you receive, and the real burden is about 9% of the gross rent.

Example: if you rent out an apartment for 700 euros a month, you receive 8,400 euros a year. After deducting the 10% expenses, the taxable income is 7,560 euros, and the tax is 756 euros a year.

It is worth knowing that private individuals cannot deduct their actual expenses (renovation, furniture, a mortgage) instead of the statutory 10%. There is also no tax-free allowance - tax is owed from the very first euro of rent.

**Advance tax every quarter**

The tax is not paid only once a year. If your tenant is a private individual, you declare and pay advance tax yourself for each of the first three quarters of the year:

- for January - March: by 30 April;

- for April - June: by 31 July;

- for July - September: by 31 October.

No advance tax is paid for the last quarter (October - December) - it is settled directly through the annual tax return. With rent of 700 euros a month, the advance tax for one quarter is 189 euros.

**When the tenant is a company**

If you rent the property to a company or a self-employed person (for example an office, or an apartment a company rents for an employee), the rules are easier for you: the tenant must calculate and withhold the advance tax with every payment and pay it to the budget itself. You receive the rent minus the withheld tax.

This does not, however, release you from the annual return - the income must still be declared, and the withheld tax is deducted from your annual liability.

**The annual tax return**

All rental income for the calendar year is declared in Annex No. 4 of the annual tax return under Art. 50 of the Personal Income Tax Act. The deadline is 30 April of the following year - for rent received in 2026, that is 30 April 2027. Since Bulgaria is now in the eurozone, income for 2026 is declared in euros.

If you file the return electronically (with an NRA PIN or an electronic signature) and pay the tax by 31 March, you get a 5% discount on the tax due, up to a maximum of 255.65 euros. Both conditions - filing and paying - must be met by 31 March.

**What you risk if you don't declare**

Unpaid tax is always owed, together with late-payment interest, and a fine is imposed for a return that was not filed. Counting on "nobody will find out" is an increasingly risky strategy. The NRA receives data from companies that rent property, and under the European information-exchange rules (DAC7) online platforms such as Airbnb and Booking report hosts' income to the NRA. Rent received in cash is also taxable income.

**Short-term rentals (Airbnb, Booking)**

Renting out for a few nights at a time is a more complicated case than a classic long-term let. Depending on how it is organised, it may require the property to be categorised under the Tourism Act and in some cases be treated as a business activity with different tax treatment. If you plan short-term letting, we recommend speaking with an accountant before you publish your first listing.

**Practical tips**

- Always sign a written rental contract - it protects both you and the tenant and is the basis for declaring correctly.

- Mark the three advance-tax deadlines in your calendar (30 April, 31 July, 31 October).

- If your tenant is a company, ask for a document confirming the withheld tax - you will need it for the annual return.

- Factor the tax into your yield calculation from the start - about 9% of the gross rent goes to tax. You can do this with our [rental yield calculator](/dohodnost-ot-naem).

This article is general information, not tax advice. For your specific situation, especially with several properties, short-term rentals or tenants from abroad, consult an accountant.

At New Key Properties we help owners rent out their property to reliable tenants, with a clear contract and a realistic rent - not with promises that never come true. If you are thinking of renting out a property in Sofia, call 0879 826 292 for a free consultation.`

const researchNotes = `Проверено на 2026-11-02 чрез уеб търсене. Всеки основен факт съвпада в поне два източника:

- 10% данък, 10% нормативно признати разходи (чл. 31, ал. 1 ЗДДФЛ), ефективно ~9%: innovires.com/blog/danak-naem.html; novinata.bg (29.10.2026); ruskov-law.eu

- Тримесечни срокове 30.04 / 31.07 / 31.10, без аванс за Q4 (чл. 67 ЗДДФЛ): innovires.com; novinata.bg; ruskov-law.eu

- Фирма-наемател удържа авансовия данък: innovires.com; novinata.bg; ruskov-law.eu

- Годишна декларация, Приложение № 4, срок 30.04.2027 за доходи от 2026 г.: innovires.com; novinata.bg; kik-info.com

- 5% отстъпка при електронно подаване И плащане до 31.03, максимум 255,65 евро: innovires.com; kik-info.com

- Доходи за 2026 г. се декларират в евро: kik-info.com ("Евро и НАП от 01.01.2026")

- DAC7 - платформите подават данни към НАП: innovires.com (DAC7 статия); kik-info.com (НАП за данни от Airbnb)
Умишлено НЕ са цитирани конкретни размери на глобите (намерени само в един източник) и подробности за новия регламент на ЕС за краткосрочните наеми (не можа да се потвърди - capital.bg блокира достъпа).
Пример с 700 евро/месец е изчислен: 8400 × 0,9 × 0,1 = 756 евро/година; 2100 × 0,9 × 0,1 = 189 евро/тримесечие.`

const draftId = `drafts.${crypto.randomUUID().replace(/-/g, '').slice(0, 24)}`

const doc = {
  _id: draftId,
  _type: 'blogPost',
  title: 'Данък върху доходите от наем: какво дължите и как да го декларирате',
  titleEn: 'Tax on rental income: what you owe and how to declare it',
  slug: { _type: 'slug', current: slug },
  excerpt: 'Отдавате имот под наем? Обясняваме простичко колко е данъкът, кога се плаща авансово, какво се променя, ако наемателят е фирма, и как да получите 5% отстъпка при годишната декларация.',
  excerptEn: 'Renting out a property? We explain in plain terms how much the tax is, when advance payments are due, what changes if the tenant is a company, and how to get a 5% discount on your annual return.',
  content,
  contentEn,
  date: '2026-11-02',
  category: 'Правни съвети',
  externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Lozenets_-_panoramio_-_zonemars_%283%29.jpg',
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
