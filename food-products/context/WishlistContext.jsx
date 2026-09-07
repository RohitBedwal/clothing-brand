import React, { createContext, useState, useEffect, useCallback, useContext } from 'react'
import wishlistService from '../services/wishlistService'
import { authContext } from './AuthContext'

export const wishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useContext(authContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlistItems([]);
      return;
    }
    try {
      setLoading(true);
      const data = await wishlistService.getWishlist();
      const items = (data.items || []).map((item) => ({
        ...item.product,
        wishlistItemId: item.id,
      }));
      setWishlistItems(items);
    } catch {
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = useCallback(async (productId) => {
    await wishlistService.addToWishlist(productId);
    await fetchWishlist();
  }, [fetchWishlist]);

  const removeFromWishlist = useCallback(async (productId) => {
    await wishlistService.removeFromWishlist(productId);
    await fetchWishlist();
  }, [fetchWishlist]);

  const toggleWishlist = useCallback(async (product) => {
    const exists = wishlistItems.find(item => item.id === product.id);
    if (exists) {
      await wishlistService.removeFromWishlist(product.id);
    } else {
      await wishlistService.addToWishlist(product.id);
    }
    await fetchWishlist();
  }, [wishlistItems, fetchWishlist]);

  const isWishlisted = useCallback((productId) => {
    return wishlistItems.some(item => item.id === productId);
  }, [wishlistItems]);

  const wishlistCount = wishlistItems.length;

  return (
    <wishlistContext.Provider
      value={{
        wishlistItems,
        wishlistLoading: loading,
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
