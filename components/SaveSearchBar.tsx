'use client'

import { useState } from 'react'

type Props = {
  type: string
  neighborhood: string
  rooms: string
  priceMin: string
  priceMax: string
}

export default function SaveSearchBar({ type, neighborhood, rooms, priceMin, priceMax }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [open, setOpen] = useState(false)

  const activeCriteria = [
    type !== 'all' && type ? (type === 'sale' ? 'Продажба' : 'Наем') : null,
    neighborhood || null,
    rooms ? `${rooms} стаи` : null,
    priceMin ? `от €${Number(priceMin).toLocaleString('bg-BG')}` : null,
    priceMax ? `до €${Number(priceMax).toLocaleString('bg-BG')}` : null,
  ].filter(Boolean) as string[]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/save-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        type: type === 'all' ? 'any' : type || 'any',
        neighborhood: neighborhood || '',
        rooms: rooms ? Number(rooms) : null,
        priceMin: priceMin ? Number(priceMin) : null,
        priceMax: priceMax ? Number(priceMax) : null,
      }),
    })

    const data = await res.json()
    if (res.ok && data.success) {
      setStatus('success')
      setEmail('')
    } else {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 bg-brand-green/8 border border-brand-green/20 rounded-2xl px-5 py-3.5 mb-5">
        <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-brand-green text-sm font-medium">
          Записано! Ще получите имейл при нов подходящ имот.
        </p>
      </div>
    )
  }

  return (
    <div className="mb-5">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-brand-green transition-colors group"
        >
          <div className="w-7 h-7 rounded-full border border-gray-200 group-hover:border-brand-green/40 group-hover:bg-brand-green/5 flex items-center justify-center transition-all">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          Получавайте известия при нов подходящ имот
        </button>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Известие при нов имот</h3>
              {activeCriteria.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activeCriteria.map((c) => (
                    <span key={c} className="text-xs bg-brand-green/8 text-brand-green border border-brand-green/15 px-2.5 py-1 rounded-full">
                      {c}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 mt-1">За всички имоти</p>
              )}
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors ml-4 shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Вашият имейл адрес"
              required
              className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 transition-all"
            />
            <button
              type="submit"
              disabled={status === 'loading' || !email}
              className="bg-brand-green text-brand-gold font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-brand-green/90 transition-colors disabled:opacity-50 shrink-0"
            >
              {status === 'loading' ? '...' : 'Запази'}
            </button>
          </form>

          {status === 'error' && (
            <p className="text-red-500 text-xs mt-2">Грешка. Моля, опитайте отново.</p>
          )}

          <p className="text-xs text-gray-400 mt-2.5">
            Ще получавате имейл само когато добавим нов имот, отговарящ на Вашите критерии.
          </p>
        </div>
      )}
    </div>
  )
}
