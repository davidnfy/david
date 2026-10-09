import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "../../lib/motion"

gsap.registerPlugin(ScrollTrigger)

/**
 * RoiHeads-style floating sticker: a tilted badge with a hard offset shadow
 * that drifts (x / y / rotate) while its trigger scrolls through the viewport.
 * Transform-only, scrubbed, travel halved on small screens.
 */
export default function ParallaxSticker({
  children,
  className = "",
  style,
  variant = "plum",
  from = {},
  to = {},
  trigger,
  start = "top bottom",
  end = "bottom top",
  scrub = 1.2
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      gsap.set(el, { rotate: to.rotate ?? from.rotate ?? 0 })
      return
    }

    const k = window.innerWidth < 768 ? 0.5 : 1
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { x: (from.x || 0) * k, y: (from.y || 0) * k, rotate: from.rotate || 0 },
        {
          x: (to.x || 0) * k,
          y: (to.y || 0) * k,
          rotate: to.rotate || 0,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: trigger || el.parentElement,
            start,
            end,
            scrub
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className={`fx-sticker fx-sticker--${variant} ${className}`} style={style} aria-hidden="true">
      <span className="fx-sticker__body">{children}</span>
    </div>
  )
}
