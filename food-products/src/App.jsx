
import React from 'react'
import Home from '../components/Home'
import ScrollToTop from '../components/ScrollToTop'
import QuickView from '../components/QuickView'
import Footer from '../components/Footer'
import ProtectedRoute from '../components/ProtectedRoute'
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from '../pages/Cart';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import ProductDetails from '../pages/ProductDetails';
import SearchName from '../pages/SearchName';
import CategoryContext from '../context/CategoryContext';
import ProductByCategory from '../pages/ProductByCategory';
import CategoriesPage from '../pages/CategoriesPage';
import CartContext from '../context/CartContext';
import QuickViewProvider from '../context/QuickViewContext';
import AuthProvider from '../context/AuthContext';
import WishlistProvider from '../context/WishlistContext';
import NewArrivals from '../pages/NewArrivals';
import ShopPage from '../pages/ShopPage';
import SalePage from '../pages/SalePage';
import ReadyToShipPage from '../pages/ReadyToShipPage';
import ConceptSareePage from '../pages/ConceptSareePage';
import WishlistPage from '../pages/WishlistPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import AccountDashboard from '../pages/account/AccountDashboard';
import AccountOrders from '../pages/account/AccountOrders';
import AccountOrderDetails from '../pages/account/AccountOrderDetails';
import AccountWishlist from '../pages/account/AccountWishlist';
import AccountProfile from '../pages/account/AccountProfile';
import AccountAddresses from '../pages/account/AccountAddresses';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import FaqPage from '../pages/FaqPage';
import ShippingPage from '../pages/ShippingPage';
import ReturnsPage from '../pages/ReturnsPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsPage from '../pages/TermsPage';
import RefundPolicyPage from '../pages/RefundPolicyPage';
import SizeGuidePage from '../pages/SizeGuidePage';

const App = () => {

  return (
      <AuthProvider>
   <CartContext>
    <WishlistProvider>
   <QuickViewProvider>

   <CategoryContext>

   <BrowserRouter>
    <ScrollToTop />
    <Cart />
    <QuickView />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/shop' element={<ShopPage/>}/>
      <Route path='/new-arrivals' element={<NewArrivals/>}/>
      <Route path='/sale' element={<SalePage/>}/>
      <Route path='/ready-to-ship' element={<ReadyToShipPage/>}/>
      <Route path='/concept-saree-dresses' element={<ConceptSareePage/>}/>
      <Route path='/categories' element={<CategoriesPage/>}/>
      <Route path='/category/:slug' element={<ProductByCategory/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/search' element={<SearchName/>}/>
      <Route path='/wishlist' element={<WishlistPage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/checkout' element={<CheckoutPage/>}/>
      <Route path='/order-success/:orderId' element={<OrderSuccessPage/>}/>

      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
      <Route path='/reset-password/:token' element={<ResetPasswordPage/>}/>

      <Route path='/account' element={<ProtectedRoute><AccountDashboard/></ProtectedRoute>}/>
      <Route path='/account/orders' element={<ProtectedRoute><AccountOrders/></ProtectedRoute>}/>
      <Route path='/account/orders/:orderId' element={<ProtectedRoute><AccountOrderDetails/></ProtectedRoute>}/>
      <Route path='/account/wishlist' element={<ProtectedRoute><AccountWishlist/></ProtectedRoute>}/>
      <Route path='/account/profile' element={<ProtectedRoute><AccountProfile/></ProtectedRoute>}/>
      <Route path='/account/addresses' element={<ProtectedRoute><AccountAddresses/></ProtectedRoute>}/>

      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/contact' element={<ContactPage/>}/>
      <Route path='/faq' element={<FaqPage/>}/>
      <Route path='/shipping' element={<ShippingPage/>}/>
      <Route path='/returns' element={<ReturnsPage/>}/>
      <Route path='/privacy-policy' element={<PrivacyPolicyPage/>}/>
      <Route path='/terms' element={<TermsPage/>}/>
      <Route path='/refund-policy' element={<RefundPolicyPage/>}/>
      <Route path='/size-guide' element={<SizeGuidePage/>}/>
    </Routes>
    <Footer />
   </BrowserRouter>
   </CategoryContext>
   </QuickViewProvider>
   </WishlistProvider>
    </CartContext>
    </AuthProvider>
  )
}

export default App
