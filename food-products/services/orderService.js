import api from './api';

export const orderService = {
  createOrder: (data) => api.post('/orders', data),
  getOrders: (params) => {
    const query = new URLSearchParams(params || {}).toString();
    return api.get(`/orders?${query}`);
  },
  getOrderById: (id) => api.get(`/orders/${id}`),
  cancelOrder: (id, reason) => api.post(`/orders/${id}/cancel`, { reason }),
};

export default orderService;
