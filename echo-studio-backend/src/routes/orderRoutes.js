import { Router } from 'express';
import * as orderController from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { createOrderSchema, cancelOrderSchema } from '../validators/orderValidators.js';

const router = Router();

router.post('/', protect, validate(createOrderSchema), orderController.createOrder);
router.get('/', protect, orderController.getOrders);
router.get('/:id', protect, orderController.getOrderById);
router.post('/:id/cancel', protect, validate(cancelOrderSchema), orderController.cancelOrder);
router.get('/admin/all', adminOnly, orderController.getAllOrders);

export default router;
