import { useState, useRef } from "react"
import gsap from "gsap"
import { ArrowUpRight, Sparkles } from "lucide-react"

/**
 * Crency Agency-style Interactive Dual-State 3D Flip Card.
 * Uses perspective-1000, 3D tilt tracking on mousemove, and a smooth 180deg flip
 * between an iconic front face and a detailed technical blueprint on the back.
 */
export default function CrencyFlipCard({
  frontBadge = "STAGE 01",
  frontTag = "[ 01 ]",
  frontTitle = "Plan & Architect",
  frontDescription = "",
  backBadge = "SPECIFICATIONS",
  backTag = "01 // DETAILS",
  backTitle = "",
  backDescription = "",
  backItems = [],
  variant = "plum",
  className = ""
}) {
  const cardRef = useRef(null)
  const [isFlipped, setIsFlipped] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Subtle 3D tilt
    gsap.to(cardRef.current, {
      rotateY: (x / rect.width) * 18 + (isFlipped ? 180 : 0),
      rotateX: -(y / rect.height) * 18,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1000
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: isFlipped ? 180 : 0,
      duration: 0.6,
      ease: "elastic.out(1.1, 0.4)"
    })
  }

  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      rotateY: isFlipped ? 0 : 180,
      rotateX: 0,
      duration: 0.75,
      ease: "power3.inOut"
    })
  }

  return (
    <div
      className={`relative w-full min-h-[240px] h-60 sm:h-64 cursor-pointer perspective-1000 select-none group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={toggleFlip}
      role="button"
      tabIndex={0}
      aria-label={`Flip card for ${frontTitle}`}
    >
      <div
        ref={cardRef}
        className="w-full h-full relative preserve-3d transition-shadow duration-300"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl p-5 sm:p-6 flex flex-col justify-between border-2 border-[#291B48] bg-[#D5CCCD] shadow-[5px_5px_0_0_#291B48] group-hover:shadow-[7px_7px_0_0_#5E87B6] transition-all overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border border-[#291B48] bg-[#291B48] text-[#D5CCCD]">
              {frontBadge}
            </span>
            <span className="text-xs font-mono font-bold text-[#5E87B6] tracking-wider">
              {frontTag}
            </span>
          </div>

          <div className="my-auto py-2">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-black tracking-tight text-[#291B48] uppercase leading-snug break-words">
              {frontTitle}
            </h3>
            {frontDescription && (
              <p className="text-xs text-[#291B48]/75 font-normal leading-relaxed mt-2">
                {frontDescription}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-[#9FB2C8]/60 text-[10px] font-black tracking-wider uppercase text-[#5E87B6]">
            <span>CLICK TO FLIP</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* BACK FACE (180deg) */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl p-5 sm:p-6 flex flex-col justify-between border-2 border-[#5E87B6] bg-[#291B48] text-[#D5CCCD] shadow-[5px_5px_0_0_#5E87B6] overflow-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border border-[#5E87B6] bg-[#5E87B6] text-[#D5CCCD]">
              {backBadge}
            </span>
            <span className="text-xs font-mono text-[#9FB2C8] tracking-wider">{backTag}</span>
          </div>

          <div className="space-y-1.5 my-auto py-2">
            {backTitle && (
              <h4 className="text-sm sm:text-base font-display font-black tracking-tight text-[#5E87B6] uppercase">
                {backTitle}
              </h4>
            )}
            {backDescription && (
              <p className="text-xs sm:text-[13px] text-[#D5CCCD]/90 font-sans leading-relaxed font-normal">
                {backDescription}
              </p>
            )}
            {backItems && backItems.length > 0 && (
              <ul className="space-y-1 text-xs text-[#D5CCCD]/80 font-medium">
                {backItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5E87B6]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-[#9FB2C8]/30 text-[10px] font-black tracking-wider uppercase text-[#9FB2C8]">
            <span>TAP TO RETURN</span>
            <span className="text-[#5E87B6]">✦ 3D FLIP</span>
          </div>
        </div>
      </div>
    </div>
  )
}
