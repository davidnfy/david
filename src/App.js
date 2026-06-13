import Hero from "./components/Hero"
import About from "./components/About"
import Education from "./components/Education"
import Projects from "./components/Projects"
import TechStack from "./components/TechStack"
import Contact from "./components/Contact"
import { motion, useScroll, useSpring } from "framer-motion" // Ganti ke framer-motion

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="min-h-screen selection:bg-empathetic selection:text-white relative text-black bg-[#f5f5ff]">
      <div className="soft-mesh opacity-30" />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-empathetic z-50 origin-left"
        style={{ scaleX }}
      />

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