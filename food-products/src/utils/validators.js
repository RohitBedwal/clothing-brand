export const validateEmail = (email) => {
  if (!email || !email.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email';
  return '';
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) return 'Phone is required';
  if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) return 'Enter a valid 10-digit phone number';
  return '';
};

export const validatePIN = (pin) => {
  if (!pin || !pin.trim()) return 'PIN code is required';
  if (!/^\d{6}$/.test(pin)) return 'Enter a valid 6-digit PIN code';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};

export const validateConfirmPassword = (password, confirm) => {
  if (!confirm) return 'Please confirm your password';
  if (password !== confirm) return 'Passwords do not match';
  return '';
};

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) return `${fieldName} is required`;
  return '';
};

export const validateName = (name, fieldName = 'Name') => {
  if (!name || !name.trim()) return `${fieldName} is required`;
  if (name.trim().length < 2) return `${fieldName} must be at least 2 characters`;
  return '';
};
