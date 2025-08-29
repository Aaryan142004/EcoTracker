import React, { useState, useEffect } from 'react';
import { Eye, MapPin, Phone, Mail, Building, Clock, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import { Customer } from '../types';
import { mockCustomers } from '../mockdata/mockdata';

interface CustomerModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ customer, isOpen, onClose }) => {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-300">{customer.businessType}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-300">{customer.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-600 dark:text-gray-300">{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-red-500" />
                  <span className="text-gray-600 dark:text-gray-300">{customer.email}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rental Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-300">Total Rentals</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{customer.totalRentals}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-300">Total Spent</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">${customer.totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-300">Outstanding Dues</span>
                  <span className="text-2xl font-bold text-red-600 dark:text-red-400">${customer.outstandingDues.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Patterns */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Usage Patterns</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-gray-900 dark:text-white">Peak Times</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {customer.rentalUsagePatterns.peakTimes.map((time, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-gray-900 dark:text-white">Avg Duration</span>
                </div>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {customer.rentalUsagePatterns.averageRentalDuration} days
                </span>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <span className="font-medium text-gray-900 dark:text-white">Preferred Days</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {customer.rentalUsagePatterns.preferredRentalDays.map((day, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Frequently Rented Machines */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Frequently Rented Machines</h3>
            <div className="flex flex-wrap gap-2">
              {customer.frequentlyRentedMachines.map((machine, index) => (
                <span key={index} className="px-3 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-lg font-medium">
                  {machine}
                </span>
              ))}
            </div>
          </div>

          {/* Rental History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rental History</h3>
            {customer.rentalHistory.length > 0 ? (
              <div className="space-y-3">
                {customer.rentalHistory.map((rental, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">{rental.vehicleType}</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">({rental.vehicleId})</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        rental.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        rental.status === 'active' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {rental.status}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {rental.startDate} - {rental.endDate} • ${rental.amount} • Condition: {rental.returnCondition}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No rental history available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      // Use mock data instead of API call
      setCustomers(mockCustomers);
    } catch (err) {
      setError('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.businessType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <div>
            <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Error Loading Customers</h3>
            <p className="text-red-600 dark:text-red-300">{error}</p>
          </div>
        </div>
        <button
          onClick={fetchCustomers}
          className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and view all customer information and rental history
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg font-medium">
              {filteredCustomers.length} customers
            </div>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer, index) => (
          <div
            key={customer._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Customer Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                {customer.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{customer.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{customer.businessType}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{customer.address}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{customer.totalRentals}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Rentals</div>
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">${customer.totalSpent.toLocaleString()}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Spent</div>
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-lg font-bold text-red-600 dark:text-red-400">${customer.outstandingDues.toLocaleString()}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Due</div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleViewDetails(customer)}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
          </div>
        ))}
      </div>

      {/* Customer Modal */}
      <CustomerModal
        customer={selectedCustomer}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Customers;
