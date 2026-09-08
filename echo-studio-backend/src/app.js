import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import env from './config/env.js';
import errorMiddleware from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import shippingRoutes from './routes/shippingRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';

const app = express();

app.set('trust proxy', 1);

app.use(helmet());

app.use(cors({
  origin: [env.FRONTEND_URL, env.ADMIN_FRONTEND_URL],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));

app.use(cookieParser());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/auth', authLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/banners', bannerRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'ECHO STUDIO API is running' });
});

app.head('/api/health', (req, res) => {
  res.sendStatus(200);
});

app.use(errorMiddleware);

export default app;
