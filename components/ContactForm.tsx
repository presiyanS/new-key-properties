'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-10 text-center">
        <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-brand-green mb-2">Благодарим ви!</h3>
        <p className="text-gray-600">Получихме вашето запитване. Ще се свържем с вас в рамките на 24 часа.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Вашето Име *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Иван Иванов"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Телефон *</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="0888 123 456"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Имейл</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="ivan@example.com"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Съобщение *</label>
        <textarea
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Търсите ли имот за покупка или наем? Разкажете ни повече..."
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors text-sm resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-brand-green text-brand-gold font-bold py-4 rounded-lg hover:bg-brand-green-light transition-colors text-base"
      >
        Изпратете Запитване
      </button>
      <p className="text-xs text-gray-400 text-center">
        Отговаряме в рамките на 24 часа. Местата са ограничени – свържете се с нас сега.
      </p>
    </form>
  )
}
