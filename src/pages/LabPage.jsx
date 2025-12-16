import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
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
        camera={{ 
          position: [-0.80, 1.88, -0.04],
          fov: 50
        }}
        style={{ background: '#1a1a2e' }}
        onCreated={({ camera }) => {
          camera.lookAt(1.00, 1.00, -1.00)
        }}
      >
        <Suspense fallback={null}>
          <LabEnvironment />
          <Environment preset="apartment" />
        </Suspense>
        {/* No OrbitControls = camera locked */}
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
