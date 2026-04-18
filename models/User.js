const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String
    },
    role: {
      type: String,
      enum: ['traveler', 'admin'],
      default: 'traveler'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
