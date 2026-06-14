const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Rotas
const authRoutes = require('./routes/auth')
const cotacoesRoutes = require('./routes/cotacoes')
const whatsappRoutes = require('./routes/whatsapp')

app.use('/api/auth', authRoutes)
app.use('/api/cotacoes', cotacoesRoutes)
app.use('/api/whatsapp', whatsappRoutes)

// Rota de teste
app.get('/', (req, res) => {
  res.json({ status: 'PersonalAgro API funcionando!' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})