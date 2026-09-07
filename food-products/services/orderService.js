import api from './api';

export const orderService = {
  createOrder: (data) => api.post('/orders', data),
  getOrders: (params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/orders?${query}`);
  },
  getOrder: (id) => api.get(`/orders/${id}`),
  cancelOrder: (id) => api.post(`/orders/${id}/cancel`),
  trackOrder: (id) => api.get(`/orders/${id}/track`),
};

export default orderService;
