'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n/config'
import { sendToMakeWebhook } from '@/lib/makeWebhook'

const textBg = {
  nameLabel: 'Вашето име *',
  namePlaceholder: 'Иван Иванов',
  phoneLabel: 'Телефон *',
  phonePlaceholder: '0888 123 456',
  emailLabel: 'Имейл',
  emailPlaceholder: 'ivan@example.com',
  purposeLabel: 'Какво искате да направите? *',
  purposeSell: 'Продавам',
  purposeRent: 'Отдавам под наем',
  propertyTypeLabel: 'Тип имот',
  propertyTypePlaceholder: 'Изберете...',
  propertyTypes: { apartment: 'Апартамент', house: 'Къща', garage: 'Гараж', office: 'Офис', store: 'Магазин' },
  neighborhoodLabel: 'Квартал *',
  neighborhoodPlaceholder: 'напр. Лозенец',
  areaLabel: 'Площ (кв.м)',
  areaPlaceholder: '85',
  roomsLabel: 'Брой стаи',
  roomsPlaceholder: '3',
  floorLabel: 'Етаж',
  floorPlaceholder: '4',
  conditionLabel: 'Състояние',
  conditionPlaceholder: 'Изберете...',
  conditions: { new: 'Ново строителство', renovated: 'Реновиран', good: 'Добро състояние', 'needs-renovation': 'За основен ремонт' },
  messageLabel: 'Допълнителна информация',
  messagePlaceholder: 'Разкажете ни повече за имота (по желание)...',
  submitText: 'Изпратете заявка',
  loadingText: 'Изпращане...',
  successTitle: 'Благодарим Ви!',
  successMessage: 'Получихме заявката Ви за оценка. Ще се свържем с Вас в рамките на 24 часа с честна и точна пазарна оценка.',
  errorMessage: 'Възникна грешка. Моля, опитайте отново или се обадете директно.',
  footerNote: 'Оценката е напълно безплатна и без ангажимент.',
  consentPrefix: 'Съгласен/а съм данните ми (име, телефон, имейл) да бъдат обработени от New Key Properties единствено с цел изготвяне на оценка. Прочетете нашата',
  consentLink: 'Политика за поверителност',
}

const textEn: typeof textBg = {
  nameLabel: 'Your Name *',
  namePlaceholder: 'John Smith',
  phoneLabel: 'Phone *',
  phonePlaceholder: '0888 123 456',
  emailLabel: 'Email',
  emailPlaceholder: 'john@example.com',
  purposeLabel: 'What would you like to do? *',
  purposeSell: 'Sell',
  purposeRent: 'Rent Out',
  propertyTypeLabel: 'Property Type',
  propertyTypePlaceholder: 'Select...',
  propertyTypes: { apartment: 'Apartment', house: 'House', garage: 'Garage', office: 'Office', store: 'Store' },
  neighborhoodLabel: 'Neighborhood *',
  neighborhoodPlaceholder: 'e.g. Lozenets',
  areaLabel: 'Area (sq.m)',
  areaPlaceholder: '85',
  roomsLabel: 'Number of Rooms',
  roomsPlaceholder: '3',
  floorLabel: 'Floor',
  floorPlaceholder: '4',
  conditionLabel: 'Condition',
  conditionPlaceholder: 'Select...',
  conditions: { new: 'New Construction', renovated: 'Renovated', good: 'Good Condition', 'needs-renovation': 'Needs Renovation' },
  messageLabel: 'Additional Information',
  messagePlaceholder: 'Tell us more about the property (optional)...',
  submitText: 'Request Valuation',
  loadingText: 'Sending...',
  successTitle: 'Thank You!',
  successMessage: "We've received your valuation request. We'll get back to you within 24 hours with a fair, accurate market estimate.",
  errorMessage: 'Something went wrong. Please try again or call us directly.',
  footerNote: 'The valuation is completely free, with no obligation.',
  consentPrefix: 'I agree that my data (name, phone, email) will be processed by New Key Properties solely to prepare a valuation. Read our',
  consentLink: 'Privacy Policy',
}

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors text-sm'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'

