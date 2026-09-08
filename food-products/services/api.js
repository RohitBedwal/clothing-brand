const API_BASE = import.meta.env.VITE_API_URL || '/api';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedQueue = [];
};

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

  if (response.status === 401) {
    const data = await response.json().catch(() => null);

    if (data?.code === 'TOKEN_EXPIRED' && url !== '/auth/refresh') {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => request(url, options));
      }

      isRefreshing = true;

      try {
        const refreshResponse = await fetch(`${API_BASE}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!refreshResponse.ok) {
          processQueue(new Error('Refresh failed'));
          window.location.href = '/login';
          throw new Error('Session expired');
        }

        processQueue(null);
        return request(url, options);
      } catch (err) {
        processQueue(err);
        throw err;
      } finally {
        isRefreshing = false;
      }
    }
  }

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
