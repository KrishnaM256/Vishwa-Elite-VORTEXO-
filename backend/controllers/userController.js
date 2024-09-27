import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import bcrypt from 'bcryptjs'
import createToken from '../utils/createToken.js'
import { sendMail } from '../utils/sendMail.js'
import crypto from 'crypto'

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.status(200).send(users)
})

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      role: updateUserProfile.role,
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const avatar = req.files.avatar ? req.files.avatar[0].filename : user.avatar
  console.log(user)

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.address = req.body.address || user.address
    user.city = req.body.city || user.city
    user.state = req.body.state || user.state
    user.avatar = avatar

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(200).json({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      city: updatedUser.city,
      state: updatedUser.state,
      role: updatedUser.role,
      avatar: updatedUser.avatar,
    })
  }
})

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    if (user.role == 'admin') {
      res.status(400)
      throw new Error('Can not delete admin!')
    }
    await User.deleteOne({ _id: user._id })
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('No user found!')
  }
})

export const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.address = req.body.address || user.address
    user.city = req.body.city || user.city
    user.state = req.body.state || user.state
    user.role = req.body.role || user.role

    console.log(user)
    const updatedUser = await user.save()
    res.status(200).json({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      city: updatedUser.city,
      state: updatedUser.state,
      role: updatedUser.role,
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

export const createUser = asyncHandler(async (req, res) => {
  console.log('Files:', req.files)
  console.log('Body:', req.body)

  const avatar = req.files.avatar ? req.files.avatar[0].filename : ''

  const { firstName, lastName, email, phone, address, city, state, password } =
    req.body

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !address ||
    !city ||
    !state ||
    !password
  ) {
    throw new Error('All fields are mandatory!')
  }

  const oldUser = await User.findOne({ email })

  if (oldUser) {
    return res
      .status(400)
      .send({ message: 'User with given email already exists!' })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const newUser = new User({
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    password: hashedPassword,
    avatar,
  })
  try {
    await newUser.save()
    createToken(res, newUser._id)
    res.status(200).json({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      password,
      avatar,
    })
  } catch (err) {
    console.log(err)
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new Error('All fields are mandatory!')
  }
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    createToken(res, user._id)
    res.status(200).json(user)
    return
  } else res.status(400).send({ message: 'Email or Password is invalid' })
})

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'None',
    secure: true,
  })
  res.status(200).json({ message: 'Logout successfully!' })
})

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new Error('Email is required')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('User does not exist')
  }
  const resetToken = user.getResetPasswordToken()
  await user.save({ validateBeforeSave: false })
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/password/reset/${resetToken}`
  console.log(user)
  const subject = 'Password Reset Request'
  const message = `Dear ${user.firstName},\n\nWe received a request to reset your password. You can reset your password by clicking the link below:\n\n${resetURL}\n\nIf you did not request a password reset, please disregard this email.\n\nThank you,\nName`
  try {
    sendMail({ email, subject, message })
    return res.status(200).send({ message: 'Email sent successfully' })
  } catch (e) {
    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined
    user.save({ validateBeforeSave: false })
    console.log(e)

    return res.status(400).send({ message: 'Failed to send mail' })
  }
})

export const resetPassword = asyncHandler(async (req, res) => {
  const resetToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  })
  console.log(resetToken)

  if (!user) {
    return res
      .status(404)
      .send({ message: 'Reset password token has been expired or not valid' })
  }
  const { password, confirmPassword } = req.body
  if (!password || !confirmPassword) {
    return res.status(400).send({ message: 'Please enter reset password' })
  }
  if (password != confirmPassword) {
    return res
      .status(400)
      .send({ message: 'Password does not match Confirm Password' })
  }
  const hashPassword = await bcrypt.hash(password, 10)
  user.password = hashPassword
  user.resetPasswordToken = undefined
  user.resetPasswordToken = undefined
  await user.save()
  res.status(200).send({ message: 'Successfully changed the password' })
})
