import React, { createContext, useEffect, useState, useCallback, useContext, useRef } from 'react'
import cartService from '../services/cartService'
import { authContext } from './AuthContext'

export const cartOpenContext = createContext();

const GUEST_CART_KEY = 'echo_guest_cart';

const loadGuestCart = () => {
  try {
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || [];
  } catch {
    return [];
  }
};

const saveGuestCart = (items) => {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
};

const calcTotals = (items) => {
  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.variant?.price || item.price || 0);
    return sum + price * (item.quantity || item.count || 1);
  }, 0);
  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || item.count || 1), 0);
  return { subtotal: Math.round(subtotal * 100) / 100, totalQuantity };
};

const CartContext = ({ children }) => {
  const { isAuthenticated, currentUser } = useContext(authContext);
  const [cart, setCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orderNote, setOrderNote] = useState('');
  const [loading, setLoading] = useState(true);
  const prevAuthRef = useRef(isAuthenticated);

  // When not authenticated, use guest cart from localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      setCartItems(loadGuestCart());
      setLoading(false);
    }
  }, [isAuthenticated]);

  // When user logs in, merge guest cart into backend cart
  useEffect(() => {
    if (isAuthenticated && !prevAuthRef.current) {
      const guestItems = loadGuestCart();
      localStorage.removeItem(GUEST_CART_KEY);
      if (guestItems.length > 0) {
        const mergeCart = async () => {
          for (const item of guestItems) {
            const variantId = item.variantId || item.variant?.id;
            if (variantId) {
              try {
                await cartService.addToCart(variantId, item.quantity || item.count || 1);
              } catch { /* skip if out of stock */ }
            }
          }
          fetchCart();
        };
        mergeCart();
      } else {
        fetchCart();
      }
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, currentUser]);

  // Fetch backend cart when authenticated
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      const guestItems = loadGuestCart();
      setCartItems(guestItems);
      return;
    }
    try {
      setLoading(true);
      const data = await cartService.getCart();
      setCartItems(data.items || []);
    } catch {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) fetchCart();
  }, [fetchCart]);

  // Recalculate totals from current cartItems
  const { subtotal, totalQuantity } = calcTotals(cartItems);

  const resolveVariantId = (productOrVariantId, quantity = 1) => {
    if (typeof productOrVariantId === 'string') {
      return { variantId: productOrVariantId, quantity };
    }
    const obj = productOrVariantId;
    const variants = obj.variants || [];
    const selectedSize = obj.selectedSize || obj._selectedSize;
    const selectedColor = obj.selectedColor || obj._selectedColor;
    let variant = null;
    if (selectedSize || selectedColor) {
      variant = variants.find(v => {
        if (selectedSize && v.size && v.size !== selectedSize) return false;
        if (selectedColor && v.color && v.color !== selectedColor) return false;
        return true;
      });
    }
    if (!variant && variants.length > 0) variant = variants[0];
    const vid = variant?.id || obj.variantId || obj.id;
    return { variantId: vid, quantity, productInfo: obj, variant };
  };

  const addToCart = useCallback(async (productOrVariantId, quantity = 1) => {
    const { variantId, productInfo, variant } = resolveVariantId(productOrVariantId, quantity);

    if (!isAuthenticated) {
      const guestItems = loadGuestCart();
      const existingIdx = guestItems.findIndex(i => (i.variantId || i.variant?.id) === variantId);
      let updated;
      if (existingIdx >= 0) {
        updated = guestItems.map((item, idx) =>
          idx === existingIdx
            ? { ...item, quantity: (item.quantity || item.count || 1) + quantity, count: (item.quantity || item.count || 1) + quantity }
            : item
        );
      } else {
        const newItem = {
          id: variantId,
          variantId,
          quantity,
          count: quantity,
          ...(variant ? {
            variant: {
              id: variant.id,
              price: variant.price,
              size: variant.size,
              color: variant.color,
              product: productInfo ? {
                name: productInfo.name || productInfo.product_name || 'Product',
                images: productInfo.images || (productInfo.image ? [{ url: productInfo.image }] : []),
              } : variant.product || {},
            },
          } : productInfo ? {
            variant: {
              id: variantId,
              price: productInfo.price || 0,
              size: productInfo.selectedSize || '',
              color: productInfo.selectedColor || '',
              product: {
                name: productInfo.name || productInfo.product_name || 'Product',
                images: productInfo.images || (productInfo.image ? [{ url: productInfo.image }] : []),
              },
            },
          } : {}),
        };
        updated = [...guestItems, newItem];
      }
      saveGuestCart(updated);
      setCartItems(updated);
      return;
    }

    if (!variantId) return;
    const data = await cartService.addToCart(variantId, quantity);
    setCartItems(data.items || []);
  }, [isAuthenticated]);

  const updateQuantity = useCallback(async (itemId, quantity) => {
    if (!isAuthenticated) {
      const guestItems = loadGuestCart();
      let updated;
      if (quantity <= 0) {
        updated = guestItems.filter(i => (i.id || i.variantId) !== itemId);
      } else {
        updated = guestItems.map(i =>
          (i.id || i.variantId) === itemId ? { ...i, quantity, count: quantity } : i
        );
      }
      saveGuestCart(updated);
      setCartItems(updated);
      return;
    }

    const data = await cartService.updateCartItem(itemId, quantity);
    setCartItems(data.items || []);
  }, [isAuthenticated]);

  const increaseCount = useCallback(async (itemId) => {
    const item = cartItems.find(i => (i.id || i.variantId) === itemId);
    if (!item) return;
    const newQty = (item.quantity || item.count || 1) + 1;
    await updateQuantity(itemId, newQty);
  }, [cartItems, updateQuantity]);

  const removeFromCart = useCallback(async (itemId) => {
    if (!isAuthenticated) {
      const guestItems = loadGuestCart();
      const updated = guestItems.filter(i => (i.id || i.variantId) !== itemId);
      saveGuestCart(updated);
      setCartItems(updated);
      return;
    }

    const data = await cartService.removeCartItem(itemId);
    setCartItems(data.items || []);
  }, [isAuthenticated]);

  const decreaseCount = useCallback(async (itemId) => {
    const item = cartItems.find(i => (i.id || i.variantId) === itemId);
    if (!item) return;
    const currentQty = item.quantity || item.count || 1;
    if (currentQty <= 1) {
      await removeFromCart(itemId);
      return;
    }
    await updateQuantity(itemId, currentQty - 1);
  }, [cartItems, updateQuantity, removeFromCart]);

  const deleteItem = useCallback(async (itemId) => {
    await removeFromCart(itemId);
  }, [removeFromCart]);

  const clearCart = useCallback(async () => {
    if (!isAuthenticated) {
      saveGuestCart([]);
      setCartItems([]);
      return;
    }
    try {
      await cartService.clearCart();
    } finally {
      setCartItems([]);
    }
  }, [isAuthenticated]);

  return (
    <cartOpenContext.Provider
      value={{
        cart, setCart,
        cartItems, setCartItems,
        cartLoading: loading,
        orderNote, setOrderNote,
        addToCart, removeFromCart, increaseCount, decreaseCount, deleteItem, clearCart,
        updateQuantity, fetchCart,
        totalQuantity, subtotal
      }}
    >
      {children}
    </cartOpenContext.Provider>
  );
};

export default CartContext;
