export const experiments = [
  {
    id: 'c4-ph-measurement',
    title: 'Mesure du pH',
    titleFr: 'Mesure du pH',
    description: 'Apprenez a mesurer le pH de differentes solutions',
    category: 'chemistry',
    level: 'BFEM',
    duration: 20,
    objectives: [
      "Définir le pH d'une solution",
      "Distinguer une solution acide, basique et neutre",
      "Utiliser correctement un pH-mètre",
      "Interpréter les valeurs de pH mesurées",
    ],
    equipment: [
      { id: 'phmeter', type: 'phmeter', label: 'pH-mètre', position: [0.8, 0.95, 0.2], scale: 0.1, rotation: [0, 0, 0] },
      { id: 'beaker-acid', type: 'beaker', label: 'Bécher acide (HCl)', position: [0.4, 0.95, 0.2], scale: 0.08, rotation: [0, 0, 0] },
      { id: 'beaker-base', type: 'beaker', label: 'Bécher base (NaOH)', position: [0.1, 0.95, 0.2], scale: 0.08, rotation: [0, 0, 0] },
      { id: 'beaker-water', type: 'beaker', label: 'Eau distillée', position: [-0.2, 0.95, 0.2], scale: 0.08, rotation: [0, 0, 0] },
      { id: 'graduated', type: 'graduated', label: 'Éprouvette', position: [-0.5, 0.95, 0.2], scale: 0.06, rotation: [0, 0, 0] },
    ],
    steps: [
      {
        instruction: 'Identifiez le pH-mètre',
        voiceFr: 'Bienvenue! Commencez par identifier le pH-mètre sur votre paillasse. Cliquez dessus.',
        highlightEquipment: ['phmeter']
      },
      {
        instruction: 'Repérez les béchers',
        voiceFr: 'Excellent! Maintenant, repérez les trois béchers contenant les solutions à analyser.',
        highlightEquipment: ['beaker-acid', 'beaker-base', 'beaker-water']
      },
      {
        instruction: 'Mesurez le pH de l\'acide',
        voiceFr: 'Plongez le pH-mètre dans le bécher contenant l\'acide chlorhydrique (HCl).',
        highlightEquipment: ['phmeter', 'beaker-acid'],
        results: {
          'beaker-acid': { value: 'pH = 2', color: '#ef4444', description: 'Solution acide!' }
        }
      },
      {
        instruction: 'Rincez le pH-mètre',
        voiceFr: 'Très bien! Rincez maintenant le pH-mètre dans l\'eau distillée pour éviter la contamination.',
        highlightEquipment: ['phmeter', 'beaker-water'],
        results: {
          'beaker-water': { value: 'pH = 7', color: '#22c55e', description: 'Solution neutre' }
        }
      },
      {
        instruction: 'Mesurez le pH de la base',
        voiceFr: 'Parfait! Plongez le pH-mètre dans le bécher contenant la soude (NaOH).',
        highlightEquipment: ['phmeter', 'beaker-base'],
        results: {
          'beaker-base': { value: 'pH = 12', color: '#3b82f6', description: 'Solution basique!' }
        }
      },
    ],
    quiz: [
      {
        question: 'Quelle est la valeur du pH d\'une solution neutre?',
        options: ['pH = 0', 'pH = 7', 'pH = 14', 'pH = 2'],
        correct: 1,
      },
      {
        question: 'Une solution avec pH = 2 est:',
        options: ['Neutre', 'Basique', 'Acide', 'Impossible'],
        correct: 2,
      },
      {
        question: 'Pourquoi rincer le pH-mètre entre les mesures?',
        options: ['Pour le sécher', 'Pour éviter la contamination', 'Pour le calibrer', 'Ce n\'est pas nécessaire'],
        correct: 1,
      },
    ]
  },
]
export const getExperimentById = (id) => experiments.find(exp => exp.id === id)
export const getExperimentsByCategory = (category) => experiments.filter(exp => exp.category === category)
export const getExperimentsByLevel = (level) => experiments.filter(exp => exp.level === level)
