import api from './api';

export const cartService = {
  getCart: () => api.get('/cart'),
  addToCart: (variantId, quantity = 1) =>
    api.post('/cart/items', { variantId, quantity }),
  updateCartItem: (itemId, quantity) => api.put(`/cart/items/${itemId}`, { quantity }),
  removeCartItem: (itemId) => api.delete(`/cart/items/${itemId}`),
  clearCart: () => api.delete('/cart'),
};

export default cartService;
