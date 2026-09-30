import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import anime from "animejs"
import { X, ArrowUpRight } from "lucide-react"

export default function Navbar() {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [isOpen, setIsOpen] = useState(false)
  const logoRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (!isOpen) {
        if (currentScrollY > lastScrollY && currentScrollY > 120) {
          setVisible(false)
        } else {
          setVisible(true)
        }
      }
      setLastScrollY(currentScrollY)

      const sections = ["home", "about", "projects", "education", "stack", "contact"]
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, isOpen])

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Auto-close on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (visible && logoRef.current) {
      anime({
        targets: logoRef.current.querySelectorAll(".nav-logo-char"),
        translateY: [-12, 0],
        opacity: [0, 1],
        delay: anime.stagger(35),
        easing: "easeOutBack",
        duration: 500
      })
    }
  }, [visible])

  const navItems = [
    { name: "ABOUT", href: "#about", id: "about" },
    { name: "WORKS", href: "#projects", id: "projects" },
    { name: "ACADEMIC", href: "#education", id: "education" },
    { name: "STACK", href: "#stack", id: "stack" },
    { name: "CONNECT", href: "#contact", id: "contact" }
  ]

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    setIsOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 pointer-events-none"
          >
            <div className="w-full max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
              
              {/* Brand Logo */}
              <motion.div
                ref={logoRef}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer bg-[#D5CCCD]/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#9FB2C8] shadow-xs flex items-center gap-2 select-none"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#5E87B6]" />
                <div className="text-sm font-black tracking-tight flex items-center text-[#291B48]">
                  <span className="nav-logo-char inline-block">d</span>
                  <span className="nav-logo-char inline-block">n</span>
                  <span className="nav-logo-char inline-block">f</span>
                  <span className="nav-logo-char inline-block">y</span>
                  <span className="nav-logo-char inline-block text-[#5E87B6]">.</span>
                </div>
              </motion.div>

              {/* Desktop Navigation (Visible on md and above) */}
              <nav className="hidden md:flex items-center gap-1 bg-[#D5CCCD]/95 backdrop-blur-md px-2 py-1.5 rounded-full border border-[#9FB2C8] shadow-xs">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.id)}
                      className={`relative px-3.5 py-1 text-xs font-bold tracking-wider uppercase transition-colors duration-200 rounded-full select-none whitespace-nowrap ${
                        isActive
                          ? "text-[#D5CCCD]"
                          : "text-[#291B48]/70 hover:text-[#291B48]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute inset-0 bg-[#291B48] rounded-full -z-10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      {item.name}
                    </a>
                  )
                })}
              </nav>

              {/* Mobile Hamburger Button (Top Right Corner - Only on Mobile) */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#D5CCCD]/95 backdrop-blur-md border border-[#9FB2C8] text-[#291B48] hover:border-[#5E87B6] active:scale-95 transition-all shadow-xs"
                aria-label="Toggle navigation menu"
              >
                <div className="w-5 h-3.5 flex flex-col justify-between items-end">
                  <span
                    className={`h-0.5 bg-[#291B48] rounded-full transition-all duration-300 ${
                      isOpen ? "w-5 translate-y-[6px] rotate-45" : "w-5"
                    }`}
                  />
                  <span
                    className={`h-0.5 bg-[#291B48] rounded-full transition-all duration-200 ${
                      isOpen ? "opacity-0 translate-x-2" : "w-3.5"
                    }`}
                  />
                  <span
                    className={`h-0.5 bg-[#291B48] rounded-full transition-all duration-300 ${
                      isOpen ? "w-5 -translate-y-[6px] -rotate-45" : "w-4"
                    }`}
                  />
                </div>
              </button>

            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Slide-in Menu Drawer (Hello Monday Style: Slide from Right to Center) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dim Backdrop Overlay */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#291B48]/60 backdrop-blur-sm z-[60] md:hidden"
            />

            {/* Sliding Drawer Panel from Right to Center */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[85vw] sm:max-w-md bg-[#291B48] text-[#D5CCCD] z-[70] flex flex-col justify-between p-6 sm:p-8 shadow-2xl border-l border-[#9FB2C8]/20 md:hidden overflow-y-auto"
            >
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-[#9FB2C8]/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#5E87B6] animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-widest text-[#9FB2C8] uppercase">
                    dnfy
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full border border-[#9FB2C8]/30 flex items-center justify-center text-[#D5CCCD] hover:text-[#5E87B6] hover:border-[#5E87B6] active:scale-95 transition-all"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Links - Large Editorial Layout */}
              <nav className="my-auto py-8 space-y-4">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.id
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + idx * 0.04, duration: 0.3 }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.id)}
                        className="group flex items-center justify-between py-3 border-b border-[#9FB2C8]/10 hover:border-[#5E87B6]/40 transition-colors"
                      >
                        <div className="flex items-baseline gap-3">
                          <span className="text-xs font-mono font-bold text-[#5E87B6]">
                            0{idx + 1}
                          </span>
                          <span
                            className={`text-2xl sm:text-3xl font-black tracking-tight uppercase transition-all duration-200 ${
                              isActive
                                ? "text-[#5E87B6] translate-x-1"
                                : "text-[#D5CCCD] group-hover:text-[#5E87B6] group-hover:translate-x-1.5"
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>
                        <ArrowUpRight
                          size={18}
                          className={`transition-all duration-200 ${
                            isActive
                              ? "text-[#5E87B6] opacity-100"
                              : "text-[#9FB2C8]/40 opacity-50 group-hover:opacity-100 group-hover:text-[#5E87B6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          }`}
                        />
                      </a>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Drawer Footer (Editorial Info & Socials) */}
              <div className="pt-6 border-t border-[#9FB2C8]/20 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#9FB2C8]">
                  <span>LOCATION</span>
                  <span className="text-[#D5CCCD]">MALANG, INDONESIA</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-[#9FB2C8]">
                  <span>STATUS</span>
                  <span className="text-[#5E87B6] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5E87B6] animate-pulse" />
                    OPEN FOR ROLES
                  </span>
                </div>
                <div className="pt-2 flex items-center gap-3 text-xs font-mono font-bold text-[#9FB2C8]">
                  <a
                    href="https://github.com/davidnfy"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#5E87B6] transition-colors"
                  >
                    GITHUB
                  </a>
                  <span>/</span>
                  <a
                    href="https://linkedin.com/in/davidnafisy"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#5E87B6] transition-colors"
                  >
                    LINKEDIN
                  </a>
                  <span>/</span>
                  <a
                    href="mailto:davidnafisy@gmail.com"
                    className="hover:text-[#5E87B6] transition-colors"
                  >
                    EMAIL
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}