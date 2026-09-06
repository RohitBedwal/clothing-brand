import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cartOpenContext } from '../context/CartContext'
import NavBar2 from '../components/NavBar2'
import Cart from './Cart'

const newArrivalsProducts = [
  { id: 1, name: "ECHO SOFT SCULPT BLAZER SET", price: "Rs. 15,000.00", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop", badge: "NEW" },
  { id: 2, name: "ECHO MAXINE DRAPE DRESS", price: "Rs. 15,000.00", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop", badge: "NEW" },
  { id: 3, name: "ECHO BLACK RIVA COORD SET", price: "Rs. 13,500.00", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop", badge: null },
  { id: 4, name: "ECHO KELP CUT CORDSET", price: "Rs. 12,500.00", image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&h=1000&fit=crop", badge: null },
  { id: 5, name: "ECHO LINEN FLARE CO-ORD", price: "Rs. 11,500.00", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop", badge: "NEW" },
  { id: 6, name: "ECHO DRAPED SATIN BLOUSE", price: "Rs. 8,500.00", image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&h=1000&fit=crop&q=80", badge: null },
  { id: 7, name: "ECHO PLEATED MIDI SKIRT", price: "Rs. 9,500.00", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0afe0?w=800&h=1000&fit=crop", badge: null },
  { id: 8, name: "ECHO TAILORED WOOL BLAZER", price: "Rs. 18,500.00", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop&q=80", badge: "BESTSELLER" },
  { id: 9, name: "ECHO SILK WRAP DRESS", price: "Rs. 14,500.00", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&q=80", badge: null },
  { id: 10, name: "ECHO RIBBED KNIT DRESS", price: "Rs. 10,500.00", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&q=80", badge: "NEW" },
  { id: 11, name: "ECHO WRAP FRONT JUMPSUIT", price: "Rs. 13,000.00", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&q=90", badge: null },
  { id: 12, name: "ECHO COTTON POPLIN SHIRT", price: "Rs. 7,500.00", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop", badge: null }
];

const ITEMS_PER_PAGE = 4;

const NewArrivals = () => {
  const { setCart, addToCart } = useContext(cartOpenContext)
  const [hoveredId, setHoveredId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const totalPages = Math.ceil(newArrivalsProducts.length / ITEMS_PER_PAGE);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const startIndex = currentIndex * ITEMS_PER_PAGE;
  const displayedProducts = newArrivalsProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />
      <Cart />

      <div className='pt-[120px] pb-[40px]'>
        
        {/* Page Title */}
        <div className='text-center mb-[30px]'>
          <h1 className='font-[amma4] text-gray-900 text-[28px] md:text-[32px] tracking-[6px] uppercase'>
            New Arrival
          </h1>
          <div className='w-[50px] h-[1px] bg-gray-300 mx-auto mt-[16px]'></div>
        </div>

        {/* Product Grid - 4 items */}
        <div className='w-full px-[30px] max-md:px-[16px]'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-[16px] gap-y-[30px]'>
            {displayedProducts.map((product) => (
              <div 
                key={product.id} 
                className='group cursor-pointer'
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => navigate('/productDetails', { state: { product: {...product, brand: "ECHO STUDIO"} } })}
              >
                {/* Product Image */}
                <div className='relative overflow-hidden bg-gray-50 aspect-[3/4] mb-[12px]'>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                  
                  {product.badge && (
                    <div className={`absolute top-[10px] left-[10px] px-[8px] py-[3px] text-[9px] font-[amma3] tracking-[2px] uppercase ${
                      product.badge === 'NEW' ? 'bg-black text-white' :
                      product.badge === 'BESTSELLER' ? 'bg-gray-800 text-white' :
                      'bg-gray-900 text-white'
                    }`}>
                      {product.badge}
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className={`absolute bottom-0 left-0 right-0 p-[10px] flex gap-[6px] transition-all duration-300 ${
                    hoveredId === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({...product, _id: product.id, image_url: product.image, product_name: product.name, brands: "ECHO STUDIO"});
                        setCart(true);
                      }}
                      className='flex-1 py-[8px] bg-white text-black font-[amma3] text-[9px] tracking-[2px] uppercase hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-[4px]'
                    >
                      <i className="ri-shopping-bag-line"></i>
                      Add to Bag
                    </button>
                    <button className='w-[36px] h-[36px] bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors'>
                      <i className="ri-eye-line text-[14px]"></i>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className='text-center'>
                  <h3 className='font-[amma4] text-[11px] md:text-[12px] text-gray-900 uppercase tracking-[1px] mb-[4px] truncate px-[4px]'>
                    {product.name}
                  </h3>
                  <p className='font-[amma3] text-[11px] md:text-[12px] text-gray-600'>
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Navigation */}
        <div className='flex justify-center items-center gap-[16px] mt-[30px]'>
          <button 
            onClick={prevSlide}
            className='w-[36px] h-[36px] border border-gray-300 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors'
          >
            <i className="ri-arrow-left-s-line text-[18px]"></i>
          </button>
          <div className='flex gap-[6px]'>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-[6px] h-[6px] rounded-full transition-colors ${
                  currentIndex === idx ? 'bg-black' : 'bg-gray-300'
                }`}
              ></button>
            ))}
          </div>
          <button 
            onClick={nextSlide}
            className='w-[36px] h-[36px] border border-gray-300 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors'
          >
            <i className="ri-arrow-right-s-line text-[18px]"></i>
          </button>
        </div>

      </div>

      {/* Currency Selector */}
      <div className='fixed bottom-[100px] left-[20px] z-40'>
        <div className='bg-white border border-gray-200 px-[10px] py-[6px] shadow-sm'>
          <select className='font-[amma3] text-[10px] text-gray-700 bg-transparent focus:outline-none uppercase tracking-[1px] cursor-pointer'>
            <option>INR ₹</option>
            <option>USD $</option>
            <option>EUR €</option>
          </select>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className='fixed bottom-[60px] left-[20px] z-40'>
        <a 
          href="https://wa.me/919876543210" 
          target="_blank" 
          rel="noopener noreferrer"
          className='flex items-center gap-[6px] bg-green-500 text-white px-[12px] py-[8px] shadow-lg hover:bg-green-600 transition-colors'
        >
          <i className="ri-whatsapp-line text-[16px]"></i>
          <span className='font-[amma3] text-[9px] tracking-[1px] uppercase hidden md:inline'>WhatsApp</span>
        </a>
      </div>

      {/* Chat With Us */}
      <div className='fixed bottom-[20px] right-[20px] z-40'>
        <button className='flex items-center gap-[6px] bg-gray-900 text-white px-[14px] py-[10px] shadow-lg hover:bg-black transition-colors'>
          <i className="ri-chat-1-line text-[14px]"></i>
          <span className='font-[amma3] text-[10px] tracking-[2px] uppercase'>Chat With Us</span>
        </button>
      </div>

    </div>
  )
}

export default NewArrivals
