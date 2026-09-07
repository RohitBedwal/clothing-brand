import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { adminOnly } from '../middleware/adminMiddleware.js';


const router = Router();

router.get('/', categoryController.getCategories);
router.get('/:slug', categoryController.getCategoryBySlug);
router.post('/', adminOnly, categoryController.createCategory);
router.put('/:id', adminOnly, categoryController.updateCategory);
router.delete('/:id', adminOnly, categoryController.deleteCategory);

export default router;
