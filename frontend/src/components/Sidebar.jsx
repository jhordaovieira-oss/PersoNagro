export default function Sidebar({ pagina, setPagina, usuario }) {
  const itens = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'radar', label: 'Radar da Semana', icon: '📰' },
    { id: 'analise', label: 'Análise Pessoal', icon: '📈' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
    { id: 'calculadora', label: 'Calculadora', icon: '🧮' },
    { id: 'planos', label: 'Planos', icon: '⭐' },
    { id: 'configuracoes', label: 'Configurações', icon: '⚙️' },
  ]

  return (
    <aside className="w-56 min-w-56 bg-white border-r border-gray-100 flex flex-col py-5">
      <div className="px-5 mb-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-verde-400 rounded-lg flex items-center justify-center text-white text-lg">🌱</div>
        <div>
          <p className="text-sm font-medium text-gray-800">PersonalAgro</p>
          <p className="text-xs text-green-600">Inteligência no campo</p>
        </div>
      </div>

      <nav className="flex-1 px-3 flex flex-col gap-1">
        {itens.map(item => (
          <button
            key={item.id}
            onClick={() => setPagina(item.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm w-full text-left transition-all ${
              pagina === item.id
                ? 'bg-green-50 text-green-800 font-medium'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-3 mt-4 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-xs font-medium text-green-800">
            {usuario.nome.split(' ').map(n => n[0]).join('').slice(0,2)}
          </div>
          <div>
            <p className="text-xs font-medium text-gray-800">{usuario.nome}</p>
            <p className="text-xs text-gray-400">{usuario.cultura} · {usuario.estado}</p>
          </div>
        </div>
        <span className="ml-2 mt-1 inline-block text-xs bg-green-50 text-green-800 px-2 py-0.5 rounded-full">✓ Assinante</span>
      </div>
    </aside>
  )
}