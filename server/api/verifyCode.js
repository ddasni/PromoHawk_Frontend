export default defineEventHandler(async (event) => {
    const { code, codeId } = await readBody(event)
  
    // Verifica se o códigoId existe e se o código é válido
    if (!codes[codeId]) {
      return sendError(event, createError({ statusCode: 400, statusMessage: 'Código expirado ou inválido' }))
    }
  
    const storedCode = codes[codeId].code
  
    if (storedCode === code) {
      // Código correto, permite a mudança de senha
      return { success: true }
    }
  
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Código inválido' }))
  })
  