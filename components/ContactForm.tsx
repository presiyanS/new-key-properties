'use client'

import { useState } from 'react'

type Props = {
  nameLabel?: string
  namePlaceholder?: string
  phoneLabel?: string
  phonePlaceholder?: string
  emailLabel?: string
  emailPlaceholder?: string
  messageLabel?: string
  messagePlaceholder?: string
  submitText?: string
  loadingText?: string
  successTitle?: string
  successMessage?: string
  errorMessage?: string
  footerNote?: string
}

export default function ContactForm({
  nameLabel = 'Вашето Име *',
  namePlaceholder = 'Иван Иванов',
  phoneLabel = 'Телефон *',
  phonePlaceholder = '0888 123 456',
  emailLabel = 'Имейл',
  emailPlaceholder = 'ivan@example.com',
  messageLabel = 'Съобщение *',
  messagePlaceholder = 'Търсите ли имот за покупка или наем? Разкажете ни повече...',
  submitText = 'Изпратете Запитване',
  loadingText = 'Изпращане...',
  successTitle = 'Благодарим Ви!',
  successMessage = 'Получихме Вашето запитване. Ще се свържем с Вас в рамките на 24 часа.',
  errorMessage = 'Възникна грешка. Моля, опитайте отново или се обадете директно.',
  footerNote = 'Отговаряме в рамките на 24 часа. Местата са ограничени – свържете се с нас сега.',
}: Props) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setLoading(false)

    if (res.ok) {
      setSubmitted(true)
    } else {
      setError(errorMessage)
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
        <h3 className="text-xl font-bold text-brand-green mb-2">{successTitle}</h3>
        <p className="text-gray-600">{successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{nameLabel}</label>
          <input
            type="text"
            required
            autoComplete="new-password"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={namePlaceholder}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{phoneLabel}</label>
          <input
            type="tel"
            required
            autoComplete="new-password"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder={phonePlaceholder}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{emailLabel}</label>
        <input
          type="email"
          autoComplete="new-password"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder={emailPlaceholder}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{messageLabel}</label>
        <textarea
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={messagePlaceholder}
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors text-sm resize-none"
        />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-green text-brand-gold font-bold py-4 rounded-lg hover:bg-brand-green-light transition-colors text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? loadingText : submitText}
      </button>
      <p className="text-xs text-gray-400 text-center">{footerNote}</p>
    </form>
  )
}
