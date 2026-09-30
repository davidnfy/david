import { useEffect, useRef } from "react"
import * as THREE from "three"
  
export default function AcademicCanvas3D({ className = "", style = {} }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let animationFrameId
    const scene = new THREE.Scene()

    const width = container.clientWidth || window.innerWidth || 1
    const height = container.clientHeight || window.innerHeight || 1

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 9.5)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25))
    container.appendChild(renderer.domElement)

    // Palette Colors
    const COLOR_PLUM = 0x291B48
    const COLOR_BLUSH = 0xD5CCCD
    const COLOR_AZURE = 0x5E87B6
    const COLOR_CLOUD = 0x9FB2C8

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(COLOR_BLUSH, 1.5)
    scene.add(ambientLight)

    const dirLight1 = new THREE.DirectionalLight(COLOR_CLOUD, 1.6)
    dirLight1.position.set(5, 8, 6)
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(COLOR_AZURE, 1.2)
    dirLight2.position.set(-6, -4, 4)
    scene.add(dirLight2)

    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    const planetGroup = new THREE.Group()
    planetGroup.position.set(0, -0.3, 0)
    mainGroup.add(planetGroup)

    // Soft translucent inner sphere
    const sphereGeo = new THREE.SphereGeometry(1.5, 36, 36)
    const sphereMat = new THREE.MeshPhongMaterial({
      color: COLOR_AZURE,
      specular: COLOR_CLOUD,
      shininess: 30,
      transparent: true,
      opacity: 0.28
    })
    const planet = new THREE.Mesh(sphereGeo, sphereMat)
    planetGroup.add(planet)

    // Delicate wireframe outer shell
    const wireGeo = new THREE.SphereGeometry(1.52, 24, 24)
    const wireMat = new THREE.MeshBasicMaterial({
      color: COLOR_CLOUD,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    })
    const wireShell = new THREE.Mesh(wireGeo, wireMat)
    planetGroup.add(wireShell)

    // -------------------------------------------------------------
    // 2. Three Orbital Rings around Planet Equator (Translucent)
    // -------------------------------------------------------------
    const ringsGroup = new THREE.Group()
    ringsGroup.position.set(0, -0.3, 0)
    mainGroup.add(ringsGroup)

    const ringMat1 = new THREE.MeshPhongMaterial({
      color: COLOR_AZURE,
      specular: COLOR_CLOUD,
      shininess: 60,
      transparent: true,
      opacity: 0.38
    })
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.03, 16, 120), ringMat1)
    ring1.rotation.x = Math.PI / 2.3
    ring1.rotation.y = 0.15
    ringsGroup.add(ring1)

    const ringMat2 = new THREE.MeshPhongMaterial({
      color: COLOR_CLOUD,
      specular: COLOR_AZURE,
      shininess: 50,
      transparent: true,
      opacity: 0.35
    })
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.025, 16, 120), ringMat2)
    ring2.rotation.x = Math.PI / 2.45
    ring2.rotation.y = -0.1
    ringsGroup.add(ring2)

    const ringMat3 = new THREE.MeshPhongMaterial({
      color: COLOR_PLUM,
      specular: COLOR_AZURE,
      shininess: 40,
      transparent: true,
      opacity: 0.3
    })
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.02, 16, 120), ringMat3)
    ring3.rotation.x = Math.PI / 2.6
    ring3.rotation.z = 0.2
    ringsGroup.add(ring3)

    // -------------------------------------------------------------
    // 3. 3D Graduation Cap (Topi Toga) atop the Planet (Translucent)
    // -------------------------------------------------------------
    const capGroup = new THREE.Group()
    capGroup.position.set(0, 1.8, 0)
    mainGroup.add(capGroup)

    // 3a. Cap Skull Base
    const capBaseGeo = new THREE.CylinderGeometry(0.55, 0.72, 0.45, 32)
    const capBaseMat = new THREE.MeshPhongMaterial({
      color: COLOR_PLUM,
      specular: COLOR_AZURE,
      shininess: 35,
      transparent: true,
      opacity: 0.45
    })
    const capBase = new THREE.Mesh(capBaseGeo, capBaseMat)
    capBase.position.set(0, -0.1, 0)
    capGroup.add(capBase)

    // 3b. Mortarboard (Square Diamond Top)
    const boardGeo = new THREE.BoxGeometry(1.85, 0.06, 1.85)
    const boardMat = new THREE.MeshPhongMaterial({
      color: COLOR_PLUM,
      specular: COLOR_CLOUD,
      shininess: 45,
      transparent: true,
      opacity: 0.5
    })
    const mortarboard = new THREE.Mesh(boardGeo, boardMat)
    mortarboard.position.set(0, 0.16, 0)
    mortarboard.rotation.y = Math.PI / 4
    mortarboard.rotation.x = 0.22
    capGroup.add(mortarboard)

    // 3c. Mortarboard Center Button
    const buttonGeo = new THREE.SphereGeometry(0.08, 16, 16)
    const buttonMat = new THREE.MeshPhongMaterial({
      color: COLOR_AZURE,
      specular: COLOR_CLOUD,
      shininess: 80,
      transparent: true,
      opacity: 0.6
    })
    const button = new THREE.Mesh(buttonGeo, buttonMat)
    button.position.set(0, 0.22, 0)
    capGroup.add(button)

    // 3d. Hanging Tassel String & Bead
    const tasselGroup = new THREE.Group()
    const stringGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.75, 8)
    const stringMat = new THREE.MeshPhongMaterial({
      color: COLOR_CLOUD,
      shininess: 20,
      transparent: true,
      opacity: 0.5
    })
    const string = new THREE.Mesh(stringGeo, stringMat)
    string.position.set(0, -0.35, 0)
    tasselGroup.add(string)

    const beadGeo = new THREE.SphereGeometry(0.065, 12, 12)
    const beadMat = new THREE.MeshPhongMaterial({
      color: COLOR_AZURE,
      specular: COLOR_CLOUD,
      shininess: 70,
      transparent: true,
      opacity: 0.6
    })
    const bead = new THREE.Mesh(beadGeo, beadMat)
    bead.position.set(0, -0.72, 0)
    tasselGroup.add(bead)

    tasselGroup.position.set(0, 0.15, 0.75)
    capGroup.add(tasselGroup)

    // -------------------------------------------------------------
    // 4. Surrounding Geometric Objects (Translucent / Pudar)
    // -------------------------------------------------------------
    const orbitObjects = []
    const debrisGroup = new THREE.Group()
    mainGroup.add(debrisGroup)

    // 4a. Top-Left Polyhedron (Icosahedron)
    const topIcoGeo = new THREE.IcosahedronGeometry(0.42, 0)
    const topIcoMat = new THREE.MeshPhongMaterial({
      color: COLOR_CLOUD,
      flatShading: true,
      specular: COLOR_AZURE,
      shininess: 40,
      transparent: true,
      opacity: 0.35
    })
    const topIco = new THREE.Mesh(topIcoGeo, topIcoMat)
    topIco.position.set(-2.5, 2.5, -0.5)
    topIco.userData = { speedX: 0.015, speedY: 0.02, floatPhase: 0 }
    debrisGroup.add(topIco)
    orbitObjects.push(topIco)

    // 4b. Top-Right Rotated Octahedron / Cube
    const topOctGeo = new THREE.OctahedronGeometry(0.38, 0)
    const topOctMat = new THREE.MeshPhongMaterial({
      color: COLOR_PLUM,
      flatShading: true,
      specular: COLOR_CLOUD,
      shininess: 40,
      transparent: true,
      opacity: 0.32
    })
    const topOct = new THREE.Mesh(topOctGeo, topOctMat)
    topOct.position.set(2.4, 2.1, 0.2)
    topOct.userData = { speedX: -0.02, speedY: 0.015, floatPhase: 1.5 }
    debrisGroup.add(topOct)
    orbitObjects.push(topOct)

    // 4c. Middle-Right Polyhedron (Dodecahedron)
    const midDodecGeo = new THREE.DodecahedronGeometry(0.45, 0)
    const midDodecMat = new THREE.MeshPhongMaterial({
      color: COLOR_AZURE,
      flatShading: true,
      specular: COLOR_CLOUD,
      shininess: 45,
      transparent: true,
      opacity: 0.35
    })
    const midDodec = new THREE.Mesh(midDodecGeo, midDodecMat)
    midDodec.position.set(2.9, 0.3, -0.4)
    midDodec.userData = { speedX: 0.01, speedY: -0.018, floatPhase: 3.0 }
    debrisGroup.add(midDodec)
    orbitObjects.push(midDodec)

    // 4d. Bottom-Right Mini Octahedron
    const btmOctGeo = new THREE.OctahedronGeometry(0.26, 0)
    const btmOctMat = new THREE.MeshPhongMaterial({
      color: COLOR_CLOUD,
      flatShading: true,
      specular: COLOR_AZURE,
      shininess: 30,
      transparent: true,
      opacity: 0.32
    })
    const btmOct = new THREE.Mesh(btmOctGeo, btmOctMat)
    btmOct.position.set(2.8, -0.8, 0.4)
    btmOct.userData = { speedX: 0.025, speedY: 0.01, floatPhase: 4.2 }
    debrisGroup.add(btmOct)
    orbitObjects.push(btmOct)

    // 4e. Bottom-Right Mini Saturn Disc with Ring
    const miniSaturnGroup = new THREE.Group()
    miniSaturnGroup.position.set(1.6, -1.9, 0.2)
    const discGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.12, 24)
    const discMat = new THREE.MeshPhongMaterial({
      color: COLOR_PLUM,
      specular: COLOR_CLOUD,
      shininess: 35,
      transparent: true,
      opacity: 0.35
    })
    const disc = new THREE.Mesh(discGeo, discMat)
    miniSaturnGroup.add(disc)

    const miniRingGeo = new THREE.TorusGeometry(0.72, 0.03, 12, 48)
    const miniRingMat = new THREE.MeshPhongMaterial({
      color: COLOR_AZURE,
      specular: COLOR_CLOUD,
      shininess: 60,
      transparent: true,
      opacity: 0.38
    })
    const miniRing = new THREE.Mesh(miniRingGeo, miniRingMat)
    miniRing.rotation.x = Math.PI / 2
    miniSaturnGroup.add(miniRing)
    miniSaturnGroup.userData = { speedX: 0.008, speedY: 0.018, floatPhase: 2.1 }
    debrisGroup.add(miniSaturnGroup)
    orbitObjects.push(miniSaturnGroup)

    // 4f. Bottom Center-Right Tetrahedron (Pyramid)
    const tetGeo = new THREE.TetrahedronGeometry(0.4, 0)
    const tetMat = new THREE.MeshPhongMaterial({
      color: COLOR_AZURE,
      flatShading: true,
      specular: COLOR_CLOUD,
      shininess: 40,
      transparent: true,
      opacity: 0.35
    })
    const tet = new THREE.Mesh(tetGeo, tetMat)
    tet.position.set(0.9, -1.6, 0.5)
    tet.userData = { speedX: -0.012, speedY: 0.015, floatPhase: 0.8 }
    debrisGroup.add(tet)
    orbitObjects.push(tet)

    // 4g. Bottom Center-Left Cube
    const cube1Geo = new THREE.BoxGeometry(0.42, 0.42, 0.42)
    const cube1Mat = new THREE.MeshPhongMaterial({
      color: COLOR_PLUM,
      flatShading: true,
      specular: COLOR_CLOUD,
      shininess: 40,
      transparent: true,
      opacity: 0.32
    })
    const cube1 = new THREE.Mesh(cube1Geo, cube1Mat)
    cube1.position.set(-0.7, -1.7, 0.3)
    cube1.userData = { speedX: 0.018, speedY: -0.015, floatPhase: 3.5 }
    debrisGroup.add(cube1)
    orbitObjects.push(cube1)

    // 4h. Bottom-Left Cube
    const cube2Geo = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    const cube2Mat = new THREE.MeshPhongMaterial({
      color: COLOR_PLUM,
      flatShading: true,
      specular: COLOR_AZURE,
      shininess: 40,
      transparent: true,
      opacity: 0.32
    })
    const cube2 = new THREE.Mesh(cube2Geo, cube2Mat)
    cube2.position.set(-2.0, -2.1, 0.1)
    cube2.userData = { speedX: -0.015, speedY: 0.02, floatPhase: 1.2 }
    debrisGroup.add(cube2)
    orbitObjects.push(cube2)

    // -------------------------------------------------------------
    // 5. Starfield / Floating Points
    // -------------------------------------------------------------
    const starCount = 140
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 16
      starPositions[i + 1] = (Math.random() - 0.5) * 14
      starPositions[i + 2] = (Math.random() - 0.5) * 10
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
    const starMat = new THREE.PointsMaterial({
      color: COLOR_CLOUD,
      size: 0.06,
      transparent: true,
      opacity: 0.4
    })
    const starfield = new THREE.Points(starGeo, starMat)
    mainGroup.add(starfield)

    // -------------------------------------------------------------
    // Interactive Parallax
    // -------------------------------------------------------------
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetX = x * 0.6
      targetY = y * 0.6
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })

    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    let isVisible = true
    const clock = new THREE.Clock()

    const animate = () => {
      if (!isVisible) {
        animationFrameId = null
        return
      }
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse follow
      currentX += (targetX - currentX) * 0.05
      currentY += (targetY - currentY) * 0.05
      mainGroup.rotation.y = currentX * 0.45
      mainGroup.rotation.x = -currentY * 0.45

      // Planet slow rotation
      planetGroup.rotation.y = elapsedTime * 0.12

      // Orbital rings rotation
      ring1.rotation.z = elapsedTime * 0.15
      ring2.rotation.z = -elapsedTime * 0.18
      ring3.rotation.z = elapsedTime * 0.08

      // Cap gentle levitation / zero-gravity bobbing
      capGroup.position.y = 1.8 + Math.sin(elapsedTime * 1.5) * 0.08
      capGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.06
      tasselGroup.rotation.z = Math.sin(elapsedTime * 2.2) * 0.12

      // Surrounding debris floating & rotation
      orbitObjects.forEach((obj) => {
        obj.rotation.x += obj.userData.speedX
        obj.rotation.y += obj.userData.speedY
        const phase = obj.userData.floatPhase
        obj.position.y += Math.sin(elapsedTime * 1.2 + phase) * 0.003
      })

      // Starfield subtle rotation
      starfield.rotation.y = elapsedTime * 0.02

      renderer.render(scene, camera)
    }

    // IntersectionObserver to pause rendering when offscreen
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible && !animationFrameId) {
          clock.start()
          animate()
        }
      },
      { threshold: 0.05 }
    )
    io.observe(container)

    animate()

    return () => {
      io.disconnect()
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      window.removeEventListener("pointermove", onPointerMove)
      ro.disconnect()
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement)
      }

      // Dispose geometries & materials
      sphereGeo.dispose()
      sphereMat.dispose()
      wireGeo.dispose()
      wireMat.dispose()
      ring1.geometry.dispose()
      ringMat1.dispose()
      ring2.geometry.dispose()
      ringMat2.dispose()
      ring3.geometry.dispose()
      ringMat3.dispose()
      capBaseGeo.dispose()
      capBaseMat.dispose()
      boardGeo.dispose()
      boardMat.dispose()
      buttonGeo.dispose()
      buttonMat.dispose()
      stringGeo.dispose()
      stringMat.dispose()
      beadGeo.dispose()
      beadMat.dispose()
      topIcoGeo.dispose()
      topIcoMat.dispose()
      topOctGeo.dispose()
      topOctMat.dispose()
      midDodecGeo.dispose()
      midDodecMat.dispose()
      btmOctGeo.dispose()
      btmOctMat.dispose()
      discGeo.dispose()
      discMat.dispose()
      miniRingGeo.dispose()
      miniRingMat.dispose()
      tetGeo.dispose()
      tetMat.dispose()
      cube1Geo.dispose()
      cube1Mat.dispose()
      cube2Geo.dispose()
      cube2Mat.dispose()
      starGeo.dispose()
      starMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={`pointer-events-none select-none ${className}`}
      style={{ zIndex: 0, ...style }}
      aria-hidden="true"
    />
  )
}
