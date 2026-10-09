import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('agro_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productsService = {
  getAll: (params) => api.get('/products', { params }).then((res) => res.data),
  getBySlug: (slug) => api.get(`/products/${slug}`).then((res) => res.data),
  getCategories: () => api.get('/categories').then((res) => res.data),
  getCategoryBySlug: (slug) => api.get(`/categories/${slug}`).then((res) => res.data),
};

export const inquiriesService = {
  submitRfq: (data) => api.post('/inquiries', data).then((res) => res.data),
  trackInquiry: (inquiryNumber) => api.get(`/inquiries/check/${inquiryNumber}`).then((res) => res.data),
  // Admin
  getAll: (params) => api.get('/inquiries', { params }).then((res) => res.data),
  getById: (id) => api.get(`/inquiries/${id}`).then((res) => res.data),
  updateStatus: (id, data) => api.put(`/inquiries/${id}/status`, data).then((res) => res.data),
  addNote: (id, data) => api.post(`/inquiries/${id}/notes`, data).then((res) => res.data),
};

export const qualityService = {
  getCertifications: () => api.get('/quality/certifications').then((res) => res.data),
  verifyCertificate: (query) => api.get(`/quality/certifications/verify/${encodeURIComponent(query)}`).then((res) => res.data),
  verifyBatch: (batchCode) => api.get(`/quality/traceability/verify/${encodeURIComponent(batchCode)}`).then((res) => res.data),
  getQualityDocs: () => api.get('/quality/quality-documents').then((res) => res.data),
};

export const marketsService = {
  getMarkets: () => api.get('/markets').then((res) => res.data),
  getCountry: (slug) => api.get(`/markets/countries/${slug}`).then((res) => res.data),
  getPackagingTypes: () => api.get('/markets/packaging-types').then((res) => res.data),
};

export const toolsService = {
  getCropCalendars: () => api.get('/tools/crop-calendars').then((res) => res.data),
  getHsCodes: (params) => api.get('/tools/hs-codes', { params }).then((res) => res.data),
  getPorts: () => api.get('/tools/ports').then((res) => res.data),
  calculateContainer: (data) => api.post('/tools/container-calculator', data).then((res) => res.data),
  calculateLandedCost: (data) => api.post('/tools/landed-cost-calculator', data).then((res) => res.data),
  convertUnit: (data) => api.post('/tools/unit-converter', data).then((res) => res.data),
};

export const blogsService = {
  getAll: (params) => api.get('/blogs', { params }).then((res) => res.data),
  getBySlug: (slug) => api.get(`/blogs/${slug}`).then((res) => res.data),
  getCategories: () => api.get('/blogs/categories').then((res) => res.data),
};

export const companyService = {
  getInfrastructure: () => api.get('/company/infrastructure').then((res) => res.data),
  getTeam: () => api.get('/company/team').then((res) => res.data),
  getTestimonials: () => api.get('/company/testimonials').then((res) => res.data),
  getFaqs: (params) => api.get('/company/faqs', { params }).then((res) => res.data),
  submitContact: (data) => api.post('/company/contact', data).then((res) => res.data),
  subscribeNewsletter: (data) => api.post('/company/newsletter', data).then((res) => res.data),
  getSettings: () => api.get('/company/settings').then((res) => res.data),
};

export const adminService = {
  login: (credentials) => api.post('/admin/login', credentials).then((res) => res.data),
  getMe: () => api.get('/admin/me').then((res) => res.data),
  getDashboard: () => api.get('/admin/dashboard').then((res) => res.data),
  getAuditLogs: () => api.get('/admin/audit-logs').then((res) => res.data),
};

export default api;
