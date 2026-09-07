import React, { createContext, useEffect, useState, useCallback } from 'react'

export const cartOpenContext = createContext();

const CartContext = ({ children }) => {
  const [cart, setCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orderNote, setOrderNote] = useState('');

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, count: (item.count || 1) + 1 } : item
        );
      }
      return [...prevCart, { ...product, count: 1 }];
    });
  }, []);

  const decreaseCount = useCallback((productId) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item._id === productId ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item._id === productId ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  }, []);

  const increaseCount = useCallback((productId) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, count: (item.count || 1) + 1 } : item
      )
    );
  }, []);

  const deleteItem = useCallback((productId) => {
    setCartItems((prevCart) => prevCart.filter((item) => item._id !== productId));
  }, []);

  const clearCart = useCallback((productId) => {
    setCartItems((prevCart) => prevCart.filter((item) => item._id !== productId));
  }, []);

  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.count || 1), 0);

  const subtotal = cartItems.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    return sum + price * (item.count || 1);
  }, 0);

  return (
    <cartOpenContext.Provider
      value={{
        cart, setCart,
        cartItems, setCartItems,
        orderNote, setOrderNote,
        addToCart, removeFromCart, increaseCount, decreaseCount, deleteItem, clearCart,
        totalQuantity, subtotal
      }}
    >
      {children}
    </cartOpenContext.Provider>
  );
};

export default CartContext;
