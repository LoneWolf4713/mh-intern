import Image from "next/image"

interface ConditionCardProps {
  title: string
  metric: string
  description: string
  imageSrc: string
  className?: string
}

export function ConditionCard({
  title,
  metric,
  description,
  imageSrc,
  className = "",
}: ConditionCardProps) {
  return (
    <div className={`relative w-[260px] h-[360px] md:w-[280px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl flex-shrink-0 bg-black transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 ${className}`}>
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90 z-10" />
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-8">
        <h3 className="text-white font-medium tracking-wide uppercase text-sm md:text-base">
          {title}
        </h3>
        <div className="flex flex-col gap-y-1">
          <p className="text-white font-bold text-4xl md:text-[3.5rem] leading-none">
            {metric}
          </p>
          <p className="text-white/90 text-sm md:text-base leading-snug max-w-[90%]">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
