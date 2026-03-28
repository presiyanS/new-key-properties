import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import AnimatedSection from '@/components/AnimatedSection'
import { getContactPage, getSiteSettings } from '@/lib/sanity'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Контакти',
  description: 'Свържете се с New Key Properties. Телефон: 0879 826 292, Имейл: office@newkey.bg',
}

export default async function ContactPage() {
  const [cms, settings] = await Promise.all([getContactPage(), getSiteSettings()])

  const phone = cms?.phone ?? settings?.phone ?? '0879826292'
  const phoneDisplay = settings?.phoneDisplay ?? phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
  const email = cms?.email ?? settings?.email ?? 'office@newkey.bg'

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-green py-28 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <p className="text-brand-gold/60 uppercase text-xs tracking-widest mb-5 font-medium animate-fade-in">
              Контакти
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-up">
              {cms?.heroTitle ?? 'Свържете се'} <br />
              <span className="text-brand-gold">{cms?.heroTitleGold ?? 'с Нас'}</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {cms?.heroSubtitle ?? 'Работим с ограничен брой клиенти на месец. Свържете се с нас сега и запазете своето място.'}
            </p>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: Info */}
            <AnimatedSection direction="left">
              <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">
                {cms?.contactInfoLabel ?? 'Връзка с нас'}
              </span>
              <h2 className="font-serif text-3xl font-bold text-brand-green mt-3 mb-8">
                {cms?.contactInfoTitle ?? 'Информация за контакт'}
              </h2>

              <div className="space-y-5 mb-10">
                {/* Phone */}
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
                >
                  <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-green-light transition-colors">
                    <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide">Телефон</p>
                    <p className="text-gray-900 font-bold text-xl group-hover:text-brand-green transition-colors">{phoneDisplay}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{cms?.phoneHours ?? 'Пон – Пет: 09:00 – 18:00, Сб: 10:00 – 15:00'}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-brand-green ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
                >
                  <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-green-light transition-colors">
                    <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide">Имейл</p>
                    <p className="text-gray-900 font-bold text-xl group-hover:text-brand-green transition-colors">{email}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{cms?.emailNote ?? 'Отговаряме в рамките на 24 часа'}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-brand-green ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Location */}
                <div className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide">Местоположение</p>
                    <p className="text-gray-900 font-bold text-xl">{cms?.address ?? settings?.address ?? 'София, България'}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{cms?.addressNote ?? 'Обслужваме целия град'}</p>
                  </div>
                </div>
              </div>

              {/* Urgency box */}
              <div className="bg-brand-green rounded-2xl p-6 border border-brand-gold/20 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-brand-gold/5 blur-xl" />
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2.5 h-2.5 bg-brand-gold rounded-full animate-pulse" />
                  <p className="text-brand-gold font-semibold text-sm uppercase tracking-wide">
                    {cms?.urgencyTitle ?? 'Ограничени места'}
                  </p>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  {cms?.urgencyMessage ?? `Работим с максимум 10 клиента на месец, за да гарантираме най-високо качество. Свържете се с нас сега — местата за ${new Date().toLocaleDateString('bg-BG', { month: 'long' })} са ограничени.`}
                </p>
              </div>
            </AnimatedSection>

            {/* Right: Form */}
            <AnimatedSection direction="right" delay={0.15}>
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100">
                <span className="text-brand-gold/60 uppercase text-xs tracking-widest font-medium">Директен контакт</span>
                <h2 className="font-serif text-2xl font-bold text-brand-green mt-2 mb-2">
                  {cms?.formTitle ?? 'Изпратете запитване'}
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                  {cms?.formSubtitle ?? 'Попълнете формата и ще се свържем с Вас в рамките на 24 часа.'}
                </p>
                <ContactForm
                  nameLabel={settings?.formNameLabel}
                  namePlaceholder={settings?.formNamePlaceholder}
                  phoneLabel={settings?.formPhoneLabel}
                  phonePlaceholder={settings?.formPhonePlaceholder}
                  emailLabel={settings?.formEmailLabel}
                  emailPlaceholder={settings?.formEmailPlaceholder}
                  messageLabel={settings?.formMessageLabel}
                  messagePlaceholder={settings?.formMessagePlaceholder}
                  submitText={settings?.formSubmitText}
                  loadingText={settings?.formLoadingText}
                  successTitle={settings?.formSuccessTitle}
                  successMessage={settings?.formSuccessMessage}
                  errorMessage={settings?.formErrorMessage}
                  footerNote={settings?.formFooterNote}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
