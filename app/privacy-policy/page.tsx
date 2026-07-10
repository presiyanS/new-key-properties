import type { Metadata } from 'next'
import Link from 'next/link'
import { getLocale } from '@/lib/i18n/getDictionary'
import { localizeHref, hreflangAlternates } from '@/lib/i18n/config'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  if (locale === 'en') {
    return {
      title: 'Privacy Policy — New Key Properties',
      description:
        'Privacy policy and personal data protection at New Key Properties. Learn how we handle your data in compliance with GDPR.',
      robots: { index: true, follow: true },
      alternates: hreflangAlternates('/privacy-policy', locale),
    }
  }
  return {
    title: 'Политика за поверителност — New Key Properties',
    description:
      'Политика за поверителност и защита на личните данни на New Key Properties. Научете как обработваме вашите данни в съответствие с GDPR.',
    robots: { index: true, follow: true },
    alternates: hreflangAlternates('/privacy-policy', locale),
  }
}

const content = {
  bg: {
    eyebrow: 'Правна информация',
    title: 'Политика за поверителност',
    lastUpdatedLabel: 'Последна актуализация',
    lastUpdated: '08.07.2026',
    sections: [
      {
        heading: '1. Администратор на личните данни',
        intro: 'Администратор на личните данни, събирани чрез този уебсайт, е:',
        infoBox: [
          ['Търговско наименование:', 'New Key Properties'],
          ['Електронна поща:', 'office@newkey.bg'],
          ['Телефон:', '0879 826 292'],
          ['Адрес:', 'София, България'],
        ],
      },
      {
        heading: '2. Какви лични данни събираме',
        intro: 'При изпращане на запитване чрез контактната форма на нашия уебсайт, събираме следните лични данни:',
        list: [
          ['Три имена', 'Необходими за идентификация при отговор'],
          ['Телефонен номер', 'За да се свържем с Вас относно Вашето запитване'],
          ['Електронна поща (незадължително)', 'За кореспонденция по имейл при Ваше желание'],
          ['Съобщение / описание на търсения имот', 'За да разберем Вашите нужди и да Ви предложим подходящи решения'],
        ],
        outro:
          'Освен горепосочените данни, уебсайтът може автоматично да събира технически данни като IP адрес и тип браузър чрез хостинг доставчика (Vercel), единствено с цел осигуряване на технически функционалности и сигурност.',
      },
      {
        heading: '3. Цел и правно основание за обработка',
        intro: 'Личните Ви данни се обработват за следните цели:',
        cards: [
          {
            title: 'Отговор на запитване',
            desc: 'Обработваме данните Ви, за да отговорим на Вашето запитване относно покупка, наем или продажба на имот. Правното основание е предприемане на действия по Ваше искане преди сключване на договор (чл. 6, ал. 1, б. „б" GDPR).',
          },
          {
            title: 'Предоставяне на имотни консултации',
            desc: 'Данните се използват за изготвяне и предоставяне на персонализирани консултации в областта на недвижимите имоти. Правното основание е изпълнение на договор или предприемане на стъпки преди сключване на такъв (чл. 6, ал. 1, б. „б" GDPR).',
          },
          {
            title: 'Легитимен интерес',
            desc: 'В определени случаи може да обработваме данните въз основа на легитимен интерес (чл. 6, ал. 1, б. „е" GDPR), за да поддържаме качеството на предоставяните услуги.',
          },
        ],
      },
      {
        heading: '4. Срок на съхранение',
        body: (
          <>
            Личните данни, изпратени чрез контактната форма, се съхраняват само за периода, необходим за обработка на запитването. Ако между нас не бъде сключен договор, данните се заличават не по-късно от <strong>6 месеца</strong> от последния контакт. При сключен договор данните се съхраняват за срока, предвиден от приложимото счетоводно и търговско законодателство.
          </>
        ),
      },
      {
        heading: '5. Получатели на личните данни',
        intro: 'Личните Ви данни не се продават, наемат или споделят с трети лица за маркетингови цели. Данните могат да бъдат споделяни единствено с:',
        simpleList: [
          'Resend Inc. — доставчик на имейл услуги, използван за препращане на запитвания до нас. Resend е сертифициран по стандартите за защита на данни.',
          'Vercel Inc. — хостинг доставчик, поддържащ инфраструктурата на уебсайта.',
          'Компетентни държавни органи — при законово задължение.',
        ],
      },
      {
        heading: '6. Вашите права',
        intro: 'Съгласно Регламент (ЕС) 2016/679 (GDPR) и Закона за защита на личните данни, имате следните права:',
        rightsGrid: [
          ['Право на достъп', 'Да получите информация какви данни за Вас обработваме.'],
          ['Право на коригиране', 'Да поискате коригиране на неточни данни.'],
          ['Право на изтриване', 'Да поискате заличаване на данните (право „да бъдеш забравен").'],
          ['Право на ограничаване', 'Да поискате ограничаване на обработката при определени обстоятелства.'],
          ['Право на преносимост', 'Да получите данните си в структуриран, машинночетим формат.'],
          ['Право на възражение', 'Да се противопоставите на обработката при основание за легитимен интерес.'],
        ],
        rightsFooter: (
          <>
            За упражняване на правата си, моля свържете се с нас на <a href="mailto:office@newkey.bg" className="text-brand-green font-medium hover:underline">office@newkey.bg</a>. Имате право и да подадете жалба до <strong>Комисия за защита на личните данни (КЗЛД)</strong>, гр. София, бул. „Проф. Цветан Лазаров" № 2, www.cpdp.bg.
          </>
        ),
      },
      {
        heading: '7. Бисквитки (cookies)',
        body: 'Уебсайтът използва минимален набор от технически бисквитки, необходими единствено за функционирането на сайта (напр. автентикация в администраторски раздели). Не използваме рекламни или проследяващи бисквитки от трети страни.',
      },
      {
        heading: '8. Промени в политиката',
        body: 'Запазваме правото си да актуализираме настоящата политика при промяна в законодателството или в начина ни на работа. Актуалната версия е достъпна на тази страница. Датата на последна актуализация е посочена в началото на документа.',
      },
    ],
    contactBox: {
      heading: 'Въпроси относно поверителността?',
      body: 'Ако имате въпроси относно начина, по който обработваме личните Ви данни, не се колебайте да се свържете с нас:',
    },
    backLink: '← Обратно към контактите',
  },
  en: {
    eyebrow: 'Legal information',
    title: 'Privacy Policy',
    lastUpdatedLabel: 'Last updated',
    lastUpdated: '08.07.2026',
    sections: [
      {
        heading: '1. Data controller',
        intro: 'The controller of personal data collected through this website is:',
        infoBox: [
          ['Business name:', 'New Key Properties'],
          ['Email:', 'office@newkey.bg'],
          ['Phone:', '0879 826 292'],
          ['Address:', 'Sofia, Bulgaria'],
        ],
      },
      {
        heading: '2. What personal data we collect',
        intro: 'When you send an inquiry through the contact form on our website, we collect the following personal data:',
        list: [
          ['Full name', 'Needed to identify you when we respond'],
          ['Phone number', 'So we can contact you about your inquiry'],
          ['Email (optional)', 'For email correspondence if you prefer it'],
          ['Message / description of the property you are looking for', 'To understand your needs and offer suitable options'],
        ],
        outro:
          'In addition to the data above, the website may automatically collect technical data such as IP address and browser type via our hosting provider (Vercel), solely to ensure technical functionality and security.',
      },
      {
        heading: '3. Purpose and legal basis for processing',
        intro: 'Your personal data is processed for the following purposes:',
        cards: [
          {
            title: 'Responding to your inquiry',
            desc: 'We process your data to respond to your inquiry about buying, renting, or selling a property. The legal basis is taking steps at your request prior to entering into a contract (Art. 6(1)(b) GDPR).',
          },
          {
            title: 'Providing property consulting',
            desc: 'Data is used to prepare and provide personalized real estate consulting. The legal basis is performance of a contract or taking steps prior to entering into one (Art. 6(1)(b) GDPR).',
          },
          {
            title: 'Legitimate interest',
            desc: 'In certain cases we may process data based on legitimate interest (Art. 6(1)(f) GDPR), to maintain the quality of the services we provide.',
          },
        ],
      },
      {
        heading: '4. Retention period',
        body: (
          <>
            Personal data submitted through the contact form is retained only for as long as necessary to process your inquiry. If no contract is concluded between us, the data is deleted no later than <strong>6 months</strong> after the last contact. If a contract is concluded, data is retained for the period required by applicable accounting and commercial legislation.
          </>
        ),
      },
      {
        heading: '5. Recipients of personal data',
        intro: 'We do not sell, rent, or share your personal data with third parties for marketing purposes. Data may only be shared with:',
        simpleList: [
          'Resend Inc. — an email service provider used to forward inquiries to us. Resend is certified to data protection standards.',
          'Vercel Inc. — the hosting provider supporting the website’s infrastructure.',
          'Competent public authorities — where required by law.',
        ],
      },
      {
        heading: '6. Your rights',
        intro: 'Under Regulation (EU) 2016/679 (GDPR) and the Bulgarian Personal Data Protection Act, you have the following rights:',
        rightsGrid: [
          ['Right of access', 'To obtain information about what data we process about you.'],
          ['Right to rectification', 'To request correction of inaccurate data.'],
          ['Right to erasure', 'To request deletion of your data ("right to be forgotten").'],
          ['Right to restriction', 'To request restriction of processing under certain circumstances.'],
          ['Right to data portability', 'To receive your data in a structured, machine-readable format.'],
          ['Right to object', 'To object to processing based on legitimate interest.'],
        ],
        rightsFooter: (
          <>
            To exercise your rights, please contact us at <a href="mailto:office@newkey.bg" className="text-brand-green font-medium hover:underline">office@newkey.bg</a>. You also have the right to file a complaint with the <strong>Commission for Personal Data Protection (CPDP)</strong>, Sofia, 2 Prof. Tsvetan Lazarov Blvd., www.cpdp.bg.
          </>
        ),
      },
      {
        heading: '7. Cookies',
        body: 'The website uses a minimal set of technical cookies necessary solely for the site to function (e.g. authentication in admin sections). We do not use advertising or third-party tracking cookies.',
      },
      {
        heading: '8. Changes to this policy',
        body: 'We reserve the right to update this policy in the event of changes in legislation or in how we operate. The current version is always available on this page. The date of the last update is shown at the top of the document.',
      },
    ],
    contactBox: {
      heading: 'Questions about privacy?',
      body: 'If you have questions about how we handle your personal data, feel free to reach out:',
    },
    backLink: '← Back to contact',
  },
} as const

