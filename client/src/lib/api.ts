import { queryClient } from './queryClient';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}

// API Base Configuration
const API_BASE_URL = process.env.VITE_API_URL || '/api';

// Generic API request function
export async function apiRequest<T>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: any;
    params?: Record<string, string | number>;
    headers?: Record<string, string>;
  } = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', data, params, headers = {} } = options;
  
  // Build URL with params
  const url = new URL(`${API_BASE_URL}${endpoint}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
  }

  // Prepare request configuration
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
  };

  if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url.toString(), config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw {
        message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        code: response.status.toString(),
        details: errorData,
      } as ApiError;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw {
        message: 'Network error - please check your connection',
        code: 'NETWORK_ERROR',
        details: error,
      } as ApiError;
    }
    throw error;
  }
}

// Authentication API calls
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiRequest<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      data: credentials,
    }),

  register: (userData: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }) =>
    apiRequest<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      data: userData,
    }),

  logout: () =>
    apiRequest<{ success: boolean }>('/auth/logout', {
      method: 'POST',
    }),

  getCurrentUser: () =>
    apiRequest<any>('/auth/me'),

  refreshToken: () =>
    apiRequest<{ token: string }>('/auth/refresh', {
      method: 'POST',
    }),
};

// Capsules API calls
export const capsulesApi = {
  list: (filters?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) =>
    apiRequest<{ capsules: any[]; total: number; page: number }>('/capsules', {
      params: filters as Record<string, string | number>,
    }),

  create: (capsuleData: {
    title: string;
    content: any;
    deliveryDate?: Date;
    recipients?: string[];
    isPublic?: boolean;
    aiReflectionEnabled?: boolean;
  }) =>
    apiRequest<any>('/capsules', {
      method: 'POST',
      data: {
        ...capsuleData,
        deliveryDate: capsuleData.deliveryDate?.toISOString(),
      },
    }),

  getById: (id: string) =>
    apiRequest<any>(`/capsules/${id}`),

  update: (id: string, updateData: any) =>
    apiRequest<any>(`/capsules/${id}`, {
      method: 'PUT',
      data: updateData,
    }),

  delete: (id: string) =>
    apiRequest<{ success: boolean }>(`/capsules/${id}`, {
      method: 'DELETE',
    }),

  seal: (id: string) =>
    apiRequest<any>(`/capsules/${id}/seal`, {
      method: 'POST',
    }),
};

// Community API calls
export const communityApi = {
  getPublicCapsules: (page: number = 1, limit: number = 20) =>
    apiRequest<{ capsules: any[]; total: number; page: number }>('/community/capsules', {
      params: { page, limit },
    }),

  likeCapsule: (capsuleId: string) =>
    apiRequest<{ success: boolean; likes: number }>(`/community/capsules/${capsuleId}/like`, {
      method: 'POST',
    }),

  unlikeCapsule: (capsuleId: string) =>
    apiRequest<{ success: boolean; likes: number }>(`/community/capsules/${capsuleId}/like`, {
      method: 'DELETE',
    }),

  getComments: (capsuleId: string) =>
    apiRequest<{ comments: any[] }>(`/community/capsules/${capsuleId}/comments`),

  addComment: (capsuleId: string, comment: string) =>
    apiRequest<any>(`/community/capsules/${capsuleId}/comments`, {
      method: 'POST',
      data: { comment },
    }),
};

// Notifications API calls
export const notificationsApi = {
  list: (page: number = 1, limit: number = 20) =>
    apiRequest<{ notifications: any[]; total: number; unreadCount: number }>('/notifications', {
      params: { page, limit },
    }),

  markAsRead: (notificationId: string) =>
    apiRequest<{ success: boolean }>(`/notifications/${notificationId}/read`, {
      method: 'POST',
    }),

  markAllAsRead: () =>
    apiRequest<{ success: boolean }>('/notifications/read-all', {
      method: 'POST',
    }),
};

// User API calls
export const userApi = {
  getProfile: () =>
    apiRequest<any>('/user/profile'),

  updateProfile: (profileData: {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
  }) =>
    apiRequest<any>('/user/profile', {
      method: 'PUT',
      data: profileData,
    }),

  getStats: () =>
    apiRequest<{
      totalCapsules: number;
      scheduledCapsules: number;
      deliveredCapsules: number;
      draftCapsules: number;
    }>('/user/stats'),

  updateSettings: (settings: {
    emailNotifications?: boolean;
    reminderNotifications?: boolean;
    publicProfile?: boolean;
    communityContributions?: boolean;
  }) =>
    apiRequest<any>('/user/settings', {
      method: 'PUT',
      data: settings,
    }),

  changePassword: (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) =>
    apiRequest<{ success: boolean }>('/user/password', {
      method: 'PUT',
      data: passwordData,
    }),
};

// File upload API calls
export const filesApi = {
  upload: async (file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<{ url: string; id: string }>> => {
    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const result = JSON.parse(xhr.responseText);
            resolve(result);
          } catch (error) {
            reject({
              message: 'Invalid response from server',
              code: 'PARSE_ERROR',
              details: error,
            } as ApiError);
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            reject({
              message: errorData.message || `HTTP ${xhr.status}: Upload failed`,
              code: xhr.status.toString(),
              details: errorData,
            } as ApiError);
          } catch {
            reject({
              message: `HTTP ${xhr.status}: Upload failed`,
              code: xhr.status.toString(),
            } as ApiError);
          }
        }
      });

      xhr.addEventListener('error', () => {
        reject({
          message: 'Upload failed - network error',
          code: 'NETWORK_ERROR',
        } as ApiError);
      });

      xhr.open('POST', `${API_BASE_URL}/files/upload`);
      xhr.withCredentials = true;
      xhr.send(formData);
    });
  },

  delete: (fileId: string) =>
    apiRequest<{ success: boolean }>(`/files/${fileId}`, {
      method: 'DELETE',
    }),
};

// Helper function to invalidate related queries after mutations
export const invalidateQueries = {
  capsules: () => queryClient.invalidateQueries({ queryKey: ['/api/capsules'] }),
  userStats: () => queryClient.invalidateQueries({ queryKey: ['/api/user/stats'] }),
  notifications: () => queryClient.invalidateQueries({ queryKey: ['/api/notifications'] }),
  community: () => queryClient.invalidateQueries({ queryKey: ['/api/community'] }),
  userProfile: () => queryClient.invalidateQueries({ queryKey: ['/api/user/profile'] }),
};
