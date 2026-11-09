import { lazy, Suspense, useEffect, useRef } from "react"
import Hero from "./components/Hero"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { setLenis } from "./lib/motion"
import SectionIndex from "./components/fx/SectionIndex"
import { WhenVisible } from "./components/DeferredMount"

gsap.registerPlugin(ScrollTrigger)

const About = lazy(() => import("./components/About"))
const Education = lazy(() => import("./components/Education"))
const Projects = lazy(() => import("./components/Projects"))
const TechStack = lazy(() => import("./components/TechStack"))
const Contact = lazy(() => import("./components/Contact"))
const VelocityMarquee = lazy(() => import("./components/fx/VelocityMarquee"))

function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0

    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      el.style.transform = `scaleX(${progress})`
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 h-1 bg-[#29ABE2] z-50 origin-left shadow-xs"
      style={{ transform: "scaleX(0)" }}
    />
  )
}

function LazyBlock({ id, children, minHeight }) {
  return (
    <div id={id}>
      <WhenVisible minHeight={minHeight}>
        <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>
          {children}
        </Suspense>
      </WhenVisible>
    </div>
  )
}

export default function App() {
  useEffect(() => {
    let lenis
    let disposed = false
    let idleId = 0
    let timer = 0

    const start = () => {
      if (disposed) return
      const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window

      lenis = new Lenis({
        duration: isTouch ? 0.8 : 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: isTouch ? 0 : 1.2,
        syncTouch: false,
        infinite: false,
      })

      lenis.on("scroll", ScrollTrigger.update)
      setLenis(lenis)

      const handleNativeScroll = () => {
        ScrollTrigger.update()
      }
      window.addEventListener("scroll", handleNativeScroll, { passive: true })

      const updateTicker = (time) => {
        lenis.raf(time * 1000)
      }

      gsap.ticker.add(updateTicker)
      gsap.ticker.lagSmoothing(500, 33)

      const handleAnchorClick = (e) => {
        const target = e.target.closest("a")
        if (target && target.hash && target.hash.startsWith("#")) {
          const hash = target.hash
          const el = document.querySelector(hash)
          if (el || hash === "#home") {
            e.preventDefault()
            if (hash === "#home") {
              lenis.scrollTo(0, { duration: 1.0, onComplete: () => ScrollTrigger.refresh() })
            } else if (el) {
              lenis.scrollTo(el, { offset: 0, duration: 1.2, onComplete: () => ScrollTrigger.refresh() })
            }
          }
        }
      }
      document.addEventListener("click", handleAnchorClick)

      start.cleanup = () => {
        document.removeEventListener("click", handleAnchorClick)
        window.removeEventListener("scroll", handleNativeScroll)
        gsap.ticker.remove(updateTicker)
        setLenis(null)
        lenis.destroy()
      }
    }

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(start, { timeout: 600 })
    } else {
      timer = window.setTimeout(start, 1)
    }

    return () => {
      disposed = true
      if (idleId && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId)
      if (timer) window.clearTimeout(timer)
      start.cleanup?.()
    }
  }, [])

  return (
    <div className="min-h-screen w-full relative text-[#1F1F1F] bg-[#FFFFFF] overflow-x-clip selection:bg-[#29ABE2] selection:text-[#FFFFFF]">
      <ScrollProgress />
      <SectionIndex />

      <main className="w-full overflow-x-clip">
        <Hero />

        <LazyBlock id="about" minHeight="100vh">
          <About />
        </LazyBlock>

        <LazyBlock minHeight="4.5rem">
          <VelocityMarquee
            items={["FULL-STACK", "CREATIVE TECH", "3D SPATIAL", "UI ARCHITECTURE"]}
            variant="plum"
            direction={1}
            tilt={-1.2}
          />
        </LazyBlock>

        <LazyBlock id="projects" minHeight="100vh">
          <Projects />
        </LazyBlock>

        <LazyBlock id="education" minHeight="100vh">
          <Education />
        </LazyBlock>

        <LazyBlock id="stack" minHeight="70vh">
          <TechStack />
        </LazyBlock>

        <LazyBlock minHeight="4.5rem">
          <VelocityMarquee
            items={["REACT", "THREE.JS", "GSAP", "TAILWIND", "TYPESCRIPT", "PHP & LARAVEL"]}
            variant="azure"
            direction={-1}
            tilt={1.2}
          />
        </LazyBlock>

        <LazyBlock id="contact" minHeight="80vh">
          <Contact />
        </LazyBlock>
      </main>
    </div>
  )
}
