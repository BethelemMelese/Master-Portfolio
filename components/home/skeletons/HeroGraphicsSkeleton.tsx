const HeroGraphicsSkeleton = () => {
  return (
    <div className="relative w-full h-full animate-pulse">
      {/* Centered container for positioning */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
        {/* Background glow */}
        <div className="absolute w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px]" />
        
        {/* Card 1 - Upper Right Skeleton */}
        <div className="absolute top-[12%] right-[6%] w-64 h-80 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-10" />
        
        {/* Card 2 - Lower Left Skeleton (significantly overlaps bottom-left of Card 1) */}
        <div className="absolute top-[42%] left-[2%] w-72 h-48 bg-white/5 border border-white/10 rounded-xl shadow-2xl z-20 -rotate-3" />
      </div>
    </div>
  )
}

export default HeroGraphicsSkeleton

