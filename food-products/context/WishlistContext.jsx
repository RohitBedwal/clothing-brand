import React, { createContext, useState, useEffect, useCallback, useContext } from 'react'
import { cartOpenContext } from './CartContext'

export const wishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('echo_wishlist')) || [];
    setWishlistItems(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('echo_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      if (prev.find(item => item._id === product._id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((prev) => prev.filter(item => item._id !== productId));
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) return prev.filter(item => item._id !== product._id);
      return [...prev, product];
    });
  }, []);

  const isWishlisted = useCallback((productId) => {
    return wishlistItems.some(item => item._id === productId);
  }, [wishlistItems]);

  const wishlistCount = wishlistItems.length;

  return (
    <wishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
};

export default WishlistProvider;
