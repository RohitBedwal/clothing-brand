import React, { createContext, useState, useCallback } from 'react'

export const quickViewContext = createContext();

const QuickViewProvider = ({ children }) => {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const openQuickView = useCallback((product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewOpen(false);
    setQuickViewProduct(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <quickViewContext.Provider value={{ quickViewOpen, quickViewProduct, openQuickView, closeQuickView }}>
      {children}
    </quickViewContext.Provider>
  )
}

export default QuickViewProvider
