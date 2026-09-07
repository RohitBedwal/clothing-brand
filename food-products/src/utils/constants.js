export const ORDER_STATUSES = [
  'Pending',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
  'Returned',
  'Refunded',
];

export const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: 'ri-money-dollar-circle-line' },
  { id: 'upi', label: 'UPI', icon: 'ri-smartphone-line' },
  { id: 'card', label: 'Credit / Debit Card', icon: 'ri-bank-card-line' },
  { id: 'netbanking', label: 'Net Banking', icon: 'ri-bank-line' },
  { id: 'wallet', label: 'Wallet', icon: 'ri-wallet-3-line' },
];

export const SHIPPING_METHODS = [
  { id: 'standard', label: 'Standard Shipping', description: '5-7 business days', price: 0 },
  { id: 'express', label: 'Express Shipping', description: '2-3 business days', price: 150 },
];

export const CATEGORIES = [
  'Dresses',
  'Sarees',
  'Co-ord Sets',
  'Ready to Ship',
  'Concept Saree Dresses',
  'Festive Edit',
  'Occasion Wear',
  'Evening Edit',
];

export const COLLECTIONS = [
  'Signature Collection',
  'Festive Edit',
  'Occasion Wear',
  'Evening Edit',
  'New Arrivals',
  'Sale',
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const COLORS = [
  'Black', 'White', 'Red', 'Blue', 'Green', 'Navy', 'Beige', 'Pink',
  'Maroon', 'Gold', 'Silver', 'Purple', 'Yellow', 'Grey', 'Brown', 'Orange',
];

export const DISCOUNT_CODE = 'ECHO10';
export const DISCOUNT_PERCENTAGE = 10;
