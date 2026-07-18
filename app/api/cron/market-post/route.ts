import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { createClient } from '@sanity/client'
import { SOFIA_MARKET_DATA } from '@/lib/sofiaMarketData'

const sanity = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Rotating topics so each week covers something different
// Each topic has its own real, verified photo (Wikimedia Commons) instead of
// sharing 3 generic stock images across every post — avoids repeating the
// same cover art and avoids location-mismatched stock photos.
const topics = [
  {
    slug_prefix: 'pazaren-obzor',
    category: 'Пазарен анализ',
    prompt: 'Напиши актуален пазарен обзор за имотния пазар в София за текущия месец. Включи: текущи средни цени на квадратен метър, сравнение с предходния период, търсене vs. предлагане, кои квартали са най-активни и защо.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Sofia_skyline.jpg',
  },
  {
    slug_prefix: 'saveti-kupuvachi',
    category: 'Съвети',
    prompt: 'Напиши практичен наръчник за купувачи на имоти в София. Включи: как да разпознаят добра оферта, на какво да обърнат внимание при оглед, какви документи да проверят, как да преговарят за цената. Тон — честен съвет от приятел с опит.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Boulevard_Vitosha_at_night%2C_Sofia_PD_2012_7.JPG',
  },
  {
    slug_prefix: 'investitsii-sofia',
    category: 'Инвестиции',
    prompt: 'Напиши анализ за инвестиционния потенциал на имотния пазар в София. Включи: наемна доходност по квартали, какъв тип имоти носят най-добра възвращаемост, рискове и предимства на имотната инвестиция спрямо алтернативите.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/National_Palace_of_Culture_Sofia.jpg',
  },
  {
    slug_prefix: 'kvartal-analiz',
    category: 'Пазарен анализ',
    prompt: 'Напиши задълбочен анализ на конкретен квартал в София — избери между Драгалевци, Малинова долина, Младост, Лозенец, Витоша или Кръстова вада. Включи: характеристики на квартала, транспорт, средни цени, целева аудитория, тенденции.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Cherni_Vrah_Boulevard_with_Krastova_Vada.jpg',
  },
  {
    slug_prefix: 'propuski-kupuvachi',
    category: 'Съвети',
    prompt: 'Напиши статия за най-честите грешки, които купувачите на имоти в София правят. Включи поне 5-7 конкретни грешки с обяснение защо са грешки и как да ги избегнат. Тон — директен, честен, полезен.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Ivan_Vazov_National_Theatre_december.jpg',
  },
  {
    slug_prefix: 'evropeiski-trend',
    category: 'Пазарен анализ',
    prompt: 'Напиши статия как европейските тенденции в имотния пазар влияят на България и София. Включи: лихвени нива, инфлация, движение на капитали, сравнение с Румъния, Полша и Гърция. Какво означава това за купувачите в София?',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Nevski01.jpg',
  },
  {
    slug_prefix: 'naem-ili-kupuvane',
    category: 'Съвети',
    prompt: 'Напиши обективна статия: по-изгодно ли е да наемеш или да купиш имот в София днес? Включи конкретни изчисления, примерни сценарии, кога има смисъл да купуваш и кога — да наемаш. Без пристрастие.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Sofia_South_Park.jpg',
  },
  {
    slug_prefix: 'novo-stroitelstvo',
    category: 'Пазарен анализ',
    prompt: 'Напиши анализ на пазара на ново строителство в София. Включи: разлика в цените ново vs. старо строителство, предимства и рискове при покупка на Акт 14/15/16, какво да проверят купувачите при новострояща се сграда.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Apartment_block_in_district_of_Sveta_Troitsa%2C_Sofia%2C_Bulgaria.jpg',
  },
]

const systemPrompt = `Ти си опитен журналист и пазарен анализатор за New Key Properties — агенция за недвижими имоти в София, България.

За агенцията:
- Слоган: "Доверие - Честност - Резултати"
- Тел: 0879826292 | Email: office@newkey.bg
- Ценности: Честност, прозрачност, истинска грижа за клиента

${SOFIA_MARKET_DATA}

Правила за писане:
1. Пиши САМО на български език
2. Обективен, информативен тон — не рекламен
3. Използвай САМО цифрите от пазарните данни по-горе, когато цитираш цени, лихви или доходност — никога не измисляй и не закръгляй на своя глава цени, лихвени проценти или суми, които не са дадени там
4. Ако ти трябва конкретна цена за въображаем пример (напр. апартамент от Х м²), изведи я чрез изчисление от дадените диапазони/€-на-м² и покажи изчислението
5. Дължина: 600–900 думи
6. Структура: увод → основно съдържание (2-4 секции) → заключение с CTA към агенцията
7. Завърши с покана за безплатна консултация на 0879 826 292
8. Не включвай заглавие в текста — само съдържанието
9. Не включвай markdown форматиране (без #, **, _ и т.н.) — само обикновен текст с нови редове`

function pickTopic(date: Date) {
  const weekNumber = Math.floor(date.getTime() / (7 * 24 * 60 * 60 * 1000))
  return topics[weekNumber % topics.length]
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u0400-\u04ff\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}

export async function GET(request: NextRequest) {
  // Verify this is called by Vercel Cron (or manually with the secret)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()
    const topic = pickTopic(now)

    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      systemInstruction: systemPrompt,
    })

    // Generate title first
    const titleResult = await model.generateContent(
      `Измисли кратко, привлекателно заглавие (максимум 70 знака) за статия на тема: ${topic.prompt}. Използвай главна буква само на първата дума и на собствени имена (напр. София, България) — не пиши всяка дума с главна буква. Върни САМО заглавието, без кавички или обяснения.`
    )
    const title = titleResult.response.text().trim()

    // Generate content
    const contentResult = await model.generateContent(topic.prompt)
    const content = contentResult.response.text().trim()

    // Generate excerpt
    const excerptResult = await model.generateContent(
      `Напиши кратко резюме (максимум 200 знака) за следната статия:\n\n${content}\n\nВърни САМО резюмето.`
    )
    const excerpt = excerptResult.response.text().trim()

    const slug = `${topic.slug_prefix}-${formatDate(now)}`

    const post = await sanity.create({
      _type: 'blogPost',
      title,
      slug: { _type: 'slug', current: slug },
      date: formatDate(now),
      category: topic.category,
      excerpt,
      content,
      externalImageUrl: topic.image,
    })

    return NextResponse.json({ success: true, id: post._id, title, slug })
  } catch (error) {
    console.error('Cron market post error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
