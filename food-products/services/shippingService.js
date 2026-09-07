import api from './api';

export const shippingService = {
  getMethods: () => api.get('/shipping/methods'),
  calculate: (data) => api.post('/shipping/calculate', data),
};

export default shippingService;
