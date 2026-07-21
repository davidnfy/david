import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import gsap from "gsap"
import anime from "animejs"
import FloatingLines from "./FloatingLines"

export default function Hero() {
  const headingRef = useRef(null)
  const metaRef = useRef(null)
  const descRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const lines = headingRef.current.querySelectorAll(".hero-line-inner")
    gsap.fromTo(lines,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.1 }
    )
    gsap.fromTo(metaRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.6 }
    )

    gsap.fromTo(descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.8 }
    )

    anime({
      targets: '.hero-profile-glow',
      scale: [0.96, 1.06],
      opacity: [0.5, 0.85],
      duration: 3500,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad'
    })
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-0">
        <FloatingLines 
          enabledWaves={["top","middle","bottom"]}
          lineCount={6}
          lineDistance={6}
          bendRadius={6}
          bendStrength={-1.5}
          interactive={true}
          parallax={true}
          animationSpeed={0.8}
          linesGradient={["#6366f1", "#a855f7", "#ec4899", "#8b5cf6"]}
          mixBlendMode="multiply"
        />
      </div>

      <div className="absolute inset-0 -z-[1] bg-white/70" />

      <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
        <div
          ref={metaRef}
          className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2 text-[10px] md:text-[11px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-0 px-1 text-white"
        >
          <span className="whitespace-nowrap">David Nafisy</span>
          <span className="w-1 h-1 bg-white rounded-full" />
          <span className="whitespace-nowrap">Malang, Indonesia</span>
          <span className="w-1 h-1 bg-white rounded-full" />
          <span className="whitespace-nowrap">Digital Innovator</span>
        </div>

        <div className="space-y-4">
          <h1
            ref={headingRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-extrabold leading-[1.1] md:leading-[0.9] lg:leading-[0.95] tracking-tighter text-white"
          >
            <div className="overflow-hidden block py-1">
              <span className="hero-line-inner inline-block">Crafting</span>
            </div>
            <div className="overflow-hidden block py-1">
              <span className="hero-line-inner inline-block text-indigo-300">empathetic</span>
            </div>
            <div className="overflow-hidden block py-1">
              <span className="hero-line-inner inline-block">digital</span>
            </div>
            <div className="overflow-hidden block py-1">
              <span className="hero-line-inner inline-block">experiences<span className="text-indigo-300">.</span></span>
            </div>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 pt-12">
          <p
            ref={descRef}
            className="max-w-md text-lg md:text-xl font-medium leading-relaxed opacity-0 text-white"
          >
            I'm David — Technology is not just about being advanced, but about
            how it feels to the user.
          </p>

          <motion.div
            drag
            dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
            dragElastic={0.1}
            whileDrag={{ scale: 1.08, rotate: 3, cursor: "grabbing" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.9, type: "spring", damping: 15 }}
            whileHover={{ scale: 1.03, cursor: "grab" }}
            className="w-40 h-40 md:w-56 md:h-56 aspect-square relative group shrink-0 self-center md:self-auto z-20"
          >
            <div className="absolute inset-[-8px] rounded-full bg-linear-to-br from-indigo-400/30 via-purple-300/25 to-pink-400/30 blur-md -z-10 hero-profile-glow" />

            <img
              src="img/david.png"
              alt="Work"
              className="w-full h-full object-cover rounded-full shadow-2xl border border-white/10 pointer-events-none select-none relative z-10"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 2.5, duration: 3, repeat: Infinity }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 pointer-events-none z-20"
            >
              <span className="text-[9px] font-black uppercase tracking-widest opacity-60 whitespace-nowrap text-white">
                Drag me
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}