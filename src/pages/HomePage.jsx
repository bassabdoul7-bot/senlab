import { Link } from 'react-router-dom'
import { Beaker, Zap, Atom, FlaskConical, GraduationCap, ChevronRight, Microscope } from 'lucide-react'

export default function HomePage() {
  const categories = [
    { icon: Beaker, name: 'Chimie', count: 27, color: '#3b82f6', path: '/experiments?cat=chemistry' },
    { icon: Zap, name: 'Electricite', count: 22, color: '#f59e0b', path: '/experiments?cat=electricity' },
    { icon: Atom, name: 'Mecanique', count: 12, color: '#a855f7', path: '/experiments?cat=mechanics' },
    { icon: Microscope, name: 'Biologie', count: 10, color: '#22c55e', path: '/experiments?cat=biology' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f172a, #1e293b, #0f172a)' }}>
      {/* Header */}
      <header style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FlaskConical size={24} color="white" />
          </div>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>SenLab</span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link to="/experiments" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Experiences</Link>
          <Link to="/lab" style={{ padding: '8px 16px', background: '#16a34a', borderRadius: '8px', color: 'white', textDecoration: 'none', fontWeight: '500' }}>Entrer au Labo</Link>
        </nav>
      </header>

      {/* Hero */}
      <main style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '50px', color: '#4ade80', fontSize: '14px', marginBottom: '24px' }}>
            <GraduationCap size={16} />
            Preparation BFEM & BAC
          </div>
          
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '16px', lineHeight: 1.2 }}>
            Laboratoire Virtuel
          </h1>
          <h2 className="gradient-text" style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px', background: 'linear-gradient(to right, #4ade80, #facc15, #f87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            pour le Senegal
          </h2>
          
          <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Explorez 73 experiences scientifiques en 3D avec guidage vocal en francais. Chimie, Physique, Biologie - aligne sur le programme senegalais.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/lab" style={{ padding: '16px 32px', background: 'linear-gradient(to right, #16a34a, #22c55e)', borderRadius: '12px', color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 40px rgba(34, 197, 94, 0.3)' }}>
              Commencer <ChevronRight size={20} />
            </Link>
            <Link to="/experiments" style={{ padding: '16px 32px', background: '#334155', borderRadius: '12px', color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '18px' }}>
              Voir les Experiences
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div style={{ maxWidth: '900px', margin: '80px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {categories.map((cat) => (
            <Link key={cat.name} to={cat.path} style={{ padding: '24px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid #334155', borderRadius: '16px', textDecoration: 'none', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <cat.icon size={24} color="white" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>{cat.name}</h3>
              <p style={{ fontSize: '14px', color: '#64748b' }}>{cat.count} experiences</p>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', borderTop: '1px solid #1e293b', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
        <p>🇸🇳 Concu pour les etudiants senegalais | SenLab_Virtual 2024</p>
      </footer>
    </div>
  )
}
