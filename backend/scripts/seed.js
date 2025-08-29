const connectDB = require('../config/database');
const mongoose = require('mongoose');

// Import models
const Customer = require('../models/Customer');
const Vehicle = require('../models/Vehicle');
const Dealer = require('../models/Dealer');

// Sample data
const sampleDealers = [
  {
    name: 'Prime Equipment Rentals',
    email: 'info@primeequipment.com',
    phone: '+1234567000',
    businessType: 'Construction Equipment Rental',
    address: '100 Equipment Blvd, Rental City, ST 12340'
  }
];

const sampleVehicles = [
  {
    vehicleId: 'EXC-001',
    type: 'Excavator',
    model: 'CAT 320D',
    condition: 'good',
    status: 'rented',
    dealerId: null, // Will be set to actual dealer._id
    currentRentalId: null,
    expectedReturnDate: new Date('2024-01-25'),
    checkOutTime: new Date('2024-01-20T08:30:00.000Z'),
    maintenanceStatus: 'operational',
    lastMaintenanceDate: new Date('2024-01-10'),
    nextMaintenanceDate: new Date('2024-02-10'),
    totalRentals: 67,
    totalRevenue: 33500,
    fuelType: 'diesel',
    specifications: {
      weight: '20 tons',
      engine: 'CAT C7.1',
      bucketCapacity: '1.2 m³',
      maxDigDepth: '6.5 m'
    },
    engineHoursPerDay: 1.5,
    operatingDays: 15,
    carbonEmissionPerDay: 4.74,
    totalCarbonEmission: 71.1
    
  },
  {
    vehicleId: 'BUL-001',
    type: 'Bulldozer',
    model: 'CAT D6T',
    condition: 'good',
    status: 'rented',
    dealerId: null, // Will be set to actual dealer._id
    currentRentalId: null,
    expectedReturnDate: new Date('2024-01-22'),
    checkOutTime: new Date('2024-01-19T09:15:00.000Z'),
    maintenanceStatus: 'operational',
    lastMaintenanceDate: new Date('2024-01-08'),
    nextMaintenanceDate: new Date('2024-02-08'),
    totalRentals: 54,
    totalRevenue: 27000,
    fuelType: 'diesel',
    specifications: {
      weight: '18 tons',
      engine: 'CAT C9.3',
      bladeWidth: '3.2 m',
      maxSpeed: '12 km/h'
    },
    engineHoursPerDay: 7.5,
    operatingDays: 25,
    carbonEmissionPerDay: 23.7,
    totalCarbonEmission: 592.5
  },
  {
    vehicleId: 'EXC-002',
    type: 'Excavator',
    model: 'CAT 330D',
    condition: 'good',
    status: 'rented',
    dealerId: null, // Will be set to actual dealer._id
    currentRentalId: null,
    expectedReturnDate: new Date('2024-01-28'),
    checkOutTime: new Date('2024-01-21T07:45:00.000Z'),
    maintenanceStatus: 'operational',
    lastMaintenanceDate: new Date('2024-01-12'),
    nextMaintenanceDate: new Date('2024-02-12'),
    totalRentals: 42,
    totalRevenue: 21000,
    fuelType: 'diesel',
    specifications: {
      weight: '30 tons',
      engine: 'CAT C9.3',
      bucketCapacity: '1.8 m³',
      maxDigDepth: '8.2 m'
    },
    engineHoursPerDay: 5,
    operatingDays: 20,
    carbonEmissionPerDay: 15.8,
    totalCarbonEmission: 316.0
  },
  {
    vehicleId: 'CRN-001',
    type: 'Crane',
    model: 'Liebherr LTM 1100',
    condition: 'under repair',
    status: 'under maintenance',
    dealerId: null, // Will be set to actual dealer._id
    currentRentalId: null,
    checkInTime: new Date('2024-01-15T14:20:00.000Z'),
    maintenanceStatus: 'under repair',
    lastMaintenanceDate: new Date('2024-01-05'),
    nextMaintenanceDate: new Date('2024-02-05'),
    totalRentals: 38,
    totalRevenue: 19000,
    fuelType: 'diesel',
    specifications: {
      weight: '48 tons',
      engine: 'Mercedes-Benz OM 906 LA',
      maxLiftCapacity: '100 tons',
      maxBoomLength: '60 m'
    },
    engineHoursPerDay: 0,
    operatingDays: 20,
    carbonEmissionPerDay: 0.0,
    totalCarbonEmission: 0.0
  },
  {
    vehicleId: 'LDR-001',
    type: 'Loader',
    model: 'CAT 950H',
    condition: 'good',
    status: 'available',
    dealerId: null, // Will be set to actual dealer._id
    currentRentalId: null,
    checkInTime: new Date('2024-01-22T16:30:00.000Z'),
    maintenanceStatus: 'operational',
    lastMaintenanceDate: new Date('2024-01-15'),
    nextMaintenanceDate: new Date('2024-02-15'),
    totalRentals: 51,
    totalRevenue: 25500,
    fuelType: 'diesel',
    specifications: {
      weight: '16 tons',
      engine: 'CAT C9.3',
      bucketCapacity: '3.2 m³',
      maxSpeed: '35 km/h'
    },
    engineHoursPerDay: 6,
    operatingDays: 10,
    carbonEmissionPerDay: 18.96,
    totalCarbonEmission: 189.6

  },
  {
    vehicleId: 'GRD-001',
    type: 'Grader',
    model: 'CAT 140K',
    condition: 'good',
    status: 'available',
    dealerId: null, // Will be set to actual dealer._id
    currentRentalId: null,
    checkInTime: new Date('2024-01-23T11:45:00.000Z'),
    maintenanceStatus: 'operational',
    lastMaintenanceDate: new Date('2024-01-18'),
    nextMaintenanceDate: new Date('2024-02-18'),
    totalRentals: 33,
    totalRevenue: 16500,
    fuelType: 'diesel',
    specifications: {
      weight: '14 tons',
      engine: 'CAT C9.3',
      bladeLength: '4.2 m',
      maxSpeed: '40 km/h'
    },
    engineHoursPerDay: 3,
    operatingDays: 18,
    carbonEmissionPerDay: 9.48,
    totalCarbonEmission: 170.64
  },
  {
    vehicleId: 'EXC-003',
    type: 'Excavator',
    model: 'CAT 320E',
    condition: 'needs inspection',
    status: 'reserved',
    dealerId: null, // Will be set to actual dealer._id
    currentRentalId: null,
    expectedReturnDate: new Date('2024-01-30'),
    checkOutTime: new Date('2024-01-24T08:00:00.000Z'),
    maintenanceStatus: 'maintenance due',
    lastMaintenanceDate: new Date('2023-12-20'),
    nextMaintenanceDate: new Date('2024-01-20'),
    totalRentals: 29,
    totalRevenue: 14500,
    fuelType: 'EV',
    specifications: {
      weight: '20 tons',
      engine: 'Electric Motor',
      bucketCapacity: '1.2 m³',
      maxDigDepth: '6.5 m',
      batteryCapacity: '300 kWh'
    },
    engineHoursPerDay: 6,
    operatingDays: 20,
    carbonEmissionPerDay: 7.48,
    totalCarbonEmission: 149.6
  },
  {
    vehicleId: 'BUL-002',
    type: 'Bulldozer',
    model: 'CAT D8T',
    condition: 'damaged',
    status: 'under maintenance',
    dealerId: null, // Will be set to actual dealer._id
    currentRentalId: null,
    checkInTime: new Date('2024-01-18T13:15:00.000Z'),
    maintenanceStatus: 'under repair',
    lastMaintenanceDate: new Date('2024-01-02'),
    nextMaintenanceDate: new Date('2024-02-02'),
    totalRentals: 41,
    totalRevenue: 20500,
    fuelType: 'diesel',
    specifications: {
      weight: '32 tons',
      engine: 'CAT C15',
      bladeWidth: '4.2 m',
      maxSpeed: '12 km/h'
    },
    engineHoursPerDay: 5,
    operatingDays: 25,
    carbonEmissionPerDay: 15.8,
    totalCarbonEmission: 395.0
  },
  {
    vehicleId: 'EXC-004',
    type: 'Mini Excavator',
    model: 'Kubota U17-3',
    condition: 'good',
    status: 'available',
    dealerId: null, // Will be set to actual dealer._id
    currentRentalId: null,
    checkInTime: new Date('2024-01-24T15:30:00.000Z'),
    maintenanceStatus: 'operational',
    lastMaintenanceDate: new Date('2024-01-20'),
    nextMaintenanceDate: new Date('2024-02-20'),
    totalRentals: 27,
    totalRevenue: 13500,
    fuelType: 'petrol',
    specifications: {
      weight: '1.7 tons',
      engine: 'Kubota D902',
      bucketCapacity: '0.08 m³',
      maxDigDepth: '2.2 m'
    },
    engineHoursPerDay: 2,
    operatingDays: 10,
    carbonEmissionPerDay: 5.96,
    totalCarbonEmission: 59.6
  },
  {
    vehicleId: 'GEN-001',
    type: 'Generator',
    model: 'Honda EU7000is',
    condition: 'good',
    status: 'available',
    dealerId: null, // Will be set to actual dealer._id
    currentRentalId: null,
    checkInTime: new Date('2024-01-21T10:20:00.000Z'),
    maintenanceStatus: 'operational',
    lastMaintenanceDate: new Date('2024-01-18'),
    nextMaintenanceDate: new Date('2024-02-18'),
    totalRentals: 45,
    totalRevenue: 22500,
    fuelType: 'petrol',
    specifications: {
      weight: '0.1 tons',
      engine: 'Honda GX390',
      powerOutput: '7 kW',
      fuelCapacity: '3.8 L'
    },
    engineHoursPerDay: 3,
    operatingDays: 5,
    carbonEmissionPerDay: 8.94,
    totalCarbonEmission: 44.7
  },
  {
    vehicleId: 'EXC-005',
    type: 'Excavator',
    model: 'CAT 320G',
    condition: 'good',
    status: 'available',
    dealerId: null, // Will be set to actual dealer._id
    currentRentalId: null,
    checkInTime: new Date('2024-01-25T12:00:00.000Z'),
    maintenanceStatus: 'operational',
    lastMaintenanceDate: new Date('2024-01-20'),
    nextMaintenanceDate: new Date('2024-02-20'),
    totalRentals: 38,
    totalRevenue: 19000,
    fuelType: 'diesel',
    specifications: {
      weight: '20 tons',
      engine: 'CAT C7.1',
      bucketCapacity: '1.2 m³',
      maxDigDepth: '6.5 m'
    },
    engineHoursPerDay: 8,
    operatingDays: 30,
    carbonEmissionPerDay: 25.28,
    totalCarbonEmission: 758.4
  },
  {
    vehicleId: 'BUL-003',
    type: 'Bulldozer',
    model: 'CAT D7E',
    condition: 'good',
    status: 'available',
    dealerId: null, // Will be set to actual dealer._id
    currentRentalId: null,
    checkInTime: new Date('2024-01-24T17:30:00.000Z'),
    maintenanceStatus: 'operational',
    lastMaintenanceDate: new Date('2024-01-18'),
    nextMaintenanceDate: new Date('2024-02-18'),
    totalRentals: 25,
    totalRevenue: 12500,
    fuelType: 'diesel',
    specifications: {
      weight: '22 tons',
      engine: 'CAT C9.3',
      bladeWidth: '3.6 m',
      maxSpeed: '12 km/h'
    },
    engineHoursPerDay: 4,
    operatingDays: 12,
    carbonEmissionPerDay: 12.64,
    totalCarbonEmission: 151.68
  }
];

