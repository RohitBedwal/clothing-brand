import React, { useContext, useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { cartOpenContext } from '../context/CartContext'
import NavBar2 from '../components/NavBar2'
import Cart from './Cart'

const allProducts = [
  { id: 1, name: "Silk Wrap Dress", category: "Women", price: 289, originalPrice: null, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop", badge: "NEW" },
  { id: 2, name: "Tailored Wool Blazer", category: "Men", price: 425, originalPrice: null, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop", badge: null },
  { id: 3, name: "Cashmere Oversized Sweater", category: "Women", price: 195, originalPrice: 260, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop", badge: "SALE" },
  { id: 4, name: "Linen Wide-Leg Trousers", category: "Women", price: 175, originalPrice: null, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&q=80", badge: null },
  { id: 5, name: "Structured Leather Jacket", category: "Men", price: 595, originalPrice: null, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop", badge: "BESTSELLER" },
  { id: 6, name: "Embroidered Organza Saree", category: "Women", price: 850, originalPrice: null, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop", badge: "LIMITED" },
  { id: 7, name: "Merino Wool Turtleneck", category: "Men", price: 145, originalPrice: 195, image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a00?w=600&h=800&fit=crop", badge: "SALE" },
  { id: 8, name: "Pleated Midi Skirt", category: "Women", price: 220, originalPrice: null, image: "https://images.unsplash.com/photo-1583496661160-fb5886a0afe0?w=600&h=800&fit=crop", badge: null },
  { id: 9, name: "Slim Fit Chinos", category: "Men", price: 125, originalPrice: null, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop", badge: null },
  { id: 10, name: "Quilted Down Vest", category: "Women", price: 275, originalPrice: 350, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop", badge: "SALE" },
  { id: 11, name: "Italian Leather Crossbody", category: "Accessories", price: 340, originalPrice: null, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop", badge: "NEW" },
  { id: 12, name: "Cotton Poplin Shirt", category: "Men", price: 165, originalPrice: null, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop", badge: null },
  { id: 13, name: "Draped Satin Blouse", category: "Women", price: 195, originalPrice: null, image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop", badge: "NEW" },
  { id: 14, name: "Wool Blend Overcoat", category: "Men", price: 485, originalPrice: null, image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop", badge: null },
  { id: 15, name: "Chain Link Bracelet", category: "Accessories", price: 125, originalPrice: null, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=800&fit=crop", badge: null },
  { id: 16, name: "High-Rise Straight Jeans", category: "Women", price: 155, originalPrice: 195, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop", badge: "SALE" },
  { id: 17, name: "Striped Knit Polo", category: "Men", price: 135, originalPrice: null, image: "https://images.unsplash.com/photo-1625910513413-5fc3e91f9397?w=600&h=800&fit=crop", badge: null },
  { id: 18, name: "Tulle Layered Gown", category: "Women", price: 1200, originalPrice: null, image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop", badge: "LIMITED" },
  { id: 19, name: "Canvas Weekender Bag", category: "Accessories", price: 215, originalPrice: null, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop", badge: null },
  { id: 20, name: "Ribbed Knit Dress", category: "Women", price: 245, originalPrice: null, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop", badge: "NEW" },
  { id: 21, name: "Denim Utility Jacket", category: "Men", price: 225, originalPrice: null, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop", badge: null },
  { id: 22, name: "Velvet Evening Clutch", category: "Accessories", price: 175, originalPrice: 225, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop", badge: "SALE" },
  { id: 23, name: "Corduroy Button-Down", category: "Men", price: 145, originalPrice: null, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop&q=80", badge: null },
  { id: 24, name: "Wrap Front Jumpsuit", category: "Women", price: 310, originalPrice: null, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&q=80", badge: "NEW" },
  { id: 25, name: "Linen Blazer Set", category: "Women", price: 380, originalPrice: null, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&q=90", badge: "NEW" },
  { id: 26, name: "Leather Belt", category: "Accessories", price: 85, originalPrice: null, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=80", badge: null },
  { id: 27, name: "Oversized Denim Jacket", category: "Men", price: 265, originalPrice: null, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop&q=90", badge: null },
  { id: 28, name: "Satin Midi Dress", category: "Women", price: 320, originalPrice: null, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop&q=90", badge: "NEW" },
  { id: 29, name: "Wool Scarf", category: "Accessories", price: 95, originalPrice: null, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=800&fit=crop&q=80", badge: null },
  { id: 30, name: "Pleated Trousers", category: "Men", price: 185, originalPrice: null, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop&q=80", badge: null },
  { id: 31, name: "Embroidered Kurti", category: "Women", price: 275, originalPrice: null, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop&q=80", badge: "NEW" },
  { id: 32, name: "Leather Watch", category: "Accessories", price: 420, originalPrice: null, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=800&fit=crop", badge: "BESTSELLER" },
  { id: 33, name: "Cotton Anarkali", category: "Women", price: 345, originalPrice: null, image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop&q=80", badge: null },
  { id: 34, name: "Linen Shorts", category: "Men", price: 120, originalPrice: null, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&q=85", badge: null },
  { id: 35, name: "Silk Dupatta", category: "Accessories", price: 155, originalPrice: null, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=800&fit=crop&q=85", badge: null },
  { id: 36, name: "Printed Maxi Dress", category: "Women", price: 295, originalPrice: null, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&q=85", badge: "NEW" }
];

const ITEMS_PER_PAGE = 8;

const CollectionProducts = () => {
  const { name } = useParams()
  const { setCart, addToCart } = useContext(cartOpenContext)
  const [hoveredId, setHoveredId] = useState(null);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const loaderRef = useRef(null);
  const navigate = useNavigate();

  const categoryProducts = allProducts.filter(
    p => p.category.toLowerCase() === name.toLowerCase()
  );

  const displayedProducts = categoryProducts.slice(0, displayCount);
  const hasMore = displayCount < categoryProducts.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setTimeout(() => {
            setDisplayCount(prev => prev + ITEMS_PER_PAGE);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  const displayName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />
      <Cart />

      <div className='pt-[80px] pb-[60px] px-[30px] max-md:px-[16px]'>
        
        {/* Page Title */}
        <div className='mb-[40px]'>
          <h1 className='font-[amma1] text-gray-900 text-[28px] md:text-[36px] tracking-[6px] uppercase'>
            {displayName}
          </h1>
          <div className='w-[50px] h-[1px] bg-gray-300 mt-[16px]'></div>
          <p className='font-[amma3] text-gray-400 text-[12px] tracking-[2px] mt-[12px]'>
            {categoryProducts.length} Products
          </p>
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[16px] gap-y-[30px] max-w-[1400px] mx-auto'>
          {displayedProducts.map((product) => (
            <div 
              key={product.id} 
              className='group cursor-pointer'
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => navigate('/productDetails', { state: { product: {...product, brand: "ECHO STUDIO"} } })}
            >
              <div className='relative overflow-hidden bg-gray-50 aspect-[3/4] mb-[12px]'>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                />
                
                {product.badge && (
                  <div className={`absolute top-[10px] left-[10px] px-[8px] py-[3px] text-[9px] font-[amma3] tracking-[2px] uppercase ${
                    product.badge === 'SALE' ? 'bg-red-600 text-white' :
                    product.badge === 'NEW' ? 'bg-black text-white' :
                    product.badge === 'BESTSELLER' ? 'bg-amber-700 text-white' :
                    'bg-gray-900 text-white'
                  }`}>
                    {product.badge}
                  </div>
                )}

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

              <div className='text-center'>
                <h3 className='font-[amma4] text-[11px] md:text-[12px] text-gray-900 uppercase tracking-[1px] mb-[4px] truncate px-[4px]'>
                  {product.name}
                </h3>
                <p className='font-[amma3] text-[11px] md:text-[12px] text-gray-600'>
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Scroll Loader */}
        {hasMore && (
          <div ref={loaderRef} className='flex justify-center py-[40px]'>
            <div className='flex gap-[6px]'>
              <div className='w-[8px] h-[8px] bg-gray-300 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></div>
              <div className='w-[8px] h-[8px] bg-gray-300 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></div>
              <div className='w-[8px] h-[8px] bg-gray-300 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}

        {/* End Message */}
        {!hasMore && categoryProducts.length > ITEMS_PER_PAGE && (
          <div className='text-center py-[40px]'>
            <p className='font-[amma3] text-gray-400 text-[12px] tracking-[2px] uppercase'>
              You've seen all products
            </p>
          </div>
        )}

      </div>

    </div>
  )
}

export default CollectionProducts
