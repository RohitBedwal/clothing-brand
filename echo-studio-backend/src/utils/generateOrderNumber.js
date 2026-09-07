import crypto from 'crypto';

export const generateOrderNumber = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const datePart = `${year}${month}${day}`;

  const randomPart = crypto.randomBytes(2).toString('hex').toUpperCase();

  return `ECH-${datePart}-${randomPart}`;
};
