import api from './api';

export const couponService = {
  validateCoupon: (code) => api.post('/coupons/validate', { code }),
};

export default couponService;
