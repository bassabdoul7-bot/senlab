import { Link } from 'react-router-dom'
import { Home, Volume2, VolumeX, ChevronLeft, ChevronRight, RotateCcw, Settings } from 'lucide-react'
import { useLabStore } from '../../stores/useLabStore'
import { useVoiceStore } from '../../stores/useVoiceStore'

export default function LabUI() {
  const { currentExperiment, currentStep, totalSteps, isVoiceEnabled, nextStep, prevStep, toggleVoice, resetLab } = useLabStore()
  const { isSpeaking, stop, speak } = useVoiceStore()

  const handleVoiceToggle = () => { if (isSpeaking) stop(); toggleVoice() }
  const speakStep = () => {
    if (currentExperiment?.steps?.[currentStep]?.voiceFr && isVoiceEnabled) {
      speak(currentExperiment.steps[currentStep].voiceFr)
    }
  }

  return (
    <>
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <Link to="/" className="p-2 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur rounded-lg"><Home className="w-5 h-5 text-white" /></Link>
          {currentExperiment && <div className="px-4 py-2 bg-slate-800/80 backdrop-blur rounded-lg"><h2 className="text-sm font-medium text-white">{currentExperiment.titleFr}</h2></div>}
        </div>
        <div className="flex items-center gap-2 pointer-events-auto">
          <button onClick={handleVoiceToggle} className="p-2 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur rounded-lg">
            {isVoiceEnabled ? <Volume2 className="w-5 h-5 text-white" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
          </button>
          <button className="p-2 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur rounded-lg"><Settings className="w-5 h-5 text-white" /></button>
        </div>
      </div>

      {currentExperiment && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-800/90 backdrop-blur border border-slate-700 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-green-400 font-medium">Etape {currentStep + 1} / {totalSteps}</span>
                <div className="flex gap-1">{Array.from({ length: totalSteps }).map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i === currentStep ? 'bg-green-500' : i < currentStep ? 'bg-green-500/50' : 'bg-slate-600'}`} />)}</div>
              </div>
              <p className="text-white">{currentExperiment.steps?.[currentStep]?.instruction}</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button onClick={resetLab} className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl"><RotateCcw className="w-5 h-5 text-white" /></button>
              <button onClick={prevStep} disabled={currentStep === 0} className="p-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded-xl"><ChevronLeft className="w-5 h-5 text-white" /></button>
              <button onClick={speakStep} className="p-4 bg-green-600 hover:bg-green-500 rounded-xl"><Volume2 className="w-6 h-6 text-white" /></button>
              <button onClick={nextStep} disabled={currentStep >= totalSteps - 1} className="p-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded-xl"><ChevronRight className="w-5 h-5 text-white" /></button>
            </div>
          </div>
        </div>
      )}

      {!currentExperiment && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="max-w-md mx-auto bg-slate-800/90 backdrop-blur border border-slate-700 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Bienvenue au laboratoire!</h3>
            <p className="text-slate-400 mb-4">Explorez ou selectionnez une experience</p>
            <Link to="/experiments" className="inline-flex px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl text-white font-medium">Choisir une experience</Link>
          </div>
        </div>
      )}
    </>
  )
}
