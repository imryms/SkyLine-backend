require('dotenv').config({ quiet: true })
const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const flightRoutes = require('./routes/flightRoutes')
const bookingRoutes = require('./routes/bookingRoutes')


const PORT = process.env.PORT || 3000

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const db = require('./db')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

// app.use('/auth', authRoutes)
// app.use('/users', userRoutes)
app.use('/flights', flightRoutes)
// app.use('/bookings', bookingRoutes)


app.listen(PORT, () => {
  console.log(`Skyline Running on port ${PORT}🛬`)

})
