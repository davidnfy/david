import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Wrench } from "lucide-react"
import ScaleInTitle from "./fx/ScaleInTitle"
import ParallaxSticker from "./fx/ParallaxSticker"
import CrencyFlipCard from "./fx/CrencyFlipCard"

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    label: "Languages",
    items: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3", customUrl: "https://api.iconify.design/logos:css-3.svg" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "PHP", icon: "php" },
      { name: "Python", icon: "python" },
    ],
  },
  {
    label: "Frameworks & 3D",
    items: [
      { name: "React", icon: "react" },
      { name: "Three.js", icon: "threedotjs" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Laravel", icon: "laravel" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Framer Motion", icon: "framer" },
    ],
  },
  {
    label: "Databases & Cloud",
    items: [
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Vercel", icon: "vercel" },
      { name: "Netlify", icon: "netlify" },
    ],
  },
  {
    label: "Tools & Design",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "VS Code", icon: "visualstudiocode", customUrl: "https://api.iconify.design/logos:visual-studio-code.svg" },
      { name: "Figma", icon: "figma" },
      { name: "Postman", icon: "postman" },
    ],
  },
]

const stack = categories.flatMap(c => c.items)
const halfIndex = Math.ceil(stack.length / 2)
const row1 = stack.slice(0, halfIndex)
const row2 = stack.slice(halfIndex)

function TechItemMinimal({ tech }) {
  const iconUrl = tech.customUrl || `https://cdn.simpleicons.org/${tech.icon}`

  return (
    <div 
      className="group relative flex items-center gap-3 px-4 py-2.5 bg-[#D5CCCD] rounded-full border border-[#9FB2C8] hover:border-[#291B48] hover:scale-105 transition-all duration-300 flex-shrink-0 select-none cursor-pointer shadow-xs"
      title={tech.name}
    >
      <div className="w-6 h-6 flex items-center justify-center shrink-0">
        <img
          src={iconUrl}
          alt={tech.name}
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          draggable={false}
        />
      </div>

      <span className="text-xs font-bold text-[#291B48] tracking-tight group-hover:text-[#5E87B6] transition-colors">
        {tech.name}
      </span>
    </div>
  )
}

export default function TechStack() {
  const marquee1Ref = useRef(null)
  const marquee2Ref = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    // Header scroll animation
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

    const tween1 = gsap.to(marquee1Ref.current, {
      xPercent: -50,
      repeat: -1,
      duration: 32,
      ease: "none"
    })

    const tween2 = gsap.fromTo(marquee2Ref.current,
      { xPercent: -50 },
      {
        xPercent: 0,
        repeat: -1,
        duration: 32,
        ease: "none"
      }
    )

    let scrollSpeedTween
    const trigger = ScrollTrigger.create({
      trigger: "#stack",
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => {
        if (self.isActive) {
          tween1.play()
          tween2.play()
        } else {
          tween1.pause()
          tween2.pause()
        }
      },
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity())
        if (velocity > 15) {
          const targetTimeScale = 1 + velocity * 0.0025
          gsap.to([tween1, tween2], {
            timeScale: targetTimeScale,
            duration: 0.3,
            overwrite: "auto"
          })

          if (scrollSpeedTween) scrollSpeedTween.kill()
          scrollSpeedTween = gsap.delayedCall(0.4, () => {
            gsap.to([tween1, tween2], {
              timeScale: 1,
              duration: 1.2,
              overwrite: "auto"
            })
          })
        }
      }
    })

    return () => {
      tween1.kill()
      tween2.kill()
      trigger.kill()
      if (scrollSpeedTween) scrollSpeedTween.kill()
    }
  }, [])

  const row1Repeated = [...row1, ...row1, ...row1, ...row1]
  const row2Repeated = [...row2, ...row2, ...row2, ...row2]

  return (
    <section id="stack" className="relative w-full py-28 bg-[#D5CCCD] border-t border-[#9FB2C8] overflow-hidden">
      <div className="absolute inset-0 tech-dot-grid opacity-30 pointer-events-none" />

      {/* Floating Badges */}
      <ParallaxSticker
        variant="plum"
        from={{ y: -25, rotate: -5 }}
        to={{ y: 35, rotate: 5 }}
        className="top-12 right-10 hidden sm:block"
      >
        ✦ 60 FPS ENGINE
      </ParallaxSticker>

      {/* Header */}
      <div ref={headerRef} className="w-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 mb-14 space-y-3 relative z-10">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[#5E87B6]">
          <Wrench size={16} />
          <span>TECH & TOOLS</span>
        </div>
        <ScaleInTitle
          as="h2"
          from={1.5}
          origin="left center"
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#291B48] uppercase"
        >
          TECH <span className="text-[#5E87B6]">ECOSYSTEM.</span>
        </ScaleInTitle>
        <p className="max-w-xl text-[#291B48]/70 text-sm sm:text-base font-medium">
          Modern languages, 3D WebGL graphics, full-stack frameworks, and databases.
        </p>
      </div>

      {/* Marquee Rows */}
      <div className="space-y-4 select-none relative z-10 w-full">
        <div className="w-full overflow-hidden flex relative">
          <div
            ref={marquee1Ref}
            className="flex gap-3 whitespace-nowrap py-1"
            style={{ width: "max-content" }}
          >
            {row1Repeated.map((tech, idx) => (
              <TechItemMinimal key={`r1-${tech.name}-${idx}`} tech={tech} />
            ))}
          </div>
        </div>

        <div className="w-full overflow-hidden flex relative">
          <div
            ref={marquee2Ref}
            className="flex gap-3 whitespace-nowrap py-1"
            style={{ width: "max-content" }}
          >
            {row2Repeated.map((tech, idx) => (
              <TechItemMinimal key={`r2-${tech.name}-${idx}`} tech={tech} />
            ))}
          </div>
        </div>
      </div>

      {/* Crency Agency-style Interactive 3D Architectural Pillars */}
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 mt-16 pt-12 border-t border-[#9FB2C8] relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-black tracking-[0.25em] text-[#5E87B6] uppercase">
              ENGINEERING CORE
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-[#291B48] uppercase mt-1">
              ARCHITECTURAL PILLARS.
            </h3>
          </div>
          <span className="text-xs text-[#291B48]/70 font-mono">
            [ HOVER OR CLICK TO INSPECT 3D BLUEPRINT ]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CrencyFlipCard
            frontBadge="STAGE 01"
            frontTag="[ 01 ]"
            frontTitle="Plan & Architect"
            backBadge="ARCHITECTURE"
            backTag="01 // PLANNING"
            backTitle="Plan & Architect"
            backDescription="Understanding client requirements, designing robust database architectures, and selecting the most efficient tech stack for scalable performance."
          />
          <CrencyFlipCard
            frontBadge="STAGE 02"
            frontTag="[ 02 ]"
            frontTitle="Code & Build"
            backBadge="DEVELOPMENT"
            backTag="02 // CODING"
            backTitle="Code & Build"
            backDescription="Writing clean, maintainable code, building responsive interfaces, and seamlessly integrating frontend logic with robust backend APIs."
          />
          <CrencyFlipCard
            frontBadge="STAGE 03"
            frontTag="[ 03 ]"
            frontTitle="Test & Deploy"
            backBadge="PRODUCTION"
            backTag="03 // DEPLOYMENT"
            backTitle="Test & Deploy"
            backDescription="Conducting comprehensive debugging, optimizing loading performance, and deploying production-ready applications via automated CI/CD pipelines."
          />
        </div>
      </div>

    </section>
  )
}