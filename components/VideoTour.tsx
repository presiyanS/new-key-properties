'use client'

import { useRef, useState } from 'react'

export default function VideoTour({ src, poster, title }: { src: string; poster?: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-lg ring-1 ring-brand-gold/25">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={playing}
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="w-full h-full object-cover"
      />

      {!playing && (
        <button
          type="button"
          onClick={() => videoRef.current?.play()}
          aria-label={title}
          className="absolute inset-0 flex items-center justify-center bg-linear-to-t from-black/60 via-black/10 to-black/40 group"
        >
          <span className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/95 shadow-xl group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-brand-green translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
