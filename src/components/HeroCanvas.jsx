import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Sphere, MeshDistortMaterial, Float, Stars,
  Torus, Icosahedron, MeshTransmissionMaterial,
  Environment, Sparkles as DreiSparkles,
} from '@react-three/drei'
import * as THREE from 'three'

/* ── Cursor-reactive camera ── */
function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.04
    camera.position.y += (-mouse.current.y * 0.4 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ── Central distorted sphere ── */
function CoreSphere() {
  const meshRef = useRef()
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.12
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.18
  })
  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1.35, 128, 128]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#4f46e5"
          distort={0.38}
          speed={2.5}
          roughness={0.05}
          metalness={0.9}
          emissive="#3730a3"
          emissiveIntensity={0.4}
          envMapIntensity={1.2}
        />
      </Sphere>
    </Float>
  )
}

/* ── Glass inner sphere ── */
function GlassSphere() {
  return (
    <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere args={[1.6, 64, 64]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#6366f1"
          transparent
          opacity={0.06}
          roughness={0}
          metalness={0}
          transmission={0.95}
          thickness={0.5}
          side={THREE.BackSide}
        />
      </Sphere>
    </Float>
  )
}

/* ── Energy rings ── */
function EnergyRing({ radius, speed, color, tilt, thickness = 0.012, opacity = 0.7 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * speed
  })
  return (
    <group rotation={[tilt[0], tilt[1], tilt[2]]}>
      <Torus ref={ref} args={[radius, thickness, 3, 120]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          transparent
          opacity={opacity}
          toneMapped={false}
        />
      </Torus>
    </group>
  )
}

/* ── Holographic floating panel ── */
function HoloPanel({ position, rotation, width = 1.2, height = 0.7 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.18
    ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.08
  })
  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[width, height, 1, 1]} />
        <meshPhysicalMaterial
          color="#6366f1"
          transparent
          opacity={0.08}
          roughness={0}
          metalness={0.5}
          transmission={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Border lines */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
        <lineBasicMaterial color="#818cf8" transparent opacity={0.5} />
      </lineSegments>
    </group>
  )
}

/* ── Floating icosahedron ── */
function FloatingGem({ position, color, scale, speed, wireframe = true }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.7
    ref.current.rotation.y = state.clock.elapsedTime * speed
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.35
  })
  return (
    <Icosahedron ref={ref} args={[scale, 0]} position={position}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={wireframe ? 0.6 : 0.3}
        wireframe={wireframe}
        transparent
        opacity={wireframe ? 0.65 : 0.9}
        metalness={0.8}
        roughness={0.1}
      />
    </Icosahedron>
  )
}

/* ── Particle field ── */
function ParticleField() {
  const count = 280
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#6366f1'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#ec4899'),
    ]
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [])

  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.025
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.015) * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={count} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  )
}

/* ── Ambient fog sphere ── */
function FogSphere() {
  return (
    <Sphere args={[12, 32, 32]}>
      <meshBasicMaterial
        color="#050810"
        transparent
        opacity={0.18}
        side={THREE.BackSide}
      />
    </Sphere>
  )
}

/* ── Main canvas export ── */
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <CameraRig />

      {/* Lighting */}
      <ambientLight intensity={0.25} />
      <pointLight position={[8, 8, 8]}   intensity={3}   color="#6366f1" />
      <pointLight position={[-8, -6, -6]} intensity={2}   color="#ec4899" />
      <pointLight position={[0, 10, -4]}  intensity={2.5} color="#06b6d4" />
      <spotLight
        position={[5, 8, 5]}
        angle={0.25}
        penumbra={1}
        intensity={4}
        color="#8b5cf6"
        castShadow={false}
      />

      {/* Stars */}
      <Stars radius={90} depth={60} count={2500} factor={2.5} saturation={0.6} fade speed={0.8} />

      {/* Sparkles */}
      <DreiSparkles count={60} scale={10} size={1.2} speed={0.4} color="#8b5cf6" opacity={0.6} />

      {/* Particles */}
      <ParticleField />

      {/* Core */}
      <CoreSphere />
      <GlassSphere />

      {/* Energy rings */}
      <EnergyRing radius={2.1} speed={0.5}  color="#6366f1" tilt={[Math.PI / 4, 0, 0]}          thickness={0.014} opacity={0.75} />
      <EnergyRing radius={2.7} speed={-0.35} color="#ec4899" tilt={[Math.PI / 3, 0.3, 0]}        thickness={0.01}  opacity={0.6}  />
      <EnergyRing radius={3.3} speed={0.25}  color="#06b6d4" tilt={[Math.PI / 6, -0.2, 0.1]}     thickness={0.008} opacity={0.5}  />
      <EnergyRing radius={3.9} speed={-0.18} color="#8b5cf6" tilt={[Math.PI / 2.5, 0.4, -0.2]}   thickness={0.006} opacity={0.35} />

      {/* Holographic panels */}
      <HoloPanel position={[-3.8, 1.2, -1.5]} rotation={[0.1, 0.4, 0.05]}  width={1.4} height={0.8} />
      <HoloPanel position={[3.5, -0.8, -2]}   rotation={[-0.05, -0.35, 0]} width={1.2} height={0.7} />
      <HoloPanel position={[-2.5, -2.2, 0.5]} rotation={[0.15, 0.2, -0.1]} width={1.0} height={0.6} />

      {/* Floating gems */}
      <FloatingGem position={[-4, 1.8, -1]}  color="#8b5cf6" scale={0.32} speed={0.9}  />
      <FloatingGem position={[4.2, -1.2, -2]} color="#ec4899" scale={0.24} speed={1.1}  />
      <FloatingGem position={[-3, -2.5, 0.8]} color="#06b6d4" scale={0.2}  speed={0.7}  />
      <FloatingGem position={[3.8, 2.2, -0.5]} color="#6366f1" scale={0.28} speed={0.85} />
      <FloatingGem position={[0.5, 3.5, -2]}  color="#10b981" scale={0.18} speed={1.3}  />

      {/* Fog */}
      <FogSphere />
    </Canvas>
  )
}
