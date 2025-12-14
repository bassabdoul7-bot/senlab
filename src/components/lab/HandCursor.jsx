import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useLabStore } from '../../stores/useLabStore'
import * as THREE from 'three'

export default function HandCursor() {
  const groupRef = useRef()
  const { camera, pointer } = useThree()
  
  const isDragging = useLabStore((s) => s.isDragging)
  const selectedObject = useLabStore((s) => s.selectedObject)
  
  // Follow mouse position in 3D space
  useFrame(() => {
    if (!groupRef.current || !isDragging) return
    
    // Project mouse to 3D position
    const vector = new THREE.Vector3(pointer.x, pointer.y, 0.5)
    vector.unproject(camera)
    const dir = vector.sub(camera.position).normalize()
    const distance = 3 // Fixed distance from camera
    const pos = camera.position.clone().add(dir.multiplyScalar(distance))
    
    groupRef.current.position.lerp(pos, 0.3)
    groupRef.current.lookAt(camera.position)
  })
  
  if (!isDragging || !selectedObject) return null
  
  return (
    <group ref={groupRef}>
      {/* Hand icon */}
      <Html center distanceFactor={10}>
        <div style={{
          fontSize: '40px',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
          animation: 'grab 0.5s ease-in-out infinite alternate',
          cursor: 'grabbing'
        }}>
          ✋
        </div>
        <style>{`
          @keyframes grab {
            0% { transform: scale(1) rotate(-5deg); }
            100% { transform: scale(1.1) rotate(5deg); }
          }
        `}</style>
      </Html>
      
      {/* Object being carried label */}
      <Html position={[0, -0.3, 0]} center>
        <div style={{
          background: '#fbbf24',
          color: '#000',
          padding: '4px 10px',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}>
          {selectedObject}
        </div>
      </Html>
    </group>
  )
}
