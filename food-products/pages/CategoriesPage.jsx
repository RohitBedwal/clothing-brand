import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar2 from '../components/NavBar2'
import Cart from './Cart'
import categoryService from '../services/categoryService'

const categoryImages = {
  "Women": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=700&fit=crop",
  "Men": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop",
  "Kids": "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&h=700&fit=crop",
};

const subImages = [
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1583496661160-fb5886a0afe0?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
];

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(Array.isArray(data) ? data : data.categories || []);
      } catch {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />
      <Cart />

      {/* Hero Banner */}
      <div className='h-[40vh] md:h-[50vh] overflow-hidden mt-[110px] relative'>
        <img
          className='w-full h-full object-cover'
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
          alt="Categories"
        />
        <div className='absolute inset-0 bg-black/30'></div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <p className='font-[amma3] text-white/60 text-[11px] tracking-[5px] uppercase mb-[8px]'>ECHOSTUDIO</p>
            <h1 className='font-[amma4] text-white text-[36px] md:text-[52px] tracking-[6px] uppercase'>Shop by Category</h1>
          </div>
        </div>
      </div>

      <div className='max-w-[1400px] mx-auto px-[30px] max-md:px-[16px] py-[60px]'>

        {loading ? (
          <div className='flex justify-center py-[80px]'>
            <div className='w-[30px] h-[30px] border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin'></div>
          </div>
        ) : (
          <div className='flex flex-col gap-[80px]'>

            {categories.map((cat) => (
              <div key={cat.id}>

                {/* Parent Category Header */}
                <div className='flex items-center justify-between mb-[30px]'>
                  <div>
                    <h2 className='font-[amma4] text-gray-900 text-[28px] md:text-[36px] tracking-[4px] uppercase'>
                      {cat.name}
                    </h2>
                    <p className='font-[amma3] text-gray-400 text-[12px] tracking-[2px] mt-[4px]'>
                      {cat._count?.products || 0} products
                    </p>
                  </div>
                  <Link
                    to={`/category/${cat.slug}`}
                    className='font-[amma3] text-[11px] tracking-[2px] uppercase text-gray-900 border-b border-gray-900 pb-[2px] hover:text-gray-500 hover:border-gray-500 transition-colors'
                  >
                    View All
                  </Link>
                </div>

                {/* Subcategories Grid */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px]'>
                  {cat.children?.map((sub, idx) => (
                    <Link
                      key={sub.id}
                      to={`/category/${sub.slug}`}
                      className='group cursor-pointer'
                    >
                      <div className='relative overflow-hidden bg-gray-50 aspect-[3/4] mb-[12px]'>
                        <img
                          src={subImages[idx % subImages.length]}
                          alt={sub.name}
                          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                        />
                        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors'></div>
                        <div className='absolute bottom-[16px] left-0 right-0 text-center'>
                          <span className='font-[amma3] text-white text-[11px] tracking-[2px] uppercase bg-black/50 px-[12px] py-[6px] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity'>
                            Shop Now
                          </span>
                        </div>
                      </div>
                      <h3 className='font-[amma4] text-[13px] text-gray-900 uppercase tracking-[2px] text-center'>
                        {sub.name}
                      </h3>
                      <p className='font-[amma3] text-[10px] text-gray-400 text-center mt-[2px]'>
                        {sub._count?.products || 0} items
                      </p>
                    </Link>
                  ))}

                  {/* Parent Category Link */}
                  <Link
                    to={`/category/${cat.slug}`}
                    className='group cursor-pointer'
                  >
                    <div className='relative overflow-hidden bg-gray-900 aspect-[3/4] mb-[12px] flex items-center justify-center'>
                      <div className='text-center'>
                        <i className="ri-arrow-right-line text-white text-[28px] mb-[8px] block group-hover:translate-x-[4px] transition-transform"></i>
                        <span className='font-[amma3] text-white text-[11px] tracking-[3px] uppercase'>
                          View All {cat.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default CategoriesPage;
