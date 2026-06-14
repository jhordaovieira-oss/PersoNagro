const express = require('express')
const router = express.Router()
const axios = require('axios')

const ZAPI_INSTANCE = process.env.ZAPI_INSTANCE_ID
const ZAPI_TOKEN = process.env.ZAPI_TOKEN

// Enviar mensagem via Z-API
async function enviarMensagem(telefone, mensagem) {
  try {
    await axios.post(
      `https://api.z-api.io/instances/${ZAPI_INSTANCE}/token/${ZAPI_TOKEN}/send-text`,
      { phone: telefone, message: mensagem }
    )
    return true
  } catch (erro) {
    console.error('Erro ao enviar WhatsApp:', erro.message)
    return false
  }
}

// Delay entre envios
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Enviar mensagem de teste
router.post('/teste', async (req, res) => {
  try {
    const { telefone, nome, cultura, estado, cotacao } = req.body
    const mensagem = `🌾 *Bom dia, ${nome}!*\n\nA saca de *${cultura}* em ${estado} está em *R$ ${cotacao}*.`

    const enviado = await enviarMensagem(telefone, mensagem)

    if (enviado) {
      res.json({ sucesso: true, mensagem: 'Mensagem enviada com sucesso!' })
    } else {
      res.status(500).json({ erro: 'Erro ao enviar mensagem' })
    }
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao enviar teste' })
  }
})

// Disparos em massa (usado pelo cron job)
router.post('/disparar', async (req, res) => {
  try {
    const { usuarios } = req.body
    const resultados = []

    for (const usuario of usuarios) {
      const mensagem = `🌱 *Bom dia, ${usuario.nome}!*\n\nA saca de *${usuario.cultura}* em ${usuario.estado} está em *R$ ${usuario.cotacao}*.\nA tendência para hoje é *${usuario.tendencia}*.\n\nConfira os detalhes no portal: https://perso-nagro.vercel.app`

      const enviado = await enviarMensagem(usuario.whatsapp, mensagem)
      resultados.push({ nome: usuario.nome, enviado })

      // Delay de 20 segundos entre envios para evitar banimento
      await delay(20000)
    }

    res.json({ sucesso: true, resultados })
  } catch (erro) {
    res.status(500).json({ erro: 'Erro nos disparos' })
  }
})

module.exports = router