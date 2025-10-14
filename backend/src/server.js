const express = require('express')
const mongoose = require('mongoose')

const User = require('./models/User')
const fillCars = require('./fillCars')

const app = express() // para parsear JSON en requests

// URL de conexión a MongoDB
const mongoURI = 'mongodb://admin:password@db:27017/cars?authSource=admin'

// Conectar a MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err))

// Agregar coches para pruebas
fillCars()
  .then(() => console.log('Coches creados'))
  .catch(e => console.log(e.message))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Api funcionando correctamente')
})

app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find()

    res.json(cars)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

app.get('/*splat', async (req, res) => {
  res.send('Ruta no encontrada')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`)
})
