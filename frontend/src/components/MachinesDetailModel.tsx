import React from 'react';
import { X, MapPin, Activity, Fuel, Clock, AlertTriangle } from 'lucide-react';
import { Customer, Machine } from '../types';

interface MachineDetailsModalProps {
  customer: Customer | null;
  machines: Machine[];
  isOpen: boolean;
  onClose: () => void;
}

const MachineDetailsModal: React.FC<MachineDetailsModalProps> = ({ customer, machines, isOpen, onClose }) => {
  if (!isOpen || !customer) return null;

  const customerMachines = machines.filter(m => m.customerId === customer._id);

  const getConditionBadge = (condition: Machine['condition']) => {
    const baseClasses = "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide";
    switch (condition) {
      case 'Good':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'Needs Maintenance':
        return `${baseClasses} bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200`;
      case 'Critical':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      default:
        return baseClasses;
    }
  };

  const getConditionIcon = (condition: Machine['condition']) => {
    switch (condition) {
      case 'Good':
        return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
      case 'Needs Maintenance':
        return <AlertTriangle className="w-3 h-3 text-amber-500" />;
      case 'Critical':
        return <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Machine Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Customer Information */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                <p className="font-medium text-gray-900 dark:text-white">{customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Business Type</p>
                <p className="font-medium text-gray-900 dark:text-white">{customer.businessType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Contact</p>
                <p className="font-medium text-gray-900 dark:text-white">{customer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">{customer.email}</p>
              </div>
            </div>
          </div>

          {/* Machines List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rented Machines</h3>
            {customerMachines.length > 0 ? (
              <div className="space-y-4">
                {customerMachines.map((machine) => (
                  <div key={machine.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{machine.type}</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">({machine.id})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getConditionIcon(machine.condition)}
                        <span className={getConditionBadge(machine.condition)}>
                          {machine.condition}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Site</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{machine.site}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-green-500" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Runtime</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{machine.runtime}h</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Fuel className="w-4 h-4 text-purple-500" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Fuel Used</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{machine.fuelUsed}L</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-red-500" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">CO2 Emitted</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{machine.co2Emitted}kg</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Check-in: {machine.checkIn}</span>
                        <span className="text-gray-600 dark:text-gray-400">Return Due: {machine.returnDue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>No machines currently rented by this customer</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineDetailsModal;