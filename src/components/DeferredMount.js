import { useEffect, useRef, useState } from "react"

export function IdleMount({ children, timeout = 1400 }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let idleId = 0
    let timer = 0
    const enable = () => setReady(true)

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout })
    } else {
      timer = window.setTimeout(enable, Math.min(timeout, 400))
    }

    return () => {
      if (idleId && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId)
      if (timer) window.clearTimeout(timer)
    }
  }, [timeout])

  return ready ? children : null
}

export function WhenVisible({
  children,
  minHeight = "100vh",
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.05
}) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [rootMargin, threshold])

  return (
    <div ref={ref} style={show ? undefined : { minHeight }}>
      {show ? children : null}
    </div>
  )
}
