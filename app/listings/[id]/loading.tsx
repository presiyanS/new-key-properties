export default function ListingLoading() {
  return (
    <div className="animate-pulse">
      {/* Back bar */}
      <div className="bg-brand-green py-5 border-b border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-40 bg-brand-gold/20 rounded" />
        </div>
      </div>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left */}
            <div className="lg:col-span-2 space-y-6">
              <div className="h-80 sm:h-[420px] rounded-2xl bg-gray-200" />
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
                <div className="h-8 w-3/4 bg-gray-200 rounded" />
                <div className="h-6 w-1/3 bg-gray-200 rounded" />
                <div className="grid grid-cols-5 gap-4 p-5 bg-gray-50 rounded-2xl">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="space-y-2 text-center">
                      <div className="h-5 w-5 bg-gray-200 rounded mx-auto" />
                      <div className="h-3 w-12 bg-gray-200 rounded mx-auto" />
                      <div className="h-4 w-10 bg-gray-200 rounded mx-auto" />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                  <div className="h-4 w-4/6 bg-gray-200 rounded" />
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div>
              <div className="bg-white rounded-2xl p-7 shadow-xl border border-gray-100 space-y-4">
                <div className="h-1 bg-gray-200 rounded-full" />
                <div className="h-6 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-14 bg-gray-200 rounded-xl" />
                <div className="h-12 bg-gray-200 rounded-xl" />
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="h-10 bg-gray-200 rounded-lg" />
                  <div className="h-10 bg-gray-200 rounded-lg" />
                  <div className="h-24 bg-gray-200 rounded-lg" />
                  <div className="h-12 bg-gray-200 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
