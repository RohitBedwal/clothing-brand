import { Router } from 'express';
import * as shippingController from '../controllers/shippingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/methods', shippingController.getMethods);
router.post('/calculate', protect, shippingController.calculate);

export default router;
