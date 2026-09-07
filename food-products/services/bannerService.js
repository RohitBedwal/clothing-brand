import api from './api';

export const bannerService = {
  getBanners: () => api.get('/banners'),
};

export default bannerService;
