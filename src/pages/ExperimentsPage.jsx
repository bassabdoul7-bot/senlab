import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Beaker, Zap, Atom, Microscope } from 'lucide-react'
import { experiments } from '../data/experiments'

const icons = { chemistry: Beaker, electricity: Zap, mechanics: Atom, biology: Microscope }
const colors = {
  chemistry: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  electricity: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  mechanics: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  biology: 'bg-green-500/10 text-green-400 border-green-500/20',
}

export default function ExperimentsPage() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(searchParams.get('cat') || 'all')
  const [level, setLevel] = useState('all')

  const filtered = experiments.filter(exp => {
    const matchSearch = exp.titleFr.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'all' || exp.category === category
    const matchLevel = level === 'all' || exp.level === level
    return matchSearch && matchCat && matchLevel
  })

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="px-6 py-4 border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-slate-800 rounded-lg"><ArrowLeft className="w-5 h-5 text-slate-400" /></Link>
            <h1 className="text-xl font-bold text-white">Experiences</h1>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500 w-64" />
          </div>
        </div>
      </header>

      <main className="px-6 py-8 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex gap-2">
            {['all', 'chemistry', 'electricity', 'mechanics', 'biology'].map(c => (
              <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${category === c ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                {c === 'all' ? 'Toutes' : c === 'chemistry' ? 'Chimie' : c === 'electricity' ? 'Electricite' : c === 'mechanics' ? 'Mecanique' : 'Biologie'}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            {['all', 'bfem', 'bac'].map(l => (
              <button key={l} onClick={() => setLevel(l)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${level === l ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                {l === 'all' ? 'Tous' : l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <p className="text-slate-500 mb-6">{filtered.length} experiences</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((exp, i) => {
            const Icon = icons[exp.category] || Beaker
            return (
              <motion.div key={exp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Link to={`/lab/${exp.id}`} className="block p-5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 rounded-xl transition group">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${colors[exp.category]} border`}><Icon className="w-5 h-5" /></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white group-hover:text-green-400">{exp.titleFr}</h3>
                      <p className="text-sm text-slate-500 mt-1">{exp.descriptionFr}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${exp.level === 'bfem' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'}`}>{exp.level.toUpperCase()}</span>
                        <span className="text-xs text-slate-500">{exp.duration} min</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
