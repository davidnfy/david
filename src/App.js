import { useEffect, useRef } from "react"
import Hero from "./components/Hero"
import About from "./components/About"
import Education from "./components/Education"
import Projects from "./components/Projects"
import TechStack from "./components/TechStack"
import Contact from "./components/Contact"
import Navbar from "./components/Navbar"
import { motion, useScroll, useSpring } from "framer-motion"
import gsap from "gsap"

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const blob1Ref = useRef(null)
  const blob2Ref = useRef(null)
  const blob3Ref = useRef(null)

  useEffect(() => {
    gsap.to(blob1Ref.current, {
      x: "random(-80, 80)",
      y: "random(-80, 80)",
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
    gsap.to(blob2Ref.current, {
      x: "random(-120, 120)",
      y: "random(-120, 120)",
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
    gsap.to(blob3Ref.current, {
      x: "random(-100, 100)",
      y: "random(-100, 100)",
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const moveX = (clientX - window.innerWidth / 2) * 0.03
      const moveY = (clientY - window.innerHeight / 2) * 0.03

      gsap.to(".blob-container", {
        x: moveX,
        y: moveY,
        duration: 1.5,
        ease: "power1.out"
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen selection:bg-empathetic selection:text-white relative text-black bg-[#f5f5ff] overflow-x-hidden">
      <div className="blob-container fixed inset-0 -z-20 pointer-events-none overflow-hidden opacity-40">
        <div 
          ref={blob1Ref} 
          className="absolute w-[50vw] h-[50vw] rounded-full bg-indigo-300/20 blur-[130px]" 
          style={{ top: "-10%", left: "-10%" }}
        />
        <div 
          ref={blob2Ref} 
          className="absolute w-[45vw] h-[45vw] rounded-full bg-pink-200/25 blur-[120px]" 
          style={{ bottom: "10%", right: "-10%" }}
        />
        <div 
          ref={blob3Ref} 
          className="absolute w-[40vw] h-[40vw] rounded-full bg-purple-200/20 blur-[140px]" 
          style={{ top: "40%", left: "50%" }}
        />
      </div>

      <div className="soft-mesh opacity-20" />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-empathetic z-50 origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      <main className="max-w-400 mx-auto overflow-x-hidden">
        <Hero />
        <About />
        <Education />
        <Projects />
        <TechStack />
        <Contact />
      </main>
    </div>
  )
}