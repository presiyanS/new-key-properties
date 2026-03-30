'use client'

/**
 * The hero's right-side composition — fully animated:
 * • Building outline "draws" itself with a clip-path wipe from the bottom
 * • Window rectangles independently flicker like real apartment lights
 * • Floating value cards bob gently up/down
 * • The gold key icon rotates and floats
 * • A soft glowing halo pulses behind the NK monogram
 */

interface HeroBadge {
  title: string
  subtitle: string
}

interface Props {
  badges?: HeroBadge[]
}

const defaultBadges: HeroBadge[] = [
  { title: 'Честност', subtitle: 'Пълна прозрачност' },
  { title: 'Доверие', subtitle: 'Дългосрочни резултати' },
  { title: 'Само София', subtitle: '' },
  { title: 'Резултати', subtitle: 'Без компромиси' },
]

export default function AnimatedSkylineHero({ badges }: Props) {
  const b = badges && badges.length === 4 ? badges : defaultBadges
  return (
    <div
      className="hidden lg:flex items-center justify-center relative"
      style={{ minHeight: 520 }}
    >
      <div className="relative" style={{ width: 420, height: 480 }}>

        {/* ── Dot-grid background ── */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sg" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sg)" />
        </svg>

        {/* ── Main architectural SVG ── */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 420 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Corner accent brackets — always visible, appear instantly */}
          <path d="M 20 20 L 20 60 L 60 60" stroke="#c9a84c" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M 400 20 L 400 60 L 360 60" stroke="#c9a84c" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M 20 460 L 20 420 L 60 420" stroke="#c9a84c" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M 400 460 L 400 420 L 360 420" stroke="#c9a84c" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* ── Building silhouette: clip-path wipe from bottom ── */}
          <g style={{ animation: 'build-rise 1.6s cubic-bezier(0.22,1,0.36,1) 0.15s both' }}>
            {/* outer house polygon */}
            <path
              d="M 60 460 L 60 200 L 210 80 L 360 200 L 360 460 Z"
              stroke="#c9a84c" strokeWidth="1.5" strokeOpacity="0.28"
            />
            {/* roof ridge */}
            <line x1="210" y1="80" x2="210" y2="180" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.2" />
            {/* floor lines */}
            <line x1="60" y1="300" x2="360" y2="300" stroke="#c9a84c" strokeWidth="0.75" strokeOpacity="0.15" />
            <line x1="60" y1="380" x2="360" y2="380" stroke="#c9a84c" strokeWidth="0.75" strokeOpacity="0.15" />
            {/* door arch */}
            <path
              d="M 175 460 L 175 395 Q 210 375 245 395 L 245 460"
              stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.22"
            />
          </g>

          {/* ── Window lights — each flickers independently ── */}
          {/* Top-left window */}
          <rect
            x="110" y="220" width="60" height="55" rx="4"
            stroke="#c9a84c" strokeWidth="1.2"
            style={{ animation: 'window-pulse 5s ease-in-out 0s infinite' }}
          />
          {/* Top-right window */}
          <rect
            x="250" y="220" width="60" height="55" rx="4"
            stroke="#c9a84c" strokeWidth="1.2"
            style={{ animation: 'window-pulse-alt 4.3s ease-in-out 1.2s infinite' }}
          />
          {/* Bottom-left window */}
          <rect
            x="110" y="315" width="60" height="50" rx="4"
            stroke="#c9a84c" strokeWidth="1.2"
            style={{ animation: 'window-pulse 6s ease-in-out 2.5s infinite' }}
          />
          {/* Bottom-right window */}
          <rect
            x="250" y="315" width="60" height="50" rx="4"
            stroke="#c9a84c" strokeWidth="1.2"
            style={{ animation: 'window-pulse-alt 4.8s ease-in-out 0.6s infinite' }}
          />

          {/* Inner window pane cross-hair lines (give a real window feel) */}
          <line x1="140" y1="220" x2="140" y2="275" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity="0.15" />
          <line x1="110" y1="248" x2="170" y2="248" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity="0.15" />
          <line x1="280" y1="220" x2="280" y2="275" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity="0.15" />
          <line x1="250" y1="248" x2="310" y2="248" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity="0.15" />
        </svg>

        {/* ── Central NK Monogram + glowing halo ── */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex flex-col items-center">
            {/* Pulsing glow ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: 220,
                height: 220,
                background: 'radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)',
                animation: 'hero-glow 4s ease-in-out infinite',
              }}
            />
            <div className="absolute w-48 h-48 rounded-full bg-brand-gold/5 blur-2xl" />
            <span
              className="font-serif font-bold text-brand-gold select-none"
              style={{
                fontSize: '9rem',
                lineHeight: 1,
                opacity: 0.18,
                letterSpacing: '-0.05em',
              }}
            >
              NK
            </span>
            <p className="text-brand-gold/50 text-xs uppercase tracking-[0.35em] mt-2 font-medium">
              New Key Properties
            </p>
          </div>
        </div>

        {/* ── Gold key icon — floats and gently rotates ── */}
        <div
          style={{
            position: 'absolute',
            top: -20,
            left: '50%',
            width: 48,
            height: 48,
            animation: 'key-float 5s ease-in-out infinite',
          }}
          className="bg-brand-gold rounded-xl shadow-lg shadow-brand-gold/30 flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-brand-green" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.65 10A5.99 5.99 0 007 6c-3.31 0-6 2.69-6 6s2.69 6 6 6a5.99 5.99 0 005.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
          </svg>
        </div>

        {/* ── Floating value cards ── */}

        {/* Badge 0 — top-left, bobs up */}
        <div
          className="absolute top-16 -left-8 bg-brand-green-light/80 border border-brand-gold/30 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl"
          style={{ animation: 'float-up-down 6s ease-in-out infinite' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-gold rounded-full" />
            <span className="text-brand-gold font-semibold text-sm tracking-wide">{b[0].title}</span>
          </div>
          {b[0].subtitle && <p className="text-white/40 text-xs mt-0.5 pl-4">{b[0].subtitle}</p>}
        </div>

        {/* Badge 1 — top-right, bobs down */}
        <div
          className="absolute top-28 -right-10 bg-brand-green-light/80 border border-brand-gold/30 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl"
          style={{ animation: 'float-down-up 7s ease-in-out 1s infinite' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-gold rounded-full" />
            <span className="text-brand-gold font-semibold text-sm tracking-wide">{b[1].title}</span>
          </div>
          {b[1].subtitle && <p className="text-white/40 text-xs mt-0.5 pl-4">{b[1].subtitle}</p>}
        </div>

        {/* Badge 2 — bottom-left, bobs up slowly */}
        <div
          className="absolute bottom-24 -left-6 bg-brand-gold/10 border border-brand-gold/25 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl"
          style={{ animation: 'float-up-down 8s ease-in-out 2s infinite' }}
        >
          <p className="text-brand-gold font-bold text-lg leading-none">{b[2].title}</p>
          {b[2].subtitle && <p className="text-white/40 text-xs mt-0.5">{b[2].subtitle}</p>}
        </div>

        {/* Badge 3 — bottom-right, bobs down */}
        <div
          className="absolute bottom-16 -right-8 bg-brand-green-light/80 border border-brand-gold/30 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl"
          style={{ animation: 'float-down-up 5.5s ease-in-out 0.5s infinite' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
            <span className="text-brand-gold font-semibold text-sm tracking-wide">{b[3].title}</span>
          </div>
          {b[3].subtitle && <p className="text-white/40 text-xs mt-0.5 pl-4">{b[3].subtitle}</p>}
        </div>

      </div>
    </div>
  )
}
