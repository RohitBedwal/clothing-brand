import api from './api';

export const searchService = {
  search: (q) => api.get(`/search?q=${encodeURIComponent(q)}`),
};

export default searchService;
