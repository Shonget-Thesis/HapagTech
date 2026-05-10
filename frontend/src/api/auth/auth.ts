import api from '../../lib/api';
import { AuthUser, RegisterData, DietaryPreferences } from '../../utils/types';

const getApiErrorMessage = (error: any, fallback: string) => {
  if (!error) return fallback;

  const responseData = error.response?.data;
  if (responseData) {
    if (typeof responseData === 'string') return responseData;
    if (responseData.message) return responseData.message;
    if (responseData.detail) return responseData.detail;

    const flattened = Object.values(responseData).flatMap((value: any) => {
      if (typeof value === 'string') return [value];
      if (Array.isArray(value)) return value;
      if (typeof value === 'object' && value !== null) return Object.values(value);
      return [];
    });

    const message = flattened.find((item: any) => typeof item === 'string');
    if (message) return message;
    return JSON.stringify(responseData);
  }

  return error.message || fallback;
};

// The auth service handles direct API communication only
export const authService = {
  // User authentication
  async getCurrentUser() {
    try {
      const { data } = await api.get<AuthUser>('user');
      return data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Authentication required');
      }
      throw new Error(error.response?.data?.message || 'Failed to get user data');
    }
  },

  async login(email: string, password: string) {
    try {
      const { data } = await api.post<{ access: string; refresh: string; user: AuthUser }>('/login/', {
        email: email.toLowerCase().trim(),
        password
      });
      return data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      }
      throw new Error(getApiErrorMessage(error, 'Login failed'));
    }
  },

  async register(data: RegisterData) {
    try {
      const { data: responseData } = await api.post<{ access: string; refresh: string; user: AuthUser }>('/register/', {
        ...data,
        email: data.email.toLowerCase().trim()
      });
      return responseData;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error(getApiErrorMessage(error, 'Invalid registration data'));
      }
      throw new Error(getApiErrorMessage(error, 'Registration failed'));
    }
  },

  async logout(refreshToken: string) {
    try {
      await api.post('/logout/', { refresh: refreshToken });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  },

  // Profile management
  async updateProfile(data: Partial<AuthUser>) {
    try {
      const { data: responseData } = await api.put<AuthUser>('/profile/update/', data);
      return responseData;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  async updateProfilePicture(file: File) {
    try {
      if (!file) {
        throw new Error('No file provided');
      }
      const formData = new FormData();
      formData.append('profile_picture', file);
      const { data } = await api.put<AuthUser>('/profile/picture/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update profile picture');
    }
  },

  async updateDietaryPreferences(data: Partial<DietaryPreferences>) {
    try {
      const { data: responseData } = await api.put<AuthUser>('profile/dietary-preferences/', data);
      return responseData;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update dietary preferences');
    }
  }
};