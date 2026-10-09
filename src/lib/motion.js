// Shared motion helpers: access to the global Lenis instance + capability checks.
let lenisInstance = null

export const setLenis = (lenis) => {
  lenisInstance = lenis
}

export const getLenis = () => lenisInstance

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export const isTouchDevice = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none), (pointer: coarse)").matches
