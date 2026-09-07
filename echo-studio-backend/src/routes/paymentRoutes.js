import { Router } from 'express';
import express from 'express';
import * as paymentController from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/create', protect, paymentController.createPayment);
router.post('/verify', protect, paymentController.verifyPayment);
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handlePaymentWebhook);

export default router;
