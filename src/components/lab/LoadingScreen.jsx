export default function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        border: '4px solid #334155',
        borderTop: '4px solid #22c55e',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px',
      }} />
      <h2 style={{ color: 'white', fontSize: '24px', marginBottom: '10px' }}>
        Chargement du laboratoire...
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '14px' }}>
        Préparation des équipements
      </p>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
