import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "motion/react"

const categories = [
  {
    label: "Languages",
    emoji: "{ }",
    items: [
      { name: "HTML5",      icon: "html5",       color: "#E34F26" },
      { name: "CSS3",       icon: "css3",        color: "#1572B6", customUrl: "https://api.iconify.design/logos:css-3.svg" },
      { name: "JavaScript", icon: "javascript",  color: "#F7DF1E" },
      { name: "TypeScript", icon: "typescript",  color: "#3178C6" },
      { name: "PHP",        icon: "php",         color: "#8993BE" },
      { name: "Python",     icon: "python",      color: "#3776AB" },
    ],
  },
  {
    label: "Frameworks",
    emoji: "⚡",
    items: [
      { name: "React",       icon: "react",       color: "#61DAFB" },
      { name: "Next.js",     icon: "nextdotjs",   color: "#888888" },
      { name: "Node.js",     icon: "nodedotjs",   color: "#339933" },
      { name: "Laravel",     icon: "laravel",     color: "#FF2D20" },
      { name: "CodeIgniter", icon: "codeigniter", color: "#EF4223" },
      { name: "Tailwind",    icon: "tailwindcss", color: "#06B6D4" },
      { name: "Bootstrap",   icon: "bootstrap",   color: "#7952B3" },
    ],
  },
  {
    label: "Databases",
    emoji: "🗄",
    items: [
      { name: "MySQL",      icon: "mysql",      color: "#4479A1" },
      { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
    ],
  },
  {
    label: "Tools",
    emoji: "🔧",
    items: [
      { name: "Git",     icon: "git",              color: "#F05032" },
      { name: "GitHub",  icon: "github",           color: "#888888" },
      { name: "VS Code", icon: "visualstudiocode", color: "#007ACC", customUrl: "https://api.iconify.design/logos:visual-studio-code.svg" },
      { name: "Figma",   icon: "figma",            color: "#F24E1E" },
      { name: "Postman", icon: "postman",          color: "#FF6C37" },
      { name: "Vercel",  icon: "vercel",           color: "#888888" },
      { name: "Netlify", icon: "netlify",          color: "#00C7B7" },
    ],
  },
]

// flat list untuk desktop
const stack = categories.flatMap(c => c.items)

// ── Spark ─────────────────────────────────────────────────────────────────
function Spark({ color, angle, i }) {
  const dist = 48 + Math.random() * 18
  const rad  = (angle * Math.PI) / 180
  const tx   = Math.cos(rad) * dist
  const ty   = Math.sin(rad) * dist
  const size = Math.random() * 4 + 2
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, backgroundColor: color, top: "50%", left: "50%" }}
      initial={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
      animate={{ opacity: 0, x: `calc(-50% + ${tx}px)`, y: `calc(-50% + ${ty}px)`, scale: 0 }}
      transition={{ duration: 0.65, ease: [0.2, 0.8, 0.4, 1], delay: i * 0.015 }}
    />
  )
}

