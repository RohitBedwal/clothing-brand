import prisma from '../config/database.js';
import { paymentService } from '../services/paymentService.js';

export async function createPayment(req, res, next) {
  try {
    const { orderId, method } = req.body;

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const razorpayOrder = await paymentService.createOrder({
      amount: Number(order.total),
      receipt: order.orderNumber,
      metadata: { orderId: order.id },
    });

    const payment = await prisma.payment.create({
      data: {
        orderId,
        method,
        provider: 'razorpay',
        providerPaymentId: razorpayOrder.id,
        amount: order.total,
        status: 'PENDING',
        metadata: razorpayOrder,
      },
    });

    res.status(201).json({ payment, razorpayOrder });
  } catch (error) {
    next(error);
  }
}

export async function verifyPayment(req, res, next) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const result = await paymentService.verifyPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (result.verified) {
      const payment = await prisma.payment.findFirst({
        where: { providerPaymentId: razorpay_order_id },
      });

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: 'PAID', providerPaymentId: razorpay_payment_id },
        });

        await prisma.order.update({
          where: { id: payment.orderId },
          data: { status: 'CONFIRMED' },
        });
      }
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function handlePaymentWebhook(req, res, next) {
  try {
    const event = req.body;

    await paymentService.handleWebhook(event);

    res.json({ received: true });
  } catch (error) {
    next(error);
  }
}
