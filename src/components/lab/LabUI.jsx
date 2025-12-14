import { useLabStore } from '../../stores/useLabStore'

export default function LabUI() {
  const currentStep = useLabStore((s) => s.currentStep)
  const totalSteps = useLabStore((s) => s.totalSteps)
  const currentExperiment = useLabStore((s) => s.currentExperiment)
  const nextStep = useLabStore((s) => s.nextStep)
  const prevStep = useLabStore((s) => s.prevStep)
  const isStepComplete = useLabStore((s) => s.isStepComplete)
  
  if (!currentExperiment) return null
  
  const step = currentExperiment.steps?.[currentStep]
  const canProceed = isStepComplete()
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      zIndex: 100,
    }}>
      {/* Progress bar */}
      <div style={{
        width: '300px',
        height: '6px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '3px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${((currentStep + 1) / totalSteps) * 100}%`,
          height: '100%',
          background: '#fbbf24',
          transition: 'width 0.3s ease',
        }} />
      </div>
      
      {/* Navigation buttons */}
      <div style={{
        display: 'flex',
        gap: '10px',
      }}>
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          style={{
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: 'bold',
            background: currentStep === 0 ? '#475569' : '#64748b',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            opacity: currentStep === 0 ? 0.5 : 1,
          }}
        >
          ← Précédent
        </button>
        
        <button
          onClick={nextStep}
          disabled={!canProceed}
          style={{
            padding: '12px 25px',
            fontSize: '14px',
            fontWeight: 'bold',
            background: canProceed 
              ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' 
              : '#475569',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: canProceed ? 'pointer' : 'not-allowed',
            opacity: canProceed ? 1 : 0.5,
          }}
        >
          Suivant →
        </button>
      </div>
    </div>
  )
}
