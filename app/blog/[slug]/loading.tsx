export default function BlogPostLoading() {
  return (
    <div className="animate-pulse">
      <section className="bg-brand-green py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="h-3 w-24 bg-brand-gold/20 rounded" />
          <div className="h-10 w-3/4 bg-white/10 rounded" />
          <div className="h-4 w-48 bg-white/10 rounded" />
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="h-72 bg-gray-200 rounded-2xl" />
          <div className="space-y-3 mt-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`h-4 bg-gray-200 rounded ${i % 4 === 3 ? 'w-2/3' : 'w-full'}`} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
