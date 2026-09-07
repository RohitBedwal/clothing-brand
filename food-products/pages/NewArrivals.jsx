import React, { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { cartOpenContext } from '../context/CartContext'
import { quickViewContext } from '../context/QuickViewContext'
import NavBar2 from '../components/NavBar2'
import Cart from './Cart'
import { formatPrice } from '../src/utils/formatPrice'
import productService from '../services/productService'

const NewArrivals = () => {
  const { setCart, addToCart } = useContext(cartOpenContext)
  const { openQuickView } = useContext(quickViewContext)
  const [hoveredId, setHoveredId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts({ newArrival: 'true', limit: 12 });
        setProducts(data.products || []);
      } catch {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const scrollAmount = 300;

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const getImage = (p) => p.images?.[0]?.url || '/placeholder.png';
  const getPrice = (p) => Number(p.price) || 0;
  const getComparePrice = (p) => p.compareAtPrice ? Number(p.compareAtPrice) : null;

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />
      <Cart />

      <div className='pt-[120px] pb-[40px]'>

        {/* Page Title */}
        <div className='text-center mb-[30px]'>
          <h1 className='font-[amma4] text-gray-900 text-[28px] md:text-[32px] tracking-[6px] uppercase'>
            New Arrivals
          </h1>
          <div className='w-[50px] h-[1px] bg-gray-300 mx-auto mt-[16px]'></div>
        </div>

        {/* Smooth Slider */}
        <div className='relative'>
          <div
            ref={sliderRef}
            className='flex gap-[16px] overflow-x-auto scroll-smooth snap-x snap-mandatory px-[30px] max-md:px-[16px] pb-[10px]'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            {products.map((product) => {
              const price = getPrice(product);
              const comparePrice = getComparePrice(product);
              const hasDiscount = comparePrice && comparePrice > price;

              return (
                <div
                  key={product.id}
                  className='group cursor-pointer flex-shrink-0 w-[260px] md:w-[280px] snap-start'
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className='relative overflow-hidden bg-gray-50 aspect-[3/4] mb-[12px]'>
                    <img
                      src={getImage(product)}
                      alt={product.name}
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                      draggable={false}
                    />

                    <div className='absolute top-[10px] left-[10px] px-[8px] py-[3px] bg-black text-white text-[9px] font-[amma3] tracking-[2px] uppercase'>
                      New
                    </div>

                    {/* Hover Actions */}
                    <div className={`absolute bottom-0 left-0 right-0 p-[10px] flex gap-[6px] transition-all duration-300 ${
                      hoveredId === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openQuickView(product);
                        }}
                        className='flex-1 py-[8px] bg-white text-black font-[amma3] text-[9px] tracking-[2px] uppercase hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-[4px]'
                      >
                        <i className="ri-shopping-bag-line"></i>
                        Add to Bag
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openQuickView(product);
                        }}
                        className='w-[36px] h-[36px] bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors'
                      >
                        <i className="ri-eye-line text-[14px]"></i>
                      </button>
                    </div>
                  </div>

                  <div className='text-center'>
                    <h3 className='font-[amma4] text-[11px] md:text-[12px] text-gray-900 uppercase tracking-[1px] mb-[4px] truncate px-[4px]'>
                      {product.name}
                    </h3>
                    <div className='flex items-center justify-center gap-[6px]'>
                      <span className={`font-[amma3] text-[11px] md:text-[12px] ${hasDiscount ? 'text-red-600' : 'text-gray-600'}`}>
                        {formatPrice(price)}
                      </span>
                      {hasDiscount && (
                        <span className='font-[amma3] text-[10px] text-gray-400 line-through'>
                          {formatPrice(comparePrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className='absolute left-[8px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:border-black hover:text-black transition-all shadow-sm z-10'
          >
            <i className="ri-arrow-left-s-line text-[20px]"></i>
          </button>
          <button
            onClick={nextSlide}
            className='absolute right-[8px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:border-black hover:text-black transition-all shadow-sm z-10'
          >
            <i className="ri-arrow-right-s-line text-[20px]"></i>
          </button>
        </div>

      </div>
    </div>
  )
}

export default NewArrivals
