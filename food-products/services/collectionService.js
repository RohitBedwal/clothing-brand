import api from './api';

export const collectionService = {
  getCollections: () => api.get('/collections'),
  getCollectionBySlug: (slug) => api.get(`/collections/${slug}`),
};

export default collectionService;
