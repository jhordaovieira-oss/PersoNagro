export default function Whatsapp({ usuario }) {
  const historico = [
    { data: '13/06 06:30', cotacao: 'R$ 148,50', tendencia: 'Alta', ok: true },
    { data: '12/06 06:30', cotacao: 'R$ 145,80', tendencia: 'Alta', ok: true },
    { data: '11/06 06:30', cotacao: 'R$ 144,20', tendencia: 'Estável', ok: true },
    { data: '10/06 06:30', cotacao: 'R$ 146,10', tendencia: 'Baixa', ok: true },
  ]

  return (
    <div>
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <h1 className="text-base font-medium text-gray-800">Automação WhatsApp</h1>
        <p className="text-xs text-gray-400">Z-API · Disparos automáticos diários</p>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4">
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
            <div className="flex justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-500">Horário do envio</span>
              <strong className="text-gray-800">06:30</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-500">Delay entre envios</span>
              <strong className="text-gray-800">20 segundos</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-500">Status hoje</span>
              <strong className="text-green-600">✓ Enviado</strong>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-gray-500">Total enviados</span>
              <strong className="text-gray-800">47 mensagens</strong>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-green-600 text-white text-xs py-2 rounded-lg hover:bg-green-700">
              📤 Enviar Teste
            </button>
            <button className="flex-1 border border-gray-200 text-gray-500 text-xs py-2 rounded-lg hover:bg-gray-50">
              ✏️ Editar Número
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <p className="text-sm font-medium text-gray-800 mb-4">Histórico de Envios</p>
          <div className="flex flex-col gap-2">
            {historico.map((h, i) => (
              <div key={i} className="flex justify-between items-center text-xs p-2 bg-gray-50 rounded-lg">
                <span className="text-gray-400">{h.data}</span>
                <span className="text-gray-700">{h.cotacao} · {h.tendencia}</span>
                <span className="text-green-600">✓</span>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-gray-50 rounded-xl p-3 text-xs text-gray-600 leading-relaxed border-l-4 border-green-400">
            🌱 <strong className="text-gray-800">Bom dia, {usuario.nome.split(' ')[0]}!</strong><br />
            A saca de <strong>{usuario.cultura}</strong> em {usuario.estado} está em <strong>R$ 148,50</strong>.<br />
            A tendência para hoje é <strong className="text-green-700">↑ ALTA</strong>.<br />
            Confira os detalhes no portal.
          </div>
        </div>
      </div>
    </div>
  )
}