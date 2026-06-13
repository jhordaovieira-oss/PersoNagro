import { useState } from 'react'

export default function Configuracoes({ usuario }) {
  const [form, setForm] = useState({
    nome: usuario.nome,
    email: 'joao@fazendaribeiro.com.br',
    whatsapp: usuario.whatsapp,
    estado: usuario.estado,
    cultura: usuario.cultura,
  })
  const [salvo, setSalvo] = useState(false)

  function salvar() {
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2000)
  }

  const culturas = ['Soja', 'Milho', 'Café', 'Boi Gordo']
  const estados = ['Mato Grosso', 'Goiás', 'Paraná', 'Minas Gerais', 'São Paulo', 'Mato Grosso do Sul']

  return (
    <div>
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <h1 className="text-base font-medium text-gray-800">Configurações</h1>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <p className="text-sm font-medium text-gray-800 mb-4">Perfil do Produtor</p>
          <div className="flex flex-col gap-3">
            {[
              { key: 'nome', label: 'Nome completo', type: 'text' },
              { key: 'email', label: 'E-mail', type: 'email' },
              { key: 'whatsapp', label: 'WhatsApp', type: 'tel' },
            ].map(campo => (
              <div key={campo.key} className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">{campo.label}</label>
                <input
                  type={campo.type}
                  value={form[campo.key]}
                  onChange={e => setForm({ ...form, [campo.key]: e.target.value })}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Estado</label>
              <select
                value={form.estado}
                onChange={e => setForm({ ...form, estado: e.target.value })}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400"
              >
                {estados.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Cultura principal</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {culturas.map(c => (
                  <button
                    key={c}
                    onClick={() => setForm({ ...form, cultura: c })}
                    className={`text-xs py-2 rounded-lg border transition-all ${
                      form.cultura === c
                        ? 'border-green-400 bg-green-50 text-green-800 font-medium'
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {c === 'Soja' ? '🌱' : c === 'Milho' ? '🌽' : c === 'Café' ? '☕' : '🐄'} {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={salvar}
                className="flex-1 bg-green-600 text-white text-xs py-2 rounded-lg hover:bg-green-700 transition-all"
              >
                {salvo ? '✓ Salvo!' : 'Salvar alterações'}
              </button>
              <button className="flex-1 border border-gray-200 text-gray-500 text-xs py-2 rounded-lg hover:bg-gray-50">
                📱 Enviar Teste WhatsApp
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <p className="text-sm font-medium text-gray-800 mb-4">Assinatura</p>
          <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3 mb-4">
            <span className="text-xl">⭐</span>
            <div>
              <p className="text-sm font-medium text-green-800">Plano Assinante</p>
              <p className="text-xs text-green-600">Ativo · próx. cobrança em 13/07/2026</p>
            </div>
          </div>
          {[
            { label: 'Valor mensal', valor: 'R$ 39,90' },
            { label: 'Forma de pagamento', valor: 'Cartão ···· 4242' },
            { label: 'Membro desde', valor: '13/05/2026' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between text-xs py-2 border-b border-gray-50 last:border-0">
              <span className="text-gray-500">{item.label}</span>
              <strong className="text-gray-800">{item.valor}</strong>
            </div>
          ))}
          <button className="mt-4 w-full border border-red-100 text-red-400 text-xs py-2 rounded-lg hover:bg-red-50">
            Cancelar assinatura
          </button>
        </div>
      </div>
    </div>
  )
}