import { useLabStore } from '../../stores/useLabStore'
import { useNavigate } from 'react-router-dom'

export default function CompletionScreen() {
  const isExperimentComplete = useLabStore((s) => s.isExperimentComplete)
  const currentExperiment = useLabStore((s) => s.currentExperiment)
  const allResults = useLabStore((s) => s.allResults)
  const resetExperiment = useLabStore((s) => s.resetExperiment)
  const navigate = useNavigate()
  
  if (!isExperimentComplete) return null
  
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
        <h2 style={{ fontSize: '28px', color: '#22c55e', marginBottom: '10px' }}>
          Expérience Terminée!
        </h2>
        <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '30px' }}>
          {currentExperiment?.titleFr}
        </h3>
        
        {allResults.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ fontSize: '16px', color: '#666', marginBottom: '15px' }}>
              Résultats obtenus:
            </h4>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {allResults.map((result, i) => (
                <div key={i} style={{
                  background: result.color,
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                }}>
                  {result.value}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button
            onClick={() => resetExperiment()}
            style={{
              padding: '12px 25px',
              fontSize: '16px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            🔄 Recommencer
          </button>
          <button
            onClick={() => navigate('/experiments')}
            style={{
              padding: '12px 25px',
              fontSize: '16px',
              background: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            📚 Autres expériences
          </button>
        </div>
      </div>
    </div>
  )
}
