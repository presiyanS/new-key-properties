/**
 * Refreshes all 9 neighborhood guides (October 2026): current prices, factual
 * corrections, spelling fixes, and matching English translations.
 *
 * Why: the guides were last edited 2026-07-11. An audit found prices well below
 * the current market, prices that contradicted each other within the same guide
 * (price box vs FAQ), and factual errors - e.g. "МОЛ Марково тепе" (Plovdiv) in
 * Druzhba, the wrong metro lines for Druzhba (M4, not M1) and Ovcha kupel (M3,
 * not M2), Manastirski livadi placed on boulevards that belong to Ovcha kupel,
 * Mladost described as next to Borisova gradina, and a Dragalevtsi lift that
 * hasn't run since 2017.
 *
 * Sources (checked 2026-10-14):
 * - Sale prices: asking-price medians on imot.bg (as of 8.10.2026) and alo.bg
 *   (as of 14.10.2026), 2- and 3-room apartments; cross-checked against the
 *   Best Place Q1 2026 review. Ranges below span both sources, rounded to 50.
 * - Rents: monthly asking-price medians on imot.bg and alo.bg, same dates.
 * - Year-on-year changes: АДРЕС Q3 2026 via dbr.bg (6.10.2026), also reported by sofia24.bg.
 * - Facts: bg.wikipedia.org neighborhood + "Софийско метро" articles, Sofia
 *   Municipality (Malinova dolina kindergarten), BTA + skiresort.info (lift),
 *   capital.bg 2016 + Wikipedia (Dragalevtsi sewerage), novinite.com (planned M2 extension).
 * - Bus line numbers were removed because the current numbers couldn't be confirmed.
 *
 * Writes each guide as a Sanity DRAFT (drafts.<id>) - nothing goes live until
 * the drafts are reviewed and published in Studio.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/refresh-neighborhoods-2026-10.mjs
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

const faq = (items) => items.map(([question, questionEn, answer, answerEn], i) => ({
  _key: `faq-${i}`, _type: 'faqItem', question, questionEn, answer, answerEn,
}))

const updates = {
  // ───────────────────────────── Драгалевци ─────────────────────────────
  'neighborhood-dragalevtsi': {
    tagline: 'Тих квартал в подножието на Витоша, на около 7 км от центъра на София.',
    taglineEn: 'A quiet neighborhood at the foot of Vitosha, about 7 km from central Sofia.',
    description: `Драгалевци е квартал в подножието на Витоша, част от район "Витоша" на Столична община. Намира се между кварталите Бояна и Симеоново, близо до Околовръстния път, на около 7 км от центъра на града. До 1961 г. Драгалевци е отделно село, а днес е един от най-търсените квартали за хора, които искат да живеят близо до планината.

Над квартала се намира Драгалевският манастир, основан през XIV век по времето на цар Иван Александър. Той е едно от най-посещаваните места за разходка през уикенда, а от квартала започват и туристически пътеки към Витоша.

Застрояването е предимно ниско - еднофамилни къщи, вили с дворове, комплекси от къщи с контролиран достъп и малки бутикови жилищни сгради. Новите сгради често предлагат гледка към Витоша и към града. Панелни блокове практически няма.

В квартала има държавно училище (50 ОУ "Васил Левски"), частно училище и няколко частни детски градини, както и магазини, ресторанти и хотели. Основната връзка с центъра е бул. "Черни връх", по който автобусите стигат до метростанция "Витоша" (линия М2). В ежедневието повечето жители разчитат на собствен автомобил.`,
    descriptionEn: `Dragalevtsi is a neighborhood at the foot of Mount Vitosha, part of Sofia's Vitosha district. It lies between the Boyana and Simeonovo neighborhoods, close to the Ring Road, about 7 km from the city center. Until 1961 Dragalevtsi was a separate village; today it is one of the most sought-after areas for people who want to live close to the mountain.

Above the neighborhood stands the Dragalevtsi Monastery, founded in the 14th century during the reign of Tsar Ivan Alexander. It is one of the most popular weekend walking destinations, and hiking trails to Vitosha start from the neighborhood.

The area is mostly low-rise - single-family houses, villas with gardens, gated house complexes and small boutique apartment buildings. New buildings often have views of Vitosha and the city. There are practically no panel blocks.

The neighborhood has a state school (50th Primary School "Vasil Levski"), a private school and several private kindergartens, as well as shops, restaurants and hotels. The main link to the center is Cherni Vrah Blvd., where buses run to Vitosha metro station (line M2). In everyday life most residents rely on a car.`,
    transport: 'Основната връзка с центъра е бул. "Черни връх". Автобусните линии по него стигат до метростанция "Витоша" (линия М2), която е най-близката до квартала. В ежедневието повечето жители използват собствен автомобил.',
    transportEn: 'The main link to the center is Cherni Vrah Blvd. Bus lines along it reach Vitosha metro station (line M2), the closest station to the neighborhood. In everyday life most residents use a car.',
    priceRangeSale: '2 750 – 2 900 €/кв.м',
    priceRangeRent: '700 – 1 100 €/мес.',
    targetAudience: 'Семейства, които търсят тишина, зеленина и близост до Витоша, и купувачи на къщи или апартаменти в малки бутикови сгради.',
    targetAudienceEn: 'Families looking for quiet, greenery and proximity to Vitosha, and buyers of houses or apartments in small boutique buildings.',
    pros: [
      'Непосредствена близост до Витоша, Драгалевския манастир и туристическите пътеки',
      'Ниско застрояване - къщи, вили и малки жилищни сгради',
      'Гледки към планината и към града от много от имотите',
      'Държавно и частно училище и частни детски градини в квартала',
    ],
    prosEn: [
      'Right next to Vitosha, the Dragalevtsi Monastery and the hiking trails',
      'Low-rise buildings - houses, villas and small apartment buildings',
      'Mountain and city views from many properties',
      'A state school, a private school and private kindergartens in the neighborhood',
    ],
    cons: [
      'Няма метро - най-близката метростанция е "Витоша" и в ежедневието е нужен автомобил',
      'Канализационната мрежа в части от квартала исторически е непълна - при покупка на къща или парцел проверете връзката с канализацията',
      'Драгалевският седалков лифт не работи от 2017 г. - до ски зоната се стига с кола или пеша',
    ],
    consEn: [
      'No metro - the nearest station is Vitosha, and a car is needed for everyday life',
      'The sewerage network has historically been incomplete in parts of the neighborhood - when buying a house or plot, check the sewer connection',
      'The Dragalevtsi chairlift has not operated since 2017 - the ski area is reached by car or on foot',
    ],
    metaDescription: 'Драгалевци - тих квартал в подножието на Витоша. Актуални цени на апартаменти и наеми към октомври 2026, транспорт, училища, плюсове и минуси.',
    metaDescriptionEn: 'Dragalevtsi - a quiet Sofia neighborhood at the foot of Vitosha. Apartment prices and rents as of October 2026, transport, schools, pros and cons.',
    faq: faq([
      [
        'Какви са цените на имотите в Драгалевци?',
        'What are property prices like in Dragalevtsi?',
        'По данни от обявите в imot.bg и alo.bg към октомври 2026 г. средната цена на предлагане на двустаен и тристаен апартамент в Драгалевци е около 2 750 – 2 900 €/кв.м. Къщите и имотите с големи дворове се оценяват отделно и често са значително по-скъпи. Реалните сделки обикновено се сключват малко под цената в обявата. Типичният наем е около 700 € на месец за двустаен и около 1 000 – 1 100 € за тристаен апартамент.',
        'According to listings on imot.bg and alo.bg as of October 2026, the average asking price for two- and three-room apartments in Dragalevtsi is around €2,750–2,900/sq.m. Houses and properties with large gardens are priced separately and are often significantly more expensive. Actual sales usually close slightly below the asking price. Typical rent is around €700 a month for a two-room and around €1,000–1,100 for a three-room apartment.',
      ],
      [
        'Има ли метро до Драгалевци?',
        'Is there a metro to Dragalevtsi?',
        'Не. Най-близката метростанция е "Витоша" (линия М2) на бул. "Черни връх", до която стигат автобусите от квартала. В плановете на Столична община има бъдеща метростанция "Драгалевци", но тя е в далечна перспектива и няма срок за изграждане.',
        'No. The nearest metro station is Vitosha (line M2) on Cherni Vrah Blvd., which buses from the neighborhood reach. Sofia Municipality\'s plans include a future Dragalevtsi station, but it is a long-term prospect with no construction date.',
      ],
      [
        'Какви имоти има в Драгалевци?',
        'What kinds of properties are there in Dragalevtsi?',
        'Преобладават еднофамилни къщи, вили с дворове и комплекси от къщи с контролиран достъп. През последните години се строят и малки бутикови жилищни сгради с апартаменти, често с гледка към Витоша. Панелни блокове практически няма.',
        'The area is dominated by single-family houses, villas with gardens and gated house complexes. In recent years small boutique apartment buildings have also been built, often with views of Vitosha. There are practically no panel blocks.',
      ],
      [
        'На какво да обърна внимание при покупка на къща в Драгалевци?',
        'What should I check when buying a house in Dragalevtsi?',
        'Освен стандартната проверка на документите, проверете дали имотът е свързан с канализацията - в части от квартала мрежата исторически е непълна. Проверете също дали улицата до имота е асфалтирана и дали има осигурено паркиране. Ако имате нужда от помощ, ще прегледаме имота и документите заедно с Вас.',
        'Besides the standard document checks, find out whether the property is connected to the sewer system - the network has historically been incomplete in parts of the neighborhood. Also check whether the street to the property is paved and whether parking is provided. If you need help, we will review the property and the documents together with you.',
      ],
    ]),
  },

  // ───────────────────────────── Дружба ─────────────────────────────
  'neighborhood-druzhba': {
    tagline: 'Голям жилищен комплекс с метро, езеро и по-достъпни цени.',
    taglineEn: 'A large residential area with a metro, a lake and more affordable prices.',
    description: `Дружба е голям жилищен комплекс в Югоизточна София и основната част от район "Искър". Граничи с Младост, Горубляне, Слатина и Летище София. Строителството на комплекса започва през 1970 г.

Дружба се дели на две части. Дружба 1 е по-старата - тук са пазарът, повечето обществени институции и езерото, около което има място за разходка и спорт. Дружба 2 е по-новата част и е разделена на микрорайони. По-старите сгради са предимно панелни, а в района на Дружба 2 се строят и нови жилищни сгради.

Голямо предимство на квартала е метрото. От 2015 г. в Дружба има две метростанции - "Дружба" и "Искърско шосе" (линия М4). Линията минава през центъра на града (метростанция "Сердика") и стига директно до Летище София. Наблизо минава и бул. "Цариградско шосе", а до квартала е и Интер Експо Център.

В квартала има няколко училища, диагностично-консултативен център и големи магазини. Цените са по-ниски от тези в южните и централните квартали, което прави Дружба добър избор за купувачи с по-ограничен бюджет и за инвеститори, които отдават имоти под наем.`,
    descriptionEn: `Druzhba is a large residential area in southeastern Sofia and the main part of the Iskar district. It borders Mladost, Gorublyane, Slatina and Sofia Airport. Construction of the complex began in 1970.

Druzhba is split into two parts. Druzhba 1 is the older one - home to the market, most public institutions and the lake, which offers space for walks and sport. Druzhba 2 is the newer part and is divided into micro-districts. The older buildings are mostly panel blocks, while new apartment buildings are going up around Druzhba 2.

The metro is a major advantage. Since 2015 Druzhba has had two metro stations - Druzhba and Iskarsko Shose (line M4). The line runs through the city center (Serdika station) and directly to Sofia Airport. Tsarigradsko Shose Blvd. runs nearby, and Inter Expo Center is next to the neighborhood.

The area has several schools, a diagnostic and consultation center and large stores. Prices are lower than in the southern and central neighborhoods, which makes Druzhba a good choice for buyers on a tighter budget and for investors renting out property.`,
    transport: 'Две метростанции на линия М4 - "Дружба" и "Искърско шосе". Линията стига директно до центъра (метростанция "Сердика") и до Летище София. Наблизо минава бул. "Цариградско шосе", а кварталът се обслужва и от автобусни линии.',
    transportEn: 'Two metro stations on line M4 - Druzhba and Iskarsko Shose. The line runs directly to the center (Serdika station) and to Sofia Airport. Tsarigradsko Shose Blvd. runs nearby, and the neighborhood is also served by bus lines.',
    priceRangeSale: '2 300 – 2 700 €/кв.м',
    priceRangeRent: '550 – 750 €/мес.',
    targetAudience: 'Купувачи с по-ограничен бюджет, които искат метро, млади семейства и инвеститори, търсещи имот за отдаване под наем.',
    targetAudienceEn: 'Buyers on a tighter budget who want a metro connection, young families, and investors looking for a rental property.',
    pros: [
      'Две метростанции (линия М4) с директна връзка до центъра и до Летище София',
      'По-ниски цени от южните и централните квартали',
      'Езерото в Дружба 1 - място за разходка и спорт',
      'Училища, здравен център, пазар и големи магазини в квартала',
    ],
    prosEn: [
      'Two metro stations (line M4) with a direct link to the center and to Sofia Airport',
      'Lower prices than the southern and central neighborhoods',
      'The lake in Druzhba 1 - a place for walks and sport',
      'Schools, a health center, a market and large stores in the neighborhood',
    ],
    cons: [
      'Преобладава по-старо панелно строителство',
      'По-малко заведения и магазини спрямо централните квартали',
      'Около квартала има промишлени зони',
    ],
    consEn: [
      'Mostly older panel buildings',
      'Fewer restaurants and shops than in the central neighborhoods',
      'There are industrial zones around the neighborhood',
    ],
    metaDescription: 'Дружба - жилищен комплекс в Югоизточна София с две метростанции и езеро. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Druzhba - a residential area in southeastern Sofia with two metro stations and a lake. Apartment prices and rents as of October 2026.',
    faq: faq([
      [
        'Какви са цените на имотите в Дружба?',
        'What are property prices like in Druzhba?',
        'По данни от обявите в imot.bg и alo.bg към октомври 2026 г. средната цена на предлагане на двустаен и тристаен апартамент в Дружба 1 и Дружба 2 е около 2 300 – 2 700 €/кв.м. Новото строителство обикновено е в горния край на диапазона. Реалните сделки обикновено се сключват малко под цената в обявата. Типичният наем е около 550 – 700 € на месец за двустаен и около 650 – 750 € за тристаен апартамент.',
        'According to listings on imot.bg and alo.bg as of October 2026, the average asking price for two- and three-room apartments in Druzhba 1 and Druzhba 2 is around €2,300–2,700/sq.m. New builds are usually at the top of the range. Actual sales usually close slightly below the asking price. Typical rent is around €550–700 a month for a two-room and around €650–750 for a three-room apartment.',
      ],
      [
        'Има ли метро в Дружба?',
        'Is there a metro in Druzhba?',
        'Да. От 2015 г. в квартала има две метростанции на линия М4 - "Дружба" (между Дружба 1 и Дружба 2) и "Искърско шосе" (до езерото в Дружба 1). Линията стига директно до центъра на София (метростанция "Сердика") и до Летище София.',
        'Yes. Since 2015 the neighborhood has had two stations on line M4 - Druzhba (between Druzhba 1 and Druzhba 2) and Iskarsko Shose (by the lake in Druzhba 1). The line runs directly to central Sofia (Serdika station) and to Sofia Airport.',
      ],
      [
        'Каква е разликата между Дружба 1 и Дружба 2?',
        'What is the difference between Druzhba 1 and Druzhba 2?',
        'Дружба 1 е по-старата част с пазара, повечето обществени институции и езерото. Дружба 2 е по-новата част, разделена на микрорайони, и в нея се строят и нови жилищни сгради. И двете части се обслужват от метро.',
        'Druzhba 1 is the older part, with the market, most public institutions and the lake. Druzhba 2 is the newer part, divided into micro-districts, where new apartment buildings are also going up. Both parts are served by the metro.',
      ],
      [
        'Подходящ ли е Дружба за инвестиция под наем?',
        'Is Druzhba a good choice for a rental investment?',
        'Дружба е сред по-достъпните квартали с метро, а директната връзка с летището и близостта до бул. "Цариградско шосе" привличат наематели. Наемите са по-ниски от тези в южните квартали, затова е важно да изчислите доходността спрямо конкретната цена на имота. Можем да направим тази сметка заедно с Вас.',
        'Druzhba is one of the more affordable neighborhoods with a metro, and the direct airport link and proximity to Tsarigradsko Shose Blvd. attract tenants. Rents are lower than in the southern neighborhoods, so it is important to calculate the yield against the actual property price. We can do that calculation together with you.',
      ],
    ]),
  },

  // ───────────────────────────── Кръстова вада ─────────────────────────────
  'neighborhood-krastova-vada': {
    tagline: 'Южен квартал на бул. "Черни връх" с много ново строителство.',
    taglineEn: 'A southern neighborhood on Cherni Vrah Blvd. with a lot of new construction.',
    description: `Кръстова вада е квартал в южната част на София. На север граничи с квартал Хладилника и Южния парк, на запад - с Манастирски ливади, на изток - с квартал Витоша, а на юг стига до Околовръстния път.

През квартала минава бул. "Черни връх" - една от главните връзки на южните квартали с центъра на града. Кварталът се обслужва от метростанция "Витоша" (линия М2), а в плановете за бъдещо продължение на линия М2 към Студентски град е предвидена и метростанция "Кръстова вада". Към момента тя е в етап на проектиране и няма обявен срок за изграждане.

Кръстова вада е един от кварталите с най-активно ново строителство в южната част на града. В квартала се предлагат много апартаменти в нови сгради, а цените са над средните за София, но по-ниски от тези в Лозенец.

Кварталът е подходящ за хора, които искат нов апартамент в южната част на София, близо до Южния парк и бул. "Черни връх", и за инвеститори, които отдават имоти под наем.`,
    descriptionEn: `Krastova Vada is a neighborhood in the southern part of Sofia. To the north it borders the Hladilnika neighborhood and South Park, to the west Manastirski Livadi, to the east the Vitosha neighborhood, and to the south it reaches the Ring Road.

Cherni Vrah Blvd. - one of the main links between the southern neighborhoods and the city center - runs through the neighborhood. It is served by Vitosha metro station (line M2), and plans for a future extension of line M2 toward Studentski Grad include a Krastova Vada station. That station is currently at the design stage, with no announced construction date.

Krastova Vada is one of the neighborhoods with the most active new construction in the south of the city. Many apartments in new buildings are on offer, and prices are above the Sofia average but lower than in Lozenets.

The neighborhood suits people who want a new apartment in the south of Sofia, close to South Park and Cherni Vrah Blvd., and investors who rent out property.`,
    transport: 'Метростанция "Витоша" (линия М2) и автобусни линии по бул. "Черни връх", който свързва квартала с центъра. В плановете за продължение на линия М2 е предвидена бъдеща метростанция "Кръстова вада" (към момента в етап на проектиране).',
    transportEn: 'Vitosha metro station (line M2) and bus lines along Cherni Vrah Blvd., which connects the neighborhood with the center. Plans to extend line M2 include a future Krastova Vada station (currently at the design stage).',
    priceRangeSale: '3 200 – 3 450 €/кв.м',
    priceRangeRent: '750 – 1 200 €/мес.',
    targetAudience: 'Купувачи на нов апартамент в южната част на София, двойки и семейства, и инвеститори, търсещи имот за отдаване под наем.',
    targetAudienceEn: 'Buyers of a new apartment in the south of Sofia, couples and families, and investors looking for a rental property.',
    pros: [
      'Голямо предлагане на апартаменти в нови сгради',
      'Метростанция "Витоша" и бул. "Черни връх" - бърза връзка с центъра',
      'Близост до Южния парк',
      'Предвидена бъдеща метростанция в самия квартал',
    ],
    prosEn: [
      'A large supply of apartments in new buildings',
      'Vitosha metro station and Cherni Vrah Blvd. - a fast link to the center',
      'Close to South Park',
      'A future metro station is planned in the neighborhood itself',
    ],
    cons: [
      'Цените са над средните за София',
      'Активното строителство означава шум и прах в някои части',
      'Бъдещата метростанция няма срок за изграждане',
    ],
    consEn: [
      'Prices are above the Sofia average',
      'Active construction means noise and dust in some parts',
      'The future metro station has no construction date',
    ],
    metaDescription: 'Кръстова вада - южен квартал на бул. "Черни връх" с много ново строителство. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Krastova Vada - a southern Sofia neighborhood on Cherni Vrah Blvd. with lots of new construction. Prices and rents as of October 2026.',
    faq: faq([
      [
        'Какви са цените на имотите в Кръстова вада?',
        'What are property prices like in Krastova Vada?',
        'По данни от обявите в imot.bg и alo.bg към октомври 2026 г. средната цена на предлагане на двустаен и тристаен апартамент в Кръстова вада е около 3 200 – 3 450 €/кв.м. Реалните сделки обикновено се сключват малко под цената в обявата. Типичният наем е около 750 – 800 € на месец за двустаен и около 1 100 – 1 200 € за тристаен апартамент.',
        'According to listings on imot.bg and alo.bg as of October 2026, the average asking price for two- and three-room apartments in Krastova Vada is around €3,200–3,450/sq.m. Actual sales usually close slightly below the asking price. Typical rent is around €750–800 a month for a two-room and around €1,100–1,200 for a three-room apartment.',
      ],
      [
        'Има ли метро в Кръстова вада?',
        'Is there a metro in Krastova Vada?',
        'Кварталът се обслужва от метростанция "Витоша" (линия М2) на бул. "Черни връх". В плановете за продължение на линия М2 към Студентски град е предвидена и метростанция "Кръстова вада", но към момента тя е в етап на проектиране и няма обявен срок за изграждане.',
        'The neighborhood is served by Vitosha metro station (line M2) on Cherni Vrah Blvd. Plans to extend line M2 toward Studentski Grad include a Krastova Vada station, but it is currently at the design stage with no announced construction date.',
      ],
      [
        'Къде точно се намира Кръстова вада?',
        'Where exactly is Krastova Vada?',
        'В южната част на София. На север граничи с Хладилника и Южния парк, на запад - с Манастирски ливади, на изток - с квартал Витоша, а на юг стига до Околовръстния път. През него минава бул. "Черни връх".',
        'In the south of Sofia. It borders Hladilnika and South Park to the north, Manastirski Livadi to the west, the Vitosha neighborhood to the east, and reaches the Ring Road to the south. Cherni Vrah Blvd. runs through it.',
      ],
      [
        'На какво да обърна внимание при покупка в ново строителство?',
        'What should I check when buying a new-build apartment?',
        'Проверете на какъв етап е сградата (Акт 14, 15 или 16), разрешението за строеж, какво точно включва цената (паркомясто, мазе) и в какво състояние се предава апартаментът. Сравнете цената на квадратен метър с други сгради в квартала. Ще Ви помогнем да проверите всичко това, преди да подпишете.',
        'Check what stage the building is at (Act 14, 15 or 16), the building permit, what exactly the price includes (parking space, storage room) and the condition in which the apartment is handed over. Compare the price per square meter with other buildings in the neighborhood. We will help you check all of this before you sign.',
      ],
    ]),
  },

  // ───────────────────────────── Лозенец ─────────────────────────────
  'neighborhood-lozenets': {
    tagline: 'Престижен квартал между Южния парк и Борисовата градина, точно до центъра.',
    taglineEn: 'A prestigious neighborhood between South Park and Borisova Gradina, right next to the center.',
    description: `Лозенец е квартал непосредствено на юг от центъра на София. На север граничи с бул. "Евлоги и Христо Георгиеви", на запад - с Южния парк, на изток - с Борисовата градина, а на юг - с бул. "Никола Вапцаров". Така кварталът е между два от най-големите паркове в града.

Името на квартала идва от лозята, които някога са покривали тези места извън тогавашната граница на града. През 1921 г. официално се оформят Долни Лозенец и Горни Лозенец, а през 20-те години на XX век в източната част се заражда т.нар. Журналистически квартал. Днес в Долни Лозенец все още преобладават по-стари кооперации от 3-4 етажа и малки къщи, а в Горни Лозенец има и високи жилищни сгради, строени от 70-те години насам, както и ново строителство.

В квартала се намират някои от най-реномираните училища в София, сред които Националната природо-математическа гимназия, Националната финансово-стопанска гимназия и 35 СЕУ, както и няколко факултета на Софийския университет, Университетът по архитектура, строителство и геодезия и Университетска болница "Лозенец".

Кварталът се обслужва от метростанциите "Европейски съюз" и "Джеймс Баучер" (линия М2), а основните булеварди са "Черни връх", "Джеймс Баучер" и "Свети Наум". Предлагането на имоти е ограничено, а цените са сред най-високите в София.`,
    descriptionEn: `Lozenets is a neighborhood directly south of central Sofia. It is bounded by Evlogi i Hristo Georgievi Blvd. to the north, South Park to the west, Borisova Gradina to the east, and Nikola Vaptsarov Blvd. to the south - which places it between two of the city's largest parks.

The name comes from the vineyards ("lozya") that once covered this area outside the city's former boundary. Dolni (Lower) Lozenets and Gorni (Upper) Lozenets were formally established in 1921, and in the 1920s the so-called Journalists' Quarter began to form in the eastern part. Today Lower Lozenets is still dominated by older 3-4 storey apartment buildings and small houses, while Upper Lozenets also has high-rise blocks built since the 1970s, as well as new construction.

The neighborhood is home to some of Sofia's most respected schools, including the National High School of Mathematics and Natural Sciences, the National Finance and Economics High School and the 35th Language School, as well as several Sofia University faculties, the University of Architecture, Civil Engineering and Geodesy, and Lozenets University Hospital.

It is served by the European Union and James Bourchier metro stations (line M2), and the main boulevards are Cherni Vrah, James Bourchier and Sveti Naum. The supply of property is limited, and prices are among the highest in Sofia.`,
    transport: 'Метростанции "Европейски съюз" и "Джеймс Баучер" (линия М2), автобусни линии и основните булеварди "Черни връх", "Джеймс Баучер" и "Свети Наум". Центърът е непосредствено на север от квартала.',
    transportEn: 'European Union and James Bourchier metro stations (line M2), bus lines, and the main boulevards Cherni Vrah, James Bourchier and Sveti Naum. The city center is directly north of the neighborhood.',
    priceRangeSale: '3 850 – 4 150 €/кв.м',
    priceRangeRent: '700 – 1 000 €/мес.',
    targetAudience: 'Семейства, за които са важни добрите училища и близостта до центъра, и купувачи, които търсят престижен адрес между два големи парка.',
    targetAudienceEn: 'Families for whom good schools and proximity to the center matter, and buyers looking for a prestigious address between two large parks.',
    pros: [
      'Непосредствено до центъра, между Южния парк и Борисовата градина',
      'Някои от най-реномираните училища в София (НПМГ, НФСГ, 35 СЕУ)',
      'Две метростанции на линия М2',
      'Университети, университетска болница и много заведения и магазини',
    ],
    prosEn: [
      'Right next to the center, between South Park and Borisova Gradina',
      'Some of Sofia\'s most respected schools (NPMG, NFSG, 35th Language School)',
      'Two metro stations on line M2',
      'Universities, a university hospital and many restaurants and shops',
    ],
    cons: [
      'Цените са сред най-високите в София',
      'Предлагането е ограничено - подходящите имоти се намират трудно',
      'В Долни Лозенец преобладават по-стари сгради',
    ],
    consEn: [
      'Prices are among the highest in Sofia',
      'Supply is limited - suitable properties are hard to find',
      'Lower Lozenets is dominated by older buildings',
    ],
    metaDescription: 'Лозенец - престижен квартал до центъра на София, между два големи парка. Актуални цени на апартаменти и наеми към октомври 2026, училища, метро.',
    metaDescriptionEn: 'Lozenets - a prestigious neighborhood next to central Sofia, between two large parks. Prices and rents as of October 2026, schools, metro.',
    faq: faq([
      [
        'Какви са цените на имотите в Лозенец?',
        'What are property prices like in Lozenets?',
        'По данни от обявите в imot.bg и alo.bg към октомври 2026 г. средната цена на предлагане на двустаен и тристаен апартамент в Лозенец е около 3 850 – 4 150 €/кв.м. Новото строителство и луксозните имоти често са над този диапазон. Реалните сделки обикновено се сключват малко под цената в обявата. Типичният наем е около 700 € на месец за двустаен и около 950 – 1 000 € за тристаен апартамент, а при нови и обзаведени имоти наемите са по-високи.',
        'According to listings on imot.bg and alo.bg as of October 2026, the average asking price for two- and three-room apartments in Lozenets is around €3,850–4,150/sq.m. New builds and luxury properties are often above this range. Actual sales usually close slightly below the asking price. Typical rent is around €700 a month for a two-room and around €950–1,000 for a three-room apartment, with higher rents for new and furnished properties.',
      ],
      [
        'Защо Лозенец е толкова търсен?',
        'Why is Lozenets in such demand?',
        'Кварталът е непосредствено до центъра, между Южния парк и Борисовата градина, и в него се намират някои от най-реномираните училища в София. Предлагането на имоти е ограничено, а търсенето е постоянно, затова цените са сред най-високите в града.',
        'The neighborhood is right next to the center, between South Park and Borisova Gradina, and is home to some of Sofia\'s most respected schools. The supply of property is limited and demand is steady, which is why prices are among the highest in the city.',
      ],
      [
        'Как е транспортната връзка на Лозенец?',
        'How well connected is Lozenets?',
        'Кварталът се обслужва от метростанциите "Европейски съюз" и "Джеймс Баучер" (линия М2) и от автобусни линии. Основните булеварди са "Черни връх", "Джеймс Баучер" и "Свети Наум", а центърът е непосредствено на север.',
        'The neighborhood is served by the European Union and James Bourchier metro stations (line M2) and by bus lines. The main boulevards are Cherni Vrah, James Bourchier and Sveti Naum, and the center is directly to the north.',
      ],
      [
        'Каква е разликата между Долни и Горни Лозенец?',
        'What is the difference between Lower and Upper Lozenets?',
        'Долни Лозенец е северната, по-близка до центъра част с по-стари кооперации от 3-4 етажа и малки къщи. Горни Лозенец е южната част, разположена по-високо, с високи жилищни сгради от 70-те години насам и ново строителство.',
        'Lower Lozenets is the northern part, closer to the center, with older 3-4 storey apartment buildings and small houses. Upper Lozenets is the southern, higher-lying part, with high-rise blocks built since the 1970s and new construction.',
      ],
    ]),
  },

  // ───────────────────────────── Малинова долина ─────────────────────────────
  'neighborhood-malinova-dolina': {
    tagline: 'Квартал с много ново строителство в южната част на София.',
    taglineEn: 'A neighborhood with a lot of new construction in the south of Sofia.',
    description: `Името Малинова долина носят квартал в южната част на София, на около 7 км от центъра, и съседният на него жилищен комплекс със същото име, който е свързан със Студентски град. На юг Околовръстният път отделя района от квартал Симеоново.

Районът се развива през втората половина на XX век като малка вилна и промишлена зона, застроена предимно с къщи. През последните години тук се строят много нови жилищни комплекси и към октомври 2026 г. Малинова долина е сред районите с най-голямо предлагане на апартаменти в обявите в София. Много от новите сгради са с подземни паркинги, а в някои има и апартаменти със собствени дворове.

Дълго време инфраструктурата не успяваше да догони строителството. По информация на Столична община в района се изграждат нови улици, канализация и осветление, а в края на 2023 г. е завършена първата общинска детска градина в квартала.

Интересът към квартала е голям. Според данни на агенция АДРЕС за третото тримесечие на 2026 г. Малинова долина е кварталът с най-силен ръст на средната цена на квадратен метър сред наблюдаваните от агенцията квартали в София - с 11% на годишна база. Въпреки това цените все още са по-ниски от тези в повечето южни квартали.`,
    descriptionEn: `The name Malinova Dolina is shared by a neighborhood in the south of Sofia, about 7 km from the center, and the adjacent residential complex of the same name, which is linked to Studentski Grad. To the south the Ring Road separates the area from the Simeonovo neighborhood.

The area developed in the second half of the 20th century as a small villa and industrial zone, built up mainly with houses. In recent years many new residential complexes have gone up here, and as of October 2026 Malinova Dolina is among the areas with the largest number of apartments listed for sale in Sofia. Many of the new buildings have underground parking, and some have apartments with their own gardens.

For a long time infrastructure struggled to keep up with construction. According to Sofia Municipality, new streets, sewerage and lighting are being built in the area, and the neighborhood's first municipal kindergarten was completed at the end of 2023.

Interest in the neighborhood is high. According to data from the ADRES agency for Q3 2026, Malinova Dolina saw the strongest growth in average price per square meter among the Sofia neighborhoods the agency tracks - 11% year on year. Even so, prices are still lower than in most southern neighborhoods.`,
    transport: 'Кварталът се обслужва от автобусни линии. Няма метро. Околовръстният път минава в южния край на квартала, а в ежедневието повечето жители използват собствен автомобил.',
    transportEn: 'The neighborhood is served by bus lines. There is no metro. The Ring Road runs along its southern edge, and in everyday life most residents use a car.',
    priceRangeSale: '2 250 – 2 500 €/кв.м',
    priceRangeRent: '700 – 950 €/мес.',
    targetAudience: 'Млади семейства и купувачи на първо жилище, които търсят нов апартамент в южната част на София, и инвеститори, които купуват в ново строителство.',
    targetAudienceEn: 'Young families and first-time buyers looking for a new apartment in the south of Sofia, and investors buying in new developments.',
    pros: [
      'Голям избор от апартаменти в нови жилищни комплекси',
      'По-ниски цени от повечето южни квартали',
      'Най-силен ръст на цените сред наблюдаваните от АДРЕС квартали (+11% за година)',
      'Апартаменти с подземни паркинги и някои със собствени дворове',
    ],
    prosEn: [
      'A wide choice of apartments in new residential complexes',
      'Lower prices than most southern neighborhoods',
      'The strongest price growth among the neighborhoods tracked by ADRES (+11% in a year)',
      'Apartments with underground parking, some with private gardens',
    ],
    cons: [
      'Инфраструктурата все още догонва строителството - в района продължава изграждането на улици',
      'Няма метро - в ежедневието е нужен автомобил',
      'Активното строителство означава шум и прах в някои части',
    ],
    consEn: [
      'Infrastructure is still catching up with construction - street building is ongoing in the area',
      'No metro - a car is needed for everyday life',
      'Active construction means noise and dust in some parts',
    ],
    metaDescription: 'Малинова долина - квартал с много ново строителство в Южна София. Актуални цени на апартаменти и наеми към октомври 2026, плюсове и минуси.',
    metaDescriptionEn: 'Malinova Dolina - a neighborhood with lots of new construction in south Sofia. Apartment prices and rents as of October 2026, pros and cons.',
    faq: faq([
      [
        'Какви са цените на имотите в Малинова долина?',
        'What are property prices like in Malinova Dolina?',
        'По данни от обявите в imot.bg и alo.bg към октомври 2026 г. средната цена на предлагане на двустаен и тристаен апартамент в Малинова долина е около 2 250 – 2 500 €/кв.м. Реалните сделки обикновено се сключват малко под цената в обявата. Типичният наем е около 700 € на месец за двустаен и около 950 € за тристаен апартамент.',
        'According to listings on imot.bg and alo.bg as of October 2026, the average asking price for two- and three-room apartments in Malinova Dolina is around €2,250–2,500/sq.m. Actual sales usually close slightly below the asking price. Typical rent is around €700 a month for a two-room and around €950 for a three-room apartment.',
      ],
      [
        'Растат ли цените в Малинова долина?',
        'Are prices rising in Malinova Dolina?',
        'Да. Според данни на агенция АДРЕС за третото тримесечие на 2026 г. Малинова долина е кварталът с най-силен ръст на средната цена на квадратен метър сред наблюдаваните от агенцията квартали в София - с 11% на годишна база. Миналият ръст не гарантира бъдещ, но показва голям интерес към квартала.',
        'Yes. According to ADRES agency data for Q3 2026, Malinova Dolina saw the strongest growth in average price per square meter among the Sofia neighborhoods the agency tracks - 11% year on year. Past growth does not guarantee future growth, but it shows strong interest in the neighborhood.',
      ],
      [
        'Има ли училища и детски градини в Малинова долина?',
        'Are there schools and kindergartens in Malinova Dolina?',
        'Първата общинска детска градина в квартала е завършена в края на 2023 г. Инфраструктурата все още се развива, затова преди покупка е добре да проверите кои са най-близките училища и детски градини до конкретния адрес.',
        'The neighborhood\'s first municipal kindergarten was completed at the end of 2023. Infrastructure is still developing, so before buying it is worth checking which schools and kindergartens are closest to the specific address.',
      ],
      [
        'Как е транспортната връзка на Малинова долина?',
        'How well connected is Malinova Dolina?',
        'Кварталът се обслужва от автобусни линии, но няма метро. Околовръстният път минава в южния му край, а повечето жители използват собствен автомобил в ежедневието.',
        'The neighborhood is served by bus lines but has no metro. The Ring Road runs along its southern edge, and most residents use a car in everyday life.',
      ],
    ]),
  },

  // ───────────────────────────── Манастирски ливади ─────────────────────────────
  'neighborhood-manastirski-livadi': {
    tagline: 'Бързо развиващ се южен квартал от двете страни на бул. "България".',
    taglineEn: 'A fast-growing southern neighborhood on both sides of Bulgaria Blvd.',
    description: `Манастирски ливади е квартал в южната част на София, близо до Витоша. Разположен е от двете страни на бул. "България", северно от Околовръстния път. На запад граничи с бул. "Братя Бъкстон", на север - с ул. "Тодор Каблешков", на изток - с квартал Кръстова вада, а на юг - с Околовръстния път.

Името на квартала идва от ливадите, които в миналото са били собственост на Драгалевския манастир. Днес на тяхно място има модерни жилищни комплекси. Кварталът се дели на две части - западна (на запад от бул. "България"), която е в район "Витоша", и източна, която е в район "Триадица". И в двете части продължава активно ново строителство.

В западната част се намира България Мол, отворен през 2012 г. В квартала са и болница "Св. София" и сградата на bTV, а наблизо има училища и детски градини. Кварталът се обслужва от трамвайни, тролейбусни и автобусни линии, а по бул. "България" до центъра се стига за около 15 минути с кола.

Основният недостатък на квартала е липсата на голям парк - поради бързото застрояване зелените площи са малко. Цените са по-ниски от тези в Лозенец и Кръстова вада.`,
    descriptionEn: `Manastirski Livadi is a neighborhood in the south of Sofia, close to Vitosha. It lies on both sides of Bulgaria Blvd., north of the Ring Road. It is bounded by Bratya Buxton Blvd. to the west, Todor Kableshkov St. to the north, the Krastova Vada neighborhood to the east, and the Ring Road to the south.

The name ("Monastery Meadows") comes from the meadows that once belonged to the Dragalevtsi Monastery. Today they have been replaced by modern residential complexes. The neighborhood has two parts - the western part (west of Bulgaria Blvd.), which belongs to the Vitosha district, and the eastern part, which belongs to the Triaditsa district. Active new construction continues in both.

Bulgaria Mall, opened in 2012, is in the western part. The neighborhood is also home to St. Sofia Hospital and the bTV building, with schools and kindergartens nearby. It is served by tram, trolleybus and bus lines, and the center is about 15 minutes away by car along Bulgaria Blvd.

The neighborhood's main drawback is the lack of a large park - because of rapid development there is little green space. Prices are lower than in Lozenets and Krastova Vada.`,
    transport: 'Трамвайни, тролейбусни и автобусни линии. Бул. "България" осигурява бърза връзка с центъра - около 15 минути с кола. В квартала няма метростанция.',
    transportEn: 'Tram, trolleybus and bus lines. Bulgaria Blvd. provides a fast link to the center - about 15 minutes by car. There is no metro station in the neighborhood.',
    priceRangeSale: '2 750 – 3 050 €/кв.м',
    priceRangeRent: '650 – 900 €/мес.',
    targetAudience: 'Млади семейства и купувачи, които търсят нов апартамент в южната част на София на по-ниска цена от Лозенец и Кръстова вада, и инвеститори в ново строителство.',
    targetAudienceEn: 'Young families and buyers looking for a new apartment in the south of Sofia at a lower price than Lozenets and Krastova Vada, and investors in new developments.',
    pros: [
      'Много нови жилищни комплекси',
      'Трамваи, тролейбуси и автобуси, бърза връзка с центъра по бул. "България"',
      'България Мол, болница и училища наблизо',
      'По-ниски цени от Лозенец и Кръстова вада',
    ],
    prosEn: [
      'Many new residential complexes',
      'Trams, trolleybuses and buses, and a fast link to the center along Bulgaria Blvd.',
      'Bulgaria Mall, a hospital and schools nearby',
      'Lower prices than Lozenets and Krastova Vada',
    ],
    cons: [
      'Липса на голям парк и малко зелени площи',
      'Няма метростанция в квартала',
      'Активното строителство означава шум и прах в някои части',
    ],
    consEn: [
      'No large park and little green space',
      'No metro station in the neighborhood',
      'Active construction means noise and dust in some parts',
    ],
    metaDescription: 'Манастирски ливади - южен квартал с много ново строителство до бул. "България". Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Manastirski Livadi - a southern Sofia neighborhood with lots of new construction by Bulgaria Blvd. Prices and rents as of October 2026.',
    faq: faq([
      [
        'Какви са цените на имотите в Манастирски ливади?',
        'What are property prices like in Manastirski Livadi?',
        'По данни от обявите в imot.bg и alo.bg към октомври 2026 г. средната цена на предлагане на двустаен и тристаен апартамент в Манастирски ливади е около 2 750 – 3 050 €/кв.м. Реалните сделки обикновено се сключват малко под цената в обявата. Типичният наем е около 650 – 700 € на месец за двустаен и около 850 – 900 € за тристаен апартамент.',
        'According to listings on imot.bg and alo.bg as of October 2026, the average asking price for two- and three-room apartments in Manastirski Livadi is around €2,750–3,050/sq.m. Actual sales usually close slightly below the asking price. Typical rent is around €650–700 a month for a two-room and around €850–900 for a three-room apartment.',
      ],
      [
        'Откъде идва името Манастирски ливади?',
        'Where does the name Manastirski Livadi come from?',
        'Името означава "манастирските ливади" - в миналото тези земи са били ливади, собственост на Драгалевския манастир. Днес на тяхно място има модерни жилищни комплекси.',
        'The name means "the monastery meadows" - in the past this land was meadowland owned by the Dragalevtsi Monastery. Today it is covered by modern residential complexes.',
      ],
      [
        'Как е транспортното обслужване в Манастирски ливади?',
        'How is public transport in Manastirski Livadi?',
        'Кварталът се обслужва от трамвайни, тролейбусни и автобусни линии. Бул. "България" осигурява бърза връзка с центъра - около 15 минути с кола. Метростанция в квартала няма.',
        'The neighborhood is served by tram, trolleybus and bus lines. Bulgaria Blvd. provides a fast link to the center - about 15 minutes by car. There is no metro station in the neighborhood.',
      ],
      [
        'Каква е разликата между западната и източната част?',
        'What is the difference between the western and eastern parts?',
        'Западната част (на запад от бул. "България") е в район "Витоша" и в нея се намира България Мол. Източната част е в район "Триадица" и граничи с Кръстова вада. И в двете части се строят нови жилищни сгради.',
        'The western part (west of Bulgaria Blvd.) belongs to the Vitosha district and is where Bulgaria Mall is located. The eastern part belongs to the Triaditsa district and borders Krastova Vada. New apartment buildings are going up in both parts.',
      ],
    ]),
  },

  // ───────────────────────────── Младост ─────────────────────────────
  'neighborhood-mladost': {
    tagline: 'Голям квартал с пет метростанции и Бизнес парк София.',
    taglineEn: 'A large neighborhood with five metro stations and Business Park Sofia.',
    description: `Младост е голям жилищен комплекс в Югоизточна София и основната част от район "Младост". Състои се от пет части - Младост 1, 1А, 2, 3 и 4. Първата част, Младост 1, е завършена през 1964 г., а останалите са построени до първата половина на 80-те години.

По-старите сгради са предимно панелни, а от 90-те години насам се строят основно монолитни сгради. Затова в квартала има голямо разнообразие - от панелни апартаменти до нови жилищни комплекси.

Младост има отлична метро връзка - пет метростанции на линии М1 и М4: "Младост 1", "Младост 3", "Александър Малинов", "Академик Александър Теодоров - Балан" и "Бизнес парк София". Бизнес парк София се намира до Младост 4 и има собствена метростанция. Основните булеварди са "Александър Малинов" и "Цариградско шосе".

В квартала има търговски център (The Mall), хипермаркети, пазар, училища и детски градини. Близостта до бизнес зоните осигурява постоянно търсене на имоти под наем.`,
    descriptionEn: `Mladost is a large residential area in southeastern Sofia and the main part of the Mladost district. It consists of five parts - Mladost 1, 1A, 2, 3 and 4. The first part, Mladost 1, was completed in 1964, and the others were built by the first half of the 1980s.

The older buildings are mostly panel blocks, while since the 1990s construction has been mainly monolithic. As a result the neighborhood offers great variety - from panel apartments to new residential complexes.

Mladost has an excellent metro connection - five stations on lines M1 and M4: Mladost 1, Mladost 3, Aleksandar Malinov, Akademik Aleksandar Teodorov - Balan and Business Park Sofia. Business Park Sofia is next to Mladost 4 and has its own metro station. The main boulevards are Aleksandar Malinov and Tsarigradsko Shose.

The neighborhood has a shopping center (The Mall), hypermarkets, a market, schools and kindergartens. Its proximity to business zones keeps rental demand steady.`,
    transport: 'Пет метростанции на линии М1 и М4: "Младост 1", "Младост 3", "Александър Малинов", "Академик Александър Теодоров - Балан" и "Бизнес парк София". Автобусни и тролейбусни линии. Основни булеварди - "Александър Малинов" и "Цариградско шосе".',
    transportEn: 'Five metro stations on lines M1 and M4: Mladost 1, Mladost 3, Aleksandar Malinov, Akademik Aleksandar Teodorov - Balan and Business Park Sofia. Bus and trolleybus lines. Main boulevards - Aleksandar Malinov and Tsarigradsko Shose.',
    priceRangeSale: '2 350 – 3 200 €/кв.м',
    priceRangeRent: '550 – 1 000 €/мес.',
    targetAudience: 'Млади специалисти, работещи в Бизнес парк София и бизнес зоните наоколо, семейства, които търсят апартамент с добра метро връзка, и инвеститори в имоти под наем.',
    targetAudienceEn: 'Young professionals working in Business Park Sofia and the nearby business zones, families looking for an apartment with a good metro link, and investors in rental property.',
    pros: [
      'Пет метростанции на линии М1 и М4',
      'Близост до Бизнес парк София - постоянно търсене на наеми',
      'Търговски център, хипермаркети, училища и детски градини',
      'Голям избор - от панелни апартаменти до ново строителство',
    ],
    prosEn: [
      'Five metro stations on lines M1 and M4',
      'Close to Business Park Sofia - steady rental demand',
      'A shopping center, hypermarkets, schools and kindergartens',
      'A wide choice - from panel apartments to new builds',
    ],
    cons: [
      'Голяма част от по-старите сгради са панелни и не всички са санирани',
      'Голям квартал с по-градска и оживена атмосфера, отколкото в южните квартали',
    ],
    consEn: [
      'Many of the older buildings are panel blocks, and not all have been renovated',
      'A large neighborhood with a busier, more urban feel than the southern neighborhoods',
    ],
    metaDescription: 'Младост - голям квартал в София с пет метростанции и Бизнес парк София. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Mladost - a large Sofia neighborhood with five metro stations and Business Park Sofia. Apartment prices and rents as of October 2026.',
    faq: faq([
      [
        'Какви са цените на имотите в Младост?',
        'What are property prices like in Mladost?',
        'По данни от обявите в imot.bg и alo.bg към октомври 2026 г. средната цена на предлагане на двустаен и тристаен апартамент в Младост е около 2 350 – 3 200 €/кв.м. Разликата зависи от частта на квартала и от вида на сградата - новото строителство е в горния край на диапазона. Реалните сделки обикновено се сключват малко под цената в обявата. Типичният наем е около 550 – 700 € на месец за двустаен и около 750 – 1 000 € за тристаен апартамент.',
        'According to listings on imot.bg and alo.bg as of October 2026, the average asking price for two- and three-room apartments in Mladost is around €2,350–3,200/sq.m. The difference depends on the part of the neighborhood and the type of building - new builds are at the top of the range. Actual sales usually close slightly below the asking price. Typical rent is around €550–700 a month for a two-room and around €750–1,000 for a three-room apartment.',
      ],
      [
        'Кои метростанции обслужват Младост?',
        'Which metro stations serve Mladost?',
        'Пет метростанции на линии М1 и М4: "Младост 1", "Младост 3", "Александър Малинов", "Академик Александър Теодоров - Балан" и "Бизнес парк София". Младост е един от най-добре свързаните с метро квартали в София.',
        'Five stations on lines M1 and M4: Mladost 1, Mladost 3, Aleksandar Malinov, Akademik Aleksandar Teodorov - Balan and Business Park Sofia. Mladost is one of the best metro-connected neighborhoods in Sofia.',
      ],
      [
        'Подходящ ли е Младост за инвестиция под наем?',
        'Is Mladost a good choice for a rental investment?',
        'Близостта до Бизнес парк София и бизнес зоните по бул. "Цариградско шосе", заедно с метрото, осигурява постоянно търсене на наеми. Доходността зависи от цената, на която купите, и от състоянието на имота, затова е добре да я изчислите за конкретния апартамент. Можем да направим тази сметка заедно с Вас.',
        'Proximity to Business Park Sofia and the business zones along Tsarigradsko Shose, together with the metro, keeps rental demand steady. The yield depends on the purchase price and the condition of the property, so it is worth calculating it for the specific apartment. We can do that calculation together with you.',
      ],
      [
        'Какви сгради има в Младост?',
        'What kinds of buildings are there in Mladost?',
        'По-старите части са застроени предимно с панелни блокове, част от които са санирани. От 90-те години насам се строят основно монолитни сгради, а в квартала има и нови жилищни комплекси. Изборът е голям - от по-достъпни панелни апартаменти до ново строителство.',
        'The older parts are mostly panel blocks, some of which have been renovated. Since the 1990s construction has been mainly monolithic, and there are also new residential complexes. The choice is wide - from more affordable panel apartments to new builds.',
      ],
    ]),
  },

  // ───────────────────────────── Овча купел ─────────────────────────────
  'neighborhood-ovcha-kupel': {
    tagline: 'Западен квартал с метро, минерален извор и Нов български университет.',
    taglineEn: 'A western neighborhood with a metro, a mineral spring and New Bulgarian University.',
    description: `Овча купел е квартал в западната част на София, на около 6 км от центъра. На север граничи с бул. "Президент Линкълн", на юг - с бул. "Цар Борис III", на изток - с бул. "Овча купел", а на запад - с Околовръстния път.

Кварталът има дълга история. Старата част се развива през XIX век около минералния извор и баните. Според местното предание името идва от топлия извор, в който са къпели овцете - "овча къпалня". Жилищният комплекс Овча купел е построен до началото на 90-те години, предимно с панелни блокове, а днес в квартала има и много ново строителство.

От 2021 г. кварталът има метро - линия М3 със станциите "Овча купел", "Мизия - НБУ" и "Овча купел 2", които го свързват директно с центъра. В квартала се намират Нов български университет и още два университета, парк "Овча купел" около минералния извор, както и болници.

Цените в Овча купел са по-ниски от средните за София. Според данни на агенция АДРЕС за третото тримесечие на 2026 г. средната цена на квадратен метър в квартала е нараснала с около 7% на годишна база.`,
    descriptionEn: `Ovcha Kupel is a neighborhood in the west of Sofia, about 6 km from the center. It is bounded by President Lincoln Blvd. to the north, Tsar Boris III Blvd. to the south, Ovcha Kupel Blvd. to the east, and the Ring Road to the west.

The neighborhood has a long history. The old part developed in the 19th century around the mineral spring and the baths. According to local tradition, the name comes from the warm spring where sheep were bathed - "ovcha kapalnya", the sheep bath. The Ovcha Kupel housing complex was built up to the early 1990s, mostly with panel blocks, and today there is also a lot of new construction.

Since 2021 the neighborhood has had a metro - line M3 with the Ovcha Kupel, Miziya - NBU and Ovcha Kupel 2 stations, which link it directly to the center. The neighborhood is home to New Bulgarian University and two other universities, Ovcha Kupel park around the mineral spring, and hospitals.

Prices in Ovcha Kupel are below the Sofia average. According to ADRES agency data for Q3 2026, the average price per square meter in the neighborhood rose by about 7% year on year.`,
    transport: 'Метро линия М3 - станции "Овча купел", "Мизия - НБУ" и "Овча купел 2", с директна връзка до центъра. Автобусни линии. Околовръстният път минава в западния край на квартала.',
    transportEn: 'Metro line M3 - Ovcha Kupel, Miziya - NBU and Ovcha Kupel 2 stations, with a direct link to the center. Bus lines. The Ring Road runs along the western edge of the neighborhood.',
    priceRangeSale: '2 100 – 2 450 €/кв.м',
    priceRangeRent: '600 – 750 €/мес.',
    targetAudience: 'Купувачи с по-ограничен бюджет, които искат метро, студенти и млади семейства, и инвеститори, търсещи имот за отдаване под наем близо до университетите.',
    targetAudienceEn: 'Buyers on a tighter budget who want a metro connection, students and young families, and investors looking for a rental property near the universities.',
    pros: [
      'Метро линия М3 с директна връзка до центъра',
      'По-ниски цени от средните за София',
      'Нов български университет и още два университета - постоянно търсене на наеми',
      'Парк "Овча купел" и минералният извор',
    ],
    prosEn: [
      'Metro line M3 with a direct link to the center',
      'Prices below the Sofia average',
      'New Bulgarian University and two other universities - steady rental demand',
      'Ovcha Kupel park and the mineral spring',
    ],
    cons: [
      'Голяма част от сградите са по-стари панелни блокове',
      'По-малко заведения и магазини спрямо централните квартали',
      'Активно ново строителство в някои части',
    ],
    consEn: [
      'Many buildings are older panel blocks',
      'Fewer restaurants and shops than in the central neighborhoods',
      'Active new construction in some parts',
    ],
    metaDescription: 'Овча купел - западен квартал на София с метро М3 и Нов български университет. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Ovcha Kupel - a western Sofia neighborhood with metro line M3 and New Bulgarian University. Prices and rents as of October 2026.',
    faq: faq([
      [
        'Какви са цените на имотите в Овча купел?',
        'What are property prices like in Ovcha Kupel?',
        'По данни от обявите в imot.bg и alo.bg към октомври 2026 г. средната цена на предлагане на двустаен и тристаен апартамент в Овча купел е около 2 100 – 2 450 €/кв.м. Реалните сделки обикновено се сключват малко под цената в обявата. Типичният наем е около 600 – 650 € на месец за двустаен и около 700 – 750 € за тристаен апартамент.',
        'According to listings on imot.bg and alo.bg as of October 2026, the average asking price for two- and three-room apartments in Ovcha Kupel is around €2,100–2,450/sq.m. Actual sales usually close slightly below the asking price. Typical rent is around €600–650 a month for a two-room and around €700–750 for a three-room apartment.',
      ],
      [
        'Има ли метро в Овча купел?',
        'Is there a metro in Ovcha Kupel?',
        'Да. От 2021 г. кварталът се обслужва от линия М3 със станциите "Овча купел", "Мизия - НБУ" и "Овча купел 2". Линията стига директно до центъра на София.',
        'Yes. Since 2021 the neighborhood has been served by line M3 with the Ovcha Kupel, Miziya - NBU and Ovcha Kupel 2 stations. The line runs directly to central Sofia.',
      ],
      [
        'Откъде идва името Овча купел?',
        'Where does the name Ovcha Kupel come from?',
        'Според местното предание името идва от топлия минерален извор в района, в който са къпели овцете - "овча къпалня". Минералният извор и баните и днес са част от квартала.',
        'According to local tradition, the name comes from the warm mineral spring in the area where sheep were bathed - "ovcha kapalnya", the sheep bath. The mineral spring and the baths are still part of the neighborhood today.',
      ],
      [
        'Подходящ ли е Овча купел за инвестиция под наем?',
        'Is Ovcha Kupel a good choice for a rental investment?',
        'Близостта до Нов български университет и още два университета, заедно с метрото, осигурява търсене на наеми от студенти и млади хора. Цените на имотите са по-ниски от средните за София. Доходността зависи от конкретния имот, затова е добре да я изчислите предварително - можем да го направим заедно с Вас.',
        'Proximity to New Bulgarian University and two other universities, together with the metro, creates rental demand from students and young people. Property prices are below the Sofia average. The yield depends on the specific property, so it is worth calculating in advance - we can do that together with you.',
      ],
    ]),
  },

  // ───────────────────────────── Овча купел 2 ─────────────────────────────
  'neighborhood-ovcha-kupel-2': {
    tagline: 'Част от Овча купел със собствена метростанция и ново строителство.',
    taglineEn: 'Part of Ovcha Kupel with its own metro station and new construction.',
    description: `Овча купел 2 е част от жилищния комплекс Овча купел в западната част на София, близо до квартал Горна баня. Комплексът е построен до началото на 90-те години, предимно с панелни блокове, а през последните години в района се строят и нови жилищни сгради.

От 2021 г. Овча купел 2 има собствена метростанция - "Овча купел 2" на линия М3, на ул. "Централна" до болница "Доверие". Линията стига директно до центъра на София, а следващата станция е "Горна баня".

Новите сгради в района обикновено са тухлени, често с подземни гаражи и съвременни разпределения. Цените са сред по-достъпните в западната част на града и малко по-ниски от тези в Овча купел.

Кварталът е подходящ за купувачи, които търсят нов апартамент с метро в западната част на София на по-ниска цена, и за инвеститори, които отдават имоти под наем.`,
    descriptionEn: `Ovcha Kupel 2 is part of the Ovcha Kupel housing complex in the west of Sofia, close to the Gorna Banya neighborhood. The complex was built up to the early 1990s, mostly with panel blocks, and in recent years new apartment buildings have also been going up in the area.

Since 2021 Ovcha Kupel 2 has had its own metro station - Ovcha Kupel 2 on line M3, on Tsentralna St. next to Doverie Hospital. The line runs directly to central Sofia, and the next station is Gorna Banya.

New buildings in the area are usually brick-built, often with underground garages and modern layouts. Prices are among the more affordable in the west of the city and slightly lower than in Ovcha Kupel.

The neighborhood suits buyers looking for a new apartment with a metro connection in the west of Sofia at a lower price, and investors who rent out property.`,
    transport: 'Метростанция "Овча купел 2" (линия М3) на ул. "Централна", с директна връзка до центъра. Автобусни линии. Наблизо минава Околовръстният път.',
    transportEn: 'Ovcha Kupel 2 metro station (line M3) on Tsentralna St., with a direct link to the center. Bus lines. The Ring Road runs nearby.',
    priceRangeSale: '2 100 – 2 250 €/кв.м',
    priceRangeRent: '650 – 700 €/мес.',
    targetAudience: 'Купувачи на нов апартамент с метро в западната част на София, млади семейства и инвеститори, търсещи по-достъпна цена.',
    targetAudienceEn: 'Buyers of a new apartment with a metro connection in the west of Sofia, young families, and investors looking for a more affordable price.',
    pros: [
      'Собствена метростанция на линия М3 с директна връзка до центъра',
      'Сред по-достъпните цени в западната част на София',
      'Нови тухлени сгради с подземни гаражи',
      'Болница "Доверие" до метростанцията',
    ],
    prosEn: [
      'Its own metro station on line M3, with a direct link to the center',
      'Among the more affordable prices in the west of Sofia',
      'New brick buildings with underground garages',
      'Doverie Hospital next to the metro station',
    ],
    cons: [
      'Голяма част от по-старите сгради са панелни',
      'По-малко заведения и магазини спрямо централните квартали',
      'Активно строителство в някои части',
    ],
    consEn: [
      'Many of the older buildings are panel blocks',
      'Fewer restaurants and shops than in the central neighborhoods',
      'Active construction in some parts',
    ],
    metaDescription: 'Овча купел 2 - част от Овча купел със собствена метростанция и ново строителство. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Ovcha Kupel 2 - part of Ovcha Kupel with its own metro station and new construction. Apartment prices and rents as of October 2026.',
    faq: faq([
      [
        'Какви са цените на имотите в Овча купел 2?',
        'What are property prices like in Ovcha Kupel 2?',
        'По данни от обявите в imot.bg и alo.bg към октомври 2026 г. средната цена на предлагане на двустаен и тристаен апартамент в Овча купел 2 е около 2 100 – 2 250 €/кв.м. Реалните сделки обикновено се сключват малко под цената в обявата. Типичният наем е около 650 € на месец за двустаен и около 675 – 700 € за тристаен апартамент.',
        'According to listings on imot.bg and alo.bg as of October 2026, the average asking price for two- and three-room apartments in Ovcha Kupel 2 is around €2,100–2,250/sq.m. Actual sales usually close slightly below the asking price. Typical rent is around €650 a month for a two-room and around €675–700 for a three-room apartment.',
      ],
      [
        'Каква е разликата между Овча купел и Овча купел 2?',
        'What is the difference between Ovcha Kupel and Ovcha Kupel 2?',
        'И двете са част от жилищния комплекс Овча купел и се обслужват от метро линия М3. Овча купел 2 е разположен по-близо до Горна баня и има собствена метростанция - "Овча купел 2". По данни от обявите към октомври 2026 г. цените в Овча купел 2 са малко по-ниски.',
        'Both are part of the Ovcha Kupel housing complex and are served by metro line M3. Ovcha Kupel 2 lies closer to Gorna Banya and has its own metro station - Ovcha Kupel 2. According to listings as of October 2026, prices in Ovcha Kupel 2 are slightly lower.',
      ],
      [
        'Има ли метро в Овча купел 2?',
        'Is there a metro in Ovcha Kupel 2?',
        'Да. От 2021 г. метростанция "Овча купел 2" (линия М3) се намира на ул. "Централна" до болница "Доверие". Линията стига директно до центъра на София.',
        'Yes. Since 2021 Ovcha Kupel 2 metro station (line M3) has been on Tsentralna St. next to Doverie Hospital. The line runs directly to central Sofia.',
      ],
      [
        'Подходящ ли е Овча купел 2 за покупка на нов апартамент?',
        'Is Ovcha Kupel 2 a good place to buy a new apartment?',
        'В квартала се строят нови тухлени сгради с подземни гаражи, а цените са сред по-достъпните в западната част на София. Преди покупка проверете етапа на строителство (Акт 14, 15 или 16) и какво точно включва цената. Ще Ви помогнем с проверката на документите.',
        'New brick buildings with underground garages are going up in the neighborhood, and prices are among the more affordable in the west of Sofia. Before buying, check the construction stage (Act 14, 15 or 16) and what exactly the price includes. We will help you check the documents.',
      ],
    ]),
  },
}

const ids = Object.keys(updates)
const published = await client.fetch(`*[_id in $ids]`, { ids })
if (published.length !== ids.length) {
  console.error('❌  Expected', ids.length, 'neighborhoods, found', published.length)
  process.exit(1)
}

for (const doc of published) {
  const { _rev, _createdAt, _updatedAt, ...rest } = doc
  const draft = { ...rest, ...updates[doc._id], _id: `drafts.${doc._id}` }
  await client.createOrReplace(draft)
  console.log('✅  Draft saved:', doc.name)
}
