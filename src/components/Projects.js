import { useState, useEffect, useRef } from "react"
import { ArrowUpRight, Github, FolderGit2 } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import GlareHover from "./GlareHover"

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const itemsContainerRef = useRef(null)

  const projects = [
    {
      id: 1,
      title: "Church Management System",
      category: "FULL-STACK",
      description: "Church attendance, member tracking, and service management system with relational database architecture.",
      image: "/img/absen-gereja.png",
      githubUrl: "https://github.com/davidnfy/absen-gereja",
    },
    {
      id: 2,
      title: "Pawtify",
      category: "APPLICATION",
      description: "Pet management application for animal health logs, schedules, and vaccination records.",
      image: "/img/pawtify.png",
      githubUrl: "https://github.com/davidnfy/animals-organizer-data",
    },
    {
      id: 3,
      title: "Dompetku",
      category: "FINTECH",
      description: "Personal finance and expense tracker featuring transaction history and cashflow insights.",
      image: "/img/dompetku.png",
      githubUrl: "https://github.com/davidnfy/DompetKu",
    },
    {
      id: 4,
      title: "Todo List Pro",
      category: "PRODUCTIVITY",
      description: "Task manager with local state persistence, prioritized scheduling, and intuitive filtering.",
      image: "/img/todo-list.png",
      githubUrl: "https://github.com/davidnfy/todo-list-app",
    },
    {
      id: 5,
      title: "Website Profile Showcase",
      category: "CREATIVE WEB",
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
        { opacity: 0, y: 60 },
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

    // Prominent alternating slide animation (left-to-center & right-to-center)
    const items = itemsContainerRef.current?.querySelectorAll(".project-item-open")
    if (items) {
      items.forEach((item, idx) => {
        const isLeft = idx % 2 === 0
        const fromX = isLeft ? -130 : 130
        const fromRotateY = isLeft ? -7 : 7

        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: fromX,
            scale: 0.92,
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
              start: "top 82%",
              end: "bottom 18%",
              toggleActions: "play reverse play reverse"
            }
          }
        )
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger && sectionRef.current?.contains(t.trigger)) {
          t.kill()
        }
      })
    }
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-32 px-5 sm:px-12 md:px-16 lg:px-20 xl:px-28 bg-[#D5CCCD] text-[#291B48] overflow-hidden border-t border-[#9FB2C8]"
    >
      {/* Background solid tech dot grid */}
      <div className="absolute inset-0 tech-dot-grid opacity-40 pointer-events-none" />

      {/* Section Header */}
      <div ref={headerRef} className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-14 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[#5E87B6]">
          </div>
          <h2 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-[#291B48] uppercase">
            FEATURED <span className="text-[#5E87B6]">PROJECTS.</span>
          </h2>
        </div>

        <p className="max-w-md text-base sm:text-lg text-[#291B48]/80 font-latin italic leading-relaxed">
          Open spatial gallery. Clean engineering artifacts.
        </p>
      </div>

      {/* Single Column Gallery with Alternating Scroll Slide & GlareHover */}
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
              className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#9FB2C8] bg-[#D5CCCD] shadow-sm transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-md"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* GitHub trigger */}
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
                  {project.title}
                </h3>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#291B48]/60 hover:text-[#291B48] transition-colors"
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

      {/* Footer Link */}
      <div className="w-full max-w-4xl mx-auto mt-16 sm:mt-20 pt-6 border-t border-[#9FB2C8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#291B48]/70 font-bold uppercase tracking-wider relative z-10 text-center sm:text-left">
        <a
          href="https://github.com/davidnfy?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[#291B48] hover:text-[#5E87B6] transition-colors"
        >
          <span>MY GITHUB</span>
          <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  )
}