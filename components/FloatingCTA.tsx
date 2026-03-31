export default function FloatingCTA({ phone }: { phone: string }) {
  const viberNumber = phone.startsWith('0') ? '+359' + phone.slice(1) : phone

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-center gap-3">
      {/* Viber */}
      <a
        href={`viber://chat?number=${viberNumber}`}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-2xl hover:scale-105 transition-all active:scale-95"
        style={{ backgroundColor: '#7360F2', boxShadow: '0 8px 24px rgba(115,96,242,0.45)' }}
        aria-label="Пишете ни в Viber"
      >
        <svg className="w-7 h-7" viewBox="0 0 32 32" fill="white">
          <path d="M25.5 6.2C23.2 4.1 19.8 3 16 3 8.3 3 2 8.8 2 16c0 2.3.6 4.5 1.8 6.5L2 30l7.8-2c1.8 1 3.9 1.5 6.2 1.5 7.7 0 14-5.8 14-13 0-3.5-1.3-6.8-4.5-9.8zM16 27.5c-2 0-4-.5-5.7-1.5l-.4-.2-4.6 1.2 1.2-4.5-.3-.4C5.2 20.4 4.5 18.2 4.5 16 4.5 10.2 9.7 5.5 16 5.5c3 0 5.8 1.1 7.9 3 2.1 2 3.1 4.5 3.1 7.5 0 5.8-5.2 10.5-11.5 10.5zm6.3-7.8c-.3-.2-2-.9-2.3-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .2.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.9-1.3.3-.6.3-1.1.2-1.2-.1-.1-.3-.2-.6-.3z"/>
        </svg>
      </a>

      {/* Phone (mobile only) */}
      <a
        href={`tel:${phone}`}
        className="md:hidden flex items-center justify-center w-14 h-14 bg-brand-gold rounded-full shadow-2xl shadow-brand-gold/50 hover:bg-brand-gold-light transition-all active:scale-95"
        aria-label="Обадете се"
      >
        <span className="absolute inset-0 rounded-full bg-brand-gold animate-ping opacity-30" />
        <svg className="w-6 h-6 text-brand-green relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      </a>
    </div>
  )
}
