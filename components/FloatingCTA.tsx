export default function FloatingCTA({ phone }: { phone: string }) {
  return (
    <a
      href={`tel:${phone}`}
      className="fixed bottom-6 right-5 z-40 md:hidden flex items-center justify-center w-14 h-14 bg-brand-gold rounded-full shadow-2xl shadow-brand-gold/50 hover:bg-brand-gold-light transition-all active:scale-95"
      aria-label="Обадете се"
    >
      <span className="absolute inset-0 rounded-full bg-brand-gold animate-ping opacity-30" />
      <svg
        className="w-6 h-6 text-brand-green relative z-10"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    </a>
  )
}
