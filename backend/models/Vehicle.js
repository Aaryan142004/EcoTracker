const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
<<<<<<< HEAD
  vehicleId: {
    type: String,
    required: true,
    unique: true,
    trim: true
=======
  dealerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dealer',
    required: true,
    index: true
  },
  vehicleId: {
    type: String,
    required: true,
    unique: true
>>>>>>> 09c67800c98a81dd42abd5c0d6ed43ce4c9589b9
  },
  type: {
    type: String,
    required: true,
<<<<<<< HEAD
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  condition: {
    type: String,
    enum: ['good', 'damaged', 'under repair', 'needs inspection'],
    default: 'good'
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'rented', 'under maintenance'],
    default: 'available'
  },
  dealerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dealer',
    required: true
  },
  currentRentalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RentalRecord',
    default: null
  },
  expectedReturnDate: {
    type: Date
  },
  checkInTime: {
    type: Date
  },
  checkOutTime: {
    type: Date
  },
  maintenanceStatus: {
    type: String,
    enum: ['operational', 'maintenance due', 'under repair'],
    default: 'operational'
  },
  lastMaintenanceDate: {
    type: Date,
    required: true
  },
  nextMaintenanceDate: {
    type: Date,
    required: true
  },
  totalRentals: {
    type: Number,
    default: 0,
    min: 0
  },
  totalRevenue: {
    type: Number,
    default: 0,
    min: 0
  },
  fuelType: {
    type: String,
    enum: ['EV', 'petrol', 'diesel'],
    required: true
  },
  // New environmental and operational fields
  engineHoursPerDay: {
    type: Number,
    default: 0,
    min: 0
  },
  operatingDays: {
    type: Number,
    default: 0,
    min: 0
  },
  carbonEmissionPerDay: {
    type: Number,
    default: 0,
    min: 0
  },
  totalCarbonEmission: {
    type: Number,
    default: 0,
    min: 0
  },
  specifications: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
=======
    enum: ['Bulldozer', 'Excavator', 'Loader', 'Crane', 'Grader', 'Dump Truck', 'Forklift', 'Backhoe', 'Skid Steer', 'Other']
  },
  model: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
    min: 1990,
    max: new Date().getFullYear() + 1
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true
  },
  specifications: {
    enginePower: String,
    operatingWeight: String,
    maxCapacity: String,
    fuelType: { type: String, enum: ['Diesel', 'Electric', 'Hybrid', 'Gasoline'] },
    attachments: [String]
  },
  condition: {
    type: String,
    enum: ['Good', 'Fair', 'Needs Inspection', 'Under Repair', 'Damaged'],
    default: 'Good'
  },
  status: {
    type: String,
    enum: ['Available', 'Rented', 'Reserved', 'Under Maintenance', 'Out of Service'],
    default: 'Available'
  },
  location: {
    depot: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  currentRental: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental',
    default: null
  },
  expectedReturnDate: Date,
  maintenanceSchedule: {
    lastMaintenance: Date,
    nextMaintenance: Date,
    maintenanceType: String,
    notes: String
  },
  rentalHistory: [{
    rentalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental' },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    startDate: Date,
    endDate: Date,
    returnCondition: String,
    totalHours: Number
  }],
  totalRentalHours: {
    type: Number,
    default: 0
  },
  acquisitionCost: Number,
  dailyRate: {
    type: Number,
    required: true,
    min: 0
  },
  weeklyRate: Number,
  monthlyRate: Number,
  images: [String],
  documents: [{
    type: String,
    url: String,
    uploadDate: Date
  }],
  isActive: {
    type: Boolean,
    default: true
>>>>>>> 09c67800c98a81dd42abd5c0d6ed43ce4c9589b9
  }
}, {
  timestamps: true
});

<<<<<<< HEAD
module.exports = mongoose.model('Vehicle', vehicleSchema);
=======
// Compound indexes for efficient queries
vehicleSchema.index({ dealerId: 1, status: 1 });
vehicleSchema.index({ dealerId: 1, type: 1 });
vehicleSchema.index({ dealerId: 1, condition: 1 });
vehicleSchema.index({ dealerId: 1, vehicleId: 1 });

module.exports = mongoose.model('Vehicle', vehicleSchema);
>>>>>>> 09c67800c98a81dd42abd5c0d6ed43ce4c9589b9
