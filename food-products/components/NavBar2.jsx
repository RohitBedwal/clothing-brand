import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useContext, useRef, useState, useCallback } from 'react'
import { ContextApi } from '../context/InputContext';
import { Link, useNavigate } from 'react-router-dom';
import { sideBarContext } from '../context/CategoryContext';
import { cartOpenContext } from '../context/CartContext';
import { authContext } from '../context/AuthContext';
import { wishlistContext } from '../context/WishlistContext';

const shopByCategories = [
  { name: "SHOP ALL", link: "/shop", sale: false },
  { name: "NEW ARRIVALS", link: "/new-arrivals", sale: false },
  { name: "DRESSES", link: "/collection/women", sale: false },
  { name: "SAREES", link: "/collection/women", sale: false },
  { name: "CO-ORD SETS", link: "/collection/women", sale: false },
  { name: "TOPS", link: "/collection/women", sale: false },
  { name: "BOTTOMS", link: "/collection/women", sale: false },
  { name: "ACCESSORIES", link: "/collection/accessories", sale: false },
  { name: "READY TO SHIP", link: "/ready-to-ship", sale: false },
  { name: "SALE", link: "/sale", sale: true },
];

const collectionCategories = [
  { name: "ALL COLLECTIONS", link: "/collections" },
  { name: "NEW COLLECTION", link: "/new-arrivals" },
  { name: "SIGNATURE COLLECTION", link: "/collections" },
  { name: "EVENING EDIT", link: "/collections" },
  { name: "OCCASION WEAR", link: "/collections" },
  { name: "FESTIVE EDIT", link: "/collections" },
  { name: "SALE", link: "/sale", sale: true },
];

