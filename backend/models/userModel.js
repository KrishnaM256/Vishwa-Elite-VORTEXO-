import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter name'],
      minLength: [3, 'Name must be more than 3 character long'],
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
    },
    phone: {
      type: Number,
      required: [true, 'Please enter phone number'],
    },
    address: {
      type: String,
      required: [true, 'Please enter you address'],
    },
    city: {
      type: String,
      required: [true, 'Please enter your city'],
    },
    state: {
      type: String,
      required: [true, 'Please enter your state'],
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      minLength: [8, 'Password should be greater than 8 '],
    },
    avatar: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      default: 'user',
    },
    department: {
      type: String,
      required: [true, 'Please enter department'],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
)

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
  return resetToken
}

const User = mongoose.model('User', userSchema)

export default User
