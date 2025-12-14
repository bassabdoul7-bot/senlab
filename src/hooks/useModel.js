import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useMemo } from 'react'

// Preload models for better performance
export function preloadModel(path) {
  useGLTF.preload(path)
}

// Main hook for loading Sketchfab models
export function useModel(path, options = {}) {
  const { scene, animations, materials, nodes } = useGLTF(path)
  const { actions } = useAnimations(animations, scene)
  
  // Clone scene for multiple instances
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    
    // Apply shadows to all meshes
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = options.castShadow ?? true
        child.receiveShadow = options.receiveShadow ?? true
        
        // Improve material quality
        if (child.material) {
          child.material.envMapIntensity = options.envMapIntensity ?? 1
        }
      }
    })
    
    return clone
  }, [scene, options])

  return {
    scene: clonedScene,
    nodes,
    materials,
    animations,
    actions,
  }
}

// Equipment catalog - maps equipment IDs to model paths
export const EQUIPMENT_MODELS = {
  // Lab Environment
  'lab-room': '/models/lab/lab-room.glb',
  'lab-table': '/models/lab/lab-table.glb',
  'lab-cabinet': '/models/lab/cabinet.glb',
  'lab-sink': '/models/lab/sink.glb',
  
  // Chemistry
  'beaker-50ml': '/models/equipment/chemistry/beaker-50ml.glb',
  'beaker-100ml': '/models/equipment/chemistry/beaker-100ml.glb',
  'beaker-250ml': '/models/equipment/chemistry/beaker-250ml.glb',
  'erlenmeyer-flask': '/models/equipment/chemistry/erlenmeyer.glb',
  'test-tube': '/models/equipment/chemistry/test-tube.glb',
  'test-tube-rack': '/models/equipment/chemistry/test-tube-rack.glb',
  'burette': '/models/equipment/chemistry/burette.glb',
  'pipette': '/models/equipment/chemistry/pipette.glb',
  'bunsen-burner': '/models/equipment/chemistry/bunsen-burner.glb',
  'ph-meter': '/models/equipment/chemistry/ph-meter.glb',
  'ph-paper': '/models/equipment/chemistry/ph-paper.glb',
  'graduated-cylinder': '/models/equipment/chemistry/graduated-cylinder.glb',
  'funnel': '/models/equipment/chemistry/funnel.glb',
  'wash-bottle': '/models/equipment/chemistry/wash-bottle.glb',
  'stirring-rod': '/models/equipment/chemistry/stirring-rod.glb',
  'dropper': '/models/equipment/chemistry/dropper.glb',
  
  // Electricity
  'multimeter': '/models/equipment/electricity/multimeter.glb',
  'battery': '/models/equipment/electricity/battery.glb',
  'wire-red': '/models/equipment/electricity/wire-red.glb',
  'wire-black': '/models/equipment/electricity/wire-black.glb',
  'bulb': '/models/equipment/electricity/bulb.glb',
  'switch': '/models/equipment/electricity/switch.glb',
  'resistor': '/models/equipment/electricity/resistor.glb',
  'ammeter': '/models/equipment/electricity/ammeter.glb',
  'voltmeter': '/models/equipment/electricity/voltmeter.glb',
  'breadboard': '/models/equipment/electricity/breadboard.glb',
  
  // Mechanics
  'dynamometer': '/models/equipment/mechanics/dynamometer.glb',
  'scale': '/models/equipment/mechanics/scale.glb',
  'pendulum': '/models/equipment/mechanics/pendulum.glb',
  'spring': '/models/equipment/mechanics/spring.glb',
  'inclined-plane': '/models/equipment/mechanics/inclined-plane.glb',
  'pulley': '/models/equipment/mechanics/pulley.glb',
  'cart': '/models/equipment/mechanics/cart.glb',
  'stopwatch': '/models/equipment/mechanics/stopwatch.glb',
  'ruler': '/models/equipment/mechanics/ruler.glb',
  
  // Biology
  'microscope': '/models/equipment/biology/microscope.glb',
  'petri-dish': '/models/equipment/biology/petri-dish.glb',
  'slide': '/models/equipment/biology/slide.glb',
  'scalpel': '/models/equipment/biology/scalpel.glb',
  'tweezers': '/models/equipment/biology/tweezers.glb',
}

export default useModel
