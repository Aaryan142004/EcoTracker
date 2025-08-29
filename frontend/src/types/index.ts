export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  businessType: string;
  workCategory: string;
  address: string;
  contactPerson: string;
  emergencyContact: string;
  dealerId: string;
  // Rental management fields
  rentalHistory: RentalRecord[];
  frequentlyRentedMachines: string[];
  rentalUsagePatterns: {
    peakTimes: string[];
    averageRentalDuration: number;
    preferredRentalDays: string[];
  };
  outstandingDues: number;
  totalRentals: number;
  totalSpent: number;
  createdAt: string;
}

export interface RentalRecord {
  rentalId: string;
  vehicleId: string;
  vehicleType: string;
  startDate: string;
  endDate: string;
  returnCondition: 'good' | 'damaged' | 'broken';
  amount: number;
  status: 'completed' | 'active' | 'overdue';
}

export interface Vehicle {
  _id: string;
  vehicleId: string;
  type: string;
  model: string;
  condition: string;
  status: string;
  dealerId: string;
  currentRentalId?: string | null;
  expectedReturnDate?: string;
  checkInTime?: string;
  checkOutTime?: string;
  maintenanceStatus: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  totalRentals: number;
  totalRevenue: number;
  fuelType: 'EV' | 'petrol' | 'diesel';
  // New environmental and operational fields
  engineHoursPerDay: number;
  operatingDays: number;
  carbonEmissionPerDay: number;
  totalCarbonEmission: number;
  specifications: Record<string, any>;
  createdAt: string;
}

export interface Dealer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  businessType: string;
  address: string;
  createdAt: string;
}

export interface Machine {
  id: string;
  type: string;
  customerId: string;
  customerName: string;
  site: string;
  checkIn: string;
  condition: string;
  runtime: number;
  idleTime: number;
  fuelUsed: number;
  co2Emitted: number;
  returnDue: string;
}

export interface AvailableMachine {
  id: string;
  type: string;
  location: string;
  status: string;
}

export type NavItem = 'dashboard' | 'customers' | 'inventory' | 'alerts' | 'settings';