import { useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const socials = [
    { label: "GitHub", href: "https://github.com/davidnfy" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/davidnafisy/" },
    { label: "Instagram", href: "https://www.instagram.com/davidnfy/" },
    { label: "Discord", href: "https://discord.com/users/1272875106187608128" }
  ]

  const headingRef = useRef(null)
  const emailRef = useRef(null)
  const socialContainerRef = useRef(null)

  useEffect(() => {
    // 1. GSAP ScrollTrigger: heading entrance
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    )

    // 2. GSAP ScrollTrigger: email address entrance
    gsap.fromTo(emailRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: emailRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    )

    // 3. GSAP ScrollTrigger: social links staggered entrance
    const items = socialContainerRef.current.querySelectorAll(".social-link")
    gsap.fromTo(items,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: socialContainerRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    )
  }, [])

  // Magnetic hover effect
  const handleMagneticMove = (e, factor = 0.3) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, {
      x: x * factor,
      y: y * factor,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1.1, 0.4)"
    })
  }

  return (
    <footer
      id="contact"
      className="py-48 px-8 md:px-24 border-t border-black/5 relative z-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-end">
        <div className="space-y-12 text-black">
          <div
            ref={headingRef}
            className="space-y-6"
            style={{ opacity: 0 }}
          >
            <h2 className="text-sm font-black uppercase tracking-[0.4em] opacity-30">
              Contact
            </h2>
            <h3 className="text-6xl md:text-[6.5vw] font-black tracking-tighter leading-[0.9] py-2">
              Ready to <br />
              <span className="text-empathetic italic inline-block pb-2 pr-6">
                innovate?
              </span>
            </h3>
          </div>

          <div ref={emailRef} style={{ opacity: 0 }} className="inline-block">
            <a
              href="mailto:davidnafisy3@gmail.com"
              onMouseMove={(e) => handleMagneticMove(e, 0.25)}
              onMouseLeave={handleMagneticLeave}
              className="inline-block text-2xl md:text-4xl font-extrabold hover:text-indigo-400 transition-colors underline decoration-2 underline-offset-8 text-black"
            >
              davidnafisy3@gmail.com
            </a>
          </div>
        </div>

        <div className="space-y-12 md:text-right text-black">
          <div 
            ref={socialContainerRef} 
            className="flex flex-col md:items-end gap-6 text-sm font-black tracking-widest uppercase"
          >
            {socials.map(social => (
              <a
                key={social.label}
                href={social.href}
                onMouseMove={(e) => handleMagneticMove(e, 0.4)}
                onMouseLeave={handleMagneticLeave}
                className="social-link inline-flex items-center gap-2 group transition-all opacity-0 py-1.5 px-3 text-black hover:opacity-75"
                style={{ transformOrigin: "right" }}
              >
                {social.label}{" "}
                <ArrowUpRight
                  size={14}
                  className="opacity-40 group-hover:opacity-100 transition-opacity"
                />
              </a>
            ))}
          </div>

          <div className="pt-24 text-[10px] space-y-2 opacity-20 font-black tracking-[0.2em] uppercase text-black">
            <p>© 2026 DAVIDNFY — DESIGNED BY DAVID</p>
            <p>BASED IN MALANG, INDONESIA</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
