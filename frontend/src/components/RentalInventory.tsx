import React, { useState } from 'react';
import { 
  Truck, 
  Wrench, 
  Activity, 
  AlertTriangle,
  Search,
  Plus,
  Zap,
  Fuel,
  X,
  MapPin
} from 'lucide-react';

import { Vehicle } from '../types';

// Dynamic import for the map component
const MapView = React.lazy(() => import('./MapView'));

interface RentalInventoryProps {
  vehicles: Vehicle[];
}

const RentalInventory: React.FC<RentalInventoryProps> = ({ vehicles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [conditionFilter, setConditionFilter] = useState<string>('all');
  const [fuelTypeFilter, setFuelTypeFilter] = useState<string>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  const getVehicleLocation = (vehicle: Vehicle) => {
    if (vehicle.status === 'under maintenance') {
      return { 
        lat: 12.9244, 
        lng: 79.1353,
        name: 'CMC Vellore',
        description: 'Currently at CMC Vellore for maintenance'
      };
    } else if (vehicle.status === 'available') {
      return { 
        lat: 12.9692, 
        lng: 79.1559,
        name: 'VIT Vellore',
        description: 'Available at VIT Vellore yard'
      };
    } else {
      // Random location in Vellore, Tamil Nadu area
      const randomLat = 12.9716 + (Math.random() - 0.5) * 0.02;
      const randomLng = 79.5946 + (Math.random() - 0.5) * 0.02;
      return { 
        lat: randomLat, 
        lng: randomLng, 
        name: 'Vellore, Tamil Nadu',
        description: 'Active at current job site in Vellore'
      };
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    const matchesCondition = conditionFilter === 'all' || vehicle.condition === conditionFilter;
    const matchesFuelType = fuelTypeFilter === 'all' || vehicle.fuelType === fuelTypeFilter;
    
    return matchesSearch && matchesStatus && matchesCondition && matchesFuelType;
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide";
    switch (status) {
      case 'available':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>{status}</span>;
      case 'reserved':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>{status}</span>;
      case 'rented':
        return <span className={`${baseClasses} bg-purple-100 text-purple-800`}>{status}</span>;
      case 'under maintenance':
        return <span className={`${baseClasses} bg-amber-100 text-amber-800`}>{status}</span>;
      default:
        return <span className={baseClasses}>{status}</span>;
    }
  };

  const getConditionBadge = (condition: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide";
    switch (condition) {
      case 'good':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>{condition}</span>;
      case 'damaged':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>{condition}</span>;
      case 'under repair':
        return <span className={`${baseClasses} bg-amber-100 text-amber-800`}>{condition}</span>;
      case 'needs inspection':
        return <span className={`${baseClasses} bg-orange-100 text-orange-800`}>{condition}</span>;
      default:
        return <span className={baseClasses}>{condition}</span>;
    }
  };

  const getFuelTypeBadge = (fuelType: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide";
    switch (fuelType) {
      case 'EV':
        return <span className={`${baseClasses} bg-emerald-100 text-emerald-800`}>{fuelType}</span>;
      case 'petrol':
        return <span className={`${baseClasses} bg-orange-100 text-orange-800`}>{fuelType}</span>;
      case 'diesel':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>{fuelType}</span>;
      default:
        return <span className={baseClasses}>{fuelType}</span>;
    }
  };

  const getFuelTypeIcon = (fuelType: string) => {
    switch (fuelType) {
      case 'EV':
        return <Zap className="w-4 h-4 text-emerald-500" />;
      case 'petrol':
        return <Fuel className="w-4 h-4 text-orange-500" />;
      case 'diesel':
        return <Fuel className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getMaintenanceStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
      case 'maintenance due':
        return <AlertTriangle className="w-3 h-3 text-amber-500" />;
      case 'under repair':
        return <Wrench className="w-3 h-3 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Rental Inventory</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and monitor all vehicles and equipment
            </p>
          </div>
          <button className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <Plus className="w-4 h-4" />
            <span>Add Vehicle</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Vehicles</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{vehicles.length}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
              <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {vehicles.filter(v => v.status === 'available').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
              <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Currently Rented</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {vehicles.filter(v => v.status === 'rented').length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
              <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Under Maintenance</p>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                {vehicles.filter(v => v.status === 'under maintenance').length}
              </p>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-xl">
              <Wrench className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Fuel Type Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Electric Vehicles</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {vehicles.filter(v => v.fuelType === 'EV').length}
              </p>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-xl">
              <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Petrol Vehicles</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {vehicles.filter(v => v.fuelType === 'petrol').length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-xl">
              <Fuel className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Diesel Vehicles</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {vehicles.filter(v => v.fuelType === 'diesel').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
              <Fuel className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Vehicle ID, Type, or Model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="rented">Rented</option>
              <option value="under maintenance">Under Maintenance</option>
            </select>
            
            <select
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Conditions</option>
              <option value="good">Good</option>
              <option value="damaged">Damaged</option>
              <option value="under repair">Under Repair</option>
              <option value="needs inspection">Needs Inspection</option>
            </select>

            <select
              value={fuelTypeFilter}
              onChange={(e) => setFuelTypeFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Fuel Types</option>
              <option value="EV">Electric</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fuel Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rental Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{vehicle.vehicleId}</div>
                      <div className="text-sm text-gray-500">{vehicle.type}</div>
                      <div className="text-sm text-gray-500">{vehicle.model}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-2">
                      {getStatusBadge(vehicle.status)}
                      {getConditionBadge(vehicle.condition)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getFuelTypeIcon(vehicle.fuelType)}
                      {getFuelTypeBadge(vehicle.fuelType)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>Total Rentals: {vehicle.totalRentals}</div>
                      <div>Revenue: ${vehicle.totalRevenue.toLocaleString()}</div>
                      {vehicle.expectedReturnDate && (
                        <div className="text-xs text-gray-500">
                          Return: {new Date(vehicle.expectedReturnDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getMaintenanceStatusIcon(vehicle.maintenanceStatus)}
                      <span className="text-sm text-gray-900">{vehicle.maintenanceStatus}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Next: {new Date(vehicle.nextMaintenanceDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => openModal(vehicle)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No vehicles found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Vehicle Details Modal */}
      {isModalOpen && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedVehicle.vehicleId} - {selectedVehicle.type}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{selectedVehicle.model}</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Status:</span>
                      <span className="font-medium">{getStatusBadge(selectedVehicle.status)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Condition:</span>
                      <span className="font-medium">{getConditionBadge(selectedVehicle.condition)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Fuel Type:</span>
                      <span className="font-medium">{getFuelTypeBadge(selectedVehicle.fuelType)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Total Rentals:</span>
                      <span className="font-medium">{selectedVehicle.totalRentals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Total Revenue:</span>
                      <span className="font-medium">${selectedVehicle.totalRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Maintenance</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Status:</span>
                      <span className="font-medium">{selectedVehicle.maintenanceStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Last Maintenance:</span>
                      <span className="font-medium">{new Date(selectedVehicle.lastMaintenanceDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Next Maintenance:</span>
                      <span className="font-medium">{new Date(selectedVehicle.nextMaintenanceDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Engine Hours/Day</div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedVehicle.engineHoursPerDay}h</div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Operating Days</div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedVehicle.operatingDays} days</div>
                  </div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Environmental Impact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Daily Emissions</div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{selectedVehicle.carbonEmissionPerDay}kg CO₂</div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Emissions</div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{selectedVehicle.totalCarbonEmission}kg CO₂</div>
                  </div>
                </div>
              </div>

              {/* Location Map - MAPVIEW COMPONENT */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Current Location
                </h3>
                <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                  <div className="w-full h-80 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                    <React.Suspense fallback={
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                          <div className="text-gray-600 dark:text-gray-400">Loading map...</div>
                        </div>
                      </div>
                    }>
                      <MapView 
                        lat={getVehicleLocation(selectedVehicle).lat}
                        lng={getVehicleLocation(selectedVehicle).lng}
                        vehicleId={selectedVehicle.vehicleId}
                        locationName={getVehicleLocation(selectedVehicle).name}
                        description={getVehicleLocation(selectedVehicle).description}
                        vehicleType={selectedVehicle.type}
                        vehicleModel={selectedVehicle.model}
                        vehicleStatus={selectedVehicle.status}
                        zoomLevel={13}
                        mapHeight="320px"
                        mapWidth="100%"
                      />
                    </React.Suspense>
                  </div>
                  
                  {/* Location Details */}
                  <div className="mt-4 text-center">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {getVehicleLocation(selectedVehicle).name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Coordinates: {getVehicleLocation(selectedVehicle).lat.toFixed(4)}, {getVehicleLocation(selectedVehicle).lng.toFixed(4)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {getVehicleLocation(selectedVehicle).description}
                    </div>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              {selectedVehicle.specifications && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedVehicle.specifications).map(([key, value]) => (
                      <div key={key} className="bg-white dark:bg-gray-600 rounded-lg p-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalInventory;
