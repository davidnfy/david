import { useEffect } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const projects = [
    {
      title: "Church Management System",
      category: "Church Management System",
      image: "/img/absen-gereja.png",
      githubUrl: "https://github.com/davidnfy/absen-gereja"
    },
    {
      title: "Pawtify",
      category: "Pet Management Application",
      image: "/img/pawtify.png",
      githubUrl: "https://github.com/davidnfy/animals-organizer-data"
    },
    {
      title: "Dompetku",
      category: "Personal Finance Management Application",
      image: "/img/dompetku.png",
      githubUrl: "https://github.com/davidnfy/DompetKu"
    },
    {
      title: "Todo List",
      category: "Productivity App",
      image: "/img/todo-list.png",
      githubUrl: "https://github.com/davidnfy/todo-list-app"
    },
    {
      title: "Website Profile",
      category: "Personal website profile",
      image: "/img/profile-web.png",
      githubUrl: "https://github.com/davidnfy/davidnafisy"
    },
  ]

  useEffect(() => {
    const cards = document.querySelectorAll(".project-card")
    cards.forEach((card, index) => {
      const isMobile = window.innerWidth < 768
      const fromLeft = index % 2 === 0
      const xOffset = fromLeft ? -120 : 120

      gsap.fromTo(card,
        {
          opacity: 0,
          y: isMobile ? 0 : 60,
          x: isMobile ? xOffset : 0,
          rotate: isMobile ? (fromLeft ? -5 : 5) : 0,
          scale: isMobile ? 0.95 : 1
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          rotate: 0,
          scale: 1,
          duration: isMobile ? 1.8 : 1.2,
          ease: isMobile ? "power4.out" : "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      )
    })

    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(card, {
      rotateX: -y * 0.08,
      rotateY: x * 0.08,
      scale: 1.025,
      boxShadow: "0 25px 60px -15px rgba(255, 255, 255, 0.15)",
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out"
    })
  }

  const handleMouseLeave = (e) => {
    const card = e.currentTarget
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
      duration: 0.6,
      ease: "power3.out"
    })
  }

  const handleClick = (url, e) => {
    e.stopPropagation()
    window.open(url, "_blank")
  }

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-[20vh] lg:py-[25vh] px-8 md:px-24 bg-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-4 text-left w-full">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] opacity-40">
              Selected Works
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter italic">
              My Projects.
            </h3>
          </div>
          <p className="max-w-xs text-sm opacity-50 text-right md:text-right text-left w-full md:w-auto">
            "Exploring the boundaries of digital interaction with a creative and
            purposeful approach."
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:gap-20">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              style={{ opacity: 0 }}
            >
              <div
                className="md:col-span-7 relative overflow-hidden rounded-2xl aspect-video cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={e => handleClick(project.githubUrl, e)}
                style={{ willChange: "transform" }}
              >
                <img
                  src={
                    project.image.startsWith("/")
                      ? project.image
                      : `https://picsum.photos/seed/${project.image}/1200/675`
                  }
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="md:col-span-5 flex justify-between items-center">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
                      {project.category}
                    </span>
                    <h4 className="text-3xl md:text-5xl font-black tracking-tighter">
                      {project.title}
                    </h4>
                  </div>
                  <div className="flex gap-3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}