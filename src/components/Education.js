import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import anime from "animejs"

gsap.registerPlugin(ScrollTrigger)

export default function Education() {
  const education = [
    {
      school: "Vocational High School",
      period: "2024 - Present",
      description: "SMK NEGERI 5 MALANG",
      logo: "/img/smk.png"
    },
    {
      school: "Junior High School",
      period: "2021 - 2024",
      description: "SMP NEGERI 2 DAMPIT",
      logo: "/img/smp.png"
    }
  ]

  useEffect(() => {
    anime({
      targets: '.logo-pulse-ring',
      scale: [0.95, 1.45],
      opacity: [0.9, 0],
      duration: 2500,
      loop: true,
      easing: 'easeOutExpo'
    })

    anime({
      targets: '.logo-pulse-ring-2',
      scale: [0.95, 1.65],
      opacity: [0.7, 0],
      duration: 2500,
      delay: 600,
      loop: true,
      easing: 'easeOutExpo'
    })

    // 2. GSAP: Scroll reveal for each education row
    const rows = document.querySelectorAll(".education-row")
    rows.forEach((row) => {
      gsap.fromTo(row,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      )
    })
  }, [])

  return (
    <section id="education" className="py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 space-y-4">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] opacity-30">
            Education
          </h2>
          <div className="w-12 h-1 bg-black rounded-full transition-colors" />
        </div>

        <div className="space-y-24">
          {education.map((item) => (
            <div
              key={item.school}
              className="education-row grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-4"
              style={{ opacity: 0 }} // Start invisible for GSAP to reveal
            >
              <div className="md:col-span-3 text-4xl md:text-5xl font-black opacity-15 tracking-tighter">
                {item.period.split(" - ")[0]}
              </div>
              <div className="md:col-span-9 flex flex-col sm:flex-row items-start sm:items-center gap-6">

                {/* Transparent logo container */}
                <div className="relative group w-20 h-20 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center">
                  <div className="w-full h-full p-1 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110 relative z-10">
                    <img
                      src={item.logo}
                      alt={item.description}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:rotate-6 drop-shadow-md"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
                    {item.description}
                  </h3>
                  <p className="text-lg md:text-xl font-medium opacity-60 leading-relaxed">
                    {item.school}
                  </p>

                  {item.period.split(" - ")[1] !== "Present" && (
                    <div className="text-[10px] font-black tracking-[0.2em] uppercase opacity-35 pt-1">
                      Graduated {item.period.split(" - ")[1]}
                    </div>
                  )}
                  {item.period.split(" - ")[1] === "Present" && (
                    <div className="text-[10px] font-black tracking-[0.2em] uppercase text-indigo-500 pt-1 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Present</span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
