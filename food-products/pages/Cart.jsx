import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { cartOpenContext } from '../context/CartContext'


const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart, cartItems, clearCart, addToCart, removeFromCart } = useContext(cartOpenContext)
  const openSiderBarRef = useRef(null);
  const blackbox = useRef(null);

  useGSAP(() => {
    if (cart) {
      gsap.to(openSiderBarRef.current, {
        right: 0,
        opacity: 1,
        duration: .55,
      })
      gsap.to(blackbox.current, {
        x: "0%",
        duration: .001
      })
    }
    else {
      gsap.to(openSiderBarRef.current, {
        right: -500,
        duration: .55,
      })
      gsap.to(blackbox.current, {
        x: "-100%",
        duration: .001
      })
    }
  }, [cart])

  const handleViewBag = () => {
    setCart(false);
    navigate('/cart');
  };

  return (
    <>
      <div ref={blackbox} onClick={() => { setCart(false) }} className='bg-black opacity-30 w-full h-screen -x-[100%] z-40 fixed'>
      </div>
      <div className='w-full flex flex-col items-end'>

        <div ref={openSiderBarRef} className='bg-white h-full w-[400px] max-md:w-[320px] justify-end opacity-0 fixed z-50'>

          <div className='flex justify-between px-[28px] py-[20px] items-center border-b border-gray-100'>
            <div className='flex justify-between w-full h-[40px] items-center'>
              <h2 className='font-[amma4] text-gray-900 tracking-[4px] uppercase text-[16px]'>Your Bag</h2>
              <h3 onClick={() => { setCart(false) }} className='cursor-pointer'>
                <i className="text-[18px] text-gray-400 ri-close-line hover:text-gray-900 transition-colors"></i>
              </h3>
            </div>
          </div>

          <div className='px-[28px] pb-[120px] w-full h-full overflow-scroll'>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => {
                  return (
                    <div key={item._id || item.id} className='py-[24px] border-b border-gray-50'>
                      <div className='h-[140px] flex gap-[16px] bg-white w-full'>
                        <img className='h-[140px] w-[110px] object-cover' src={item.image_url || item.image} alt="" />
                        <div className='flex-col flex gap-[8px] justify-center flex-1'>
                          <div className='gap-[4px] flex flex-col'>
                            <h4 className='font-[amma3] text-[10px] text-gray-400 uppercase tracking-[2px]'>{item.brands || 'Echo Studio'}</h4>
                            <h3 className='font-[amma4] tracking-[2px] text-[14px] text-gray-900 uppercase'>{item.product_name || item.name}</h3>
                          </div>
                          <div className='flex gap-[12px] items-center mt-[8px]'>
                            <div className='flex border border-gray-200 w-max'>
                              <i onClick={() => removeFromCart(item._id || item.id)} className="text-[12px] py-[6px] px-[12px] ri-subtract-line text-gray-500 hover:text-gray-900 cursor-pointer transition-colors"></i>
                              <p className='py-[6px] text-[12px] px-[12px] text-gray-900'>{item.count}</p>
                              <i onClick={() => addToCart(item)} className="py-[6px] px-[12px] text-[12px] ri-add-line text-gray-500 hover:text-gray-900 cursor-pointer transition-colors"></i>
                            </div>
                            <button onClick={() => { clearCart(item._id || item.id) }} className='text-[11px] text-gray-400 uppercase tracking-[1px] hover:text-gray-900 transition-colors border-b border-gray-300'>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : (
              <div className='w-full flex items-center justify-center h-[400px]'>
                <div className='text-center'>
                  <i className="text-[48px] text-gray-200 ri-shopping-bag-line mb-[16px]"></i>
                  <p className='text-[16px] text-gray-500 font-[amma4] uppercase tracking-[3px] mb-[8px]'>Your bag is empty</p>
                  <p className='font-[amma3] text-[12px] text-gray-400'>Explore our latest collection</p>
                </div>
              </div>
            )}
          </div>

          {/* View Bag Button */}
          {cartItems.length > 0 && (
            <div className='absolute bottom-0 left-0 right-0 px-[28px] py-[20px] bg-white border-t border-gray-100'>
              <button
                onClick={handleViewBag}
                className='w-full py-[14px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors'
              >
                View Bag
              </button>
            </div>
          )}

        </div>

      </div>

    </>
  )
}

export default Cart
