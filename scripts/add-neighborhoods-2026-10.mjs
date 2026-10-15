/**
 * Adds 6 new neighborhood guides (October 2026) for areas where the agency
 * has listings but there was no guide: Сердика, Център, Гео Милев,
 * Хаджи Димитър, Красно село, Стрелбище.
 *
 * Sources (checked 2026-10-14/15), same method as refresh-neighborhoods-2026-10.mjs:
 * - Sale prices / rents: asking-price medians on imot.bg (8.10.2026) and
 *   alo.bg (14.10.2026), 2- and 3-room apartments; ranges span both sources,
 *   rounded outward to 50.
 * - Facts: bg.wikipedia.org articles for each area + "Софийско метро";
 *   Сердика's Охридско езеро complex: nag.sofia.bg permit register,
 *   economic.bg, moovitapp.com; Гео Милев metro: bTV, segabg.com,
 *   focus-news.net, money.bg (completion "autumn 2027" per Sofia Municipality).
 * - Photos: Wikimedia Commons (CC licences). No suitable photo was found for
 *   ж.к. Сердика, so that guide has none.
 * - Bus/tram line numbers deliberately left out (current numbers not confirmed).
 *
 * Note: ж.к. Сердика (район "Възраждане") is NOT район "Сердика" - the guide says so.
 *
 * Writes each guide as a Sanity DRAFT - nothing goes live until it is
 * reviewed and published in Studio.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/add-neighborhoods-2026-10.mjs
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
  // ───────────────────────────── Сердика ─────────────────────────────
  {
    slug: 'serdika',
    name: 'Сердика',
    nameEn: 'Serdika',
    tagline: 'Жилищен комплекс близо до централната част, с голям нов комплекс в строеж.',
    taglineEn: 'A residential area close to the city center, with a large new complex under construction.',
    description: `Сердика е жилищен комплекс в район "Възраждане" на София. Разположен е северно от ж.к. Лагера и бул. "Акад. Иван Евстатиев Гешов", южно от ж.к. Зона Б-5, западно от бул. "Ген. Е. И. Тотлебен" и източно от ж.к. Разсадника и Зона Б-19. Важно е да не се бърка с район "Сердика", който е отделна административна единица на около 1 км на север.

Комплексът е застроен предимно с панелни блокове. В него се намират 67 ОУ, детска градина и две професионални гимназии, а с останалата част на града го свързват автобусни и трамвайни линии.

През последните години в Сердика се строи и голям нов жилищен комплекс на ул. "Охридско езеро", с подземен паркинг, детска площадка и денонощна охрана. Така в квартала вече може да се избира между по-стари панелни апартаменти и ново строителство.

Сердика е подходящ за хора, които искат да живеят близо до централната част на София на по-ниска цена от самия център.`,
    descriptionEn: `Serdika is a residential area in Sofia's Vazrazhdane district. It lies north of the Lagera residential area and Akad. Ivan Evstatiev Geshov Blvd., south of Zona B-5, west of Gen. E. I. Totleben Blvd., and east of the Razsadnika and Zona B-19 areas. It should not be confused with the Serdika district, a separate administrative area about 1 km to the north.

The area is built up mostly with panel blocks. It has a primary school (67th), a kindergarten and two vocational high schools, and bus and tram lines connect it with the rest of the city.

In recent years a large new residential complex has also been going up on Ohridsko Ezero St., with underground parking, a playground and 24-hour security. As a result, buyers here can now choose between older panel apartments and new builds.

Serdika suits people who want to live close to central Sofia at a lower price than the center itself.`,
    transport: 'Автобусни и трамвайни линии свързват комплекса с центъра и останалата част на града. Бул. "Акад. Иван Евстатиев Гешов" и бул. "Ген. Е. И. Тотлебен" минават по границите на квартала.',
    transportEn: 'Bus and tram lines connect the area with the center and the rest of the city. Akad. Ivan Evstatiev Geshov Blvd. and Gen. E. I. Totleben Blvd. run along its edges.',
    priceRangeSale: '2 250 – 2 650 €/кв.м',
    priceRangeRent: '650 – 700 €/мес.',
    targetAudience: 'Купувачи, които искат да са близо до централната част на по-ниска цена, семейства, които търсят ново строителство с паркинг, и инвеститори.',
    targetAudienceEn: 'Buyers who want to be close to the city center at a lower price, families looking for a new build with parking, and investors.',
    pros: [
      'Близо до централната част на София',
      'По-ниски цени от центъра',
      'Голям нов жилищен комплекс с подземен паркинг и охрана',
      'Училище, детска градина и професионални гимназии в квартала',
    ],
    prosEn: [
      'Close to central Sofia',
      'Lower prices than the center',
      'A large new residential complex with underground parking and security',
      'A school, a kindergarten and vocational high schools in the area',
    ],
    cons: [
      'Голяма част от сградите са по-стари панелни блокове',
      'Активно строителство в части от квартала',
      'Името лесно се бърка с район "Сердика", който е на друго място',
    ],
    consEn: [
      'Many buildings are older panel blocks',
      'Active construction in parts of the area',
      'The name is easily confused with the Serdika district, which is elsewhere',
    ],
    metaDescription: 'Ж.к. Сердика - жилищен комплекс близо до центъра на София с ново строителство. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Serdika - a residential area near central Sofia with new construction. Apartment prices and rents as of October 2026.',
    faq: faq([
      ['Какви са цените на имотите в Сердика?', 'What are property prices like in Serdika?',
        priceAnswer('Сердика', '2 250 – 2 650', '650', '650 – 700', 'Новото строителство обикновено е в горния край на диапазона и над него.'),
        priceAnswerEn('Serdika', '2,250–2,650', '650', '650–700', 'New builds are usually at the top of the range and above it.')],
      ['Ж.к. Сердика и район "Сердика" едно и също ли са?', 'Are the Serdika residential area and the Serdika district the same?',
        'Не. Ж.к. Сердика е жилищен комплекс в район "Възраждане", северно от ж.к. Лагера. Район "Сердика" е отделна административна единица, разположена на около 1 км на север. Когато разглеждате обяви, проверете точния адрес.',
        'No. The Serdika residential area is part of the Vazrazhdane district, north of Lagera. The Serdika district is a separate administrative area about 1 km to the north. When looking at listings, check the exact address.'],
      ['Има ли ново строителство в Сердика?', 'Is there new construction in Serdika?',
        'Да. На ул. "Охридско езеро" се строи голям нов жилищен комплекс с подземен паркинг, детска площадка и денонощна охрана. Останалата част от квартала е застроена предимно с панелни блокове.',
        'Yes. A large new residential complex with underground parking, a playground and 24-hour security is being built on Ohridsko Ezero St. The rest of the area is built up mostly with panel blocks.'],
      ['На какво да обърна внимание при покупка в ново строителство?', 'What should I check when buying a new-build apartment?',
        'Проверете на какъв етап е сградата (Акт 14, 15 или 16), разрешението за строеж, какво точно включва цената (паркомясто, мазе) и в какво състояние се предава апартаментът. Ще Ви помогнем да проверите всичко това, преди да подпишете.',
        'Check what stage the building is at (Act 14, 15 or 16), the building permit, what exactly the price includes (parking space, storage room) and the condition in which the apartment is handed over. We will help you check all of this before you sign.'],
    ]),
  },

  // ───────────────────────────── Център ─────────────────────────────
  {
    slug: 'tsentar',
    name: 'Център',
    nameEn: 'Center',
    tagline: 'Историческото и административното сърце на София.',
    taglineEn: 'The historic and administrative heart of Sofia.',
    externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Vitosha_Boulevard%2C_Sofia%2C_view1.jpg',
    description: `Центърът на София, наричан често "идеален център", обхваща историческото ядро на града и основните държавни институции. На юг стига до бул. "Пенчо Славейков", на изток - до бул. "Евлоги и Христо Георгиеви", а на север - до Централна гара и бул. "Мария Луиза".

Тук са Народното събрание, Президентството, Министерският съвет, катедралата "Св. Александър Невски", храмът "Св. Неделя", Софийският университет, Националната библиотека, Софийската синагога и Баня Баши джамия. В центъра има и много останки от античната Сердика, включително ротондата "Св. Георги" и базиликата "Св. София". Бул. "Витоша", бул. "Мария Луиза" и бул. "Цар Освободител" с жълтите павета са сред най-известните улици в града.

Центърът е най-добре свързаната с метро част на София - тук се пресичат всички линии, включително при възловите станции "Сердика" и "Сердика 2". Паркирането е платено и местата са ограничени.

Жилищата в центъра са предимно в по-стари сгради, а новото строителство е рядкост. В центъра има и най-голям избор на апартаменти под наем в обявите в града.`,
    descriptionEn: `Central Sofia, often called the "ideal center", covers the city's historic core and its main state institutions. It extends south to Pencho Slaveykov Blvd., east to Evlogi i Hristo Georgievi Blvd., and north to the Central Railway Station and Maria Luiza Blvd.

It is home to the National Assembly, the Presidency, the Council of Ministers, St. Alexander Nevsky Cathedral, St. Nedelya Church, Sofia University, the National Library, the Sofia Synagogue and the Banya Bashi Mosque. The center also contains many remains of ancient Serdica, including the Rotunda of St. George and the Basilica of St. Sofia. Vitosha Blvd., Maria Luiza Blvd. and Tsar Osvoboditel Blvd. with its yellow cobblestones are among the best-known streets in the city.

The center is the best metro-connected part of Sofia - all lines meet here, including at the Serdika and Serdika 2 interchange stations. Parking is paid and spaces are limited.

Homes in the center are mostly in older buildings, and new construction is rare. The center also has the largest choice of apartments for rent in the city's listings.`,
    transport: 'Всички метролинии (М1, М2, М3 и М4) минават през центъра, включително възловите станции "Сердика" и "Сердика 2". Много трамвайни, тролейбусни и автобусни линии. Паркирането е платено.',
    transportEn: 'All metro lines (M1, M2, M3 and M4) run through the center, including the Serdika and Serdika 2 interchange stations. Many tram, trolleybus and bus lines. Parking is paid.',
    priceRangeSale: '3 300 – 3 800 €/кв.м',
    priceRangeRent: '700 – 1 000 €/мес.',
    targetAudience: 'Хора, които искат да живеят в сърцето на града без нужда от кола, инвеститори в имоти под наем и купувачи, които ценят историческите сгради.',
    targetAudienceEn: 'People who want to live in the heart of the city without needing a car, investors in rental property, and buyers who appreciate historic buildings.',
    pros: [
      'Всички метролинии и най-добрата транспортна връзка в града',
      'Институции, университети, музеи, театри и заведения на пешеходно разстояние',
      'Най-голям избор на апартаменти под наем в града',
      'Исторически сгради и забележителности',
    ],
    prosEn: [
      'Every metro line and the best transport links in the city',
      'Institutions, universities, museums, theaters and restaurants within walking distance',
      'The largest choice of rental apartments in the city',
      'Historic buildings and landmarks',
    ],
    cons: [
      'Високи цени',
      'Платено паркиране и малко места',
      'Предимно по-стари сгради, новото строителство е рядкост',
    ],
    consEn: [
      'High prices',
      'Paid parking and few spaces',
      'Mostly older buildings - new construction is rare',
    ],
    metaDescription: 'Център на София - историческото сърце на града с всички метролинии. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Central Sofia - the historic heart of the city, served by every metro line. Apartment prices and rents as of October 2026.',
    faq: faq([
      ['Какви са цените на имотите в центъра на София?', 'What are property prices like in central Sofia?',
        priceAnswer('центъра на София', '3 300 – 3 800', '700', '900 – 1 000', 'Цената силно зависи от конкретната улица, сградата и състоянието на имота.'),
        priceAnswerEn('central Sofia', '3,300–3,800', '700', '900–1,000', 'The price depends heavily on the specific street, the building and the condition of the property.')],
      ['Кои метростанции има в центъра?', 'Which metro stations are in the center?',
        'През центъра минават всички четири метролинии. Най-важните възлови станции са "Сердика" (линии М1 и М4) и "Сердика 2" (линия М2), а линия М3 минава през станции като "Орлов мост" и "Патриарх Евтимий".',
        'All four metro lines run through the center. The main interchange stations are Serdika (lines M1 and M4) and Serdika 2 (line M2), and line M3 runs through stations such as Orlov Most and Patriarh Evtimiy.'],
      ['Какво да проверя при покупка на апартамент в стара сграда в центъра?', 'What should I check when buying an apartment in an old building in the center?',
        'Проверете годината на строителство и състоянието на конструкцията, покрива и общите части, дали има асансьор и дали сградата не е паметник на културата - това може да ограничи ремонтите. Проверете и възможностите за паркиране. Ще прегледаме имота и документите заедно с Вас.',
        'Check the year of construction and the condition of the structure, roof and common areas, whether there is an elevator, and whether the building is a listed cultural monument - this can restrict renovations. Also check the parking options. We will review the property and the documents together with you.'],
      ['Подходящ ли е центърът за инвестиция под наем?', 'Is the center a good choice for a rental investment?',
        'Центърът има най-голям пазар на имоти под наем в София, но и голяма конкуренция между наемодателите. Цените на покупка са високи, затова е важно да изчислите доходността за конкретния имот. Можем да направим тази сметка заедно с Вас.',
        'The center has the largest rental market in Sofia, but also strong competition between landlords. Purchase prices are high, so it is important to calculate the yield for the specific property. We can do that calculation together with you.'],
    ]),
  },

  // ───────────────────────────── Гео Милев ─────────────────────────────
  {
    slug: 'geo-milev',
    name: 'Гео Милев',
    nameEn: 'Geo Milev',
    tagline: 'Търсен квартал на 3 км от центъра, с метро в строеж.',
    taglineEn: 'A sought-after neighborhood 3 km from the center, with a metro under construction.',
    externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Geo_Milev_Park.jpg',
    description: `Гео Милев е квартал в район "Слатина", на около 3 км от центъра на София. Граничи с кварталите Редута, Слатина, Изток и Яворов, а границите му са бул. "Ситняково" на запад, парк "Гео Милев" на север и бул. "Цариградско шосе" на юг. Кварталът носи името на поета Гео Милев.

Кварталът започва да се застроява през 30-те години на XX век. Днес преобладават по-стари тухлени сгради, но има и много ново строителство. Тук се намират сградата на Министерството на външните работи, зала "Универсиада", пазар "Ситняково", парк "Гео Милев", няколко посолства, както и много ресторанти, кафенета и хотели.

В квартала има няколко училища, сред които 31 СУЧЕМ "Иван Вазов", 93 СУ и 138 СУ, както и детски градини и поликлиника.

Голяма промяна за квартала е метрото. В момента се строи продължение на линия М3 с две метростанции в Гео Милев - на кръстовището на ул. "Гео Милев" с бул. "Ситняково" и на кръстовището на ул. "Гео Милев" с ул. "Николай Коперник". По последна информация на Столична община участъкът трябва да бъде завършен през есента на 2027 г.`,
    descriptionEn: `Geo Milev is a neighborhood in the Slatina district, about 3 km from central Sofia. It borders the Reduta, Slatina, Iztok and Yavorov neighborhoods, and is bounded by Sitnyakovo Blvd. to the west, Geo Milev Park to the north and Tsarigradsko Shose Blvd. to the south. It is named after the poet Geo Milev.

Development began in the 1930s. Today older brick buildings predominate, but there is also a lot of new construction. The neighborhood is home to the Ministry of Foreign Affairs building, Universiada Hall, Sitnyakovo market, Geo Milev Park, several embassies, and many restaurants, cafés and hotels.

There are several schools, including the 31st Secondary School "Ivan Vazov", the 93rd and the 138th, as well as kindergartens and a polyclinic.

The metro is a big change for the neighborhood. An extension of line M3 is under construction with two stations in Geo Milev - at the junction of Geo Milev St. and Sitnyakovo Blvd., and at the junction of Geo Milev St. and Nikolay Kopernik St. According to the latest information from Sofia Municipality, the section is due for completion in autumn 2027.`,
    transport: 'Трамвайни, тролейбусни и автобусни линии, бул. "Цариградско шосе" и бул. "Шипченски проход" до центъра. Линия М3 на метрото се строи с две станции в квартала (очаквано завършване - есента на 2027 г. по информация на Столична община).',
    transportEn: 'Tram, trolleybus and bus lines, and Tsarigradsko Shose and Shipchenski Prohod boulevards to the center. Metro line M3 is under construction with two stations in the neighborhood (expected completion autumn 2027, according to Sofia Municipality).',
    priceRangeSale: '3 250 – 3 700 €/кв.м',
    priceRangeRent: '650 – 850 €/мес.',
    targetAudience: 'Семейства и професионалисти, които търсят квартал близо до центъра с паркове и училища, и инвеститори, които залагат на бъдещото метро.',
    targetAudienceEn: 'Families and professionals looking for a neighborhood close to the center with parks and schools, and investors betting on the future metro.',
    pros: [
      'На около 3 км от центъра',
      'Две бъдещи метростанции на линия М3',
      'Парк "Гео Милев", пазар "Ситняково", много заведения',
      'Няколко училища, детски градини и поликлиника',
    ],
    prosEn: [
      'About 3 km from the center',
      'Two future metro stations on line M3',
      'Geo Milev Park, Sitnyakovo market and many restaurants',
      'Several schools, kindergartens and a polyclinic',
    ],
    cons: [
      'Високи цени',
      'Строителството на метрото затруднява движението до завършването му',
      'Голяма част от сградите са по-стари',
    ],
    consEn: [
      'High prices',
      'Metro construction disrupts traffic until it is finished',
      'Many buildings are older',
    ],
    metaDescription: 'Гео Милев - квартал на 3 км от центъра на София с метро в строеж. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Geo Milev - a Sofia neighborhood 3 km from the center with a metro under construction. Prices and rents as of October 2026.',
    faq: faq([
      ['Какви са цените на имотите в Гео Милев?', 'What are property prices like in Geo Milev?',
        priceAnswer('Гео Милев', '3 250 – 3 700', '650', '800 – 850'),
        priceAnswerEn('Geo Milev', '3,250–3,700', '650', '800–850')],
      ['Кога ще има метро в Гео Милев?', 'When will Geo Milev get a metro?',
        'В момента се строи продължение на линия М3 с две метростанции в квартала. По последна информация на Столична община участъкът трябва да бъде завършен през есента на 2027 г. Сроковете на големи инфраструктурни проекти често се променят, затова следете официалната информация.',
        'An extension of line M3 with two stations in the neighborhood is currently under construction. According to the latest information from Sofia Municipality, the section is due for completion in autumn 2027. Deadlines for large infrastructure projects often change, so keep an eye on official updates.'],
      ['Какви училища има в Гео Милев?', 'What schools are there in Geo Milev?',
        'В квартала са 31 СУЧЕМ "Иван Вазов", 93 СУ "Александър Теодоров-Балан" и 138 СУ "Проф. Васил Златарски", както и няколко детски градини.',
        'The neighborhood has the 31st Secondary School "Ivan Vazov", the 93rd Secondary School "Aleksandar Teodorov-Balan" and the 138th Secondary School "Prof. Vasil Zlatarski", as well as several kindergartens.'],
      ['Ще поскъпнат ли имотите в Гео Милев с метрото?', 'Will property prices in Geo Milev rise with the metro?',
        'Новите метростанции обикновено повишават търсенето в квартала, но никой не може да гарантира конкретен ръст на цените. Ако купувате с тази цел, сравнете цената с вече свързаните с метро квартали наблизо. Ще Ви помогнем с тази оценка.',
        'New metro stations usually increase demand in a neighborhood, but no one can guarantee a specific price increase. If you are buying for this reason, compare the price with nearby neighborhoods that already have a metro. We will help you with this assessment.'],
    ]),
  },

  // ───────────────────────────── Хаджи Димитър ─────────────────────────────
  {
    slug: 'hadzhi-dimitar',
    name: 'Хаджи Димитър',
    nameEn: 'Hadzhi Dimitar',
    tagline: 'Един от най-старите квартали на София, близо до центъра и с метро.',
    taglineEn: 'One of Sofia\'s oldest neighborhoods, close to the center and on the metro.',
    externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Hadzhi_Dimitar_metrostation.jpg',
    description: `Хаджи Димитър е жилищен комплекс в район "Подуяне" и един от най-старите квартали на София. Намира се близо до централната част - на няколко минути от бул. "Княз Александър Дондуков", бул. "Васил Левски" и площад "Сточна гара". Кварталът носи името на войводата Хаджи Димитър, чийто паметник е в центъра на квартала.

По време на социализма старите къщи са заменени с жилищни блокове. Днес кварталът е смесица от ниски тухлени къщи, панелни блокове от 60-те, 70-те и 80-те години и ново строителство след 1990 г. Главната улица е "Макгахан", а други важни улици са бул. "Владимир Вазов" и ул. "Васил Кънчев".

През квартала минава линия М3 на метрото с метростанция "Хаджи Димитър", която го свързва директно с центъра. От август 2026 г. линията продължава и на североизток към кварталите Левски.

В квартала има три училища - 42 ОУ "Хаджи Димитър", 24 СУ "Пейо Крачолов Яворов" и 95 СУ "Проф. Иван Шишманов", както и много детски градини, повечето от които са ремонтирани или новопостроени след 2008 г. Наблизо е Заимовата градина.`,
    descriptionEn: `Hadzhi Dimitar is a residential area in the Poduyane district and one of Sofia's oldest neighborhoods. It is close to the city center - a few minutes from Knyaz Aleksandar Dondukov Blvd., Vasil Levski Blvd. and Stochna Gara Square. It is named after the revolutionary Hadzhi Dimitar, whose monument stands in the middle of the neighborhood.

During the socialist era the old houses were replaced with apartment blocks. Today the neighborhood is a mix of low brick houses, panel blocks from the 1960s, 70s and 80s, and new construction since 1990. The main street is Makgahan St., and other important streets are Vladimir Vazov Blvd. and Vasil Kanchev St.

Metro line M3 runs through the neighborhood, with Hadzhi Dimitar station connecting it directly to the center. Since August 2026 the line has also continued northeast toward the Levski neighborhoods.

There are three schools - the 42nd Primary School "Hadzhi Dimitar", the 24th Secondary School "Peyo Kracholov Yavorov" and the 95th Secondary School "Prof. Ivan Shishmanov" - and many kindergartens, most of them renovated or newly built since 2008. Zaimov Park is nearby.`,
    transport: 'Метростанция "Хаджи Димитър" (линия М3) с директна връзка до центъра. Автобусни и тролейбусни линии. Бул. "Владимир Вазов" минава през квартала.',
    transportEn: 'Hadzhi Dimitar metro station (line M3) with a direct link to the center. Bus and trolleybus lines. Vladimir Vazov Blvd. runs through the neighborhood.',
    priceRangeSale: '2 550 – 2 650 €/кв.м',
    priceRangeRent: '600 – 700 €/мес.',
    targetAudience: 'Купувачи, които искат метро и близост до центъра на по-умерена цена, семейства с деца и инвеститори в имоти под наем.',
    targetAudienceEn: 'Buyers who want a metro and proximity to the center at a more moderate price, families with children, and investors in rental property.',
    pros: [
      'Метростанция "Хаджи Димитър" с директна връзка до центъра',
      'Близо до централната част и Заимовата градина',
      'Три училища и много ремонтирани или нови детски градини',
      'По-умерени цени от центъра',
    ],
    prosEn: [
      'Hadzhi Dimitar metro station with a direct link to the center',
      'Close to the city center and Zaimov Park',
      'Three schools and many renovated or new kindergartens',
      'More moderate prices than the center',
    ],
    cons: [
      'Голяма част от сградите са по-стари панелни блокове',
      'Смесено застрояване - стари къщи до блокове и нови сгради',
    ],
    consEn: [
      'Many buildings are older panel blocks',
      'Mixed development - old houses next to blocks and new buildings',
    ],
    metaDescription: 'Хаджи Димитър - стар квартал близо до центъра на София с метро М3. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Hadzhi Dimitar - an old Sofia neighborhood close to the center, on metro line M3. Prices and rents as of October 2026.',
    faq: faq([
      ['Какви са цените на имотите в Хаджи Димитър?', 'What are property prices like in Hadzhi Dimitar?',
        priceAnswer('Хаджи Димитър', '2 550 – 2 650', '600 – 650', '700'),
        priceAnswerEn('Hadzhi Dimitar', '2,550–2,650', '600–650', '700')],
      ['Има ли метро в Хаджи Димитър?', 'Is there a metro in Hadzhi Dimitar?',
        'Да. Метростанция "Хаджи Димитър" е на линия М3 и свързва квартала директно с центъра. От август 2026 г. линията продължава и на североизток към кварталите Левски.',
        'Yes. Hadzhi Dimitar station is on line M3 and connects the neighborhood directly to the center. Since August 2026 the line has also continued northeast toward the Levski neighborhoods.'],
      ['Какви училища има в Хаджи Димитър?', 'What schools are there in Hadzhi Dimitar?',
        'В квартала са 42 ОУ "Хаджи Димитър", 24 СУ "Пейо Крачолов Яворов" и 95 СУ "Проф. Иван Шишманов". Има и много детски градини, повечето ремонтирани или новопостроени след 2008 г.',
        'The neighborhood has the 42nd Primary School "Hadzhi Dimitar", the 24th Secondary School "Peyo Kracholov Yavorov" and the 95th Secondary School "Prof. Ivan Shishmanov". There are also many kindergartens, most renovated or newly built since 2008.'],
      ['Какви сгради има в Хаджи Димитър?', 'What kinds of buildings are there in Hadzhi Dimitar?',
        'Кварталът е смесица от ниски тухлени къщи, панелни блокове от 60-те, 70-те и 80-те години и ново строителство след 1990 г. При покупка в панелен блок проверете дали сградата е санирана и в какво състояние са общите части.',
        'The neighborhood is a mix of low brick houses, panel blocks from the 1960s, 70s and 80s, and new construction since 1990. When buying in a panel block, check whether the building has been renovated and the condition of the common areas.'],
    ]),
  },

  // ───────────────────────────── Красно село ─────────────────────────────
  {
    slug: 'krasno-selo',
    name: 'Красно село',
    nameEn: 'Krasno Selo',
    tagline: 'Утвърден югозападен квартал с метро и покрит пазар.',
    taglineEn: 'An established southwestern neighborhood with a metro and a covered market.',
    externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/38/%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE_%D1%81%D0%B5%D0%BB%D0%BE%2C_%D0%B3%D0%BB%D0%B5%D0%B4%D0%BA%D0%B0_%D0%BA%D1%8A%D0%BC_%D0%92%D0%B8%D1%82%D0%BE%D1%88%D0%B0-_Krasno_selo%2C_view_of_Vitosha_Mountain_-_panoramio_%281%29.jpg',
    description: `Красно село е квартал в югозападната част на София и част от едноименния район. Основните булеварди са бул. "Цар Борис III", който пресича квартала в посока север-юг, и бул. "Гоце Делчев" в посока изток-запад. През квартала тече Боянската река, а Красно село и ж.к. Лагера отчасти се припокриват.

Кварталът има интересна история. Първите заселници пристигат в края на XIX век, а през 1903 г. жителите избират името "Красно село" по предложение на Иван Вазов. През 1901 г. по днешния бул. "Цар Борис III" е открита една от първите трамвайни линии на Балканите, която допринася за бързото развитие на района.

От 70-те години на XX век тук се строят монолитни сгради, а след 1980 г. и сгради по технологията ЕПК. В квартала се намират покритият пазар "Красно село" и голяма детска градина.

Кварталът се обслужва от линия М3 на метрото с метростанция "Цар Борис III" на кръстовището с бул. "Гоце Делчев", както и от трамвайни, тролейбусни и автобусни линии.`,
    descriptionEn: `Krasno Selo is a neighborhood in southwestern Sofia and part of the district of the same name. Its main boulevards are Tsar Boris III Blvd., which crosses it from north to south, and Gotse Delchev Blvd., running east to west. The Boyana River flows through the neighborhood, and Krasno Selo partly overlaps with the Lagera residential area.

The neighborhood has an interesting history. The first settlers arrived at the end of the 19th century, and in 1903 the residents chose the name "Krasno Selo" on the suggestion of the writer Ivan Vazov. In 1901 one of the first tram lines in the Balkans opened along today's Tsar Boris III Blvd., which helped the area grow quickly.

From the 1970s monolithic buildings were built here, and after 1980 also EPK-system buildings. The neighborhood has the covered Krasno Selo market and a large kindergarten.

It is served by metro line M3 with Tsar Boris III station at the junction with Gotse Delchev Blvd., as well as by tram, trolleybus and bus lines.`,
    transport: 'Метростанция "Цар Борис III" (линия М3) с директна връзка до центъра. Трамвайни, тролейбусни и автобусни линии по бул. "Цар Борис III" и бул. "Гоце Делчев".',
    transportEn: 'Tsar Boris III metro station (line M3) with a direct link to the center. Tram, trolleybus and bus lines along Tsar Boris III and Gotse Delchev boulevards.',
    priceRangeSale: '2 850 – 3 100 €/кв.м',
    priceRangeRent: '700 – 800 €/мес.',
    targetAudience: 'Семейства и професионалисти, които търсят утвърден квартал с метро и всички удобства, и инвеститори в имоти под наем.',
    targetAudienceEn: 'Families and professionals looking for an established neighborhood with a metro and all amenities, and investors in rental property.',
    pros: [
      'Метро линия М3 и много трамвайни и тролейбусни линии',
      'Утвърден квартал с покрит пазар и всички ежедневни удобства',
      'Добра връзка с центъра по бул. "Цар Борис III"',
    ],
    prosEn: [
      'Metro line M3 and many tram and trolleybus lines',
      'An established neighborhood with a covered market and all everyday amenities',
      'A good link to the center along Tsar Boris III Blvd.',
    ],
    cons: [
      'Главните булеварди през квартала са натоварени',
      'Голяма част от сградите са от 70-те и 80-те години',
    ],
    consEn: [
      'The main boulevards through the neighborhood are busy',
      'Many buildings date from the 1970s and 80s',
    ],
    metaDescription: 'Красно село - утвърден квартал в Югозападна София с метро М3 и покрит пазар. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Krasno Selo - an established southwest Sofia neighborhood with metro line M3 and a covered market. Prices and rents, October 2026.',
    faq: faq([
      ['Какви са цените на имотите в Красно село?', 'What are property prices like in Krasno Selo?',
        priceAnswer('Красно село', '2 850 – 3 100', '700', '800'),
        priceAnswerEn('Krasno Selo', '2,850–3,100', '700', '800')],
      ['Има ли метро в Красно село?', 'Is there a metro in Krasno Selo?',
        'Да. Метростанция "Цар Борис III" на линия М3 е на кръстовището на бул. "Цар Борис III" и бул. "Гоце Делчев" и свързва квартала директно с центъра.',
        'Yes. Tsar Boris III station on line M3 is at the junction of Tsar Boris III and Gotse Delchev boulevards and connects the neighborhood directly to the center.'],
      ['Откъде идва името Красно село?', 'Where does the name Krasno Selo come from?',
        'През 1903 г. жителите на тогавашната махала помолили Иван Вазов да предложи име. Той предложил "Калояново" и "Красно село", а жителите избрали второто, което се използва и до днес.',
        'In 1903 the residents of what was then a small settlement asked Ivan Vazov to suggest a name. He proposed "Kaloyanovo" and "Krasno Selo", and the residents chose the second, which is still used today.'],
      ['Каква е връзката между Красно село и Лагера?', 'How are Krasno Selo and Lagera related?',
        'Кварталите са съседни и отчасти се припокриват, затова в обявите един и същ адрес понякога е описан по различен начин. Преди оглед проверете точния адрес на имота.',
        'The neighborhoods are adjacent and partly overlap, so the same address is sometimes described differently in listings. Check the exact address of the property before a viewing.'],
    ]),
  },

  // ───────────────────────────── Стрелбище ─────────────────────────────
  {
    slug: 'strelbishte',
    name: 'Стрелбище',
    nameEn: 'Strelbishte',
    tagline: 'Добре свързан южен квартал до Южния парк.',
    taglineEn: 'A well-connected southern neighborhood next to South Park.',
    externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/%D0%A1%D0%A2%D0%A0%D0%95%D0%9B%D0%91%D0%98%D0%A9%D0%95_%D0%91%D0%A3%D0%9B._%D0%91%D0%AA%D0%9B%D0%93%D0%90%D0%A0%D0%98%D0%AF%2C_%D0%A1%D0%9E%D0%A4%D0%98%D0%AF%2C_BULGARIA_BLVD%2C_STRELBISHTE%2C_SOFIA.jpg',
    description: `Стрелбище е жилищен комплекс в южната част на София, част от район "Триадица". На изток граничи с бул. "П. Ю. Тодоров", Южния парк и пазар "Иван Вазов", на юг - с бул. "Гоце Делчев", а на северозапад - с бул. "България".

Името идва от стрелбищата на войниците от Първи и Шести пехотен полк, които някога са се намирали тук. Кварталът се развива след войните за национално обединение в началото на XX век, а днес е съчетание от панелни, тухлени, ЕПК и модерни сгради. Първите панелни блокове са построени в края на 60-те години, а почти всички сгради са с централно отопление.

Стрелбище е сред най-добре свързаните с градски транспорт квартали в София - покрай него минават трамвайни, тролейбусни и автобусни линии. В самия квартал няма метростанция.

В квартала се намират Втора английска езикова гимназия "Томас Джеферсън", Националната професионална гимназия по полиграфия и фотография и 126 ОУ. Близостта до Южния парк е едно от най-големите предимства за живеещите тук.`,
    descriptionEn: `Strelbishte is a residential area in the south of Sofia, part of the Triaditsa district. It borders P. Yu. Todorov Blvd., South Park and the Ivan Vazov market to the east, Gotse Delchev Blvd. to the south, and Bulgaria Blvd. to the northwest.

The name ("shooting range") comes from the firing ranges of the soldiers of the First and Sixth Infantry Regiments that were once located here. The area developed after the wars of national unification in the early 20th century, and today it combines panel, brick, EPK and modern buildings. The first panel blocks were built in the late 1960s, and almost all buildings have central heating.

Strelbishte is one of Sofia's best-connected neighborhoods by public transport - tram, trolleybus and bus lines run along its edges. There is no metro station in the neighborhood itself.

The neighborhood is home to the Second English Language School "Thomas Jefferson", the National Vocational High School of Printing and Photography and the 126th Primary School. Being next to South Park is one of the biggest advantages for residents.`,
    transport: 'Трамвайни, тролейбусни и автобусни линии по бул. "България", бул. "Гоце Делчев" и бул. "П. Ю. Тодоров". В самия квартал няма метростанция.',
    transportEn: 'Tram, trolleybus and bus lines along Bulgaria, Gotse Delchev and P. Yu. Todorov boulevards. There is no metro station in the neighborhood itself.',
    priceRangeSale: '3 200 – 3 700 €/кв.м',
    priceRangeRent: '600 – 800 €/мес.',
    targetAudience: 'Семейства с деца, които ценят Южния парк и добрите училища, и купувачи, които искат добре свързан южен квартал.',
    targetAudienceEn: 'Families with children who value South Park and good schools, and buyers who want a well-connected southern neighborhood.',
    pros: [
      'До Южния парк',
      'Много трамвайни, тролейбусни и автобусни линии',
      'Втора английска езикова гимназия и други училища в квартала',
      'Почти всички сгради са с централно отопление',
    ],
    prosEn: [
      'Next to South Park',
      'Many tram, trolleybus and bus lines',
      'The Second English Language School and other schools in the neighborhood',
      'Almost all buildings have central heating',
    ],
    cons: [
      'Няма метростанция в самия квартал',
      'Голяма част от сградите са панелни блокове от 60-те до 80-те години',
      'Цените са над средните за София',
    ],
    consEn: [
      'No metro station in the neighborhood itself',
      'Many buildings are panel blocks from the 1960s to the 1980s',
      'Prices are above the Sofia average',
    ],
    metaDescription: 'Стрелбище - добре свързан южен квартал до Южния парк в София. Актуални цени на апартаменти и наеми към октомври 2026, училища, транспорт.',
    metaDescriptionEn: 'Strelbishte - a well-connected southern Sofia neighborhood next to South Park. Prices and rents as of October 2026, schools, transport.',
    faq: faq([
      ['Какви са цените на имотите в Стрелбище?', 'What are property prices like in Strelbishte?',
        priceAnswer('Стрелбище', '3 200 – 3 700', '600 – 650', '750 – 800'),
        priceAnswerEn('Strelbishte', '3,200–3,700', '600–650', '750–800')],
      ['Има ли метро в Стрелбище?', 'Is there a metro in Strelbishte?',
        'В самия квартал няма метростанция. Стрелбище обаче е сред най-добре свързаните с градски транспорт квартали - покрай него минават много трамвайни, тролейбусни и автобусни линии.',
        'There is no metro station in the neighborhood itself. However, Strelbishte is one of the best-connected neighborhoods by public transport - many tram, trolleybus and bus lines run along its edges.'],
      ['Откъде идва името Стрелбище?', 'Where does the name Strelbishte come from?',
        'В миналото тук са се намирали стрелбищата на войниците от Първи и Шести пехотен полк, а на близката околовръстна жп линия е имало спирка със същото име.',
        'In the past this was the location of the firing ranges of the First and Sixth Infantry Regiments, and there was a stop of the same name on the nearby ring railway.'],
      ['Подходящ ли е Стрелбище за семейства?', 'Is Strelbishte suitable for families?',
        'Да. Южният парк е в съседство, а в квартала се намират Втора английска езикова гимназия, 126 ОУ и други училища. Добрият градски транспорт улеснява ежедневното придвижване.',
        'Yes. South Park is right next door, and the neighborhood is home to the Second English Language School, the 126th Primary School and other schools. Good public transport makes everyday travel easy.'],
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
