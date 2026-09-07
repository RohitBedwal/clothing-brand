import React, { useState, useEffect } from 'react'
import NavBar2 from '../components/NavBar2'
import productService from '../services/productService'

const SalePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productService.getSaleProducts();
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

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />

      <div className='pt-[110px]'>
        <div className='bg-gray-950 text-white py-[60px] text-center px-[30px] max-md:px-[16px]'>
          <p className='font-[amma3] text-[11px] text-white/50 uppercase tracking-[4px] mb-[12px]'>Limited Time</p>
          <h1 className='font-[amma4] text-[36px] md:text-[52px] uppercase tracking-[8px] mb-[12px]'>Sale</h1>
          <p className='font-[amma3] text-[14px] text-white/60 uppercase tracking-[3px]'>Up to 50% Off</p>
          <div className='w-[40px] h-[1px] bg-white/30 mx-auto mt-[24px]'></div>
        </div>

        <div className='px-[30px] max-md:px-[16px] max-w-[1200px] mx-auto py-[60px]'>
          {loading ? (
            <div className='text-center py-[60px]'>
              <p className='font-[amma3] text-gray-400 text-[14px]'>Loading sale items...</p>
            </div>
          ) : products.length === 0 ? (
            <div className='text-center py-[60px]'>
              <p className='font-[amma3] text-gray-400 text-[14px]'>No sale items found.</p>
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[20px] gap-y-[40px]'>
              {products.map((product) => {
                const comparePrice = product.compareAtPrice ? Number(product.compareAtPrice) : null;
                const discount = comparePrice ? Math.round((1 - product.price / comparePrice) * 100) : 0;

                return (
                  <div key={product.id} className='group cursor-pointer'>
                    <div className='relative overflow-hidden bg-gray-50 aspect-[3/4] mb-[16px]'>
                      <img
                        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                        src={getImage(product)}
                        alt={product.name}
                      />

                      {discount > 0 && (
                        <div className='absolute top-[12px] left-[12px] px-[10px] py-[4px] text-[10px] font-[amma3] tracking-[2px] uppercase bg-red-600 text-white'>
                          {discount}% OFF
                        </div>
                      )}

                      <div className={`absolute bottom-[12px] right-[12px] h-[40px] w-[40px] bg-white flex items-center justify-center transition-all duration-300 shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black hover:text-white`}>
                        <i className="ri-shopping-bag-line text-[16px]"></i>
                      </div>
                      <div className={`absolute bottom-[12px] right-[60px] h-[40px] w-[40px] bg-white flex items-center justify-center transition-all duration-300 shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black hover:text-white`}>
                        <i className="ri-eye-line text-[16px]"></i>
                      </div>
                    </div>

                    <div className='px-[4px]'>
                      <p className='font-[amma3] text-[11px] text-gray-400 uppercase tracking-[2px] mb-[4px]'>{getCategory(product)}</p>
                      <h3 className='font-[amma4] text-[14px] text-gray-900 uppercase tracking-[1px] mb-[6px] leading-tight'>{product.name}</h3>
                      <div className='flex items-center gap-[8px]'>
                        <span className='font-[amma3] text-[14px] text-red-600'>
                          ₹{Number(product.price).toLocaleString('en-IN')}
                        </span>
                        {comparePrice && (
                          <span className='font-[amma3] text-[13px] text-gray-400 line-through'>
                            ₹{comparePrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SalePage
