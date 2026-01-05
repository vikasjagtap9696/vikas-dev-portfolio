// API Configuration for Node.js Backend
// Change this URL when deploying or running locally
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  token?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    // Load token from localStorage if exists
    this.token = localStorage.getItem('admin_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('admin_token', token);
    } else {
      localStorage.removeItem('admin_token');
    }
  }

  getToken() {
    return this.token;
  }

  async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { method = 'GET', body } = options;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const data = await this.request<{ success: boolean; token: string; user: { email: string; role: string } }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async logout() {
    this.setToken(null);
  }

  async verifyToken() {
    return this.request<{ valid: boolean; user: { email: string; role: string } }>('/auth/verify');
  }

  // Projects endpoints
  async getProjects() {
    const data = await this.request<{ success: boolean; data: unknown[] }>('/projects');
    return data.data;
  }

  async createProject(project: unknown) {
    const data = await this.request<{ success: boolean; data: unknown }>('/projects', {
      method: 'POST',
      body: project,
    });
    return data.data;
  }

  async updateProject(id: string, updates: unknown) {
    const data = await this.request<{ success: boolean; data: unknown }>(`/projects/${id}`, {
      method: 'PUT',
      body: updates,
    });
    return data.data;
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, { method: 'DELETE' });
  }

  // Skills endpoints
  async getSkills() {
    const data = await this.request<{ success: boolean; data: unknown[] }>('/skills');
    return data.data;
  }

  async createSkill(skill: unknown) {
    const data = await this.request<{ success: boolean; data: unknown }>('/skills', {
      method: 'POST',
      body: skill,
    });
    return data.data;
  }

  async updateSkill(id: string, updates: unknown) {
    const data = await this.request<{ success: boolean; data: unknown }>(`/skills/${id}`, {
      method: 'PUT',
      body: updates,
    });
    return data.data;
  }

  async deleteSkill(id: string) {
    return this.request(`/skills/${id}`, { method: 'DELETE' });
  }

  // Certificates endpoints
  async getCertificates() {
    const data = await this.request<{ success: boolean; data: unknown[] }>('/certificates');
    return data.data;
  }

  async createCertificate(certificate: unknown) {
    const data = await this.request<{ success: boolean; data: unknown }>('/certificates', {
      method: 'POST',
      body: certificate,
    });
    return data.data;
  }

  async updateCertificate(id: string, updates: unknown) {
    const data = await this.request<{ success: boolean; data: unknown }>(`/certificates/${id}`, {
      method: 'PUT',
      body: updates,
    });
    return data.data;
  }

  async deleteCertificate(id: string) {
    return this.request(`/certificates/${id}`, { method: 'DELETE' });
  }

  // Experiences endpoints
  async getExperiences() {
    const data = await this.request<{ success: boolean; data: unknown[] }>('/experiences');
    return data.data;
  }

  async createExperience(experience: unknown) {
    const data = await this.request<{ success: boolean; data: unknown }>('/experiences', {
      method: 'POST',
      body: experience,
    });
    return data.data;
  }

  async updateExperience(id: string, updates: unknown) {
    const data = await this.request<{ success: boolean; data: unknown }>(`/experiences/${id}`, {
      method: 'PUT',
      body: updates,
    });
    return data.data;
  }

  async deleteExperience(id: string) {
    return this.request(`/experiences/${id}`, { method: 'DELETE' });
  }

  // Profile endpoints
  async getProfile() {
    const data = await this.request<{ success: boolean; data: unknown }>('/profile');
    return data.data;
  }

  async updateProfile(updates: unknown) {
    const data = await this.request<{ success: boolean; data: unknown }>('/profile', {
      method: 'PUT',
      body: updates,
    });
    return data.data;
  }

  // Contact endpoints
  async submitContact(contactData: { name: string; email: string; subject: string; message: string }) {
    return this.request<{ success: boolean; message: string }>('/contact', {
      method: 'POST',
      body: contactData,
    });
  }

  async getContactSubmissions() {
    const data = await this.request<{ success: boolean; data: unknown[] }>('/contact');
    return data.data;
  }

  async markContactAsRead(id: string) {
    return this.request(`/contact/${id}/read`, { method: 'PUT' });
  }

  async deleteContact(id: string) {
    return this.request(`/contact/${id}`, { method: 'DELETE' });
  }

  // Resume endpoints
  async getResume() {
    const data = await this.request<{ success: boolean; data: unknown }>('/resume');
    return data.data;
  }

  async updateResume(updates: { file_url: string; file_name: string }) {
    const data = await this.request<{ success: boolean; data: unknown }>('/resume', {
      method: 'PUT',
      body: updates,
    });
    return data.data;
  }
}

export const api = new ApiClient(API_BASE_URL);
export default api;
