import { motion, AnimatePresence } from 'framer-motion'
import { FlaskConical } from 'lucide-react'
import { useLabStore } from '../../stores/useLabStore'

export default function LoadingScreen() {
  const isLabReady = useLabStore((s) => s.isLabReady)
  return (
    <AnimatePresence>
      {!isLabReady && (
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center z-50">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6">
            <FlaskConical className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-xl font-semibold text-white mb-2">Chargement du laboratoire...</h2>
          <div className="w-64 h-1 bg-slate-800 rounded-full mt-8 overflow-hidden">
            <motion.div className="h-full bg-green-500" initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1, repeat: Infinity }} style={{ width: '50%' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
