// API Configuration for Remote Backend Integration
// This file prepares the frontend for deployment with a remote backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_VERSION = import.meta.env.VITE_API_VERSION || 'v1';

// Full API URL
export const API_URL = `${API_BASE_URL}/api/${API_VERSION}`;

// API Request Headers
const getHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add authentication token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

// Generic API Request Function
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    // Handle different response types
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// Authentication API Endpoints
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  register: (userData: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  logout: () =>
    apiRequest('/auth/logout', { method: 'POST' }),
  
  getCurrentUser: () =>
    apiRequest('/auth/user'),
  
  updateProfile: (updates: Record<string, any>) =>
    apiRequest('/auth/user/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),
};

// Capsule API Endpoints
export const capsuleAPI = {
  getAll: () =>
    apiRequest('/capsules'),
  
  getById: (id: string) =>
    apiRequest(`/capsules/${id}`),
  
  create: (capsuleData: Record<string, any>) =>
    apiRequest('/capsules', {
      method: 'POST',
      body: JSON.stringify(capsuleData),
    }),
  
  update: (id: string, updates: Record<string, any>) =>
    apiRequest(`/capsules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),
  
  delete: (id: string) =>
    apiRequest(`/capsules/${id}`, { method: 'DELETE' }),
  
  getPublic: () =>
    apiRequest('/capsules/public'),
  
  like: (id: string) =>
    apiRequest(`/capsules/${id}/like`, { method: 'POST' }),
};

// Notification API Endpoints
export const notificationAPI = {
  getAll: () =>
    apiRequest('/notifications'),
  
  markAsRead: (id: string) =>
    apiRequest(`/notifications/${id}/read`, { method: 'PUT' }),
  
  markAllAsRead: () =>
    apiRequest('/notifications/mark-all-read', { method: 'POST' }),
};

// File Upload API Endpoints
export const uploadAPI = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return apiRequest('/upload/image', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  },
  
  uploadAudio: (file: File) => {
    const formData = new FormData();
    formData.append('audio', file);
    
    return apiRequest('/upload/audio', {
      method: 'POST',
      body: formData,
      headers: {},
    });
  },
  
  uploadVideo: (file: File) => {
    const formData = new FormData();
    formData.append('video', file);
    
    return apiRequest('/upload/video', {
      method: 'POST',
      body: formData,
      headers: {},
    });
  },
  
  uploadDocument: (file: File) => {
    const formData = new FormData();
    formData.append('document', file);
    
    return apiRequest('/upload/document', {
      method: 'POST',
      body: formData,
      headers: {},
    });
  },
};

// Health Check Endpoint
export const healthCheck = () => apiRequest('/health');

// Error Handler for API responses
export const handleAPIError = (error: any) => {
  if (error.message?.includes('401')) {
    // Unauthorized - redirect to login
    localStorage.removeItem('auth_token');
    window.location.href = '/auth/login';
    return;
  }
  
  // Log error for debugging
  console.error('API Error:', error);
  
  // Return user-friendly error message
  if (error.message?.includes('400')) {
    return 'Invalid request. Please check your input.';
  }
  
  if (error.message?.includes('403')) {
    return 'You do not have permission to perform this action.';
  }
  
  if (error.message?.includes('404')) {
    return 'The requested resource was not found.';
  }
  
  if (error.message?.includes('500')) {
    return 'Server error. Please try again later.';
  }
  
  return 'An unexpected error occurred. Please try again.';
};

export default {
  auth: authAPI,
  capsules: capsuleAPI,
  notifications: notificationAPI,
  upload: uploadAPI,
  healthCheck,
  handleAPIError,
};