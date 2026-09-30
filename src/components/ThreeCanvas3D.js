import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ThreeCanvas3D({ className = "" }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let animationFrameId
    const scene = new THREE.Scene()

    const width = container.clientWidth || window.innerWidth || 1
    const height = container.clientHeight || window.innerHeight || 1

    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    )
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25))
    container.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const COLOR_PLUM = 0x291B48
    const COLOR_AZURE = 0x5E87B6
    const COLOR_CLOUD = 0x9FB2C8

    // 1. Central Icosahedron - Deep Plum
    const icoGeometry = new THREE.IcosahedronGeometry(1.8, 1)
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: COLOR_PLUM,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    })
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial)
    group.add(icosahedron)

    // 2. Inner Octahedron Core - Muted Azure
    const octGeometry = new THREE.OctahedronGeometry(1.0, 0)
    const octMaterial = new THREE.MeshBasicMaterial({
      color: COLOR_AZURE,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    })
    const octahedron = new THREE.Mesh(octGeometry, octMaterial)
    group.add(octahedron)

    // 3. Gyroscopic Rings
    const gyroRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.025, 16, 100),
      new THREE.MeshBasicMaterial({
        color: COLOR_PLUM,
        transparent: true,
        opacity: 0.4
      })
    )
    gyroRing1.rotation.x = Math.PI / 4
    group.add(gyroRing1)

    const gyroRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.02, 16, 100),
      new THREE.MeshBasicMaterial({
        color: COLOR_AZURE,
        transparent: true,
        opacity: 0.4
      })
    )
    gyroRing2.rotation.y = Math.PI / 3
    group.add(gyroRing2)

    const gyroRing3 = new THREE.Mesh(
      new THREE.TorusGeometry(3.8, 0.02, 16, 100),
      new THREE.MeshBasicMaterial({
        color: COLOR_CLOUD,
        transparent: true,
        opacity: 0.35
      })
    )
    gyroRing3.rotation.z = Math.PI / 6
    group.add(gyroRing3)

    // 4. Orbiting Cubes
    const cubeGroup = new THREE.Group()
    group.add(cubeGroup)
    const cubes = []
    const cubeCount = 9
    const cubeColors = [COLOR_PLUM, COLOR_AZURE, COLOR_CLOUD]

    for (let i = 0; i < cubeCount; i++) {
      const size = 0.28 + Math.random() * 0.15
      const cubeGeo = new THREE.BoxGeometry(size, size, size)
      const cubeMat = new THREE.MeshBasicMaterial({
        color: cubeColors[i % 3],
        wireframe: true,
        transparent: true,
        opacity: 0.5
      })
      const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat)

      const angle = (i / cubeCount) * Math.PI * 2
      const radius = 3.6 + (i % 3) * 0.5
      cubeMesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 1.5) * 1.8,
        Math.sin(angle) * radius
      )
      cubeMesh.userData = {
        speed: 0.4 + Math.random() * 0.4,
        rotSpeedX: 0.02 + Math.random() * 0.02,
        rotSpeedY: 0.03 + Math.random() * 0.02,
        baseAngle: angle,
        radius: radius
      }
      cubeGroup.add(cubeMesh)
      cubes.push(cubeMesh)
    }

    // 5. Starfield Points - Cloud Blue
    const pointsCount = 120
    const positions = new Float32Array(pointsCount * 3)
    for (let i = 0; i < pointsCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16
      positions[i + 1] = (Math.random() - 0.5) * 16
      positions[i + 2] = (Math.random() - 0.5) * 14
    }

    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const pointsMaterial = new THREE.PointsMaterial({
      color: COLOR_CLOUD,
      size: 0.07,
      transparent: true,
      opacity: 0.55
    })
    const starfield = new THREE.Points(pointsGeometry, pointsMaterial)
    group.add(starfield)

    // Interactive mouse positioning
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetX = x * 0.8
      targetY = y * 0.8
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })

    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      if (width === 0 || height === 0) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    let isVisible = true
    let clock = new THREE.Clock()
    const animate = () => {
      if (!isVisible) {
        animationFrameId = null
        return
      }
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()
      const delta = clock.getDelta()

      currentX += (targetX - currentX) * 0.05
      currentY += (targetY - currentY) * 0.05

      icosahedron.rotation.x = elapsedTime * 0.25
      icosahedron.rotation.y = elapsedTime * 0.35

      octahedron.rotation.x = -elapsedTime * 0.4
      octahedron.rotation.z = elapsedTime * 0.3

      gyroRing1.rotation.x += delta * 0.3
      gyroRing1.rotation.y += delta * 0.2
      gyroRing2.rotation.y -= delta * 0.25
      gyroRing2.rotation.z += delta * 0.35
      gyroRing3.rotation.z += delta * 0.15

      cubes.forEach((cube) => {
        cube.rotation.x += cube.userData.rotSpeedX
        cube.rotation.y += cube.userData.rotSpeedY
        const currentAngle = cube.userData.baseAngle + elapsedTime * cube.userData.speed * 0.3
        cube.position.x = Math.cos(currentAngle) * cube.userData.radius
        cube.position.z = Math.sin(currentAngle) * cube.userData.radius
      })

      starfield.rotation.y = elapsedTime * 0.05

      group.rotation.y = currentX * 0.7
      group.rotation.x = -currentY * 0.7

      renderer.render(scene, camera)
    }

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible && !animationFrameId) {
        clock.start()
        animate()
      }
    }, { threshold: 0.05 })
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
      icoGeometry.dispose()
      icoMaterial.dispose()
      octGeometry.dispose()
      octMaterial.dispose()
      gyroRing1.geometry.dispose()
      gyroRing1.material.dispose()
      gyroRing2.geometry.dispose()
      gyroRing2.material.dispose()
      gyroRing3.geometry.dispose()
      gyroRing3.material.dispose()
      pointsGeometry.dispose()
      pointsMaterial.dispose()
      cubes.forEach(c => {
        c.geometry.dispose()
        c.material.dispose()
      })
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={`pointer-events-none select-none ${className}`}
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  )
}