const sampleCustomers = [
  {
    name: 'BuildCorp Construction',
    email: 'info@buildcorp.com',
    phone: '+1234567890',
    businessType: 'Construction',
    workCategory: 'General Contractor',
    address: '123 Main St, Building City, ST 12345',
    contactPerson: 'John Smith',
    emergencyContact: '+1234567891',
    dealerId: null, // Will be set to actual dealer._id
    rentalHistory: [],
    frequentlyRentedMachines: ['Excavator', 'Bulldozer', 'Loader'],
    rentalUsagePatterns: {
      peakTimes: ['Monday', 'Wednesday', 'Friday'],
      averageRentalDuration: 3,
      preferredRentalDays: ['Weekdays']
    },
    outstandingDues: 1250,
    totalRentals: 45,
    totalSpent: 28750,
    createdAt: new Date('2024-01-01')
  },
  {
    name: 'Metro Infrastructure',
    email: 'contact@metroinfra.com',
    phone: '+1234567892',
    businessType: 'Infrastructure',
    workCategory: 'Road Construction',
    address: '456 Oak Ave, Metro City, ST 12346',
    contactPerson: 'Sarah Johnson',
    emergencyContact: '+1234567893',
    dealerId: null, // Will be set to actual dealer._id
    rentalHistory: [],
    frequentlyRentedMachines: ['Excavator', 'Grader'],
    rentalUsagePatterns: {
      peakTimes: ['Tuesday', 'Thursday'],
      averageRentalDuration: 2,
      preferredRentalDays: ['Weekdays']
    },
    outstandingDues: 0,
    totalRentals: 28,
    totalSpent: 18200,
    createdAt: new Date('2024-01-02')
  },
  {
    name: 'Skyline Developers',
    email: 'info@skyline.dev',
    phone: '+1234567894',
    businessType: 'Development',
    workCategory: 'Commercial Developer',
    address: '789 Pine St, Skyline City, ST 12347',
    contactPerson: 'Mike Rodriguez',
    emergencyContact: '+1234567895',
    dealerId: null, // Will be set to actual dealer._id
    rentalHistory: [],
    frequentlyRentedMachines: ['Excavator', 'Bulldozer', 'Crane'],
    rentalUsagePatterns: {
      peakTimes: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      averageRentalDuration: 5,
      preferredRentalDays: ['Weekdays']
    },
    outstandingDues: 3200,
    totalRentals: 67,
    totalSpent: 45600,
    createdAt: new Date('2024-01-03')
  },
  {
    name: 'Urban Projects Ltd',
    email: 'projects@urban.com',
    phone: '+1234567896',
    businessType: 'Urban Development',
    workCategory: 'City Planning',
    address: '321 Elm Rd, Urban City, ST 12348',
    contactPerson: 'Lisa Chen',
    emergencyContact: '+1234567897',
    dealerId: null, // Will be set to actual dealer._id
    rentalHistory: [],
    frequentlyRentedMachines: ['Excavator', 'Mini Excavator'],
    rentalUsagePatterns: {
      peakTimes: ['Monday', 'Friday'],
      averageRentalDuration: 4,
      preferredRentalDays: ['Weekdays']
    },
    outstandingDues: 800,
    totalRentals: 34,
    totalSpent: 21800,
    createdAt: new Date('2024-01-04')
  },
  {
    name: 'Coastal Construction',
    email: 'build@coastal.com',
    phone: '+1234567898',
    businessType: 'Construction',
    workCategory: 'Marine Construction',
    address: '654 Maple Dr, Coastal Town, ST 12349',
    contactPerson: 'David Wilson',
    emergencyContact: '+1234567899',
    dealerId: null, // Will be set to actual dealer._id
    rentalHistory: [],
    frequentlyRentedMachines: ['Bulldozer', 'Generator'],
    rentalUsagePatterns: {
      peakTimes: ['Tuesday', 'Wednesday', 'Thursday'],
      averageRentalDuration: 3,
      preferredRentalDays: ['Weekdays']
    },
    outstandingDues: 0,
    totalRentals: 23,
    totalSpent: 14200,
    createdAt: new Date('2024-01-05')
  },
  {
    name: 'Highway Builders Inc',
    email: 'info@highwaybuilders.com',
    phone: '+1234567900',
    businessType: 'Infrastructure',
    workCategory: 'Highway Construction',
    address: '987 Highway Blvd, Road City, ST 12350',
    contactPerson: 'Robert Brown',
    emergencyContact: '+1234567901',
    dealerId: null, // Will be set to actual dealer._id
    rentalHistory: [],
    frequentlyRentedMachines: ['Excavator', 'Bulldozer', 'Grader'],
    rentalUsagePatterns: {
      peakTimes: ['Monday', 'Tuesday', 'Wednesday'],
      averageRentalDuration: 6,
      preferredRentalDays: ['Weekdays']
    },
    outstandingDues: 1850,
    totalRentals: 52,
    totalSpent: 32400,
    createdAt: new Date('2024-01-06')
  },
  {
    name: 'Mining Solutions Ltd',
    email: 'contact@miningsolutions.com',
    phone: '+1234567902',
    businessType: 'Mining',
    workCategory: 'Surface Mining',
    address: '456 Mine Rd, Mining Town, ST 12351',
    contactPerson: 'Jennifer Davis',
    emergencyContact: '+1234567903',
    dealerId: null, // Will be set to actual dealer._id
    rentalHistory: [],
    frequentlyRentedMachines: ['Excavator', 'Bulldozer', 'Loader'],
    rentalUsagePatterns: {
      peakTimes: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      averageRentalDuration: 7,
      preferredRentalDays: ['Weekdays']
    },
    outstandingDues: 4200,
    totalRentals: 89,
    totalSpent: 56700,
    createdAt: new Date('2024-01-07')
  },
  {
    name: 'Residential Developers',
    email: 'info@residential.dev',
    phone: '+1234567904',
    businessType: 'Development',
    workCategory: 'Residential Developer',
    address: '789 Home St, Residential City, ST 12352',
    contactPerson: 'Michael Wilson',
    emergencyContact: '+1234567905',
    dealerId: null, // Will be set to actual dealer._id
    rentalHistory: [],
    frequentlyRentedMachines: ['Mini Excavator', 'Generator'],
    rentalUsagePatterns: {
      peakTimes: ['Monday', 'Wednesday', 'Friday'],
      averageRentalDuration: 2,
      preferredRentalDays: ['Weekdays']
    },
    outstandingDues: 650,
    totalRentals: 31,
    totalSpent: 18900,
    createdAt: new Date('2024-01-08')
  },
  {
    name: 'Industrial Contractors',
    email: 'contractors@industrial.com',
    phone: '+1234567906',
    businessType: 'Industrial',
    workCategory: 'Industrial Construction',
    address: '321 Factory Ave, Industrial City, ST 12353',
    contactPerson: 'Amanda Taylor',
    emergencyContact: '+1234567907',
    dealerId: null, // Will be set to actual dealer._id
    rentalHistory: [],
    frequentlyRentedMachines: ['Crane', 'Excavator', 'Bulldozer'],
    rentalUsagePatterns: {
      peakTimes: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      averageRentalDuration: 8,
      preferredRentalDays: ['Weekdays']
    },
    outstandingDues: 0,
    totalRentals: 76,
    totalSpent: 48900,
    createdAt: new Date('2024-01-09')
  },
  {
    name: 'Landscape Architects',
    email: 'info@landscapearch.com',
    phone: '+1234567908',
    businessType: 'Landscaping',
    workCategory: 'Landscape Design',
    address: '654 Garden St, Landscape City, ST 12354',
    contactPerson: 'Christopher Lee',
    emergencyContact: '+1234567909',
    dealerId: null, // Will be set to actual dealer._id
    rentalHistory: [],
    frequentlyRentedMachines: ['Mini Excavator', 'Loader'],
    rentalUsagePatterns: {
      peakTimes: ['Tuesday', 'Thursday'],
      averageRentalDuration: 1,
      preferredRentalDays: ['Weekdays']
    },
    outstandingDues: 1200,
    totalRentals: 18,
    totalSpent: 11200,
    createdAt: new Date('2024-01-10')
  }
];

