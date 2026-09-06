import React from 'react'
import ProductCard from '../components/ProductCard';
import NavBar2 from '../components/NavBar2';
import Cart from './Cart';

const ProductDetails = () => {
  return (
    <div className='bg-white min-h-screen'>
      <NavBar2/>
      <Cart />
      <ProductCard/>
    </div>
  )
}

export default ProductDetails
