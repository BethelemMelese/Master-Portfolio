const StatisticsSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 md:mt-16 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="text-center">
          <div className="h-12 sm:h-16 md:h-20 bg-white/5 rounded-lg mb-2" />
          <div className="h-4 w-20 bg-white/5 rounded mx-auto" />
        </div>
      ))}
    </div>
  )
}

export default StatisticsSkeleton

