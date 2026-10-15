/**
 * Adds the last 3 neighborhood guides from option 3 (October 2026):
 * Витоша, Люлин, Надежда.
 *
 * Same method as add-neighborhoods-2026-10.mjs:
 * - Sale prices / rents: asking-price medians on imot.bg (8.10.2026) and
 *   alo.bg (14.10.2026), 2- and 3-room apartments; ranges span both sources,
 *   rounded outward to 50 (alo.bg samples under 5 listings ignored). Люлин and
 *   Надежда span all their parts (Люлин 1-10, Надежда 1-4).
 * - Facts: bg.wikipedia.org articles for each area + "Софийско метро".
 *   Note: кв. Витоша belongs to район "Лозенец", not район "Витоша".
 * - Photos: Wikimedia Commons (CC licences).
 * - Bus line numbers deliberately left out (current numbers not confirmed).
 *
 * Writes each guide as a Sanity DRAFT.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/add-neighborhoods-2026-10-c.mjs
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

const priceAnswer = (name, range, rent2, rent3, extra = '') =>
  `По данни от обявите в imot.bg и alo.bg към октомври 2026 г. средната цена на предлагане на двустаен и тристаен апартамент в ${name} е около ${range} €/кв.м.${extra ? ' ' + extra : ''} Реалните сделки обикновено се сключват малко под цената в обявата. Типичният наем е около ${rent2} € на месец за двустаен и около ${rent3} € за тристаен апартамент.`
const priceAnswerEn = (name, range, rent2, rent3, extra = '') =>
  `According to listings on imot.bg and alo.bg as of October 2026, the average asking price for two- and three-room apartments in ${name} is around €${range}/sq.m.${extra ? ' ' + extra : ''} Actual sales usually close slightly below the asking price. Typical rent is around €${rent2} a month for a two-room and around €${rent3} for a three-room apartment.`

const common = { _type: 'neighborhood', pricesAsOf: 'октомври 2026 г.', pricesAsOfEn: 'October 2026' }

const guides = [
  // ───────────────────────────── Витоша ─────────────────────────────
  {
    slug: 'vitosha',
    name: 'Витоша',
    nameEn: 'Vitosha',
    tagline: 'Бивша вилна зона в подножието на планината с много ново строителство.',
    taglineEn: 'A former villa zone at the foot of the mountain with a lot of new construction.',
    externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/%D0%91%D1%83%D0%BB%D0%B5%D0%B2%D0%B0%D1%80%D0%B4_%D0%A1%D0%B8%D0%BC%D0%B5%D0%BE%D0%BD%D0%BE%D0%B2%D1%81%D0%BA%D0%BE_%D1%88%D0%BE%D1%81%D0%B5_-_%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.JPG',
    description: `Квартал Витоша е бивша вилна зона в южната част на София, а днес е жилищен квартал. Той е част от район "Лозенец", а не от район "Витоша", с който лесно се бърка. Разположен е между подножието на Витоша и Околовръстния път на юг, Зоологическата градина, Ловния парк и квартал Дианабад на север, бул. "Никола Габровски" на изток и квартал Кръстова вада на запад.

Първите вили тук са построени през 60-те години на XX век. В края на 90-те години се появяват първите високи сгради, а от началото на XXI век кварталът се застроява интензивно с 4-6-етажни сгради, комплекси от затворен тип и няколко еднофамилни къщи. Много от апартаментите са с големи площи. Между квартала и Студентски град се намират резиденции на дипломатическия корпус.

Основната транспортна артерия е бул. "Симеоновско шосе". Градският транспорт е по-ограничен, отколкото в централните квартали, и повечето жители използват собствен автомобил. В плановете за продължение на линия М2 към Студентски град е предвидена метростанция "Симеоновско шосе", но без обявен срок за изграждане.

Витоша е подходящ за хора, които търсят по-голям апартамент в нова сграда, близо до планината и до Зоологическата градина.`,
    descriptionEn: `The Vitosha neighborhood is a former villa zone in the south of Sofia and is now a residential area. It belongs to the Lozenets district, not to the Vitosha district, with which it is easily confused. It lies between the foot of Mount Vitosha and the Ring Road to the south, Sofia Zoo, the Hunting Park and the Dianabad neighborhood to the north, Nikola Gabrovski Blvd. to the east, and the Krastova Vada neighborhood to the west.

The first villas here were built in the 1960s. The first high-rise buildings appeared in the late 1990s, and since the early 2000s the area has been built up intensively with 4-6 storey buildings, gated complexes and a few single-family houses. Many apartments are large. Diplomatic residences lie between the neighborhood and Studentski Grad.

The main road is Simeonovsko Shose Blvd. Public transport is more limited than in the central neighborhoods, and most residents use a car. Plans to extend metro line M2 toward Studentski Grad include a Simeonovsko Shose station, but with no announced construction date.

Vitosha suits people looking for a larger apartment in a new building, close to the mountain and to Sofia Zoo.`,
    transport: 'Основната артерия е бул. "Симеоновско шосе". Градският транспорт е по-ограничен и повечето жители използват автомобил. В плановете за продължение на линия М2 е предвидена метростанция "Симеоновско шосе" (без обявен срок).',
    transportEn: 'The main road is Simeonovsko Shose Blvd. Public transport is more limited, and most residents use a car. Plans to extend metro line M2 include a Simeonovsko Shose station (no announced date).',
    priceRangeSale: '2 700 – 2 950 €/кв.м',
    priceRangeRent: '650 – 1 000 €/мес.',
    targetAudience: 'Семейства, които търсят по-голям апартамент в нова сграда близо до планината, и купувачи, които предпочитат комплекси от затворен тип.',
    targetAudienceEn: 'Families looking for a larger apartment in a new building close to the mountain, and buyers who prefer gated complexes.',
    pros: [
      'Близо до Витоша, Зоологическата градина и Ловния парк',
      'Много нови сгради и комплекси от затворен тип',
      'Апартаменти с големи площи',
      'Голям избор на имоти в обявите',
    ],
    prosEn: [
      'Close to Vitosha, Sofia Zoo and the Hunting Park',
      'Many new buildings and gated complexes',
      'Large apartments',
      'A wide choice of properties in the listings',
    ],
    cons: [
      'По-ограничен градски транспорт и няма метро',
      'Инфраструктурата е наследена от вилната зона и на места изостава от новото строителство',
      'Името лесно се бърка с район "Витоша"',
    ],
    consEn: [
      'More limited public transport and no metro',
      'Infrastructure dates from the villa-zone era and in places lags behind new construction',
      'The name is easily confused with the Vitosha district',
    ],
    metaDescription: 'Кв. Витоша - бивша вилна зона в Южна София с много ново строителство. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Vitosha - a former villa zone in south Sofia with lots of new construction. Apartment prices and rents as of October 2026.',
    faq: faq([
      ['Какви са цените на имотите в квартал Витоша?', 'What are property prices like in the Vitosha neighborhood?',
        priceAnswer('квартал Витоша', '2 700 – 2 950', '650 – 700', '950 – 1 000'),
        priceAnswerEn('the Vitosha neighborhood', '2,700–2,950', '650–700', '950–1,000')],
      ['Квартал Витоша и район "Витоша" едно и също ли са?', 'Are the Vitosha neighborhood and the Vitosha district the same?',
        'Не. Квартал Витоша е част от район "Лозенец". Район "Витоша" е отделна административна единица, в която влизат други квартали, например Бояна, Драгалевци и западната част на Манастирски ливади. Когато разглеждате обяви, проверете точния адрес.',
        'No. The Vitosha neighborhood is part of the Lozenets district. The Vitosha district is a separate administrative area that includes other neighborhoods, such as Boyana, Dragalevtsi and the western part of Manastirski Livadi. When looking at listings, check the exact address.'],
      ['Има ли метро в квартал Витоша?', 'Is there a metro in the Vitosha neighborhood?',
        'Не. В плановете за продължение на линия М2 към Студентски град е предвидена метростанция "Симеоновско шосе", но към момента няма обявен срок за изграждане.',
        'No. Plans to extend line M2 toward Studentski Grad include a Simeonovsko Shose station, but there is currently no announced construction date.'],
      ['На какво да обърна внимание при покупка в квартал Витоша?', 'What should I check when buying in the Vitosha neighborhood?',
        'Тъй като кварталът е бивша вилна зона, проверете достъпа до сградата, ширината на улицата и паркирането. При ново строителство проверете етапа на сградата (Акт 14, 15 или 16) и какво включва цената. Ще Ви помогнем с проверката.',
        'Because the area is a former villa zone, check access to the building, the width of the street and parking. For new builds, check the building stage (Act 14, 15 or 16) and what the price includes. We will help you with the checks.'],
    ]),
  },

  // ───────────────────────────── Люлин ─────────────────────────────
  {
    slug: 'lyulin',
    name: 'Люлин',
    nameEn: 'Lyulin',
    tagline: 'Най-големият жилищен комплекс в България, с метро и достъпни цени.',
    taglineEn: 'Bulgaria\'s largest residential complex, with a metro and affordable prices.',
    externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Sofia_west_Lyulin_IMG_1167.jpg',
    description: `Люлин е жилищен комплекс в северозападната част на София и най-големият жилищен комплекс в България - по официални данни от 2001 г. в него живеят над 120 000 души. Носи името на планината Люлин. На запад граничи с Околовръстния път, на север - с Обеля, а на югоизток е Западният парк, един от големите паркове в града.

Строителството започва през 1973 г. Комплексът е разделен на 10 микрорайона (Люлин 1 до Люлин 10), а основните булеварди са "Царица Йоанна", "Панчо Владигеров", "Европа" и "Д-р Петър Дертлиев". Сградите са предимно панелни блокове, строени от началото на 70-те до средата на 90-те години, но има и ЕПК сгради, а в някои микрорайони и ново строителство.

Люлин има метро от 1998 г. В квартала са метростанциите "Сливница", "Люлин" и "Западен парк", които го свързват директно с центъра. В плановете за метрото е предвидено и продължение по бул. "Царица Йоанна" с още две станции. В квартала се движат и трамвайни, тролейбусни и автобусни линии.

Люлин е сред най-достъпните квартали с метро в София, което го прави подходящ за купувачи на първо жилище и за инвеститори.`,
    descriptionEn: `Lyulin is a residential complex in northwestern Sofia and the largest residential complex in Bulgaria - according to official data from 2001, more than 120,000 people live here. It is named after Lyulin Mountain. It borders the Ring Road to the west and Obelya to the north, and Zapaden (West) Park, one of the city's large parks, lies to the southeast.

Construction began in 1973. The complex is divided into 10 micro-districts (Lyulin 1 to Lyulin 10), and the main boulevards are Tsaritsa Yoanna, Pancho Vladigerov, Evropa and Dr. Petar Dertliev. The buildings are mostly panel blocks built from the early 1970s to the mid-1990s, but there are also EPK-system buildings, and in some micro-districts new construction.

Lyulin has had a metro since 1998. The Slivnitsa, Lyulin and Zapaden Park stations are in the neighborhood and connect it directly to the center. Metro plans also include an extension along Tsaritsa Yoanna Blvd. with two more stations. Tram, trolleybus and bus lines also serve the area.

Lyulin is one of the most affordable neighborhoods with a metro in Sofia, which makes it a good fit for first-time buyers and investors.`,
    transport: 'Метростанции "Сливница", "Люлин" и "Западен парк" с директна връзка до центъра. Трамвайни, тролейбусни и автобусни линии. Бул. "Царица Йоанна" и тунел "Люлин" осигуряват бърза връзка с центъра и Околовръстния път.',
    transportEn: 'Slivnitsa, Lyulin and Zapaden Park metro stations with a direct link to the center. Tram, trolleybus and bus lines. Tsaritsa Yoanna Blvd. and the Lyulin tunnel provide fast links to the center and the Ring Road.',
    priceRangeSale: '1 750 – 2 600 €/кв.м',
    priceRangeRent: '500 – 800 €/мес.',
    targetAudience: 'Купувачи на първо жилище с по-ограничен бюджет, които искат метро, млади семейства и инвеститори в имоти под наем.',
    targetAudienceEn: 'First-time buyers on a tighter budget who want a metro connection, young families, and investors in rental property.',
    pros: [
      'Сред най-достъпните цени в София',
      'Три метростанции с директна връзка до центъра',
      'Западният парк в съседство',
      'Много голям избор на имоти',
    ],
    prosEn: [
      'Among the most affordable prices in Sofia',
      'Three metro stations with a direct link to the center',
      'Zapaden Park next door',
      'A very wide choice of properties',
    ],
    cons: [
      'Преобладават по-стари панелни блокове',
      'Голям и гъсто населен комплекс',
      'По-далеч от центъра в сравнение с централните квартали',
    ],
    consEn: [
      'Mostly older panel blocks',
      'A large, densely populated complex',
      'Further from the center than the central neighborhoods',
    ],
    metaDescription: 'Люлин - най-големият жилищен комплекс в България, с метро и достъпни цени. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Lyulin - Bulgaria\'s largest residential complex, with a metro and affordable prices. Apartment prices and rents as of October 2026.',
    faq: faq([
      ['Какви са цените на имотите в Люлин?', 'What are property prices like in Lyulin?',
        priceAnswer('Люлин', '1 750 – 2 600', '500 – 600', '650 – 800', 'Цената зависи силно от микрорайона и от вида на сградата.'),
        priceAnswerEn('Lyulin', '1,750–2,600', '500–600', '650–800', 'The price depends heavily on the micro-district and the type of building.')],
      ['Кои метростанции обслужват Люлин?', 'Which metro stations serve Lyulin?',
        'В квартала са метростанциите "Сливница", "Люлин" и "Западен парк", които го свързват директно с центъра. В плановете за метрото е предвидено и продължение по бул. "Царица Йоанна" с още две станции.',
        'The Slivnitsa, Lyulin and Zapaden Park metro stations are in the neighborhood and connect it directly to the center. Metro plans also include an extension along Tsaritsa Yoanna Blvd. with two more stations.'],
      ['Кой микрорайон на Люлин да избера?', 'Which part of Lyulin should I choose?',
        'Люлин е разделен на 10 микрорайона и цените между тях се различават. Важно е колко близо е имотът до метростанция, какъв е видът на сградата (панел, ЕПК или ново строителство) и дали сградата е санирана. Ще Ви помогнем да сравните конкретните варианти.',
        'Lyulin is divided into 10 micro-districts, and prices differ between them. What matters is how close the property is to a metro station, the type of building (panel, EPK or new build) and whether the building has been renovated. We will help you compare specific options.'],
      ['Подходящ ли е Люлин за инвестиция под наем?', 'Is Lyulin a good choice for a rental investment?',
        'Ниските цени на покупка и метрото правят Люлин интересен за инвеститори. Наемите са по-ниски от тези в централните квартали, затова изчислете доходността за конкретния имот - можем да го направим заедно с Вас.',
        'Low purchase prices and the metro make Lyulin attractive to investors. Rents are lower than in the central neighborhoods, so calculate the yield for the specific property - we can do that together with you.'],
    ]),
  },

  // ───────────────────────────── Надежда ─────────────────────────────
  {
    slug: 'nadezhda',
    name: 'Надежда',
    nameEn: 'Nadezhda',
    tagline: 'Северозападен квартал с метро, на около 4 км от центъра.',
    taglineEn: 'A northwestern neighborhood with a metro, about 4 km from the center.',
    externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Holy_Spirit_church%2C_Nadezhda_district%2C_Sofia%2C_%D1%86%D1%8A%D1%80%D0%BA%D0%B2%D0%B0_%D0%A1%D0%B2._%D0%94%D1%83%D1%85%2C_%D0%B6%D0%BA_%D0%9D%D0%B0%D0%B4%D0%B5%D0%B6%D0%B4%D0%B0%2C_%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.jpg',
    description: `Надежда е исторически квартал в северозападната част на София, разположен около бул. "Ломско шосе", на около 3,8 км от центъра на града. Днес се дели на четири квартала - Надежда 1, 2, 3 и 4.

Първите къщи тук са построени през 1906 г. от работници в жп работилницата, а селището получава името на княгиня Надежда, най-малката дъщеря на цар Фердинанд. През 80-те години на XX век старите къщи са заменени с многоетажни жилищни блокове, предимно панелни.

Надежда има добра метро връзка - метростанциите "Бели Дунав", "Надежда" и "Хан Кубрат" на линия М2 свързват квартала директно с центъра и с Централна гара. Кварталът се обслужва и от трамвайни и автобусни линии. Голяма част от Северния парк се намира в район "Надежда".

Цените в Надежда са сред по-достъпните в София, а метрото и близостта до центъра правят квартала интересен за купувачи на първо жилище и за инвеститори.`,
    descriptionEn: `Nadezhda is a historic neighborhood in northwestern Sofia, located around Lomsko Shose Blvd., about 3.8 km from the city center. Today it is divided into four parts - Nadezhda 1, 2, 3 and 4.

The first houses here were built in 1906 by workers at the railway workshop, and the settlement was named after Princess Nadezhda, the youngest daughter of Tsar Ferdinand. In the 1980s the old houses were replaced with multi-storey apartment blocks, mostly panel buildings.

Nadezhda has a good metro connection - the Beli Dunav, Nadezhda and Han Kubrat stations on line M2 link the neighborhood directly to the center and the Central Railway Station. It is also served by tram and bus lines. A large part of the Northern Park lies in the Nadezhda district.

Prices in Nadezhda are among the more affordable in Sofia, and the metro and proximity to the center make the neighborhood interesting for first-time buyers and investors.`,
    transport: 'Метростанции "Бели Дунав", "Надежда" и "Хан Кубрат" (линия М2) с директна връзка до центъра и Централна гара. Трамвайни и автобусни линии. Бул. "Ломско шосе" минава през квартала.',
    transportEn: 'Beli Dunav, Nadezhda and Han Kubrat metro stations (line M2) with a direct link to the center and the Central Railway Station. Tram and bus lines. Lomsko Shose Blvd. runs through the neighborhood.',
    priceRangeSale: '2 000 – 2 600 €/кв.м',
    priceRangeRent: '450 – 800 €/мес.',
    targetAudience: 'Купувачи на първо жилище, които искат метро на по-достъпна цена, млади семейства и инвеститори в имоти под наем.',
    targetAudienceEn: 'First-time buyers who want a metro connection at a more affordable price, young families, and investors in rental property.',
    pros: [
      'Три метростанции на линия М2 с директна връзка до центъра',
      'Сред по-достъпните цени в София',
      'На около 4 км от центъра',
      'Северният парк наблизо',
    ],
    prosEn: [
      'Three metro stations on line M2 with a direct link to the center',
      'Among the more affordable prices in Sofia',
      'About 4 km from the center',
      'The Northern Park nearby',
    ],
    cons: [
      'Преобладават панелни блокове от 80-те години',
      'В района има промишлени зони',
      'По-малко заведения и магазини спрямо централните квартали',
    ],
    consEn: [
      'Mostly panel blocks from the 1980s',
      'There are industrial zones in the district',
      'Fewer restaurants and shops than in the central neighborhoods',
    ],
    metaDescription: 'Надежда - северозападен квартал на София с метро М2 и достъпни цени. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Nadezhda - a northwestern Sofia neighborhood on metro line M2 with affordable prices. Prices and rents as of October 2026.',
    faq: faq([
      ['Какви са цените на имотите в Надежда?', 'What are property prices like in Nadezhda?',
        priceAnswer('Надежда', '2 000 – 2 600', '500 – 600', '550 – 775', 'Цената зависи от това в коя част на квартала е имотът (Надежда 1, 2, 3 или 4) и колко е близо до метрото.'),
        priceAnswerEn('Nadezhda', '2,000–2,600', '500–600', '550–775', 'The price depends on which part of the neighborhood the property is in (Nadezhda 1, 2, 3 or 4) and how close it is to the metro.')],
      ['Има ли метро в Надежда?', 'Is there a metro in Nadezhda?',
        'Да. Метростанциите "Бели Дунав", "Надежда" и "Хан Кубрат" на линия М2 свързват квартала директно с центъра и с Централна гара.',
        'Yes. The Beli Dunav, Nadezhda and Han Kubrat stations on line M2 connect the neighborhood directly to the center and the Central Railway Station.'],
      ['Откъде идва името Надежда?', 'Where does the name Nadezhda come from?',
        'Селището, възникнало през 1906 г. около жп работилницата, получава името на княгиня Надежда, най-малката дъщеря на цар Фердинанд.',
        'The settlement that grew up around the railway workshop in 1906 was named after Princess Nadezhda, the youngest daughter of Tsar Ferdinand.'],
      ['Подходящ ли е Надежда за инвестиция под наем?', 'Is Nadezhda a good choice for a rental investment?',
        'Метрото и по-ниските цени на покупка правят Надежда интересна за инвеститори. Наемите са по-ниски от тези в централните квартали, затова изчислете доходността за конкретния имот - можем да го направим заедно с Вас.',
        'The metro and lower purchase prices make Nadezhda attractive to investors. Rents are lower than in the central neighborhoods, so calculate the yield for the specific property - we can do that together with you.'],
    ]),
  },
]

for (const g of guides) {
  const { slug, ...fields } = g
  const doc = { ...common, ...fields, _id: `drafts.neighborhood-${slug}`, slug: { _type: 'slug', current: slug } }
  const existing = await client.fetch(`*[_type=="neighborhood" && slug.current==$slug][0]._id`, { slug })
  if (existing && !existing.startsWith('drafts.')) {
    console.error('❌  A published guide with this slug already exists:', existing)
    process.exit(1)
  }
  await client.createOrReplace(doc)
  console.log('✅  Draft saved:', g.name)
}
