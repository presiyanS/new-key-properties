/**
 * Adds a new dated blog post ("Пазарът на Имоти в София — Лято 2026") based on
 * current, sourced market data (average prices, transaction volume, mortgage
 * rates post-euro adoption). Populates both BG and EN fields.
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/add-summer-2026-market-post.mjs
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) { console.error('❌  Missing SANITY_API_WRITE_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const contentBg = `Изминаха над шест месеца, откакто България официално е част от еврозоната, и пазарът на имоти в София вече показва по-ясна картина за 2026 г. Ето честният ни поглед към актуалните цени, лихви и тенденции — без преувеличения и без паника.

**Средни цени: около €2 680–2 700 на кв.м**
Според пазарни данни за първото тримесечие на 2026 г. средната цена на реално сключените сделки с жилища в София достигна около €2 680 на квадратен метър, а офертните цени се движат близо до €2 700/кв.м. За сравнение, в началото на 2025 г. нивата бяха значително по-ниски — ръстът от последните две години остава осезаем, макар вече да се забавя.

**Пазарна активност: по-малко сделки, повече предлагане**
Броят на сключените сделки през първото тримесечие на 2026 г. е около 10% по-нисък спрямо същия период на 2025 г., докато предлагането на пазара е нараснало с над 25%. Това означава повече избор за купувачите и по-малко натиск да се решават моментално — добра новина за хората, които търсят имот без да бързат.

**Цени по квартали**
Разликите между районите остават значителни. В Лозенец, Иван Вазов, Оборище и центъра офертните цени варират между €3 000 и €4 500 на кв.м. В Люлин, Обеля, Надежда и по-периферните части на Дружба и Овча купел цените остават значително по-достъпни — между €1 650 и €2 250 на кв.м за ново строителство. Панелни и ЕПК апартаменти за ремонт на вторичния пазар се търгуват средно за €2 500–2 600/кв.м, докато обновени тухлени жилища често надхвърлят €3 000/кв.м.

**Ипотечните лихви след еврото**
Един от най-честите въпроси, които получаваме напоследък, е как еврото се отрази на кредитирането. Според данни на БНБ, средният лихвен процент по нови жилищни кредити в началото на 2026 г. е около 2,46%, а годишният процент на разходите (ГПР) — около 2,74%. Лихвената среда вече е пряко обвързана с решенията на Европейската централна банка, чиято лихва по депозитното улеснение е 2,00%. Важно е да се знае, че над 90% от ипотечните кредити у нас са с плаваща лихва — което означава, че бъдещи промени в политиката на ЕЦБ директно ще се отразят на месечните вноски.

**Какво да очакваме до края на 2026 г.**
Анализаторите очакват по-умерен годишен ръст на цените в диапазона 5–10% за София — далеч от резките скокове от 2024–2025 г., но все пак положителна тенденция. За продавачите това означава, че все още е добър момент за реализация на печалба, а за купувачите — че пазарът вече не е толкова „нажежен", колкото преди година.

Ние в New Key Properties следим тези цифри всяка седмица — не защото обичаме статистиката, а защото искаме да Ви дадем честна представа какво се случва в реално време, преди да вземете решение за покупка, продажба или наем. Ако искате конкретна и безплатна оценка на Вашия имот според актуалните пазарни нива, можете да поискате такава от нас директно.`

const contentEn = `More than six months since Bulgaria officially joined the eurozone, Sofia's property market is starting to show a clearer picture for 2026. Here's our honest read on current prices, interest rates, and trends — no exaggeration, no panic.

**Average Prices: Around €2,680–2,700/sqm**
According to market data for the first quarter of 2026, the average price of actual closed transactions for Sofia apartments reached roughly €2,680 per square meter, with asking prices sitting close to €2,700/sqm. For comparison, levels at the start of 2025 were noticeably lower — the growth of the past two years remains substantial, even as it starts to cool.

**Market Activity: Fewer Deals, More Supply**
The number of completed transactions in Q1 2026 was around 10% lower than the same period in 2025, while market supply grew by more than 25%. That means more choice for buyers and less pressure to decide instantly — good news if you're looking for a property without rushing.

**Prices by Neighborhood**
Differences between districts remain significant. In Lozenets, Ivan Vazov, Oborishte, and the city center, asking prices range between €3,000 and €4,500/sqm. In Lyulin, Obelya, Nadezhda, and the more outlying parts of Druzhba and Ovcha Kupel, prices remain considerably more accessible — between €1,650 and €2,250/sqm for new construction. Panel and EPK apartments needing renovation on the secondary market typically trade for €2,500–2,600/sqm, while renovated brick apartments often exceed €3,000/sqm.

**Mortgage Rates After the Euro**
One of the most common questions we get lately is how the euro has affected lending. According to the Bulgarian National Bank, the average interest rate on new residential loans in early 2026 was around 2.46%, with an APR of roughly 2.74%. The rate environment is now directly tied to European Central Bank decisions, whose deposit facility rate stands at 2.00%. It's worth knowing that over 90% of mortgages in Bulgaria carry a floating rate — meaning future ECB policy changes will directly affect monthly payments.

**What to Expect for the Rest of 2026**
Analysts expect more moderate annual price growth in the 5-10% range for Sofia — far from the sharp jumps of 2024-2025, but still a positive trend. For sellers, that means it's still a good time to realize a profit; for buyers, it means the market is no longer as "overheated" as it was a year ago.

At New Key Properties, we track these numbers every week — not because we love statistics, but because we want to give you an honest, real-time picture before you decide to buy, sell, or rent. If you'd like a specific, free valuation of your property based on current market levels, just ask us directly.`

const doc = {
  _type: 'blogPost',
  title: 'Пазарът на Имоти в София — Лято 2026: По-Умерен Ръст и Ниски Лихви',
  titleEn: 'Sofia Property Market — Summer 2026: Slower Growth, Steady Rates',
  slug: { _type: 'slug', current: 'pazarat-na-imoti-sofia-lyato-2026' },
  excerpt: 'Средните цени в София достигат около €2 680–2 700 на кв.м, а ипотечните лихви остават под 3% след въвеждането на еврото. Разглеждаме какво се случва с пазара в средата на 2026 г. — и какво означава това за купувачи и продавачи.',
  excerptEn: 'Average prices in Sofia have reached roughly €2,680–2,700/sqm, while mortgage rates remain under 3% following euro adoption. Here’s an honest look at where the market stands in mid-2026 — and what it means for buyers and sellers.',
  content: contentBg,
  contentEn,
  date: '2026-07-11',
  category: 'Пазарен анализ',
  externalImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80',
}

const created = await client.create(doc)
console.log('✅  Created blog post:', created._id, created.slug.current)
