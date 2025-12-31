const ExperienceSkeleton = () => {
  return (
    <section className="pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-12 md:mb-16 animate-pulse">
          <div className="h-12 md:h-16 bg-white/5 rounded-lg mb-4 w-3/4" />
          <div className="h-6 bg-white/5 rounded w-full max-w-2xl" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Timeline Skeleton */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-24">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/5" />
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="relative mb-12 last:mb-0">
                    <div className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 bg-white/5 rounded-full" />
                    <div className="h-4 w-24 bg-white/5 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Cards Skeleton */}
          <div className="lg:col-span-2 space-y-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-card rounded-lg border border-white/10 p-6 md:p-8 animate-pulse"
              >
                {/* Icon Skeleton */}
                <div className="absolute top-6 right-6 w-5 h-5 bg-white/5 rounded" />

                {/* Title and Company Skeleton */}
                <div className="mb-4">
                  <div className="h-7 bg-white/5 rounded mb-2 w-2/3" />
                  <div className="h-5 bg-white/5 rounded w-1/2" />
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-white/5 rounded w-full" />
                  <div className="h-4 bg-white/5 rounded w-full" />
                  <div className="h-4 bg-white/5 rounded w-5/6" />
                </div>

                {/* Skills Tags Skeleton */}
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="h-6 w-20 bg-white/5 rounded-md"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Focus Areas Skeleton */}
        <div className="mt-20 md:mt-24 animate-pulse">
          <div className="h-10 bg-white/5 rounded-lg mb-8 w-1/3" />
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="bg-card rounded-lg border border-white/10 overflow-hidden"
              >
                <div className="w-full h-32 bg-white/5" />
                <div className="p-6">
                  <div className="h-6 bg-white/5 rounded mb-3 w-2/3" />
                  <div className="h-4 bg-white/5 rounded w-full mb-2" />
                  <div className="h-4 bg-white/5 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSkeleton

