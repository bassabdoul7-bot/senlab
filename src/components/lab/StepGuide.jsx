import { useLabStore } from '../../stores/useLabStore'

export default function StepGuide() {
  const currentExperiment = useLabStore((s) => s.currentExperiment)
  const currentStep = useLabStore((s) => s.currentStep)
  const objectivesDismissed = useLabStore((s) => s.objectivesDismissed)
  const experimentComplete = useLabStore((s) => s.experimentComplete)
  const isDragging = useLabStore((s) => s.isDragging)
  const selectedObject = useLabStore((s) => s.selectedObject)
  
  if (!currentExperiment || !objectivesDismissed) return null
  
  const stepData = currentExperiment.steps?.[currentStep]
  const totalSteps = currentExperiment.steps?.length || 0
  
  // Get action hint based on step type
  const getActionHint = () => {
    if (experimentComplete) return "✅ Expérience terminée!"
    if (isDragging && selectedObject) return "🎯 Déplacez vers la cible qui brille"
    if (!stepData) return ""
    
    switch (stepData.action) {
      case 'click':
        return "👆 Cliquez sur l'élément en surbrillance"
      case 'drag-to':
        return "✋ Cliquez et glissez vers la destination"
      case 'observe':
        return "👁️ Observez et cliquez pour continuer"
      default:
        return ""
    }
  }
  
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 1) 100%)',
      borderTop: '3px solid #3b82f6',
      padding: '15px 20px',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    }}>
      {/* Step indicator */}
      <div style={{
        background: experimentComplete ? '#22c55e' : '#3b82f6',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '16px',
        minWidth: '120px',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
      }}>
        {experimentComplete ? '✓ Terminé' : `Étape ${currentStep + 1}/${totalSteps}`}
      </div>
      
      {/* Instruction text */}
      <div style={{ flex: 1 }}>
        <div style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '4px'
        }}>
          {experimentComplete ? 'Expérience complétée avec succès!' : stepData?.instruction}
        </div>
        <div style={{
          color: '#94a3b8',
          fontSize: '14px'
        }}>
          {getActionHint()}
        </div>
      </div>
      
      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {currentExperiment.steps?.map((_, idx) => (
          <div
            key={idx}
            style={{
              width: idx === currentStep ? '12px' : '10px',
              height: idx === currentStep ? '12px' : '10px',
              borderRadius: '50%',
              background: idx < currentStep ? '#22c55e' : idx === currentStep ? '#3b82f6' : '#475569',
              transition: 'all 0.3s ease',
              boxShadow: idx === currentStep ? '0 0 10px #3b82f6' : 'none'
            }}
          />
        ))}
      </div>
    </div>
  )
}
