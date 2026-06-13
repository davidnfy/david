import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

export default function Navbar() {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

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

  const navItems = [
    { name: "WORKS", href: "#projects" },
    { name: "JOURNEY", href: "#education" },
    { name: "CONNECT", href: "#contact" }
  ]

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          id="navbar"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 px-8 py-8"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              className="text-2xl font-black tracking-tighter cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              dnfy.
            </motion.div>

            <ul className="flex gap-12">
              {navItems.map(item => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-xs font-bold tracking-[0.2em] opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
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