export default async function PrivacyPolicyPage() {
  const locale = await getLocale()
  const t = content[locale]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-brand-green py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold/60 uppercase text-xs tracking-widest mb-4 font-medium">{t.eyebrow}</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="text-white/60 text-sm">{t.lastUpdatedLabel}: {t.lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12 space-y-10">

            {t.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-serif text-2xl font-bold text-brand-green mb-4">{s.heading}</h2>

                {'intro' in s && s.intro && (
                  <p className="text-gray-600 leading-relaxed mb-3">{s.intro}</p>
                )}

                {'infoBox' in s && s.infoBox && (
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 text-sm text-gray-700 space-y-1.5">
                    {s.infoBox.map(([label, value]) => (
                      <p key={label}><strong>{label}</strong> {value}</p>
                    ))}
                  </div>
                )}

                {'list' in s && s.list && (
                  <ul className="space-y-2">
                    {s.list.map(([field, reason]) => (
                      <li key={field} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                        <span><strong>{field}</strong> — {reason}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {'outro' in s && s.outro && (
                  <p className="text-gray-600 leading-relaxed mt-4">{s.outro}</p>
                )}

                {'cards' in s && s.cards && (
                  <div className="space-y-4">
                    {s.cards.map(({ title, desc }) => (
                      <div key={title} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                        <p className="font-semibold text-gray-900 text-sm mb-1.5">{title}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {'body' in s && s.body && (
                  <p className="text-gray-600 leading-relaxed">{s.body}</p>
                )}

                {'simpleList' in s && s.simpleList && (
                  <ul className="space-y-2">
                    {s.simpleList.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {'rightsGrid' in s && s.rightsGrid && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {s.rightsGrid.map(([right, desc]) => (
                        <div key={right} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <p className="font-semibold text-gray-900 text-sm mb-1">{right}</p>
                          <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                        </div>
                      ))}
                    </div>
                    {'rightsFooter' in s && s.rightsFooter && (
                      <p className="text-gray-600 leading-relaxed mt-4 text-sm">{s.rightsFooter}</p>
                    )}
                  </>
                )}
              </div>
            ))}

            {/* Contact */}
            <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold text-brand-green mb-3">{t.contactBox.heading}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {t.contactBox.body}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:office@newkey.bg" className="inline-flex items-center gap-2 bg-brand-green text-brand-gold font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-brand-green/90 transition-colors">
                  office@newkey.bg
                </a>
                <a href="tel:0879826292" className="inline-flex items-center gap-2 border-2 border-brand-green text-brand-green font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-brand-green/5 transition-colors">
                  0879 826 292
                </a>
              </div>
            </div>

            {/* Back link */}
            <div className="pt-4 border-t border-gray-100">
              <Link href={localizeHref('/contact', locale)} className="inline-flex items-center gap-2 text-brand-green font-semibold text-sm hover:underline">
                {t.backLink}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
