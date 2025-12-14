import { create } from 'zustand'

export const useVoiceStore = create((set, get) => ({
  isSpeaking: false,
  voiceRate: 0.85,
  selectedVoice: null,
  availableVoices: [],

  setVoices: (voices) => {
    const fr = voices.filter(v => v.lang.startsWith('fr'))
    set({ availableVoices: fr, selectedVoice: fr[0] || null })
  },

  speak: (text, onEnd) => {
    const { selectedVoice, voiceRate } = get()
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'fr-FR'
    u.rate = voiceRate
    if (selectedVoice) u.voice = selectedVoice
    u.onstart = () => set({ isSpeaking: true })
    u.onend = () => { set({ isSpeaking: false }); if (onEnd) onEnd() }
    u.onerror = () => set({ isSpeaking: false })
    window.speechSynthesis.speak(u)
  },

  stop: () => { window.speechSynthesis.cancel(); set({ isSpeaking: false }) },
  setRate: (rate) => set({ voiceRate: rate }),
}))
