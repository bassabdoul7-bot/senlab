import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function SketchfabModel({ 
  path, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1,
  onClick,
  onPointerOver,
  onPointerOut,
  highlighted = false,
  interactive = false,
  name,
  ...props 
}) {
  const groupRef = useRef()
  const { scene } = useGLTF(path)
  
  // Clone the scene for independent instances
  const clonedScene = scene.clone(true)
  
  useEffect(() => {
    // Setup shadows and materials
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [clonedScene])

  // Highlight animation
  useFrame((state) => {
    if (highlighted && groupRef.current) {
      const t = state.clock.elapsedTime
      groupRef.current.position.y = position[1] + Math.sin(t * 3) * 0.02
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      onClick={interactive ? onClick : undefined}
      onPointerOver={interactive ? onPointerOver : undefined}
      onPointerOut={interactive ? onPointerOut : undefined}
      name={name}
      {...props}
    >
      <primitive object={clonedScene} />
      
      {/* Highlight glow effect */}
      {highlighted && (
        <pointLight
          position={[0, 0.5, 0]}
          color="#00ff88"
          intensity={2}
          distance={1}
        />
      )}
    </group>
  )
}

// Preload helper
SketchfabModel.preload = (path) => useGLTF.preload(path)
