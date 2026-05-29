import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, Sphere, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const skills = [
  { name: 'Python',      color: '#3b82f6', category: 'backend'  },
  { name: 'FastAPI',     color: '#10b981', category: 'backend'  },
  { name: 'Django',      color: '#059669', category: 'backend'  },
  { name: 'React',       color: '#06b6d4', category: 'frontend' },
  { name: 'TypeScript',  color: '#6366f1', category: 'frontend' },
  { name: 'Node.js',     color: '#84cc16', category: 'backend'  },
  { name: 'PostgreSQL',  color: '#3b82f6', category: 'database' },
  { name: 'Docker',      color: '#0ea5e9', category: 'devops'   },
  { name: 'AWS',         color: '#f59e0b', category: 'devops'   },
  { name: 'Redis',       color: '#ef4444', category: 'database' },
  { name: 'GraphQL',     color: '#ec4899', category: 'api'      },
  { name: 'Kubernetes',  color: '#6366f1', category: 'devops'   },
  { name: 'Tailwind',    color: '#06b6d4', category: 'frontend' },
  { name: 'MongoDB',     color: '#10b981', category: 'database' },
  { name: 'Next.js',     color: '#e2e8f0', category: 'frontend' },
  { name: 'Celery',      color: '#84cc16', category: 'backend'  },
  { name: 'Nginx',       color: '#10b981', category: 'devops'   },
  { name: 'Git',         color: '#f97316', category: 'tools'    },
]

function SkillNode({ skill, position, index }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!ref.current) return
    const targetScale = hovered ? 1.4 : 1
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12)
  })

  return (
    <group ref={ref} position={position}>
      <Float speed={1.2 + index * 0.05} rotationIntensity={0.15} floatIntensity={0.25}>
        <Sphere
          args={[0.16, 32, 32]}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={hovered ? 1.5 : 0.55}
            metalness={0.85}
            roughness={0.15}
            toneMapped={false}
          />
        </Sphere>
        {hovered && (
          <Text
            position={[0, -0.3, 0]}
            fontSize={0.11}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {skill.name}
          </Text>
        )}
        {!hovered && (
          <Text
            position={[0, -0.3, 0]}
            fontSize={0.1}
            color={skill.color}
            anchorX="center"
            anchorY="middle"
          >
            {skill.name}
          </Text>
        )}
      </Float>
    </group>
  )
}

function SkillSphere() {
  const groupRef = useRef()

  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const phi   = Math.acos(-1 + (2 * i) / skills.length)
      const theta = Math.sqrt(skills.length * Math.PI) * phi
      return [
        2.7 * Math.cos(theta) * Math.sin(phi),
        2.7 * Math.sin(theta) * Math.sin(phi),
        2.7 * Math.cos(phi),
      ]
    })
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.07) * 0.18
  })

  return (
    <group ref={groupRef}>
      {/* Core */}
      <Sphere args={[0.55, 64, 64]}>
        <MeshDistortMaterial
          color="#6366f1"
          emissive="#4338ca"
          emissiveIntensity={0.7}
          distort={0.28}
          speed={3}
          metalness={0.95}
          roughness={0.05}
          toneMapped={false}
        />
      </Sphere>

      {/* Skill nodes */}
      {skills.map((skill, i) => (
        <SkillNode key={skill.name} skill={skill} position={positions[i]} index={i} />
      ))}
    </group>
  )
}

export default function SkillsCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 52 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[10, 10, 10]}   intensity={2.5} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={2}   color="#ec4899" />
      <pointLight position={[0, 10, 0]}      intensity={1.5} color="#06b6d4" />
      <Sparkles count={40} scale={8} size={1} speed={0.3} color="#8b5cf6" opacity={0.5} />
      <SkillSphere />
    </Canvas>
  )
}
