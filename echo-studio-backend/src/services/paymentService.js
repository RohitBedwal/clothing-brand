// TODO: Integrate Razorpay SDK
// Install: npm install razorpay
// Initialize Razorpay instance with key_id and key_secret from env

// TODO: Add webhook signature verification using crypto.createHmac
// TODO: Store payment records in database using Prisma Payment model

export const paymentService = {
  async createOrder({ amount, currency = 'INR', receipt, metadata = {} }) {
    // TODO: Call razorpay.orders.create({ amount: amount * 100, currency, receipt, notes: metadata })
    // Store order in DB: await prisma.payment.create({ data: { ... } })
    return {
      id: `pay_${Date.now()}`,
      status: 'created',
      amount,
      currency,
      receipt,
    };
  },

  async verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
    // TODO: Verify signature using crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
    //   .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    //   .digest('hex')
    // TODO: Update payment status in DB
    // TODO: Trigger order confirmation on successful payment
    return { verified: true };
  },

  async handleWebhook(event) {
    // TODO: Validate webhook signature
    // TODO: Handle event types: payment.captured, payment.failed, refund.processed
    // TODO: Update payment and order status accordingly
    console.log('Webhook received:', event?.type);
  },
};
