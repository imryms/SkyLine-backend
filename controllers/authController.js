const User = require('../models/User')
const middleware = require('../middleware/index')


const Register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      phoneNumber
    } = req.body

    if (!fullName || !email || !password || !confirmPassword || !phoneNumber) {
      return res.status(400).send({ msg: 'Please fill all required fields' })
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ msg: 'Passwords do not match' })
    }

    let existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).send({ msg: 'User already exists' })
    }

    const hashedPassword = await middleware.hashPassword(password)

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber
    })

    user.password = undefined

    res.status(201).send(user)
  } catch (error) {
  console.log(error)
  res.status(500).send({ msg: error.message })
  }
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).send({ msg: 'User not found' })
    }

    const matchedPassword = await middleware.comparePassword(
      password,
      user.password
    )

    if (!matchedPassword) {
      return res.status(401).send({ msg: 'Invalid password' })
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    }

    const token = middleware.createToken(payload)

    res.status(200).send({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: error.message })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).send({ msg: 'Missing fields' })
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).send({ msg: 'Passwords do not match' })
    }

    const user = await User.findById(res.locals.payload.id)

    const matched = await middleware.comparePassword(
      oldPassword,
      user.password
    )

    if (!matched) {
      return res.status(401).send({ msg: 'Old password incorrect' })
    }

    const hashedPassword = await middleware.hashPassword(newPassword)

    user.password = hashedPassword
    await user.save()

    res.status(200).send({ msg: 'Password updated successfully' })

  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: error.message })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.status(200).send(payload)
}

module.exports = {
  Register,
  Login,
  UpdatePassword,
  CheckSession
}
