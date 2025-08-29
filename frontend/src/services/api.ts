import { Customer, Vehicle, Dealer } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Customer APIs
  async getCustomers(): Promise<ApiResponse<Customer[]>> {
    return this.request<Customer[]>('/customer');
  }

  async getCustomerById(id: string): Promise<ApiResponse<Customer>> {
    return this.request<Customer>(`/customer/${id}`);
  }

  // Vehicle APIs
  async getVehicles(): Promise<ApiResponse<Vehicle[]>> {
    return this.request<Vehicle[]>('/vehicle');
  }

  async getVehicleById(id: string): Promise<ApiResponse<Vehicle>> {
    return this.request<Vehicle>(`/vehicle/${id}`);
  }

  // Dealer APIs
  async getDealers(): Promise<ApiResponse<Dealer[]>> {
    return this.request<Dealer[]>('/dealer');
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; message: string }>> {
    return this.request<{ status: string; message: string }>('/health');
  }
}

export const apiService = new ApiService();
export default apiService;
