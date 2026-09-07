import prisma from '../config/database.js';

const cartInclude = {
  items: {
    include: {
      variant: {
        include: {
          product: {
            include: { images: true },
          },
        },
      },
    },
  },
};

export async function getCartWithTotals(userId) {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: cartInclude,
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: cartInclude,
    });
  }

  const subtotal = cart.items.reduce((sum, item) => {
    return sum + Number(item.variant.price) * item.quantity;
  }, 0);

  const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    ...cart,
    subtotal: Math.round(subtotal * 100) / 100,
    totalQuantity,
  };
}
