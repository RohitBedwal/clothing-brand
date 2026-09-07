import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavBar2 from '../components/NavBar2';
import FashionCard from '../components/FashionCard';
import Cart from './Cart';
import categoryService from '../services/categoryService';

const ProductByCategory = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const data = await categoryService.getCategoryBySlug(slug);
        setCategory(data.category);
        setProducts(data.products || []);
      } catch {
        setCategory(null);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchCategory();
  }, [slug]);

  return (
    <div className='bg-white'>
      <NavBar2 />
      <Cart />

      <div className='h-[50vh] md:h-[60vh] overflow-hidden mt-[110px] relative'>
        <img
          className='w-full h-full object-cover'
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
          alt={category?.name || "Category"}
        />
        <div className='absolute inset-0 bg-black/30'></div>
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          {category?.parent && (
            <p className='font-[amma3] text-white/60 text-[12px] tracking-[4px] uppercase mb-[8px]'>{category.parent.name}</p>
          )}
          <h1 className='font-[amma4] text-white text-[32px] md:text-[48px] tracking-[6px] uppercase'>
            {loading ? 'Loading...' : category?.name || 'Category'}
          </h1>
          {category?.children?.length > 0 && (
            <div className='flex gap-[16px] mt-[20px]'>
              {category.children.map((sub) => (
                <a
                  key={sub.id}
                  href={`/category/${sub.slug}`}
                  className='font-[amma3] text-white/70 text-[11px] tracking-[2px] uppercase hover:text-white transition-colors border-b border-white/30 hover:border-white pb-[2px]'
                >
                  {sub.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center items-center py-[80px]'>
          <div className='w-[30px] h-[30px] border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin'></div>
        </div>
      ) : (
        <FashionCard products={products} />
      )}
    </div>
  )
}

export default ProductByCategory
