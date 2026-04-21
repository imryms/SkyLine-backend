const Booking = require("../models/Booking")
const Flight = require("../models/Flight")

const createBooking = async (req, res) => {
  try {
    const { userID, flightID, ticketType, passengers } = req.body

    const flight = await Flight.findById(flightID)
    if (!flight) {
      return res.status(404).send("Flight not found")
    }

    let basePrice
    if (ticketType === "Economy") basePrice = flight.prices.economy
    else if (ticketType === "Business") basePrice = flight.prices.business
    else basePrice = flight.prices.firstClass

    let totalPrice = 0

    passengers.forEach((p) => {
      let factor = 1

      if (p.type === "Kids") factor = 0.75
      else if (p.type === "Infant") factor = 0.1

      totalPrice += basePrice * factor * p.quantity
    })

    const booking = new Booking({
      userID,
      flightID,
      ticketType,
      passengers,
      totalPrice,
    })

    await booking.save()

    res.status(201).json(booking)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userID")
      .populate("flightID")
      .sort({ createdAt: -1 })

    res.json(bookings)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userID")
      .populate("flightID")

    if (!booking) {
      return res.status(404).send("Booking not found")
    }

    res.json(booking)
  } catch (error) {
    res.status(500).send(`Error getting booking, ${error.message}`)
  }
}

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id)

    if (!booking) {
      return res.status(404).send("Booking not found")
    }

    res.send("Booking deleted successfully")
  } catch (error) {
    return res.status(404).send(`Booking not Exist, ${error.message}`)
  }
}

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
}
