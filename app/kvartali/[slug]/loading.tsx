export default function NeighborhoodLoading() {
  return (
    <div className="animate-pulse">
      <section className="relative h-80 lg:h-96 bg-brand-green" />
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`h-4 bg-gray-200 rounded ${i % 4 === 3 ? 'w-2/3' : 'w-full'}`} />
              ))}
            </div>
            <div className="space-y-4">
              <div className="h-40 bg-gray-200 rounded-2xl" />
              <div className="h-40 bg-gray-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
