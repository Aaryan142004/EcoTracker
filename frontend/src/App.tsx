import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import RentalInventory from './components/RentalInventory';
import Alerts from './components/Alerts';
import { NavItem } from './types';
import { mockCustomers, mockMachines, mockAvailableMachines, mockVehicles } from './mockdata/mockdata';

function App() {
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard');

  // Calculate actual alert count
  const calculateAlertCount = () => {
    let count = 0;
    
    // Overdue payments
    count += mockCustomers.filter(c => c.outstandingDues > 0).length;
    
    // Overdue rentals
    count += mockVehicles.filter(v => {
      if (v.status === 'rented' && v.expectedReturnDate) {
        const returnDate = new Date(v.expectedReturnDate);
        const today = new Date();
        return returnDate < today;
      }
      return false;
    }).length;
    
    // Maintenance due
    count += mockVehicles.filter(v => v.maintenanceStatus === 'maintenance due').length;
    
    // Add 1 for damaged return (mock data)
    count += 1;
    
    return count;
  };

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':
        return (
          <Dashboard 
            customers={mockCustomers} 
            machines={mockMachines} 
            availableMachines={mockAvailableMachines}
            vehicles={mockVehicles}
          />
        );
      case 'customers':
        return <Customers />;
      case 'inventory':
        return <RentalInventory vehicles={mockVehicles} />;
      case 'alerts':
        return <Alerts customers={mockCustomers} vehicles={mockVehicles} />;
      case 'settings':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Settings</h2>
            <p className="text-gray-500 dark:text-gray-400">Settings section coming soon...</p>
          </div>
        );
      default:
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome</h2>
            <p className="text-gray-500 dark:text-gray-400">Select a navigation item to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation 
          dealerName="Prime Equipment Rentals" 
          notificationCount={calculateAlertCount()}
          onAlertsClick={() => setActiveNav('alerts')}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;