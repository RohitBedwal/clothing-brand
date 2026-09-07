export const generateOrderId = () => {
  const prefix = 'ECH';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

export const getOrderStatusIndex = (status) => {
  const statuses = [
    'Pending', 'Confirmed', 'Processing', 'Packed',
    'Shipped', 'Out for Delivery', 'Delivered',
  ];
  return statuses.indexOf(status);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateTime = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status) => {
  const colors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Confirmed: 'bg-blue-100 text-blue-800',
    Processing: 'bg-indigo-100 text-indigo-800',
    Packed: 'bg-purple-100 text-purple-800',
    Shipped: 'bg-cyan-100 text-cyan-800',
    'Out for Delivery': 'bg-orange-100 text-orange-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
    Returned: 'bg-gray-100 text-gray-800',
    Refunded: 'bg-emerald-100 text-emerald-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const truncate = (str, len = 40) => {
  if (!str) return '';
  return str.length > len ? str.substring(0, len) + '...' : str;
};

export const getDiscountedPrice = (price, discountPercent) => {
  if (!discountPercent) return price;
  return Math.round(price * (1 - discountPercent / 100));
};
