import { getListings } from '@/lib/sanity'
import ListingsClient from '@/components/ListingsClient'

export const revalidate = 60

export default async function ListingsPage() {
  const listings = await getListings()

  return (
    <>
      <section className="bg-brand-green py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold/60 uppercase text-sm tracking-widest mb-4">Имоти</p>
          <h1 className="font-serif text-5xl font-bold text-white mb-4">
            Намерете Вашия <span className="text-brand-gold">Имот</span>
          </h1>
          <p className="text-white/70 text-xl max-w-xl">
            Всички имоти са внимателно проверени и представени с пълна прозрачност.
          </p>
        </div>
      </section>

      <ListingsClient listings={listings} />
    </>
  )
}
