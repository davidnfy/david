import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import anime from "animejs"
import { Compass, Sparkles, Heart } from "lucide-react"
import ThreeCanvas3D from "./ThreeCanvas3D"
import InfiniteSpiral from "./InfiniteSpiral"

gsap.registerPlugin(ScrollTrigger)

const spiralImages = [
  { src: "/img/1.png", label: "Personal" },
  { src: "/img/2.png", label: "Personal" },
  { src: "/img/3.png", label: "Personal" },
  { src: "/img/4.png", label: "Personal" },
  { src: "/img/5.png", label: "Personal" },
  { src: "/img/6.png", label: "Personal" },
  { src: "/img/7.png", label: "Personal" }
]


const Typewriter = () => {
  const words = [
    "Full-Stack Developer",
    "UI/UX 3D Designer",
    "System Architect",
    "Spatial Creative"
  ]
  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(130)

  useEffect(() => {
    let timer
    const handleTyping = () => {
      const currentWord = words[index]
      if (isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length - 1))
        setSpeed(45)
      } else {
        setDisplayText(currentWord.substring(0, displayText.length + 1))
        setSpeed(120)
      }

      if (!isDeleting && displayText === currentWord) {
        timer = setTimeout(() => setIsDeleting(true), 1600)
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setIndex((prev) => (prev + 1) % words.length)
      } else {
        timer = setTimeout(handleTyping, speed)
      }
    }

    timer = setTimeout(handleTyping, speed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, index, speed, words])

  return (
    <span className="text-[#5E87B6] font-black inline-block">
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1 h-[0.85em] bg-[#5E87B6] ml-1.5 align-middle"
      />
    </span>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const zoomStageRef = useRef(null)
  const nameRef = useRef(null)
  const promptRef = useRef(null)
  const contentRef = useRef(null)
  const spiralRef = useRef(null)
  const threeRef = useRef(null)
  const counterRef1 = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const zoomStage = zoomStageRef.current
    const nameEl = nameRef.current
    const promptEl = promptRef.current
    const contentEl = contentRef.current
    const spiralEl = spiralRef.current
    const threeEl = threeRef.current
    if (!section || !zoomStage || !nameEl || !contentEl || !spiralEl) return

    gsap.set(nameEl, {
      scale: 1,
      z: 0,
      opacity: 1,
      force3D: true,
      transformPerspective: 2000,
      transformOrigin: "center center"
    })

    gsap.set(contentEl, {
      scale: 0.75,
      z: -350,
      opacity: 0,
      force3D: true,
      pointerEvents: "none",
      transformPerspective: 2000,
      transformOrigin: "center center"
    })

    gsap.set(spiralEl, {
      scale: 0.65,
      z: -600,
      opacity: 0,
      force3D: true,
      pointerEvents: "none",
      transformPerspective: 2000,
      transformOrigin: "center center"
    })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2800",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,
          onUpdate: (self) => {
            if (self.progress > 0.22 && self.progress < 0.68 && counterRef1.current && counterRef1.current.dataset.animated !== "true") {
              counterRef1.current.dataset.animated = "true"
              const c1 = { val: 0 }
              anime({
                targets: c1,
                val: 2,
                round: 1,
                easing: "easeOutExpo",
                duration: 900,
                update: () => {
                  if (counterRef1.current) counterRef1.current.innerHTML = `${c1.val}+`
                }
              })
            }
          }
        }
      })

      // STAGE 1: Fly-through "DAVID NAFISY" with zero filter lag
      tl.to(nameEl, {
        scale: 6.5,
        z: 900,
        opacity: 0,
        force3D: true,
        ease: "power2.inOut",
        duration: 0.35
      }, 0)

      if (threeEl) {
        tl.to(threeEl, {
          scale: 1.35,
          opacity: 0.5,
          force3D: true,
          ease: "power1.out",
          duration: 0.35
        }, 0)

        tl.to(threeEl, {
          scale: 1.7,
          opacity: 0.35,
          force3D: true,
          ease: "power1.out",
          duration: 0.4
        }, 0.55)
      }

      // STAGE 2: Smoothly zooms into focus
      tl.to(contentEl, {
        scale: 1,
        z: 0,
        opacity: 1,
        force3D: true,
        pointerEvents: "auto",
        ease: "power2.out",
        duration: 0.3
      }, 0.15)

      // Comfortable reading dwell time
      tl.to({}, { duration: 0.28 })

      // STAGE 2 -> STAGE 3: Smooth fly-through reveal
      tl.to(contentEl, {
        scale: 5.5,
        z: 850,
        opacity: 0,
        force3D: true,
        pointerEvents: "none",
        ease: "power2.inOut",
        duration: 0.35
      })

      // STAGE 3: Interactive Artifact Spiral settles into view
      tl.to(spiralEl, {
        scale: 1,
        z: 0,
        opacity: 1,
        force3D: true,
        pointerEvents: "auto",
        ease: "power2.out",
        duration: 0.35
      }, "<0.1")

      // Stage 3 resting dwell time
      tl.to({}, { duration: 0.3 })

    }, section)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#D5CCCD] text-[#291B48] select-none overflow-hidden"
    >
      {/* Viewport Frame with 3D Perspective */}
      <div
        ref={zoomStageRef}
        className="w-full h-full relative overflow-hidden flex items-center justify-center perspective-2000"
      >
        {/* Background Solid Tech Grid */}
        <div className="absolute inset-0 solid-tech-grid opacity-50 pointer-events-none" style={{ zIndex: -2 }} />

        {/* 3D Three.js Geometries - Clean GPU rendering without heavy raster blur */}
        <div ref={threeRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" style={{ zIndex: -1 }}>
          <ThreeCanvas3D className="w-full h-full" />
        </div>

        {/* STAGE 1: MONUMENTAL "DAVID NAFISY" CAMERA DOLLY-IN */}
        <div
          ref={nameRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center z-10 preserve-3d"
          style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        >

          {}
          <div className="relative max-w-full px-4">
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl font-poppins font-black tracking-tight text-[#291B48] uppercase leading-none drop-shadow-xs">
              DAVID <span className="text-[#5E87B6]">NAFISY</span>
            </h2>
            <div className="text-xs sm:text-sm font-mono font-bold tracking-[0.4em] uppercase text-[#291B48]/60 mt-4">
              [ SOFTWARE ENGINEER ]
            </div>
          </div>
        </div>

        {/* STAGE 2: EDITORIAL ARCHITECTURE & SPATIAL IDENTITY */}
        <div
          ref={contentRef}
          className="absolute inset-0 w-full h-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-center z-20 py-8 preserve-3d overflow-y-auto lg:overflow-visible"
          style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        >
          {/* Section Subtitle Bar (Hidden on small mobile to preserve perfect vertical balance) */}
          <div className="hidden sm:flex items-center justify-between border-b border-[#9FB2C8] pb-3 mb-6 lg:mb-8 shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5E87B6]" />
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-[#291B48]">
                SPATIAL IDENTITY // DAVID NAFISY
              </h3>
            </div>
            <div className="text-xs font-mono font-bold text-[#5E87B6] uppercase tracking-widest">
              MINIMALIST ARCHITECTURE
            </div>
          </div>

          {/* Grid Layout: Left (Bio & Focus) + Right (Experience & Hobbies) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Narrative & Typewriter (Col 7) */}
            <div className="lg:col-span-7 space-y-4 lg:space-y-6">
              <h4 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-[#291B48] leading-tight">
                I am a <br />
                <Typewriter />
              </h4>

              <p className="text-sm sm:text-base text-[#291B48]/85 font-sans leading-relaxed pt-2">
                Vocational student at <strong className="text-[#291B48] font-black">SMK Negeri 5 Malang</strong>. I build full-stack web applications and interactive digital experiences, focusing on clean design, solid performance, and thoughtful user interactions.
              </p>

              {/* Minimalist Pill Tags */}
              <div className="pt-3 flex flex-wrap gap-2">
                {["Web Development", "Creative Tech", "Digital Experience"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-bold tracking-wide text-[#291B48] border border-[#9FB2C8] bg-[#D5CCCD] shadow-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Experience & Hobbies (Col 5) */}
            <div className="lg:col-span-5 space-y-4 lg:space-y-7 border-t lg:border-t-0 lg:border-l border-[#9FB2C8] pt-5 lg:pt-0 pl-0 lg:pl-8">
              
              {/* Experience Metric Lockup */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#5E87B6] uppercase">
                  <Sparkles size={14} className="text-[#5E87B6]" />
                  <span>ENGINEERING EXPERIENCE</span>
                </div>
                <div className="flex items-baseline gap-3.5">
                  <div ref={counterRef1} className="text-5xl sm:text-6xl font-black text-[#291B48] font-mono tracking-tight leading-none">
                    0+
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-sm sm:text-base font-black uppercase tracking-wider text-[#291B48]">
                      Years Experience
                    </div>
                    <div className="text-xs uppercase font-mono font-bold tracking-widest text-[#5E87B6]">
                      As Software Engineer
                    </div>
                  </div>
                </div>
              </div>

              {/* Hobbies & Passions Section - Open Editorial List (No Cards) */}
              <div className="border-t border-[#9FB2C8]/40 pt-3.5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-black uppercase tracking-widest text-[#291B48]">
                  <span>HOBBIES & INTERESTS</span>
                </div>

                <div className="divide-y divide-[#9FB2C8]/25">
                  {/* Hobby 1: Playing Music */}
                  <div className="group py-2 sm:py-2.5 flex items-center justify-between gap-3 transition-colors">
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-[#291B48] group-hover:text-[#5E87B6] group-hover:translate-x-1 transition-all truncate">
                        Playing Music
                      </div>
                      <div className="text-xs font-mono text-[#291B48]/70 truncate">
                        Piano & guitar melodies
                      </div>
                    </div>
                  </div>

                  {/* Hobby 2: Video Gaming */}
                  <div className="group py-2 sm:py-2.5 flex items-center justify-between gap-3 transition-colors">
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-[#291B48] group-hover:text-[#5E87B6] group-hover:translate-x-1 transition-all truncate">
                        Video Games
                      </div>
                      <div className="text-xs font-mono text-[#291B48]/70 truncate">
                        Strategy & immersive worlds
                      </div>
                    </div>
                  </div>

                  {/* Hobby 3: Sports & Athletics */}
                  <div className="group py-2 sm:py-2.5 flex items-center justify-between gap-3 transition-colors">
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-[#291B48] group-hover:text-[#5E87B6] group-hover:translate-x-1 transition-all truncate">
                        Sports & Athletics
                      </div>
                      <div className="text-xs font-mono text-[#291B48]/70 truncate">
                        Running & volleyball sessions
                      </div>
                    </div>
                  </div>

                  {/* Hobby 4: Watching Cinema */}
                  <div className="group py-2 sm:py-2.5 flex items-center justify-between gap-3 transition-colors">
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-[#291B48] group-hover:text-[#5E87B6] group-hover:translate-x-1 transition-all truncate">
                        Watching Cinema
                      </div>
                      <div className="text-xs font-mono text-[#291B48]/70 truncate">
                        Films, series & visual narratives
                      </div>
                    </div>
                  </div>

                  {/* Hobby 5: Reading Books */}
                  <div className="group py-2 sm:py-2.5 flex items-center justify-between gap-3 transition-colors">
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-[#291B48] group-hover:text-[#5E87B6] group-hover:translate-x-1 transition-all truncate">
                        Reading Books
                      </div>
                      <div className="text-xs font-mono text-[#291B48]/70 truncate">
                        Software architecture & literature
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* STAGE 3: INTERACTIVE 3D ARTIFACT SPIRAL (PASS-THROUGH ZOOM REVEAL) */}
        <div
          ref={spiralRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-8 z-30 preserve-3d"
          style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        >
          <div className="w-full max-w-5xl flex flex-col items-center justify-center">
            {/* Header Badge & Title */}
            <div className="text-center mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#9FB2C8] bg-[#D5CCCD] text-xs font-mono font-bold tracking-widest uppercase text-[#5E87B6] mb-1.5 shadow-xs">
                David Nafisy
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-black text-[#291B48] tracking-tight">
                Behind the Code
              </h3>
            </div>

            {}
            <div
              className="h-[420px] sm:h-[500px] md:h-[600px] w-full max-w-[1100px] relative pointer-events-auto overflow-hidden"
            >
              <InfiniteSpiral
                items={spiralImages}
                animationMode="all"
                speed={0.55}
                radius={340}
                cardWidth={165}
                cardHeight={165}
                verticalSpacing={130}
                perspective={1200}
                cardRadius={16}
                centerScale={1.25}
                edgeBlur={3}
                cardsPerTurn={4.5}
                pauseOnHover
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}