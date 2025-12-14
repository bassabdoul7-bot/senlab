import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LabPage from './pages/LabPage'
import ExperimentsPage from './pages/ExperimentsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/lab/:experimentId" element={<LabPage />} />
        <Route path="/experiments" element={<ExperimentsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
