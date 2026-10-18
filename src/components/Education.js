import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  GraduationCap,
  MapPin,
  Calendar,
  ChevronDown
} from "lucide-react"
import AcademicCanvas3D from "./AcademicCanvas3D"

gsap.registerPlugin(ScrollTrigger)

export default function Education() {
  const sectionRef = useRef(null)
  const stage1Ref = useRef(null)
  const stage2Ref = useRef(null)
  const stage3Ref = useRef(null)
  const canvasContainerRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const stage1 = stage1Ref.current
    const stage2 = stage2Ref.current
    const stage3 = stage3Ref.current
    const canvasContainer = canvasContainerRef.current
    if (!section || !stage1 || !stage2 || !stage3) return

    gsap.set(stage1, {
      scale: 1,
      y: 0,
      opacity: 1,
      transformOrigin: "center center"
    })

    gsap.set(stage2, {
      scale: 0.82,
      y: 45,
      opacity: 0,
      pointerEvents: "none",
      transformOrigin: "center center"
    })

    gsap.set(stage3, {
      scale: 0.82,
      y: 45,
      opacity: 0,
      pointerEvents: "none",
      transformOrigin: "center center"
    })

    if (canvasContainer) {
      gsap.set(canvasContainer, {
        opacity: 0.38,
        scale: 1
      })
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2200",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      })

      // STAGE 1 -> STAGE 2
      tl.to(stage1, {
        scale: 1.04,
        y: -35,
        opacity: 0,
        pointerEvents: "none",
        ease: "power2.inOut",
        duration: 1.0
      }, 0)

      if (canvasContainer) {
        tl.to(canvasContainer, {
          scale: 1.1,
          opacity: 0.3,
          ease: "power1.inOut",
          duration: 1.0
        }, 0)
      }

      tl.fromTo(stage2,
        {
          scale: 0.95,
          y: 35,
          opacity: 0,
          pointerEvents: "none"
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          pointerEvents: "auto",
          ease: "power2.out",
          duration: 0.9
        },
        0.7
      )

      // Dwell period for SMK 5
      tl.to(stage2, {
        scale: 1.01,
        duration: 0.8
      }, 1.6)

      // STAGE 2 -> STAGE 3
      tl.to(stage2, {
        scale: 1.04,
        y: -35,
        opacity: 0,
        pointerEvents: "none",
        ease: "power2.inOut",
        duration: 0.9
      }, 2.4)

      if (canvasContainer) {
        tl.to(canvasContainer, {
          scale: 1.18,
          opacity: 0.25,
          ease: "power1.inOut",
          duration: 0.9
        }, 2.4)
      }

      tl.fromTo(stage3,
        {
          scale: 0.95,
          y: 35,
          opacity: 0,
          pointerEvents: "none"
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          pointerEvents: "auto",
          ease: "power2.out",
          duration: 0.9
        },
        2.9
      )

      // Dwell period for SMP 2
      tl.to(stage3, {
        scale: 1.01,
        duration: 0.8
      }, 3.8)

    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center bg-[#FFFFFF] text-[#1F1F1F] border-t border-[#0054A6] overflow-hidden select-none"
    >
      {/* Background Subtle Tech Dot Grid */}
      <div className="absolute inset-0 tech-dot-grid opacity-30 pointer-events-none" />

      {/* 3D Academic Planetary Graduation Cap Canvas (persistent soft/blurred background) */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-500"
        style={{ willChange: "transform, opacity, filter" }}
      >
        <AcademicCanvas3D className="w-full h-full" />
      </div>

      <div
        ref={stage1Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20 pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="space-y-4 max-w-4xl mx-auto px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0054A6] bg-[#FFFFFF]/90 backdrop-blur-xs text-xs font-bold tracking-[0.25em] text-[#29ABE2] uppercase">
            <GraduationCap size={16} />
            <span>MY JOURNEY</span>
          </div>

          {/* Monumental Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-normal leading-tight text-[#1F1F1F] uppercase max-w-full drop-shadow-xs">
            ACADEMIC
          </h2>

          {/* Latin Editorial Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl font-latin italic text-[#1F1F1F]/90 max-w-2xl mx-auto">
            Formative Milestones & Engineering Roots
          </p>
        </div>

        {/* Scroll Prompt */}
        <div className="absolute bottom-12 flex flex-col items-center gap-2 text-xs font-bold tracking-widest text-[#29ABE2] uppercase">
          <span>SCROLL TO PASS THROUGH</span>
          <ChevronDown size={18} className="animate-bounce" />
        </div>
      </div>

      {/* ======================================================== */}
      {/* STAGE 2: SMK NEGERI 5 MALANG (Open Spatial, No Card Box)  */}
      {/* ======================================================== */}
      <div
        ref={stage2Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="max-w-3xl w-full mx-auto space-y-6 flex flex-col items-center text-center">
          {/* School Logo */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#FFFFFF] border-2 border-[#29ABE2] p-3 shadow-md flex items-center justify-center">
            <img
              src="/img/smk.webp"
              alt="SMK Negeri 5 Malang"
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Status & Period Pill */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-black tracking-widest uppercase text-[#29ABE2] border border-[#29ABE2] px-4 py-1.5 rounded-full bg-[#FFFFFF]">
              VOCATIONAL HIGH SCHOOL
            </span>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#29ABE2]/15 border border-[#29ABE2] text-[#1F1F1F] text-xs font-black">
              <span className="w-2 h-2 rounded-full bg-[#29ABE2] animate-pulse" />
              <span>CURRENTLY ENROLLED</span>
            </div>
          </div>

          {/* Monumental School Name */}
          <div className="space-y-2">
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-[#1F1F1F] uppercase leading-tight drop-shadow-xs">
              SMK NEGERI 5 MALANG
            </h3>
            {/* Major in Latin Serif Italic */}
            <p className="text-xl sm:text-3xl font-latin italic text-[#29ABE2]">
              Vocational High School 5 Malang
            </p>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-[#1F1F1F]/80">
            <span className="flex items-center gap-1.5">
              <Calendar size={15} className="text-[#29ABE2]" />
              2024 — Present
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin size={15} className="text-[#29ABE2]" />
              Malang, Jawa Timur
            </span>
          </div>

          {/* Core Competencies Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 max-w-xl">
            {["Full-Stack Dev", "Database Architecture", "System Design", "UI/UX Modeling"].map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1 rounded-full border border-[#0054A6] bg-[#FFFFFF] text-xs font-bold text-[#1F1F1F] tracking-wider uppercase"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="absolute bottom-10 flex flex-col items-center gap-1 text-[11px] font-bold tracking-widest text-[#29ABE2] uppercase">
          <span>SCROLL TO ADVANCE TO JUNIOR HIGH</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </div>

      {/* ======================================================== */}
      {/* STAGE 3: SMP NEGERI 2 DAMPIT (Open Spatial, No Card Box)  */}
      {/* ======================================================== */}
      <div
        ref={stage3Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="max-w-3xl w-full mx-auto space-y-6 flex flex-col items-center text-center">
          {/* School Logo */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#FFFFFF] border-2 border-[#0054A6] p-3 shadow-md flex items-center justify-center">
            <img
              src="/img/smp.webp"
              alt="SMP Negeri 2 Dampit"
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Status & Period Pill */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-black tracking-widest uppercase text-[#1F1F1F]/80 border border-[#0054A6] px-4 py-1.5 rounded-full bg-[#FFFFFF]">
              JUNIOR HIGH SCHOOL
            </span>
            <span className="px-4 py-1.5 rounded-full border border-[#0054A6] text-[#1F1F1F]/90 text-xs font-black bg-[#FFFFFF]">
              GRADUATED (ALUMNI)
            </span>
          </div>

          {/* Monumental School Name */}
          <div className="space-y-2">
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-[#1F1F1F] uppercase leading-tight drop-shadow-xs">
              SMP NEGERI 2 DAMPIT
            </h3>
            {/* Major in Latin Serif Italic */}
            <p className="text-xl sm:text-3xl font-latin italic text-[#29ABE2]">
              Junior High School 2 Dampit
            </p>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-[#1F1F1F]/80">
            <span className="flex items-center gap-1.5">
              <Calendar size={15} className="text-[#29ABE2]" />
              2021 — 2024
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin size={15} className="text-[#29ABE2]" />
              Dampit, Malang
            </span>
          </div>

          {/* Foundation Competencies Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 max-w-xl">
            {["Logic & Mathematics", "SCIENCE & DISCOVERY", "TECHNOLOGY INTERESTS"].map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1 rounded-full border border-[#0054A6] bg-[#FFFFFF] text-xs font-bold text-[#1F1F1F] tracking-wider uppercase"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
