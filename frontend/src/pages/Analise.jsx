export default function Analise({ usuario }) {
  return (
    <div>
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-medium text-gray-800">Análise Pessoal — IA</h1>
          <p className="text-xs text-gray-400">Relatório semanal exclusivo · Semana 23/2026</p>
        </div>
        <button className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700">
          ✨ Gerar relatório
        </button>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <p className="text-sm font-medium text-gray-800 mb-4">Relatório da Semana 23</p>
          <div className="text-sm text-gray-600 leading-relaxed flex flex-col gap-3">
            <p>📊 <strong className="text-gray-800">Panorama Regional — {usuario.estado}:</strong> O estado manteve uma janela favorável de clima seco nos últimos 7 dias, acelerando a logística de escoamento. A pressão nos fretes rodoviários persiste com alta de 6% na tarifa.</p>
            <p>🌐 <strong className="text-gray-800">Cenário Global:</strong> O USDA revisou ligeiramente para cima a produção americana, mas a demanda chinesa acima do esperado equilibra o balanço global. Atenção à safra da Argentina que encerra colheita com produção dentro do esperado.</p>
            <p>💡 <strong className="text-gray-800">Recomendação IA:</strong> O momento é neutro a levemente positivo para fixação de preço. Dólar acima de R$ 5,40 melhora o prêmio de exportação. Produtores com mais de 30% da safra aberta podem considerar fixação parcial para hedge cambial.</p>
            <p className="text-xs text-gray-400">⚠️ Este relatório é de caráter informativo. Consulte seu corretor de grãos para decisões de comercialização.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-800 mb-3">Indicadores da Semana</p>
            {[
              { label: 'Máxima saca (MT)', valor: 'R$ 151,20' },
              { label: 'Mínima saca (MT)', valor: 'R$ 144,80' },
              { label: 'Variação semanal', valor: '+2,3%', verde: true },
              { label: 'Vol. exportado BR', valor: '4,2 mi t' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 text-xs">
                <span className="text-gray-500">{item.label}</span>
                <strong className={item.verde ? 'text-green-600' : 'text-gray-800'}>{item.valor}</strong>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-800 mb-3">Análise de Risco</p>
            {[
              { label: 'Risco cambial', nivel: 'Baixo', cor: 'bg-green-50 text-green-700' },
              { label: 'Risco climático', nivel: 'Médio', cor: 'bg-amber-50 text-amber-700' },
              { label: 'Risco logístico', nivel: 'Alto', cor: 'bg-red-50 text-red-700' },
              { label: 'Risco de mercado', nivel: 'Baixo', cor: 'bg-green-50 text-green-700' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 text-xs">
                <span className="text-gray-500">{item.label}</span>
                <span className={`px-2 py-0.5 rounded-full ${item.cor}`}>{item.nivel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}