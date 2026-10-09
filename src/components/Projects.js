import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Github, LayoutGrid, ListFilter, Sparkles } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import GlareHover from "./GlareHover"
import ScaleInTitle from "./fx/ScaleInTitle"
import SplitReveal from "./fx/SplitReveal"
import ParallaxSticker from "./fx/ParallaxSticker"
import RollText from "./fx/RollText"
import PressButton from "./fx/PressButton"

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const itemsContainerRef = useRef(null)
  const [viewMode, setViewMode] = useState("grid")
  const [hoveredProject, setHoveredProject] = useState(null)

  const projects = [
    {
      id: 1,
      num: "01",
      title: "Church Management System",
      category: "FULL-STACK",
      year: "2024",
      description: "Church attendance, member tracking, and service management system with relational database architecture.",
      image: "/img/absen-gereja.png",
      githubUrl: "https://github.com/davidnfy/absen-gereja",
    },
    {
      id: 2,
      num: "02",
      title: "Pawtify",
      category: "APPLICATION",
      year: "2024",
      description: "Pet management application for animal health logs, schedules, and vaccination records.",
      image: "/img/pawtify.png",
      githubUrl: "https://github.com/davidnfy/animals-organizer-data",
    },
    {
      id: 3,
      num: "03",
      title: "Dompetku",
      category: "FINTECH",
      year: "2024",
      description: "Personal finance and expense tracker featuring transaction history and cashflow insights.",
      image: "/img/dompetku.png",
      githubUrl: "https://github.com/davidnfy/DompetKu",
    },
    {
      id: 4,
      num: "04",
      title: "Todo List Pro",
      category: "PRODUCTIVITY",
      year: "2023",
      description: "Task manager with local state persistence, prioritized scheduling, and intuitive filtering.",
      image: "/img/todo-list.png",
      githubUrl: "https://github.com/davidnfy/todo-list-app",
    },
    {
      id: 5,
      num: "05",
      title: "Website Profile Showcase",
      category: "CREATIVE WEB",
      year: "2026",
      description: "Personal digital portfolio emphasizing spatial design, 3D interactions, and minimalist aesthetics.",
      image: "/img/profile-web.png",
      githubUrl: "https://github.com/davidnfy/davidnafisy",
    },
  ]

  useEffect(() => {
    // Section header scroll animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          }
        }
      )
    }

    // Prominent alternating slide animation for grid items
    if (viewMode === "grid") {
      const items = itemsContainerRef.current?.querySelectorAll(".project-item-open")
      if (items) {
        items.forEach((item, idx) => {
          const isLeft = idx % 2 === 0
          const fromX = isLeft ? -110 : 110
          const fromRotateY = isLeft ? -6 : 6

          gsap.fromTo(
            item,
            {
              opacity: 0,
              x: fromX,
              scale: 0.93,
              rotateY: fromRotateY,
              transformPerspective: 1200
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              rotateY: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "bottom 18%",
                toggleActions: "play reverse play reverse"
              }
            }
          )
        })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger && sectionRef.current?.contains(t.trigger)) {
          t.kill()
        }
      })
    }
  }, [viewMode])

  // Recalculate ScrollTrigger offsets whenever viewMode changes (prevents Academic layout jumps)
  useEffect(() => {
    const t1 = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 60)
    const t2 = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 300)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [viewMode])

  // Clear hover state on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (hoveredProject) setHoveredProject(null)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hoveredProject])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-32 px-5 sm:px-12 md:px-16 lg:px-20 xl:px-28 bg-[#D5CCCD] text-[#291B48] overflow-hidden border-t border-[#9FB2C8]"
    >
      {/* Background solid tech dot grid */}
      <div className="absolute inset-0 tech-dot-grid opacity-40 pointer-events-none" />

      {/* RoiHeads-style Parallax Floating Stickers */}
      <ParallaxSticker
        variant="plum"
        from={{ y: -30, rotate: -6 }}
        to={{ y: 60, rotate: 6 }}
        className="top-12 right-6 md:right-16 hidden sm:block"
      >
        ✦ 03 // WORKS
      </ParallaxSticker>

      <ParallaxSticker
        variant="azure"
        from={{ y: 50, rotate: 7 }}
        to={{ y: -50, rotate: -5 }}
        className="top-1/2 left-4 md:left-10 hidden sm:block"
      >
        5 ARTIFACTS
      </ParallaxSticker>

      {/* Section Header */}
      <div ref={headerRef} className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-14 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[#5E87B6]">
            <Sparkles size={14} />
            <span>SELECTED ARCHIVES</span>
          </div>
          <ScaleInTitle
            as="h2"
            from={1.6}
            origin="left center"
            className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-[#291B48] uppercase"
          >
            FEATURED <span className="text-[#5E87B6]">PROJECTS.</span>
          </ScaleInTitle>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-4">
          <SplitReveal
            text="Open spatial gallery. Clean engineering artifacts."
            className="max-w-xs text-sm sm:text-base text-[#291B48]/80 font-latin italic leading-relaxed"
          />

          {/* View Mode Switcher */}
          <div className="inline-flex items-center p-1 rounded-full border border-[#9FB2C8] bg-[#D5CCCD]/90 backdrop-blur-xs shadow-xs">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#291B48] text-[#D5CCCD] shadow-xs"
                  : "text-[#291B48]/70 hover:text-[#291B48]"
              }`}
            >
              <LayoutGrid size={13} />
              <span>GRID</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#291B48] text-[#D5CCCD] shadow-xs"
                  : "text-[#291B48]/70 hover:text-[#291B48]"
              }`}
            >
              <ListFilter size={13} />
              <span>INDEX</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODE: GRID (Alternating Card Showcase) */}
      {viewMode === "grid" && (
        <div ref={itemsContainerRef} className="w-full max-w-4xl mx-auto space-y-16 relative z-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-item-open w-full space-y-5 group"
            >
              {/* Image Preview with GlareHover */}
              <GlareHover
                width="100%"
                height="100%"
                background="#D5CCCD"
                borderRadius="1rem"
                borderColor="#9FB2C8"
                glareColor="#9FB2C8"
                glareOpacity={0.4}
                glareAngle={-30}
                glareSize={250}
                transitionDuration={750}
                className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#9FB2C8] bg-[#D5CCCD] shadow-sm transition-all duration-500 group-hover:scale-[1.015] group-hover:shadow-md"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Pill Tag & GitHub trigger */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#291B48]/90 backdrop-blur-xs text-[#D5CCCD] text-xs font-black tracking-wider uppercase border border-[#9FB2C8]/40 z-10">
                  {project.category}
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 p-2.5 rounded-full bg-[#291B48] text-[#D5CCCD] hover:bg-[#5E87B6] transition-colors shadow-sm flex items-center justify-center cursor-pointer z-10"
                  title="View Source on GitHub"
                >
                  <ArrowUpRight size={18} />
                </a>
              </GlareHover>

              {/* Typography Information */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-[#291B48] group-hover:text-[#5E87B6] transition-colors">
                    <RollText>{project.title}</RollText>
                  </h3>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#291B48]/60 hover:text-[#291B48] transition-colors"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github size={18} />
                  </a>
                </div>

                <p className="text-sm text-[#291B48]/75 font-normal leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODE: INDEX / LIST (Minimal Directory with Hover Bottom-Right Preview) */}
      {viewMode === "list" && (
        <div className="w-full max-w-4xl mx-auto divide-y divide-[#9FB2C8] border-y border-[#9FB2C8] relative z-10">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group flex items-center justify-between py-6 px-3 sm:px-4 hover:bg-[#291B48]/5 transition-colors gap-6"
            >
              <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#5E87B6] shrink-0">
                  {project.num}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl sm:text-2xl font-display font-black tracking-tight text-[#291B48] group-hover:text-[#5E87B6] transition-colors truncate">
                    <RollText>{project.title}</RollText>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#291B48]/70 line-clamp-1 mt-1">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center">
                <div className="w-9 h-9 rounded-full border border-[#9FB2C8] group-hover:bg-[#291B48] group-hover:border-[#291B48] group-hover:text-[#D5CCCD] flex items-center justify-center transition-all">
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Floating Bottom-Right Photo Preview on Cursor Hover with Fade In / Fade Out */}
      <AnimatePresence>
        {viewMode === "list" && hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed pointer-events-none z-50 bottom-8 right-8 w-72 sm:w-80 md:w-96 aspect-video rounded-2xl overflow-hidden border-2 border-[#291B48] bg-[#D5CCCD] shadow-[8px_8px_0_0_#291B48]"
          >
            <img
              src={hoveredProject.image}
              alt={hoveredProject.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-md bg-[#291B48]/90 text-[#D5CCCD] text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-xs">
              {hoveredProject.title}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Action */}
      <div className="w-full max-w-4xl mx-auto mt-16 sm:mt-20 pt-6 border-t border-[#9FB2C8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#291B48]/70 font-bold uppercase tracking-wider relative z-10 text-center sm:text-left">
        <span>ARCHIVED REPOSITORIES & CREATIVE EXPERIMENTS</span>
        <PressButton
          href="https://github.com/davidnfy?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          variant="plum"
          icon={<ArrowUpRight size={14} />}
        >
          EXPLORE ALL ON GITHUB
        </PressButton>
      </div>
    </section>
  )
}