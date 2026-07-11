/**
 * Populates the *En fields on all `neighborhood` documents (Sofia neighborhood
 * guide pages, e.g. /kvartali/lozenets) with English translations so the /en
 * site shows real English content instead of falling back to Bulgarian.
 *
 * Each `faq` array item's existing `_key` is preserved — only `questionEn`
 * and `answerEn` are added, nothing is removed or reordered.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/translate-neighborhoods-en.mjs
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

const patches = {
  'neighborhood-dragalevtsi': {
    nameEn: 'Dragalevtsi',
    taglineEn: 'Mountain tranquility 15 minutes from downtown Sofia.',
    descriptionEn:
      "Dragalevtsi is one of Sofia's most prestigious and sought-after neighborhoods, nestled at the foot of Mount Vitosha. Its roots trace back to the old village of Dragalevtsi, whose 14th-century Dragalevtsi Monastery shaped local life for centuries. Today the area has transformed into an upscale residential zone that has kept its greenery, fresh air, and sense of closeness to nature.\n\nDragalevtsi's character is unique — spacious single-family houses, luxury villas, and gated residential complexes dominate the landscape. The streets are quiet and shaded by century-old trees, and many properties offer views of Vitosha or the city lights below. The neighborhood is a favorite among families, diplomats, and successful business owners looking for distance from the city noise without sacrificing easy access to the center.\n\nDragalevtsi's infrastructure includes good schools, private kindergartens, shops for everyday needs, and numerous restaurants with pleasant gardens. The Vitosha cable car and countless hiking, biking, and ski routes are close by. The standard of living here is among the highest in Sofia, and properties are considered a safe, long-term investment.\n\nDespite brisk construction activity in recent years, Dragalevtsi has kept its identity — green, peaceful, and prestigious. Price levels are among the highest in the capital, but for those seeking quality of life, the investment is well worth it.",
    transportEn:
      'The neighborhood is served by bus lines 64, 93, and 98, connecting it to Vitosha metro station (line M2) and the city center. Key points in the city are reachable in 20-30 minutes by car. Vitosha metro station is about a 5-7 minute drive away.',
    targetAudienceEn:
      'Families with children, diplomats, executives, and business owners seeking tranquility, prestige, and proximity to nature.',
    prosEn: [
      'Exceptionally clean air and immediate proximity to Vitosha Nature Park',
      'Quiet, peaceful, and secure — low traffic and a strong sense of residential privacy',
      'A prestigious address with high property liquidity',
      'Good infrastructure — private schools, kindergartens, restaurants',
      "Close to Vitosha's ski slopes and hiking trails",
    ],
    consEn: [
      'Among the highest property prices in Sofia',
      'Limited and infrequent public transport — a personal car is practically essential',
      'Less convenient for everyday shopping and city services compared to central neighborhoods',
    ],
    metaDescriptionEn:
      'Dragalevtsi — a prestigious Sofia neighborhood at the foot of Vitosha. Villas, quiet, and clean air 15 min from downtown. 2026 property prices.',
    faq: [
      {
        _key: 'faq-0',
        _type: 'faqItem',
        question: 'Какви са цените на имотите в Драгалевци?',
        answer:
          'Цените за продажба в Драгалевци варират между 2 200 и 4 000 €/кв.м в зависимост от типа на имота, изложението и близостта до природата. Наемите за тристаен апартамент са около 1 000 – 1 600 €/месец. Кварталът е сред по-скъпите в София заради уникалното си местоположение в полите на Витоша.',
        questionEn: 'What are property prices like in Dragalevtsi?',
        answerEn:
          'Sale prices in Dragalevtsi range from €2,200 to €4,000/sq.m, depending on the property type, orientation, and proximity to nature. Rent for a three-room apartment runs around €1,000–1,600/month. The neighborhood is among the pricier ones in Sofia due to its unique location at the foot of Vitosha.',
      },
      {
        _key: 'faq-1',
        _type: 'faqItem',
        question: 'Подходящ ли е Драгалевци за семейства?',
        answer:
          'Да — Драгалевци е един от предпочитаните квартали за семейства с деца. Кварталът предлага чист въздух, тихи улици, близост до природата на Витоша и добри частни учебни заведения в близост. Идеален е за хора, търсещи спокойствие без да са далеч от града.',
        questionEn: 'Is Dragalevtsi suitable for families?',
        answerEn:
          "Yes — Dragalevtsi is one of the preferred neighborhoods for families with children. It offers clean air, quiet streets, proximity to the nature of Vitosha, and good private schools nearby. It's ideal for people seeking tranquility without being far from the city.",
      },
      {
        _key: 'faq-2',
        _type: 'faqItem',
        question: 'Как е транспортната връзка на Драгалевци с центъра на София?',
        answer:
          'Драгалевци се свързва с центъра на София чрез автобусни линии и лесен достъп с автомобил. Разстоянието до центъра е около 10 – 15 минути с кола в извънпиков час. Наличието на лифт за Витоша е допълнителен бонус за любителите на планината.',
        questionEn: 'How well is Dragalevtsi connected to central Sofia?',
        answerEn:
          'Dragalevtsi is connected to central Sofia via bus lines and easy access by car. The distance to the center is about 10–15 minutes by car outside rush hour. The Vitosha cable car is an added bonus for mountain lovers.',
      },
      {
        _key: 'faq-3',
        _type: 'faqItem',
        question: 'Какви типове имоти се намират предимно в Драгалевци?',
        answer:
          'В Драгалевци преобладават еднофамилни къщи, вили и малки жилищни сгради с нисък етажен брой. Среща се и ново строителство от бутиков тип. Панелни блокове почти липсват — кварталът е изграден предимно от индивидуални имоти и малки комплекси.',
        questionEn: 'What types of properties are mainly found in Dragalevtsi?',
        answerEn:
          'Dragalevtsi is dominated by single-family houses, villas, and small low-rise residential buildings. Boutique-style new developments can also be found. Panel apartment blocks are almost nonexistent — the neighborhood is built mostly from individual properties and small complexes.',
      },
      {
        _key: 'faq-4',
        _type: 'faqItem',
        question: 'Изгодна ли е инвестицията в имот в Драгалевци?',
        answer:
          'Драгалевци се радва на устойчиво търсене от страна на заможни семейства и хора с дистанционна работа. Имотите запазват стойността си добре и рядко поевтиняват дори при пазарни корекции. За дългосрочна инвестиция или собствено ползване — кварталът е много добър избор.',
        questionEn: 'Is investing in property in Dragalevtsi worthwhile?',
        answerEn:
          'Dragalevtsi enjoys steady demand from affluent families and remote workers. Properties hold their value well and rarely lose value even during market corrections. For a long-term investment or personal use, the neighborhood is an excellent choice.',
      },
    ],
  },

  'neighborhood-druzhba': {
    nameEn: 'Druzhba',
    taglineEn: 'Affordable, well-connected, and practical — a neighborhood for people with a realistic outlook.',
    descriptionEn:
      "Druzhba is a large residential neighborhood in eastern Sofia, built mainly between 1970 and 1990. Divided into Druzhba 1 and Druzhba 2, it is home to tens of thousands of residents and is a typical example of mass housing construction. Despite its seemingly gray reputation, the neighborhood has a number of qualities that make it appealing to a specific audience.\n\nDruzhba has wide green spaces between the apartment blocks — spacious parks and walkways that are impossible to find in the more central, densely built neighborhoods. It is well developed in terms of social infrastructure, with plenty of schools, kindergartens, clinics, and shops. Its proximity to Gorublyane adds an extra green dimension.\n\nDruzhba's transport links have improved significantly with the extension of metro line M1 — Druzhba station connects the neighborhood directly to the center and other parts of the city. Tsarigradsko Shose runs close by, providing easy access by car. Proximity to Sofia Airport is a plus, especially for people who travel for work.\n\nDruzhba offers good value for money. Apartments here can be found at significantly lower prices than in the center or southern neighborhoods, while still enjoying good transport access and developed infrastructure.",
    transportEn:
      'Metro line M1 — Druzhba station right in the heart of the neighborhood. Numerous bus lines. Tsarigradsko Shose provides easy access by car. To the center by metro — 15-20 minutes. To the airport — 15-20 minutes.',
    targetAudienceEn:
      'Budget-conscious buyers, students and young professionals, families who value space and affordability, and investors pursuing a rental strategy.',
    prosEn: [
      "Among the most affordable property prices within Sofia's urban zone",
      'Metro line M1 — fast, direct connection to the center',
      'Good social infrastructure — many schools, kindergartens, healthcare facilities',
      'Spacious green areas between the blocks — a rarity in more central neighborhoods',
      'Close to Sofia Airport — convenient for business travelers',
    ],
    consEn: [
      'Dated housing stock — predominantly panel-block construction',
      'Lower rents and weaker resale liquidity compared to central neighborhoods',
      'Less developed restaurant and retail scene',
    ],
    metaDescriptionEn:
      "Druzhba — an affordable eastern Sofia neighborhood with metro access and good infrastructure. Budget apartments for sale and rent, 2026.",
    faq: [
      {
        _key: 'faq-0',
        _type: 'faqItem',
        question: 'Какви са цените на имотите в Дружба?',
        answer:
          'Дружба предлага едни от най-достъпните цени сред добре свързаните квартали в София. Цените за продажба са около 1 400 – 2 000 €/кв.м, а наемите за двустаен апартамент варират между 550 – 850 €/месец. Наличието на ново строителство в района постепенно покачва средните цени.',
        questionEn: 'What are property prices like in Druzhba?',
        answerEn:
          "Druzhba offers some of the most affordable prices among Sofia's well-connected neighborhoods. Sale prices are around €1,400–2,000/sq.m, while rent for a two-room apartment ranges from €550–850/month. New construction in the area is gradually pushing average prices up.",
      },
      {
        _key: 'faq-1',
        _type: 'faqItem',
        question: 'Добра ли е транспортната връзка на Дружба?',
        answer:
          'Дружба е отлично свързана — кварталът разполага с метростанции (линия М1), множество автобусни линии и лесен достъп до летище София и Цариградско шосе. Пътуването до центъра с метро отнема около 15 минути. За хора без кола Дружба е удобен избор.',
        questionEn: "Are Druzhba's transport links good?",
        answerEn:
          'Druzhba is excellently connected — the neighborhood has metro stations (line M1), numerous bus lines, and easy access to Sofia Airport and Tsarigradsko Shose. Traveling to the center by metro takes about 15 minutes. For people without a car, Druzhba is a convenient choice.',
      },
      {
        _key: 'faq-2',
        _type: 'faqItem',
        question: 'Подходящ ли е квартал Дружба за млади хора и студенти?',
        answer:
          'Да — Дружба е популярен сред млади хора и двойки заради относително достъпните наеми, доброто метро обслужване и близостта до бизнес зони. Кварталът не е толкова централен, но компенсира с транспортна достъпност и развита инфраструктура.',
        questionEn: 'Is Druzhba suitable for young people and students?',
        answerEn:
          "Yes — Druzhba is popular among young people and couples thanks to relatively affordable rent, good metro service, and proximity to business areas. The neighborhood isn't as central, but it makes up for it with transport access and developed infrastructure.",
      },
      {
        _key: 'faq-3',
        _type: 'faqItem',
        question: 'Какви са предимствата на Дружба пред другите квартали?',
        answer:
          'Основните предимства на Дружба са: метро директно до центъра, близост до летище Sofia, достъпни цени, добра търговска инфраструктура (МОЛ Марково тепе, супермаркети, болници). Кварталът е удобен и за хора, работещи в Source Expo и бизнес зоната около бул. Цариградско шосе.',
        questionEn: 'What advantages does Druzhba have over other neighborhoods?',
        answerEn:
          "Druzhba's main advantages are: a direct metro link to the center, proximity to Sofia Airport, affordable prices, and good retail infrastructure (Markovo Tepe Mall, supermarkets, hospitals). The neighborhood is also convenient for people working at Source Expo and the business zone along Tsarigradsko Shose Blvd.",
      },
    ],
  },

  'neighborhood-krastova-vada': {
    nameEn: 'Krastova Vada',
    taglineEn: 'The quiet alternative to Lozenets — cozy, green, and increasingly sought-after.',
    descriptionEn:
      "Krastova Vada is a small but highly attractive neighborhood located between Lozenets, Hladilnika, and South Park. For years it stayed in the shadow of its better-known neighbors, but the last 5-7 years have seen a significant rise in interest. The reasons are clear: a central location, quiet streets, low building density, and good transport links.\n\nKrastova Vada has a distinctly residential character — you'll find a mix of old brick buildings from the 1970s and '80s, renovated apartments, and an increasing number of small new developments. The neighborhood has no defined commercial center, but its border with Lozenets means every amenity is just a few minutes' walk away. This sense of residential calm combined with such a central location is rare in Sofia.\n\nSouth Park is practically right next door — residents of Krastova Vada use it daily for walks, sports, and relaxation. Metro stations and bus stops provide quick access to every corner of the city. The neighborhood appeals to people who want a similar quality of life to Lozenets without paying its premium.\n\nThe property market in Krastova Vada is narrower, and supply is limited, which keeps existing properties holding their value well. Investors value the neighborhood for its stable rental demand from professionals and couples working in the city center.",
    transportEn:
      'Metro line M2 — Vitosha station about a 10-minute walk away. Numerous bus lines along Bulgaria Blvd. and Cherni Vrah Blvd. Excellent access to the center — 10-15 minutes by metro or car.',
    targetAudienceEn:
      'Couples and young families seeking a quiet, central neighborhood, and investors who value stable rental demand in the southern parts of Sofia.',
    prosEn: [
      'Quiet and residential — low density and a calm atmosphere for such a central location',
      'Right next to South Park for daily relaxation and sports',
      'More affordable prices than Lozenets in a practically identical location',
      'Good transport links — metro and buses nearby',
      'Low supply keeps property values stable',
    ],
    consEn: [
      'Limited property supply — suitable listings can be hard to find',
      'No commercial zone of its own — reliant on neighboring areas for services',
      'Less well-known and recognizable to people unfamiliar with Sofia',
    ],
    metaDescriptionEn:
      'Krastova Vada — a quiet, central Sofia neighborhood by South Park. A Lozenets alternative with better prices. Properties for sale and rent, 2026.',
    faq: [
      {
        _key: 'faq-0',
        _type: 'faqItem',
        question: 'Какви са цените на имотите в Кръстова вада?',
        answer:
          'Кръстова вада е квартал с активно ново строителство и нарастващи цени. Продажните цени са в диапазон 2 000 – 3 200 €/кв.м в зависимост от проекта и завършеността. Наемите за двустаен апартамент са около 700 – 1 100 €/месец. Кварталът е атрактивен заради съотношението цена/качество.',
        questionEn: 'What are property prices like in Krastova Vada?',
        answerEn:
          'Krastova Vada is seeing active new construction and rising prices. Sale prices range from €2,000–3,200/sq.m depending on the project and its stage of completion. Rent for a two-room apartment runs around €700–1,100/month. The neighborhood is attractive for its value for money.',
      },
      {
        _key: 'faq-1',
        _type: 'faqItem',
        question: 'Защо Кръстова вада е предпочитан квартал за покупка?',
        answer:
          'Кръстова вада съчетава добра локация между Лозенец и Витоша, разрастваща се инфраструктура и умерени цени в сравнение със съседните премиум квартали. Много от новите сгради предлагат подземни паркинги, асансьори и съвременни разпределения — нещо, липсващо в по-старото строителство.',
        questionEn: 'Why is Krastova Vada a preferred neighborhood for buying property?',
        answerEn:
          'Krastova Vada combines a great location between Lozenets and Vitosha, expanding infrastructure, and moderate prices compared to the neighboring premium areas. Many of the new buildings offer underground parking, elevators, and modern layouts — features often missing from older construction.',
      },
      {
        _key: 'faq-2',
        _type: 'faqItem',
        question: 'Как е транспортното обслужване в Кръстова вада?',
        answer:
          'Кварталът е свързан с центъра чрез автобусни линии и е на разстояние около 10 минути с кола. Наличието на бул. Черни връх и близостта до Южна дъга осигуряват бърз достъп до другите части на града. Метростанция не преминава директно, но планирано разширение на метрото е в близост.',
        questionEn: 'How is public transport in Krastova Vada?',
        answerEn:
          'The neighborhood is connected to the center by bus lines and is about a 10-minute drive away. Cherni Vrah Blvd. and proximity to the Southern Arc provide quick access to other parts of the city. No metro station runs directly through it, but a planned metro extension is nearby.',
      },
      {
        _key: 'faq-3',
        _type: 'faqItem',
        question: 'Подходящ ли е Кръстова вада за млади семейства?',
        answer:
          'Кръстова вада е един от най-привлекателните избори за млади семейства в Югозападна София. Кварталът предлага нови сгради с добра изолация и разпределение, зелени площи, детски площадки и относително тихи улици. Близостта до Витоша и Лозенец е допълнително предимство.',
        questionEn: 'Is Krastova Vada suitable for young families?',
        answerEn:
          "Krastova Vada is one of the most attractive choices for young families in southwest Sofia. The neighborhood offers new buildings with good insulation and layouts, green spaces, playgrounds, and relatively quiet streets. Proximity to Vitosha and Lozenets is an added bonus.",
      },
    ],
  },

  'neighborhood-lozenets': {
    nameEn: 'Lozenets',
    taglineEn: 'Elegance and centrality — the most coveted address in Sofia.',
    descriptionEn:
      "Lozenets is unquestionably one of Sofia's most prestigious and desirable neighborhoods. Located just south of the center, it combines closeness to the city core with a quiet, green residential setting. Its history is tied to the development of the capital's villa district in the late 19th and early 20th centuries — many of the old aristocratic villas and residences have been preserved or renovated, lending the neighborhood a unique character.\n\nLozenets's architecture is remarkably diverse — old villas and boutique buildings on quiet inner streets sit alongside modern residential complexes on the main boulevards. The area is packed with restaurants, cafes, galleries, and boutiques, giving the neighborhood a distinctive atmosphere — lively but never overwhelming. Cherni Vrah Blvd. and Simeonovsko Shose are the two main arteries along which most of the commercial activity is concentrated.\n\nLozenets is favored by the affluent middle class, business owners, lawyers, doctors, and expats working at diplomatic missions or international companies. Its proximity to South Park — the only large green space in central Sofia — is a key advantage for families.\n\nProperties in Lozenets consistently sit in the upper price segment of the Sofia market and show strong resilience even during market corrections. Liquidity is excellent — properties here rarely stay on the market for long.",
    transportEn:
      'Metro line M2 with James Bourchier and Vitosha stations nearby. Numerous bus lines. The center is reachable on foot or by a 5-10 minute drive. Excellent access to the Ring Road and the Southern Tangent.',
    targetAudienceEn:
      'Affluent families, business owners, diplomats, and expats seeking a central, prestigious address with a lively urban environment and nearby parks.',
    prosEn: [
      'Central location — walking distance to key points in the city',
      'High-quality, varied housing stock — old villas and new complexes',
      'Excellent dining and retail scene along the main boulevards',
      'Close to South Park — a large green space at the heart of the neighborhood',
      'High liquidity and strong resilience in property values',
    ],
    consEn: [
      'Among the highest property prices in all of Sofia',
      'Traffic on Cherni Vrah Blvd. and Bulgaria Blvd. is heavy during rush hour',
      'Parking is a challenge, especially in the older parts of the neighborhood',
    ],
    metaDescriptionEn:
      "Lozenets — Sofia's most prestigious neighborhood, with a central location, South Park, and a lively dining scene. 2026 property prices.",
    faq: [
      {
        _key: 'faq-0',
        _type: 'faqItem',
        question: 'Какви са цените на имотите в Лозенец?',
        answer:
          'Лозенец е един от най-скъпите квартали в София. Продажните цени варират между 2 500 и 5 000 €/кв.м за различни типове имоти. Наемите за двустаен апартамент са 900 – 1 500 €/месец, а за тристаен — 1 200 – 2 500 €. Новото строителство и реновираните сгради достигат горните граници на диапазона.',
        questionEn: 'What are property prices like in Lozenets?',
        answerEn:
          'Lozenets is one of the most expensive neighborhoods in Sofia. Sale prices range from €2,500 to €5,000/sq.m depending on the property type. Rent for a two-room apartment is €900–1,500/month, and for a three-room apartment €1,200–2,500. New developments and renovated buildings reach the top of that range.',
      },
      {
        _key: 'faq-1',
        _type: 'faqItem',
        question: 'Защо Лозенец е толкова търсен и скъп квартал?',
        answer:
          'Лозенец съчетава централна локация, тихи улички, висока плътност на зеленина, близост до НДК и Южния парк, добра инфраструктура и престижен статус. Кварталът е предпочитан от дипломати, ръководители на компании и заможни семейства — търсенето трайно надвишава предлагането, което поддържа цените високо.',
        questionEn: 'Why is Lozenets such a sought-after and expensive neighborhood?',
        answerEn:
          "Lozenets combines a central location, quiet streets, plenty of greenery, proximity to NDK and South Park, good infrastructure, and prestigious status. It's favored by diplomats, company executives, and affluent families — demand consistently outstrips supply, which keeps prices high.",
      },
      {
        _key: 'faq-2',
        _type: 'faqItem',
        question: 'Как е транспортната връзка на Лозенец?',
        answer:
          'Лозенец е с отлична транспортна свързаност — множество автобусни линии, близост до метростанции на линия М2 (НДК, Витоша) и директен достъп до основни булеварди. Центърът на града е на 5 – 10 минути с кола или транспорт. Паркирането е предизвикателство в по-централните части на квартала.',
        questionEn: "How good is Lozenets's transport connectivity?",
        answerEn:
          'Lozenets has excellent transport links — numerous bus lines, proximity to metro line M2 stations (NDK, Vitosha), and direct access to major boulevards. The city center is 5–10 minutes away by car or public transport. Parking is a challenge in the more central parts of the neighborhood.',
      },
      {
        _key: 'faq-3',
        _type: 'faqItem',
        question: 'Изгоден ли е наемът на имот в Лозенец?',
        answer:
          'За наемодателите Лозенец осигурява стабилен доход и ниска незаетост — апартаментите се намират бързо, а наемателите обикновено са платежоспособни. За наемателите цената е по-висока, но се компенсира с качеството на живот, локацията и престижа. Кварталът е особено търсен от чужденци и корпоративни наематели.',
        questionEn: 'Is renting out property in Lozenets a good deal?',
        answerEn:
          'For landlords, Lozenets offers steady income and low vacancy — apartments rent quickly, and tenants are typically financially reliable. For tenants, the price is higher, but it\'s offset by the quality of life, location, and prestige. The neighborhood is especially popular with expats and corporate tenants.',
      },
      {
        _key: 'faq-4',
        _type: 'faqItem',
        question: 'Подходящ ли е Лозенец за инвестиция в имот?',
        answer:
          'Лозенец е класически „сигурен“ избор за инвестиция — имотите запазват и увеличават стойността си дори при пазарна волатилност. Доходността от наем е около 4 – 5.5% годишно, а ликвидността при препродажба е висока. Ако разполагате с бюджет, Лозенец е едно от най-добрите места за вложение в Sofia.',
        questionEn: 'Is Lozenets a good choice for a property investment?',
        answerEn:
          'Lozenets is a classic "safe" investment choice — properties hold and grow their value even amid market volatility. Rental yield is around 4–5.5% annually, and resale liquidity is high. If your budget allows, Lozenets is one of the best places to invest in Sofia.',
      },
    ],
  },

  'neighborhood-malinova-dolina': {
    nameEn: 'Malinova Dolina',
    taglineEn: 'Modern living surrounded by greenery — the family neighborhood of the new generation.',
    descriptionEn:
      "Malinova Dolina is a relatively young neighborhood in southern Sofia that has developed dynamically since the 2000s. Its name comes from the raspberry plantations that once covered this land; today the area is filled with new residential buildings, gated complexes, and the occasional single-family house. It sits very close to Vitosha and Dragalevtsi, making it highly appealing to families looking for a mix of nature and modern urban living.\n\nMalinova Dolina's architecture is entirely modern — contemporary residential complexes with underground parking, secured entrances, and well-maintained courtyards. Unlike Dragalevtsi, apartments dominate here rather than villas, making the neighborhood more affordable while offering a similar quality environment. A number of good private and public schools are nearby.\n\nThe neighborhood is enjoying rapid infrastructure growth — new shops, restaurants, gyms, and playgrounds. Residents value the quiet setting, good neighbors, and the ease of reaching nature — on foot or by bike to the foot of Vitosha. At the same time, access to the center is good, especially for drivers.\n\nMalinova Dolina has established itself as one of the preferred neighborhoods for young families with children, tech professionals, and people in their early middle age buying their first or second property. Growing demand keeps steady upward pressure on prices, and construction activity continues.",
    transportEn:
      'Served by bus lines 64, 107, and 111 to Vitosha metro station (M2) and Bulgaria Blvd. By car to the center — about 20-25 minutes. Vitosha metro station is about an 8-10 minute drive away.',
    targetAudienceEn:
      'Young families with children, IT professionals, and middle-class managers looking for a new apartment near nature at an affordable price.',
    prosEn: [
      'New housing stock — modern buildings with good construction quality',
      'Right next to Vitosha and green areas',
      'Lower prices than Dragalevtsi and Boyana for a similar quality of life',
      'Great environment for children — quiet streets, playgrounds, good schools nearby',
      'Rapidly developing infrastructure — shops, restaurants, services',
    ],
    consEn: [
      'Limited public transport — a personal car is practically necessary',
      'Less developed retail and entertainment infrastructure than central neighborhoods',
      'Intensive construction in some parts.',
    ],
    metaDescriptionEn:
      'Malinova Dolina — a new, quiet southern Sofia neighborhood with modern complexes near Vitosha. Current 2026 property prices.',
    faq: [
      {
        _key: 'faq-0',
        _type: 'faqItem',
        question: 'Какви са цените на имотите в Малинова долина?',
        answer:
          'Малинова долина предлага имоти на цени около 1 800 – 2 800 €/кв.м. Наемите за двустаен апартамент са в диапазон 650 – 1 000 €/месец. Кварталът е сравнително нов и доминиран от ново строителство, което поддържа добра средна цена.',
        questionEn: 'What are property prices like in Malinova Dolina?',
        answerEn:
          'Malinova Dolina offers properties at around €1,800–2,800/sq.m. Rent for a two-room apartment ranges from €650–1,000/month. The neighborhood is relatively young and dominated by new construction, which keeps the average price at a healthy level.',
      },
      {
        _key: 'faq-1',
        _type: 'faqItem',
        question: 'Какво прави Малинова долина уникален квартал в София?',
        answer:
          'Малинова долина е изграден преди всичко като жилищен квартал за семейства — с широки улици, много зелени площи, детски площадки и тихо ежедневие. Близостта до Витоша и планинската природа е голямо предимство. Кварталът има характера на „затворена общност“ с ниска криминогенност.',
        questionEn: 'What makes Malinova Dolina a unique neighborhood in Sofia?',
        answerEn:
          'Malinova Dolina was built primarily as a residential neighborhood for families — with wide streets, plenty of green space, playgrounds, and a quiet daily rhythm. Proximity to Vitosha and the mountain scenery is a major advantage. The neighborhood has the character of a "gated community" with low crime rates.',
      },
      {
        _key: 'faq-2',
        _type: 'faqItem',
        question: 'Как е транспортната връзка на Малинова долина?',
        answer:
          'Основният транспорт е с лични автомобили — кварталът е предпочитан от хора с коли. Има автобусни линии до центъра на София, но честотата е по-ниска в сравнение с централните квартали. Пътуването до центъра с кола отнема около 20 – 30 минути в зависимост от трафика.',
        questionEn: "How is Malinova Dolina's transport connectivity?",
        answerEn:
          'The main mode of transport is the personal car — the neighborhood is favored by car owners. There are bus lines to central Sofia, but they run less frequently than in central neighborhoods. Driving to the center takes about 20–30 minutes depending on traffic.',
      },
      {
        _key: 'faq-3',
        _type: 'faqItem',
        question: 'Подходящ ли е кварталът за наем?',
        answer:
          'Наемното търсене в Малинова долина идва основно от семейства с деца, търсещи спокойна среда. Наличието на нови апартаменти с добро разпределение и наличност на паркинги го прави привлекателен за наемодатели. Въпреки това търсенето е по-ниско от централните квартали — по-подходящ е за дългосрочни наематели.',
        questionEn: 'Is the neighborhood suitable for renting out property?',
        answerEn:
          "Rental demand in Malinova Dolina comes mainly from families with children looking for a calm environment. The availability of new apartments with good layouts and parking makes it attractive for landlords. That said, demand is lower than in central neighborhoods — it's better suited to long-term tenants.",
      },
    ],
  },

  'neighborhood-manastirski-livadi': {
    nameEn: 'Manastirski Livadi',
    taglineEn: 'A new neighborhood on the move — modern construction at an affordable price in southwest Sofia.',
    descriptionEn:
      "Manastirski Livadi is one of the most dynamically developing neighborhoods in southwest Sofia. Its name comes from the historic meadows that once belonged to the Boyana and Alino monasteries, on whose land the neighborhood was gradually built. Today it's an active construction zone, offering a variety of new residential buildings, gated complexes, and modern apartments at competitive prices.\n\nThe neighborhood is split into two parts — East and West — both mostly made up of new construction from the past decade. The streets are wide, and the residential environment is modern and well maintained. Its immediate proximity to Tsar Boris III Blvd. and President Lincoln Blvd. provides easy access to key points in the city, and the growing infrastructure is attracting more and more families and young professionals.\n\nManastirski Livadi is especially appealing to buyers looking for a new apartment with solid construction quality at a more affordable price than Lozenets or Vitosha. The neighborhood has a number of new residential projects at various stages of completion — from new builds to fully finished buildings. Good schools, shops, and parks are nearby.\n\nThe neighborhood's investment potential is high — price levels are still more moderate than in the prestigious southern neighborhoods, but growing demand and active construction point to a sustained upward trend. It's a favored rental choice for young couples and families, which supports good rental yields.",
    transportEn:
      'Served by bus lines along Tsar Boris III Blvd. and President Lincoln Blvd. To Vitosha metro station (M2) — about 10 minutes by bus or car. To the center by car — 15-20 minutes.',
    targetAudienceEn:
      'Young families and couples, first-time buyers, and investors looking for new construction at a more affordable price in southwest Sofia.',
    prosEn: [
      'Mostly new construction — modern, good-quality apartments',
      'More affordable prices than neighboring Lozenets and Vitosha',
      'Good transport connection to the center via Tsar Boris III Blvd.',
      'Actively developing infrastructure — new shops, services, and restaurants',
      'High investment potential — price levels still have room to grow',
    ],
    consEn: [
      'Ongoing construction — noise and dust in some parts of the neighborhood',
      'Less developed retail infrastructure than more established neighborhoods',
      'Limited public transport — a personal car is recommended',
    ],
    metaDescriptionEn:
      'Manastirski Livadi — a new, dynamic southwest Sofia neighborhood with modern construction and affordable prices. Properties for sale and rent, 2026.',
    faq: [
      {
        _key: 'faq-0',
        _type: 'faqItem',
        question: 'Какви са цените на имотите в Манастирски ливади?',
        answer:
          'Монастирски ливади е квартал с активно строителство и добро търсене. Цените за продажба варират между 1 900 – 3 000 €/кв.м, а наемите за двустаен апартамент — около 700 – 1 100 €/месец. Западната и Източната части на квартала имат леко различни ценови нива.',
        questionEn: 'What are property prices like in Manastirski Livadi?',
        answerEn:
          'Manastirski Livadi is a neighborhood with active construction and strong demand. Sale prices range from €1,900–3,000/sq.m, and rent for a two-room apartment runs around €700–1,100/month. The Western and Eastern parts of the neighborhood have slightly different price levels.',
      },
      {
        _key: 'faq-1',
        _type: 'faqItem',
        question: 'Защо Манастирски ливади е популярен за инвестиция?',
        answer:
          'Кварталът предлага добро съотношение цена/качество — нова инфраструктура, голямо търговско средище (Mall of Sofia е наблизо), разрастваща се бизнес зона и лесен достъп до Южна дъга. Строителството е предимно ново, което означава по-ниски разходи за поддръжка и по-добри технически характеристики.',
        questionEn: 'Why is Manastirski Livadi popular for investment?',
        answerEn:
          'The neighborhood offers good value for money — new infrastructure, a major shopping center nearby (Mall of Sofia), an expanding business zone, and easy access to the Southern Arc. Construction is mostly new, which means lower maintenance costs and better technical specifications.',
      },
      {
        _key: 'faq-2',
        _type: 'faqItem',
        question: 'Как е транспортното обслужване в Манастирски ливади?',
        answer:
          'Кварталът разполага с автобусни линии до центъра и е близо до важни пътни артерии (Южна дъга, бул. Тодор Каблешков). С кола достъпът е много удобен. Метростанция в непосредствена близост няма, но разстоянието до метро е около 10 минути с кола или автобус.',
        questionEn: 'How is public transport in Manastirski Livadi?',
        answerEn:
          "The neighborhood has bus lines to the center and is close to major road arteries (the Southern Arc, Todor Kableshkov Blvd.). Access by car is very convenient. There's no metro station right in the neighborhood, but the nearest one is about 10 minutes away by car or bus.",
      },
      {
        _key: 'faq-3',
        _type: 'faqItem',
        question: 'Подходящ ли е Манастирски ливади за семейства с деца?',
        answer:
          'Да — кварталът има добра комбинация от нова инфраструктура, зелени площи, детски заведения и относително спокойна среда. Наличието на Private schools и детски градини в близост, заедно с по-ниска гъстота на движение, го правят добър избор за семейства.',
        questionEn: 'Is Manastirski Livadi suitable for families with children?',
        answerEn:
          'Yes — the neighborhood has a good combination of new infrastructure, green spaces, childcare facilities, and a relatively calm environment. Nearby private schools and kindergartens, along with lower traffic density, make it a good choice for families.',
      },
    ],
  },

  'neighborhood-mladost': {
    nameEn: 'Mladost',
    taglineEn: 'The heart of modern Sofia — dynamic, convenient, and well connected.',
    descriptionEn:
      "Mladost is one of Sofia's largest and most populous neighborhoods, built mainly between 1960 and 1990 as a panel-block housing complex. Divided into five sections — Mladost 1, 1A, 2, 3, and 4 — it's home to more than 100,000 people and functions almost like a small city within the capital. Significant business activity is concentrated here, especially around Business Park Sofia and Tsarigradsko Shose, where hundreds of local and international companies have offices.\n\nMladost's character is remarkably varied. The older sections (Mladost 1 and 2) consist of panel blocks with spacious courtyards and green areas between them. Mladost 3 and 4 are newer, with higher building density and a significant number of new residential buildings and complexes. Its proximity to Borisova Gradina adds to the neighborhood's appeal.\n\nMladost has excellent metro connectivity. It's home to numerous shops, a mall (The Mall), restaurants, schools, and medical facilities.\n\nIn recent years, Mladost has undergone a significant transformation — many panel-block apartments have been renovated, and new upscale complexes have sprung up on the neighborhood's outskirts. The area around Alexander Malinov Blvd. has become a modern business and retail corridor, further boosting the neighborhood's appeal.",
    transportEn:
      'Excellent transport links — metro lines M1 and M4 with 5 stations (Mladost 1, Mladost 3, Alexander Malinov, Alexander Teodorov-Balan, and Business Park). Numerous bus lines to the center and other neighborhoods. To the center by metro — 15-20 minutes.',
    targetAudienceEn:
      'Young professionals and couples, families looking for an affordable, well-connected apartment, and investors in rental property near the business zones.',
    prosEn: [
      'Excellent metro connectivity — 5 stations within the neighborhood',
      'Rich infrastructure — malls, hospitals, schools, parks',
      'More affordable prices than the southern and central neighborhoods',
      'Close to Business Park Sofia — convenient for people working there',
      'A wide range of properties — from renovated panel apartments to new luxury complexes',
    ],
    consEn: [
      'Higher building density and a large population — noisier and busier',
      'Panel blocks in the older sections are dated and in need of renovation',
      'Traffic on Tsarigradsko Shose and the main boulevards is heavy',
    ],
    metaDescriptionEn:
      'Mladost — a dynamic Sofia neighborhood with metro access, malls, and good infrastructure. 2026 apartment and rental prices from New Key Properties.',
    faq: [
      {
        _key: 'faq-0',
        _type: 'faqItem',
        question: 'Какви са цените на имотите в Младост?',
        answer:
          'Младост предлага широк ценови диапазон — от около 1 500 €/кв.м за по-стари панелни апартаменти до 2 800 €/кв.м за ново строителство. Наемите за двустаен апартамент са 600 – 1 000 €/месец. Младост 1А и Младост 4 са малко по-скъпи от Младост 2 и 3.',
        questionEn: 'What are property prices like in Mladost?',
        answerEn:
          'Mladost offers a wide price range — from around €1,500/sq.m for older panel apartments to €2,800/sq.m for new construction. Rent for a two-room apartment is €600–1,000/month. Mladost 1A and Mladost 4 are slightly pricier than Mladost 2 and 3.',
      },
      {
        _key: 'faq-1',
        _type: 'faqItem',
        question: 'Кой подрайон на Младост е най-добър за живеене?',
        answer:
          'Младост 1А е предпочитан заради близостта до метро и парка около Лъвов мост. Младост 4 е близо до Бизнес парк София и е предпочитан от работещите там. Младост 3 е по-спокоен и семеен. Изборът зависи от приоритетите — транспорт, работа или тихо ежедневие.',
        questionEn: 'Which section of Mladost is best to live in?',
        answerEn:
          "Mladost 1A is popular for its proximity to the metro and the park around Lions' Bridge. Mladost 4 is close to Business Park Sofia and is favored by people working there. Mladost 3 is quieter and more family-oriented. The right choice depends on your priorities — transport, work, or a calm daily routine.",
      },
      {
        _key: 'faq-2',
        _type: 'faqItem',
        question: 'Добра ли е транспортната връзка на Младост?',
        answer:
          'Младост разполага с отлична метро връзка — линия М1 минава директно през квартала с 5 метростанции. Освен метрото, има обширна мрежа от автобусни линии. Центърът на София е на 15 – 20 минути с метро. Младост е един от най-добре транспортно обезпечените квартали в града.',
        questionEn: "Is Mladost's transport connectivity good?",
        answerEn:
          "Mladost has excellent metro connectivity — line M1 runs directly through the neighborhood with 5 stations. Beyond the metro, there's an extensive bus network. Central Sofia is 15–20 minutes away by metro. Mladost is one of the best-connected neighborhoods in the city.",
      },
      {
        _key: 'faq-3',
        _type: 'faqItem',
        question: 'Подходящ ли е Младост за наем на апартамент?',
        answer:
          'Младост е едно от най-активните места за наем в София. Близостта до Бизнес парк Sofia, Technology Park и редица офис сгради осигурява постоянно търсене. Апартаментите се намират сравнително бързо, а наемателите са предимно млади специалисти и чужденци. Доходността от наем е около 4 – 6% годишно.',
        questionEn: 'Is Mladost a good choice for renting out an apartment?',
        answerEn:
          'Mladost is one of the most active rental markets in Sofia. Proximity to Business Park Sofia, Technology Park, and numerous office buildings ensures constant demand. Apartments rent out relatively quickly, and tenants are mostly young professionals and expats. Rental yield is around 4–6% annually.',
      },
      {
        _key: 'faq-4',
        _type: 'faqItem',
        question: 'Има ли добри търговски обекти и инфраструктура в Младост?',
        answer:
          'Да — Младост разполага с Mall of Sofia, множество супермаркети, ресторанти, фитнес центрове и медицински центрове. Paradise Center е съвсем наблизо. Инфраструктурата е добре развита и продължава да се подобрява с новите проекти в района.',
        questionEn: 'Does Mladost have good shopping and infrastructure?',
        answerEn:
          'Yes — Mladost has Mall of Sofia, numerous supermarkets, restaurants, gyms, and medical centers. Paradise Center is very close by. The infrastructure is well developed and continues to improve with new projects in the area.',
      },
    ],
  },

  'neighborhood-ovcha-kupel': {
    nameEn: 'Ovcha Kupel',
    taglineEn: 'An established western neighborhood — practical, affordable, and well connected.',
    descriptionEn:
      "Ovcha Kupel is a well-established residential neighborhood in western Sofia with a long history. Built mainly between 1960 and 1990, it's home to a large number of residents and stands as a characteristic example of mass socialist-era construction that has undergone significant transformation in recent decades. Its name comes from a historic livestock watering site once located in the area.\n\nOvcha Kupel has a mixed character — older panel blocks stand alongside a number of renovated buildings and an increasing number of new residential projects. The neighborhood has well-developed social infrastructure, with many schools, kindergartens, medical facilities, sports facilities, and parks. Green spaces are a valued resource for residents.\n\nOvcha Kupel's transport links have improved significantly with the extension of metro line M3, whose Ovcha Kupel station connects the neighborhood to the center and the western parts of the city. The main boulevards provide good access by car to the Ring Road and other parts of the capital.\n\nOvcha Kupel's main appeal is its affordability — price levels are among the more moderate within the urban zone, making it a realistic option for buyers on a limited budget or those seeking a good rental investment. Steady rental demand from students and young professionals ensures good rental yields.",
    transportEn:
      'Metro line M3 — Ovcha Kupel station within the neighborhood. Numerous bus lines. Easy access to the Western Arc and the Ring Road. To the center by metro — about 20 minutes.',
    targetAudienceEn:
      'Buyers on a tighter budget, students and young professionals, families looking for an affordable apartment near the metro, and investors pursuing a rental strategy.',
    prosEn: [
      'Metro line M3 — direct, fast connection to the center',
      "Affordable prices relative to Sofia's average",
      'Well-developed social infrastructure — schools, kindergartens, healthcare facilities',
      'Green areas for relaxation and sports',
      'Stable rental demand — good returns for investors',
    ],
    consEn: [
      'Mostly older construction — panel blocks in need of renovation',
      'Less developed dining and retail scene than central neighborhoods',
      'Lower resale liquidity than the prestigious neighborhoods',
    ],
    metaDescriptionEn:
      'Ovcha Kupel — an established western Sofia neighborhood with metro line M3 and affordable property prices. Apartments for sale and rent, 2026.',
    faq: [
      {
        _key: 'faq-0',
        _type: 'faqItem',
        question: 'Какви са цените на имотите в Овча купел?',
        answer:
          'Овча купел е квартал с достъпни цени за Западна София — около 1 300 – 2 000 €/кв.м за продажба. Наемите за двустаен апартамент са около 500 – 800 €/месец. Кварталът е предпочитан от купувачи с по-ограничен бюджет, търсещи добре свързан район.',
        questionEn: 'What are property prices like in Ovcha Kupel?',
        answerEn:
          'Ovcha Kupel offers affordable prices for western Sofia — around €1,300–2,000/sq.m for sale. Rent for a two-room apartment is about €500–800/month. The neighborhood is favored by buyers on a tighter budget who want a well-connected area.',
      },
      {
        _key: 'faq-1',
        _type: 'faqItem',
        question: 'Как е транспортната връзка на Овча купел?',
        answer:
          'Овча купел е добре свързан с метро (линия М2, станция Овча купел) и автобуси. Метрото осигурява бърз достъп до центъра и летището. Бул. Царица Йоана и бул. Ген. Никола Жеков осигуряват удобна автомобилна достъпност до другите части на града.',
        questionEn: "How good is Ovcha Kupel's transport connectivity?",
        answerEn:
          'Ovcha Kupel is well connected by metro (line M2, Ovcha Kupel station) and buses. The metro provides quick access to the center and the airport. Tsaritsa Yoanna Blvd. and Gen. Nikola Zhekov Blvd. offer convenient car access to other parts of the city.',
      },
      {
        _key: 'faq-2',
        _type: 'faqItem',
        question: 'Подходящ ли е Овча купел за млади семейства и двойки?',
        answer:
          'Да — кварталът е популярен сред млади семейства и двойки заради достъпните цени на наеми и имоти, метро достъп и тихата жилищна среда. Има детски заведения, паркове и добра базова инфраструктура. Идеален е за хора с ограничен бюджет, нуждаещи се от добра транспортна връзка.',
        questionEn: 'Is Ovcha Kupel suitable for young families and couples?',
        answerEn:
          'Yes — the neighborhood is popular among young families and couples for its affordable rents and property prices, metro access, and quiet residential setting. There are childcare facilities, parks, and solid basic infrastructure. It\'s ideal for people on a limited budget who need good transport links.',
      },
      {
        _key: 'faq-3',
        _type: 'faqItem',
        question: 'Какво е предимството на Овча купел пред по-централните квартали?',
        answer:
          'Основното предимство е цената — имоти и наеми на 30 – 50% по-достъпни от Лозенец или Иван Вазов, при запазена добра транспортна връзка с метрото. Кварталът е по-тих и зелен от централните части, а новото строителство подобрява облика му постепенно.',
        questionEn: 'What advantage does Ovcha Kupel have over more central neighborhoods?',
        answerEn:
          'The main advantage is price — properties and rents are 30–50% more affordable than in Lozenets or Ivan Vazov, while still enjoying good metro connectivity. The neighborhood is quieter and greener than the central areas, and new construction is gradually improving its look.',
      },
    ],
  },

  'neighborhood-ovcha-kupel-2': {
    nameEn: 'Ovcha Kupel 2',
    taglineEn: 'A modern alternative in western Sofia — new construction, good prices, and a convenient location.',
    descriptionEn:
      "Ovcha Kupel 2 is the newer, dynamically developing part of the Ovcha Kupel area in western Sofia. Unlike the original neighborhood, Ovcha Kupel 2 is dominated by new housing from the past 10-15 years — modern apartment buildings, gated complexes, and a number of projects still under construction. The neighborhood has become a preferred destination for buyers looking for new construction in western Sofia at a competitive price.\n\nPresident Lincoln Blvd. is the neighborhood's backbone — wide, well maintained, and offering easy access to the Ring Road and other parts of the city. New shops, restaurants, and services are springing up along the boulevard, gradually building a lively urban environment. Schools, kindergartens, and parks are nearby, making it convenient for families with children.\n\nOvcha Kupel 2's infrastructure is developing rapidly — new buildings come with underground parking and modern amenities, and the neighborhood is attracting more and more residents from the central and western parts of the city. Price levels are more moderate than in the southern neighborhoods, but the quality of the new construction is high.\n\nThe neighborhood is especially well suited for investors — rental demand is stable thanks to its proximity to business zones in western Sofia and Ovcha Kupel. The growing supply of new residential projects means buyers have good options to choose from when purchasing new construction.",
    transportEn:
      'Bus lines along President Lincoln Blvd. and Ovcha Kupel Blvd. To Ovcha Kupel II metro station (M3) — about 10-15 minutes. Easy access to the Ring Road. To the center — 20-30 minutes.',
    targetAudienceEn:
      'Buyers of new apartments in western Sofia, young families with children, and investors looking for good value for money.',
    prosEn: [
      'Mostly new construction — modern buildings with good build quality',
      'More affordable prices than the southern and central neighborhoods',
      'Good connectivity to the Ring Road and the western parts of the city',
      'Growing retail infrastructure along President Lincoln Blvd.',
      'Stable rental demand from people working in the western business zones',
    ],
    consEn: [
      'Still-developing infrastructure — fewer restaurants and services than central neighborhoods',
      'Active construction in parts of the neighborhood',
    ],
    metaDescriptionEn:
      'Ovcha Kupel 2 — a new residential neighborhood in western Sofia with modern construction and affordable prices. Apartments for sale and rent, 2026.',
    faq: [
      {
        _key: 'faq-0',
        _type: 'faqItem',
        question: 'Каква е разликата между Овча купел и Овча купел 2?',
        answer:
          'Овча купел 2 е южната, по-нова и по-тиха част на района. Тя е с по-ниска плътност на застрояване, повече зелени площи и предимно панелно и ново строителство. Транспортната връзка е малко по-слаба от Овча купел 1, но компенсира с по-спокойна среда и достъпни цени.',
        questionEn: 'What\'s the difference between Ovcha Kupel and Ovcha Kupel 2?',
        answerEn:
          'Ovcha Kupel 2 is the southern, newer, and quieter part of the area. It has lower building density, more green space, and mostly panel and new construction. Transport links are slightly weaker than Ovcha Kupel 1, but it makes up for it with a calmer setting and affordable prices.',
      },
      {
        _key: 'faq-1',
        _type: 'faqItem',
        question: 'Какви са цените на имотите в Овча купел 2?',
        answer:
          'Овча купел 2 предлага едни от най-достъпните цени в рамките на Западна Sofia — около 1 200 – 1 800 €/кв.м за продажба. Наемите за двустаен апартамент са 450 – 750 €/месец. Кварталът е подходящ за купувачи с по-нисък бюджет, търсещи добро качество на живот.',
        questionEn: 'What are property prices like in Ovcha Kupel 2?',
        answerEn:
          'Ovcha Kupel 2 offers some of the most affordable prices within western Sofia — around €1,200–1,800/sq.m for sale. Rent for a two-room apartment is €450–750/month. The neighborhood suits buyers with a lower budget who still want a good quality of life.',
      },
      {
        _key: 'faq-2',
        _type: 'faqItem',
        question: 'Подходящ ли е Овча купел 2 за семейства?',
        answer:
          'Да — Овча купел 2 е тихо жилищно предградие, подходящо за семейства с деца. Наличието на детски заведения, паркове и ниско движение на коли го правят сигурна и спокойна среда. Единственото ограничение е по-слабата транспортна връзка с центъра в сравнение с Овча купел 1.',
        questionEn: 'Is Ovcha Kupel 2 suitable for families?',
        answerEn:
          'Yes — Ovcha Kupel 2 is a quiet residential suburb suited to families with children. The presence of childcare facilities, parks, and low traffic makes it a safe, calm environment. The only drawback is somewhat weaker transport links to the center compared to Ovcha Kupel 1.',
      },
      {
        _key: 'faq-3',
        _type: 'faqItem',
        question: 'Как е транспортното обслужване в Овча купел 2?',
        answer:
          'Кварталът се обслужва от автобусни линии до метростанция Овча купел и центъра. С кола е лесно достъпен от Южна дъга и бул. Ботевградско шосе. За хора без кола транспортът е малко по-неудобен в сравнение с кварталите директно до метро, но е напълно приемлив за ежедневно придвижване.',
        questionEn: 'How is public transport in Ovcha Kupel 2?',
        answerEn:
          "The neighborhood is served by bus lines to Ovcha Kupel metro station and the center. By car, it's easily accessible from the Southern Arc and Botevgradsko Shose Blvd. For people without a car, transport is a bit less convenient than in neighborhoods right next to the metro, but it's perfectly manageable for daily commuting.",
      },
    ],
  },
}

async function run() {
  const ids = Object.keys(patches)
  let ok = 0
  let failed = 0
  for (const id of ids) {
    try {
      console.log(`Patching ${id}…`)
      await client.patch(id).set(patches[id]).commit()
      ok++
    } catch (err) {
      failed++
      console.error(`❌  Failed to patch ${id}:`, err.message)
    }
  }
  console.log(`✅  Done. ${ok} succeeded, ${failed} failed (of ${ids.length}).`)
  if (failed > 0) process.exit(1)
}

run().catch((err) => {
  console.error('❌  Failed:', err.message)
  process.exit(1)
})
