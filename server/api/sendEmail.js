import { Resend } from 'resend'
import { v4 as uuidv4 } from 'uuid'

const resend = new Resend(process.env.RESEND_API_KEY)

const codes = {} // Para armazenar os códigos temporários

// Função para enviar e-mail usando o serviço de e-mail
async function sendEmail(email, code) {
  const data = await resend.emails.send({
    from: 'Seu Nome <seu@dominio.com>',
    to: email,
    subject: 'Seu código de verificação',
    html: `<p>Seu código para redefinir a senha é: <strong>${code}</strong></p>`,
  })

  return data.success
}

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)

  // Verifica se o e-mail é válido
  if (!email || !email.includes('@')) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'E-mail inválido' }))
  }

  // Gera um código único de verificação
  const code = Math.floor(100000 + Math.random() * 900000).toString()

  // Armazena o código temporariamente
  const codeId = uuidv4() // Gera um identificador único para o código
  codes[codeId] = { email, code }

  // Envia o e-mail com o código
  const emailSent = await sendEmail(email, code)

  if (emailSent) {
    return { success: true, message: 'Código enviado!', codeId }
  }

  return sendError(event, createError({ statusCode: 500, statusMessage: 'Erro ao enviar o código' }))
})

