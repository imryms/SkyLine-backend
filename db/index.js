const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log('Successfully connected to MongoDB ✈️✈️')
})

mongoose.connection.on("error", (err) => {
  console.log('MongoDB connection error ❌')
  console.log(err)
})

module.exports = mongoose
