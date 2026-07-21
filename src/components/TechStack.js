import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    label: "Languages",
    items: [
      { name: "HTML5", icon: "html5", color: "#E34F26" },
      { name: "CSS3", icon: "css3", color: "#1572B6", customUrl: "https://api.iconify.design/logos:css-3.svg" },
      { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
      { name: "PHP", icon: "php", color: "#8993BE" },
      { name: "Python", icon: "python", color: "#3776AB" },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "Next.js", icon: "nextdotjs", color: "#888888" },
      { name: "Node.js", icon: "nodedotjs", color: "#339933" },
      { name: "Laravel", icon: "laravel", color: "#FF2D20" },
      { name: "CodeIgniter", icon: "codeigniter", color: "#EF4223" },
      { name: "Tailwind", icon: "tailwindcss", color: "#06B6D4" },
      { name: "Bootstrap", icon: "bootstrap", color: "#7952B3" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "MySQL", icon: "mysql", color: "#4479A1" },
      { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git", icon: "git", color: "#F05032" },
      { name: "GitHub", icon: "github", color: "#888888" },
      { name: "VS Code", icon: "visualstudiocode", color: "#007ACC", customUrl: "https://api.iconify.design/logos:visual-studio-code.svg" },
      { name: "Figma", icon: "figma", color: "#F24E1E" },
      { name: "Postman", icon: "postman", color: "#FF6C37" },
      { name: "Vercel", icon: "vercel", color: "#888888" },
      { name: "Netlify", icon: "netlify", color: "#00C7B7" },
    ],
  },
]

const stack = categories.flatMap(c => c.items)
const halfIndex = Math.ceil(stack.length / 2)
const row1 = stack.slice(0, halfIndex)
const row2 = stack.slice(halfIndex)

function TechItemCard({ tech }) {
  const iconUrl = tech.customUrl || `https://cdn.simpleicons.org/${tech.icon}`

  return (
    <div 
      className="w-16 h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur-md rounded-2xl border border-black/5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center p-3.5 md:p-4 group flex-shrink-0 select-none cursor-pointer"
      title={tech.name}
    >
      <img
        src={iconUrl}
        alt={tech.name}
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        referrerPolicy="no-referrer"
        draggable={false}
      />
    </div>
  )
}

export default function TechStack() {
  const marquee1Ref = useRef(null)
  const marquee2Ref = useRef(null)

  useEffect(() => {
    const tween1 = gsap.to(marquee1Ref.current, {
      xPercent: -50,
      repeat: -1,
      duration: 35,
      ease: "none"
    })

    const tween2 = gsap.fromTo(marquee2Ref.current,
      { xPercent: -50 },
      {
        xPercent: 0,
        repeat: -1,
        duration: 35,
        ease: "none"
      }
    )

    let scrollSpeedTween
    const trigger = ScrollTrigger.create({
      trigger: "#stack",
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity())
        if (velocity > 15) {
          const targetTimeScale = 1 + velocity * 0.002
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

  // Duplicate items 4 times to ensure seamless infinite looping on any screen width
  const row1Repeated = [...row1, ...row1, ...row1, ...row1]
  const row2Repeated = [...row2, ...row2, ...row2, ...row2]

  return (
    <section id="stack" className="py-24 overflow-x-hidden relative">
      <div className="max-w-7xl mx-auto px-8 md:px-24 mb-16 space-y-4">
        <h2 className="text-sm font-black uppercase tracking-[0.4em] opacity-30">
          Tech & Tools
        </h2>
      </div>

      {/* 2-Row Running Marquee of Tech Icons */}
      <div className="space-y-6 select-none relative">
        
        {/* Row 1: Leftward Marquee */}
        <div className="w-full overflow-hidden flex relative">
          <div
            ref={marquee1Ref}
            className="flex gap-6 whitespace-nowrap py-2"
            style={{ width: "max-content" }}
          >
            {row1Repeated.map((tech, idx) => (
              <TechItemCard key={`r1-${tech.name}-${idx}`} tech={tech} />
            ))}
          </div>
        </div>

        {/* Row 2: Rightward Marquee */}
        <div className="w-full overflow-hidden flex relative">
          <div
            ref={marquee2Ref}
            className="flex gap-6 whitespace-nowrap py-2"
            style={{ width: "max-content" }}
          >
            {row2Repeated.map((tech, idx) => (
              <TechItemCard key={`r2-${tech.name}-${idx}`} tech={tech} />
            ))}
          </div>
        </div>

        {/* Gradient edge masks for smooth fade effect on sides */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#f5f5ff] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#f5f5ff] to-transparent pointer-events-none z-10" />

      </div>
    </section>
  )
}