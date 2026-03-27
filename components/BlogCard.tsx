import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/data/blog'

export default function BlogCard({ post }: { post: BlogPost }) {
  const dateFormatted = new Date(post.date).toLocaleDateString('bg-BG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-gray-100/80"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-brand-green/10">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-brand-gold/95 text-brand-green text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs text-gray-400 mb-2.5 font-medium tracking-wide">{dateFormatted}</p>

        <h3 className="font-semibold text-gray-900 text-base mb-2.5 group-hover:text-brand-green transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">{post.excerpt}</p>

        <span className="inline-flex items-center gap-1.5 text-brand-green text-sm font-semibold group-hover:text-brand-gold transition-colors">
          Прочети
          <svg
            className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
