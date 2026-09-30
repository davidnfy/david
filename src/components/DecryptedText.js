import { useState, useEffect, useRef } from "react"

const CHARS = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!@#$%^&*"

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 12,
  className = "",
  revealDelay = 0
}) {
  const [displayText, setDisplayText] = useState(text)
  const isHoveredRef = useRef(false)
  const intervalRef = useRef(null)

  const scramble = () => {
    let iteration = 0
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " "
            if (index < iteration) {
              return text[index]
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join("")
      )

      if (iteration >= text.length) {
        clearInterval(intervalRef.current)
      }
      iteration += 1 / (maxIterations / text.length || 1)
    }, speed)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      scramble()
    }, revealDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(intervalRef.current)
    }
  }, [text, revealDelay])

  return (
    <span
      className={`inline-block cursor-default font-mono ${className}`}
      onMouseEnter={() => {
        if (!isHoveredRef.current) {
          isHoveredRef.current = true
          scramble()
        }
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false
      }}
    >
      {displayText}
    </span>
  )
}
