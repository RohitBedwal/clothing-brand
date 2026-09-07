import React, { useContext, useState, useRef, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { cartOpenContext } from '../context/CartContext';
import { formatPrice, formatPriceCompact } from '../src/utils/formatPrice';
import productService from '../services/productService';

const fallbackImages = [
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&h=1000&fit=crop",
];

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
  const { id } = useParams();
  const navigate = useNavigate();
  const [rawProduct, setRawProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Default");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productService.getProductById(id)
      .then(res => setRawProduct(res.product))
      .catch(() => setRawProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const product = useMemo(() => {
    if (!rawProduct) return null;
    const imgs = Array.isArray(rawProduct.images)
      ? rawProduct.images.map(img => typeof img === 'string' ? img : img.url).filter(Boolean)
      : [];
    const variants = Array.isArray(rawProduct.variants) ? rawProduct.variants : [];
    const colors = [...new Set(variants.map(v => v.color).filter(Boolean))];
    const sizes = [...new Set(variants.map(v => v.size).filter(Boolean))];
    return {
      ...rawProduct,
      normalizedImages: imgs.length > 0 ? imgs : fallbackImages,
      variants,
      colors: colors.length > 0 ? colors : ["Default"],
      sizes: sizes.length > 0 ? sizes : ["M"],
      price: Number(rawProduct.price) || 0,
      compareAtPrice: rawProduct.compareAtPrice ? Number(rawProduct.compareAtPrice) : null,
    };
  }, [rawProduct]);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || "M");
      setSelectedColor(product.colors[0] || "Default");
      setSelectedImage(0);
      setQuantity(1);
    }
  }, [product?.id]);

  if (loading) {
    return (
      <div className='w-full bg-white min-h-screen'>
        <div className='pt-[120px] pb-[80px] flex flex-col items-center'>
          <div className='w-[30px] h-[30px] border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin'></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='w-full bg-white min-h-screen'>
        <div className='pt-[120px] pb-[80px] flex flex-col items-center'>
          <p className='font-[amma3] text-[14px] text-gray-500 mb-[24px]'>Product not found.</p>
          <button onClick={() => navigate('/')} className='px-[32px] py-[12px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors'>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const matchedVariant = product.variants.find(v =>
    v.size === selectedSize && v.color === selectedColor
  ) || product.variants.find(v => v.size === selectedSize) || product.variants.find(v => v.color === selectedColor) || product.variants[0];

  const displayPrice = matchedVariant ? Number(matchedVariant.price) : product.price;
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > displayPrice;

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

  const handleAddToCart = async () => {
    if (addingToCart) return;
    setAddingToCart(true);
    try {
      await addToCart({
        ...product,
        selectedSize,
        selectedColor,
        price: displayPrice,
      });
      setCart(true);
    } finally {
      setAddingToCart(false);
    }
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
                {product.normalizedImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-[70px] h-[88px] overflow-hidden border transition-all duration-200 flex-shrink-0 ${
                      selectedImage === idx ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt={product.name} className='w-full h-full object-cover' />
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
                    src={product.normalizedImages[selectedImage] || product.normalizedImages[0]}
                    alt={product.name}
                    className='w-full h-full object-cover transition-transform duration-200'
                    style={isZoomed ? { transform: 'scale(2)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
                  />
                  <div className='absolute bottom-[16px] right-[16px] w-[40px] h-[40px] bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm'>
                    <i className="ri-search-line text-[16px] text-gray-600"></i>
                  </div>
                </div>

                {/* Mobile Thumbnails */}
                <div className='flex md:hidden gap-[8px] mt-[10px] overflow-x-auto pb-[4px]'>
                  {product.normalizedImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-[60px] h-[76px] overflow-hidden border flex-shrink-0 transition-all ${
                        selectedImage === idx ? 'border-gray-900' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={product.name} className='w-full h-full object-cover' />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — PRODUCT INFO */}
          <div className='w-full lg:w-[45%] flex flex-col pr-[20px] max-md:pr-0'>

            {/* Category */}
            {product.category?.name && (
              <p className='font-[amma3] text-[10px] text-gray-400 uppercase tracking-[3px] mb-[8px]'>
                {product.category.name}
              </p>
            )}

            {/* Product Title & Price */}
            <div className='mb-[28px]'>
              <h1 className='font-[amma4] text-[24px] md:text-[30px] text-gray-900 tracking-[4px] uppercase mb-[12px] leading-tight'>
                {product.name}
              </h1>
              <div className='flex items-baseline gap-[12px] mb-[6px]'>
                <span className='font-[amma3] text-[22px] text-gray-900'>{formatPrice(displayPrice)}</span>
                {hasDiscount && (
                  <span className='font-[amma3] text-[16px] text-gray-400 line-through'>
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
              {matchedVariant && (
                <p className='font-[amma3] text-[11px] text-gray-400 mt-[2px]'>
                  {matchedVariant.stock > 0 ? `${matchedVariant.stock} in stock` : 'Out of stock'}
                </p>
              )}
              <p className='font-[amma3] text-[12px] text-gray-400 mt-[4px]'>Tax included.</p>
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
            {product.colors.length > 0 && !(product.colors.length === 1 && product.colors[0] === "Default") && (
              <div className='mb-[28px]'>
                <p className='font-[amma3] text-[12px] text-gray-500 uppercase tracking-[2px] mb-[10px]'>
                  Color: <span className='text-gray-900'>{selectedColor}</span>
                </p>
                <div className='flex gap-[8px]'>
                  {product.colors.map(color => (
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
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && !(product.sizes.length === 1 && product.sizes[0] === "M") && (
              <div className='mb-[28px]'>
                <p className='font-[amma3] text-[12px] text-gray-500 uppercase tracking-[2px] mb-[10px]'>
                  Size: <span className='text-gray-900'>{selectedSize}</span>
                </p>
                <div className='flex gap-[8px]'>
                  {product.sizes.map(size => {
                    const variantForSize = product.variants.find(v => v.size === size && v.color === selectedColor);
                    const outOfStock = variantForSize && variantForSize.stock <= 0;
                    return (
                      <button
                        key={size}
                        onClick={() => !outOfStock && setSelectedSize(size)}
                        disabled={outOfStock}
                        className={`w-[50px] h-[46px] border flex items-center justify-center text-[12px] font-[amma3] tracking-[1px] transition-all ${
                          selectedSize === size
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : outOfStock
                            ? 'border-gray-100 text-gray-300 cursor-not-allowed line-through'
                            : 'border-gray-200 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

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
                onClick={handleAddToCart}
                disabled={addingToCart}
                className='flex-1 py-[15px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-[8px]'
              >
                {addingToCart ? (
                  <>
                    <div className='w-[14px] h-[14px] border-[1.5px] border-white/30 border-t-white rounded-full animate-spin'></div>
                    Adding...
                  </>
                ) : 'Add to Bag'}
              </button>
              <button className='flex-1 py-[15px] border border-gray-900 text-gray-900 font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-gray-900 hover:text-white transition-all'>
                Buy it now
              </button>
            </div>

            {/* Wishlist */}
            <button className='w-full py-[14px] border border-gray-200 text-gray-600 font-[amma3] text-[12px] text-[2px] uppercase hover:border-gray-400 hover:text-gray-900 transition-all mb-[24px] flex items-center justify-center gap-[8px]'>
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
                  {product.description || "No description available."}
                </p>
              </Accordion>

              <Accordion title="Delivery Detail" isOpen={openAccordion === 'delivery'} onToggle={() => toggleAccordion('delivery')}>
                <p className='font-[amma3] text-[13px] text-gray-600 leading-[1.9]'>
                  Complimentary express shipping on all orders. Standard delivery: 5-7 business days. Express delivery: 2-3 business days. You will receive a tracking number via email once your order has been dispatched.
                </p>
              </Accordion>

              <Accordion title="Product Details" isOpen={openAccordion === 'details'} onToggle={() => toggleAccordion('details')}>
                <ul className='space-y-[8px]'>
                  {product.category?.name && (
                    <li className='font-[amma3] text-[13px] text-gray-600 flex items-start gap-[8px]'>
                      <span className='text-gray-300 mt-[2px]'>•</span>
                      Category: {product.category.name}
                    </li>
                  )}
                  {matchedVariant && (
                    <>
                      <li className='font-[amma3] text-[13px] text-gray-600 flex items-start gap-[8px]'>
                        <span className='text-gray-300 mt-[2px]'>•</span>
                        SKU: {matchedVariant.sku}
                      </li>
                      <li className='font-[amma3] text-[13px] text-gray-600 flex items-start gap-[8px]'>
                        <span className='text-gray-300 mt-[2px]'>•</span>
                        Color: {matchedVariant.color} | Size: {matchedVariant.size}
                      </li>
                    </>
                  )}
                </ul>
              </Accordion>

              <Accordion title="Returns and Exchange" isOpen={openAccordion === 'returns'} onToggle={() => toggleAccordion('returns')}>
                <p className='font-[amma3] text-[13px] text-gray-600 leading-[1.9]'>
                  We offer hassle-free returns within 30 days of purchase. Items must be unworn with all tags attached. Free return shipping provided. Exchanges are subject to availability. Custom-sized items are final sale. Please contact our support team to initiate a return.
                </p>
              </Accordion>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className='mb-[24px]'>
                <p className='font-[amma3] text-[12px] text-gray-500'>
                  Tags:{' '}
                  {product.tags.map((tag, idx) => (
                    <span key={idx} className='text-gray-700'>
                      {tag}{idx < product.tags.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </div>
            )}

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
