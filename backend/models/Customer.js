const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: {
    type: String,
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
  workCategory: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true
  },
  emergencyContact: {
    type: String,
    required: true,
    trim: true
  },
  dealerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dealer',
    required: true
  },
  rentalHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RentalRecord'
  }],
  frequentlyRentedMachines: [{
    type: String,
    trim: true
  }],
  rentalUsagePatterns: {
    peakTimes: [{
      type: String,
      trim: true
    }],
    averageRentalDuration: {
      type: Number,
      default: 0
    },
    preferredRentalDays: [{
      type: String,
      trim: true
    }]
  },
  outstandingDues: {
    type: Number,
    default: 0,
    min: 0
  },
  totalRentals: {
    type: Number,
    default: 0,
    min: 0
  },
  totalSpent: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
=======
  dealerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dealer',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  contact_number: {
    type: String,
    required: [true, 'Contact number is required']
  },
  email: {
    type: String,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  business_type: {
    type: String,
    required: true,
    enum: ['Construction', 'Landscaping', 'Agriculture', 'Mining', 'Transportation', 'Other']
  },
  // Computed fields for quick access
  total_rentals: {
    type: Number,
    default: 0
  },
  total_outstanding_due: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
>>>>>>> 09c67800c98a81dd42abd5c0d6ed43ce4c9589b9
  }
}, {
  timestamps: true
});

<<<<<<< HEAD
module.exports = mongoose.model('Customer', customerSchema);
=======
// Compound index for dealer-specific customer queries
customerSchema.index({ dealerId: 1, name: 1 });
customerSchema.index({ dealerId: 1, email: 1 });

module.exports = mongoose.model('Customer', customerSchema);
>>>>>>> 09c67800c98a81dd42abd5c0d6ed43ce4c9589b9
