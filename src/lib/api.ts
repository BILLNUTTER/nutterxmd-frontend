import axios from 'axios';
import {
  AuthResponse,
  BotFeatures,
  CustomCommand,
  DashboardResponse,
  UserSettingsDocument
} from '../../backend/shared/types';

const API_BASE_URL = 'https://nutterxmd-b92d0e5705d8.herokuapp.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});


// ✅ Attach token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Global error handling for 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ------------------------ AUTH ------------------------

export const authAPI = {
  register: async (userData: {
    username: string;
    email: string;
    password: string;
    phone: string;
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: {
    username: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }
};

// ------------------------ WHATSAPP ------------------------

export const whatsappAPI = {
  /**
   * Create or restore WhatsApp session.
   * Returns either a QR code (if not linked) or sessionId (if already linked).
   * Pass `forceNew: true` to regenerate QR even if session exists.
   */
  createOrRestoreSession: async (
    userId: string,
    forceNew = false
  ): Promise<{ type: 'qr' | 'session'; qr?: string; sessionId?: string }> => {
    const response = await api.post('/whatsapp/generate-qr', {
      userId,
      forceNew,
    });
    return response.data;
  },

  generatePairCode: async (
    whatsappNumber: string
  ): Promise<{ pairingCode: string; message: string }> => {
    const response = await api.post('/whatsapp/generate-pair-code', {
      whatsappNumber
    });
    return response.data;
  },


  sendSession: async (
    sessionId: string
  ): Promise<{ success: boolean }> => {
    const response = await api.post('/whatsapp/send-session', { sessionId });
    return response.data;
  }
};

// ------------------------ PAYMENT ------------------------

export const paymentAPI = {
  submitPayment: async (
    mpesaCode: string,
    amount: number
  ): Promise<{ message: string }> => {
    const response = await api.post('/payment/submit', { mpesaCode, amount });
    return response.data;
  },

  getPaymentStatus: async (): Promise<{ status: string }> => {
    const response = await api.get('/payment/status');
    return response.data;
  }
};

// ------------------------ DASHBOARD ------------------------

export const dashboardAPI = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const response = await api.get('/dashboard');
    return response.data;
  },

  updateFeatures: async (
    features: BotFeatures
  ): Promise<{
    message: string;
    settings: UserSettingsDocument;
  }> => {
    const response = await api.patch('/dashboard/features', { features });
    return response.data;
  },

  updateSettings: async (
    settings: { prefix: string; mode: 'PUBLIC' | 'PRIVATE' }
  ): Promise<{ success: boolean }> => {
    const response = await api.patch('/dashboard/settings', settings);
    return response.data;
  },

  updateCommands: async (
    customCommands: CustomCommand[]
  ): Promise<{ success: boolean }> => {
    const response = await api.patch('/dashboard/commands', { customCommands });
    return response.data;
  }
};

// ------------------------ USER SETTINGS (Prefix) ------------------------

export const userSettingsAPI = {
  getUserSettings: async (): Promise<{ prefix: string }> => {
    const response = await api.get('/features/user-settings');
    return response.data;
  },

  updatePrefix: async (prefix: string): Promise<{ message: string; data: string }> => {
    const response = await api.post('/features/update-prefix', { prefix });
    return response.data;
  }
};


export default api;
