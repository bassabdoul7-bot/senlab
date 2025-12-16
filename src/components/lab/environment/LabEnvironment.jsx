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
  return <primitive object={clonedScene} position={[1.50, 0.85, -1.2]} scale={2.17} rotation={[0, -2.1, 0]} />
}

function FlaskLiquid({ position, color, opacity = 0.75, scale = 0.10 }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[scale, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        transparent={true} 
        opacity={opacity}
        roughness={0.1}
        metalness={0.3}
      />
    </mesh>
  )
}

function BeakerAcid() {
  const { scene } = useGLTF('/models/equipment/chemistry/beaker.glb')
  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child) => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true } })
    return clone
  }, [scene])
  return (
    <group>
      <primitive object={clonedScene} position={[1.40, 1.08, -0.7]} scale={0.10} rotation={[0, 0, 0]} />
      <FlaskLiquid position={[1.40, 1.08 - 0.21, -0.7]} color="#ff3333" opacity={0.75} scale={0.10} />
    </group>
  )
}

function BeakerBase() {
  const { scene } = useGLTF('/models/equipment/chemistry/beaker.glb')
  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child) => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true } })
    return clone
  }, [scene])
  return (
    <group>
      <primitive object={clonedScene} position={[1.40, 1.07, -0.21]} scale={0.10} rotation={[0, 0, 0]} />
      <FlaskLiquid position={[1.40, 1.07 - 0.21, -0.21]} color="#3366ff" opacity={0.75} scale={0.10} />
    </group>
  )
}

function BeakerWater() {
  const { scene } = useGLTF('/models/equipment/chemistry/beaker.glb')
  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child) => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true } })
    return clone
  }, [scene])
  return (
    <group>
      <primitive object={clonedScene} position={[1.40, 1.07, 0.19]} scale={0.10} rotation={[0, 0, 0]} />
      <FlaskLiquid position={[1.40, 1.07 - 0.21, 0.19]} color="#88ddff" opacity={0.5} scale={0.10} />
    </group>
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
