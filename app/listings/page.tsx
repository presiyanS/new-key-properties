import type { Metadata } from 'next'
import { getListings } from '@/lib/sanity'
import ListingsClient from '@/components/ListingsClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Имоти',
  description:
    'Разгледайте всички имоти за продажба и наем в София от New Key Properties. Внимателно проверени оферти с пълна прозрачност.',
}

export default async function ListingsPage() {
  const listings = await getListings()

  return (
    <>
      <section className="bg-brand-green py-28 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="text-brand-gold/60 uppercase text-xs tracking-widest mb-5 font-medium animate-fade-in">
            Имоти
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-fade-up">
            Намерете Вашия <span className="text-brand-gold">Имот</span>
          </h1>
          <p
            className="text-white/70 text-xl max-w-xl animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Всички имоти са внимателно проверени и представени с пълна прозрачност. Само сериозни оферти.
          </p>
          <div
            className="flex items-center gap-6 mt-8 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <span className="w-2 h-2 bg-brand-gold/60 rounded-full" />
              <span>{listings.filter((l) => l.type === 'sale').length} за продажба</span>
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <span className="w-2 h-2 bg-brand-gold/60 rounded-full" />
              <span>{listings.filter((l) => l.type === 'rent').length} под наем</span>
            </div>
          </div>
        </div>
      </section>

      <ListingsClient listings={listings} />
    </>
  )
}
