'use client'
import { useRouter } from 'next/navigation'

export default function BackToListings() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-brand-gold/70 hover:text-brand-gold transition-colors text-sm group"
    >
      <svg
        className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Обратно към имотите
    </button>
  )
}
