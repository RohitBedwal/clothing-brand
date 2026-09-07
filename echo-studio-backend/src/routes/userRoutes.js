import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { createAddressSchema, updateAddressSchema } from '../validators/addressValidators.js';

const router = Router();

router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);
router.get('/addresses', protect, userController.getAddresses);
router.post('/addresses', protect, validate(createAddressSchema), userController.createAddress);
router.put('/addresses/:id', protect, validate(updateAddressSchema), userController.updateAddress);
router.delete('/addresses/:id', protect, userController.deleteAddress);
router.put('/addresses/:id/default', protect, userController.setDefaultAddress);

export default router;
