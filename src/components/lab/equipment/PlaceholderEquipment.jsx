import { Html } from '@react-three/drei'
import { useState } from 'react'

const EQUIPMENT_SHAPES = {
  beaker: { type: 'cylinder', args: [0.03, 0.04, 0.06, 16], color: '#88ccff' },
  flask: { type: 'cone', args: [0.04, 0.06, 16], color: '#88ccff' },
  testtube: { type: 'cylinder', args: [0.008, 0.008, 0.08, 8], color: '#aaddff' },
  phmeter: { type: 'box', args: [0.02, 0.12, 0.02], color: '#ffcc00' },
  burette: { type: 'cylinder', args: [0.008, 0.008, 0.25, 8], color: '#ccffcc' },
  bunsen: { type: 'cylinder', args: [0.025, 0.035, 0.08, 8], color: '#555555' },
  microscope: { type: 'box', args: [0.08, 0.15, 0.06], color: '#333333' },
  multimeter: { type: 'box', args: [0.06, 0.1, 0.025], color: '#ff6600' },
  battery: { type: 'cylinder', args: [0.012, 0.012, 0.05, 8], color: '#cc0000' },
  wire: { type: 'cylinder', args: [0.003, 0.003, 0.15, 4], color: '#ff0000' },
  bulb: { type: 'sphere', args: [0.02, 8, 8], color: '#ffffcc' },
  resistor: { type: 'cylinder', args: [0.008, 0.008, 0.03, 6], color: '#cc9966' },
  ammeter: { type: 'box', args: [0.05, 0.05, 0.02], color: '#0066cc' },
  voltmeter: { type: 'box', args: [0.05, 0.05, 0.02], color: '#cc0066' },
  graduated: { type: 'cylinder', args: [0.015, 0.015, 0.12, 8], color: '#aaddff' },
  pipette: { type: 'cylinder', args: [0.005, 0.003, 0.15, 6], color: '#ddddff' },
  indicator: { type: 'cylinder', args: [0.01, 0.01, 0.04, 8], color: '#ff00ff' },
  slide: { type: 'box', args: [0.025, 0.001, 0.075], color: '#aaaaaa' },
  dynamometer: { type: 'box', args: [0.03, 0.12, 0.015], color: '#00aa00' },
}

export default function PlaceholderEquipment({ 
  shape = 'beaker',
  position = [0, 0, 0], 
  label = '',
  highlighted = false,
}) {
  const [hovered, setHovered] = useState(false)
  const config = EQUIPMENT_SHAPES[shape] || EQUIPMENT_SHAPES.beaker
  
  // Calculate height for label positioning
  const getHeight = () => {
    switch (config.type) {
      case 'cylinder': return config.args[2] + 0.05
      case 'box': return config.args[1] + 0.05
      case 'sphere': return config.args[0] * 2 + 0.05
      case 'cone': return config.args[1] + 0.05
      default: return 0.15
    }
  }
  
  const renderShape = () => {
    const props = { castShadow: true, receiveShadow: true }
    const isGlass = ['beaker', 'flask', 'testtube', 'graduated', 'pipette'].includes(shape)
    
    switch (config.type) {
      case 'cylinder':
        return (
          <mesh {...props} position={[0, config.args[2] / 2, 0]}>
            <cylinderGeometry args={config.args} />
            <meshStandardMaterial color={config.color} transparent={isGlass} opacity={isGlass ? 0.5 : 1} />
          </mesh>
        )
      case 'box':
        return (
          <mesh {...props} position={[0, config.args[1] / 2, 0]}>
            <boxGeometry args={config.args} />
            <meshStandardMaterial color={config.color} />
          </mesh>
        )
      case 'sphere':
        return (
          <mesh {...props} position={[0, config.args[0], 0]}>
            <sphereGeometry args={config.args} />
            <meshStandardMaterial color={config.color} transparent opacity={0.8} />
          </mesh>
        )
      case 'cone':
        return (
          <mesh {...props} position={[0, config.args[1] / 2, 0]}>
            <coneGeometry args={config.args} />
            <meshStandardMaterial color={config.color} transparent opacity={0.5} />
          </mesh>
        )
      default:
        return null
    }
  }
  
  return (
    <group 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Highlight ring */}
      {highlighted && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
          <ringGeometry args={[0.04, 0.06, 32]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.8} />
        </mesh>
      )}
      
      {renderShape()}
      
      {/* Label with arrow - positioned higher */}
      {label && (hovered || highlighted) && (
        <Html position={[0, getHeight() + 0.12, 0]} center>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
          }}>
            {/* Label box */}
            <div style={{
              background: highlighted ? '#22c55e' : '#3b82f6',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
            }}>
              {label}
            </div>
            {/* Arrow line */}
            <div style={{
              width: '2px',
              height: '20px',
              background: highlighted ? '#22c55e' : '#3b82f6',
            }} />
            {/* Arrow point */}
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
