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
  getGallery: (params) => api.get('/company/gallery', { params }).then((res) => res.data),
};

export const adminService = {
  login: (credentials) => api.post('/admin/login', credentials).then((res) => res.data),
  getMe: () => api.get('/admin/me').then((res) => res.data),
  getDashboard: () => api.get('/admin/dashboard').then((res) => res.data),
  getAuditLogs: () => api.get('/admin/audit-logs').then((res) => res.data),
  
  // Settings CMS (Header, Hero, Company, Footer)
  getSettings: () => api.get('/admin/settings').then((res) => res.data),
  updateSettings: (data) => api.put('/admin/settings', data).then((res) => res.data),
  
  // Commodities (Products)
  getCommodities: () => api.get('/admin/commodities').then((res) => res.data),
  createCommodity: (data) => api.post('/admin/commodities', data).then((res) => res.data),
  updateCommodity: (id, data) => api.put(`/admin/commodities/${id}`, data).then((res) => res.data),
  deleteCommodity: (id) => api.delete(`/admin/commodities/${id}`).then((res) => res.data),

  // Gallery
  getGallery: () => api.get('/admin/gallery').then((res) => res.data),
  createGalleryItem: (data) => api.post('/admin/gallery', data).then((res) => res.data),
  updateGalleryItem: (id, data) => api.put(`/admin/gallery/${id}`, data).then((res) => res.data),
  deleteGalleryItem: (id) => api.delete(`/admin/gallery/${id}`).then((res) => res.data),

  // FAQs
  getFaqs: () => api.get('/admin/faqs').then((res) => res.data),
  createFaq: (data) => api.post('/admin/faqs', data).then((res) => res.data),
  updateFaq: (id, data) => api.put(`/admin/faqs/${id}`, data).then((res) => res.data),
  deleteFaq: (id) => api.delete(`/admin/faqs/${id}`).then((res) => res.data),

  // Testimonials
  getTestimonials: () => api.get('/admin/testimonials').then((res) => res.data),
  createTestimonial: (data) => api.post('/admin/testimonials', data).then((res) => res.data),
  updateTestimonial: (id, data) => api.put(`/admin/testimonials/${id}`, data).then((res) => res.data),
  deleteTestimonial: (id) => api.delete(`/admin/testimonials/${id}`).then((res) => res.data),

  // Executive Team & Desks
  getTeam: () => api.get('/admin/team').then((res) => res.data),
  createTeamMember: (data) => api.post('/admin/team', data).then((res) => res.data),
  updateTeamMember: (id, data) => api.put(`/admin/team/${id}`, data).then((res) => res.data),
  deleteTeamMember: (id) => api.delete(`/admin/team/${id}`).then((res) => res.data),

  // Certifications & Accreditations
  getCertifications: () => api.get('/admin/certifications').then((res) => res.data),
  createCertification: (data) => api.post('/admin/certifications', data).then((res) => res.data),
  updateCertification: (id, data) => api.put(`/admin/certifications/${id}`, data).then((res) => res.data),
  deleteCertification: (id) => api.delete(`/admin/certifications/${id}`).then((res) => res.data),

  // Ports & Gateways
  getPorts: () => api.get('/admin/ports').then((res) => res.data),
  createPort: (data) => api.post('/admin/ports', data).then((res) => res.data),
  updatePort: (id, data) => api.put(`/admin/ports/${id}`, data).then((res) => res.data),
  deletePort: (id) => api.delete(`/admin/ports/${id}`).then((res) => res.data),

  // Infrastructure & Processing Facilities
  getInfrastructure: () => api.get('/admin/infrastructure').then((res) => res.data),
  createInfrastructureItem: (data) => api.post('/admin/infrastructure', data).then((res) => res.data),
  updateInfrastructureItem: (id, data) => api.put(`/admin/infrastructure/${id}`, data).then((res) => res.data),
  deleteInfrastructureItem: (id) => api.delete(`/admin/infrastructure/${id}`).then((res) => res.data),

  // Traceability Batches / Lots
  getTraceabilityBatches: () => api.get('/admin/traceability').then((res) => res.data),
  createTraceabilityBatch: (data) => api.post('/admin/traceability', data).then((res) => res.data),
  updateTraceabilityBatch: (id, data) => api.put(`/admin/traceability/${id}`, data).then((res) => res.data),
  deleteTraceabilityBatch: (id) => api.delete(`/admin/traceability/${id}`).then((res) => res.data),
};

export default api;
