import { useEffect, useRef } from "react"
import gsap from "gsap"
import { getLenis, prefersReducedMotion } from "../../lib/motion"

/**
 * Ryan Ritzenthaler-style marquee band with ✦ separators.
 * Drifts on its own, speeds up with scroll velocity, follows scroll direction
 * and skews slightly while scrolling fast. Paused while off-screen.
 */
export default function VelocityMarquee({
  items = ["FULL-STACK", "CREATIVE TECH", "3D WEB", "UI ENGINEERING"],
  variant = "plum",
  direction = 1,
  baseSpeed = 60,
  tilt = -1.5
}) {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track || prefersReducedMotion()) return

    let visible = false
    let half = track.scrollWidth / 2
    let x = 0
    let dir = direction
    let skew = 0

    const setX = gsap.quickSetter(track, "x", "px")
    const setSkew = gsap.quickSetter(track, "skewX", "deg")

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(wrap)

    const ro = new ResizeObserver(() => {
      half = track.scrollWidth / 2
    })
    ro.observe(track)

    const tick = (_time, deltaTime) => {
      if (!visible || !half) return
      const v = getLenis()?.velocity || 0
      if (v > 0.5) dir = direction
      else if (v < -0.5) dir = -direction

      const speed = baseSpeed * (1 + Math.min(Math.abs(v) * 0.15, 6))
      x -= (dir * speed * deltaTime) / 1000
      if (x <= -half) x += half
      if (x > 0) x -= half
      setX(x)

      const targetSkew = gsap.utils.clamp(-8, 8, -v * 0.6)
      skew += (targetSkew - skew) * 0.1
      setSkew(skew)
    }

    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      io.disconnect()
      ro.disconnect()
    }
  }, [])

  const half = [...items, ...items, ...items]

  return (
    <div className="fx-marquee-zone" aria-hidden="true">
      <div ref={wrapRef} className={`fx-marquee fx-marquee--${variant}`} style={{ transform: `rotate(${tilt}deg)` }}>
        <div ref={trackRef} className="fx-marquee__track">
          {[0, 1].map((copy) => (
            <div key={copy} className="fx-marquee__group">
              {half.map((item, i) => (
                <span key={`${copy}-${i}`} className="fx-marquee__item">
                  {item}
                  <span className="fx-marquee__star">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
