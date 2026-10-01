import { useEffect } from "react"
import Hero from "./components/Hero"
import About from "./components/About"
import Education from "./components/Education"
import Projects from "./components/Projects"
import TechStack from "./components/TechStack"
import Contact from "./components/Contact"
import Navbar from "./components/Navbar"
import GlowCursor from "./components/GlowCursor"
import { motion, useScroll, useSpring } from "framer-motion"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

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

    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    const handleAnchorClick = (e) => {
      const target = e.target.closest("a")
      if (target && target.hash && target.hash.startsWith("#")) {
        const el = document.querySelector(target.hash)
        if (el) {
          e.preventDefault()
          lenis.scrollTo(el, { offset: 0, duration: 1.2 })
        }
      }
    }
    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen w-full relative text-[#291B48] bg-[#D5CCCD] overflow-x-clip selection:bg-[#5E87B6] selection:text-[#D5CCCD]">
      {/* Interactive WebGL Glow Cursor Trail from React Bits (Exclusive 4-Color Palette) */}
      <GlowCursor
        color="#5E87B6"
        secondaryColor="#291B48"
        trailLength={24}
        trailWidth={6}
        trailTaper={0.75}
        followSpeed={0.2}
        glowIntensity={1.6}
        glowSpread={1.1}
        hotspot={0}
        brightness={1.15}
        opacity={0.8}
        pulseSpeed={0.8}
        noiseStrength={0}
        idleFade
        idleTimeout={500}
        fadeDuration={600}
        maxDevicePixelRatio={1.0}
        blendMode="normal"
        className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
      />

      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#5E87B6] z-50 origin-left shadow-xs"
        style={{ scaleX }}
      />

      {/* Floating Island Navigation */}
      <Navbar />

      {/* Full-Frame Main Container */}
      <main className="w-full overflow-x-clip">
        <Hero />
        <About />
        <Projects />
        <Education />
        <TechStack />
        <Contact />
      </main>
    </div>
  )
}