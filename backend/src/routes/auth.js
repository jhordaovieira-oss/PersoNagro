const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

// Cadastro
router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha, whatsapp, estado, cultura } = req.body


    const usuarioExiste = await prisma.user.findUnique({ where: { email } })
    if (usuarioExiste) {
      return res.status(400).json({ erro: 'E-mail já cadastrado' })
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    const usuario = await prisma.user.create({
      data: { nome, email, senha: senhaHash, whatsapp, estado, cultura }
    })

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } })
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar usuário' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body

    const usuario = await prisma.user.findUnique({ where: { email } })
    if (!usuario) {
      return res.status(400).json({ erro: 'Usuário não encontrado' })
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
    if (!senhaCorreta) {
      return res.status(400).json({ erro: 'Senha incorreta' })
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, cultura: usuario.cultura, estado: usuario.estado } })
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao fazer login' })
  }
})

module.exports = router
