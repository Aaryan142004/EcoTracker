const mongoose = require('mongoose');
<<<<<<< HEAD
=======
const bcrypt = require('bcryptjs');
>>>>>>> 09c67800c98a81dd42abd5c0d6ed43ce4c9589b9

const dealerSchema = new mongoose.Schema({
  name: {
    type: String,
<<<<<<< HEAD
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  businessType: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
=======
    required: [true, 'Dealer name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
  },
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'USA' }
  },
  role: {
    type: String,
    enum: ['dealer', 'staff'],
    default: 'dealer'
  },
  parentDealer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dealer',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  preferences: {
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    },
    language: { type: String, default: 'en' }
  },
  lastLogin: Date,
>>>>>>> 09c67800c98a81dd42abd5c0d6ed43ce4c9589b9
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

<<<<<<< HEAD
module.exports = mongoose.model('Dealer', dealerSchema);
=======
// Hash password before saving
dealerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
dealerSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get dealer hierarchy (for staff access)
dealerSchema.methods.getDealerId = function() {
  return this.role === 'dealer' ? this._id : this.parentDealer;
};

module.exports = mongoose.model('Dealer', dealerSchema);
>>>>>>> 09c67800c98a81dd42abd5c0d6ed43ce4c9589b9
