import prisma from '../config/database.js';
import { getCartWithTotals } from '../services/cartService.js';

export const getCart = async (req, res, next) => {
  try {
    const cart = await getCartWithTotals(req.user.id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { variantId, quantity = 1 } = req.body;

    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { product: true },
    });

    if (!variant) {
      return res.status(404).json({ success: false, message: 'Product variant not found' });
    }

    if (variant.stock < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    let cart = await prisma.cart.findUnique({
      where: { userId: req.user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: req.user.id },
      });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        variantId,
      },
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > variant.stock) {
        return res.status(400).json({ success: false, message: 'Insufficient stock for requested quantity' });
      }
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          variantId,
          quantity,
        },
      });
    }

    const updatedCart = await getCartWithTotals(req.user.id);
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
      include: {
        cart: true,
        variant: true,
      },
    });

    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    if (cartItem.cart.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (quantity > cartItem.variant.stock) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id } });
    } else {
      await prisma.cartItem.update({
        where: { id },
        data: { quantity },
      });
    }

    const cart = await getCartWithTotals(req.user.id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const removeCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
      include: { cart: true },
    });

    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    if (cartItem.cart.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await prisma.cartItem.delete({ where: { id } });

    const cart = await getCartWithTotals(req.user.id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: req.user.id },
    });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    res.json({ ...cart, items: [], subtotal: 0, totalQuantity: 0 });
  } catch (error) {
    next(error);
  }
};
