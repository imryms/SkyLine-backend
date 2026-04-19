const AirLine = require("../models/AirLine")

const createAirline = async (req, res)=>{
  try {
    const airLine = await AirLine.create(req.body)
    res.status(201).json(airLine)
  } catch (error) {
    res.status(500).json(`Error creating an AirLine: ${error.message}`)
  }
}

const getAllAirLines = async(req, res) =>{
  try {
    const airLine = await AirLine.find()
    res.status(200).json(airLine)
  } catch (error) {
    res.status(500).json(`Error getting airLins ${error.message}`)
  }
}

const getAirLineById = async (req, res) => {
  try {
    const airLine = await AirLine.findById(req.params.id)
    if(!airLine){
      return res.status(404).json({message: "AirLine not found!"})
    }
    res.status(200).json(airLine)
  } catch (error) {
    res.status(500).json(`Error finding airLine with this Id ${error.message}`)
  }
}

const updateAirLine = async (req,res) =>{
  try {
    const airLine = await AirLine.findByIdAndUpdate(req.params.id, req.body,{new: true})
    if(!airLine){
      return res.status(404).json("AirLine not found")
    }
    res.status(200).json(airLine)
  } catch (error) {
    res.status(500).json(`Error updating airLine: ${error.message}`)
  }
}

const deleteAirLine = async (req, res) =>{
  try {
    const airLine = await AirLine.findByIdAndDelete(req.params.id)
    if(!airLine){
      return res.status(404).json("AirLine not found")
    }
    res.status(200).json({message: "airLine deleted Successfully"})
  } catch (error) {
    res.status(500).json(`Error deleting airLine: ${error.message}`)
  }
}

module.exports={
  createAirline,
  getAllAirLines,
  getAirLineById,
  updateAirLine,
  deleteAirLine
}
