import { useEffect, Suspense, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { useLabStore } from '../../../stores/useLabStore'
import HandCursor from '../HandCursor'

useGLTF.preload('/models/lab/lab-room.glb')
useGLTF.preload('/models/equipment/chemistry/phmeter.glb')
useGLTF.preload('/models/equipment/chemistry/beaker.glb')

function LabRoom() {
  const { scene } = useGLTF('/models/lab/lab-room.glb')
  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child) => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true } })
    return clone
  }, [scene])
  return <primitive object={clonedScene} scale={1} position={[0, 0, 0]} />
}

function PHMeter() {
  const { scene } = useGLTF('/models/equipment/chemistry/phmeter.glb')
  
  const controls = useControls('pH-Meter', {
    x: { value: 1.50, min: -5, max: 5, step: 0.05 },
    y: { value: 0.85, min: 0, max: 3, step: 0.05 },
    z: { value: -1.08, min: -5, max: 5, step: 0.05 },
    scale: { value: 1.43, min: 0.01, max: 3, step: 0.01 },
    rotY: { value: -2.1, min: -3.14, max: 3.14, step: 0.1 },
  })

  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child) => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true } })
    return clone
  }, [scene])

  return (
    <primitive 
      object={clonedScene} 
      position={[controls.x, controls.y, controls.z]} 
      scale={controls.scale} 
      rotation={[0, controls.rotY, 0]}
    />
  )
}

function BeakerAcid() {
  const { scene } = useGLTF('/models/equipment/chemistry/beaker.glb')
  
  const controls = useControls('Beaker-Acid', {
    x: { value: 1.20, min: -5, max: 5, step: 0.05 },
    y: { value: 1.30, min: 0, max: 3, step: 0.05 },
    z: { value: -0.25, min: -5, max: 5, step: 0.05 },
    scale: { value: 0.10, min: 0.01, max: 1, step: 0.01 },
    rotY: { value: 0, min: -3.14, max: 3.14, step: 0.1 },
  })

  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child) => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true } })
    return clone
  }, [scene])

  return (
    <primitive 
      object={clonedScene} 
      position={[controls.x, controls.y, controls.z]} 
      scale={controls.scale} 
      rotation={[0, controls.rotY, 0]}
    />
  )
}

function BeakerBase() {
  const { scene } = useGLTF('/models/equipment/chemistry/beaker.glb')
  
  const controls = useControls('Beaker-Base', {
    x: { value: 0.80, min: -5, max: 5, step: 0.05 },
    y: { value: 1.30, min: 0, max: 3, step: 0.05 },
    z: { value: -0.25, min: -5, max: 5, step: 0.05 },
    scale: { value: 0.10, min: 0.01, max: 1, step: 0.01 },
    rotY: { value: 0, min: -3.14, max: 3.14, step: 0.1 },
  })

  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child) => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true } })
    return clone
  }, [scene])

  return (
    <primitive 
      object={clonedScene} 
      position={[controls.x, controls.y, controls.z]} 
      scale={controls.scale} 
      rotation={[0, controls.rotY, 0]}
    />
  )
}

function BeakerWater() {
  const { scene } = useGLTF('/models/equipment/chemistry/beaker.glb')
  
  const controls = useControls('Beaker-Water', {
    x: { value: 0.40, min: -5, max: 5, step: 0.05 },
    y: { value: 1.30, min: 0, max: 3, step: 0.05 },
    z: { value: -0.25, min: -5, max: 5, step: 0.05 },
    scale: { value: 0.10, min: 0.01, max: 1, step: 0.01 },
    rotY: { value: 0, min: -3.14, max: 3.14, step: 0.1 },
  })

  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child) => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true } })
    return clone
  }, [scene])

  return (
    <primitive 
      object={clonedScene} 
      position={[controls.x, controls.y, controls.z]} 
      scale={controls.scale} 
      rotation={[0, controls.rotY, 0]}
    />
  )
}

export default function LabEnvironment() {
  const setLabReady = useLabStore((s) => s.setLabReady)

  useEffect(() => { 
    const timer = setTimeout(() => setLabReady(true), 2500)
    return () => clearTimeout(timer) 
  }, [setLabReady])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
      <pointLight position={[-3, 4, 0]} intensity={0.4} />

      <Suspense fallback={null}>
        <LabRoom />
        <PHMeter />
        <BeakerAcid />
        <BeakerBase />
        <BeakerWater />
      </Suspense>

      <HandCursor />
    </>
  )
}
