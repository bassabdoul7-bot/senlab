import { useEffect, Suspense, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
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
  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child) => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true } })
    return clone
  }, [scene])
  return <primitive object={clonedScene} position={[1.50, 0.85, -1.51]} scale={2.17} rotation={[0, -2.1, 0]} />
}

function BeakerAcid() {
  const { scene } = useGLTF('/models/equipment/chemistry/beaker.glb')
  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child) => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true } })
    return clone
  }, [scene])
  return <primitive object={clonedScene} position={[1.25, 1.07, -0.71]} scale={0.08} rotation={[0, 0, 0]} />
}

function BeakerBase() {
  const { scene } = useGLTF('/models/equipment/chemistry/beaker.glb')
  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child) => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true } })
    return clone
  }, [scene])
  return <primitive object={clonedScene} position={[1.10, 1.07, -1.31]} scale={0.07} rotation={[0, 0, 0]} />
}

function BeakerWater() {
  const { scene } = useGLTF('/models/equipment/chemistry/beaker.glb')
  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child) => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true } })
    return clone
  }, [scene])
  return <primitive object={clonedScene} position={[1.42, 1.07, -0.51]} scale={0.04} rotation={[0, 0, 0]} />
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
