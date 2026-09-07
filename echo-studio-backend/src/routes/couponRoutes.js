import { Router } from 'express';
import * as couponController from '../controllers/couponController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = Router();

router.post('/validate', protect, couponController.validateCoupon);
router.post('/', adminOnly, couponController.createCoupon);
router.put('/:id', adminOnly, couponController.updateCoupon);
router.delete('/:id', adminOnly, couponController.deleteCoupon);
router.get('/', adminOnly, couponController.getCoupons);

export default router;
