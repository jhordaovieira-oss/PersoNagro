import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function Dashboard({ usuario }) {
  const [cotacao, setCotacao] = useState(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function buscarCotacao() {
      try {
        setLoading(true)
        const res = await fetch(`${API_URL}/api/cotacoes/${usuario.cultura}`)
        if (!res.ok) throw new Error('Erro ao buscar cotação')
        const data = await res.json()
        setCotacao(data)
      } catch (err) {
        setErro('Não foi possível carregar as cotações.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (usuario?.cultura) buscarCotacao()
  }, [usuario])

  const valorFormatado = cotacao ? `R$ ${cotacao.valor.toFixed(2).replace('.', ',')}` : '---'
  const tendencia = cotacao?.tendencia || '---'
  const variacao = cotacao?.variacao || '---'
  const dolar = cotacao ? `R$ ${cotacao.dolar.toFixed(2).replace('.', ',')}` : '---'
  const corVariacao = variacao.startsWith('+') ? 'text-green-600' : 'text-red-500'

  return (
    <div>
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-medium text-gray-800">Bom dia, {usuario.nome.split(' ')[0]} 👋</h1>
          <p className="text-xs text-gray-400">{usuario.cultura} · {usuario.estado} · Hoje, 13 de junho de 2026</p>
        </div>
        <button className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-50">
          🔔 Alertas
        </button>
      </div>

      <div className="p-6 flex flex-col gap-5">

        {erro && (
          <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-700">
            ⚠️ {erro}
          </div>
        )}

        {cotacao?.analiseIA && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-amber-800">
            📈 <span><strong>IA detectou:</strong> {cotacao.analiseIA}</span>
          </div>
        )}

        <div>
          <p className="text-xs font-medium text-gray-400 mb-3">COTAÇÕES DE HOJE — {usuario.cultura.toUpperCase()}</p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: `Saca 60kg (${usuario.estado.slice(0, 2).toUpperCase()})`, valor: loading ? '...' : valorFormatado, badge: loading ? '...' : variacao, cor: corVariacao },
              { label: 'Dólar', valor: loading ? '...' : dolar, badge: '↑ +0,3%', cor: 'text-green-600' },
              { label: 'CBOT Chicago', valor: 'US$ 9,82', badge: '↓ -0,5%', cor: 'text-red-500' },
              { label: 'Tendência IA', valor: loading ? '...' : `↑ ${tendencia}`, badge: 'Confiança 74%', cor: 'text-green-700' },
            ].map((card, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">{card.label}</p>
                <p className={`text-xl font-medium ${i === 3 ? card.cor : 'text-gray-800'}`}>{card.valor}</p>
                <p className={`text-xs mt-1 ${card.cor}`}>{card.badge}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-800 mb-3">Fatores de Risco</p>
            {[
              { fator: 'Câmbio (USD)', status: 'Favorável', cor: 'bg-green-50 text-green-700' },
              { fator: 'Clima MT', status: 'Estável', cor: 'bg-amber-50 text-amber-700' },
              { fator: 'Fretes', status: 'Pressão', cor: 'bg-red-50 text-red-700' },
              { fator: 'Demanda China', status: 'Crescendo', cor: 'bg-green-50 text-green-700' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-1.5 text-xs border-b border-gray-50 last:border-0">
                <span className="text-gray-500">{item.fator}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${item.cor}`}>{item.status}</span>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-800 mb-3">Próxima Mensagem WhatsApp</p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 leading-relaxed border-l-4 border-green-400">
              🌱 <strong className="text-gray-800">Bom dia, {usuario.nome.split(' ')[0]}!</strong><br />
              A saca de <strong className="text-gray-800">{usuario.cultura}</strong> em {usuario.estado} está em <strong className="text-gray-800">{valorFormatado}</strong>.<br />
              A tendência para hoje é <strong className="text-green-700">↑ {tendencia}</strong>.<br />
              Confira os detalhes no portal.
            </div>
            <p className="text-xs text-gray-400 mt-2">🕐 Envio agendado para 06:30 — amanhã</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-800 mb-3">Últimas Notícias</p>
          {[
            { tag: 'Positivo', cor: 'bg-green-50 text-green-700', texto: 'China amplia importações de soja brasileira no 2º semestre', data: '12 jun · Reuters' },
            { tag: 'Negativo', cor: 'bg-red-50 text-red-700', texto: 'USDA eleva estimativa de produção dos EUA para 2025/26', data: '11 jun · AgriView' },
            { tag: 'Neutro', cor: 'bg-amber-50 text-amber-700', texto: 'Safra argentina encerra colheita dentro do esperado por analistas', data: '10 jun · Canal Rural' },
          ].map((n, i) => (
            <div key={i} className="flex gap-3 items-start py-2 border-b border-gray-50 last:border-0">
              <span className={`text-xs px-2 py-0.5 rounded-md whitespace-nowrap ${n.cor}`}>{n.tag}</span>
              <div>
                <p className="text-xs text-gray-700">{n.texto}</p>
                <p className="text-xs text-gray-400 mt-0.5">{n.data}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
