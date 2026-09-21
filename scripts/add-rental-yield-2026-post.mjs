/**
 * Adds a new blog post on rental yields in Sofia, written directly (web-search
 * research + manual drafting) instead of via the Anthropic-API market-post cron.
 * Landed as a Sanity DRAFT (not published) so Presiyan can review the cited
 * figures in Studio before it goes live - the numbers vary a lot by source
 * (see researchNotes) so this gets the same "review before publish" treatment
 * as the automated cron's fact-checked posts.
 *
 * Facts checked 2026-09-21 via web search against: Global Property Guide
 * (Sofia/Bulgaria rental yields), businessnovinite.bg, expert.bg, plovdiv24.bg
 * (Sofia yield ranges), NRA.bg (10% flat tax / 10% recognized expenses on
 * rental income), and the price/sq.m range already cited in the Aug 2026
 * "Наръчник за купувачи" post (2080-2790 EUR/sq.m) for consistency.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node add-rental-yield-2026-post.mjs
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

const slug = 'dohodnost-naem-sofia-2026'

const content = `Ако търсите имот за отдаване под наем в София, вероятно вече сте се сблъскали с объркващо разнообразие от цифри за доходност. Един източник твърди, че е под 4%, друг - че е между 5% и 7% за практически същия тип апартамент. И двете могат да са коректно изчислени, но лесно погрешно разбрани, ако не се обяснят допусканията зад тях. За нас честността към клиента е основен принцип, затова в тази статия обясняваме откъде идва разликата и как да стигнете до реалистична собствена оценка, вместо да разчитате на едно голо число от реклама.

**Защо публикуваните цифри се разминават толкова много**

Разминаването най-често идва от три неща. Първо, някои анализи изчисляват доходност на база средна стойност за цяла България, докато други се фокусират единствено на София, където цените на имотите са по-високи - а по-високата цена на имота автоматично намалява процента на доходност дори при сходен наем. Второ, част от източниците показват брутна доходност (наем спрямо цена на имота), докато други вече изваждат данъци и разходи и показват нетна доходност - число, което по дефиниция е по-ниско. Трето, някои анализи използват обявени в реклами наемни цени вместо реално платени наеми, което често завишава резултата. Затова, когато видите конкретен процент онлайн, първият въпрос си струва да е: брутна или нетна доходност е това, и за София конкретно ли се отнася?

**Брутна срещу нетна доходност - какво всъщност означават**

Брутната доходност е най-простото изчисление: годишен наем, разделен на цената на покупка на имота. Ако купите двустаен апартамент за около 155 000 евро (при средна цена от около 2 400 евро на кв.м за София) и го отдавате за около 600 евро месечно - типична цена за двустаен апартамент в момента - годишният наем е 7 200 евро, а брутната доходност излиза около 4.6%. Това число обаче не отчита нито един разход, свързан с притежаването и отдаването на имота - затова е само отправна точка, не реален показател за възвръщаемост.

**Как се стига до реалната, нетна доходност**

Нетната доходност изважда от годишния наем реалните разходи по имота. В България доходът от наем на физическо лице се облага с 10% данък върху 90% от получения наем (10% нормативно признати разходи без нужда от документи) - тоест ефективна данъчна тежест от около 9% върху брутния наем. Към това се добавят годишният местен данък сгради и такса битови отпадъци (размерът им зависи от данъчната оценка на имота и района), обичайно поне около месец празен апартамент между двама наематели през годината, както и текуща поддръжка и дребни ремонти. Ако ползвате агенция за управление на имота под наем, прибавете и нейната такса - обичайно около 8-10% от наема. За примера по-горе, след данък, около месец празен апартамент и поддръжка, нетната доходност пада до около 3.2-3.6% годишно - близо до по-предпазливите оценки, които ще видите публикувани онлайн, и значително по-близо до реалността от рекламните 6-7%.

**От какво зависи доходността на конкретен имот**

Средните стойности крият значителни разлики между отделните имоти. По-малките апартаменти (студия и едностайни) обикновено носят по-висок процент доходност спрямо цената си, защото наемната цена на квадратен метър е по-висока при по-малка площ - но идват с по-често сменящи се наематели и по-висок дял празни периоди между тях. По-големите семейни апартаменти дават по-нисък процент доходност, но по-стабилни, дългосрочни наематели. Новото строителство обикновено носи ценова премия при покупка, която не винаги се компенсира изцяло от по-висок наем, докато по-старите, но добре поддържани имоти в центъра или до метростанция често предлагат по-балансирано съотношение между цена и наемен доход.

Няма едно универсално число, което да отговори колко ще спечелите от отдаване под наем в София - има само реалистична сметка за конкретния имот, направена с реални, а не рекламни цифри. В New Key Properties предпочитаме да Ви покажем честна прогноза, основана на действителни наемни нива в конкретния квартал, вместо да обещаваме доходност, която трудно бихме постигнали на практика. Ако обмисляте покупка на имот за отдаване под наем в София, обадете се на 0879 826 292 за безплатна консултация и реалистична сметка за конкретния имот, който разглеждате.`

const contentEn = `If you're looking for a rental property in Sofia, you've probably already run into a confusing spread of yield numbers. One source says under 4%, another says 5-7% for what looks like the same type of apartment. Both can be calculated correctly and still be easy to misread if the assumptions behind them aren't explained. Honesty with clients is a core principle for us, so in this article we explain where the gap comes from and how to reach a realistic estimate of your own, instead of relying on a single number from an ad.

**Why the published numbers vary so much**

The gap usually comes down to three things. First, some analyses calculate yield on a nationwide Bulgarian average, while others focus on Sofia specifically, where property prices are higher - and a higher property price automatically lowers the yield percentage even at a similar rent. Second, some sources show gross yield (rent divided by property price), while others already subtract taxes and costs and show net yield, a number that's lower by definition. Third, some analyses use advertised asking rents instead of rents actually being paid, which often inflates the result. So when you see a specific percentage online, the first question worth asking is: is this gross or net yield, and does it actually refer to Sofia?

**Gross versus net yield - what they actually mean**

Gross yield is the simplest calculation: annual rent divided by the purchase price of the property. If you buy a two-bedroom apartment for around EUR 155,000 (at an average price of roughly EUR 2,400 per sq.m in Sofia) and rent it out for around EUR 600 a month - a typical rate for a two-bedroom apartment right now - annual rent is EUR 7,200, and gross yield works out to around 4.6%. That number doesn't account for a single cost of owning and renting out the property, though, so it's only a starting point, not a real measure of return.

**How you get to the real, net yield**

Net yield subtracts the actual costs of the property from annual rent. In Bulgaria, an individual's rental income is taxed at 10% on 90% of the rent received (a flat 10% recognized-expenses deduction, no receipts required) - an effective tax burden of around 9% of gross rent. Add the annual local property tax and waste-collection fee (the amount depends on the property's tax assessment value and district), typically at least around a month of vacancy between tenants over the year, and ongoing maintenance and minor repairs. If you use an agency to manage the rental, add their fee too - usually around 8-10% of rent. For the example above, after tax, about a month of vacancy, and maintenance, net yield drops to around 3.2-3.6% a year - close to the more conservative estimates published online, and considerably closer to reality than an advertised 6-7%.

**What determines the yield on a specific property**

Averages hide real differences between individual properties. Smaller apartments (studios and one-bedrooms) usually carry a higher yield percentage relative to their price, because rent per square meter is higher at a smaller size - but they come with more frequent tenant turnover and a higher share of vacant periods. Larger family apartments give a lower yield percentage but more stable, long-term tenants. New construction usually carries a purchase-price premium that isn't always fully offset by higher rent, while older but well-maintained properties in the center or near a metro station often offer a more balanced price-to-rent ratio.

There's no single universal number that answers how much you'll earn from renting out a property in Sofia - only a realistic calculation for the specific property, based on real figures rather than advertised ones. At New Key Properties we'd rather show you an honest projection based on actual rental levels in the specific neighborhood than promise a yield we could hardly deliver in practice. If you're considering buying a rental property in Sofia, call 0879 826 292 for a free consultation and a realistic estimate for the specific property you're looking at.`

const researchNotes = `Проверка на източниците, направена на 2026-09-21 чрез web search (не през автоматизирания cron с Anthropic API):

- Global Property Guide (globalpropertyguide.com): доходност от наем за София ~3.75%, за България като цяло ~4.19% (спад от ~4.53% през април 2025). Наемни цени за София (януари 2026): двустаен ~410-1100 евро/месец.
- businessnovinite.bg (позовавайки се на пазарни данни): средна брутна доходност за страната ~4.6%, нетна ~3.2% след данъци и разходи; среден наем за двустаен в София ~600 евро/месец след ръст от 20% през 2025.
- expert.bg и plovdiv24.bg: по-оптимистични оценки от 5-7% брутна доходност за София/Пловдив - вероятно на база обявени, не реално платени наеми, и/или по-малки/по-евтини имоти.
- nra.bg (официален сайт на НАП): потвърждава 10% нормативно признати разходи и 10% данък върху остатъка при доход от наем на физическо лице - основа за изчислението на данъчната тежест в статията.
- Цена на кв.м (~2400 евро) - избрана в диапазона 2080-2790 евро/кв.м, вече цитиран в по-ранния пост "Наръчник за купувачи на имот в София" (10.08.2026), за да няма противоречие между статиите.
- Не намерих единен потвърден процент за местния данък сгради в София за 2026 - затова в статията той е описан без конкретна ставка ("в зависимост от данъчната оценка"), вместо да се посочи непроверено число.

Извод: разминаването между 3.75% и 5-7% е реално в източниците, не грешка при търсенето - затова статията представя диапазон и обяснява методологическите разлики, вместо да цитира едно число като абсолютна истина. Публикувано като чернова (draft) - моля прегледайте цифрите преди да публикувате.`

const draftId = `drafts.${crypto.randomBytes(12).toString('hex')}`

const doc = {
  _id: draftId,
  _type: 'blogPost',
  title: 'Доходност от наем в София: защо цифрите онлайн се разминават',
  titleEn: "Rental yield in Sofia: why the numbers you see online don't match",
  slug: { _type: 'slug', current: slug },
  excerpt: 'Онлайн може да видите доходност от наем в София между 3.5% и 7% - за практически един и същ тип имот. Обясняваме откъде идва разликата, какво отличава брутната от нетната доходност и как да пресметнете реалната възвръщаемост, преди да купите имот за отдаване под наем.',
  excerptEn: "Online you'll find Sofia rental yields ranging anywhere from 3.5% to 7% for what looks like the same type of property. We explain where the gap comes from, what separates gross from net yield, and how to work out a realistic return before buying a rental property.",
  content,
  contentEn,
  date: '2026-09-21',
  category: 'Инвестиции',
  externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Sofia_skyline.jpg',
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
console.log('   Review it in Studio and hit Publish when the figures look right to you.')
