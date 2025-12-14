import { useGLTF, Html } from '@react-three/drei'
import { useMemo, useState, Suspense } from 'react'
import { useLabStore } from '../../../stores/useLabStore'

// Real models
const REAL_MODELS = {
  phmeter: '/models/equipment/chemistry/phmeter.glb',
  beaker: '/models/equipment/chemistry/beaker.glb',
  graduated: '/models/equipment/chemistry/graduated-cylinder.glb',
}

// Preload
Object.values(REAL_MODELS).forEach(path => {
  useGLTF.preload(path)
})

function RealEquipment({ modelPath, scale, rotation }) {
  const { scene } = useGLTF(modelPath)
  
  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return clone
  }, [scene])
  
  return <primitive object={clonedScene} scale={scale} rotation={rotation} />
}

export default function Equipment({ 
  id,
  type,
  position = [0, 0, 0], 
  scale = 1,
  rotation = [0, 0, 0],
  label = '',
  highlighted = false,
}) {
  const [hovered, setHovered] = useState(false)
  
  const handleEquipmentClick = useLabStore((s) => s.handleEquipmentClick)
  const stepClickedEquipment = useLabStore((s) => s.stepClickedEquipment) || []
  
  const isClicked = stepClickedEquipment.includes(id)
  const needsClick = highlighted && !isClicked
  
  const hasRealModel = REAL_MODELS[type]
  
  const getHeight = () => {
    if (type === 'phmeter') return 0.25
    if (type === 'beaker') return 0.12
    if (type === 'graduated') return 0.2
    return 0.1
  }
  
  const handleClick = (e) => {
    e.stopPropagation()
    if (needsClick && handleEquipmentClick) {
      handleEquipmentClick(id)
    }
  }
  
  return (
    <group 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Highlight ring */}
      {highlighted && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
          <ringGeometry args={[0.06, 0.08, 32]} />
          <meshBasicMaterial color={isClicked ? '#22c55e' : '#facc15'} transparent opacity={0.8} />
        </mesh>
      )}
      
      {/* Checkmark when clicked */}
      {isClicked && highlighted && (
        <Html position={[0, getHeight() + 0.08, 0]} center>
          <div style={{
            background: '#22c55e',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            color: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>
            ✓
          </div>
        </Html>
      )}
      
      {/* 3D Model */}
      {hasRealModel ? (
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[0.05, 0.1, 0.05]} />
            <meshStandardMaterial color="#cccccc" />
          </mesh>
        }>
          <RealEquipment modelPath={REAL_MODELS[type]} scale={scale} rotation={rotation} />
        </Suspense>
      ) : (
        <mesh>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
      )}
      
      {/* Click hint */}
      {needsClick && hovered && (
        <Html position={[0, getHeight() + 0.15, 0]} center>
          <div style={{
            background: '#22c55e',
            color: 'white',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
            cursor: 'pointer',
          }}>
            👆 Cliquez!
          </div>
        </Html>
      )}
      
      {/* Label with arrow */}
      {label && (hovered || highlighted) && !isClicked && (
        <Html position={[0, getHeight() + 0.05, 0]} center>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
          }}>
            <div style={{
              background: highlighted ? '#22c55e' : '#3b82f6',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
            }}>
              {label}
            </div>
            <div style={{
              width: '2px',
              height: '15px',
              background: highlighted ? '#22c55e' : '#3b82f6',
            }} />
            <div style={{
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: highlighted ? '8px solid #22c55e' : '8px solid #3b82f6',
            }} />
          </div>
        </Html>
      )}
    </group>
  )
}
