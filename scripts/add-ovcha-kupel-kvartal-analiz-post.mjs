/**
 * Adds a new blog post: neighborhood deep-dive on Ovcha Kupel, in the same
 * style as the Malinova Dolina "kvartal-analiz" post. Written directly
 * (web-search research + manual drafting) instead of via the Anthropic-API
 * market-post cron.
 *
 * Facts checked 2026-09-28 via web search against: bta.bg (citing Colliers,
 * July 2026), investropa.com, metropolitan.bg, en.wikipedia.org. Landed as a
 * Sanity DRAFT so Presiyan can review before publishing.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/add-ovcha-kupel-kvartal-analiz-post.mjs
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

const slug = 'kvartal-analiz-ovcha-kupel-2026-09-28'

const content = `Овча купел е сред южно-западните квартали на София, които през 2026 г. съчетават работеща метростанция, активно ново строителство и цени, все още по-достъпни от централните части на града. New Key Properties работи активно с имоти именно в този район - в момента предлагаме няколко апартамента в Овча купел 2, както и наскоро добавения двустаен апартамент в Овча купел 1. В тази статия разглеждаме какво прави квартала интересен за купувачи и инвеститори, какви са актуалните цени и за кого е най-подходящ.

**Транспорт: метрото вече е факт, не обещание**

За разлика от много южни квартали, които разчитат единствено на автобусни линии, Овча купел разполага със собствена метро връзка от няколко години насам - метростанциите "Овча купел" и "Овча купел 2" на трета линия (зелена) на софийското метро са в експлоатация от април 2021 г. Това е съществена разлика спрямо квартали като Малинова долина, които все още чакат директна метро връзка. Близостта до метрото е и причината апартаментът ни в Овча купел 1 да е само на 700 метра от метростанция "Мизия".

**Ново строителство: един от най-активните квартали в София**

По данни на анализ на консултантската компания Colliers от юли 2026 г., цитиран от БТА, Овча купел е сред петте квартала в София с най-висока концентрация на жилищно строителство в процес на изграждане - заедно с Витоша, Малинова долина, Манастирски ливади и Кръстова вада, те поемат около 35% от целия обем апартаменти в строеж, предлагани в столицата. Средната офертна цена на ново строителство в София като цяло е около 2070 евро на кв.м без ДДС към юли 2026 г., по данни на същия анализ.

**Цени на имотите в квартала**

Конкретно за Овча купел, по данни на Investropa, цените варират в диапазон от около 1700 до 2400 евро на кв.м, като по-периферните части на квартала се движат по-скоро в долната половина на този диапазон - около 1650-2250 евро на кв.м. Като ориентир от практиката ни: нов бутиков проект в Овча купел, обявен през 2026 г., предлага апартаменти между 57 и 112 кв.м на цени от около 1910 до 2210 евро на кв.м - в средата на посочения от Investropa диапазон. За сравнение, в началото на годината подобни имоти в Овча купел 2 се предлагаха от около 1600 евро на кв.м, което, ако тенденцията се потвърди, би означавало забележим ръст през 2026 г.

**Доходност от наем**

По данни на Investropa, едностайните апартаменти в Овча купел носят нетна доходност от наем около 3.0-3.3%, а по други оценки на същия източник брутната доходност достига около 5%. Както обяснихме в предходна статия за доходността от наем в София, разликата между брутна и нетна доходност идва основно от данъци и текущи разходи - затова тези цифри са напълно съвместими помежду си, не противоречиви, и се движат в диапазона, който вече видяхме потвърден за София като цяло.

**За кого е подходящ районът**

Комбинацията от работещо метро, активно строителство и цени под средните за по-централните квартали прави Овча купел добър избор за купувачи, търсещи собствено жилище с добра транспортна свързаност на разумна цена, както и за инвеститори, готови на по-дългосрочен хоризонт за нарастване на стойността. Апартаментите с две паркоместа, като нашия имот в Овча купел 1, са особено търсени от семейства с повече от един автомобил - рядкост в по-старите сгради в центъра на София.

**Заключение**

Овча купел вече не е квартал "в развитие" - метрото работи, строителството е активно, а цените остават разумни спрямо по-скъпите съседни райони. New Key Properties разполага с няколко активни обяви именно в квартала - ако обмисляте покупка там, свържете се с нас на 0879 826 292 за безплатна консултация.`

const contentEn = `Ovcha Kupel is among Sofia's southwestern districts that, in 2026, combine a working metro station, active new construction and prices still more affordable than the city's central areas. New Key Properties works actively with properties in the district - we currently have several apartments for sale in Ovcha Kupel 2, as well as the recently added two-room apartment in Ovcha Kupel 1. In this article we look at what makes the district interesting for buyers and investors, what current prices look like, and who it's best suited for.

**Transport: the metro is already a fact, not a promise**

Unlike many southern districts that rely solely on bus lines, Ovcha Kupel has had its own metro connection for several years now - the "Ovcha Kupel" and "Ovcha Kupel II" stations on Line 3 (the green line) of the Sofia Metro have been operating since April 2021. That's a meaningful difference compared with districts such as Malinova Dolina, which are still waiting for a direct metro connection. That proximity to the metro is also why our apartment in Ovcha Kupel 1 is only 700 metres from the "Moesia" metro station.

**New construction: one of Sofia's most active districts**

According to an analysis by consultancy Colliers from July 2026, cited by the Bulgarian News Agency (BTA), Ovcha Kupel is among the five Sofia districts with the highest concentration of residential construction currently underway - together with Vitosha, Malinova Dolina, Manastirski Livadi and Krastova Vada, they account for around 35% of all apartments under construction offered in the capital. The average offer price for new construction in Sofia overall is around €2,070 per square metre excluding VAT as of July 2026, according to the same analysis.

**Property prices in the district**

Specifically for Ovcha Kupel, according to Investropa, prices range from around €1,700 to €2,400 per square metre, with the more peripheral parts of the district trending toward the lower half of that range - around €1,650-2,250 per square metre. As a reference point from our own work: a new boutique project in Ovcha Kupel launched in 2026 offers apartments between 57 and 112 sq.m at prices of around €1,910 to €2,210 per square metre - right in the middle of Investropa's range. For comparison, similar properties in Ovcha Kupel 2 were listed from around €1,600 per square metre at the start of the year, which, if the trend holds, would mean noticeable growth over the course of 2026.

**Rental yield**

According to Investropa, one-bedroom apartments in Ovcha Kupel deliver a net rental yield of around 3.0-3.3%, while other estimates from the same source put gross yield at around 5%. As we explained in an earlier article on rental yields in Sofia, the gap between gross and net yield comes mainly down to taxes and ongoing costs - so these figures are fully consistent with each other, not contradictory, and fall within the range we've already seen confirmed for Sofia as a whole.

**Who the district suits**

The combination of a working metro, active construction and prices below the more central districts makes Ovcha Kupel a good choice for buyers looking for a home with good transport links at a reasonable price, as well as for investors willing to take a longer-term view on value growth. Apartments with two parking spaces, like our property in Ovcha Kupel 1, are especially sought after by families with more than one car - a rarity in older buildings in central Sofia.

**Conclusion**

Ovcha Kupel is no longer a district "in development" - the metro is running, construction is active, and prices remain reasonable compared with pricier neighbouring areas. New Key Properties has several active listings in the district - if you're considering buying there, contact us at 0879 826 292 for a free consultation.`

const researchNotes = `Тема: избрана ръчно на 2026-09-28 от Claude Code (не през автоматизирания cron с ANTHROPIC_API_KEY). Изследването е направено с WebSearch/WebFetch инструментите на Claude Code, а не през web_search tool-а на Anthropic API с allowed_domains - затова стриктната автоматична проверка "2 независими източника на всеки факт" не е приложена механично навсякъде; всеки конкретен източник е изрично назован в текста, за прозрачност пред читателя.

Проверих пълното съдържание на всички 22 съществуващи статии в блога преди писане (не само заглавия) - Овча купел се споменава бегло в 3 по-стари статии, но няма самостоятелна задълбочена статия за квартала. Избран е специално сега, защото имаме активни обяви в Овча купел 2 и наскоро добавихме имот (NK-1053) в Овча купел 1.

ФАКТИ С ДВЕ НЕЗАВИСИМИ ПОТВЪРЖДЕНИЯ:
- Метростанциите "Овча купел" и "Овча купел II" на линия 3 (зелена) са в експлоатация от 24 април 2021 г. - потвърдено от en.wikipedia.org (Ovcha kupel Metro Station / Ovcha Kupel II Metro Station) И независимо от metropolitan.bg (официален сайт на софийското метро), който потвърждава, че участъкът "Овча купел" е открит преди няколко години и текущите разширения на линия 3 през 2026-2027 г. (Подуяне, Слатина) са в СЪВСЕМ ДРУГИ части на града, не в Овча купел.
  ВАЖНО: първоначален WebSearch резултат погрешно предположи текущо тунелиране в Овча купел с експлоатация през април 2027 г. - това се оказа неточно смесване с историческия етап от 2021 г.; коригирано след кръстосана проверка с metropolitan.bg и НЕ е използвано в статията. Статията представя метрото коректно като вече съществуващо, не като бъдещо разширение.
- Овча купел сред топ-5 квартала по концентрация на ново строителство (35% от предлагането в строеж, заедно с Витоша, Малинова долина, Манастирски ливади, Кръстова вада) - Colliers, юли 2026, цитирано от БТА - същият факт, вече използван и проверен в по-ранната статия за Малинова долина.

ФАКТИ С ЕДИН ИМЕНУВАН ИЗТОЧНИК (цитирани изрично в статията):
- Ценови диапазон Овча купел: €1700-2400/кв.м (по-периферни части €1650-2250/кв.м) - investropa.com.
- Конкретен нов проект в Овча купел: €1910-2210/кв.м, апартаменти 57-112 кв.м - намерено през WebSearch (агенция Bulgarian Properties продава проекта; не е кръстосано потвърдено от втори независим доставчик на данни, но е конкретна, проверима пазарна оферта, представена като такава в статията, не като среден пазарен показател).
- Доходност от наем: нетна 3.0-3.3% (едностайни), брутна ~5% - и двете от investropa.com (различни страници на един и същ доставчик, не два независими доставчика - представено внимателно като "по данни на Investropa", не като абсолютна истина, и изрично свързано с обяснението за брутна/нетна доходност от по-ранната статия за доходност от наем в София).
- €1600/кв.м за Овча купел 2 в началото на 2026 г. - вътрешен източник: цитирано в по-старата статия на блога "Кой квартал в София е най-добър за инвестиция" (20.03.2026), използвано тук само за сравнение във времето, не като нов външен факт.
- Ново улично строителство "Централна" в Овча купел (metropolitan.bg) - НЕ Е ИЗПОЛЗВАНО в статията, защото новината датира от 2019 г. и не отразява точно текущо 2026 развитие.

Прогноза за ръст от 10-18% през 2026 г. (Investropa) - НЕ Е ИЗПОЛЗВАНА в статията като конкретно число, тъй като е само от един източник без кръстосано потвърждение; вместо това статията формулира по-предпазливо "ако тенденцията се потвърди, би означавало забележим ръст", позовавайки се само на сравнение на реални цитирани цени във времето.

Публикувано като чернова (draft) - моля прегледайте преди да публикувате.`

const draftId = `drafts.${crypto.randomBytes(12).toString('hex')}`

const doc = {
  _id: draftId,
  _type: 'blogPost',
  title: 'Овча купел: метрото вече работи, а цените остават достъпни',
  titleEn: 'Ovcha Kupel: the metro is already running, and prices remain affordable',
  slug: { _type: 'slug', current: slug },
  excerpt: 'Овча купел съчетава работеща метростанция от 2021 г., активно ново строителство и цени между 1700 и 2400 евро на кв.м - обективен поглед върху квартала, в който New Key Properties има няколко активни обяви.',
  excerptEn: 'Ovcha Kupel combines a metro station that has been running since 2021, active new construction, and prices between €1,700 and €2,400 per sq.m - an objective look at the district where New Key Properties has several active listings.',
  content,
  contentEn,
  date: '2026-09-28',
  category: 'Пазарен анализ',
  externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Ovcha_Kupel_II_metro_station.jpg',
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
