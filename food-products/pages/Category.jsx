import React from 'react'
import { Link } from 'react-router-dom'
import NavBar2 from '../components/NavBar2'
import Cart from './Cart'

const categories = [
  {
    id: 1,
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=650&fit=crop"
  },
  {
    id: 2,
    name: "Sari",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=650&fit=crop"
  },
  {
    id: 3,
    name: "Co-ord Set",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=650&fit=crop"
  },
  {
    id: 4,
    name: "Skirts",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0afe0?w=500&h=650&fit=crop"
  }
];

const Category = () => {
  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />
      <Cart />

      {/* Desktop Layout */}
      <div className='hidden md:block pt-[120px] pb-[60px]'>
        <div className='max-w-[1400px] mx-auto px-[30px]'>
          <div className='flex gap-[40px]'>
            
            {/* Left - Large Featured Image */}
            <div className='w-1/2'>
              <div className='relative overflow-hidden' style={{ height: 'calc(100vh - 160px)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&h=1300&fit=crop" 
                  alt="Featured Category"
                  className='w-full h-full object-cover'
                />
              </div>
            </div>

            {/* Right - Header + Category Grid */}
            <div className='w-1/2 flex flex-col pt-[20px]'>
              
              {/* Header Section */}
              <div className='mb-[50px]'>
                <p className='font-[amma3] text-gray-500 text-[10px] tracking-[5px] uppercase mb-[16px]'>ECHOSTUDIO</p>
                <h1 className='font-[amma4] text-gray-900 text-[32px] md:text-[40px] tracking-[5px] uppercase mb-[24px]'>Shop Category</h1>
                <Link 
                  to="/"
                  className='inline-block border border-gray-900 px-[28px] py-[12px] font-[amma3] text-[11px] tracking-[3px] uppercase text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300'
                >
                  View More
                </Link>
              </div>

              {/* Category Grid - 2x2 */}
              <div className='grid grid-cols-2 gap-x-[24px] gap-y-[30px]'>
                {categories.map((cat) => (
                  <Link 
                    key={cat.id} 
                    to="/"
                    className='group cursor-pointer'
                  >
                    <div className='relative overflow-hidden bg-gray-50 aspect-[3/4] mb-[14px]'>
                      <img 
                        src={cat.image} 
                        alt={cat.name}
                        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                      />
                    </div>
                    <h3 className='font-[amma4] text-[12px] text-gray-800 uppercase tracking-[2px] text-center'>
                      {cat.name}
                    </h3>
                  </Link>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='md:hidden pt-[110px] pb-[40px] px-[16px]'>
        
        {/* Featured Image */}
        <div className='relative overflow-hidden aspect-[3/4] mb-[30px]'>
          <img 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1200&fit=crop" 
            alt="Featured Category"
            className='w-full h-full object-cover'
          />
        </div>

        {/* Header */}
        <div className='mb-[30px]'>
          <p className='font-[amma3] text-gray-500 text-[9px] tracking-[4px] uppercase mb-[10px]'>ECHOSTUDIO</p>
          <h1 className='font-[amma4] text-gray-900 text-[24px] tracking-[4px] uppercase mb-[16px]'>Shop Category</h1>
          <Link 
            to="/"
            className='inline-block border border-gray-900 px-[20px] py-[10px] font-[amma3] text-[10px] tracking-[2px] uppercase text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300'
          >
            View More
          </Link>
        </div>

        {/* Category Grid - 2 columns */}
        <div className='grid grid-cols-2 gap-x-[16px] gap-y-[20px]'>
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              to="/"
              className='group cursor-pointer'
            >
              <div className='relative overflow-hidden bg-gray-50 aspect-[3/4] mb-[10px]'>
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                />
              </div>
              <h3 className='font-[amma4] text-[11px] text-gray-800 uppercase tracking-[1px] text-center'>
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>

      </div>

    </div>
  )
}

export default Category
