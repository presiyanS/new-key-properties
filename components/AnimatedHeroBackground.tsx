'use client'

/**
 * Animated background for the hero section.
 * Four blurred gradient orbs float at different speeds/directions,
 * creating a living, cinematic depth effect — no images needed.
 */
export default function AnimatedHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Orb 1 — large gold glow, top-right quadrant */}
      <div
        style={{
          position: 'absolute',
          width: 720,
          height: 720,
          top: -260,
          right: -260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.14) 0%, transparent 68%)',
          animation: 'orb-float-1 22s ease-in-out infinite',
        }}
      />

      {/* Orb 2 — medium green-light, bottom-left */}
      <div
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          bottom: -160,
          left: -160,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(42,107,82,0.32) 0%, transparent 70%)',
          animation: 'orb-float-2 18s ease-in-out infinite',
        }}
      />

      {/* Orb 3 — small intense gold, center-ish */}
      <div
        style={{
          position: 'absolute',
          width: 280,
          height: 280,
          top: '38%',
          left: '48%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)',
          animation: 'orb-float-3 28s ease-in-out infinite',
        }}
      />

      {/* Orb 4 — upper-left accent */}
      <div
        style={{
          position: 'absolute',
          width: 380,
          height: 380,
          top: '5%',
          left: '3%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
          animation: 'orb-float-4 32s ease-in-out infinite',
        }}
      />

      {/* Subtle scanline / dot-grid texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#c9a84c" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Bottom vignette to blend into next section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, transparent, rgba(15,46,34,0.4))',
        }}
      />
    </div>
  )
}
