import type { Metadata } from 'next'
import BlogCard from '@/components/BlogCard'
import { blogPosts } from '@/data/blog'

export const metadata: Metadata = {
  title: 'Блог',
  description: 'Полезна информация, анализи и съвети от пазара на недвижими имоти в София от екипа на New Key Properties.',
}

const categories = ['Всички', ...Array.from(new Set(blogPosts.map((p) => p.category)))]

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-green py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-brand-gold/60 uppercase text-sm tracking-widest mb-4">Блог</p>
            <h1 className="font-serif text-5xl font-bold text-white mb-6">
              Полезна <span className="text-brand-gold">Информация</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              Анализи на пазара, съвети за купувачи и продавачи, правни насоки — всичко, което трябва да знаете за имотите в София.
            </p>
          </div>
        </div>
      </section>

      {/* Blog grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-green">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-4">
            Имате конкретен въпрос?
          </h2>
          <p className="text-white/60 text-lg mb-10">
            Свържете се с нас директно — ще ви дадем честен и компетентен отговор.
          </p>
          <a
            href="tel:0879826292"
            className="inline-flex items-center gap-3 bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold-light transition-colors text-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            0879 826 292
          </a>
        </div>
      </section>
    </>
  )
}
