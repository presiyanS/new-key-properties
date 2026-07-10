/**
 * Populates the *En fields on homePage, aboutPage, and contactPage with
 * English translations of the existing Bulgarian content, so the /en site
 * shows real English marketing copy instead of falling back to Bulgarian.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/translate-pages-en.mjs
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

const homePagePatch = {
  heroBadgeEn: 'Real Estate Agency · Sofia',
  heroLine1En: 'Your New',
  heroLineGoldEn: 'Home',
  heroLine3En: 'Starts',
  heroLine4En: 'Here',
  heroSubtitleEn:
    'New Key Properties — the honest agency that genuinely cares about its clients. We find the right property for you in Sofia with full transparency and maximum dedication.',
  heroButton1En: 'Browse Properties',
  heroButton2En: 'Get in Touch',
  scrollIndicatorEn: 'Explore',
  heroBadges: [
    { _key: 'hb1', title: 'Честност', subtitle: 'Пълна прозрачност', titleEn: 'Honesty', subtitleEn: 'Full transparency' },
    { _key: 'hb2', title: 'Доверие', subtitle: 'Дългосрочни резултати', titleEn: 'Trust', subtitleEn: 'Long-term results' },
    { _key: 'hb3', title: 'София', subtitle: '', titleEn: 'Sofia', subtitleEn: '' },
    { _key: 'hb4', title: 'Резултати', subtitle: 'Без компромиси', titleEn: 'Results', subtitleEn: 'No compromises' },
  ],
  stats: [
    { _key: 's1', value: 'София', label: 'Нашият пазар', valueEn: 'Sofia', labelEn: 'Our Market' },
    { _key: 's2', value: '100%', label: 'Отдаденост', valueEn: '100%', labelEn: 'Dedication' },
    { _key: 's3', value: 'Персонален', label: 'Подход към всеки', valueEn: 'Personal', labelEn: 'Approach to Every Client' },
    { _key: 's4', value: '0', label: 'Скрити такси', valueEn: '0', labelEn: 'Hidden Fees' },
  ],
  servicesTitleEn: 'Our Services',
  servicesSubtitleEn: 'A full range of real estate services in Sofia.',
  services: [
    { _key: 'sv1', title: 'Продажби', desc: 'Продаваме Вашия имот на най-добра цена — прозрачно, бързо и без излишен стрес.', titleEn: 'Sales', descEn: 'We sell your property at the best price — transparently, quickly, and without unnecessary stress.' },
    { _key: 'sv2', title: 'Наеми', desc: 'Намираме надеждни наематели или идеалния имот под наем за Вас в София.', titleEn: 'Rentals', descEn: 'We find reliable tenants or the ideal rental property for you in Sofia.' },
    { _key: 'sv3', title: 'Намиране на имот', desc: 'Търсим и намираме имоти по Вашите конкретни критерии — като за нас самите.', titleEn: 'Property Sourcing', descEn: 'We search for and find properties matching your specific criteria — as if for ourselves.' },
    { _key: 'sv4', title: 'Инвестиции', desc: 'Реален анализ на доходност и пазарни тенденции — помагаме Ви да инвестирате умно.', titleEn: 'Investments', descEn: 'Real analysis of returns and market trends — we help you invest wisely.' },
  ],
  whyUsTitleEn: 'Why New Key Properties?',
  whyUsSubtitleEn:
    "We're not just another agency. We work with a limited number of clients each month to guarantee that everyone gets our full attention and the best we have to offer.",
  whyUsPoints: [
    { _key: 'w1', title: 'Честност на първо място', desc: 'Никога не скриваме информация. Пълна прозрачност при всяка стъпка от сделката.', titleEn: 'Honesty First', descEn: 'We never withhold information. Full transparency at every step of the deal.' },
    { _key: 'w2', title: 'Работим като за себе си', desc: 'Подхождаме към всяка сделка сякаш купуваме или продаваме собствен имот.', titleEn: "We Work Like It's Our Own", descEn: 'We approach every deal as if we were buying or selling our own property.' },
    { _key: 'w3', title: 'Ограничен брой клиенти', desc: 'Максимум 10 клиента на месец — за максимален фокус и качество на услугата.', titleEn: 'Limited Client Roster', descEn: 'Maximum 10 clients a month — for maximum focus and quality of service.' },
    { _key: 'w4', title: 'Дълбоко познаваме пазара', desc: 'Задълбочени познания за всеки квартал, ценови нива и тенденции в София.', titleEn: 'Deep Market Knowledge', descEn: 'In-depth knowledge of every neighborhood, price levels, and trends in Sofia.' },
  ],
  featuredLabelEn: 'PORTFOLIO',
  featuredTitleEn: 'Featured Properties',
  featuredSubtitleEn: 'Carefully selected listings from our portfolio',
  featuredLinkTextEn: 'All Properties',
  featuredMobileLinkTextEn: 'All Properties',
  processLabelEn: 'Our Method',
  whyUsLabelEn: 'Our Difference',
  whyUsButtonEn: 'Learn More About Us',
  ctaCardLabelEn: 'Free Consultation',
  ctaCardTitleEn: 'Ready to Take Action?',
  ctaCardDescEn:
    'The Sofia property market moves fast. Good deals disappear. Get in touch now — the number of clients we take on is limited.',
  ctaCardButton1En: '0879 826 292',
  ctaCardButton2En: 'Send an Inquiry',
  ctaCardTrustTextEn: '100% free, no obligation',
  blogLabelEn: 'Insights',
  blogTitleEn: 'Useful Information',
  blogSubtitleEn: 'Analysis, tips, and news from the real estate market',
  blogLinkTextEn: 'All Articles',
  finalCtaTitleEn: 'Honesty. Trust. Results.',
  finalCtaSubtitleEn: 'Get in touch with New Key Properties today and take the right step in the Sofia property market.',
  finalCtaButton1En: 'Call Now',
  finalCtaButton2En: 'office@newkey.bg',
  processTitleEn: 'How We Work',
  processSubtitleEn: 'Three simple steps to your ideal property — no surprises, no stress.',
  processSteps: [
    { _key: 'p1', title: 'Консултация', desc: 'Разговаряме задълбочено за Вашите нужди, бюджет и конкретни предпочитания. Безплатно и без ангажименти — само честен разговор.', titleEn: 'Consultation', descEn: 'We talk in depth about your needs, budget, and specific preferences. Free and no obligation — just an honest conversation.' },
    { _key: 'p2', title: 'Проучване', desc: 'Намираме имоти, отговарящи точно на Вашите критерии. Показваме само сериозни, реалистични оферти — без губене на Вашето време.', titleEn: 'Research', descEn: 'We find properties that match your criteria exactly. We only show serious, realistic listings — no wasting your time.' },
    { _key: 'p3', title: 'Резултат', desc: 'Придружаваме Ви до финалното подписване и след него. Работим докато намерим правилното решение — без бързане към комисионна.', titleEn: 'Result', descEn: 'We accompany you through to the final signing and beyond. We keep working until we find the right solution — never rushing for a commission.' },
  ],
  processButtonTextEn: 'Start a Free Consultation',
  faq: [
    { _key: 'f1', q: 'Колко струват услугите  ви?', a: 'Комисионната ни е стандартна за пазара и се договаря индивидуално в зависимост от типа и стойността на сделката. При покупка — работим изцяло в интерес на купувача, без скрити такси. Безплатната ни консултация не Ви задължава с нищо.', qEn: 'How much do your services cost?', aEn: "Our commission is standard for the market and is negotiated individually depending on the type and value of the deal. When buying, we work entirely in the buyer's interest, with no hidden fees. Our free consultation doesn't obligate you to anything." },
    { _key: 'f2', q: 'Работите само в определени квартали на София ли?', a: 'Работим в цяла София, но специализираме в Малинова долина, Драгалевци, Манастирски ливади, Овча купел, Дружба, Младост.', qEn: 'Do you only work in certain neighborhoods of Sofia?', aEn: 'We work across all of Sofia, but we specialize in Malinova Dolina, Dragalevtsi, Manastirski Livadi, Ovcha Kupel, Druzhba, and Mladost.' },
    { _key: 'f3', q: 'Как работи безплатната консултация?', a: 'Свързвате се с нас по телефон или имейл, уговаряме удобно за Вас време и провеждаме разговор от 30–45 минути — по телефон или на живо. Обсъждаме Вашите нужди, бюджет и планове. Без задължения и без натиск.', qEn: 'How does the free consultation work?', aEn: 'You contact us by phone or email, we arrange a time that suits you, and we have a 30–45 minute conversation — by phone or in person. We discuss your needs, budget, and plans. No obligation, no pressure.' },
    { _key: 'f4', q: 'Защо да работя с консултант, вместо сам да търся имот?', a: 'Добрите имоти изчезват бързо — понякога за дни. Консултантът Ви дава достъп до оферти преди да са публикувани, спестява Ви часове оглед на неподходящи имоти, проверява документи и Ви представлява при преговорите.', qEn: 'Why work with a consultant instead of searching on my own?', aEn: 'Good properties disappear fast — sometimes within days. A consultant gives you access to listings before they’re published, saves you hours of viewing unsuitable properties, checks documents, and represents you in negotiations.' },
    { _key: 'f5', q: 'Помагате ли и при наеми, не само покупки?', a: 'Да — работим при наеми, покупки, продажби и инвестиционни консултации. Независимо дали търсите имот за живеене, за отдаване под наем или като инвестиция, нашият екип е на Ваше разположение.', qEn: 'Do you also help with rentals, not just purchases?', aEn: "Yes — we handle rentals, purchases, sales, and investment consulting. Whether you're looking for a home, a rental property, or an investment, our team is here for you." },
    { _key: 'f6', q: 'Колко бързо може да се осъществи сделка?', a: 'Зависи от типа сделка. Наем може да се финализира за 1–2 седмици. Покупко-продажба с ипотека отнема обичайно 4–8 седмици. При готов финансов ресурс — понякога под 3 седмици.', qEn: 'How quickly can a deal close?', aEn: 'It depends on the type of deal. A rental can be finalized in 1–2 weeks. A purchase with a mortgage usually takes 4–8 weeks. With cash in hand, sometimes under 3 weeks.' },
  ],
}

const aboutPagePatch = {
  heroTitleEn: 'The Agency That Truly',
  heroTitleGoldEn: 'Cares',
  heroSubtitleEn:
    "New Key Properties isn't just another real estate agency. We're a team of people for whom honesty and client care aren't marketing phrases — they're how we work.",
  missionTitleEn: 'Our Mission',
  missionParagraphsEn: [
    'We believe the real estate market needs more honesty. Too many people are let down by agencies that think only about their commission, not the client.',
    'We work differently. We work with a limited number of clients so we can give each one maximum attention. We approach every deal as if it were our own — with full responsibility and care.',
    'Our goal is to become the most trusted agency in Sofia — not through advertising, but through real results and satisfied clients.',
  ],
  missionCardTitleEn: 'Trust – Honesty – Results',
  missionValues: [
    { _key: 'mv1', label: 'Доверие', desc: 'Изграждаме дългосрочни отношения, основани на честна работа и реални резултати.', labelEn: 'Trust', descEn: 'We build long-term relationships based on honest work and real results.' },
    { _key: 'mv2', label: 'Честност', desc: 'Казваме истината — дори когато тя не е това, което клиентът иска да чуе.', labelEn: 'Honesty', descEn: "We tell the truth — even when it isn't what the client wants to hear." },
    { _key: 'mv3', label: 'Резултати', desc: 'Фокусираме се върху намирането на правилното решение, не на бързата комисионна.', labelEn: 'Results', descEn: 'We focus on finding the right solution, not a quick commission.' },
  ],
  values: [
    { _key: 'v1', title: 'Прозрачност', desc: 'Никакви скрити такси, никакви изненади. Знаете точно с какво разполагате и какво Ви струва.', titleEn: 'Transparency', descEn: 'No hidden fees, no surprises. You know exactly where you stand and what it costs you.' },
    { _key: 'v2', title: 'Личен подход', desc: 'Всеки клиент е уникален. Слушаме внимателно и намираме решения, съобразени с Вашата конкретна ситуация.', titleEn: 'Personal Approach', descEn: 'Every client is unique. We listen carefully and find solutions tailored to your specific situation.' },
    { _key: 'v3', title: 'Качество пред количество', desc: 'Работим с ограничен брой клиенти на месец, за да гарантираме максимално качество на услугата.', titleEn: 'Quality Over Quantity', descEn: 'We work with a limited number of clients each month to guarantee the highest quality of service.' },
    { _key: 'v4', title: 'Дългосрочно мислене', desc: 'Интересуваме се от Вашите дългосрочни цели, не само от текущата сделка.', titleEn: 'Long-Term Thinking', descEn: 'We care about your long-term goals, not just the current deal.' },
    { _key: 'v5', title: 'Пазарна компетентност', desc: 'Следим пазара постоянно и Ви даваме реална картина — без преувеличения в нито една посока.', titleEn: 'Market Expertise', descEn: 'We track the market constantly and give you a realistic picture — no exaggeration in either direction.' },
    { _key: 'v6', title: 'Ангажираност', desc: 'Остаме достъпни и ангажирани от първия контакт до финалното подписване и след него.', titleEn: 'Commitment', descEn: 'We stay available and engaged from first contact through final signing and beyond.' },
  ],
  valuesTitleEn: 'Our Values',
  valuesSubtitleEn: 'The principles we bring to every deal and every client.',
  heroStats: [
    { _key: 'hs1', value: '≤10', label: 'клиента/месец', labelEn: 'clients/month' },
    { _key: 'hs2', value: '0', label: 'скрити такси', labelEn: 'hidden fees' },
    { _key: 'hs3', value: '100%', label: 'отдаденост', labelEn: 'dedication' },
  ],
  specializationTitleEn: 'What We Do',
  specializationSubtitleEn:
    'New Key Properties specializes exclusively in residential and investment property in Sofia — sales, rentals, and property sourcing.',
  specializations: [
    { _key: 'sp1', title: 'Продажби', items: ['Оценка на имота', 'Маркетинг и представяне', 'Преговори от Ваше име', 'Цялостна правна подкрепа'], titleEn: 'Sales', itemsEn: ['Property valuation', 'Marketing and presentation', 'Negotiation on your behalf', 'Full legal support'] },
    { _key: 'sp2', title: 'Наеми', items: ['Намиране на наематели', 'Проверка на кандидати', 'Договори за наем', 'Управление на имота'], titleEn: 'Rentals', itemsEn: ['Finding tenants', 'Candidate screening', 'Lease agreements', 'Property management'] },
    { _key: 'sp3', title: 'Намиране на имот', items: ['Анализ на нуждите', 'Активно търсене', 'Проверка на документи', 'Преговори и покупка'], titleEn: 'Property Sourcing', itemsEn: ['Needs analysis', 'Active search', 'Document verification', 'Negotiation and purchase'] },
  ],
  ctaTitleEn: 'Ready to Work With Us?',
  ctaSubtitleEn: 'Spots are limited. Get in touch now and see how we can help.',
}

const contactPagePatch = {
  heroTitleEn: 'Get in',
  heroTitleGoldEn: 'Touch',
  heroSubtitleEn: 'We work with a limited number of clients each month. Get in touch now and reserve your place.',
  contactInfoLabelEn: 'Get in Touch',
  contactInfoTitleEn: 'Contact Information',
  addressEn: 'Sofia, Bulgaria',
  phoneHoursEn: 'Mon – Fri: 9:00 AM – 6:00 PM, Sat: 10:00 AM – 3:00 PM',
  emailNoteEn: 'We respond within 24 hours',
  addressNoteEn: 'We serve the entire city',
  urgencyTitleEn: 'Limited Availability',
  urgencyMessageEn: 'We work with a limited number of clients each month to guarantee the highest quality. Get in touch now — availability is limited.',
  formTitleEn: 'Send an Inquiry',
  formSubtitleEn: "Fill out the form and we'll get back to you within 24 hours.",
}

async function run() {
  console.log('Patching homePage…')
  await client.patch('homePage').set(homePagePatch).commit()
  console.log('Patching aboutPage…')
  await client.patch('aboutPage').set(aboutPagePatch).commit()
  console.log('Patching contactPage…')
  await client.patch('contactPage').set(contactPagePatch).commit()
  console.log('✅  Done')
}

run().catch((err) => {
  console.error('❌  Failed:', err.message)
  process.exit(1)
})
