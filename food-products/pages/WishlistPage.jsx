import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { wishlistContext } from '../context/WishlistContext'
import { cartOpenContext } from '../context/CartContext'
import { quickViewContext } from '../context/QuickViewContext'
import NavBar2 from '../components/NavBar2'

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useContext(wishlistContext);
  const { addToCart } = useContext(cartOpenContext);
  const { openQuickView } = useContext(quickViewContext);
  const navigate = useNavigate();

  const handleAddToBag = (product) => {
    addToCart(product);
    removeFromWishlist(product._id);
  };

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />
      <div className='pt-[110px] pb-[80px] px-[30px] max-md:px-[16px] max-w-[1200px] mx-auto'>
        <h1 className='font-[amma4] text-gray-900 text-[22px] tracking-[4px] uppercase mb-[32px]'>Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className='border border-gray-200 p-[80px] text-center'>
            <i className='ri-heart-line text-[56px] text-gray-200 mb-[20px]'></i>
            <p className='font-[amma3] text-gray-400 text-[14px] mb-[24px]'>Your wishlist is empty.</p>
            <Link to='/collections' className='inline-block py-[14px] px-[32px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors'>
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px]'>
            {wishlistItems.map(product => (
              <div key={product._id} className='group border border-gray-200 overflow-hidden hover:border-gray-900 transition-colors'>
                <div className='relative aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer' onClick={() => navigate(`/product/${product.id}`)}>
                  {product.image && <img src={product.image} alt={product.name} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />}
                  <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors'></div>
                  <button onClick={(e) => { e.stopPropagation(); removeFromWishlist(product._id); }} className='absolute top-[12px] right-[12px] w-[32px] h-[32px] bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white'>
                    <i className='ri-close-line text-[16px] text-gray-600'></i>
                  </button>
                </div>
                <div className='p-[14px]'>
                  <p className='font-[amma4] text-gray-900 text-[13px] truncate'>{product.name}</p>
                  <p className='font-[amma3] text-gray-900 text-[13px] mt-[4px]'>₹{product.price?.toLocaleString('en-IN')}</p>
                  <div className='flex gap-[8px] mt-[12px]'>
                    <button onClick={() => handleAddToBag(product)} className='flex-1 py-[8px] bg-gray-900 text-white font-[amma3] text-[10px] tracking-[2px] uppercase hover:bg-black transition-colors'>
                      Add to Bag
                    </button>
                    <button onClick={() => openQuickView(product)} className='py-[8px] px-[10px] border border-gray-300 text-gray-600 hover:border-gray-900 transition-colors'>
                      <i className='ri-eye-line text-[14px]'></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
