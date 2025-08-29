import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Wrench, 
  Calendar
} from 'lucide-react';
import { Customer, Vehicle } from '../types';

interface AlertsProps {
  customers: Customer[];
  vehicles: Vehicle[];
}

interface Alert {
  id: string;
  type: 'overdue_rental' | 'overdue_payment' | 'damaged_return' | 'maintenance_due';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  customerId: string;
  vehicleId?: string;
  dueDate?: string;
  amount?: number;
  createdAt: string;
}

const Alerts: React.FC<AlertsProps> = ({ customers, vehicles }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Generate mock alerts based on customer and vehicle data
  const generateAlerts = (): Alert[] => {
    const alerts: Alert[] = [];
    
    // Overdue rentals
    customers.forEach((customer, index) => {
      if (customer.outstandingDues > 0) {
        alerts.push({
          id: `alert-${index}-1`,
          type: 'overdue_payment',
          priority: customer.outstandingDues > 2000 ? 'high' : 'medium',
          title: 'Overdue Payment',
          description: `${customer.name} has outstanding dues of $${customer.outstandingDues.toLocaleString()}`,
          customerId: customer._id,
          amount: customer.outstandingDues,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
    });

    // Overdue rentals (vehicles that should be returned)
    vehicles.forEach((vehicle, index) => {
      if (vehicle.status === 'rented' && vehicle.expectedReturnDate) {
        const returnDate = new Date(vehicle.expectedReturnDate);
        const today = new Date();
        if (returnDate < today) {
          const daysOverdue = Math.floor((today.getTime() - returnDate.getTime()) / (1000 * 60 * 60 * 24));
          alerts.push({
            id: `alert-${index}-2`,
            type: 'overdue_rental',
            priority: daysOverdue > 7 ? 'high' : daysOverdue > 3 ? 'medium' : 'low',
            title: 'Overdue Rental',
            description: `${vehicle.vehicleId} (${vehicle.type}) is ${daysOverdue} day(s) overdue`,
            customerId: 'unknown', // In real app, this would come from rental records
            vehicleId: vehicle.vehicleId,
            dueDate: vehicle.expectedReturnDate,
            createdAt: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString()
          });
        }
      }
    });

    // Maintenance due
    vehicles.forEach((vehicle, index) => {
      if (vehicle.maintenanceStatus === 'maintenance due') {
        alerts.push({
          id: `alert-${index}-3`,
          type: 'maintenance_due',
          priority: 'medium',
          title: 'Maintenance Due',
          description: `${vehicle.vehicleId} (${vehicle.type}) requires maintenance`,
          customerId: 'unknown',
          vehicleId: vehicle.vehicleId,
          createdAt: new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
    });

    // Damaged returns (mock data)
    alerts.push({
      id: 'alert-damaged-1',
      type: 'damaged_return',
      priority: 'high',
      title: 'Damaged Equipment Return',
      description: 'EXC-001 (Excavator) returned with minor damage',
      customerId: 'unknown',
      vehicleId: 'EXC-001',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    });

    return alerts.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
    });
  };

  const alerts = generateAlerts();

  const filteredAlerts = alerts.filter(alert => {
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesPriority = filterPriority === 'all' || alert.priority === filterPriority;
    return matchesType && matchesPriority;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'overdue_rental':
        return <Clock className="w-5 h-5 text-red-500" />;
      case 'overdue_payment':
        return <DollarSign className="w-5 h-5 text-amber-500" />;
      case 'damaged_return':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'maintenance_due':
        return <Wrench className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide";
    switch (priority) {
      case 'high':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>High</span>;
      case 'medium':
        return <span className={`${baseClasses} bg-amber-100 text-amber-800`}>Medium</span>;
      case 'low':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Low</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{priority}</span>;
    }
  };

  const getTypeBadge = (type: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide";
    switch (type) {
      case 'overdue_rental':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Overdue Rental</span>;
      case 'overdue_payment':
        return <span className={`${baseClasses} bg-amber-100 text-amber-800`}>Overdue Payment</span>;
      case 'damaged_return':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Damaged Return</span>;
      case 'maintenance_due':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Maintenance Due</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{type}</span>;
    }
  };

  const getCustomerInfo = (customerId: string) => {
    if (customerId === 'unknown') return null;
    return customers.find(c => c._id === customerId);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alerts & Notifications</h1>
        <p className="text-gray-600">Stay updated on overdue rentals, payments, and maintenance issues</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Overdue Rentals</p>
              <p className="text-2xl font-bold text-gray-900">
                {alerts.filter(a => a.type === 'overdue_rental').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-amber-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Overdue Payments</p>
              <p className="text-2xl font-bold text-gray-900">
                {alerts.filter(a => a.type === 'overdue_payment').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Damaged Returns</p>
              <p className="text-2xl font-bold text-gray-900">
                {alerts.filter(a => a.type === 'damaged_return').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wrench className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Maintenance Due</p>
              <p className="text-2xl font-bold text-gray-900">
                {alerts.filter(a => a.type === 'maintenance_due').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Types</option>
              <option value="overdue_rental">Overdue Rentals</option>
              <option value="overdue_payment">Overdue Payments</option>
              <option value="damaged_return">Damaged Returns</option>
              <option value="maintenance_due">Maintenance Due</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No alerts found</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const customer = getCustomerInfo(alert.customerId);
            return (
              <div key={alert.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                        {getPriorityBadge(alert.priority)}
                        {getTypeBadge(alert.type)}
                      </div>
                      <p className="text-gray-600 mb-3">{alert.description}</p>
                      
                      {/* Customer Details */}
                      {customer && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-500">Name:</span>
                              <span className="font-medium">{customer.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-500">Business:</span>
                              <span className="font-medium">{customer.businessType}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-500">Phone:</span>
                              <span className="font-medium">{customer.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-500">Email:</span>
                              <span className="font-medium">{customer.email}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Alert Details */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(alert.createdAt).toLocaleDateString()}</span>
                        </div>
                        {alert.dueDate && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Due: {new Date(alert.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {alert.amount && (
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>${alert.amount.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200">
                      Take Action
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Alerts;
