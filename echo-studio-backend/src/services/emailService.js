// TODO: Install and configure email provider
// Option 1 - Nodemailer: npm install nodemailer
//   - Create SMTP transport with host, port, user, pass from env
// Option 2 - SendGrid: npm install @sendgrid/mail
//   - Set SG_API_KEY in env, initialize sgMail
// TODO: Create email templates (welcome, password-reset, order-confirmation, order-status)
// TODO: Use a template engine like Handlebars or EJS for dynamic content

export const emailService = {
  async sendWelcomeEmail(user) {
    // TODO: Send welcome email with user.name and verification link
    console.log(`[Email] Welcome email sent to ${user.email}`);
    return { sent: true };
  },

  async sendPasswordResetEmail(user, resetUrl) {
    // TODO: Send email with resetUrl, expires in 1 hour
    console.log(`[Email] Password reset email sent to ${user.email}`);
    return { sent: true };
  },

  async sendOrderConfirmation(order) {
    // TODO: Send order confirmation with order items, total, shipping address
    console.log(`[Email] Order confirmation sent for order ${order.orderNumber}`);
    return { sent: true };
  },

  async sendOrderStatusUpdate(order, status) {
    // TODO: Send status update email with new status and tracking info if available
    console.log(`[Email] Status update "${status}" sent for order ${order.orderNumber}`);
    return { sent: true };
  },
};
