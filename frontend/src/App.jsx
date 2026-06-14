import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Radar from './pages/Radar'
import Analise from './pages/Analise'
import Calculadora from './pages/Calculadora'
import Configuracoes from './pages/Configuracoes'
import Cadastro from './pages/Cadastro'
import Sidebar from './components/Sidebar'
import Whatsapp from './pages/Whatsapp'
import Planos from './pages/Planos'

export default function App() {
  const [pagina, setPagina] = useState('dashboard')
  const [usuario] = useState({
    nome: 'João Ribeiro',
    cultura: 'Soja',
    estado: 'Mato Grosso',
    whatsapp: '+55 65 99234-5678',
    assinante: true,
    plano: 'assinante'
  })

  if (pagina === 'cadastro') {
    return <Cadastro onEntrar={() => setPagina('dashboard')} />
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar pagina={pagina} setPagina={setPagina} usuario={usuario} />
      <main className="flex-1 overflow-y-auto">
        {pagina === 'dashboard' && <Dashboard usuario={usuario} />}
        {pagina === 'radar' && <Radar usuario={usuario} />}
        {pagina === 'analise' && <Analise usuario={usuario} />}
        {pagina === 'calculadora' && <Calculadora />}
        {pagina === 'whatsapp' && <Whatsapp usuario={usuario} />}
        {pagina === 'configuracoes' && <Configuracoes usuario={usuario} setPagina={setPagina} />}
        {pagina === 'planos' && <Planos usuario={usuario} />}
      </main>
    </div>
  )
}