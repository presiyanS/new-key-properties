/**
 * Adds 4 more neighborhood guides (October 2026) for some of Sofia's
 * most-searched areas: Бояна, Студентски град, Изгрев, Изток.
 *
 * Same method as add-neighborhoods-2026-10.mjs:
 * - Sale prices / rents: asking-price medians on imot.bg (8.10.2026) and
 *   alo.bg (14.10.2026), 2- and 3-room apartments; ranges span both sources,
 *   rounded outward to 50. Изгрев has very few listings, so its range is wide
 *   and the guide says so.
 * - Facts: bg.wikipedia.org articles for each area + "Софийско метро";
 *   planned M2 extension to Студентски град: Wikipedia + novinite.com.
 * - Photos: Wikimedia Commons (CC licences).
 * - Bus line numbers deliberately left out (current numbers not confirmed).
 *
 * Writes each guide as a Sanity DRAFT.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/add-neighborhoods-2026-10-b.mjs
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
  // ───────────────────────────── Бояна ─────────────────────────────
  {
    slug: 'boyana',
    name: 'Бояна',
    nameEn: 'Boyana',
    tagline: 'Престижен квартал в подножието на Витоша с Боянската църква.',
    taglineEn: 'A prestigious neighborhood at the foot of Vitosha, home to Boyana Church.',
    externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Boyana_Church_2_TB.JPG',
    description: `Бояна е квартал в район "Витоша", на около 7 км южно от центъра на София, в подножието на Витоша. До 1961 г. Бояна е отделно село, а днес е сред най-престижните адреси в града. Тук се намира и резиденция "Бояна".

Кварталът има богата история. През Средновековието тук е извънградската резиденция на севастократор Калоян, част от която е Боянската църква "Св. св. Никола и Пантелеймон" - паметник на културата, включен в списъка на световното културно наследство на ЮНЕСКО. В квартала е и Националният исторически музей.

Бояна е много близо до природата. От квартала започват пътища и пътеки към Витоша, а Боянският водопад е на около 5 км от центъра на квартала и е любимо място за разходка през уикенда.

Основната връзка с центъра на града е бул. "България". В квартала няма метро и в ежедневието повечето жители използват собствен автомобил. В обявите има голям избор на апартаменти, а къщите и имотите с дворове се оценяват отделно.`,
    descriptionEn: `Boyana is a neighborhood in Sofia's Vitosha district, about 7 km south of the city center, at the foot of Mount Vitosha. Until 1961 Boyana was a separate village; today it is one of the most prestigious addresses in the city. It is also home to the Boyana Residence.

The neighborhood has a rich history. In the Middle Ages it was the country residence of the sebastocrator Kaloyan, part of which is the Boyana Church of Saints Nicholas and Panteleimon - a cultural monument on the UNESCO World Heritage List. The National History Museum is also in the neighborhood.

Boyana is very close to nature. Roads and trails to Vitosha start from the neighborhood, and the Boyana Waterfall, about 5 km from the center of the neighborhood, is a favorite weekend walking destination.

The main link to the city center is Bulgaria Blvd. There is no metro, and in everyday life most residents use a car. Listings offer a wide choice of apartments, while houses and properties with gardens are priced separately.`,
    transport: 'Основната връзка с центъра е бул. "България". Кварталът се обслужва от автобусни линии, но няма метро и в ежедневието повечето жители използват собствен автомобил.',
    transportEn: 'The main link to the center is Bulgaria Blvd. The neighborhood is served by bus lines but has no metro, and in everyday life most residents use a car.',
    priceRangeSale: '2 600 – 2 950 €/кв.м',
    priceRangeRent: '550 – 1 300 €/мес.',
    targetAudience: 'Семейства, които търсят престижен и зелен квартал близо до Витоша, и купувачи, които ценят историята и спокойствието.',
    targetAudienceEn: 'Families looking for a prestigious, green neighborhood close to Vitosha, and buyers who value history and peace and quiet.',
    pros: [
      'Престижен адрес в подножието на Витоша',
      'Боянската църква (ЮНЕСКО) и Националният исторически музей',
      'Пътеки към Витоша и Боянския водопад',
      'Голям избор на апартаменти в обявите',
    ],
    prosEn: [
      'A prestigious address at the foot of Vitosha',
      'Boyana Church (UNESCO) and the National History Museum',
      'Trails to Vitosha and the Boyana Waterfall',
      'A wide choice of apartments in the listings',
    ],
    cons: [
      'Няма метро - в ежедневието е нужен автомобил',
      'По-далеч от центъра в сравнение с централните квартали',
    ],
    consEn: [
      'No metro - a car is needed for everyday life',
      'Further from the center than the central neighborhoods',
    ],
    metaDescription: 'Бояна - престижен квартал в подножието на Витоша с Боянската църква. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Boyana - a prestigious Sofia neighborhood at the foot of Vitosha, home to Boyana Church. Prices and rents as of October 2026.',
    faq: faq([
      ['Какви са цените на имотите в Бояна?', 'What are property prices like in Boyana?',
        priceAnswer('Бояна', '2 600 – 2 950', '550 – 800', '900 – 1 300', 'Къщите и имотите с дворове се оценяват отделно и често са значително по-скъпи.'),
        priceAnswerEn('Boyana', '2,600–2,950', '550–800', '900–1,300', 'Houses and properties with gardens are priced separately and are often significantly more expensive.')],
      ['Има ли метро в Бояна?', 'Is there a metro in Boyana?',
        'Не. Основната връзка с центъра е бул. "България", а кварталът се обслужва от автобусни линии. В ежедневието повечето жители използват собствен автомобил.',
        'No. The main link to the center is Bulgaria Blvd., and the neighborhood is served by bus lines. In everyday life most residents use a car.'],
      ['С какво е известна Бояна?', 'What is Boyana known for?',
        'С Боянската църква "Св. св. Никола и Пантелеймон", включена в списъка на световното културно наследство на ЮНЕСКО, с Националния исторически музей, с резиденция "Бояна" и с Боянския водопад на Витоша.',
        'For the Boyana Church of Saints Nicholas and Panteleimon, on the UNESCO World Heritage List, the National History Museum, the Boyana Residence, and the Boyana Waterfall on Vitosha.'],
      ['На какво да обърна внимание при покупка на къща в Бояна?', 'What should I check when buying a house in Boyana?',
        'Освен стандартната проверка на документите, проверете връзката с водопровода и канализацията, достъпа до имота и дали улицата е асфалтирана. Ако имате нужда от помощ, ще прегледаме имота и документите заедно с Вас.',
        'Besides the standard document checks, check the water and sewer connections, access to the property and whether the street is paved. If you need help, we will review the property and the documents together with you.'],
    ]),
  },

  // ───────────────────────────── Студентски град ─────────────────────────────
  {
    slug: 'studentski-grad',
    name: 'Студентски град',
    nameEn: 'Studentski Grad',
    tagline: 'Оживен квартал с шест университета и постоянно търсене на наеми.',
    taglineEn: 'A lively neighborhood with six universities and steady rental demand.',
    externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Studentski_grad_Sofia_20090406_008.JPG',
    description: `Студентски град е жилищен комплекс в Югоизточна София, част от район "Студентски". Граничи с кварталите Дианабад, Дървеница, Витоша и Малинова долина и се намира в полите на Витоша.

Кварталът е проектиран като студентско градче. Строителството започва през 60-те години на XX век, а официално е открит на 5 декември 1975 г. След 2010 г. в Студентски град има строителен бум - появяват се нови жилищни сгради, търговски, спортни и бизнес центрове.

Тук се намират шест висши училища - УНСС, Техническият университет, Минно-геоложкият университет, Химикотехнологичният и металургичен университет, Лесотехническият университет и Националната спортна академия. В квартала са и зала "Христо Ботев", Зимният дворец на спорта, хипермаркети на големите вериги и Студентската поликлиника, а наблизо е Зоологическата градина.

В Студентски град все още няма метро. В плановете за продължение на линия М2 са предвидени метростанции при Националната спортна академия и при УНСС, но без обявен срок за изграждане. С кола се стига бързо по Симеоновско шосе, бул. "Акад. Стефан Младенов" и Околовръстния път.`,
    descriptionEn: `Studentski Grad is a residential area in southeastern Sofia, part of the Studentski district. It borders the Dianabad, Darvenitsa, Vitosha and Malinova Dolina neighborhoods and lies on the lower slopes of Vitosha.

It was designed as a student town. Construction began in the 1960s, and it was officially opened on 5 December 1975. After 2010 Studentski Grad saw a building boom, with new residential buildings and shopping, sports and business centers.

Six universities are located here - the University of National and World Economy (UNWE), the Technical University, the University of Mining and Geology, the University of Chemical Technology and Metallurgy, the University of Forestry and the National Sports Academy. The neighborhood also has Hristo Botev Hall, the Winter Palace of Sports, hypermarkets of the major chains and the Student Polyclinic, and Sofia Zoo is nearby.

Studentski Grad does not yet have a metro. Plans to extend line M2 include stations at the National Sports Academy and at UNWE, but with no announced construction date. By car it is quickly reached via Simeonovsko Shose, Akad. Stefan Mladenov Blvd. and the Ring Road.`,
    transport: 'Автобусни линии до различни части на града. С кола - по Симеоновско шосе, бул. "Акад. Стефан Младенов" и Околовръстния път. Метро няма, но в плановете за продължение на линия М2 са предвидени станции при НСА и УНСС (без обявен срок).',
    transportEn: 'Bus lines to different parts of the city. By car - via Simeonovsko Shose, Akad. Stefan Mladenov Blvd. and the Ring Road. There is no metro, but plans to extend line M2 include stations at the National Sports Academy and UNWE (no announced date).',
    priceRangeSale: '2 450 – 3 000 €/кв.м',
    priceRangeRent: '600 – 850 €/мес.',
    targetAudience: 'Инвеститори, които търсят имот за отдаване под наем на студенти и млади хора, и купувачи, които искат оживен квартал с всички удобства.',
    targetAudienceEn: 'Investors looking for a property to rent out to students and young people, and buyers who want a lively neighborhood with all amenities.',
    pros: [
      'Шест университета - постоянно търсене на наеми',
      'Голям избор на имоти под наем, включително едностайни апартаменти',
      'Хипермаркети, поликлиника, спортни зали и паркове',
      'Много ново строителство след 2010 г.',
    ],
    prosEn: [
      'Six universities - steady rental demand',
      'A wide choice of rental properties, including one-room apartments',
      'Hypermarkets, a polyclinic, sports halls and parks',
      'A lot of new construction since 2010',
    ],
    cons: [
      'Няма метро, а бъдещите станции нямат срок за изграждане',
      'Оживен квартал, особено през учебната година',
      'Наемите са по-ниски от тези в централните квартали',
    ],
    consEn: [
      'No metro, and the future stations have no construction date',
      'A busy neighborhood, especially during the academic year',
      'Rents are lower than in the central neighborhoods',
    ],
    metaDescription: 'Студентски град - квартал с шест университета и постоянно търсене на наеми. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Studentski Grad - a Sofia neighborhood with six universities and steady rental demand. Prices and rents as of October 2026.',
    faq: faq([
      ['Какви са цените на имотите в Студентски град?', 'What are property prices like in Studentski Grad?',
        priceAnswer('Студентски град', '2 450 – 3 000', '600 – 625', '750 – 850', 'Едностайните апартаменти често са с по-висока цена на квадратен метър.'),
        priceAnswerEn('Studentski Grad', '2,450–3,000', '600–625', '750–850', 'One-room apartments often have a higher price per square meter.')],
      ['Подходящ ли е Студентски град за инвестиция под наем?', 'Is Studentski Grad a good choice for a rental investment?',
        'Шестте университета в квартала осигуряват постоянно търсене на наеми, особено на едностайни и двустайни апартаменти. Едностаен апартамент се отдава за около 450 € на месец. Наемите са по-ниски от тези в централните квартали, затова изчислете доходността за конкретния имот - можем да го направим заедно с Вас.',
        'The six universities in the neighborhood create steady rental demand, especially for one- and two-room apartments. A one-room apartment rents for around €450 a month. Rents are lower than in the central neighborhoods, so calculate the yield for the specific property - we can do that together with you.'],
      ['Ще има ли метро в Студентски град?', 'Will Studentski Grad get a metro?',
        'В плановете за продължение на линия М2 от метростанция "Витоша" са предвидени станции при Националната спортна академия и при УНСС. Към момента няма обявен срок за изграждане.',
        'Plans to extend line M2 from Vitosha station include stations at the National Sports Academy and at UNWE. There is currently no announced construction date.'],
      ['Кои университети има в Студентски град?', 'Which universities are in Studentski Grad?',
        'УНСС, Техническият университет, Минно-геоложкият университет, Химикотехнологичният и металургичен университет, Лесотехническият университет и Националната спортна академия.',
        'UNWE, the Technical University, the University of Mining and Geology, the University of Chemical Technology and Metallurgy, the University of Forestry and the National Sports Academy.'],
    ]),
  },

  // ───────────────────────────── Изгрев ─────────────────────────────
  {
    slug: 'izgrev',
    name: 'Изгрев',
    nameEn: 'Izgrev',
    tagline: 'Малък и престижен квартал до Борисовата градина.',
    taglineEn: 'A small, prestigious neighborhood next to Borisova Gradina.',
    externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Izgrev_%28Sofia%291.jpg',
    description: `Изгрев е квартал в източната част на София. Граничи с квартал Дианабад, с квартал Изток, от който го отделя бул. "Драган Цанков", и с Борисовата градина.

Кварталът е известен като "номенклатурен квартал" - в края на 70-те години тук са построени блоковете на художниците, на писателите и на дейците от радиото и телевизията. В Изгрев се намират няколко посолства, градинката с гроба на Петър Дънов, къщичката от дърворезба на майстора Рачо Ангелов, както и къщите-музеи на художниците Дечко Узунов и Илия Петров.

Кварталът се обслужва от метростанция "Фредерик Жолио-Кюри" (линии М1 и М4), която го свързва директно с центъра, както и от автобусни линии.

Изгрев е малък квартал и предлагането на имоти е много ограничено - в обявите към октомври 2026 г. има малко апартаменти за продажба. Затова цените варират силно от имот до имот и са сред най-високите в София.`,
    descriptionEn: `Izgrev is a neighborhood in the east of Sofia. It borders the Dianabad neighborhood, the Iztok neighborhood (separated from it by Dragan Tsankov Blvd.) and Borisova Gradina park.

It is known as the "nomenklatura neighborhood" - in the late 1970s apartment blocks for artists, writers and radio and television figures were built here. Izgrev is home to several embassies, the garden with the grave of Peter Deunov, the woodcarved house of master Racho Angelov, and the house-museums of the painters Dechko Uzunov and Iliya Petrov.

It is served by Frederic Joliot-Curie metro station (lines M1 and M4), which connects it directly to the center, as well as by bus lines.

Izgrev is a small neighborhood and the supply of property is very limited - as of October 2026 there are few apartments listed for sale. As a result, prices vary widely from property to property and are among the highest in Sofia.`,
    transport: 'Метростанция "Фредерик Жолио-Кюри" (линии М1 и М4) с директна връзка до центъра. Автобусни линии. Бул. "Драган Цанков" минава по границата на квартала.',
    transportEn: 'Frederic Joliot-Curie metro station (lines M1 and M4) with a direct link to the center. Bus lines. Dragan Tsankov Blvd. runs along the edge of the neighborhood.',
    priceRangeSale: '4 050 – 5 400 €/кв.м',
    priceRangeRent: '700 – 1 000 €/мес.',
    targetAudience: 'Купувачи, които търсят престижен и тих адрес близо до Борисовата градина и центъра, и които са готови да изчакат подходящия имот.',
    targetAudienceEn: 'Buyers looking for a prestigious, quiet address close to Borisova Gradina and the center, who are prepared to wait for the right property.',
    pros: [
      'До Борисовата градина',
      'Метростанция "Фредерик Жолио-Кюри" с директна връзка до центъра',
      'Престижен квартал с история и културни забележителности',
    ],
    prosEn: [
      'Next to Borisova Gradina',
      'Frederic Joliot-Curie metro station with a direct link to the center',
      'A prestigious neighborhood with history and cultural landmarks',
    ],
    cons: [
      'Сред най-високите цени в София',
      'Много малко имоти в предлагане',
      'Цените варират силно от имот до имот',
    ],
    consEn: [
      'Among the highest prices in Sofia',
      'Very few properties on the market',
      'Prices vary widely from property to property',
    ],
    metaDescription: 'Изгрев - малък и престижен квартал до Борисовата градина с метро. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Izgrev - a small, prestigious Sofia neighborhood next to Borisova Gradina, on the metro. Prices and rents as of October 2026.',
    faq: faq([
      ['Какви са цените на имотите в Изгрев?', 'What are property prices like in Izgrev?',
        priceAnswer('Изгрев', '4 050 – 5 400', '750 – 800', '1 000', 'В обявите има много малко апартаменти, затова цените варират силно и средните стойности са само ориентир.'),
        priceAnswerEn('Izgrev', '4,050–5,400', '750–800', '1,000', 'There are very few apartments listed, so prices vary widely and the averages are only a guide.')],
      ['Защо в Изгрев има толкова малко имоти?', 'Why are there so few properties in Izgrev?',
        'Изгрев е малък квартал, затова в обявите рядко има много имоти едновременно. Ето защо е добре да реагирате бързо, когато се появи подходящ имот. Можем да следим пазара вместо Вас и да Ви уведомим.',
        'Izgrev is a small neighborhood, so there are rarely many properties listed at the same time. That is why it pays to act quickly when a suitable property appears. We can watch the market for you and let you know.'],
      ['Има ли метро в Изгрев?', 'Is there a metro in Izgrev?',
        'Да. Метростанция "Фредерик Жолио-Кюри" (линии М1 и М4) обслужва квартала и го свързва директно с центъра.',
        'Yes. Frederic Joliot-Curie metro station (lines M1 and M4) serves the neighborhood and connects it directly to the center.'],
      ['Каква е разликата между Изгрев и Изток?', 'What is the difference between Izgrev and Iztok?',
        'Двата квартала са съседни и ги разделя бул. "Драган Цанков". И двата са до Борисовата градина и се обслужват от метростанция "Фредерик Жолио-Кюри". Изгрев е по-малък и с по-малко предлагане на имоти.',
        'The two neighborhoods are adjacent, separated by Dragan Tsankov Blvd. Both are next to Borisova Gradina and are served by Frederic Joliot-Curie metro station. Izgrev is smaller and has fewer properties on the market.'],
    ]),
  },

  // ───────────────────────────── Изток ─────────────────────────────
  {
    slug: 'iztok',
    name: 'Изток',
    nameEn: 'Iztok',
    tagline: 'Престижен и добре свързан квартал до Борисовата градина.',
    taglineEn: 'A prestigious, well-connected neighborhood next to Borisova Gradina.',
    externalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Building_in_Iztok_-_Sofia.jpg',
    description: `Изток е квартал в източната част на София, до Борисовата градина. През квартала минават бул. "Драган Цанков", който го отделя от съседния Изгрев, и бул. "Цариградско шосе".

Кварталът има много добра транспортна връзка с цялата София. На бул. "Драган Цанков" се намират Световният търговски център "Интерпред" и метростанция "Фредерик Жолио-Кюри" (линии М1 и М4), а на бул. "Цариградско шосе" е възловата спирка "Хотел Плиска", където спират много тролейбусни и автобусни линии.

В квартала се намират посолствата на няколко държави, сред които Япония и Финландия, както и училища като 119 СУ "Акад. Михаил Арнаудов" и Софийската професионална гимназия по електроника "Джон Атанасов". Тук са и площадите "Капитан Петко Войвода", "Хосе Марти" и "Радой Ралин", а през квартала тече Драгалевската река.

Изток е сред най-скъпите квартали в София. Предлагането на имоти е ограничено, но по-голямо от това в съседния Изгрев.`,
    descriptionEn: `Iztok is a neighborhood in the east of Sofia, next to Borisova Gradina park. Dragan Tsankov Blvd., which separates it from neighboring Izgrev, and Tsarigradsko Shose Blvd. run through it.

The neighborhood has very good transport links to the whole of Sofia. Dragan Tsankov Blvd. is home to the Interpred World Trade Center and Frederic Joliot-Curie metro station (lines M1 and M4), and on Tsarigradsko Shose Blvd. is the Hotel Pliska transport hub, served by many trolleybus and bus lines.

The neighborhood is home to the embassies of several countries, including Japan and Finland, as well as schools such as the 119th Secondary School "Akad. Mihail Arnaudov" and the John Atanasoff Vocational High School of Electronics. It also has the Kapitan Petko Voyvoda, José Martí and Radoy Ralin squares, and the Dragalevska River flows through it.

Iztok is among the most expensive neighborhoods in Sofia. The supply of property is limited, but larger than in neighboring Izgrev.`,
    transport: 'Метростанция "Фредерик Жолио-Кюри" (линии М1 и М4) на бул. "Драган Цанков". Възлова спирка "Хотел Плиска" на бул. "Цариградско шосе" с много тролейбусни и автобусни линии.',
    transportEn: 'Frederic Joliot-Curie metro station (lines M1 and M4) on Dragan Tsankov Blvd. The Hotel Pliska hub on Tsarigradsko Shose Blvd., with many trolleybus and bus lines.',
    priceRangeSale: '4 200 – 4 350 €/кв.м',
    priceRangeRent: '550 – 1 100 €/мес.',
    targetAudience: 'Семейства и професионалисти, които търсят престижен адрес до Борисовата градина с отлична транспортна връзка, и купувачи от чужбина.',
    targetAudienceEn: 'Families and professionals looking for a prestigious address next to Borisova Gradina with excellent transport links, and buyers from abroad.',
    pros: [
      'До Борисовата градина',
      'Метро и възловата спирка "Хотел Плиска"',
      'Училища, посолства и бизнес център "Интерпред"',
    ],
    prosEn: [
      'Next to Borisova Gradina',
      'The metro and the Hotel Pliska transport hub',
      'Schools, embassies and the Interpred business center',
    ],
    cons: [
      'Сред най-високите цени в София',
      'Ограничено предлагане на имоти',
      'Бул. "Цариградско шосе" и бул. "Драган Цанков" са натоварени',
    ],
    consEn: [
      'Among the highest prices in Sofia',
      'Limited supply of property',
      'Tsarigradsko Shose and Dragan Tsankov boulevards are busy',
    ],
    metaDescription: 'Изток - престижен квартал до Борисовата градина с метро и отлична връзка. Актуални цени на апартаменти и наеми към октомври 2026.',
    metaDescriptionEn: 'Iztok - a prestigious Sofia neighborhood next to Borisova Gradina, with a metro and great links. Prices and rents as of October 2026.',
    faq: faq([
      ['Какви са цените на имотите в Изток?', 'What are property prices like in Iztok?',
        priceAnswer('Изток', '4 200 – 4 350', '550 – 650', '1 000 – 1 100'),
        priceAnswerEn('Iztok', '4,200–4,350', '550–650', '1,000–1,100')],
      ['Има ли метро в Изток?', 'Is there a metro in Iztok?',
        'Да. Метростанция "Фредерик Жолио-Кюри" (линии М1 и М4) е на бул. "Драган Цанков" и свързва квартала директно с центъра. На бул. "Цариградско шосе" е и възловата спирка "Хотел Плиска".',
        'Yes. Frederic Joliot-Curie metro station (lines M1 and M4) is on Dragan Tsankov Blvd. and connects the neighborhood directly to the center. The Hotel Pliska transport hub is on Tsarigradsko Shose Blvd.'],
      ['Каква е разликата между Изток и Изгрев?', 'What is the difference between Iztok and Izgrev?',
        'Двата квартала са съседни и ги разделя бул. "Драган Цанков". И двата са до Борисовата градина и се обслужват от една и съща метростанция. В Изток предлагането на имоти е по-голямо.',
        'The two neighborhoods are adjacent, separated by Dragan Tsankov Blvd. Both are next to Borisova Gradina and are served by the same metro station. Iztok has a larger supply of property.'],
      ['Подходящ ли е Изток за купувачи от чужбина?', 'Is Iztok suitable for buyers from abroad?',
        'Изток е подходящ за купувачи, които търсят престижен адрес до Борисовата градина с добра транспортна връзка, а в квартала се намират и няколко посолства. Ако купувате от чужбина, ще Ви помогнем с огледите и с проверката на документите.',
        'Iztok suits buyers looking for a prestigious address next to Borisova Gradina with good transport links, and several embassies are located in the neighborhood. If you are buying from abroad, we will help you with viewings and with checking the documents.'],
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
