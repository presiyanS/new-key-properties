export default function ListingsLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <section className="bg-brand-green py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="h-3 w-16 bg-brand-gold/20 rounded" />
          <div className="h-12 w-80 bg-white/10 rounded" />
          <div className="h-5 w-96 bg-white/10 rounded" />
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="h-60 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="h-6 w-1/3 bg-gray-200 rounded" />
                  <div className="flex gap-4">
                    <div className="h-3 w-16 bg-gray-200 rounded" />
                    <div className="h-3 w-12 bg-gray-200 rounded" />
                  </div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
