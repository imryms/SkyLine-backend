const Booking = require("../models/Booking")
const Flight = require("../models/Flight")

const createBooking = async (req, res) => {
  try {
    const { userID, flightID, ticketType, passengers } = req.body

    if (!userID || !flightID || !ticketType || !passengers) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const flight = await Flight.findById(flightID)
    if (!flight) {
      return res.status(404).send("Flight not found")
    }
    if (!flight.price) {
      return res.status(500).json({ error: "Flight price data is missing" })
    }

    const priceMap = {
      Economy: flight.price.economy,
      Business: flight.price.business,
      "First Class": flight.price.firstClass,
    }

    const basePrice = priceMap[ticketType]

    if (basePrice === undefined || basePrice === null) {
      return res
        .status(400)
        .json({ error: `Invalid ticket type: ${ticketType}` })
    }

    let totalPrice = 0

    passengers.forEach((p) => {
      let factor = 1

      if (p.type === "Kids") factor = 0.75
      else if (p.type === "Infant") factor = 0.2

      totalPrice += basePrice * factor * p.quantity
    })

    totalPrice = Math.round(totalPrice * 100) / 100

    const booking = new Booking({
      userID,
      flightID,
      ticketType,
      passengers,
      totalPrice,
      pricePerTicket: basePrice,
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

    const flight = booking.flightID
    const priceMap = {
      Economy: flight.price.economy,
      Business: flight.price.business,
      "First Class": flight.price.firstClass,
    }

    const pricePerTicket = priceMap[booking.ticketType]

    res.json({ ...booking.toObject(), pricePerTicket })
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
