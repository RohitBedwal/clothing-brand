import React, { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { quickViewContext } from '../context/QuickViewContext'
import { cartOpenContext } from '../context/CartContext'

const defaultImages = [
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&h=1000&fit=crop",
];

const QuickView = () => {
  const { quickViewOpen, quickViewProduct, closeQuickView } = useContext(quickViewContext);
  const { setCart, addToCart } = useContext(cartOpenContext);
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Silver");
  const [quantity, setQuantity] = useState(1);
  const [descOpen, setDescOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeQuickView();
    };
    if (quickViewOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [quickViewOpen, closeQuickView]);

  useEffect(() => {
    if (quickViewOpen) {
      setSelectedImage(0);
      setSelectedSize("M");
      setSelectedColor("Silver");
      setQuantity(1);
      setDescOpen(false);
    }
  }, [quickViewOpen]);

  if (!quickViewOpen || !quickViewProduct) return null;

  const product = quickViewProduct;
  const images = product.images || (product.image ? [product.image, ...defaultImages.slice(1)] : defaultImages);
  const colors = product.colors || ["Silver", "Charcoal", "Navy"];
  const sizes = product.sizes || ["XS", "S", "M", "L", "XL"];
  const description = product.description || "Crafted with precision and attention to detail, this piece embodies contemporary elegance. Made from premium materials for lasting comfort and style.";
  const price = typeof product.price === 'number'
    ? `Rs. ${product.price.toLocaleString()}.00`
    : product.price || "Rs. 0.00";

  const handleMoreDetails = () => {
    closeQuickView();
    navigate('/productDetails', { state: { product: { ...product, brand: product.brand || "ECHO STUDIO" } } });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeQuickView();
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-[20px] transition-all duration-300'
      onClick={handleOverlayClick}
      style={{
        backgroundColor: quickViewOpen ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0)',
      }}
    >
      <div
        ref={modalRef}
        className={`bg-white w-full max-w-[900px] max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          quickViewOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className='absolute top-[16px] right-[16px] z-10 w-[36px] h-[36px] flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors bg-white/80 backdrop-blur-sm'
        >
          <svg className='w-[18px] h-[18px]' fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left - Gallery */}
        <div className='w-full md:w-[48%] flex gap-[10px] p-[24px]'>
          {/* Thumbnails */}
          <div className='hidden md:flex flex-col gap-[8px] w-[60px] flex-shrink-0'>
            {images.slice(0, 4).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-[60px] h-[76px] overflow-hidden border transition-all duration-200 flex-shrink-0 ${
                  selectedImage === idx ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className='w-full h-full object-cover' />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className='flex-1 bg-gray-50 overflow-hidden'>
            <div className='aspect-[3/4] overflow-hidden'>
              <img
                src={images[selectedImage] || images[0]}
                alt={product.name}
                className='w-full h-full object-cover'
              />
            </div>
            {/* Mobile Thumbnails */}
            <div className='flex md:hidden gap-[6px] mt-[8px] overflow-x-auto'>
              {images.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-[50px] h-[64px] overflow-hidden border flex-shrink-0 ${
                    selectedImage === idx ? 'border-gray-900' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className='w-full h-full object-cover' />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Product Info */}
        <div className='w-full md:w-[52%] p-[24px] pt-[16px] md:pt-[24px] flex flex-col border-l border-gray-100'>
          <p className='font-[amma3] text-[10px] text-gray-400 uppercase tracking-[3px] mb-[8px]'>
            {product.brand || "ECHOSTUDIO"}
          </p>

          <h2 className='font-[amma4] text-[18px] md:text-[20px] text-gray-900 tracking-[3px] uppercase mb-[12px] leading-tight'>
            {product.name}
          </h2>

          <div className='flex items-baseline gap-[10px] mb-[4px]'>
            <span className='font-[amma3] text-[18px] text-gray-900'>{price}</span>
          </div>
          <p className='font-[amma3] text-[11px] text-gray-400 mb-[20px]'>Tax included.</p>

          {/* Color */}
          <div className='mb-[16px]'>
            <p className='font-[amma3] text-[11px] text-gray-500 uppercase tracking-[2px] mb-[8px]'>
              Color: <span className='text-gray-900'>{selectedColor}</span>
            </p>
            <div className='flex gap-[6px] flex-wrap'>
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-[14px] py-[6px] border text-[11px] font-[amma3] tracking-[1px] transition-all ${
                    selectedColor === color
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className='mb-[16px]'>
            <p className='font-[amma3] text-[11px] text-gray-500 uppercase tracking-[2px] mb-[8px]'>
              Size: <span className='text-gray-900'>{selectedSize}</span>
            </p>
            <div className='flex gap-[6px]'>
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-[42px] h-[38px] border flex items-center justify-center text-[11px] font-[amma3] tracking-[1px] transition-all ${
                    selectedSize === size
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className='mb-[20px]'>
            <p className='font-[amma3] text-[11px] text-gray-500 uppercase tracking-[2px] mb-[8px]'>Quantity</p>
            <div className='inline-flex items-center border border-gray-200'>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className='w-[38px] h-[38px] flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-[14px]'
              >
                −
              </button>
              <span className='w-[44px] h-[38px] flex items-center justify-center font-[amma3] text-[13px] text-gray-900 border-x border-gray-200'>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className='w-[38px] h-[38px] flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-[14px]'
              >
                +
              </button>
            </div>
          </div>

          {/* Description Accordion */}
          <div className='mb-[20px] border-t border-gray-100 pt-[16px]'>
            <button
              onClick={() => setDescOpen(!descOpen)}
              className='flex items-center justify-between w-full py-[4px]'
            >
              <span className='font-[amma3] text-[12px] text-gray-700 uppercase tracking-[2px]'>Description</span>
              <span className={`text-[16px] text-gray-400 transition-transform duration-300 ${descOpen ? 'rotate-45' : ''}`}>+</span>
            </button>
            <div
              className='overflow-hidden transition-all duration-300 ease-in-out'
              style={{ maxHeight: descOpen ? '200px' : '0px', opacity: descOpen ? 1 : 0 }}
            >
              <p className='font-[amma3] text-[12px] text-gray-500 leading-[1.8] pt-[8px]'>
                {description}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className='flex gap-[10px] mb-[12px]'>
            <button
              onClick={() => {
                addToCart({
                  ...product,
                  _id: product.id,
                  image_url: images[0],
                  product_name: product.name,
                  brands: product.brand || "ECHO STUDIO"
                });
                setCart(true);
                closeQuickView();
              }}
              className='flex-1 py-[13px] bg-gray-900 text-white font-[amma3] text-[11px] tracking-[3px] uppercase hover:bg-black transition-colors'
            >
              Add to bag
            </button>
            <button
              onClick={handleMoreDetails}
              className='flex-1 py-[13px] border border-gray-900 text-gray-900 font-[amma3] text-[11px] tracking-[3px] uppercase hover:bg-gray-900 hover:text-white transition-all'
            >
              Buy it now
            </button>
          </div>

          {/* More Details */}
          <button
            onClick={handleMoreDetails}
            className='font-[amma3] text-[11px] text-gray-500 uppercase tracking-[2px] hover:text-gray-900 transition-colors text-left flex items-center gap-[4px]'
          >
            More details
            <svg className='w-[12px] h-[12px]' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuickView
