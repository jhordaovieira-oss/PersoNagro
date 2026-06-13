import { useState } from 'react'

export default function Calculadora() {
  const precoAtual = 148.50
  const [custos, setCustos] = useState({
    insumos: 180000,
    maoDeObra: 45000,
    arrendamento: 60000,
    outros: 20000,
    area: 200,
  })

  const totalCustos = custos.insumos + custos.maoDeObra + custos.arrendamento + custos.outros
  const sacasNecessarias = Math.ceil(totalCustos / precoAtual)
  const scHa = (sacasNecessarias / custos.area).toFixed(1)
  const producaoEstimada = 56 * custos.area
  const margem = (((producaoEstimada - sacasNecessarias) / sacasNecessarias) * 100).toFixed(0)

  const campos = [
    { key: 'insumos', label: 'Custo de insumos (R$)' },
    { key: 'maoDeObra', label: 'Mão de obra (R$)' },
    { key: 'arrendamento', label: 'Arrendamento (R$)' },
    { key: 'outros', label: 'Outros custos (R$)' },
    { key: 'area', label: 'Área plantada (ha)' },
  ]

  const cenarios = [130, 140, 148.50, 160, 175]

  return (
    <div>
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <h1 className="text-base font-medium text-gray-800">Calculadora de Ponto de Equilíbrio</h1>
        <p className="text-xs text-gray-400">Baseada na cotação atual · R$ {precoAtual.toFixed(2)}/sc</p>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <p className="text-sm font-medium text-gray-800 mb-4">Informe seus custos</p>
          <div className="flex flex-col gap-3">
            {campos.map(campo => (
              <div key={campo.key} className="flex items-center justify-between gap-4">
                <label className="text-xs text-gray-500 min-w-40">{campo.label}</label>
                <input
                  type="number"
                  value={custos[campo.key]}
                  onChange={e => setCustos({ ...custos, [campo.key]: Number(e.target.value) })}
                  className="w-32 text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-right focus:outline-none focus:border-green-400"
                />
              </div>
            ))}
          </div>

          <div className="mt-5 bg-green-50 rounded-xl p-4 flex gap-6 items-center">
            <div>
              <p className="text-2xl font-medium text-green-800">{sacasNecessarias.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-green-600">sacas para cobrir custos</p>
            </div>
            <div className="border-l border-green-200 pl-6">
              <p className="text-2xl font-medium text-green-800">{scHa}</p>
              <p className="text-xs text-green-600">sc/ha ponto de equilíbrio</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <p className="text-sm font-medium text-gray-800 mb-4">Cenários de Preço</p>
          <div className="flex flex-col gap-2">
            {cenarios.map(preco => {
              const sacas = Math.ceil(totalCustos / preco)
              const isAtual = preco === precoAtual
              return (
                <div key={preco} className={`flex justify-between items-center px-3 py-2 rounded-lg text-xs ${isAtual ? 'bg-green-50' : 'bg-gray-50'}`}>
                  <span className="text-gray-500">R$ {preco.toFixed(2)}/sc{isAtual ? ' ← atual' : ''}</span>
                  <strong className={isAtual ? 'text-green-800' : 'text-gray-700'}>{sacas.toLocaleString('pt-BR')} sacas</strong>
                </div>
              )
            })}
          </div>

          <div className="mt-4 bg-green-50 rounded-xl p-4">
            <p className="text-xs font-medium text-green-800 mb-1">Produtividade média MT</p>
            <p className="text-xs text-green-600">56 sc/ha — sua margem estimada: <strong>+{margem}%</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}