const NavBar2 = ({ setSearchName }) => {
  const { input, setInput } = useContext(ContextApi)
  const { setOpen } = useContext(sideBarContext)
  const { setCart, totalQuantity } = useContext(cartOpenContext)
  const { isAuthenticated } = useContext(authContext)
  const { wishlistCount } = useContext(wishlistContext)
  const blackbox = useRef(null);
  const navigate = useNavigate();

  const [searchBar, setSearchBar] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimeoutRef = useRef(null);
  const menuRef = useRef(null);

  function submitHandler(e) {
    e.preventDefault();
    navigate('/search');
    setSearchName(true)
    setSearchBar(false);
  }

  const CloseRef = useRef(null);

  useGSAP(() => {
    if (searchBar) {
      gsap.to(CloseRef.current, {
        transform: "translateY(100%)",
        duration: .3,
        opacity: 100
      })
      gsap.to(blackbox.current, {
        y: "0%",
        duration: .001,
      })
    } else {
      gsap.to(CloseRef.current, {
        transform: "translateY(0%)",
        duration: .3,
        opacity: 0
      })
      gsap.to(blackbox.current, {
        y: "-100%",
        duration: .001,
      })
    }
  }, [searchBar])

  const handleMouseEnter = useCallback((menu) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenMenu(menu);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 100);
  }, []);

  const handleDropdownMouseEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleDropdownMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150);
  }, []);

  const handleMenuClick = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div>
      <div ref={CloseRef} className='flex justify-between h-[80px] border-b border-gray-100 fixed w-full bg-white z-30 items-center px-[30px] max-md:px-[16px]'>
        <div className='font-[amma4] text-gray-900 text-[22px] tracking-[8px] uppercase'>Echo Studio</div>

        {/* Desktop Nav */}
        <div className='hidden md:flex items-center gap-x-[28px] text-[12px] font-[amma3] tracking-[3px] uppercase text-gray-700'>
          <div
            className='relative'
            onMouseEnter={() => handleMouseEnter('shopby')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className='flex items-center gap-[4px] hover:text-black transition-colors cursor-pointer py-[30px]'
              onClick={() => handleMenuClick('shopby')}
            >
              SHOP BY
              <svg
                className={`w-[10px] h-[10px] transition-transform duration-300 ${openMenu === 'shopby' ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div
            className='relative'
            onMouseEnter={() => handleMouseEnter('collection')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className='flex items-center gap-[4px] hover:text-black transition-colors cursor-pointer py-[30px]'
              onClick={() => handleMenuClick('collection')}
            >
              COLLECTION
              <svg
                className={`w-[10px] h-[10px] transition-transform duration-300 ${openMenu === 'collection' ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <Link to="/new-arrivals" className='hover:text-black transition-colors cursor-pointer py-[30px]'>NEW ARRIVAL</Link>
          <Link to="/sale" className='text-red-500 hover:text-red-600 transition-colors cursor-pointer py-[30px]'>SALE</Link>
          <Link to="/ready-to-ship" className='hover:text-black transition-colors cursor-pointer py-[30px]'>READY TO SHIP</Link>
        </div>

        <div className='flex gap-x-[20px] items-center'>
          <i onClick={() => { !searchBar ? setSearchBar(true) : setSearchBar(false) }} className="text-[18px] cursor-pointer ri-search-line text-gray-800 hover:text-black transition-colors"></i>
          <Link to={isAuthenticated ? '/account' : '/login'}>
            <i className="text-[18px] ri-user-3-line cursor-pointer text-gray-800 hover:text-black transition-colors"></i>
          </Link>
          <div className='relative'>
            <i onClick={() => { setCart(true) }} className="text-[18px] ri-shopping-cart-line cursor-pointer text-gray-800 hover:text-black transition-colors"></i>
            {totalQuantity > 0 && (
              <span className='absolute -top-[6px] -right-[8px] w-[18px] h-[18px] bg-gray-900 text-white text-[9px] font-[amma3] rounded-full flex items-center justify-center'>
                {totalQuantity}
              </span>
            )}
          </div>
          <Link to='/wishlist' className='relative'>
            <i className="text-[18px] ri-heart-line cursor-pointer text-gray-800 hover:text-black transition-colors"></i>
            {wishlistCount > 0 && (
              <span className='absolute -top-[6px] -right-[8px] w-[18px] h-[18px] bg-gray-900 text-white text-[9px] font-[amma3] rounded-full flex items-center justify-center'>
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* SHOP BY Mega Menu */}
      <div
        ref={menuRef}
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
        className={`hidden md:block fixed top-[80px] left-0 w-full bg-white border-b border-gray-200 z-20 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          openMenu === 'shopby'
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className='max-w-[1400px] mx-auto px-[60px] py-[40px] flex'>
          {/* Left - Subcategories */}
          <div className='w-[300px] flex-shrink-0'>
            <p className='font-[amma3] text-[10px] text-gray-400 uppercase tracking-[3px] mb-[20px]'>Categories</p>
            <div className='flex flex-col gap-[0px]'>
              {shopByCategories.map((cat, idx) => (
                <Link
                  key={idx}
                  to={cat.link}
                  className={`font-[amma3] text-[13px] tracking-[2px] uppercase py-[10px] border-b border-gray-100 transition-all duration-200 ${
                    cat.sale
                      ? 'text-red-500 hover:text-red-600 hover:pl-[8px]'
                      : 'text-gray-600 hover:text-black hover:pl-[8px]'
                  }`}
                  onClick={() => setOpenMenu(null)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right - Promo Image */}
          <div className='flex-1 ml-[40px] relative overflow-hidden group cursor-pointer' onClick={() => setOpenMenu(null)}>
            <Link to="/new-arrivals">
              <div className='relative h-[400px] overflow-hidden'>
                <img
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1000&h=600&fit=crop"
                  alt="Featured"
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300'></div>
                <div className='absolute bottom-[30px] left-[30px]'>
                  <p className='font-[amma3] text-white/70 text-[11px] tracking-[4px] uppercase mb-[6px]'>Dress</p>
                  <h3 className='font-[amma4] text-white text-[24px] tracking-[3px] uppercase mb-[12px]'>ECHO LUNA DRESS</h3>
                  <span className='font-[amma3] text-white text-[11px] tracking-[3px] uppercase border-b border-white pb-[2px] group-hover:border-white/60 transition-colors'>Shop Now</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* COLLECTION Mega Menu */}
      <div
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
        className={`hidden md:block fixed top-[80px] left-0 w-full bg-white border-b border-gray-200 z-20 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          openMenu === 'collection'
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className='max-w-[1400px] mx-auto px-[60px] py-[40px] flex'>
          {/* Left - Subcategories */}
          <div className='w-[300px] flex-shrink-0'>
            <p className='font-[amma3] text-[10px] text-gray-400 uppercase tracking-[3px] mb-[20px]'>Collections</p>
            <div className='flex flex-col gap-[0px]'>
              {collectionCategories.map((cat, idx) => (
                <Link
                  key={idx}
                  to={cat.link}
                  className={`font-[amma3] text-[13px] tracking-[2px] uppercase py-[10px] border-b border-gray-100 transition-all duration-200 ${
                    cat.sale
                      ? 'text-red-500 hover:text-red-600 hover:pl-[8px]'
                      : 'text-gray-600 hover:text-black hover:pl-[8px]'
                  }`}
                  onClick={() => setOpenMenu(null)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right - Promo Image */}
          <div className='flex-1 ml-[40px] relative overflow-hidden group cursor-pointer' onClick={() => setOpenMenu(null)}>
            <Link to="/collections">
              <div className='relative h-[400px] overflow-hidden'>
                <img
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1000&h=600&fit=crop"
                  alt="Collection Featured"
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300'></div>
                <div className='absolute bottom-[30px] left-[30px]'>
                  <p className='font-[amma3] text-white/70 text-[11px] tracking-[4px] uppercase mb-[6px]'>Collection</p>
                  <h3 className='font-[amma4] text-white text-[24px] tracking-[3px] uppercase mb-[12px]'>SIGNATURE COLLECTION</h3>
                  <span className='font-[amma3] text-white text-[11px] tracking-[3px] uppercase border-b border-white pb-[2px] group-hover:border-white/60 transition-colors'>Explore</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div ref={CloseRef} className='flex items-center opacity-0 gap-x-[5px] h-[70px] fixed w-full top-0 translate-y-full z-10 bg-white px-[40px] max-md:px-[20px]'>
        <i className="text-[18px] ri-search-line text-gray-400"></i>
        <form className='w-[100%] text-center px-[5px]' action="" onSubmit={(e) => { submitHandler(e) }}>
          <input onChange={(e) => setInput(e.target.value)} value={input} className='focus:outline-none w-[100%] h-[40px] uppercase font-[amma3] text-[14px] tracking-[2px] placeholder-gray-400' type="text" placeholder='Search collections...' />
        </form>
        <button onClick={() => { setSearchBar(false) }}><i className="text-[17px] cursor-pointer ri-close-large-fill text-gray-400"></i></button>
      </div>

      {/* Mobile Menu */}
      <div className='md:hidden fixed top-[80px] left-0 w-full bg-white border-b border-gray-200 z-20 max-h-[70vh] overflow-y-auto'>
        {openMenu === 'shopby-mobile' && (
          <div className='px-[16px] py-[20px]'>
            <p className='font-[amma3] text-[10px] text-gray-400 uppercase tracking-[3px] mb-[12px]'>Categories</p>
            {shopByCategories.map((cat, idx) => (
              <Link
                key={idx}
                to={cat.link}
                className={`block font-[amma3] text-[13px] tracking-[2px] uppercase py-[12px] border-b border-gray-100 ${
                  cat.sale ? 'text-red-500' : 'text-gray-600'
                }`}
                onClick={() => setOpenMenu(null)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}
        {openMenu === 'collection-mobile' && (
          <div className='px-[16px] py-[20px]'>
            <p className='font-[amma3] text-[10px] text-gray-400 uppercase tracking-[3px] mb-[12px]'>Collections</p>
            {collectionCategories.map((cat, idx) => (
              <Link
                key={idx}
                to={cat.link}
                className={`block font-[amma3] text-[13px] tracking-[2px] uppercase py-[12px] border-b border-gray-100 ${
                  cat.sale ? 'text-red-500' : 'text-gray-600'
                }`}
                onClick={() => setOpenMenu(null)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar2
