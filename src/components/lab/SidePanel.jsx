import { useLabStore } from '../../stores/useLabStore'

export default function SidePanel() {
  const currentExperiment = useLabStore((s) => s.currentExperiment)
  const currentStep = useLabStore((s) => s.currentStep)
  const completedSteps = useLabStore((s) => s.completedSteps)
  const allResults = useLabStore((s) => s.allResults)
  const resetExperiment = useLabStore((s) => s.resetExperiment)
  
  if (!currentExperiment) return null
  
  const steps = currentExperiment.steps || []
  
  if (steps.length === 0) return null
  
  return (
    <div style={{
      position: 'fixed',
      right: '20px',
      top: '80px',
      width: '280px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: 100,
    }}>
      {/* Stages Panel */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.95)',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #475569',
      }}>
        <div style={{
          background: '#334155',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
            📋 Étapes
          </span>
          <span style={{
            background: '#22c55e',
            color: 'white',
            padding: '2px 10px',
            borderRadius: '10px',
            fontSize: '12px',
          }}>
            {currentStep + 1}/{steps.length}
          </span>
        </div>
        
        <div style={{ padding: '12px', maxHeight: '250px', overflowY: 'auto' }}>
          {steps.map((step, i) => {
            const isCompleted = completedSteps?.includes(i) || false
            const isCurrent = i === currentStep
            
            return (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px',
                borderRadius: '8px',
                background: isCurrent ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
                marginBottom: '4px',
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  background: isCompleted ? '#22c55e' : isCurrent ? '#fbbf24' : '#475569',
                  color: 'white',
                }}>
                  {isCompleted ? '✓' : i + 1}
                </div>
                <span style={{
                  color: isCompleted ? '#22c55e' : isCurrent ? '#fbbf24' : '#94a3b8',
                  fontSize: '13px',
                  flex: 1,
                }}>
                  {step.instruction}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Results Panel */}
      {allResults && allResults.length > 0 && (
        <div style={{
          background: 'rgba(30, 41, 59, 0.95)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #475569',
        }}>
          <div style={{
            background: '#334155',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
              📊 Résultats
            </span>
          </div>
          
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {allResults.map((result, i) => (
              <div key={i} style={{
                background: result.color,
                color: 'white',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
                {result.value}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
      }}>
        <button
          onClick={resetExperiment}
          style={{
            flex: 1,
            padding: '12px',
            fontSize: '13px',
            fontWeight: 'bold',
            background: '#475569',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          🔄 Recommencer
        </button>
      </div>
    </div>
  )
}
