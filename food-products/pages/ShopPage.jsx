import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar2 from '../components/NavBar2'
import Cart from './Cart'
import productService from '../services/productService'
import { quickViewContext } from '../context/QuickViewContext'

const ShopPage = () => {
  const navigate = useNavigate();
  const { openQuickView } = useContext(quickViewContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productService.getProducts({ limit: 50 });
        setProducts(res.products || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getImage = (p) => p.images?.[0]?.url || '/placeholder.png';
  const getCategory = (p) => p.category?.name || '';
  const getComparePrice = (p) => p.compareAtPrice ? Number(p.compareAtPrice) : null;

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />
      <Cart />

      <div className='pt-[110px] pb-[80px] px-[30px] max-md:px-[16px] max-w-[1200px] mx-auto'>
        <div className='text-center mb-[60px]'>
          <p className='font-[amma3] text-[11px] text-gray-400 uppercase tracking-[4px] mb-[12px]'>ECHO STUDIO</p>
          <h1 className='font-[amma4] text-[36px] md:text-[48px] text-gray-900 uppercase tracking-[6px] mb-[16px]'>Shop All</h1>
          <div className='w-[40px] h-[1px] bg-gray-900 mx-auto'></div>
        </div>

        {loading ? (
          <div className='text-center py-[60px]'>
            <div className='w-[30px] h-[30px] border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto'></div>
          </div>
        ) : products.length === 0 ? (
          <div className='text-center py-[60px]'>
            <p className='font-[amma3] text-gray-400 text-[14px]'>No products found.</p>
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[20px] gap-y-[40px]'>
            {products.map((product) => {
              const comparePrice = getComparePrice(product);
              const hasDiscount = comparePrice && comparePrice > Number(product.price);
              return (
                <div key={product.id} className='group cursor-pointer'>
                  <div className='relative overflow-hidden bg-gray-50 aspect-[3/4] mb-[16px]'>
                    <img
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                      src={getImage(product)}
                      alt={product.name}
                      onClick={() => navigate(`/product/${product.id}`)}
                    />

                    {product.isSale && (
                      <div className='absolute top-[12px] left-[12px] px-[10px] py-[4px] text-[10px] font-[amma3] tracking-[2px] uppercase bg-red-600 text-white'>
                        SALE
                      </div>
                    )}
                    {product.isNewArrival && (
                      <div className='absolute top-[12px] left-[12px] px-[10px] py-[4px] text-[10px] font-[amma3] tracking-[2px] uppercase bg-black text-white'>
                        NEW
                      </div>
                    )}

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickView(product);
                      }}
                      className='absolute bottom-[12px] right-[12px] h-[40px] w-[40px] bg-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black hover:text-white'
                    >
                      <i className="ri-shopping-bag-line text-[16px]"></i>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickView(product);
                      }}
                      className='absolute bottom-[12px] right-[60px] h-[40px] w-[40px] bg-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black hover:text-white'
                    >
                      <i className="ri-eye-line text-[16px]"></i>
                    </div>
                  </div>

                  <div className='px-[4px]' onClick={() => navigate(`/product/${product.id}`)}>
                    <p className='font-[amma3] text-[11px] text-gray-400 uppercase tracking-[2px] mb-[4px]'>{getCategory(product)}</p>
                    <h3 className='font-[amma4] text-[14px] text-gray-900 uppercase tracking-[1px] mb-[6px] leading-tight'>{product.name}</h3>
                    <div className='flex items-center gap-[8px]'>
                      <span className={`font-[amma3] text-[14px] ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
                        ₹{Number(product.price).toLocaleString('en-IN')}
                      </span>
                      {hasDiscount && (
                        <span className='font-[amma3] text-[13px] text-gray-400 line-through'>
                          ₹{comparePrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopPage
