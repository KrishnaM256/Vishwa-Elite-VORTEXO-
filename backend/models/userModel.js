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
      required: [true, 'Please enter your address'],
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
    prn: {
      type: Number,
      required: true,
      unique: true, // Ensure PRN is unique
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
)

// Static method to generate the next prn
userSchema.statics.generateNextPrn = async function () {
  const lastUser = await this.findOne().sort({ prn: -1 }).exec() // Get the last user by prn
  return lastUser ? lastUser.prn + 1 : 1 // Increment or start at 1
}

// Middleware to set the unique prn before saving
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.prn = await this.constructor.generateNextPrn() // Get the next unique prn
  }
  next()
})

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
