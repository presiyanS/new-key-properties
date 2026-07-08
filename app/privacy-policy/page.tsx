import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Политика за поверителност — New Key Properties',
  description: 'Политика за поверителност и защита на личните данни на New Key Properties. Научете как обработваме вашите данни в съответствие с GDPR.',
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  const lastUpdated = '08.07.2026'

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-brand-green py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold/60 uppercase text-xs tracking-widest mb-4 font-medium">Правна информация</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
            Политика за поверителност
          </h1>
          <p className="text-white/60 text-sm">Последна актуализация: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12 space-y-10">

            {/* 1. Администратор */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-green mb-4">1. Администратор на личните данни</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Администратор на личните данни, събирани чрез този уебсайт, е:
              </p>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 text-sm text-gray-700 space-y-1.5">
                <p><strong>Търговско наименование:</strong> New Key Properties</p>
                <p><strong>Електронна поща:</strong> office@newkey.bg</p>
                <p><strong>Телефон:</strong> 0879 826 292</p>
                <p><strong>Адрес:</strong> София, България</p>
              </div>
            </div>

            {/* 2. Какви данни събираме */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-green mb-4">2. Какви лични данни събираме</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                При изпращане на запитване чрез контактната форма на нашия уебсайт, събираме следните лични данни:
              </p>
              <ul className="space-y-2">
                {[
                  ['Три имена', 'Необходими за идентификация при отговор'],
                  ['Телефонен номер', 'За да се свържем с Вас относно Вашето запитване'],
                  ['Електронна поща (незадължително)', 'За кореспонденция по имейл при Ваше желание'],
                  ['Съобщение / описание на търсения имот', 'За да разберем Вашите нужди и да Ви предложим подходящи решения'],
                ].map(([field, reason]) => (
                  <li key={field} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                    <span><strong>{field}</strong> — {reason}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Освен горепосочените данни, уебсайтът може автоматично да събира технически данни като IP адрес и тип браузър чрез хостинг доставчика (Vercel), единствено с цел осигуряване на технически функционалности и сигурност.
              </p>
            </div>

            {/* 3. Цел и правно основание */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-green mb-4">3. Цел и правно основание за обработка</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Личните Ви данни се обработват за следните цели:
              </p>
              <div className="space-y-4">
                {[
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
                ].map(({ title, desc }) => (
                  <div key={title} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <p className="font-semibold text-gray-900 text-sm mb-1.5">{title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Срок на съхранение */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-green mb-4">4. Срок на съхранение</h2>
              <p className="text-gray-600 leading-relaxed">
                Личните данни, изпратени чрез контактната форма, се съхраняват само за периода, необходим за обработка на запитването. Ако между нас не бъде сключен договор, данните се заличават не по-късно от <strong>6 месеца</strong> от последния контакт. При сключен договор данните се съхраняват за срока, предвиден от приложимото счетоводно и търговско законодателство.
              </p>
            </div>

            {/* 5. Получатели */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-green mb-4">5. Получатели на личните данни</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Личните Ви данни не се продават, наемат или споделят с трети лица за маркетингови цели. Данните могат да бъдат споделяни единствено с:
              </p>
              <ul className="space-y-2">
                {[
                  'Resend Inc. — доставчик на имейл услуги, използван за препращане на запитвания до нас. Resend е сертифициран по стандартите за защита на данни.',
                  'Vercel Inc. — хостинг доставчик, поддържащ инфраструктурата на уебсайта.',
                  'Компетентни държавни органи — при законово задължение.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 6. Права */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-green mb-4">6. Вашите права</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Съгласно Регламент (ЕС) 2016/679 (GDPR) и Закона за защита на личните данни, имате следните права:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  ['Право на достъп', 'Да получите информация какви данни за Вас обработваме.'],
                  ['Право на коригиране', 'Да поискате коригиране на неточни данни.'],
                  ['Право на изтриване', 'Да поискате заличаване на данните (право „да бъдеш забравен").'],
                  ['Право на ограничаване', 'Да поискате ограничаване на обработката при определени обстоятелства.'],
                  ['Право на преносимост', 'Да получите данните си в структуриран, машинночетим формат.'],
                  ['Право на възражение', 'Да се противопоставите на обработката при основание за легитимен интерес.'],
                ].map(([right, desc]) => (
                  <div key={right} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{right}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mt-4 text-sm">
                За упражняване на правата си, моля свържете се с нас на <a href="mailto:office@newkey.bg" className="text-brand-green font-medium hover:underline">office@newkey.bg</a>. Имате право и да подадете жалба до <strong>Комисия за защита на личните данни (КЗЛД)</strong>, гр. София, бул. „Проф. Цветан Лазаров" № 2, www.cpdp.bg.
              </p>
            </div>

            {/* 7. Бисквитки */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-green mb-4">7. Бисквитки (cookies)</h2>
              <p className="text-gray-600 leading-relaxed">
                Уебсайтът използва минимален набор от технически бисквитки, необходими единствено за функционирането на сайта (напр. автентикация в администраторски раздели). Не използваме рекламни или проследяващи бисквитки от трети страни.
              </p>
            </div>

            {/* 8. Промени */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-green mb-4">8. Промени в политиката</h2>
              <p className="text-gray-600 leading-relaxed">
                Запазваме правото си да актуализираме настоящата политика при промяна в законодателството или в начина ни на работа. Актуалната версия е достъпна на тази страница. Датата на последна актуализация е посочена в началото на документа.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold text-brand-green mb-3">Въпроси относно поверителността?</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Ако имате въпроси относно начина, по който обработваме личните Ви данни, не се колебайте да се свържете с нас:
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
              <Link href="/contact" className="inline-flex items-center gap-2 text-brand-green font-semibold text-sm hover:underline">
                ← Обратно към контактите
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
