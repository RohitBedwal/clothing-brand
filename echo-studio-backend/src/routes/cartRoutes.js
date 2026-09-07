import { Router } from 'express';
import * as cartController from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, cartController.getCart);
router.post('/items', protect, cartController.addToCart);
router.put('/items/:id', protect, cartController.updateCartItem);
router.delete('/items/:id', protect, cartController.removeCartItem);
router.delete('/', protect, cartController.clearCart);

export default router;