export default function ValuationForm({ locale = 'bg' }: { locale?: Locale }) {
  const t = locale === 'en' ? textEn : textBg
  const privacyHref = locale === 'en' ? '/en/privacy-policy' : '/privacy-policy'

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: 'sell' as 'sell' | 'rent',
    propertyType: '',
    neighborhood: '',
    area: '',
    rooms: '',
    floor: '',
    condition: '',
    message: '',
  })
  const [website, setWebsite] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm({ ...form, [key]: value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (website) return // honeypot caught a bot — silently drop

    setLoading(true)
    setError('')

    sendToMakeWebhook('Website Valuation Form', form)

    const res = await fetch('/api/valuation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setLoading(false)

    if (res.ok) {
      setSubmitted(true)
    } else {
      setError(t.errorMessage)
    }
  }

  if (submitted) {
    return (
      <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-10 text-center">
        <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-brand-green mb-2">{t.successTitle}</h3>
        <p className="text-gray-600">{t.successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: 'none' }}
      />
      {/* Purpose toggle */}
      <div>
        <label className={labelClass}>{t.purposeLabel}</label>
        <div className="grid grid-cols-2 gap-3">
          {(['sell', 'rent'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => set('purpose', p)}
              className={`py-3 rounded-lg border text-sm font-semibold transition-colors ${
                form.purpose === p
                  ? 'bg-brand-green text-brand-gold border-brand-green'
                  : 'border-gray-200 text-gray-600 hover:border-brand-green/40'
              }`}
            >
              {p === 'sell' ? t.purposeSell : t.purposeRent}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{t.nameLabel}</label>
          <input
            type="text"
            required
            autoComplete="new-password"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder={t.namePlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t.phoneLabel}</label>
          <input
            type="tel"
            required
            autoComplete="new-password"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder={t.phonePlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t.emailLabel}</label>
        <input
          type="email"
          autoComplete="new-password"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          placeholder={t.emailPlaceholder}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{t.neighborhoodLabel}</label>
          <input
            type="text"
            required
            value={form.neighborhood}
            onChange={(e) => set('neighborhood', e.target.value)}
            placeholder={t.neighborhoodPlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t.propertyTypeLabel}</label>
          <select
            value={form.propertyType}
            onChange={(e) => set('propertyType', e.target.value)}
            className={inputClass}
          >
            <option value="">{t.propertyTypePlaceholder}</option>
            {Object.entries(t.propertyTypes).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className={labelClass}>{t.areaLabel}</label>
          <input
            type="number"
            min="0"
            value={form.area}
            onChange={(e) => set('area', e.target.value)}
            placeholder={t.areaPlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t.roomsLabel}</label>
          <input
            type="text"
            value={form.rooms}
            onChange={(e) => set('rooms', e.target.value)}
            placeholder={t.roomsPlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t.floorLabel}</label>
          <input
            type="text"
            value={form.floor}
            onChange={(e) => set('floor', e.target.value)}
            placeholder={t.floorPlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t.conditionLabel}</label>
        <select
          value={form.condition}
          onChange={(e) => set('condition', e.target.value)}
          className={inputClass}
        >
          <option value="">{t.conditionPlaceholder}</option>
          {Object.entries(t.conditions).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>{t.messageLabel}</label>
        <textarea
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder={t.messagePlaceholder}
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* GDPR consent */}
      <div className="flex items-start gap-3">
        <input
          id="valuation-gdpr-consent"
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-brand-green shrink-0 cursor-pointer"
        />
        <label htmlFor="valuation-gdpr-consent" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
          {t.consentPrefix}{' '}
          <a href={privacyHref} target="_blank" rel="noopener noreferrer" className="text-brand-green font-medium hover:underline">
            {t.consentLink}
          </a>
          .
        </label>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading || !consent}
        className="w-full bg-brand-green text-brand-gold font-bold py-4 rounded-lg hover:bg-brand-green-light transition-colors text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? t.loadingText : t.submitText}
      </button>
      <p className="text-xs text-gray-400 text-center">{t.footerNote}</p>
    </form>
  )
}
