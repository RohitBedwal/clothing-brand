
import React from 'react'
import Home from '../components/Home'
import ScrollToTop from '../components/ScrollToTop'
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails';
import SearchName from '../pages/SearchName';
import CategoryContext from '../context/CategoryContext';
import ProductByCategory from '../pages/ProductByCategory';
import ProductsByCategoryContext from '../context/ProductsByCategoryContext';
import CartContext from '../context/CartContext';
import NewArrivals from '../pages/NewArrivals';
import Collections from '../pages/Collections';
import CollectionProducts from '../pages/CollectionProducts';

const App = () => {

  return (
      <CartContext>
    <ProductsByCategoryContext>

   <CategoryContext>

   <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/new-arrivals' element={<NewArrivals/>}/>
      <Route path='/collections' element={<Collections/>}/>
      <Route path='/collection/:name' element={<CollectionProducts/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/productDetails' element={<ProductDetails/>}/>
      <Route path='/search' element={<SearchName/>}/>
      <Route path='/category/products' element={<ProductByCategory/>}/>

      
    </Routes>
   </BrowserRouter>
   </CategoryContext>
    </ProductsByCategoryContext>
      </CartContext>
    
   
    
  )
}

export default App