import { useState } from 'react'

export default function Radar({ usuario }) {
  const [filtro, setFiltro] = useState('todas')

  const noticias = [
    { tag: 'Positivo', cor: 'bg-green-50 text-green-700', texto: 'China amplia importações de soja brasileira no 2º semestre', data: '12 jun · Reuters' },
    { tag: 'Negativo', cor: 'bg-red-50 text-red-700', texto: 'USDA eleva estimativa de produção norte-americana para safra 2025/26', data: '11 jun · AgriView' },
    { tag: 'Neutro', cor: 'bg-amber-50 text-amber-700', texto: 'Safra argentina encerra colheita dentro do projetado por analistas', data: '10 jun · Canal Rural' },
    { tag: 'Positivo', cor: 'bg-green-50 text-green-700', texto: 'Embarques de soja pelo Porto de Santos batem recorde em junho', data: '09 jun · AgroEstado' },
    { tag: 'Negativo', cor: 'bg-red-50 text-red-700', texto: 'Fretes rodoviários sobem 6% em junho com aumento do diesel', data: '08 jun · ESALQ' },
    { tag: 'Neutro', cor: 'bg-amber-50 text-amber-700', texto: 'CONAB mantém projeção de produção brasileira de soja em 153 mi t', data: '07 jun · CONAB' },
  ]

  const filtradas = filtro === 'todas' ? noticias : noticias.filter(n => n.tag === filtro)

  const btnClass = (f) => {
    if (filtro === f) return 'px-4 py-1.5 rounded-lg text-xs bg-green-600 text-white'
    return 'px-4 py-1.5 rounded-lg text-xs border border-gray-200 text-gray-500 hover:bg-gray-50'
  }

  return (
    <div>
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <h1 className="text-base font-medium text-gray-800">Radar da Semana</h1>
        <p className="text-xs text-gray-400">Notícias analisadas por IA · {usuario.cultura}</p>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-5">
          <button className={btnClass('todas')} onClick={() => setFiltro('todas')}>Todas</button>
          <button className={btnClass('Positivo')} onClick={() => setFiltro('Positivo')}>Positivo</button>
          <button className={btnClass('Negativo')} onClick={() => setFiltro('Negativo')}>Negativo</button>
          <button className={btnClass('Neutro')} onClick={() => setFiltro('Neutro')}>Neutro</button>
        </div>

        <div className="flex flex-col gap-3">
          {filtradas.map((n, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 flex gap-3 items-start">
              <span className={'text-xs px-2 py-0.5 rounded-md whitespace-nowrap ' + n.cor}>{n.tag}</span>
              <div>
                <p className="text-sm text-gray-700">{n.texto}</p>
                <p className="text-xs text-gray-400 mt-1">{n.data}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}