export function hasWebGL(webgl2 = false) {
  try {
    const canvas = document.createElement("canvas")
    const gl = webgl2
      ? canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false })
      : canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false }) ||
        canvas.getContext("experimental-webgl", { failIfMajorPerformanceCaveat: false })
    return Boolean(gl)
  } catch {
    return false
  }
}

export function getSafePixelRatio(max = 1.25) {
  const dpr = window.devicePixelRatio || 1
  const isCoarse = window.matchMedia("(pointer: coarse)").matches
  return Math.min(dpr, isCoarse ? 1 : max)
}

export function createSafeThreeRenderer(WebGLRenderer, extra = {}) {
  try {
    return new WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
      failIfMajorPerformanceCaveat: false,
      stencil: false,
      depth: true,
      ...extra
    })
  } catch (error) {
    console.warn("WebGL renderer unavailable:", error)
    return null
  }
}
