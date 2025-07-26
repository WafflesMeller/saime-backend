import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { scrapeCedula } from './saime.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/api/consultar', async (req, res) => {
  const { cedula, nacionalidad } = req.body

  if (!cedula || !nacionalidad) {
    return res.status(400).json({ error: 'Faltan datos requeridos' })
  }

  try {
    const datos = await scrapeCedula(nacionalidad, cedula)
    res.json(datos)
  } catch (error) {
    console.error('Error en scraping:', error.message)
    res.status(500).json({ error: 'Error al consultar la cédula' })
  }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))
