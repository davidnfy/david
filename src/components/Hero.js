import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Box, Sparkles } from "lucide-react"
import GhostFibers from "./GhostFibers"
import ProfileCard from "./ProfileCard"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const titleLine1Ref = useRef(null)
  const titleLine2Ref = useRef(null)
  const titleLine3Ref = useRef(null)
  const titleLine4Ref = useRef(null)

  useEffect(() => {
    const lines = [
      titleLine1Ref.current,
      titleLine2Ref.current,
      titleLine3Ref.current,
      titleLine4Ref.current
    ]
    gsap.fromTo(
      lines,
      { y: 80, opacity: 0, rotateX: -20 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2
      }
    )
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-between px-5 sm:px-12 md:px-16 lg:px-20 xl:px-28 pt-24 sm:pt-28 pb-10 sm:pb-12 overflow-hidden bg-[#D5CCCD] text-[#291B48] select-none"
    >
      {/* Dynamic Animated Background: GhostFibers with gentle blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0, filter: "blur(1.5px)" }}>
        <GhostFibers
          lineColor="#291B48"
          glowColor="#5E87B6"
          backdropColor="#D5CCCD"
          lightMode={true}
          speed={0.2}
          scale={1.4}
          rotation={0}
          rotationSpeed={0.25}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.6}
          brightness={2}
          blueBoost={1.25}
          vignette={0.4}
          grain={0.04}
          dpr={1}
          className="w-full h-full"
        />
      </div>

      {/* Tech Dot-Grid Overlay for Tactile Texture */}
      <div className="absolute inset-0 tech-dot-grid opacity-30 pointer-events-none" style={{ zIndex: 1 }} />


      {/* Main Hero Content */}
      <div className="hero-animate w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-6 sm:py-8 z-10">
        
        {}
        <div className="lg:col-span-8 space-y-6">
          <div className="perspective-1000 space-y-1">
            {}
            <div className="overflow-hidden flex items-center gap-4">
              <h1
                ref={titleLine1Ref}
                className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-display font-black tracking-tight leading-[0.95] text-[#291B48] uppercase"
              >
                Crafting
              </h1>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                className="hidden xl:flex w-10 h-10 rounded-2xl bg-[#D5CCCD] border border-[#9FB2C8] items-center justify-center text-[#291B48] shadow-xs"
              >
                <Box size={20} />
              </motion.div>
            </div>

            {/* Line 2: empathetic (Instrument Serif Italic) */}
            <div className="overflow-hidden py-1">
              <h1
                ref={titleLine2Ref}
                className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-latin italic font-normal tracking-tight leading-none text-[#5E87B6] select-none"
              >
                empathetic
              </h1>
            </div>

            {/* Line 3: digital (Instrument Serif Italic) */}
            <div className="overflow-hidden py-1">
              <h1
                ref={titleLine3Ref}
                className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-latin italic font-normal tracking-tight leading-none text-[#5E87B6] select-none"
              >
                digital
              </h1>
            </div>

            {/* Line 4: experiences. */}
            <div className="overflow-hidden">
              <h1
                ref={titleLine4Ref}
                className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-display font-black tracking-tight leading-[0.95] text-[#291B48] uppercase"
              >
                experiences<span className="text-[#9FB2C8]">.</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <span className="font-signature text-3xl sm:text-4xl text-[#5E87B6] select-none -rotate-2">
              David Nafisy
            </span>
            <span className="h-px w-10 bg-[#9FB2C8]" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#291B48]/60 uppercase">
              DIGITAL SIGNATURE
            </span>
          </div>

          <p className="max-w-2xl text-base sm:text-lg text-[#291B48]/85 font-sans leading-relaxed">
            I'm <strong className="text-[#291B48] font-black">David Nafisy</strong> — engineering software systems and interactive 3D spatial web environments with precision and tactile responsiveness.
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs font-mono font-bold tracking-widest uppercase text-[#5E87B6]">
            <Sparkles size={16} className="text-[#5E87B6]" />
            <span>MINIMALIST 3D ARCHITECTURE</span>
          </div>
        </div>

        {}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <ProfileCard
            name="David Nafisy"
            title="Software Engineer"
            handle="davidnfy"
            status="dn"
            contactText="Contact Me"
            avatarUrl="/img/3.png"
            miniAvatarUrl="/img/david1.png"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => {
              const el = document.querySelector("#contact")
              if (el) el.scrollIntoView({ behavior: "smooth" })
            }}
            behindGlowEnabled={true}
            behindGlowColor="rgba(255, 255, 255, 0.68)"
            innerGradient="linear-gradient(145deg, rgba(41, 27, 72, 0.95) 0%, rgba(94, 135, 182, 0.38) 100%)"
          />
        </div>

      </div>

      {}
      <div className="hero-animate w-full border-t border-[#9FB2C8] pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-[#291B48]/70 font-bold tracking-wider z-10 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#5E87B6] rounded-full" />
          <span>SOFTWARE ENGINEER</span>
        </div>
        <div className="flex items-center gap-6 uppercase text-[11px] text-[#291B48]">
          <span>•</span>
          <span className="text-[#5E87B6]">East Java</span>
          <span>•</span>
          <span className="text-[#9FB2C8]">MALANG</span>
        </div>
      </div>
    </section>
  )
}