const mongoose = require("mongoose");

const airLineSchema = new mongoose.Schema({

  airLineName:{
    type: String,
    required: true,
  },

  airLineCode:{
    type: String,
    required: true,
    unique: true
  },

  logoURL:{
    type: String,
    required: true
  },

  contactNumber: {
    type: Number,
    required: true
  }
}, {timestamps: true})

const AirLine = mongoose.model('AirLine', airLineSchema)
module.exports=AirLine
