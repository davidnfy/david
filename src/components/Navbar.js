import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import gsap from "gsap"

export default function Navbar() {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const logoRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    if (visible && logoRef.current) {
      gsap.fromTo(logoRef.current.querySelectorAll('.logo-letter'),
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.5)" }
      )
    }
  }, [visible])

  const navItems = [
    { name: "WORKS", href: "#projects" },
    { name: "JOURNEY", href: "#education" },
    { name: "CONNECT", href: "#contact" }
  ]

  const handleMagneticMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, {
      x: x * 0.35,
      y: y * 0.35,
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out"
    })
  }

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "elastic.out(1.2, 0.4)"
    })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          id="navbar"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 px-8 py-4 md:py-6 transition-all duration-300 bg-transparent"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              ref={logoRef}
              className="text-2xl font-black tracking-tighter cursor-pointer flex text-white drop-shadow-lg"
              whileHover={{ scale: 1.03 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="logo-letter inline-block">d</span>
              <span className="logo-letter inline-block">n</span>
              <span className="logo-letter inline-block">f</span>
              <span className="logo-letter inline-block">y</span>
              <span className="logo-letter inline-block text-indigo-300">.</span>
            </motion.div>

            <ul className="hidden lg:flex gap-6 md:gap-8 lg:gap-12">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    className="inline-block text-xs font-bold tracking-[0.2em] text-white/80 hover:text-white transition-colors duration-300 cursor-pointer py-2 px-3"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}