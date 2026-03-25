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
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative h-48 overflow-hidden bg-brand-green/10">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-brand-gold text-brand-green text-xs font-bold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs text-gray-400 mb-2">{dateFormatted}</p>
        <h3 className="font-semibold text-gray-900 text-base mb-2 group-hover:text-brand-green transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-brand-green text-sm font-medium group-hover:text-brand-gold transition-colors">
          Прочети повече
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
