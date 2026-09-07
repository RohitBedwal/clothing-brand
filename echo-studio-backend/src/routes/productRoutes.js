import { Router } from 'express';
import * as productController from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { createProductSchema, updateProductSchema } from '../validators/productValidators.js';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', adminOnly, validate(createProductSchema), productController.createProduct);
router.put('/:id', adminOnly, validate(updateProductSchema), productController.updateProduct);
router.delete('/:id', adminOnly, productController.deleteProduct);

export default router;
