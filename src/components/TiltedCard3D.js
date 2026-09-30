import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function TiltedCard3D({
  children,
  className = "",
  maxTilt = 14,
  scale = 1.02,
  glare = true
}) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Smooth spring physics for rotation
  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothMouseY, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(smoothMouseX, [0, 1], [-maxTilt, maxTilt])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <div
      style={{ perspective: "1000px" }}
      className={`relative inline-block w-full ${className}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        animate={{
          scale: isHovered ? scale : 1
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full h-full relative"
      >
        {children}

        {/* 3D Specular Solid Light Reflection (No color gradient, pure crisp opacity sheen) */}
        {glare && isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl pointer-events-none bg-[#D5CCCD] border border-[#9FB2C8]/40"
            style={{
              transform: "translateZ(30px)"
            }}
          />
        )}
      </motion.div>
    </div>
  )
}
