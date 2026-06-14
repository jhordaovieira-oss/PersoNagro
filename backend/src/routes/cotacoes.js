const express = require('express')
const router = express.Router()
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

// Cotações simuladas por cultura
const cotacoes = {
  Soja: { valor: 148.50, tendencia: 'ALTA', variacao: '+1.8%' },
  Milho: { valor: 68.20, tendencia: 'ESTÁVEL', variacao: '+0.3%' },
  Café: { valor: 1250.00, tendencia: 'ALTA', variacao: '+2.1%' },
  'Boi Gordo': { valor: 285.00, tendencia: 'BAIXA', variacao: '-0.5%' },
}

// Buscar cotação por cultura
router.get('/:cultura', async (req, res) => {
  try {
    const { cultura } = req.params
    const cotacao = cotacoes[cultura]

    if (!cotacao) {
      return res.status(404).json({ erro: 'Cultura não encontrada' })
    }

    const dolar = 5.41
    const analiseIA = cotacao.tendencia === 'ALTA'
      ? `Mercado de ${cultura} em alta. Dólar favorável em R$ ${dolar}. Momento positivo para comercialização.`
      : `Mercado de ${cultura} em baixa. Aguarde melhor momento para fixação de preço.`

    res.json({
      cultura,
      valor: cotacao.valor,
      tendencia: cotacao.tendencia,
      variacao: cotacao.variacao,
      dolar,
      analiseIA
    })
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar cotação' })
  }
})

// Calculadora de ponto de equilíbrio
router.post('/calculadora', async (req, res) => {
  try {
    const { insumos, maoDeObra, arrendamento, outros, area, cultura } = req.body
    const totalCustos = insumos + maoDeObra + arrendamento + outros
    const cotacao = cotacoes[cultura]?.valor || 148.50
    const sacasNecessarias = Math.ceil(totalCustos / cotacao)
    const scHa = (sacasNecessarias / area).toFixed(1)

    res.json({ totalCustos, sacasNecessarias, scHa, cotacao })
  } catch (erro) {
    res.status(500).json({ erro: 'Erro na calculadora' })
  }
})

module.exports = router