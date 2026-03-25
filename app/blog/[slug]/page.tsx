import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { blogPosts } from '@/data/blog'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const dateFormatted = new Date(post.date).toLocaleDateString('bg-BG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3)

  return (
    <>
      {/* Header */}
      <section className="bg-brand-green py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-brand-gold/70 hover:text-brand-gold transition-colors text-sm mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Обратно към блога
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className="bg-brand-gold text-brand-green text-xs font-bold px-3 py-1.5 rounded-full">{post.category}</span>
            <span className="text-brand-gold/50 text-sm">{dateFormatted}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">{post.title}</h1>
        </div>
      </section>

      {/* Article */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-12 bg-brand-green/10">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>

          <p className="text-gray-500 text-xl leading-relaxed mb-10 border-l-4 border-brand-gold pl-6 italic">
            {post.excerpt}
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {post.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('**') && paragraph.includes('**')) {
                const parts = paragraph.split(/\*\*(.*?)\*\*/)
                return (
                  <p key={i} className="mb-4">
                    {parts.map((part, j) =>
                      j % 2 === 1 ? <strong key={j} className="text-brand-green">{part}</strong> : part
                    )}
                  </p>
                )
              }
              return <p key={i} className="mb-4">{paragraph}</p>
            })}
          </div>

          {/* Author note */}
          <div className="mt-14 p-6 bg-brand-green/5 border border-brand-green/20 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center shrink-0">
                <Image src="/logo.png" alt="New Key Properties" width={32} height={32} className="w-8 h-8 object-contain" />
              </div>
              <div>
                <p className="font-bold text-brand-green mb-1">New Key Properties</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Имате въпроси по темата? Свържете се с нас за безплатна консултация.{' '}
                  <a href="tel:0879826292" className="text-brand-green font-medium hover:text-brand-gold transition-colors">
                    0879 826 292
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-brand-green mb-10">Още статии</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => {
                const d = new Date(p.date).toLocaleDateString('bg-BG', { year: 'numeric', month: 'long', day: 'numeric' })
                return (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                    <div className="relative h-40 overflow-hidden bg-brand-green/10">
                      <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-gray-400 mb-2">{d}</p>
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-brand-green transition-colors line-clamp-2">{p.title}</h3>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
