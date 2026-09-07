export const calculateOrderTotal = ({
  items = [],
  shippingCost = 0,
  discount = 0,
  taxRate = 0,
}) => {
  const subtotal = items.reduce((sum, item) => {
    const itemTotal = item.unitPrice * item.quantity;
    const itemDiscount = (item.discount || 0) / 100;
    const discountedTotal = itemTotal * (1 - itemDiscount);
    return sum + discountedTotal;
  }, 0);

  const discountAmount = discount;
  const afterDiscount = Math.max(0, subtotal - discountAmount);
  const taxAmount = afterDiscount * (taxRate / 100);
  const total = afterDiscount + taxAmount + shippingCost;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    shippingCost: Math.round(shippingCost * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
};
