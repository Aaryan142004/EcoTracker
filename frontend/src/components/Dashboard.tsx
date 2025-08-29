import React, { useState } from 'react';
import { TrendingUp, Users, Wrench, AlertTriangle, Activity, Clock, Calendar, Truck, X } from 'lucide-react';
import { Customer, Machine, AvailableMachine, Vehicle } from '../types';
import CustomerRentalTable from './CustomerRentalTable';

interface DashboardProps {
  customers: Customer[];
  machines: Machine[];
  availableMachines: AvailableMachine[];
  vehicles: Vehicle[];
}

const Dashboard: React.FC<DashboardProps> = ({ customers, machines, availableMachines, vehicles }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate statistics based on available data
  const totalCustomers = customers.length;
  const totalMachines = machines.length;
  const totalVehicles = vehicles.length;
  const availableEquipment = vehicles.filter(v => v.status === 'available').length;
  const maintenanceEquipment = vehicles.filter(v => v.status === 'under maintenance').length;

  // Calculate total runtime and fuel usage
  const totalRuntime = machines.reduce((sum, machine) => sum + machine.runtime, 0);
  const totalFuelUsed = machines.reduce((sum, machine) => sum + machine.fuelUsed, 0);
  const totalCO2Emitted = machines.reduce((sum, machine) => sum + machine.co2Emitted, 0);

  // Get recent check-ins and check-outs
  const recentCheckIns = vehicles
    .filter(v => v.checkInTime)
    .sort((a, b) => new Date(b.checkInTime!).getTime() - new Date(a.checkInTime!).getTime())
    .slice(0, 5);

  const recentCheckOuts = vehicles
    .filter(v => v.checkOutTime)
    .sort((a, b) => new Date(b.checkOutTime!).getTime() - new Date(a.checkOutTime!).getTime())
    .slice(0, 5);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide";
    switch (status) {
      case 'available':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'rented':
        return `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`;
      case 'under maintenance':
        return `${baseClasses} bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200`;
      default:
        return baseClasses;
    }
  };

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  // Get vehicles for a specific customer (mock data - in real app this would come from API)
  const getCustomerVehicles = (customerId: string) => {
    // For now, return a subset of vehicles as if they belong to this customer
    // In real app, this would filter vehicles by customer's rental history
    return vehicles.slice(0, 3); // Show first 3 vehicles as example
  };

  // Calculate aggregated data for a customer
  const getCustomerAggregatedData = (customer: Customer) => {
    const customerVehicles = getCustomerVehicles(customer._id);
    
    const totalOperatingDays = customerVehicles.reduce((sum, vehicle) => sum + vehicle.operatingDays, 0);
    const totalEngineHours = customerVehicles.reduce((sum, vehicle) => sum + vehicle.engineHoursPerDay, 0);
    const totalCarbonEmission = customerVehicles.reduce((sum, vehicle) => sum + vehicle.totalCarbonEmission, 0);
    const totalFuelUsed = customerVehicles.reduce((sum, vehicle) => {
      // Estimate fuel usage based on engine hours and fuel type
      if (vehicle.fuelType === 'EV') return sum;
      return sum + (vehicle.engineHoursPerDay * vehicle.operatingDays * 0.5); // Rough estimate
    }, 0);

    return {
      totalOperatingDays,
      totalEngineHours,
      totalCarbonEmission,
      totalFuelUsed: Math.round(totalFuelUsed * 10) / 10
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Overview of your equipment rental operations
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  📊 Data Source: Frontend Mock Data
                </span>
              </div>
              <div className="px-3 py-1 bg-green-100 dark:bg-green-900 rounded-full">
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  🚀 Real-time Updates
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Live Data</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalCustomers}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Vehicles</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalVehicles}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
              <Truck className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available Equipment</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{availableEquipment}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
              <Wrench className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Under Maintenance</p>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{maintenanceEquipment}</p>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📊 Data Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {customers.reduce((sum, c) => sum + c.totalRentals, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Customer Rentals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Customer Spending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              ${customers.reduce((sum, c) => sum + c.outstandingDues, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Outstanding Dues</div>
          </div>
        </div>
      </div>

      {/* Check-in/Check-out Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Check-ins */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Check-ins</h3>
          </div>
          <div className="space-y-3">
            {recentCheckIns.length > 0 ? (
              recentCheckIns.map((vehicle, index) => (
                <div key={vehicle._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <Truck className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{vehicle.vehicleId}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{vehicle.type} - {vehicle.model}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDateTime(vehicle.checkInTime!)}
                    </div>
                    <span className={getStatusBadge(vehicle.status)}>
                      {vehicle.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No recent check-ins</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Check-outs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Check-outs</h3>
          </div>
          <div className="space-y-3">
            {recentCheckOuts.length > 0 ? (
              recentCheckOuts.map((vehicle, index) => (
                <div key={vehicle._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <Truck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{vehicle.vehicleId}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{vehicle.type} - {vehicle.model}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDateTime(vehicle.checkOutTime!)}
                    </div>
                    <span className={getStatusBadge(vehicle.status)}>
                      {vehicle.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No recent check-outs</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Runtime Performance</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Runtime</span>
              <span className="font-semibold text-gray-900 dark:text-white">{totalRuntime}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Avg per Machine</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalMachines > 0 ? Math.round(totalRuntime / totalMachines) : 0}h
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fuel Consumption</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Fuel Used</span>
              <span className="font-semibold text-gray-900 dark:text-white">{totalFuelUsed}L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Avg per Machine</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalMachines > 0 ? Math.round(totalFuelUsed / totalMachines) : 0}L
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Environmental Impact</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total CO2 Emitted</span>
              <span className="font-semibold text-gray-900 dark:text-white">{totalCO2Emitted}kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Avg per Machine</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalMachines > 0 ? Math.round(totalCO2Emitted / totalMachines) : 0}kg
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Rentals Table */}
      <CustomerRentalTable 
        customers={customers} 
        onViewDetails={handleViewDetails}
      />

      {/* Customer Details Modal */}
      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCustomer.name} - Vehicle Overview
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Customer Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedCustomer.totalRentals}</div>
                  <div className="text-sm text-gray-600">Total Rentals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">${selectedCustomer.totalSpent.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">${selectedCustomer.outstandingDues.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Outstanding Dues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedCustomer.businessType}</div>
                  <div className="text-sm text-gray-600">Business Type</div>
                </div>
              </div>
            </div>

            {/* Aggregated Vehicle Data */}
            {(() => {
              const aggregated = getCustomerAggregatedData(selectedCustomer);
              return (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Environmental Impact Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-700">{aggregated.totalOperatingDays}</div>
                      <div className="text-sm text-blue-600">Total Operating Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-700">{aggregated.totalEngineHours.toFixed(1)}h</div>
                      <div className="text-sm text-blue-600">Total Engine Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-700">{aggregated.totalCarbonEmission.toFixed(1)}kg</div>
                      <div className="text-sm text-blue-600">Total CO₂ Emissions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-700">{aggregated.totalFuelUsed}L</div>
                      <div className="text-sm text-blue-600">Total Fuel Used</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Individual Vehicle Cards */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rented Vehicles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getCustomerVehicles(selectedCustomer._id).map((vehicle) => (
                  <div key={vehicle._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-lg font-bold text-gray-900">{vehicle.vehicleId}</div>
                        <div className="text-sm text-gray-600">{vehicle.type}</div>
                        <div className="text-xs text-gray-500">{vehicle.model}</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        vehicle.status === 'available' ? 'bg-green-500' :
                        vehicle.status === 'rented' ? 'bg-blue-500' :
                        vehicle.status === 'under maintenance' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Site:</span>
                        <span className="text-gray-900">SITE001</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Check-In:</span>
                        <span className="text-gray-900">25 Aug 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Return Due:</span>
                        <span className="text-gray-900">28 Aug 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Condition:</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Good</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{vehicle.engineHoursPerDay}h</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-purple-500" />
                          <span>{vehicle.operatingDays}d</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Truck className="w-4 h-4 text-orange-500" />
                          <span>{vehicle.fuelType === 'EV' ? '0L' : `${Math.round(vehicle.engineHoursPerDay * vehicle.operatingDays * 0.5)}L`}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 text-green-500">🌱</div>
                          <span>{vehicle.totalCarbonEmission}kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;