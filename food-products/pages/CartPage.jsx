import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { cartOpenContext } from '../context/CartContext'
import { formatPrice } from '../src/utils/formatPrice'
import NavBar2 from '../components/NavBar2'

const FREE_SHIPPING_THRESHOLD = 15000;

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, increaseCount, decreaseCount, deleteItem, orderNote, setOrderNote, totalQuantity, subtotal } = useContext(cartOpenContext);

  const progressPercent = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  const getItemName = (item) => item.variant?.product?.name || item.product_name || item.name || 'Product';
  const getItemImage = (item) => item.variant?.product?.images?.[0]?.url || item.image_url || item.image || '/placeholder.png';
  const getItemPrice = (item) => Number(item.variant?.price || item.price || 0);
  const getItemColor = (item) => item.variant?.color || item.selectedColor || '';
  const getItemSize = (item) => item.variant?.size || item.selectedSize || '';
  const getItemQty = (item) => item.quantity || item.count || 1;
  const getItemId = (item) => item.id || item._id || item.variantId;

  if (cartItems.length === 0) {
    return (
      <div className='bg-white min-h-screen'>
        <NavBar2 />
        <div className='pt-[120px] pb-[80px] px-[30px] max-md:px-[16px] flex flex-col items-center'>
          <div className='text-center'>
            <i className="text-[60px] text-gray-200 ri-shopping-bag-line mb-[20px]"></i>
            <h2 className='font-[amma4] text-gray-900 text-[24px] tracking-[4px] uppercase mb-[12px]'>Your bag is empty</h2>
            <p className='font-[amma3] text-gray-400 text-[13px] tracking-[1px] mb-[32px]'>Explore our latest collection</p>
            <button
              onClick={() => navigate('/')}
              className='px-[40px] py-[14px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors'
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />

      <div className='pt-[100px] pb-[60px] px-[30px] max-md:px-[16px]'>
        <div className='max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-[50px]'>

          {/* LEFT — Cart Items */}
          <div className='w-full lg:w-[60%]'>
            <h1 className='font-[amma4] text-gray-900 text-[22px] tracking-[4px] uppercase mb-[30px]'>
              Bag ({totalQuantity})
            </h1>

            <div className='flex justify-between pb-[12px] border-b border-gray-200 mb-[20px]'>
              <span className='font-[amma3] text-[11px] text-gray-400 uppercase tracking-[2px]'>Product</span>
              <span className='font-[amma3] text-[11px] text-gray-400 uppercase tracking-[2px]'>Total</span>
            </div>

            {cartItems.map((item) => {
              const id = getItemId(item);
              const price = getItemPrice(item);
              const qty = getItemQty(item);
              const itemTotal = price * qty;

              return (
                <div key={id} className='flex gap-[20px] py-[24px] border-b border-gray-100'>
                  <div className='w-[100px] h-[130px] flex-shrink-0 bg-gray-50 overflow-hidden'>
                    <img
                      src={getItemImage(item)}
                      alt={getItemName(item)}
                      className='w-full h-full object-cover'
                    />
                  </div>

                  <div className='flex-1 flex justify-between'>
                    <div className='flex flex-col gap-[4px]'>
                      <h3 className='font-[amma4] text-[13px] text-gray-900 uppercase tracking-[1px]'>
                        {getItemName(item)}
                      </h3>
                      {getItemColor(item) && (
                        <p className='font-[amma3] text-[11px] text-gray-400'>
                          Color: <span className='text-gray-600'>{getItemColor(item)}</span>
                        </p>
                      )}
                      {getItemSize(item) && (
                        <p className='font-[amma3] text-[11px] text-gray-400'>
                          Size: <span className='text-gray-600'>{getItemSize(item)}</span>
                        </p>
                      )}
                      <p className='font-[amma3] text-[12px] text-gray-600 mt-[4px]'>
                        ₹{price.toLocaleString('en-IN')}
                      </p>

                      <div className='flex items-center gap-[12px] mt-[10px]'>
                        <div className='inline-flex items-center border border-gray-300'>
                          <button
                            onClick={() => decreaseCount(id)}
                            className='w-[34px] h-[34px] flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-[14px]'
                          >
                            −
                          </button>
                          <span className='w-[40px] h-[34px] flex items-center justify-center font-[amma3] text-[13px] text-gray-900 border-x border-gray-300'>
                            {qty}
                          </span>
                          <button
                            onClick={() => increaseCount(id)}
                            className='w-[34px] h-[34px] flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-[14px]'
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => deleteItem(id)}
                          className='text-gray-400 hover:text-red-500 transition-colors'
                        >
                          <i className="ri-delete-bin-line text-[16px]"></i>
                        </button>
                      </div>
                    </div>

                    <div className='text-right'>
                      <span className='font-[amma3] text-[13px] text-gray-900'>
                        ₹{itemTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className='mt-[30px]'>
              <button
                onClick={() => navigate('/')}
                className='font-[amma3] text-[12px] text-gray-500 uppercase tracking-[2px] hover:text-gray-900 transition-colors flex items-center gap-[6px]'
              >
                <svg className='w-[14px] h-[14px]' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                Continue shopping
              </button>
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className='w-full lg:w-[40%] lg:pl-[20px]'>
            <div className='lg:sticky lg:top-[100px] lg:self-start'>

              <div className='mb-[28px]'>
                <p className='font-[amma3] text-[12px] text-gray-600 mb-[10px]'>
                  {hasFreeShipping
                    ? "Congratulations! You've got free shipping."
                    : `Add ₹${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')} more for free shipping.`
                  }
                </p>
                <div className='w-full h-[3px] bg-gray-100 rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-green-500 transition-all duration-500 rounded-full'
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              <div className='border-t border-gray-200 pt-[20px] mb-[20px]'>
                <div className='flex justify-between mb-[12px]'>
                  <span className='font-[amma3] text-[13px] text-gray-900 uppercase tracking-[1px]'>Bag total</span>
                  <span className='font-[amma4] text-[14px] text-gray-900'>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <p className='font-[amma3] text-[11px] text-gray-400 mb-[24px]'>
                Tax included. Shipping calculated at checkout.
              </p>

              <button
                onClick={() => navigate('/checkout')}
                className='w-full py-[15px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors mb-[28px]'
              >
                Checkout
              </button>

              <div className='border-t border-gray-200 pt-[24px] mb-[24px]'>
                <p className='font-[amma3] text-[11px] text-gray-900 uppercase tracking-[2px] mb-[6px]'>Order Note</p>
                <p className='font-[amma3] text-[11px] text-gray-400 mb-[10px]'>Add a note to your order</p>
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder='Write your comment for seller here'
                  className='w-full h-[100px] border border-gray-200 p-[12px] font-[amma3] text-[12px] text-gray-600 placeholder-gray-300 resize-none focus:outline-none focus:border-gray-400 transition-colors'
                ></textarea>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;
