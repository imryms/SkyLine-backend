const User = require('../models/User')

const getProfile = async (req, res) => {
  try {
    const { id } = res.locals.payload

    const user = await User.findById(id).select('-password')

    if (!user) {
      return res.status(404).send({ msg: 'User not found' })
    }

    res.status(200).send({
      msg: 'Profile fetched successfully',
      user
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: error.message })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const { fullName, email, phoneNumber } = req.body

    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: id } })
      if (existingUser) {
        return res.status(400).send({ msg: 'Email already in use' })
      }
    }

    const updates = {}
    
    if (fullName) updates.fullName = fullName
    if (email) updates.email = email
    if (phoneNumber) updates.phoneNumber = phoneNumber

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    }).select('-password')

    if (!updatedUser) {
      return res.status(404).send({ msg: 'User not found' })
    }

    res.status(200).send({
      msg: 'Profile updated successfully',
      user: updatedUser
    })
  } catch (error) {
    res.status(500).send({ msg: 'Server error' })
  }
}


module.exports = {
  getProfile,
  updateProfile
}
