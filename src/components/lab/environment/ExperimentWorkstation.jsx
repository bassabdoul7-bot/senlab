import { Suspense } from 'react'
import Equipment from '../equipment/Equipment'
import { useLabStore } from '../../../stores/useLabStore'

const WORKSTATION = {
  x: 1.5,
  y: 0.85,
  z: -0.5
}

export default function ExperimentWorkstation() {
  const currentExperiment = useLabStore((state) => state.currentExperiment)
  const currentStep = useLabStore((state) => state.currentStep)
  
  if (!currentExperiment || !currentExperiment.equipment?.length) {
    return null
  }
  
  const highlightedIds = currentExperiment.steps[currentStep]?.highlightEquipment || []
  
  return (
    <group position={[WORKSTATION.x, WORKSTATION.y, WORKSTATION.z]}>
      <Suspense fallback={null}>
        {currentExperiment.equipment.map((item, index) => (
          <Equipment
            key={`${currentExperiment.id}-${item.id}-${index}`}
            id={item.id}
            type={item.type}
            label={item.label}
            position={item.position || [0, 0, 0]}
            scale={item.scale || 1}
            rotation={item.rotation || [0, 0, 0]}
            highlighted={highlightedIds.includes(item.id)}
          />
        ))}
      </Suspense>
    </group>
  )
}
