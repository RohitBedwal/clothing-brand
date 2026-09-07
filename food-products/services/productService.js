import api from './api';

export const productService = {
  getProducts: (params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/products?${query}`);
  },
  getProductBySlug: (slug) => api.get(`/products/${slug}`),
  getNewArrivals: () => api.get('/products?newArrival=true&sort=newest'),
  getSaleProducts: () => api.get('/products?sale=true'),
  getFeaturedProducts: () => api.get('/products?featured=true'),
  getReadyToShip: () => api.get('/products?readyToShip=true'),
  searchProducts: (q) => api.get(`/search?q=${encodeURIComponent(q)}`),
};

export default productService;
