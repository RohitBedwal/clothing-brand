import React, { useContext, useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { cartOpenContext } from '../context/CartContext';

const defaultProduct = {
  name: "ECHO GEMME JACKET",
  brand: "ECHO STUDIO",
  price: 25000,
  originalPrice: null,
  images: [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=1000&fit=crop"
  ],
  category: "Women > Jackets",
  description: "The ECHO GEMME JACKET embodies timeless elegance with a modern silhouette. Crafted from premium Italian wool blend fabric, this jacket features a structured shoulder line, single-button closure, and a tailored fit that flatters every body type. The luxurious satin lining ensures comfort while the meticulous stitching speaks to our commitment to quality craftsmanship.",
  deliveryDetail: "Complimentary express shipping on all orders. Standard delivery: 5-7 business days. Express delivery: 2-3 business days. International shipping available to select countries. You will receive a tracking number via email once your order has been dispatched.",
  productDetails: [
    "Premium Italian Wool Blend",
    "Fully Satin Lined",
    "Single-Breasted Closure",
    "Notch Lapel Collar",
    "Two Front Pockets",
    "Dry Clean Only",
    "Made in Italy",
    "Model wears size M"
  ],
  returnsExchange: "We offer hassle-free returns within 30 days of purchase. Items must be unworn with all tags attached. Free return shipping provided. Exchanges are subject to availability. Custom-sized items are final sale. Please contact our support team to initiate a return.",
  tags: ["Designer Jacket", "Gemme Jacket", "Italian Wool", "Luxury Outerwear"],
  colors: ["Silver", "Charcoal", "Navy", "Ivory"],
  sizes: ["XS", "S", "M", "L", "XL"]
};

const Accordion = ({ title, children, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div className='border-b border-gray-200'>
      <button
        onClick={onToggle}
        className='w-full flex items-center justify-between py-[18px] text-left group'
      >
        <span className='font-[amma3] text-[13px] text-gray-900 uppercase tracking-[2px] group-hover:text-gray-600 transition-colors'>
          {title}
        </span>
        <span className={`text-[18px] text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <div
        className='overflow-hidden transition-all duration-350 ease-in-out'
        style={{ maxHeight: isOpen ? `${height}px` : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <div ref={contentRef} className='pb-[18px]'>
          {children}
        </div>
      </div>
    </div>
  );
};

const ProductCard = () => {
  const { setCart, addToCart } = useContext(cartOpenContext)
  const location = useLocation();
  const passedProduct = location.state?.product;
  
  const fashionProduct = passedProduct ? {
    ...defaultProduct,
    name: passedProduct.name || defaultProduct.name,
    brand: passedProduct.brand || defaultProduct.brand,
    price: passedProduct.price || defaultProduct.price,
    originalPrice: passedProduct.originalPrice || defaultProduct.originalPrice,
    images: passedProduct.image ? [passedProduct.image, ...defaultProduct.images.slice(1)] : defaultProduct.images,
  } : defaultProduct;

  const [selectedSize, setSelectedSize] = useState("XL");
  const [selectedColor, setSelectedColor] = useState("Silver");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className='w-full bg-white min-h-screen'>
      <div className='pt-[90px] pb-[60px] px-[30px] max-md:px-[16px] flex flex-col items-center w-full'>
        <div className='max-w-[1300px] w-full flex flex-col lg:flex-row gap-[50px] relative'>

          {/* LEFT COLUMN — GALLERY (Sticky) */}
          <div className='w-full lg:w-[55%] lg:sticky lg:top-[100px] lg:self-start lg:h-fit'>
            <div className='flex gap-[16px]'>

              {/* Thumbnails */}
              <div className='hidden md:flex flex-col gap-[10px] w-[70px] flex-shrink-0'>
                {fashionProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-[70px] h-[88px] overflow-hidden border transition-all duration-200 flex-shrink-0 ${
                      selectedImage === idx ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className='w-full h-full object-cover'
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className='flex-1 relative bg-gray-50 overflow-hidden'>
                <div
                  className='relative aspect-[3/4] overflow-hidden cursor-crosshair'
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                >
                  <img
                    src={fashionProduct.images[selectedImage]}
                    alt={fashionProduct.name}
                    className='w-full h-full object-cover transition-transform duration-200'
                    style={isZoomed ? {
                      transform: 'scale(2)',
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                    } : {}}
                  />

                  {/* Zoom Icon */}
                  <div className='absolute bottom-[16px] right-[16px] w-[40px] h-[40px] bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm'>
                    <i className="ri-search-line text-[16px] text-gray-600"></i>
                  </div>
                </div>

                {/* Mobile Thumbnails - Horizontal Scroll */}
                <div className='flex md:hidden gap-[8px] mt-[10px] overflow-x-auto pb-[4px]'>
                  {fashionProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-[60px] h-[76px] overflow-hidden border flex-shrink-0 transition-all ${
                        selectedImage === idx ? 'border-gray-900' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className='w-full h-full object-cover' />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — PRODUCT INFO */}
          <div className='w-full lg:w-[45%] flex flex-col pr-[20px] max-md:pr-0'>

            {/* Product Title & Price */}
            <div className='mb-[28px]'>
              <h1 className='font-[amma4] text-[24px] md:text-[30px] text-gray-900 tracking-[4px] uppercase mb-[12px] leading-tight'>
                {fashionProduct.name}
              </h1>
              <div className='flex items-baseline gap-[12px] mb-[6px]'>
                <span className='font-[amma3] text-[22px] text-gray-900'>Rs. {fashionProduct.price.toLocaleString()}.00</span>
              </div>
              <p className='font-[amma3] text-[12px] text-gray-400'>Tax included.</p>
            </div>

            <div className='h-[1px] bg-gray-200 mb-[16px]'></div>

            {/* Size Chart Link */}
            <div className='flex items-center justify-end mb-[8px]'>
              <button className='flex items-center gap-[4px] text-[11px] text-gray-600 hover:text-gray-900 transition-colors'>
                <i className="ri-ruler-line text-[12px]"></i>
                <span className='font-[amma3] uppercase tracking-[1px]'>Size Chart</span>
              </button>
            </div>

            {/* Color Selection */}
            <div className='mb-[28px]'>
              <p className='font-[amma3] text-[12px] text-gray-500 uppercase tracking-[2px] mb-[10px]'>
                Color: <span className='text-gray-900'>{selectedColor}</span>
              </p>
              <div className='flex gap-[8px]'>
                {fashionProduct.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-[16px] py-[8px] border text-[12px] font-[amma3] tracking-[1px] transition-all ${
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

            {/* Size Selection */}
            <div className='mb-[28px]'>
              <p className='font-[amma3] text-[12px] text-gray-500 uppercase tracking-[2px] mb-[10px]'>
                Size: <span className='text-gray-900'>{selectedSize}</span>
              </p>
              <div className='flex gap-[8px]'>
                {fashionProduct.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-[50px] h-[46px] border flex items-center justify-center text-[12px] font-[amma3] tracking-[1px] transition-all ${
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

            {/* Custom Size */}
            <div className='mb-[16px]'>
              <button className='font-[amma3] text-[12px] text-gray-600 underline underline-offset-4 hover:text-gray-900 transition-colors'>
                Apply for custom size
              </button>
            </div>

            {/* Another Color */}
            <p className='font-[amma3] text-[12px] text-gray-500 mb-[16px]'>
              Want in another color?{' '}
              <button className='underline underline-offset-4 text-gray-700 hover:text-gray-900 transition-colors'>
                Contact Us
              </button>
            </p>

            {/* Quantity */}
            <div className='mb-[16px]'>
              <p className='font-[amma3] text-[12px] text-gray-500 uppercase tracking-[2px] mb-[10px]'>Quantity</p>
              <div className='inline-flex items-center border border-gray-200'>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className='w-[44px] h-[44px] flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-[16px]'
                >
                  −
                </button>
                <span className='w-[50px] h-[44px] flex items-center justify-center font-[amma3] text-[14px] text-gray-900 border-x border-gray-200'>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className='w-[44px] h-[44px] flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-[16px]'
                >
                  +
                </button>
              </div>
            </div>

            {/* Purchase Buttons */}
            <div className='flex gap-[12px] mb-[12px]'>
              <button
                onClick={() => {
                  addToCart({
                    ...fashionProduct,
                    _id: 1,
                    image_url: fashionProduct.images[0],
                    product_name: fashionProduct.name,
                    brands: fashionProduct.brand
                  });
                  setCart(true);
                }}
                className='flex-1 py-[15px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors'
              >
                Add to Bag
              </button>
              <button className='flex-1 py-[15px] border border-gray-900 text-gray-900 font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-gray-900 hover:text-white transition-all'>
                Buy it now
              </button>
            </div>

            {/* Wishlist */}
            <button className='w-full py-[14px] border border-gray-200 text-gray-600 font-[amma3] text-[12px] tracking-[2px] uppercase hover:border-gray-400 hover:text-gray-900 transition-all mb-[24px] flex items-center justify-center gap-[8px]'>
              <i className="ri-heart-line text-[14px]"></i>
              Add to Wishlist
            </button>

            {/* Benefits Row */}
            <div className='grid grid-cols-4 gap-[8px] mb-[24px] py-[20px] border-y border-gray-200'>
              <div className='flex flex-col items-center gap-[6px]'>
                <i className="ri-exchange-line text-[20px] text-gray-500"></i>
                <span className='font-[amma3] text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[1px] text-center leading-tight'>Easy Return</span>
              </div>
              <div className='flex flex-col items-center gap-[6px]'>
                <i className="ri-scissors-cut-line text-[20px] text-gray-500"></i>
                <span className='font-[amma3] text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[1px] text-center leading-tight'>Custom Made</span>
              </div>
              <div className='flex flex-col items-center gap-[6px]'>
                <i className="ri-truck-line text-[20px] text-gray-500"></i>
                <span className='font-[amma3] text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[1px] text-center leading-tight'>Free Shipping</span>
              </div>
              <div className='flex flex-col items-center gap-[6px]'>
                <i className="ri-headphone-line text-[20px] text-gray-500"></i>
                <span className='font-[amma3] text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[1px] text-center leading-tight'>24/7 Support</span>
              </div>
            </div>

            {/* Accordions */}
            <div className='mb-[32px]'>
              <Accordion title="Description" isOpen={openAccordion === 'description'} onToggle={() => toggleAccordion('description')}>
                <p className='font-[amma3] text-[13px] text-gray-600 leading-[1.9]'>
                  {fashionProduct.description}
                </p>
              </Accordion>

              <Accordion title="Delivery Detail" isOpen={openAccordion === 'delivery'} onToggle={() => toggleAccordion('delivery')}>
                <p className='font-[amma3] text-[13px] text-gray-600 leading-[1.9]'>
                  {fashionProduct.deliveryDetail}
                </p>
              </Accordion>

              <Accordion title="Product Details" isOpen={openAccordion === 'details'} onToggle={() => toggleAccordion('details')}>
                <ul className='space-y-[8px]'>
                  {fashionProduct.productDetails.map((detail, idx) => (
                    <li key={idx} className='font-[amma3] text-[13px] text-gray-600 flex items-start gap-[8px]'>
                      <span className='text-gray-300 mt-[2px]'>•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </Accordion>

              <Accordion title="Returns and Exchange" isOpen={openAccordion === 'returns'} onToggle={() => toggleAccordion('returns')}>
                <p className='font-[amma3] text-[13px] text-gray-600 leading-[1.9]'>
                  {fashionProduct.returnsExchange}
                </p>
              </Accordion>
            </div>

            {/* Tags */}
            <div className='mb-[24px]'>
              <p className='font-[amma3] text-[12px] text-gray-500'>
                Tags:{' '}
                {fashionProduct.tags.map((tag, idx) => (
                  <span key={idx} className='text-gray-700'>
                    {tag}{idx < fashionProduct.tags.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </div>

            {/* Social Icons */}
            <div className='flex gap-[12px] mb-[28px]'>
              <span className='font-[amma3] text-[12px] text-gray-500 uppercase tracking-[1px] mr-[4px]'>Share:</span>
              <button className='w-[34px] h-[34px] border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-all'>
                <i className="ri-facebook-fill text-[14px]"></i>
              </button>
              <button className='w-[34px] h-[34px] border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-all'>
                <i className="ri-twitter-x-line text-[14px]"></i>
              </button>
              <button className='w-[34px] h-[34px] border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-all'>
                <i className="ri-instagram-line text-[14px]"></i>
              </button>
              <button className='w-[34px] h-[34px] border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-all'>
                <i className="ri-pinterest-line text-[14px]"></i>
              </button>
            </div>

            {/* Payment Modes */}
            <div className='pt-[24px] border-t border-gray-200'>
              <p className='font-[amma3] text-[12px] text-gray-500 uppercase tracking-[2px] mb-[12px]'>Accepted Payment Modes</p>
              <div className='flex gap-[10px] flex-wrap'>
                <div className='flex items-center gap-[4px] px-[10px] py-[6px] border border-gray-200 rounded-[4px]'>
                  <i className="ri-visa-fill text-[18px] text-gray-600"></i>
                  <span className='font-[amma3] text-[11px] text-gray-500'>Visa</span>
                </div>
                <div className='flex items-center gap-[4px] px-[10px] py-[6px] border border-gray-200 rounded-[4px]'>
                  <i className="ri-mastercard-fill text-[18px] text-gray-600"></i>
                  <span className='font-[amma3] text-[11px] text-gray-500'>Mastercard</span>
                </div>
                <div className='flex items-center gap-[4px] px-[10px] py-[6px] border border-gray-200 rounded-[4px]'>
                  <i className="ri-paypal-fill text-[18px] text-gray-600"></i>
                  <span className='font-[amma3] text-[11px] text-gray-500'>PayPal</span>
                </div>
                <div className='flex items-center gap-[4px] px-[10px] py-[6px] border border-gray-200 rounded-[4px]'>
                  <i className="ri-bank-card-fill text-[18px] text-gray-600"></i>
                  <span className='font-[amma3] text-[11px] text-gray-500'>UPI</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
