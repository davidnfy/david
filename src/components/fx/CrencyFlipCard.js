import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { ArrowUpRight } from "lucide-react"

/**
 * Crency Agency-style Interactive Dual-State 3D Flip Card.
 * Uses perspective-1000, 3D tilt tracking on mousemove, and a synchronized
 * audio-haptic 180deg flip between an iconic front face and technical details.
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
  soundSrc = "/sound/dragon-studio-quick-swipe-405450.mp3",
  className = ""
}) {
  const cardRef = useRef(null)
  const audioRef = useRef(null)
  const isFlippingRef = useRef(false)
  const [isFlipped, setIsFlipped] = useState(false)

  // Preload audio for instantaneous playback on user interaction
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio(soundSrc)
      audio.preload = "auto"
      audio.volume = 0.6
      audioRef.current = audio
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [soundSrc])

  const playSwipeSound = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(soundSrc)
        audioRef.current.volume = 0.6
      }
      audioRef.current.currentTime = 0
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay / browser policy fallback
        })
      }
    } catch {
      // Audio playback failsafe
    }
  }

  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlippingRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Subtle 3D tilt tracking
    gsap.to(cardRef.current, {
      rotateY: (x / rect.width) * 16 + (isFlipped ? 180 : 0),
      rotateX: -(y / rect.height) * 16,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current || isFlippingRef.current) return
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: isFlipped ? 180 : 0,
      duration: 0.45,
      ease: "power2.out"
    })
  }

  const toggleFlip = () => {
    playSwipeSound()
    const nextFlipped = !isFlipped
    setIsFlipped(nextFlipped)
    if (!cardRef.current) return

    isFlippingRef.current = true
    gsap.killTweensOf(cardRef.current)

    // Snappy flip animation specifically timed to match the 0.5s quick-swipe audio envelope
    gsap.to(cardRef.current, {
      rotateY: nextFlipped ? 180 : 0,
      rotateX: 0,
      duration: 0.52,
      ease: "power2.inOut",
      onComplete: () => {
        isFlippingRef.current = false
      }
    })
  }

  return (
    <div
      className={`relative w-full min-h-[240px] h-60 sm:h-64 cursor-pointer perspective-1000 select-none group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={toggleFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          toggleFlip()
        }
      }}
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
          className="absolute inset-0 backface-hidden rounded-2xl p-5 sm:p-6 flex flex-col justify-between border-2 border-[#1F1F1F] bg-[#FFFFFF] shadow-[5px_5px_0_0_#1F1F1F] group-hover:shadow-[7px_7px_0_0_#29ABE2] transition-all overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border border-[#1F1F1F] bg-[#1F1F1F] text-[#FFFFFF]">
              {frontBadge}
            </span>
            <span className="text-xs font-mono font-bold text-[#29ABE2] tracking-wider">
              {frontTag}
            </span>
          </div>

          <div className="my-auto py-2">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-black tracking-tight text-[#1F1F1F] uppercase leading-snug break-words">
              {frontTitle}
            </h3>
            {frontDescription && (
              <p className="text-xs text-[#1F1F1F]/75 font-normal leading-relaxed mt-2">
                {frontDescription}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-[#0054A6]/60 text-[10px] font-black tracking-wider uppercase text-[#29ABE2]">
            <span>CLICK TO FLIP</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* BACK FACE (180deg) */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl p-5 sm:p-6 flex flex-col justify-between border-2 border-[#29ABE2] bg-[#1F1F1F] text-[#FFFFFF] shadow-[5px_5px_0_0_#29ABE2] overflow-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border border-[#29ABE2] bg-[#29ABE2] text-[#FFFFFF]">
              {backBadge}
            </span>
            <span className="text-xs font-mono text-[#0054A6] tracking-wider">{backTag}</span>
          </div>

          <div className="space-y-1.5 my-auto py-2">
            {backTitle && (
              <h4 className="text-sm sm:text-base font-display font-black tracking-tight text-[#29ABE2] uppercase">
                {backTitle}
              </h4>
            )}
            {backDescription && (
              <p className="text-xs sm:text-[13px] text-[#FFFFFF]/90 font-sans leading-relaxed font-normal">
                {backDescription}
              </p>
            )}
            {backItems && backItems.length > 0 && (
              <ul className="space-y-1 text-xs text-[#FFFFFF]/80 font-medium">
                {backItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#29ABE2]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-[#0054A6]/30 text-[10px] font-black tracking-wider uppercase text-[#0054A6]">
            <span>TAP TO RETURN</span>
            <span className="text-[#29ABE2]">✦ 3D FLIP</span>
          </div>
        </div>
      </div>
    </div>
  )
}
