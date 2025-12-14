import { useState, useEffect, useRef } from 'react'
import { useLabStore } from '../../stores/useLabStore'

export default function Mascot() {
  const currentExperiment = useLabStore((s) => s.currentExperiment)
  const currentStep = useLabStore((s) => s.currentStep)
  const isLabReady = useLabStore((s) => s.isLabReady)
  const objectivesDismissed = useLabStore((s) => s.objectivesDismissed)
  
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [guidanceStarted, setGuidanceStarted] = useState(false)
  const [voicesReady, setVoicesReady] = useState(false)
  const hasAutoSpoken = useRef(false)
  
  const speak = (text) => {
    if (!text) return
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'fr-FR'
    utterance.rate = 0.95
    utterance.volume = 1
    
    const voices = window.speechSynthesis.getVoices()
    const frenchVoice = voices.find(v => v.lang.startsWith('fr'))
    if (frenchVoice) utterance.voice = frenchVoice
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    
    window.speechSynthesis.speak(utterance)
  }
  
  const welcomeMessage = currentExperiment ? `Bienvenue sur SenLab! Aujourd'hui, nous allons faire l'expérience sur ${currentExperiment.titleFr}. Lisez les objectifs et cliquez sur Commencer.` : ''
  
  const getStepMessage = () => {
    const step = currentExperiment?.steps?.[currentStep]
    return step?.voiceFr || step?.instruction || ''
  }
  
  const getMessage = () => {
    if (!objectivesDismissed) return welcomeMessage
    if (!guidanceStarted) return "Prêt à commencer! Cliquez sur le bouton vert ci-dessous."
    return getStepMessage()
  }
  
  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) setVoicesReady(true)
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
    return () => window.speechSynthesis.cancel()
  }, [])
  
  // Auto-speak welcome when ready
  useEffect(() => {
    if (isLabReady && currentExperiment && !objectivesDismissed && !hasAutoSpoken.current && voicesReady) {
      hasAutoSpoken.current = true
      setTimeout(() => speak(welcomeMessage), 300)
    }
  }, [isLabReady, currentExperiment, objectivesDismissed, voicesReady])
  
  // Stop speech when Commencer clicked
  useEffect(() => {
    if (objectivesDismissed) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [objectivesDismissed])
  
  const handleStartTP = () => {
    setGuidanceStarted(true)
    setTimeout(() => speak(getStepMessage()), 100)
  }
  
  const handleMascotClick = () => {
    if (guidanceStarted) {
      speak(getStepMessage())
    }
  }
  
  if (!currentExperiment || !isLabReady) return null
  
  const message = getMessage()
  const showTPButton = objectivesDismissed && !guidanceStarted
  
  return (
    <div style={{ position: 'fixed', bottom: '100px', left: '20px', display: 'flex', alignItems: 'flex-end', gap: '15px', zIndex: objectivesDismissed ? 100 : 1001 }}>
      <div onClick={handleMascotClick} style={{ width: '100px', height: '120px', position: 'relative', cursor: guidanceStarted ? 'pointer' : 'default', animation: !isSpeaking ? 'bounce 1s ease-in-out infinite' : 'none' }}>
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '70px', height: '85px', background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '35px 35px 25px 25px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
          <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', color: 'white' }}>SenLab</div>
        </div>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '55px', background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '50%', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
          <div style={{ position: 'absolute', top: '18px', left: '12px', width: '12px', height: '12px', background: isSpeaking ? '#22c55e' : '#22d3ee', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '18px', right: '12px', width: '12px', height: '12px', background: isSpeaking ? '#22c55e' : '#22d3ee', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', width: isSpeaking ? '15px' : '20px', height: isSpeaking ? '15px' : '8px', background: '#475569', borderRadius: isSpeaking ? '50%' : '0 0 10px 10px', animation: isSpeaking ? 'talk 0.3s ease-in-out infinite' : 'none' }} />
        </div>
        <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', width: '70px', height: '30px', borderTop: '4px solid #475569', borderRadius: '50% 50% 0 0' }} />
        <div style={{ position: 'absolute', top: '20px', left: '2px', width: '16px', height: '20px', background: '#475569', borderRadius: '8px' }} />
        <div style={{ position: 'absolute', top: '20px', right: '2px', width: '16px', height: '20px', background: '#475569', borderRadius: '8px' }} />
        {isSpeaking && <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '30px', height: '30px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔊</div>}
        {guidanceStarted && !isSpeaking && <div style={{ position: 'absolute', top: '-15px', right: '-15px', background: '#fbbf24', color: '#000', padding: '5px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>🔊 Écoutez!</div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ position: 'relative', background: 'rgba(30, 41, 59, 0.95)', color: 'white', padding: '15px 20px', borderRadius: '15px', maxWidth: '300px', fontSize: '14px', lineHeight: 1.5, border: isSpeaking ? '2px solid #22c55e' : '1px solid #475569', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
          <div style={{ position: 'absolute', left: '-10px', bottom: '20px', width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderRight: '10px solid rgba(30, 41, 59, 0.95)' }} />
          {message}
        </div>
        {showTPButton && (
          <button onClick={handleStartTP} style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: 'white', border: 'none', padding: '15px 25px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)', animation: 'pulse 1.5s ease-in-out infinite' }}>
            🎬 Démarrer le TP
          </button>
        )}
      </div>
      <style>{`
        @keyframes talk { 0%, 100% { height: 8px; } 50% { height: 15px; } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      `}</style>
    </div>
  )
}
