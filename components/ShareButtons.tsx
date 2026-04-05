'use client'

import { useState } from 'react'

export default function ShareButtons({ id, title }: { id: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const url = `https://www.newkey.bg/listings/${id}`
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(`${title} — New Key Properties\n${url}`)

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex items-center gap-2 pt-6 border-t border-gray-100 mt-8">
      <span className="text-sm text-gray-400 mr-1">Сподели:</span>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors text-sm font-medium"
        aria-label="Сподели във Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        Facebook
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors text-sm font-medium"
        aria-label="Сподели в WhatsApp"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        WhatsApp
      </a>

      {/* Viber */}
      <a
        href={`viber://forward?text=${encodedText}`}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#7360F2]/10 text-[#7360F2] hover:bg-[#7360F2]/20 transition-colors text-sm font-medium"
        aria-label="Сподели в Viber"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.398.002C8.162-.1 1.895 1.01.485 7.25c-.535 2.28-.59 5.255.078 7.976C1.8 20.733 7.263 21.6 8 21.681V24l2.158-2.158s5.838.47 9.218-3.835c3.41-4.34 2.894-10.786 2.894-10.786S21.742.483 11.398.002zm4.44 16.073c-.325.85-1.81 1.73-2.522 1.822-.633.082-1.434.115-2.315-.145-.534-.161-1.22-.38-2.09-.747-3.676-1.586-6.076-5.278-6.262-5.528-.185-.25-1.51-2.007-1.51-3.829 0-1.82.954-2.706 1.293-3.07.34-.362.74-.452 1.01-.452s.532.005.764.015c.245.01.573-.093.9.684.34.808 1.152 2.814 1.253 3.018.1.203.168.44.033.703-.135.264-.202.427-.403.657-.2.23-.42.514-.6.69-.2.195-.408.407-.175.797.234.39 1.038 1.712 2.228 2.774 1.532 1.366 2.82 1.787 3.215 1.99.394.2.624.167.854-.1.23-.267.985-1.148 1.247-1.54.263-.394.525-.328.885-.197.36.13 2.29 1.08 2.683 1.277.393.197.655.296.75.46.097.163.097.942-.228 1.79v.03zm-3.247-9.37h-.615a.52.52 0 000 1.04h.608c.627.024 1.118.238 1.48.656.352.406.532.958.533 1.636a.52.52 0 001.04 0c-.002-.957-.274-1.754-.804-2.358-.527-.603-1.284-.943-2.242-.974zm-.64-2.025a.52.52 0 000 1.04c1.253.047 2.233.44 2.913 1.168.671.72 1.027 1.726 1.027 2.93a.52.52 0 001.04 0c0-1.447-.43-2.698-1.27-3.607-.845-.912-2.046-1.44-3.71-1.531zm.078-2.03a.52.52 0 000 1.04c1.843.058 3.314.63 4.37 1.698 1.052 1.063 1.608 2.543 1.607 4.346a.52.52 0 001.04 0c.002-2.04-.644-3.77-1.885-5.025-1.24-1.255-2.97-1.985-5.132-2.059z" />
        </svg>
        Viber
      </a>

      {/* Copy link */}
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-sm font-medium"
        aria-label="Копирай връзката"
      >
        {copied ? (
          <>
            <svg className="w-4 h-4 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Копирано!
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Копирай
          </>
        )}
      </button>
    </div>
  )
}
