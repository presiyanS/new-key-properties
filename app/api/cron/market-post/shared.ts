import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@sanity/client'
import { Resend } from 'resend'

export const sanity = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

export const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
export const resend = new Resend(process.env.RESEND_API_KEY)

// Only these domains may be used as sources — the specific authoritative
// list Presiyan approved (BNB, NSI, EU/ECB, market research, etc.). Facts
// found outside this list don't get cited and can't be used in the post.
export const ALLOWED_DOMAINS = [
  'bnb.bg',
  'nsi.bg',
  'nsni.bg',
  'registryagency.bg',
  'ecb.europa.eu',
  'consilium.europa.eu',
  'globalpropertyguide.com',
  'investropa.com',
  'pirotska.bg',
  'tradingeconomics.com',
  'globallawexperts.com',
  'realting.com',
  'build-up.ec.europa.eu',
  'worldpopulationreview.com',
  'similarweb.com',
  'proptech.bg',
  'oecd.org',
  'bta.bg',
  'capital.bg',
  'colliers.com',
]

// Rotating angles so each week covers something different. `research` tells
// the research pass which questions to answer and which of the approved
// sources are most relevant; the actual search is still restricted to
// ALLOWED_DOMAINS as a whole. `image` reuses previously-verified Wikimedia
// Commons photos — new topics reuse an existing one rather than risk a
// broken/unverified URL; Presiyan can swap in a real photo via Sanity anytime.
export const topics = [
  {
    slug_prefix: 'pazaren-obzor',
    category: 'Пазарен анализ',
    research:
      'Провери текущите средни офертни и реално сключени цени на кв.м за жилища в София, годишната промяна спрямо предходната година и обема на регистрираните сделки. Приоритетни източници: nsi.bg, registryagency.bg, globalpropertyguide.com, investropa.com.',
    angle:
      'Напиши актуален пазарен обзор за имотния пазар в София, базиран САМО на проверените данни по-долу.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Sofia_skyline.jpg',
  },
  {
    slug_prefix: 'saveti-kupuvachi',
    category: 'Съвети',
    research:
      'Провери текущите средни цени на кв.м в София (за контекст на примерите) и стандартните разходи по сделка (данък, нотариус, такси). Приоритетни източници: nsi.bg, registryagency.bg, pirotska.bg.',
    angle:
      'Напиши практичен наръчник за купувачи на имоти в София — какво да проверят при оглед, документи, преговори за цена. Използвай проверените данни само за конкретни примери с цифри.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Boulevard_Vitosha_at_night%2C_Sofia_PD_2012_7.JPG',
  },
  {
    slug_prefix: 'investitsii-sofia',
    category: 'Инвестиции',
    research:
      'Провери наемна доходност по квартали в София, средни цени на кв.м и лихви по ипотечни кредити. Приоритетни източници: colliers.com, globalpropertyguide.com, bnb.bg, tradingeconomics.com.',
    angle:
      'Напиши анализ на инвестиционния потенциал на имотния пазар в София — наемна доходност, рискове, сравнение с алтернативи.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/National_Palace_of_Culture_Sofia.jpg',
  },
  {
    slug_prefix: 'kvartal-analiz',
    category: 'Пазарен анализ',
    research:
      'Провери средни цени на кв.м за конкретни квартали в София (избери 1-2 — напр. Лозенец, Младост, Витоша, Кръстова вада) и тенденциите там. Приоритетни източници: nsi.bg, globalpropertyguide.com, investropa.com.',
    angle:
      'Напиши задълбочен анализ на конкретен квартал в София — характеристики, транспорт, цени, целева аудитория.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Cherni_Vrah_Boulevard_with_Krastova_Vada.jpg',
  },
  {
    slug_prefix: 'propuski-kupuvachi',
    category: 'Съвети',
    research:
      'Провери стандартни разходи и такси при сделка с имот в София (данък, нотариус, комисиона) и изисквания за самоучастие при ипотечен кредит. Приоритетни източници: pirotska.bg, bnb.bg.',
    angle:
      'Напиши статия за най-честите грешки, които купувачите на имоти в София правят, с поне 5-7 конкретни примера.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Ivan_Vazov_National_Theatre_december.jpg',
  },
  {
    slug_prefix: 'evrozona-vliyanie',
    category: 'Пазарен анализ',
    research:
      'Провери статуса на въвеждането на еврото в България, официалната дата, и лихвените нива в еврозоната. Приоритетни източници: ecb.europa.eu, consilium.europa.eu, oecd.org, bnb.bg.',
    angle:
      'Напиши статия как въвеждането на еврото и европейските лихвени нива влияят на имотния пазар в София. Какво означава това за купувачите.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Nevski01.jpg',
  },
  {
    slug_prefix: 'ipotechni-lihvi',
    category: 'Анализи',
    research:
      'Провери текущите лихвени нива по жилищни ипотечни кредити в България и прогнозите за годината. Приоритетни източници: bnb.bg, pirotska.bg, tradingeconomics.com.',
    angle:
      'Напиши обективна статия за ипотечните кредити в България днес — лихви, изисквания, как да избереш между фиксирана и променлива лихва.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Sofia_skyline.jpg',
  },
  {
    slug_prefix: 'naem-ili-kupuvane',
    category: 'Съвети',
    research:
      'Провери средни цени на кв.м за покупка и средни наеми в София, както и текущите лихви по ипотечни кредити, за да изчислиш примерни сценарии. Приоритетни източници: nsi.bg, globalpropertyguide.com, bnb.bg.',
    angle:
      'Напиши обективна статия: по-изгодно ли е да наемеш или да купиш имот в София днес? Направи конкретно изчисление на база проверените данни.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Sofia_South_Park.jpg',
  },
  {
    slug_prefix: 'novo-stroitelstvo',
    category: 'Пазарен анализ',
    research:
      'Провери разликата в цените между ново и старо строителство в София и изискванията за енергийна ефективност на новите сгради (EPBD реформа). Приоритетни източници: nsi.bg, build-up.ec.europa.eu, globalpropertyguide.com.',
    angle:
      'Напиши анализ на пазара на ново строителство в София — цени спрямо вторичен пазар, какво да проверят купувачите, енергийни изисквания.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Apartment_block_in_district_of_Sveta_Troitsa%2C_Sofia%2C_Bulgaria.jpg',
  },
  {
    slug_prefix: 'regulacii-broker',
    category: 'Правни съвети',
    research:
      'Провери актуални промени в регулацията на брокерите на недвижими имоти и изискванията за регистрация на сделки в България. Приоритетни източници: globallawexperts.com, realting.com, registryagency.bg.',
    angle:
      'Напиши статия обясняваща на купувачи и продавачи какви са актуалните законови изисквания при сделка с имот в София — защо да работят с лицензиран и почтен брокер.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/National_Palace_of_Culture_Sofia.jpg',
  },
  {
    slug_prefix: 'demografia-sofia',
    category: 'Анализи',
    research:
      'Провери актуални данни за населението на София и тенденциите в растежа му. Приоритетни източници: worldpopulationreview.com, nsi.bg.',
    angle:
      'Напиши статия как ръстът на населението на София се отразява на търсенето на жилища и на имотния пазар.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Sofia_South_Park.jpg',
  },
  {
    slug_prefix: 'evropeiski-trend',
    category: 'Пазарен анализ',
    research:
      'Провери икономическата прогноза (БВП, инфлация) за България и сравнение с други европейски пазари на имоти. Приоритетни източници: oecd.org, bta.bg, tradingeconomics.com.',
    angle:
      'Напиши статия как европейските икономически тенденции влияят на имотния пазар в София — лихви, инфлация, сравнение със съседни пазари.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Nevski01.jpg',
  },
]

