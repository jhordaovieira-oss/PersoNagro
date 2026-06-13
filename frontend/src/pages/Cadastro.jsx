import { useState } from 'react'

export default function Cadastro({ onEntrar }) {
  const [etapa, setEtapa] = useState(1)
  const [cultura, setCultura] = useState('')
  const [form, setForm] = useState({
    nome: '', email: '', senha: '', whatsapp: '', estado: ''
  })

  const culturas = [
    { nome: 'Soja', icon: '🌱' },
    { nome: 'Milho', icon: '🌽' },
    { nome: 'Café', icon: '☕' },
    { nome: 'Boi Gordo', icon: '🐄' },
  ]

  const estados = ['Mato Grosso', 'Goiás', 'Paraná', 'Minas Gerais', 'São Paulo', 'Mato Grosso do Sul']

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3">🌱</div>
          <h2 className="text-lg font-medium text-gray-800">Criar sua conta</h2>
          <p className="text-xs text-gray-400 mt-1">Inteligência agrícola personalizada para o seu campo</p>
        </div>

        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map(n => (
            <div key={n} className={`h-1.5 flex-1 rounded-full transition-all ${n <= etapa ? 'bg-green-500' : 'bg-gray-100'}`} />
          ))}
        </div>

        {etapa === 1 && (
          <div className="flex flex-col gap-3">
            {[
              { key: 'nome', label: 'Nome completo', type: 'text', placeholder: 'Ex: João Ribeiro' },
              { key: 'email', label: 'E-mail', type: 'email', placeholder: 'seu@email.com.br' },
              { key: 'senha', label: 'Senha', type: 'password', placeholder: 'Mínimo 8 caracteres' },
              { key: 'whatsapp', label: 'WhatsApp', type: 'tel', placeholder: '+55 XX 9XXXX-XXXX' },
            ].map(campo => (
              <div key={campo.key} className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">{campo.label}</label>
                <input
                  type={campo.type}
                  placeholder={campo.placeholder}
                  value={form[campo.key]}
                  onChange={e => setForm({ ...form, [campo.key]: e.target.value })}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400"
                />
              </div>
            ))}
            <button
              onClick={() => setEtapa(2)}
              className="mt-2 bg-green-600 text-white text-sm py-2.5 rounded-lg hover:bg-green-700"
            >
              Continuar →
            </button>
          </div>
        )}

        {etapa === 2 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-gray-700">Qual é sua cultura principal?</p>
            <div className="grid grid-cols-2 gap-2">
              {culturas.map(c => (
                <button
                  key={c.nome}
                  onClick={() => setCultura(c.nome)}
                  className={`border rounded-xl py-3 text-sm transition-all ${
                    cultura === c.nome
                      ? 'border-green-400 bg-green-50 text-green-800 font-medium'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xl mb-1">{c.icon}</div>
                  {c.nome}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Estado</label>
              <select
                value={form.estado}
                onChange={e => setForm({ ...form, estado: e.target.value })}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400"
              >
                <option value="">Selecione...</option>
                {estados.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
            <button
              onClick={() => setEtapa(3)}
              className="bg-green-600 text-white text-sm py-2.5 rounded-lg hover:bg-green-700"
            >
              Continuar →
            </button>
          </div>
        )}

        {etapa === 3 && (
          <div className="flex flex-col gap-4">
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
              <p className="text-3xl font-medium text-green-800">R$ 39,90 <span className="text-sm font-normal text-gray-400">/ mês</span></p>
              <div className="flex flex-col gap-1 text-xs text-gray-500 mt-3 text-left">
                {['Cotações em tempo real', 'Análise IA personalizada', 'Relatórios diários no WhatsApp', 'Calculadora de equilíbrio', 'Cancele quando quiser'].map(b => (
                  <span key={b}>✓ {b}</span>
                ))}
              </div>
            </div>
            <button
              onClick={onEntrar}
              className="bg-green-600 text-white text-sm py-2.5 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
            >
              🔒 Assinar com cartão — Stripe
            </button>
          </div>
        )}
      </div>
    </div>
  )
}