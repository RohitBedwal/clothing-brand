import api from './api';

export const productService = {
  getProducts: (params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/products?${query}`);
  },
  getProduct: (id) => api.get(`/products/${id}`),
  getProductsByCategory: (category, params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/products/category/${category}?${query}`);
  },
  getProductsByCollection: (collection, params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/products/collection/${collection}?${query}`);
  },
  searchProducts: (query) => api.get(`/products/search?q=${query}`),
  getNewArrivals: () => api.get('/products/new-arrivals'),
  getSaleProducts: () => api.get('/products/sale'),
  getFeaturedProducts: () => api.get('/products/featured'),
};

export default productService;