export type Topic = (typeof topics)[number]

export const AGENCY_FACTS = `New Key Properties — агенция за недвижими имоти в София, България.
- Слоган: "Доверие - Честност - Резултати"
- Тел: 0879826292 | Email: office@newkey.bg
- Работим с ограничен брой клиенти на месец — за максимално качество на услугата
- Ценности: Честност, прозрачност, истинска грижа за клиента`

// Both prompts take today's date so the model can tell past events (e.g. a
// policy change that already took effect) from ones still ahead, regardless
// of how the source article it read phrased it. Without this, the model has
// no way to know its source was written before an event that has since
// happened, and copies the source's tense verbatim (see: euro-adoption
// article published months after adoption, still calling it "upcoming").
export function buildResearchSystemPrompt(todayISO: string) {
  return `Ти си стриктен пазарен изследовател. Днешната дата е ${todayISO}. Задачата ти е да провериш конкретни факти за имотния пазар в София и България, използвайки САМО резултати от web_search в разрешените домейни.

Правила:
1. Приемай факт (цифра, дата, процент, тенденция) само ако е потвърден от НАЙ-МАЛКО 2 независими източника от разрешените домейни, чиито стойности съвпадат или са разумно близки. Ако намериш само 1 източник или източниците си противоречат съществено, сложи го в "unverified", не в "facts".
2. Никога не измисляй цифри. Ако не намериш достатъчно потвърждение за нещо — не го включвай.
3. За всеки факт в "facts" посочи всички източници, които го потвърждават (име и URL).
4. Ако факт се отнася до събитие с конкретна дата (напр. влизане в сила на закон, приемане на еврото), сравни тази дата с днешната дата (${todayISO}) и посочи изрично в "claim" дали събитието вече е минало или все още предстои СПРЯМО ДНЕС — не спрямо датата на публикуване на източника, който може да е по-стар.
5. Когато намериш повече от 2 съвпадащи източника за един и същ факт, използвай стойността от НАЙ-новите (по дата на публикуване или обхванат период) поне 2 източника, не по-старите, дори ако по-старите изглеждат по-точни или по-често цитирани.
6. Ако най-новите данни, които успя да потвърдиш за даден факт, се отнасят за период по-стар от 6 месеца спрямо днешната дата (${todayISO}), отбележи това изрично в "claim" (напр. "(последни налични данни: [период])"), за да е ясно, че може да няма по-актуална информация.
7. Върни САМО валиден JSON, без markdown форматиране, без обяснения преди или след него, в следния формат:
{"facts":[{"claim":"кратко описание какво е проверено","value":"конкретната стойност/цифра/дата","sources":[{"name":"...","url":"..."}]}],"unverified":["кратко описание на нещо, което не успя да потвърдиш"]}`
}

