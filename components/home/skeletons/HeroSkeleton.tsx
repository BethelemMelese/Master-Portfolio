const HeroSkeleton = () => {
  return (
    <div className="max-w-2xl animate-pulse">
      {/* Availability Tag Skeleton */}
      <div className="mb-6">
        <div className="w-32 h-6 bg-white/5 rounded-full" />
      </div>

      {/* Heading Skeleton */}
      <div className="mb-8">
        <div className="h-16 md:h-20 lg:h-24 bg-white/5 rounded-lg mb-2" />
        <div className="h-16 md:h-20 lg:h-24 bg-white/5 rounded-lg mb-2 w-3/4" />
      </div>

      {/* Description Skeleton */}
      <div className="mb-12 space-y-2">
        <div className="h-4 bg-white/5 rounded w-full" />
        <div className="h-4 bg-white/5 rounded w-full" />
        <div className="h-4 bg-white/5 rounded w-5/6" />
      </div>

      {/* CTA Buttons Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="h-14 w-40 bg-white/5 rounded-lg" />
        <div className="h-14 w-40 bg-white/5 rounded-lg" />
      </div>
    </div>
  )
}

export default HeroSkeleton

