import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import NavBar2 from '../components/NavBar2';
import Cart from './Cart';
import QuickView from '../components/QuickView';
import searchService from '../services/searchService';
import { formatPrice } from '../src/utils/formatPrice';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { quickViewContext } from '../context/QuickViewContext';

const SearchName = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();
  const { openQuickView } = useContext(quickViewContext);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    searchService.search(query)
      .then(res => setProducts(Array.isArray(res) ? res : res.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [query]);

  const getImage = (p) => p.images?.[0]?.url || '/placeholder.png';
  const getPrice = (p) => Number(p.price) || 0;
  const getComparePrice = (p) => p.compareAtPrice ? Number(p.compareAtPrice) : null;

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />
      <Cart />
      <QuickView />

      <div className='pt-[110px] pb-[80px] px-[30px] max-md:px-[16px] max-w-[1200px] mx-auto'>

        {/* Header */}
        <div className='text-center mb-[40px]'>
          <p className='font-[amma3] text-[11px] text-gray-400 uppercase tracking-[4px] mb-[12px]'>ECHO STUDIO</p>
          {searched ? (
            <>
              <h1 className='font-[amma4] text-gray-900 text-[28px] md:text-[36px] tracking-[4px] uppercase mb-[8px]'>
                Search Results
              </h1>
              <p className='font-[amma3] text-[13px] text-gray-400 tracking-[1px]'>
                {loading ? 'Searching...' : `${products.length} result${products.length !== 1 ? 's' : ''} for "${query}"`}
              </p>
            </>
          ) : (
            <>
              <h1 className='font-[amma4] text-gray-900 text-[28px] md:text-[36px] tracking-[4px] uppercase mb-[8px]'>
                Search
              </h1>
              <p className='font-[amma3] text-[13px] text-gray-400 tracking-[1px]'>
                Find your perfect piece
              </p>
            </>
          )}
          <div className='w-[40px] h-[1px] bg-gray-900 mx-auto mt-[20px]'></div>
        </div>

        {/* Results */}
        {loading ? (
          <div className='text-center py-[60px]'>
            <div className='w-[30px] h-[30px] border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto'></div>
          </div>
        ) : searched && products.length === 0 ? (
          <div className='text-center py-[60px]'>
            <i className="ri-search-line text-[48px] text-gray-200 mb-[16px]"></i>
            <p className='font-[amma3] text-gray-400 text-[14px] mb-[8px]'>No results found for "{query}"</p>
            <p className='font-[amma3] text-gray-300 text-[12px]'>Try different keywords or browse our categories</p>
          </div>
        ) : products.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[20px] gap-y-[40px]'>
            {products.map((product) => {
              const price = getPrice(product);
              const comparePrice = getComparePrice(product);
              const hasDiscount = comparePrice && comparePrice > price;

              return (
                <div
                  key={product.id}
                  className='group cursor-pointer'
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className='relative overflow-hidden bg-gray-50 aspect-[3/4] mb-[16px]'>
                    <img
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                      src={getImage(product)}
                      alt={product.name}
                    />

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

                  <div className='px-[4px]'>
                    <p className='font-[amma3] text-[11px] text-gray-400 uppercase tracking-[2px] mb-[4px]'>
                      {product.category?.name || ''}
                    </p>
                    <h3 className='font-[amma4] text-[14px] text-gray-900 uppercase tracking-[1px] mb-[6px] leading-tight'>
                      {product.name}
                    </h3>
                    <div className='flex items-center gap-[8px]'>
                      <span className={`font-[amma3] text-[14px] ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
                        {formatPrice(price)}
                      </span>
                      {hasDiscount && (
                        <span className='font-[amma3] text-[13px] text-gray-400 line-through'>
                          {formatPrice(comparePrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

      </div>
    </div>
  )
}

export default SearchName
