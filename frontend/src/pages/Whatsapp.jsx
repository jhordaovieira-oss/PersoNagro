import { useState } from 'react'

export default function Whatsapp({ usuario }) {
  const [simulando, setSimulando] = useState(false)
  const [etapa, setEtapa] = useState(0)
  const [enviado, setEnviado] = useState(false)

  const historico = [
    { data: '13/06 06:30', cotacao: 'R$ 148,50', tendencia: 'Alta', ok: true },
    { data: '12/06 06:30', cotacao: 'R$ 145,80', tendencia: 'Alta', ok: true },
    { data: '11/06 06:30', cotacao: 'R$ 144,20', tendencia: 'Estável', ok: true },
    { data: '10/06 06:30', cotacao: 'R$ 146,10', tendencia: 'Baixa', ok: true },
  ]

  const etapas = [
    '🔌 Conectando à Z-API...',
    '📋 Buscando cotação do dia...',
    '✍️ Gerando mensagem personalizada...',
    '📤 Enviando para ' + usuario.whatsapp + '...',
    '✅ Mensagem entregue com sucesso!',
  ]

  function simularEnvio() {
    setSimulando(true)
    setEtapa(0)
    setEnviado(false)

    let i = 0
    const intervalo = setInterval(() => {
      i++
      setEtapa(i)
      if (i >= etapas.length - 1) {
        clearInterval(intervalo)
        setTimeout(() => {
          setSimulando(false)
          setEnviado(true)
        }, 1000)
      }
    }, 900)
  }

  return (
    <div>
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <h1 className="text-base font-medium text-gray-800">Automação WhatsApp</h1>
        <p className="text-xs text-gray-400">Z-API · Disparos automáticos diários às 06:30</p>
      </div>

      <div className="p-6 flex flex-col gap-4">

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <p className="text-sm font-medium text-gray-800 mb-4">Status da Integração</p>
            <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm">💬</div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-800">{usuario.whatsapp}</p>
                <p className="text-xs text-gray-400">Conectado via Z-API</p>
              </div>
              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Ativo</span>
            </div>

            <div className="flex flex-col gap-2 text-xs mb-4">
              {[
                { label: 'Horário do envio', valor: '06:30' },
                { label: 'Delay entre envios', valor: '20 segundos' },
                { label: 'Status hoje', valor: '✓ Enviado', verde: true },
                { label: 'Total enviados', valor: '47 mensagens' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500">{item.label}</span>
                  <strong className={item.verde ? 'text-green-600' : 'text-gray-800'}>{item.valor}</strong>
                </div>
              ))}
            </div>

            <button
              onClick={simularEnvio}
              disabled={simulando}
              className={`w-full text-white text-xs py-2.5 rounded-lg font-medium transition-all ${
                simulando ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {simulando ? '⏳ Enviando...' : '📤 Simular Envio Agora'}
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <p className="text-sm font-medium text-gray-800 mb-4">
              {simulando ? '🔄 Simulando disparo...' : enviado ? '✅ Disparo concluído!' : '📱 Prévia da Mensagem'}
            </p>

            {simulando && (
              <div className="flex flex-col gap-2 mb-4">
                {etapas.map((e, i) => (
                  <div key={i} className={`flex items-center gap-2 text-xs transition-all duration-300 ${
                    i <= etapa ? 'text-gray-800' : 'text-gray-300'
                  }`}>
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                      i < etapa ? 'bg-green-500 text-white' :
                      i === etapa ? 'bg-blue-500 text-white animate-pulse' :
                      'bg-gray-100'
                    }`}>
                      {i < etapa ? '✓' : i === etapa ? '•' : ''}
                    </span>
                    {e}
                  </div>
                ))}
              </div>
            )}

            {!simulando && (
              <>
                {enviado && (
                  <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2 text-xs text-green-700 mb-3">
                    ✅ Mensagem enviada para {usuario.whatsapp}
                  </div>
                )}
                <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 leading-relaxed border-l-4 border-green-400">
                  🌱 <strong className="text-gray-800">Bom dia, {usuario.nome.split(' ')[0]}!</strong><br />
                  A saca de <strong>{usuario.cultura}</strong> em {usuario.estado} está em <strong>R$ 148,50</strong>.<br />
                  A tendência para hoje é <strong className="text-green-700">↑ ALTA</strong>.<br />
                  Confira os detalhes no portal: perso-nagro.vercel.app
                </div>
                <p className="text-xs text-gray-400 mt-2">🕐 Próximo envio automático: amanhã às 06:30</p>
              </>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <p className="text-sm font-medium text-gray-800 mb-3">Histórico de Envios</p>
          <div className="grid grid-cols-4 gap-2">
            {historico.map((h, i) => (
              <div key={i} className="flex flex-col gap-1 text-xs p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-400">{h.data}</span>
                <span className="font-medium text-gray-800">{h.cotacao}</span>
                <span className={`${h.tendencia === 'Alta' ? 'text-green-600' : h.tendencia === 'Baixa' ? 'text-red-500' : 'text-amber-600'}`}>
                  {h.tendencia === 'Alta' ? '↑' : h.tendencia === 'Baixa' ? '↓' : '→'} {h.tendencia}
                </span>
                <span className="text-green-600 text-xs">✓ Entregue</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-800">
          ⏰ <strong>Cron Job ativo no Railway:</strong> Todo dia às 06:30 o sistema busca as cotações, gera a mensagem personalizada e dispara automaticamente via WhatsApp para todos os assinantes.
        </div>

      </div>
    </div>
  )
}