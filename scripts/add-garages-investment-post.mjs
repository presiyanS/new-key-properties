/**
 * Adds a new blog post: garages/parking spaces as a distinct investment
 * class in Sofia, tied to the city's blocked 2026 parking reform.
 * Replaces the earlier Ovcha Kupel neighborhood-deep-dive draft, which
 * Presiyan pointed out duplicates the site's dedicated /kvartali section
 * (that draft was deleted from Sanity - see git history for the old script).
 *
 * Facts checked 2026-09-28 via web search against: bta.bg, sofia.bg. Landed
 * as a Sanity DRAFT so Presiyan can review before publishing.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/add-garages-investment-post.mjs
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

const slug = 'garazhi-parkomesta-investitsiya-sofia-2026'

const content = `Паркирането в София е тема, която предизвиква спорове от години - и 2026 г. не направи изключение. През ноември 2025 г. Столичният общински съвет прие най-мащабната реформа на синята и зелената зона от 20 години насам: по-високи часови тарифи, разширение на зоните към нови квартали и по-скъпи стикери за живущи. Реформата така и не влезе в сила - на 24 март 2026 г. Върховният административен съд окончателно спря промените, приемайки, че биха причинили „съществени и трудно поправими вреди“ на живущите. Резултатът: старите граници на зоните и досегашните тарифи остават в сила засега. Но за собствениците на имоти в София посланието е по-важно от изхода на едно конкретно съдебно дело - Общината вече показа накъде се движи, дори временно спряна от съда.

**Защо блокираната реформа не е краят на историята**

Съдът спря конкретната реформа заради процедурата и риска от вреди за живущите, а не защото прецени, че Столична община няма нужда от по-добро управление на паркирането. Самото предложение мина през обществено обсъждане с над 22 000 подадени мнения на граждани и събра мнозинство в Общинския съвет. Това е ясен знак, че разширяването на платените зони и по-високите тарифи остават посоката, в която се движи градът - въпросът е кога, не дали, ще се случи следващ опит. За собственици и купувачи на имоти това означава, че разчитането единствено на безплатно улично паркиране в дългосрочен план носи известен риск, докато собствен гараж или паркомясто остава сигурност, независимо от изхода на бъдещи общински решения.

**Какво струва гараж или паркомясто в София в момента**

По данни от основните имотни портали в страната, цените на гаражите в София варират широко в зависимост от локацията и размера - от порядъка на 20 000 до 50 000 евро за типичен единичен гараж в жилищен комплекс, като по-малки паркоместа в подземни паркинги могат да се намерят и на по-ниски цени. В New Key Properties в момента предлагаме два гаража за продажба - в Дружба 2 за 42 000 евро и в Центъра за 52 000 евро, като разликата в цената отразява основно локацията - централните части на София традиционно носят по-висока премия и за паркоместа, не само за жилища.

**Защо гаражът е различен тип актив от апартамента**

За разлика от апартамент под наем, гаражът или паркомястото не изисква поддръжка на инсталации, ремонти между наематели или управление на самия наемен процес - това е сравнително пасивен актив с ниски текущи разходи. От друга страна, абсолютната възвръщаемост в евро е по-ниска от тази на жилищен имот, а пазарът е по-тесен - купувачите обикновено са собственици на апартамент в същата сграда или квартал, които вече имат нужда от конкретно място, а не инвеститори, търсещи произволен актив някъде в града. Това прави продажбата понякога по-бавна, но пък търсенето е стабилно и предвидимо - хората купуват кола преди да купят инвестиционен имот, а не обратното.

**За кого е подходяща тази инвестиция**

Гараж или паркомясто е добър избор за собственици на апартаменти в сгради без достатъчно паркоместа, които искат да разрешат собствен проблем и същевременно да инвестират в имот с ниска поддръжка. Също така е разумна допълнителна инвестиция за хора, които вече имат жилищен имот за отдаване под наем в централните части на София, където паркирането е ограничено и платено - апартамент с включено паркомясто е по-лесен за отдаване под наем на по-висока цена от сходен апартамент без такова.

**Заключение**

Независимо дали следващият опит за реформа на паркирането в София ще мине през съда, посоката е ясна - платеното и регулирано паркиране в столицата ще расте, не ще намалява. Собствен гараж или паркомясто остава сигурен, нискорисков актив в този контекст. Ако разглеждате покупка на гараж или паркомясто в София, свържете се с нас на 0879 826 292 - в момента имаме активни обяви в Дружба 2 и Центъра, а работим с ограничен брой клиенти на месец именно за да отделим достатъчно внимание на всяка сделка.`

const contentEn = `Parking in Sofia has been a contentious topic for years - and 2026 was no exception. In November 2025, the Sofia Municipal Council approved the largest reform of the blue and green parking zones in 20 years: higher hourly rates, an expansion of the zones into new districts, and pricier resident permits. The reform never actually took effect - on 24 March 2026, the Supreme Administrative Court permanently blocked the changes, ruling that they would cause "significant and difficult-to-remedy harm" to residents. The result: the old zone boundaries and existing rates remain in force for now. But for property owners in Sofia, the message matters more than the outcome of any single court case - the Municipality has already shown which direction it's heading, even if temporarily stopped by the court.

**Why the blocked reform isn't the end of the story**

The court blocked this specific reform over procedure and the risk of harm to residents, not because it decided Sofia Municipality doesn't need better parking management. The proposal itself went through public consultation with over 22,000 citizen submissions and secured a majority in the Municipal Council. That's a clear sign that expanding paid zones and raising rates remains the direction the city is heading - the question is when, not whether, the next attempt will come. For property owners and buyers, that means relying solely on free street parking carries some long-term risk, while owning a garage or parking space remains a hedge, regardless of how future municipal decisions play out.

**What a garage or parking space costs in Sofia right now**

According to the country's major property portals, garage prices in Sofia vary widely depending on location and size - roughly from €20,000 to €50,000 for a typical single garage in a residential complex, with smaller spaces in underground parking lots sometimes available for less. At New Key Properties we currently have two garages for sale - one in Druzhba 2 for €42,000 and one in the city Center for €52,000, with the price difference reflecting mainly location - Sofia's central areas traditionally carry a higher premium for parking too, not just for housing.

**Why a garage is a different kind of asset than an apartment**

Unlike a rental apartment, a garage or parking space doesn't require maintaining utilities, repairs between tenants, or managing a rental relationship - it's a comparatively passive asset with low ongoing costs. On the other hand, absolute returns in euro terms are lower than for a residential property, and the market is narrower - buyers are typically owners of an apartment in the same building or neighborhood who already need a specific spot, rather than investors looking for any asset anywhere in the city. That can make a sale slower, but demand tends to be stable and predictable - people buy a car before they buy an investment property, not the other way around.

**Who this investment suits**

A garage or parking space is a good choice for apartment owners in buildings without enough parking who want to solve their own problem while investing in a low-maintenance property. It's also a sensible add-on investment for people who already own a rental apartment in central Sofia, where parking is limited and paid - an apartment with an included parking space is easier to rent out at a higher price than a comparable one without.

**Conclusion**

Whether or not the next attempt to reform parking in Sofia survives the courts, the direction is clear - paid, regulated parking in the capital is set to expand, not shrink. Owning a garage or parking space remains a secure, low-risk asset in that context. If you're considering buying a garage or parking space in Sofia, contact us at 0879 826 292 - we currently have active listings in Druzhba 2 and the Center, and we work with a limited number of clients per month specifically so we can give each deal the attention it deserves.`

const researchNotes = `Тема: сменена на 2026-09-28 по искане на Presiyan - първоначалната тема (задълбочен анализ на квартал Овча купел) дублираше съществуващата секция /kvartali (тип "neighborhood" в Sanity, вече има отделна страница за Овча купел). Старата чернова беше изтрита от Sanity (drafts.3f827d879cb8882963799cdc).

Нова тема: гаражи/паркоместа като отделен клас инвестиция - избрана, защото (1) не е покривана досега в блога, (2) не е квартален анализ, (3) имаме реални активни обяви за гаражи (NK-1001, NK-1045) за естествена връзка към бизнеса.

Изследването е направено с WebSearch/WebFetch инструментите на Claude Code, не през автоматизирания cron. Всеки конкретен източник е изрично назован в текста.

ФАКТИ С ДВЕ НЕЗАВИСИМИ ПОТВЪРЖДЕНИЯ:
- Реформата на паркирането (по-високи тарифи, разширение на зоните) е приета от Столичния общински съвет през ноември 2025 г. и е трябвало да влезе в сила от 5 януари 2026 г. - потвърдено от bta.bg (няколко отделни новини: позиция на КЗП, несъгласие на ресторантьори, решение на СОС) И от search резултати, цитиращи официалния сайт sofia.bg. Реформата е ОКОНЧАТЕЛНО спряна от Върховния административен съд на 24 март 2026 г., преди да влезе в сила - потвърдено директно от bta.bg статията за решението на ВАС (https://www.bta.bg/bg/news/bulgaria/1090960-...), която цитира и мотива на съда ("съществени и трудно поправими вреди"). Старите граници на зоните и тарифи остават в сила - изрично посочено в същата статия.
- Обществено обсъждане с над 22 000 подадени мнения преди приемането на реформата - потвърдено от заглавието на sofia.bg страница ("...базирани на мнението на над 22 000 граждани").

ФАКТИ С ЕДИН/АГРЕГИРАН ИЗТОЧНИК (представени внимателно, не като точна статистика):
- Ценови диапазон за гаражи в София (~20 000-50 000 евро) - агрегирано от WebSearch резултат, обобщаващ обяви в BulgarianProperties, Imot.bg, Alo.bg, Bazar.bg, Suprimmo - представено в статията като общ пазарен диапазон от порталите, не като официален индекс.
- Старата тарифа за синя зона (2 лв./час от 2012 г., непроменена преди реформата) - спомената само за контекст в изследването, НЕ Е ИЗПОЛЗВАНА в самата статия като конкретно евро число, защото точният конвертиран курс след еврото не е директно потвърден от официален източник в рамките на това търсене - избегнато е да се посочи неточна цифра.
- Активни гаражи на New Key Properties: NK-1001 (Дружба 2, 42 000 евро), NK-1045 (Център, 52 000 евро) - вътрешни данни от production Sanity, проверени директно преди писане.

Проверих пълното съдържание на всички съществуващи статии в блога за темата "гараж"/"паркомясто" преди писане - само бегло споменаване в "Кой квартал в София е най-добър за инвестиция" (паркоместа в контекста на инвестиция в апартамент), няма самостоятелна статия за гаражи/паркоместа като актив.

Публикувано като чернова (draft) - моля прегледайте преди да публикувате.`

const draftId = `drafts.${crypto.randomBytes(12).toString('hex')}`

const doc = {
  _id: draftId,
  _type: 'blogPost',
  title: 'Гаражи и паркоместа в София: защо остават сигурна инвестиция',
  titleEn: 'Garages and parking spaces in Sofia: why they remain a safe investment',
  slug: { _type: 'slug', current: slug },
  excerpt: 'Съдът спря реформата на паркирането в София, но посоката е ясна - платеното паркиране ще расте. Разглеждаме цените на гаражите и паркоместата в столицата и защо остават нискорисков, стабилен актив.',
  excerptEn: "The court blocked Sofia's parking reform, but the direction is clear - paid parking is set to expand. We look at garage and parking-space prices in the capital and why they remain a low-risk, stable asset.",
  content,
  contentEn,
  date: '2026-09-28',
  category: 'Инвестиции',
  externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Business_Park_Sofia_E1.jpg',
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