// ── TechCard (desktop) ────────────────────────────────────────────────────
function TechCard({ tech, index }) {
  const [hovered, setHovered] = useState(false)
  const [sparks,  setSparks]  = useState([])
  const [clicked, setClicked] = useState(false)
  const bobRef   = useRef(null)
  const bobAngle = useRef(0)
  const imgRef   = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX  = useSpring(useTransform(mouseY, [-40, 40], [14, -14]), { stiffness: 250, damping: 22 })
  const rotateY  = useSpring(useTransform(mouseX, [-40, 40], [-14, 14]), { stiffness: 250, damping: 22 })
  const rawGlowX = useTransform(mouseX, [-40, 40], [-8, 8])
  const rawGlowY = useTransform(mouseY, [-40, 40], [-8, 8])
  const glowX    = useSpring(rawGlowX, { stiffness: 200, damping: 20 })
  const glowY    = useSpring(rawGlowY, { stiffness: 200, damping: 20 })

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }, [mouseX, mouseY])

  const startBob = useCallback(() => {
    const loop = () => {
      bobAngle.current += 0.07
      if (imgRef.current) {
        imgRef.current.style.transform =
          `scale(1.18) translateY(${Math.sin(bobAngle.current) * 5}px) translateX(${Math.sin(bobAngle.current * 0.6) * 2}px)`
      }
      bobRef.current = requestAnimationFrame(loop)
    }
    bobRef.current = requestAnimationFrame(loop)
  }, [])

  const stopBob = useCallback(() => {
    if (bobRef.current) cancelAnimationFrame(bobRef.current)
    if (imgRef.current) imgRef.current.style.transform = ""
  }, [])

  const spawnSparks = useCallback((count) => {
    const s = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i, angle: (i / count) * 360 + Math.random() * 8, i,
    }))
    setSparks(s)
    setTimeout(() => setSparks([]), 800)
  }, [])

  const handleEnter = useCallback(() => { setHovered(true); startBob(); spawnSparks(10) }, [startBob, spawnSparks])
  const handleLeave = useCallback(() => { setHovered(false); stopBob(); mouseX.set(0); mouseY.set(0) }, [stopBob, mouseX, mouseY])
  const handleClick = useCallback(() => { setClicked(true); spawnSparks(16); setTimeout(() => setClicked(false), 400) }, [spawnSparks])

  useEffect(() => () => stopBob(), [stopBob])

  const iconUrl = tech.customUrl || `https://cdn.simpleicons.org/${tech.icon}`

  return (
    <motion.div
      className="flex flex-col items-center gap-3 cursor-default select-none"
      initial={{ opacity: 0, y: 32, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.035, type: "spring", damping: 16, stiffness: 100 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 700 }}
        animate={clicked ? { scale: [1, 0.85, 1.12, 1] } : { scale: 1 }}
        transition={{ duration: 0.35 }}
        className="relative"
      >
        {/* Orbit ring */}
        <motion.div
          className="absolute rounded-full pointer-events-none border"
          style={{ borderColor: tech.color + "50", inset: -6 }}
          animate={hovered ? { opacity: 1, scale: 1, rotate: 360 } : { opacity: 0, scale: 0.6, rotate: 0 }}
          transition={hovered
            ? { opacity: { duration: 0.2 }, scale: { duration: 0.3, type: "spring", stiffness: 200 }, rotate: { duration: 4, repeat: Infinity, ease: "linear" } }
            : { duration: 0.25 }}
        >
          <motion.div className="absolute w-2 h-2 rounded-full -top-1 left-1/2 -translate-x-1/2" style={{ backgroundColor: tech.color }} />
        </motion.div>

        {/* Glow blob */}
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{ width: 80, height: 80, background: `radial-gradient(circle, ${tech.color}65 0%, transparent 70%)`, filter: "blur(14px)", top: "50%", left: "50%", x: glowX, y: glowY, translateX: "-50%", translateY: "-50%", zIndex: -1 }}
          animate={hovered ? { opacity: 1, scale: 1.3 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        />

        {/* Card box */}
        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl relative overflow-hidden"
          animate={hovered
            ? { borderColor: tech.color + "90", boxShadow: `0 0 0 1px ${tech.color}40, 0 12px 40px ${tech.color}30` }
            : { borderColor: "rgba(0,0,0,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
          transition={{ duration: 0.25 }}
          style={{ border: "1px solid rgba(0,0,0,0.07)", background: "white" }}
        >
          <motion.div className="absolute inset-0 pointer-events-none" animate={hovered ? { opacity: 0.1 } : { opacity: 0 }} transition={{ duration: 0.3 }} style={{ backgroundColor: tech.color }} />
          <motion.div className="absolute pointer-events-none z-10" style={{ inset: 0, background: "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.65) 50%, transparent 75%)" }} animate={hovered ? { translateX: "210%" } : { translateX: "-110%" }} transition={{ duration: 0.55, ease: "easeInOut" }} />

          {hovered && [{ top: 4, left: 4 }, { top: 4, right: 4 }, { bottom: 4, left: 4 }, { bottom: 4, right: 4 }].map((pos, i) => (
            <motion.div key={i} className="absolute w-1 h-1 rounded-full pointer-events-none z-20" style={{ backgroundColor: tech.color, ...pos }}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
              transition={{ duration: 0.6, delay: i * 0.08, repeat: Infinity, repeatDelay: 1.2 }} />
          ))}

          <div className="absolute inset-0 overflow-visible pointer-events-none z-30">
            <AnimatePresence>
              {sparks.map(s => <Spark key={s.id} color={tech.color} angle={s.angle} i={s.i} />)}
            </AnimatePresence>
          </div>

          <img ref={imgRef} src={iconUrl} alt={tech.name}
            className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10"
            style={{ transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1)", willChange: "transform" }}
            referrerPolicy="no-referrer" draggable={false} />
        </motion.div>
      </motion.div>

      <motion.span
        className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap"
        animate={hovered ? { color: tech.color, scale: 1.05, opacity: 1 } : { color: "#000000", scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {tech.name}
      </motion.span>
    </motion.div>
  )
}

// ── MobileChip — tile kecil untuk carousel mobile ─────────────────────────
function MobileChip({ tech, index }) {
  const [tapped, setTapped] = useState(false)
  const iconUrl = tech.customUrl || `https://cdn.simpleicons.org/${tech.icon}`

  const handleTap = () => {
    setTapped(true)
    setTimeout(() => setTapped(false), 500)
  }

  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer select-none flex-shrink-0"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, type: "spring", damping: 18, stiffness: 120 }}
      onTap={handleTap}
      whileTap={{ scale: 0.88 }}
    >
      <motion.div
        className="w-14 h-14 flex items-center justify-center rounded-2xl relative overflow-hidden"
        animate={tapped
          ? { boxShadow: `0 0 0 2px ${tech.color}80, 0 8px 24px ${tech.color}40`, borderColor: tech.color }
          : { boxShadow: "0 2px 8px rgba(0,0,0,0.07)", borderColor: "rgba(0,0,0,0.08)" }}
        style={{ border: "1px solid rgba(0,0,0,0.08)", background: "white" }}
        transition={{ duration: 0.25 }}
      >
        {/* color flash saat tap */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={tapped ? { opacity: 0.15 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ backgroundColor: tech.color }}
        />
        <img src={iconUrl} alt={tech.name}
          className="w-7 h-7 object-contain relative z-10"
          referrerPolicy="no-referrer" draggable={false} />
      </motion.div>

      <span
        className="text-[8px] font-black uppercase tracking-wider whitespace-nowrap"
        style={{ color: "#111" }}
      >
        {tech.name}
      </span>
    </motion.div>
  )
}

// ── MobileCarousel — satu baris per kategori ──────────────────────────────
function MobileCarousel({ cat, globalIndex }) {
  const scrollRef = useRef(null)
  const [showFade, setShowFade] = useState(true)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowFade(scrollLeft + clientWidth < scrollWidth - 8)
  }

  return (
    <div>
      {/* Label kategori */}
      <div className="flex items-center gap-2 mb-4 px-6">
        <span className="text-xs font-black uppercase tracking-[0.25em] text-black/30">{cat.label}</span>
        <div className="flex-1 h-px bg-black/8" />
        <span className="text-[10px] text-black/20 font-medium">{cat.items.length}</span>
      </div>

      {/* Scroll container */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto px-6 pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {cat.items.map((tech, i) => (
            <MobileChip key={tech.name} tech={tech} index={i} />
          ))}
          {/* end spacer */}
          <div className="w-2 flex-shrink-0" />
        </div>

        {/* Fade kanan */}
        <motion.div
          className="absolute top-0 right-0 h-full w-12 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(255,255,255,0.95), transparent)" }}
          animate={{ opacity: showFade ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  )
}

// ── Section utama ──────────────────────────────────────────────────────────
export default function TechStack() {
  return (
    <section id="stack" className="py-32">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-24 space-y-4 px-8 md:px-24">
          <motion.h2
            className="text-sm font-black uppercase tracking-[0.4em] opacity-30"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 0.3, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Stack & Tools
          </motion.h2>
          <motion.div
            className="h-1 bg-black rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>

        {/* ── DESKTOP: grid biasa ── */}
        <div className="hidden md:block px-24">
          {(() => {
            const COLS = 6
            const cut  = Math.floor(stack.length / COLS) * COLS
            const full = stack.slice(0, cut)
            const rest = stack.slice(cut)
            return (
              <>
                <div className="grid grid-cols-6 gap-x-2 gap-y-12">
                  {full.map((tech, i) => <TechCard key={tech.name} tech={tech} index={i} />)}
                </div>
                {rest.length > 0 && (
                  <div className="flex justify-center gap-x-2 mt-12">
                    {rest.map((tech, i) => (
                      <div key={tech.name} style={{ width: "calc(100% / 6)" }} className="flex justify-center">
                        <TechCard tech={tech} index={cut + i} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )
          })()}
        </div>

        {/* ── MOBILE: carousel per kategori ── */}
        <div className="md:hidden space-y-8">
          {/* pill counter total */}
          <div className="px-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {stack.slice(0, 5).map(t => (
                <img key={t.name}
                  src={t.customUrl || `https://cdn.simpleicons.org/${t.icon}`}
                  alt={t.name}
                  className="w-6 h-6 rounded-full border-2 border-white bg-white object-contain p-0.5"
                  referrerPolicy="no-referrer" />
              ))}
            </div>
            <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest">
              {stack.length} technologies
            </span>
          </div>

          {/* carousel per kategori */}
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: ci * 0.08, duration: 0.4 }}
            >
              <MobileCarousel cat={cat} globalIndex={ci} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}