// Seeding function
const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data
    await Customer.deleteMany({});
    await Vehicle.deleteMany({});
    await Dealer.deleteMany({});
    
    console.log('🗑️  Cleared existing data');
    
    // Create dealer first
    const dealer = await Dealer.create(sampleDealers[0]);
    
    console.log('🏢 Created dealer:', dealer.name);
    
    // Create customers with proper dealer reference
    const customersWithDealerId = sampleCustomers.map(customer => ({
      ...customer,
      dealerId: dealer._id
    }));
    
    const customers = await Customer.create(customersWithDealerId);
    console.log(`👥 Created ${customers.length} customers`);
    
    // Create vehicles with proper dealer reference
    const vehiclesWithDealerId = sampleVehicles.map(vehicle => ({
      ...vehicle,
      dealerId: dealer._id
    }));
    
    const vehicles = await Vehicle.create(vehiclesWithDealerId);
    console.log(`🚗 Created ${vehicles.length} vehicles`);
    
    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - 1 Dealer`);
    console.log(`   - ${customers.length} Customers`);
    console.log(`   - ${vehicles.length} Vehicles`);
    
    // Show some sample data
    console.log('\n📋 Sample Customer Data:');
    customers.slice(0, 3).forEach(customer => {
      console.log(`   ${customer.name}: ${customer.totalRentals} rentals, $${customer.totalSpent} spent, $${customer.outstandingDues} dues`);
    });
    
    console.log('\n🚗 Sample Vehicle Data:');
    vehicles.slice(0, 3).forEach(vehicle => {
      console.log(`   ${vehicle.vehicleId}: ${vehicle.type} - ${vehicle.model}, ${vehicle.fuelType}, $${vehicle.totalRevenue} revenue`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();
