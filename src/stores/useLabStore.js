import { create } from 'zustand'

const experiments = {
  'c4-ph-measurement': {
    id: 'c4-ph-measurement',
    titleFr: 'Mesure du pH',
    equipment: [
      { id: 'phmeter', type: 'phmeter', label: 'pH-mètre', position: [1.0, 1.05, -1.2], scale: 0.12, rotation: [0, 0, 0] },
      { id: 'beaker-acid', type: 'beaker', label: 'Bécher acide (HCl)', position: [0.6, 1.05, -1.2], scale: 0.08, rotation: [0, 0, 0] },
      { id: 'beaker-base', type: 'beaker', label: 'Bécher base (NaOH)', position: [0.2, 1.05, -1.2], scale: 0.08, rotation: [0, 0, 0] },
      { id: 'beaker-water', type: 'beaker', label: 'Eau distillée', position: [-0.2, 1.05, -1.2], scale: 0.08, rotation: [0, 0, 0] },
      { id: 'graduated', type: 'graduated', label: 'Éprouvette', position: [-0.6, 1.05, -1.2], scale: 0.06, rotation: [0, 0, 0] },
    ],
    steps: [
      { id: 'step-1', instruction: "Identifier le pH-mètre sur votre paillasse", action: 'click', targetId: 'phmeter', highlightIds: ['phmeter'], voiceFr: "Bienvenue! Commencez par identifier le pH-mètre sur votre paillasse. Cliquez dessus." },
      { id: 'step-2', instruction: "Prendre le pH-mètre et le plonger dans la solution acide", action: 'drag-to', targetId: 'phmeter', destinationId: 'beaker-acid', highlightIds: ['phmeter', 'beaker-acid'], voiceFr: "Prenez le pH-mètre en cliquant dessus, puis déposez-le dans le bécher contenant la solution acide." },
      { id: 'step-3', instruction: "Observer la valeur du pH affichée", action: 'observe', targetId: 'phmeter-display', highlightIds: ['phmeter-display'], resultKey: 'acidPH', resultValue: 2.3, voiceFr: "Observez la valeur du pH affichée sur l'écran du pH-mètre. Notez cette valeur." },
      { id: 'step-4', instruction: "Rincer le pH-mètre avec l'eau distillée", action: 'drag-to', targetId: 'phmeter', destinationId: 'beaker-water', highlightIds: ['phmeter', 'beaker-water'], voiceFr: "Rincez l'électrode du pH-mètre avec l'eau distillée pour éviter la contamination." },
      { id: 'step-5', instruction: "Plonger le pH-mètre dans la solution basique", action: 'drag-to', targetId: 'phmeter', destinationId: 'beaker-base', highlightIds: ['phmeter', 'beaker-base'], resultKey: 'basePH', resultValue: 11.5, voiceFr: "Maintenant, plongez le pH-mètre dans le bécher contenant la solution basique." }
    ]
  }
}

export const useLabStore = create((set, get) => ({
  currentExperiment: null, currentStep: 0, isLabReady: false, objectivesDismissed: false,
  selectedObject: null, isDragging: false, dragPosition: { x: 0, y: 0, z: 0 },
  completedActions: [], results: {}, experimentComplete: false,
  setExperiment: (experiment) => set({ currentExperiment: experiment, currentStep: 0, results: {}, experimentComplete: false, completedActions: [], selectedObject: null, isDragging: false, objectivesDismissed: false }),
  setLabReady: (ready) => set({ isLabReady: ready }),
  dismissObjectives: () => set({ objectivesDismissed: true }),
  getCurrentStepData: () => { const { currentExperiment, currentStep } = get(); return currentExperiment?.steps?.[currentStep] || null },
  selectObject: (objectId) => { const stepData = get().getCurrentStepData(); if (stepData?.targetId === objectId || stepData?.highlightIds?.includes(objectId)) { set({ selectedObject: objectId, isDragging: true }); return true } return false },
  updateDragPosition: (position) => set({ dragPosition: position }),
  dropObject: (destinationId) => { const { selectedObject, currentExperiment } = get(); const stepData = get().getCurrentStepData(); if (!selectedObject || !stepData) { set({ selectedObject: null, isDragging: false }); return false } if (stepData.action === 'drag-to' && stepData.destinationId === destinationId) { if (stepData.resultKey) { set(state => ({ results: { ...state.results, [stepData.resultKey]: stepData.resultValue } })) } set(state => ({ completedActions: [...state.completedActions, stepData.id], selectedObject: null, isDragging: false, currentStep: state.currentStep + 1, experimentComplete: state.currentStep + 1 >= currentExperiment.steps.length })); return true } set({ selectedObject: null, isDragging: false }); return false },
  handleClick: (objectId) => { const stepData = get().getCurrentStepData(); const { currentExperiment } = get(); if (!stepData) return false; if ((stepData.action === 'click' || stepData.action === 'observe') && (stepData.targetId === objectId || stepData.highlightIds?.includes(objectId))) { if (stepData.resultKey) { set(state => ({ results: { ...state.results, [stepData.resultKey]: stepData.resultValue } })) } set(state => ({ completedActions: [...state.completedActions, stepData.id], currentStep: state.currentStep + 1, experimentComplete: state.currentStep + 1 >= currentExperiment.steps.length })); return true } return false },
  resetExperiment: () => set({ currentStep: 0, results: {}, experimentComplete: false, completedActions: [], selectedObject: null, isDragging: false, objectivesDismissed: false }),
  nextStep: () => set(state => { const maxStep = state.currentExperiment?.steps?.length || 0; return { currentStep: Math.min(state.currentStep + 1, maxStep - 1), experimentComplete: state.currentStep + 1 >= maxStep - 1 } }),
  prevStep: () => set(state => ({ currentStep: Math.max(state.currentStep - 1, 0) }))
}))

export const getExperimentById = (id) => experiments[id] || null
