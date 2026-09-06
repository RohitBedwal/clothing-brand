import React from 'react'
import { Link } from 'react-router-dom'
import NavBar2 from '../components/NavBar2'
import Cart from './Cart'

const collections = [
  { name: "Women", slug: "women", image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=900&h=1100&fit=crop" },
  { name: "Men", slug: "men", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=1100&fit=crop" },
  { name: "Dresses", slug: "women", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&h=1100&fit=crop" },
  { name: "Sarees", slug: "women", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&h=1100&fit=crop" },
  { name: "Accessories", slug: "accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900&h=1100&fit=crop" },
  { name: "New In", slug: "women", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&h=1100&fit=crop" }
];

const Collections = () => {
  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />
      <Cart />

      <div className='pt-[80px] pb-[60px] px-[16px] w-full flex flex-col items-center'>
        
        {/* Page Title */}
        <div className='mb-[40px] text-left w-full max-w-[1100px]'>
          <h1 className='font-[amma1] text-gray-900 text-[28px] md:text-[36px] tracking-[6px] uppercase'>
            Collections
          </h1>
          <div className='w-[50px] h-[1px] bg-gray-300 mt-[16px]'></div>
        </div>

        {/* 2-Column Grid */}
        <div className='grid grid-cols-2 gap-x-[15px] gap-y-[30px] w-full max-w-[1100px]'>
          {collections.map((item, idx) => (
            <Link 
              key={idx} 
              to={`/collection/${item.slug}`}
              className='group cursor-pointer'
            >
              <div className='relative overflow-hidden bg-gray-50 aspect-[4/5] mb-[16px]'>
                <img 
                  src={item.image} 
                  alt={item.name}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300'></div>
              </div>
              <h3 className='font-[amma3] text-[13px] md:text-[14px] text-gray-400 font-light uppercase tracking-[3px] text-left pt-[12px]'>
                {item.name}
              </h3>
            </Link>
          ))}
        </div>

      </div>

    </div>
  )
}

export default Collections
