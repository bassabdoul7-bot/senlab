import { useRef, useState, useMemo, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useGLTF } from '@react-three/drei'
import { useLabStore } from '../../../stores/useLabStore'
import * as THREE from 'three'

// Map equipment types to GLB paths
const MODEL_PATHS = {
  'phmeter': '/models/equipment/chemistry/phmeter.glb',
  'beaker': '/models/equipment/chemistry/beaker.glb',
  'graduated': '/models/equipment/chemistry/graduated-cylinder.glb',
  'glassware': '/models/equipment/chemistry/glassware.glb',
}

// Preload
Object.values(MODEL_PATHS).forEach(path => useGLTF.preload(path))

function RealModel({ modelPath, scale = 1, rotation = [0, 0, 0], emissiveColor, emissiveIntensity }) {
  const { scene } = useGLTF(modelPath)
  
  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material = child.material.clone()
          child.material.emissive = new THREE.Color(emissiveColor || '#000000')
          child.material.emissiveIntensity = emissiveIntensity || 0
        }
      }
    })
    return clone
  }, [scene, emissiveColor, emissiveIntensity])

  return (
    <primitive 
      object={clonedScene} 
      scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      rotation={rotation}
    />
  )
}

export default function InteractiveEquipment({
  id,
  type,
  label,
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  isHighlighted = false,
}) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  const handleClick = useLabStore((s) => s.handleClick)
  const objectivesDismissed = useLabStore((s) => s.objectivesDismissed)

  const modelPath = MODEL_PATHS[type]

  // Animation for highlighted
  useFrame((state) => {
    if (!groupRef.current || !objectivesDismissed) return
    if (isHighlighted) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.02
    }
  })

  const onClick = (e) => {
    e.stopPropagation()
    if (!objectivesDismissed) return
    if (handleClick) handleClick(id)
  }

  const emissiveColor = isHighlighted ? '#3b82f6' : (hovered ? '#60a5fa' : '#000000')
  const emissiveIntensity = isHighlighted ? 0.5 : (hovered ? 0.3 : 0)

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={onClick}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'default' }}
    >
      {modelPath ? (
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[0.05, 0.1, 0.05]} />
            <meshStandardMaterial color="#888" wireframe />
          </mesh>
        }>
          <RealModel 
            modelPath={modelPath} 
            scale={scale}
            rotation={rotation}
            emissiveColor={emissiveColor}
            emissiveIntensity={emissiveIntensity}
          />
        </Suspense>
      ) : (
        <mesh>
          <boxGeometry args={[0.05, 0.1, 0.05]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
      )}

      {/* Label */}
      {(isHighlighted || hovered) && objectivesDismissed && (
        <Html position={[0, 0.2, 0]} center distanceFactor={10}>
          <div style={{
            background: isHighlighted ? '#3b82f6' : '#1e293b',
            color: 'white',
            padding: '8px 14px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          }}>
            {label}
          </div>
        </Html>
      )}

      {/* Highlight ring */}
      {isHighlighted && (
        <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[0.08, 0.12, 32]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}