export function buildWritingSystemPrompt(todayISO: string) {
  return `Ти си опитен журналист и пазарен анализатор за New Key Properties. Днешната дата е ${todayISO}.

За агенцията:
${AGENCY_FACTS}

Правила за писане:
1. Пиши САМО на български език
2. Много важно — време на глаголите спрямо днешната дата (${todayISO}): за всяко събитие с дата в проверените факти прецени дали е било ПРЕДИ или е СЛЕД днешната дата и пиши съответно в минало ("прие", "влезе в сила", "промени") или в бъдеще ("предстои", "ще"). Никога не описвай събитие, което вече е минало към днешната дата, като "предстоящо" или "очаквано" — дори ако така е било описано в изходния източник, който може да е по-стар от днешната дата
3. Обективен, информативен тон — не рекламен
4. Когато се обръщаш пряко към читателя, използвай учтивата форма с главна буква — Вие, Ви, Вашия/Вашето/Вашата — никога неофициалното "ти"
5. Използвай САМО фактите, дадени ти по-долу в JSON. Никога не измисляй и не закръгляш цени, лихвени проценти или суми, които не са дадени там
6. Ако ти трябва конкретна цена за въображаем пример, изведи я чрез изчисление от дадените данни и покажи изчислението
7. Дължина на "content": 600–900 думи
8. Структура на "content": увод (без собствено заглавие) → основно съдържание (2-4 секции, всяка от които започва на собствен ред със заглавие на секцията, обвито в двойни звездички, напр. **Заглавие на секцията** — само заглавието на реда, нищо друго) → заключение, също започващо със заглавие на собствен ред (напр. **Заключение**), с покана за безплатна консултация на 0879 826 292
9. Единственото разрешено markdown форматиране в "content" е двойните звездички около заглавията на секциите, описани в правило 8. Никъде другаде не използвай markdown (без #, _, списъци с тирета/номера и т.н.) — обикновен текст с нови редове между абзаците. Самият "content" не съдържа заглавие на цялата статия в себе си (то е в "title")
10. "title": кратко, привлекателно заглавие (максимум 70 знака), sentence case — главна буква само на първата дума и на собствени имена (напр. София, България), НЕ Title Case
11. "excerpt": кратко резюме, максимум 200 знака
12. "titleEn", "excerptEn", "contentEn": точен, естествен превод на английски на съответните полета — същите факти, цифри и глаголни времена спрямо днешната дата, без добавяне или пропускане на съдържание, включително същите **заглавия на секции** на същите места. "titleEn" също е в sentence case (главна буква само на първата дума и на собствени имена), не Title Case
13. Върни САМО валиден JSON във формат {"title":"...","titleEn":"...","excerpt":"...","excerptEn":"...","content":"...","contentEn":"..."}, без markdown форматиране, без обяснения преди или след него`
}

