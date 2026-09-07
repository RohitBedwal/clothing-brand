import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar2 from '../components/NavBar2'

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />
      <div className='pt-[120px] pb-[80px] px-[30px] max-md:px-[16px] flex flex-col items-center justify-center text-center'>
        <p className='font-[amma4] text-[80px] md:text-[120px] text-gray-100 leading-none'>404</p>
        <h1 className='font-[amma4] text-gray-900 text-[24px] md:text-[32px] tracking-[4px] uppercase mt-[-20px] mb-[12px]'>
          Page Not Found
        </h1>
        <p className='font-[amma3] text-gray-400 text-[13px] tracking-[1px] mb-[32px] max-w-[400px]'>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className='px-[40px] py-[14px] bg-gray-900 text-white font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black transition-colors'
        >
          Go Home
        </button>
      </div>
    </div>
  )
}

export default NotFound
