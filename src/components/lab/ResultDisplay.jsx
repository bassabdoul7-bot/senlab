import { useLabStore } from '../../stores/useLabStore'

export default function ResultDisplay() {
  const showResult = useLabStore((s) => s.showResult)
  
  if (!showResult) return null
  
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: showResult.color || '#22c55e',
      color: 'white',
      padding: '30px 50px',
      borderRadius: '20px',
      fontSize: '28px',
      fontWeight: 'bold',
      textAlign: 'center',
      boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
      zIndex: 1000,
      animation: 'popIn 0.3s ease-out',
    }}>
      <div style={{ fontSize: '48px', marginBottom: '10px' }}>
        {showResult.value}
      </div>
      <div style={{ fontSize: '18px', opacity: 0.9 }}>
        {showResult.description}
      </div>
    </div>
  )
}
