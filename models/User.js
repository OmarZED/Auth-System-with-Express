const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  age: {
    type: Number,
    min: 1,
    max: 120,
  },

  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },

  phoneNumber: {
    type: String,
    trim: true,
  },

  profilePicture: {
    type: String,
    default: null,
  },

  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);