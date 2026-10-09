import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "../../lib/motion"

gsap.registerPlugin(ScrollTrigger)

/**
 * RoiHeads-style "element-scale": a headline that enters oversized and
 * settles to its natural size as it scrolls into view.
 */
export default function ScaleInTitle({
  as: Tag = "div",
  children,
  className = "",
  from = 2.4,
  origin = "left center",
  start = "top 100%",
  end = "center 45%"
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: from, opacity: 0.15, transformOrigin: origin },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          force3D: true,
          scrollTrigger: { trigger: el, start, end, scrub: 1 }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <Tag ref={ref} className={`fx-scale-in ${className}`}>
      {children}
    </Tag>
  )
}
