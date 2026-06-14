import { useState } from 'react'

export default function Planos({ usuario }) {
  const [anual, setAnual] = useState(false)

  const planos = [
    {
      nome: 'Gratuito',
      emoji: '🌱',
      precoMensal: 0,
      precoAnual: 0,
      descricao: 'Para conhecer a plataforma',
      cor: 'border-gray-200',
      botao: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
      badge: null,
      badgeCor: '',
      recursos: [
        { ok: true, texto: 'Dashboard com cotações' },
        { ok: true, texto: '1 cultura monitorada' },
        { ok: true, texto: 'Acesso ao Radar da Semana' },
        { ok: false, texto: 'Alertas via WhatsApp' },
        { ok: false, texto: 'Análise pessoal com IA' },
        { ok: false, texto: 'Calculadora de equilíbrio' },
        { ok: false, texto: 'Suporte prioritário' },
      ],
    },
    {
      nome: 'Produtor',
      emoji: '🌾',
      precoMensal: 39.90,
      precoAnual: 33.12,
      descricao: 'Para produtores ativos',
      cor: 'border-green-400 ring-2 ring-green-100',
      botao: 'bg-green-600 text-white hover:bg-green-700',
      badge: 'Mais popular',
      badgeCor: 'bg-green-600',
      recursos: [
        { ok: true, texto: 'Dashboard com cotações' },
        { ok: true, texto: 'Até 3 culturas monitoradas' },
        { ok: true, texto: 'Acesso ao Radar da Semana' },
        { ok: true, texto: 'Alertas via WhatsApp diários' },
        { ok: true, texto: 'Análise pessoal com IA' },
        { ok: true, texto: 'Calculadora de equilíbrio' },
        { ok: false, texto: 'Suporte prioritário' },
      ],
    },
    {
      nome: 'Fazenda',
      emoji: '🏡',
      precoMensal: 89.90,
      precoAnual: 74.62,
      descricao: 'Para grandes operações',
      cor: 'border-amber-400 ring-2 ring-amber-50',
      botao: 'bg-amber-500 text-white hover:bg-amber-600',
      badge: 'Completo',
      badgeCor: 'bg-amber-500',
      recursos: [
        { ok: true, texto: 'Dashboard com cotações' },
        { ok: true, texto: 'Culturas ilimitadas' },
        { ok: true, texto: 'Acesso ao Radar da Semana' },
        { ok: true, texto: 'Alertas via WhatsApp diários' },
        { ok: true, texto: 'Análise pessoal com IA avançada' },
        { ok: true, texto: 'Calculadora de equilíbrio' },
        { ok: true, texto: 'Suporte prioritário 24h' },
      ],
    },
  ]

  const formatPreco = (valor) => {
    if (valor === 0) return 'R$ 0'
    return `R$ ${valor.toFixed(2).replace('.', ',')}`
  }

  const economiaAnual = (plano) => {
    if (plano.precoMensal === 0) return null
    const economia = (plano.precoMensal - plano.precoAnual) * 12
    return `Economize R$ ${economia.toFixed(0)} por ano`
  }

  return (
    <div>
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <h1 className="text-base font-medium text-gray-800">Planos e Preços</h1>
        <p className="text-xs text-gray-400">Escolha o plano ideal para sua operação</p>
      </div>

      <div className="p-6 flex flex-col gap-6">

        {/* Toggle Mensal / Anual */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <span className={`text-sm ${!anual ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>Mensal</span>
            <button
              onClick={() => setAnual(!anual)}
              className={`w-12 h-6 rounded-full transition-all relative ${anual ? 'bg-green-500' : 'bg-gray-200'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${anual ? 'left-7' : 'left-1'}`} />
            </button>
            <span className={`text-sm ${anual ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
              Anual <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full ml-1">-17%</span>
            </span>
          </div>
          {anual && (
            <p className="text-xs text-green-600 font-medium animate-pulse">
              🎉 Você está economizando até R$ 183 por ano!
            </p>
          )}
        </div>

        {/* Cards de planos */}
        <div className="grid grid-cols-3 gap-4">
          {planos.map((plano, i) => {
            const precoAtual = anual ? plano.precoAnual : plano.precoMensal
            const isAtual = plano.nome === 'Produtor' && usuario?.plano === 'assinante'

            return (
              <div key={i} className={`bg-white border-2 rounded-2xl p-6 flex flex-col gap-4 relative ${plano.cor}`}>
                {plano.badge && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap ${plano.badgeCor}`}>
                    {plano.badge}
                  </span>
                )}

                <div>
                  <p className="text-2xl mb-1">{plano.emoji}</p>
                  <p className="text-base font-semibold text-gray-800">{plano.nome}</p>
                  <p className="text-xs text-gray-400">{plano.descricao}</p>
                </div>

                <div className="flex flex-col gap-0.5">
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-bold text-gray-800">{formatPreco(precoAtual)}</span>
                    <span className="text-xs text-gray-400 mb-1">/mês</span>
                  </div>
                  {anual && plano.precoMensal > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-300 line-through">{formatPreco(plano.precoMensal)}</span>
                      <span className="text-xs text-green-600 font-medium">{economiaAnual(plano)}</span>
                    </div>
                  )}
                  {anual && plano.precoMensal > 0 && (
                    <p className="text-xs text-gray-400">
                      Cobrado anualmente · R$ {(precoAtual * 12).toFixed(2).replace('.', ',')}/ano
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  {plano.recursos.map((r, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs">
                      <span className={r.ok ? 'text-green-500' : 'text-gray-300'}>{r.ok ? '✓' : '✕'}</span>
                      <span className={r.ok ? 'text-gray-700' : 'text-gray-300'}>{r.texto}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full text-sm py-2.5 rounded-xl font-medium transition-all mt-auto ${plano.botao}`}>
                  {plano.nome === 'Gratuito'
                    ? 'Começar grátis'
                    : isAtual
                    ? '✓ Plano atual'
                    : 'Assinar agora'}
                </button>
              </div>
            )
          })}
        </div>

        {/* Banner plano atual */}
        <div className="bg-green-50 border border-green-100 rounded-xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">⭐</span>
            <div>
              <p className="text-sm font-medium text-green-800">Você está no Plano Produtor</p>
              <p className="text-xs text-green-600">
                {anual
                  ? 'Plano anual ativo · Próxima renovação em 13/06/2027 · R$ 397,40/ano'
                  : 'Próxima cobrança em 13/07/2026 · R$ 39,90'}
              </p>
            </div>
          </div>
          <button className="text-xs border border-red-200 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
            Cancelar
          </button>
        </div>

        {/* Rodapé de segurança */}
        <div className="text-center text-xs text-gray-400">
          🔒 Pagamento seguro via Stripe · 7 dias de garantia · Cancele quando quiser
        </div>

      </div>
    </div>
  )
}