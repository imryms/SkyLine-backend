const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    flightID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },

    ticketType: {
      type: String,
      enum: ["Economy", "Business", "First Class"],
      required: true,
    },

    passengers: [
      {
        type: {
          type: String,
          enum: ["Infant", "Kids", "Adults"],
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Confirmed", "Cancelled"],
    },
  },
  {
    timestamps: true,
  }
)

const Booking = mongoose.model("Booking", bookingSchema)

module.exports = Booking
