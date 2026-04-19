const Flight = require("../models/Flight")

const createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body)
    res.status(201).json(flight)
  } catch (error) {
    res.status(500).json(`Error creating a flight: ${error.message}`)
  }
}

const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find().populate('airLineId')
    res.status(200).json(flights)
  } catch (error) {
    res.status(500).json(`Error getting flights ${error.message}`)
  }
}

const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id).populate('airLineId')
    if(!flight){
      return res.status(404).json({message: "Flight not found!"})
    }
  res.status(200).json(flight)
  } catch (error) {
    res.status(500).json(`Error finding flights with this airLainId ${error.message}`)
  }
}

const updateFlight = async (req, res) =>{
  try {
    const updateFlight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true, runValidators: true}
    )
    if(!updateFlight){
      return res.status(404).json("Flight not found")}
    res.status(200).json(updateFlight)
  } catch (error) {
    res.status(500).json(`Error updating flight: ${error.message}`)
  }
}

const deleteFlight = async (req, res) =>{
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id)
    if(!deletedFlight){
      return res.status(404).json("Flight not found")}
    res.status(200).json({message: "Flight deleted Successfully"})
    } catch (error) {
    res.status(500).json(`Error deleting flight: ${error.message}`)
  }
}

module.exports={
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlight,
  deleteFlight
}
