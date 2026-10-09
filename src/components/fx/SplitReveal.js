import { Fragment, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "../../lib/motion"

gsap.registerPlugin(ScrollTrigger)

/**
 * Storytelling reveal: each word slides up out of a mask when the text enters
 * the viewport. Plays once (not scrubbed) to stay cheap.
 */
export default function SplitReveal({ text, as: Tag = "p", className = "", stagger = 0.03, delay = 0, start = "top 88%" }) {
  const ref = useRef(null)
  const words = text.split(" ")

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".fx-split__word"),
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger,
          delay,
          scrollTrigger: { trigger: el, start, once: true }
        }
      )
    })

    return () => ctx.revert()
  }, [text])

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="fx-split__mask" aria-hidden="true">
            <span className="fx-split__word">{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  )
}
