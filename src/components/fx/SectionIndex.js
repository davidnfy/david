import { useEffect, useState } from "react"
import { getLenis } from "../../lib/motion"

const SECTIONS = [
  { id: "home", label: "INTRO" },
  { id: "about", label: "ABOUT" },
  { id: "projects", label: "WORKS" },
  { id: "education", label: "ACADEMIC" },
  { id: "stack", label: "STACK" },
  { id: "contact", label: "CONNECT" }
]

/**
 * United-in-Football-style sticky section index (desktop only).
 * Active item = the section crossing the vertical centre of the viewport.
 * Works with pinned sections because it reads live bounding rects.
 */
export default function SectionIndex() {
  const [active, setActive] = useState("home")

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const mid = window.innerHeight / 2
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= mid && r.bottom >= mid) {
          setActive((prev) => (prev === id ? prev : id))
          break
        }
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    const lenis = getLenis()
    if (lenis) lenis.on("scroll", onScroll)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    measure()

    return () => {
      if (lenis) lenis.off("scroll", onScroll)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav className="fx-index" aria-label="Section index">
      {SECTIONS.map(({ id, label }, i) => (
        <a key={id} href={`#${id}`} className={`fx-index__item ${active === id ? "is-active" : ""}`}>
          <span className="fx-index__num">0{i + 1}</span>
          <span className="fx-index__line" />
          <span className="fx-index__label">{label}</span>
        </a>
      ))}
    </nav>
  )
}
