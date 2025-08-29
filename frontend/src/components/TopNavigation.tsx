import React from 'react';
import { Bell, User } from 'lucide-react';

interface TopNavigationProps {
  dealerName: string;
  notificationCount: number;
  onAlertsClick: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ dealerName, notificationCount, onAlertsClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">{dealerName}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button
            onClick={onAlertsClick}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center ${
                notificationCount > 99 ? 'px-2 py-1 min-w-[2rem] h-6' : 'h-5 w-5'
              }`}>
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </button>
          
          {/* User Profile */}
          <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">Raju Dealer</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;