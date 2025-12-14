import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { useParams, useNavigate } from 'react-router-dom'
import LabEnvironment from '../components/lab/environment/LabEnvironment'
import ObjectivesScreen from '../components/lab/ObjectivesScreen'
import SidePanel from '../components/lab/SidePanel'
import Mascot from '../components/lab/Mascot'
import StepGuide from '../components/lab/StepGuide'
import ResultDisplay from '../components/lab/ResultDisplay'
import CompletionScreen from '../components/lab/CompletionScreen'
import LoadingScreen from '../components/lab/LoadingScreen'
import { useLabStore, getExperimentById } from '../stores/useLabStore'

export default function LabPage() {
  const { experimentId } = useParams()
  const navigate = useNavigate()
  const setExperiment = useLabStore((s) => s.setExperiment)
  const currentExperiment = useLabStore((s) => s.currentExperiment)
  const isLabReady = useLabStore((s) => s.isLabReady)
  const objectivesDismissed = useLabStore((s) => s.objectivesDismissed)
  
  useEffect(() => {
    if (experimentId) {
      const experiment = getExperimentById(experimentId)
      if (experiment) {
        setExperiment(experiment)
      }
    }
  }, [experimentId, setExperiment])
  
  return (
    <div className="h-screen w-screen relative bg-gray-900">
      {!isLabReady && <LoadingScreen />}
      
      <Canvas
        shadows
        camera={{ position: [0, 2, 3], fov: 50 }}
        style={{ background: '#1a1a2e' }}
      >
        <Suspense fallback={null}>
          <LabEnvironment />
          <Environment preset="apartment" />
        </Suspense>
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={1}
          maxDistance={6}
          target={[0, 1, 0]}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-4">
        <button 
          onClick={() => navigate('/')}
          className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg backdrop-blur"
        >
          🏠
        </button>
        <h1 className="text-white text-xl font-bold">
          🧪 {currentExperiment?.titleFr || 'Laboratoire'}
        </h1>
      </div>
      
      {/* UI Components */}
      <SidePanel />
      <Mascot />
      <ObjectivesScreen />
      <StepGuide />
      <ResultDisplay />
      <CompletionScreen />
    </div>
  )
}
