import { useEffect } from "react"
import Hero from "./components/Hero"
import About from "./components/About"
import Education from "./components/Education"
import Projects from "./components/Projects"
import TechStack from "./components/TechStack"
import Contact from "./components/Contact"
import { motion, useScroll, useSpring } from "framer-motion"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { setLenis } from "./lib/motion"
import SectionIndex from "./components/fx/SectionIndex"
import VelocityMarquee from "./components/fx/VelocityMarquee"

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  })

  // Initialize Lenis buttery-smooth scrolling with GSAP ScrollTrigger sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      infinite: false,
    })

    // Synchronize Lenis scroll with GSAP ScrollTrigger
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
    gsap.ticker.lagSmoothing(0)

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

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      window.removeEventListener("scroll", handleNativeScroll)
      gsap.ticker.remove(updateTicker)
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen w-full relative text-[#291B48] bg-[#D5CCCD] overflow-x-clip selection:bg-[#5E87B6] selection:text-[#D5CCCD]">
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#5E87B6] z-50 origin-left shadow-xs"
        style={{ scaleX }}
      />

      {/* United in Football-style Section Index (Desktop TOC) */}
      <SectionIndex />

      {/* Full-Frame Main Container */}
      <main className="w-full overflow-x-clip">
        <Hero />
        <About />

        {/* Dynamic Velocity Marquee Band #1 */}
        <VelocityMarquee
          items={["FULL-STACK", "CREATIVE TECH", "3D SPATIAL", "UI ARCHITECTURE"]}
          variant="plum"
          direction={1}
          tilt={-1.2}
        />

        <Projects />
        <Education />
        <TechStack />

        {/* Dynamic Velocity Marquee Band #2 */}
        <VelocityMarquee
          items={["REACT", "THREE.JS", "GSAP", "TAILWIND", "TYPESCRIPT", "PHP & LARAVEL"]}
          variant="azure"
          direction={-1}
          tilt={1.2}
        />

        <Contact />
      </main>
    </div>
  )
}