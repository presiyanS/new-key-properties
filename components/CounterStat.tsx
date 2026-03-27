'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  value: string
  label: string
}

/** Parse a value string like "100%", "≤10", "0" into parts we can animate */
function parse(value: string): { prefix: string; num: number | null; suffix: string } {
  // Match optional non-digit prefix, digits, optional non-digit suffix
  const m = value.match(/^([^0-9]*)(\d+)([^0-9]*)$/)
  if (!m) return { prefix: '', num: null, suffix: '' }
  return { prefix: m[1], num: parseInt(m[2], 10), suffix: m[3] }
}

function AnimatedNumber({ target, prefix, suffix }: { target: number; prefix: string; suffix: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!isInView) return
    const duration = 1400
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * target))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, target])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  )
}

export default function CounterStat({ value, label }: Props) {
  const { prefix, num, suffix } = parse(value)

  return (
    <div className="group text-center">
      <p className="font-serif text-brand-green font-bold text-3xl lg:text-4xl group-hover:scale-105 transition-transform">
        {num !== null ? (
          <AnimatedNumber target={num} prefix={prefix} suffix={suffix} />
        ) : (
          value
        )}
      </p>
      <p className="text-brand-green/60 text-sm font-medium mt-1">{label}</p>
    </div>
  )
}
