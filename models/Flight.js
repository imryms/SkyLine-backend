const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNum:{
    type: String,
    required: true},

  airLineId:{
    type: mongoose.Schema.types.ObjectId,
    ref: 'AirLine',
    required: true
  },

  departureAirport:{
    type: String,
    required: true},

  arrivalAirport:{
    type: String,
    required: true},

  flightDate:{
    type: Date,
    required: true},

  departureTime:{
    type: String,
    required: true},

  arrivalTime:{
    type: String,
    required: true},

  price:{
    type: Number,
    required: true},

  availableSeats:{
    type: Number,
    required: true},

  duration:{
    type: String,
    required: true},

  isDirect:{
    type: Boolean,
    required: true}

},{timestamps: true});

const Flight = mongoose.model('Flight', flightSchema)
module.exports = Flight
