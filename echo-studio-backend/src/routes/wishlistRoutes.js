import { Router } from 'express';
import * as wishlistController from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, wishlistController.getWishlist);
router.post('/', protect, wishlistController.addToWishlist);
router.delete('/:productId', protect, wishlistController.removeFromWishlist);

export default router;
