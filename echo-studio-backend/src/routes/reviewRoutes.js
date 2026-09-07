import { Router } from 'express';
import * as reviewController from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = Router();

router.get('/product/:productId', reviewController.getProductReviews);
router.post('/product/:productId', protect, reviewController.createReview);
router.put('/:id', protect, reviewController.updateReview);
router.delete('/:id', protect, reviewController.deleteReview);
router.get('/admin/all', adminOnly, reviewController.getAllReviews);

export default router;
