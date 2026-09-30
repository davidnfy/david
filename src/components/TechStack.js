import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Wrench } from "lucide-react"

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

      {/* Header */}
      <div ref={headerRef} className="w-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 mb-14 space-y-3 relative z-10">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[#5E87B6]">
          <Wrench size={16} />
          <span>TECH & TOOLS</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#291B48] uppercase">
          TECH <span className="text-[#5E87B6]">ECOSYSTEM.</span>
        </h2>
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

    </section>
  )
}