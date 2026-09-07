import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar2 from '../components/NavBar2'

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />

      <div className='pt-[120px] pb-[80px] px-[30px] max-md:px-[16px] flex flex-col items-center'>
        <div className='text-center max-w-[400px]'>

          {/* Checkmark */}
          <div className='w-[70px] h-[70px] bg-green-500 rounded-full flex items-center justify-center mx-auto mb-[28px]'>
            <svg className='w-[36px] h-[36px] text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className='font-[amma4] text-gray-900 text-[28px] tracking-[5px] uppercase mb-[12px]'>
            Order Confirmed
          </h1>

          <p className='font-[amma3] text-gray-500 text-[14px] mb-[8px]'>
            Thank you for your order.
          </p>

          <p className='font-[amma3] text-gray-400 text-[13px] mb-[36px]'>
            Order <span className='text-gray-700 font-[amma4]'>#{orderId}</span>
          </p>

          <div className='flex flex-col gap-[12px]'>
            <button
              onClick={() => navigate('/')}
              className='w-full py-[14px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors'
            >
              Continue Shopping
            </button>
          </div>

          <p className='font-[amma3] text-gray-400 text-[11px] mt-[24px]'>
            A confirmation email has been sent to your email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
