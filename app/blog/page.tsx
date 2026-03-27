import type { Metadata } from 'next'
import BlogCard from '@/components/BlogCard'
import AnimatedSection from '@/components/AnimatedSection'
import { getBlogPosts } from '@/lib/sanity'
import { blogPosts as staticPosts } from '@/data/blog'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Блог',
  description:
    'Полезна информация, анализи и съвети от пазара на недвижими имоти в София от екипа на New Key Properties.',
}

export default async function BlogPage() {
  const sanityPosts = await getBlogPosts()
  const posts = sanityPosts.length > 0 ? sanityPosts : staticPosts

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-green py-28 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <p className="text-brand-gold/60 uppercase text-xs tracking-widest mb-5 font-medium animate-fade-in">
              Блог
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-up">
              Полезна <span className="text-brand-gold">Информация</span>
            </h1>
            <p
              className="text-white/70 text-xl leading-relaxed animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              Анализи на пазара, съвети за купувачи и продавачи, правни насоки — всичко, което трябва да знаете за
              имотите в София.
            </p>
            <p
              className="text-white/40 text-sm mt-4 animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              {posts.length} статии
            </p>
          </div>
        </div>
      </section>

      {/* ── Blog grid ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post, i) => (
              <AnimatedSection key={post.id} delay={(i % 3) * 0.1}>
                <BlogCard post={post} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-brand-green relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-gold/5 blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <AnimatedSection>
            <h2 className="font-serif text-4xl font-bold text-white mb-4">Имате конкретен въпрос?</h2>
            <p className="text-white/60 text-lg mb-10">
              Свържете се с нас директно — ще Ви дадем честен и компетентен отговор.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0879826292"
                className="inline-flex items-center justify-center gap-3 bg-brand-gold text-brand-green font-bold px-8 py-4 rounded-xl hover:bg-brand-gold-light transition-all text-lg shadow-lg shadow-brand-gold/20 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                0879 826 292
              </a>
              <a
                href="mailto:office@newkey.bg"
                className="inline-flex items-center justify-center border-2 border-brand-gold/50 text-brand-gold font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/10 hover:border-brand-gold transition-all text-lg"
              >
                office@newkey.bg
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