export function pickTopic(date: Date): Topic {
  const weekNumber = Math.floor(date.getTime() / (7 * 24 * 60 * 60 * 1000))
  return topics[weekNumber % topics.length]
}

export function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}

export type ResearchFact = { claim: string; value: string; sources: { name: string; url: string }[] }
export type ResearchResult = { facts: ResearchFact[]; unverified: string[] }

export function extractJson<T>(text: string): T | null {
  try {
    return JSON.parse(text.trim()) as T
  } catch {
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start === -1 || end === -1 || end <= start) return null
    try {
      return JSON.parse(text.slice(start, end + 1)) as T
    } catch {
      return null
    }
  }
}

export function extractText(content: Anthropic.ContentBlock[]): string {
  return content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map((block) => block.text)
    .join('\n')
}

export function buildResearchNotes(research: ResearchResult): string {
  const factLines = research.facts.map((f) => {
    const sources = f.sources.map((s) => `${s.name} (${s.url})`).join(', ')
    return `- ${f.claim}: ${f.value}\n  Източници: ${sources}`
  })
  const unverifiedLines = research.unverified.map((u) => `- ${u}`)
  return [
    'ПРОВЕРЕНИ ФАКТИ (потвърдени от поне 2 независими източника):',
    factLines.length > 0 ? factLines.join('\n') : '(няма)',
    '',
    'НЕПОТВЪРДЕНИ (не са използвани в статията):',
    unverifiedLines.length > 0 ? unverifiedLines.join('\n') : '(няма)',
  ].join('\n')
}

export function buildFailureEmailHtml(reason: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#1a4d3a;padding:32px 40px;">
      <p style="margin:0;color:#c9a84c;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:sans-serif;">New Key Properties</p>
      <h1 style="margin:12px 0 0;color:#fff;font-size:22px;line-height:1.3;">Тази седмица няма нова блог статия</h1>
    </div>
    <div style="padding:32px 40px;">
      <p style="margin:0;font-size:14px;color:#374151;font-family:sans-serif;line-height:1.6;">${reason}</p>
    </div>
  </div>
</body>
</html>`
}

export function buildDraftReadyEmailHtml(params: {
  title: string
  excerpt: string
  category: string
  sourceCount: number
  studioUrl: string
  previewUrl: string
}): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#1a4d3a;padding:32px 40px;">
      <p style="margin:0;color:#c9a84c;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:sans-serif;">New Key Properties</p>
      <h1 style="margin:12px 0 0;color:#fff;font-size:24px;line-height:1.3;">Нова чернова е готова за преглед</h1>
    </div>
    <div style="padding:32px 40px;">
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;margin-bottom:24px;">
        <p style="margin:0 0 4px;font-size:11px;color:#6b7280;font-family:sans-serif;text-transform:uppercase;letter-spacing:1px;">${params.category}</p>
        <h2 style="margin:0 0 12px;font-size:20px;color:#111827;">${params.title}</h2>
        <p style="margin:0;font-size:14px;color:#374151;font-family:sans-serif;line-height:1.5;">${params.excerpt}</p>
      </div>
      <p style="margin:0 0 20px;font-size:13px;color:#6b7280;font-family:sans-serif;">Проверена е с ${params.sourceCount} източник(а). Пълният списък е записан в бележките на статията в Studio, преди да я публикуваш.</p>
      <a href="${params.previewUrl}" style="display:block;background:#1a4d3a;color:#c9a84c;text-decoration:none;text-align:center;padding:16px;border-radius:12px;font-weight:bold;font-size:16px;font-family:sans-serif;margin-bottom:12px;">
        Прегледай статията →
      </a>
      <a href="${params.studioUrl}" style="display:block;text-align:center;padding:8px;font-size:13px;color:#6b7280;font-family:sans-serif;">
        Или отвори в Studio за публикуване
      </a>
    </div>
  </div>
</body>
</html>`
}
