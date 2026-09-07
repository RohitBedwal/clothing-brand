import React, { useContext, useRef, useState, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { sideBarContext } from '../context/CategoryContext';
import { cartOpenContext } from '../context/CartContext';
import { authContext } from '../context/AuthContext';
import { wishlistContext } from '../context/WishlistContext';
import categoryService from '../services/categoryService';
import productService from '../services/productService';

const NavBar2 = () => {
  const { setOpen } = useContext(sideBarContext)
  const { setCart, totalQuantity } = useContext(cartOpenContext)
  const { isAuthenticated } = useContext(authContext)
  const { wishlistCount } = useContext(wishlistContext)
  const navigate = useNavigate();

  const [searchBar, setSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const closeTimeoutRef = useRef(null);
  const menuRef = useRef(null);
  const searchInputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(Array.isArray(data) ? data : data.categories || []);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchBar && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (searchBar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [searchBar]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!searchInput.trim()) {
      setSuggestions([]);
      return;
    }
    setSuggestionLoading(true);
    debounceRef.current = setTimeout(() => {
      productService.getProducts({ search: searchInput.trim(), limit: 6 })
        .then(res => setSuggestions(res.products || []))
        .catch(() => setSuggestions([]))
        .finally(() => setSuggestionLoading(false));
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [searchInput]);

  function submitHandler(e) {
    e.preventDefault();
    closeSearch();
  }

  function handleSuggestionClick(product) {
    navigate(`/product/${product.id}`);
    setSearchBar(false);
    setSearchInput('');
    setSuggestions([]);
  }

  function openSearch() {
    setSearchBar(true);
  }

  function closeSearch() {
    setSearchBar(false);
    setSearchInput('');
    setSuggestions([]);
  }

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

  const getImage = (p) => p.images?.[0]?.url || '/placeholder.png';
  const getPrice = (p) => Number(p.price) || 0;

  return (
    <div>
      {/* Navbar */}
      <div className='flex justify-between h-[80px] border-b border-gray-100 fixed w-full bg-white z-30 items-center px-[30px] max-md:px-[16px]'>
        <Link to='/' className='font-[amma4] text-gray-900 text-[22px] tracking-[8px] uppercase'>Echo Studio</Link>

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

          <Link to="/new-arrivals" className='hover:text-black transition-colors cursor-pointer py-[30px]'>NEW ARRIVAL</Link>
          <Link to="/sale" className='text-red-500 hover:text-red-600 transition-colors cursor-pointer py-[30px]'>SALE</Link>
          <Link to="/ready-to-ship" className='hover:text-black transition-colors cursor-pointer py-[30px]'>READY TO SHIP</Link>
        </div>

        <div className='flex gap-x-[20px] items-center'>
          <i onClick={openSearch} className="text-[18px] cursor-pointer ri-search-line text-gray-800 hover:text-black transition-colors"></i>
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
        <div className='max-w-[1400px] mx-auto px-[60px] py-[40px] flex gap-[40px]'>
          <div className='flex gap-[40px]'>
            {categories.map((cat) => (
              <div key={cat.id} className='min-w-[160px]'>
                <Link
                  to={`/category/${cat.slug}`}
                  className='font-[amma3] text-[11px] text-gray-900 uppercase tracking-[2px] mb-[12px] block hover:text-black font-bold'
                  onClick={() => setOpenMenu(null)}
                >
                  {cat.name}
                </Link>
                <div className='flex flex-col gap-[0px]'>
                  {cat.children?.map((sub) => (
                    <Link
                      key={sub.id}
                      to={`/category/${sub.slug}`}
                      className='font-[amma3] text-[12px] tracking-[1px] uppercase py-[8px] text-gray-500 hover:text-black hover:pl-[4px] transition-all duration-200'
                      onClick={() => setOpenMenu(null)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className='flex-1 ml-auto relative overflow-hidden group cursor-pointer' onClick={() => setOpenMenu(null)}>
            <Link to="/new-arrivals">
              <div className='relative h-[400px] overflow-hidden'>
                <img
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1000&h=600&fit=crop"
                  alt="Featured"
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300'></div>
                <div className='absolute bottom-[30px] left-[30px]'>
                  <p className='font-[amma3] text-white/70 text-[11px] tracking-[4px] uppercase mb-[6px]'>New In</p>
                  <h3 className='font-[amma4] text-white text-[24px] tracking-[3px] uppercase mb-[12px]'>ECHO LUNA DRESS</h3>
                  <span className='font-[amma3] text-white text-[11px] tracking-[3px] uppercase border-b border-white pb-[2px] group-hover:border-white/60 transition-colors'>Shop Now</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {searchBar && (
        <div className='fixed inset-0 z-40'>
          <div className='absolute inset-0 bg-black/40' onClick={closeSearch}></div>
          <div className='absolute top-0 left-0 right-0 bg-white px-[40px] max-md:px-[20px] pt-[100px] pb-[40px] shadow-lg max-h-[80vh] overflow-y-auto animate-slideDown'>
            <div className='max-w-[600px] mx-auto'>
              <form onSubmit={submitHandler} className='flex items-center gap-[12px] border-b-2 border-gray-900 pb-[12px]'>
                <i className="text-[20px] ri-search-line text-gray-900"></i>
                <input
                  ref={searchInputRef}
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                  className='flex-1 focus:outline-none h-[40px] font-[amma3] text-[16px] tracking-[1px] placeholder-gray-400 bg-transparent'
                  type="text"
                  placeholder='Search for products...'
                />
                <button type='button' onClick={closeSearch}>
                  <i className="text-[20px] cursor-pointer ri-close-line text-gray-400 hover:text-gray-900 transition-colors"></i>
                </button>
              </form>

              {searchInput.trim() ? (
                <div className='mt-[16px]'>
                  {suggestionLoading ? (
                    <div className='flex items-center gap-[8px] py-[12px]'>
                      <div className='w-[16px] h-[16px] border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin'></div>
                      <span className='font-[amma3] text-[12px] text-gray-400'>Searching...</span>
                    </div>
                  ) : suggestions.length > 0 ? (
                    <div>
                      <p className='font-[amma3] text-[10px] text-gray-400 uppercase tracking-[2px] mb-[12px]'>Suggestions</p>
                      <div className='space-y-[2px]'>
                        {suggestions.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleSuggestionClick(product)}
                            className='flex items-center gap-[12px] p-[10px] cursor-pointer hover:bg-gray-50 transition-colors rounded-[4px]'
                          >
                            <div className='w-[48px] h-[60px] bg-gray-100 flex-shrink-0 overflow-hidden'>
                              <img src={getImage(product)} alt={product.name} className='w-full h-full object-cover' />
                            </div>
                            <div className='flex-1 min-w-0'>
                              <p className='font-[amma4] text-[12px] text-gray-900 uppercase tracking-[1px] truncate'>{product.name}</p>
                              <p className='font-[amma3] text-[11px] text-gray-400 mt-[2px]'>{product.category?.name || ''}</p>
                            </div>
                            <span className='font-[amma3] text-[12px] text-gray-900 flex-shrink-0'>₹{getPrice(product).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className='font-[amma3] text-[12px] text-gray-400 py-[12px]'>No products found</p>
                  )}
                </div>
              ) : (
                <div className='mt-[24px]'>
                  <p className='font-[amma3] text-[10px] text-gray-400 uppercase tracking-[2px] mb-[12px]'>Quick Links</p>
                  <div className='flex flex-wrap gap-[8px]'>
                    {['Dresses', 'T-Shirts', 'Sarees', 'Jackets', 'Accessories'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchInput(tag)}
                        className='px-[14px] py-[8px] border border-gray-200 font-[amma3] text-[11px] text-gray-600 uppercase tracking-[1px] hover:border-gray-900 hover:text-gray-900 transition-colors'
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div className='md:hidden fixed top-[80px] left-0 w-full bg-white border-b border-gray-200 z-20 max-h-[70vh] overflow-y-auto'>
        {openMenu === 'shopby-mobile' && (
          <div className='px-[16px] py-[20px]'>
            {categories.map((cat) => (
              <div key={cat.id} className='mb-[12px]'>
                <Link
                  to={`/category/${cat.slug}`}
                  className='font-[amma3] text-[12px] text-gray-900 uppercase tracking-[2px] mb-[6px] block font-bold'
                  onClick={() => setOpenMenu(null)}
                >
                  {cat.name}
                </Link>
                {cat.children?.map((sub) => (
                  <Link
                    key={sub.id}
                    to={`/category/${sub.slug}`}
                    className='block font-[amma3] text-[11px] tracking-[1px] uppercase py-[8px] border-b border-gray-100 text-gray-500'
                    onClick={() => setOpenMenu(null)}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar2
