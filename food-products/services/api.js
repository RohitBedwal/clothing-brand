const API_BASE = '/api';

const request = async (url, options = {}) => {
  const { headers: customHeaders, ...rest } = options;
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  const response = await fetch(`${API_BASE}${url}`, {
    credentials: 'include',
    headers,
    ...rest,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || `HTTP ${response.status}`);
  }

  return data;
};

export const api = {
  get: (url) => request(url),
  post: (url, data) => request(url, { method: 'POST', body: JSON.stringify(data) }),
  put: (url, data) => request(url, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (url, data) => request(url, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (url) => request(url, { method: 'DELETE' }),
};

export default api;
