const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const soft = require('mongoose-delete');

const userSchema = new mongoose.Schema(
  {
    username: {
    type: String,
    required: true,
    unique: true,
    trim: true
   },
   email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name:{
    type: String,
    required: true
  },
    phone: {
      type: String,
      trim: true
    },

    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    avi: {
      type: String,
      trim: true
    },
    resetToken:{
      type:String,
      trim:true
    },
    resetTokenExp:{
      type: String,
      trim: true
    }
  },
  { timestamps: true }
)

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }

    this.password = hash
    next()
  })
})

userSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err)
      }

      resolve(same)
    })
  })
}
userSchema.plugin(soft);
module.exports = mongoose.model('User', userSchema)
