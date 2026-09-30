import { useState, useEffect, useRef } from "react"
import { ArrowUpRight, Mail, Copy, Check, MessageSquare, Globe } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import anime from "animejs"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const headingRef = useRef(null)
  const socialsRef = useRef(null)

  const socials = [
    { label: "GitHub", href: "https://github.com/davidnfy", username: "@davidnfy" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/davidnafisy/", username: "David Nafisy" },
    { label: "Instagram", href: "https://www.instagram.com/davidnfy/", username: "@davidnfy" },
    { label: "Discord", href: "https://discord.com/users/1272875106187608128", username: "davidnfy" }
  ]

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("davidnafisy3@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    // Header scroll animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, x: -120 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse"
          }
        }
      )
    }

    // Socials scroll animation
    if (socialsRef.current) {
      gsap.fromTo(
        socialsRef.current,
        { opacity: 0, x: 120 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: socialsRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse"
          }
        }
      )
    }

    anime({
      targets: ".contact-dot-pulse",
      scale: [1, 1.8],
      opacity: [0.9, 0],
      duration: 1800,
      loop: true,
      easing: "easeOutQuad"
    })
  }, [])

  const handleMagneticMove = (e, factor = 0.25) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, {
      x: x * factor,
      y: y * factor,
      duration: 0.25,
      ease: "power2.out"
    })
  }

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1.2, 0.4)"
    })
  }

  return (
    <footer
      id="contact"
      className="relative w-full py-20 sm:py-28 px-5 sm:px-12 md:px-16 lg:px-20 xl:px-28 bg-[#D5CCCD] text-[#291B48] border-t border-[#9FB2C8] overflow-hidden"
    >
      <div className="absolute inset-0 tech-dot-grid opacity-30 pointer-events-none" />

      {/* Contact Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative z-10">
        
        {/* Left Col */}
        <div ref={headingRef} className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[#5E87B6]">
              <MessageSquare size={16} />
              <span>05 // INITIATE CONTACT</span>
            </div>
            <h2 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#291B48] uppercase leading-[0.9]">
              LET'S <br />
              <span className="text-[#5E87B6]">COLLABORATE.</span>
            </h2>
          </div>

          <p className="max-w-lg text-base sm:text-lg text-[#291B48]/75 font-normal leading-relaxed">
            Interested in building next-generation 3D spatial web apps or robust full-stack software systems? Drop me a direct message.
          </p>

          {/* Email */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="mailto:davidnafisy3@gmail.com"
              className="text-base xs:text-xl sm:text-2xl font-black text-[#291B48] hover:text-[#5E87B6] transition-colors underline decoration-2 underline-offset-8 break-all sm:break-normal"
            >
              davidnafisy3@gmail.com
            </a>

            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#9FB2C8] bg-[#D5CCCD] text-xs font-bold text-[#291B48] hover:border-[#291B48] transition-colors cursor-pointer"
              title="Copy Email"
            >
              {copied ? <Check size={14} className="text-[#5E87B6]" /> : <Copy size={14} />}
              <span>{copied ? "COPIED" : "COPY"}</span>
            </button>
          </div>
        </div>

        {/* Right Col: Socials */}
        <div ref={socialsRef} className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between border-b border-[#9FB2C8] pb-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#291B48]">
              CHANNELS
            </span>
            <div className="flex items-center gap-2 text-[#5E87B6] text-xs font-bold">
              <span className="relative flex h-2 w-2">
                <span className="contact-dot-pulse absolute inline-flex h-full w-full rounded-full bg-[#5E87B6] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5E87B6]" />
              </span>
              <span>AVAILABLE NOW</span>
            </div>
          </div>

          <div className="space-y-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={(e) => handleMagneticMove(e, 0.2)}
                onMouseLeave={handleMagneticLeave}
                className="flex items-center justify-between py-3 border-b border-[#9FB2C8]/60 group transition-all"
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-black tracking-widest uppercase text-[#291B48]/50 group-hover:text-[#291B48] transition-colors">
                    {social.label}
                  </span>
                  <p className="text-sm font-bold text-[#291B48] group-hover:text-[#5E87B6] transition-colors">
                    {social.username}
                  </p>
                </div>

                <div className="text-[#291B48]/40 group-hover:text-[#5E87B6] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                  <ArrowUpRight size={18} />
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="w-full mt-24 pt-6 border-t border-[#9FB2C8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#291B48]/70 font-bold uppercase tracking-widest relative z-10 gap-4">
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-[#5E87B6]" />
          <span>© 2026 DAVID NAFISY — MALANG, ID</span>
        </div>
      </div>
    </footer>
  )
}
