// API Service - Connects frontend to backend
// Set VITE_API_URL in your environment (e.g., https://your-backend.onrender.com)

const API_BASE = import.meta.env.VITE_API_URL || '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.error || 'Request failed' };
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Network error. Please try again.' };
  }
}

// Auth
export const auth = {
  login: (password: string) =>
    fetchApi<{ token: string }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    }),
};

// Designs
export const designsApi = {
  getAll: () => fetchApi<any[]>('/designs'),
  getById: (id: string) => fetchApi<any>(`/designs/${id}`),
  getBySlug: (slug: string) => fetchApi<any>(`/designs/slug/${slug}`),
  create: (data: any, token: string) =>
    fetchApi<any>('/designs', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any, token: string) =>
    fetchApi<any>(`/designs/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),
  delete: (id: string, token: string) =>
    fetchApi<any>(`/designs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// Collections
export const collectionsApi = {
  getAll: () => fetchApi<any[]>('/collections'),
  create: (data: any, token: string) =>
    fetchApi<any>('/collections', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any, token: string) =>
    fetchApi<any>(`/collections/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),
  delete: (id: string, token: string) =>
    fetchApi<any>(`/collections/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// Bookings
export const bookingsApi = {
  getAll: (token: string) =>
    fetchApi<any[]>('/bookings', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  create: (data: any) =>
    fetchApi<any>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateStatus: (id: string, status: string, token: string) =>
    fetchApi<any>(`/bookings/${id}/status`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    }),
  delete: (id: string, token: string) =>
    fetchApi<any>(`/bookings/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// Contact Messages
export const contactApi = {
  getAll: (token: string) =>
    fetchApi<any[]>('/contact', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  create: (data: any) =>
    fetchApi<any>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Cloudinary Upload
export const uploadApi = {
  getSignature: () => fetchApi<{ signature: string; timestamp: number }>('/upload/signature'),
};
