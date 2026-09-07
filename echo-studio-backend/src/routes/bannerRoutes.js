import { Router } from 'express';
import * as bannerController from '../controllers/bannerController.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = Router();

router.get('/', bannerController.getBanners);
router.post('/', ...adminOnly, bannerController.createBanner);
router.put('/:id', ...adminOnly, bannerController.updateBanner);
router.delete('/:id', ...adminOnly, bannerController.deleteBanner);

export default router;
