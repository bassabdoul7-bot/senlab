import { useLabStore } from '../../stores/useLabStore'

export default function ObjectivesScreen() {
  const currentExperiment = useLabStore((s) => s.currentExperiment)
  const isLabReady = useLabStore((s) => s.isLabReady)
  const objectivesDismissed = useLabStore((s) => s.objectivesDismissed)
  const dismissObjectives = useLabStore((s) => s.dismissObjectives)
  
  if (!isLabReady || objectivesDismissed || !currentExperiment) return null
  
  const objectives = currentExperiment.objectives || []
  
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', borderRadius: '20px', padding: '40px', maxWidth: '600px', width: '90%', border: '1px solid #475569' }}>
        <div style={{ display: 'inline-block', background: '#8b5cf6', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '15px' }}>🧪 CHIMIE</div>
        <h2 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>{currentExperiment.titleFr}</h2>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>📚 Niveau: <strong style={{ color: '#fbbf24' }}>{currentExperiment.level}</strong></span>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>⏱️ Durée: <strong style={{ color: '#fbbf24' }}>{currentExperiment.duration} min</strong></span>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '20px', marginBottom: '25px' }}>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '15px' }}>À la fin de cette expérience, l'élève sera capable de:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {objectives.map((obj, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ background: '#22c55e', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{i + 1}</span>
                <span style={{ color: 'white', fontSize: '15px' }}>{obj}</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={dismissObjectives} style={{ width: '100%', padding: '16px', fontSize: '18px', fontWeight: 'bold', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>
          🚀 Commencer l'expérience
        </button>
      </div>
    </div>
  )
}
