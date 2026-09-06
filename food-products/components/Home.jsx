import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import SortingBox from './SortingBox'
import SideBar from './SideBar'
import NavBar2 from './NavBar2'
import FashionCard from './FashionCard'
import Header from './Header'
import Cart from '../pages/Cart'

const newArrivals = [
  { id: 1, name: "Silk Wrap Dress", price: 289, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop" },
  { id: 2, name: "Tailored Wool Blazer", price: 425, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop" },
  { id: 3, name: "Draped Satin Blouse", price: 195, image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop" },
  { id: 4, name: "Italian Leather Crossbody", price: 340, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop" },
  { id: 5, name: "Ribbed Knit Dress", price: 245, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop" },
  { id: 6, name: "Wrap Front Jumpsuit", price: 310, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&q=80" },
  { id: 7, name: "Pleated Midi Skirt", price: 220, image: "https://images.unsplash.com/photo-1583496661160-fb5886a0afe0?w=600&h=800&fit=crop" },
  { id: 8, name: "Cashmere Sweater", price: 195, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop" },
];

const bestSellers = [
  { id: 9, name: "Structured Leather Jacket", price: 595, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop" },
  { id: 10, name: "Embroidered Organza Saree", price: 850, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop" },
  { id: 11, name: "Wool Blend Overcoat", price: 485, image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop" },
  { id: 12, name: "Tulle Layered Gown", price: 1200, image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop" },
  { id: 13, name: "Cashmere Oversized Sweater", price: 195, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop" },
  { id: 14, name: "Merino Wool Turtleneck", price: 145, image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a00?w=600&h=800&fit=crop" },
  { id: 15, name: "Linen Wide-Leg Trousers", price: 175, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop" },
  { id: 16, name: "Silk Camisole Top", price: 165, image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop" },
];

const ITEMS_PER_VIEW = 4;

const Home = () => {
  const[ascName,setAscName]= useState(false);
  const[descName,setDescName]= useState(false);
  const[ascGrade,setAscGrade]= useState(false);
  const[descGrade,setDescGrade]= useState(false);
  const navigate = useNavigate();

  const [newArrivalsIndex, setNewArrivalsIndex] = useState(0);
  const [bestSellersIndex, setBestSellersIndex] = useState(0);

  const newArrivalsTotal = Math.ceil(newArrivals.length / ITEMS_PER_VIEW);
  const bestSellersTotal = Math.ceil(bestSellers.length / ITEMS_PER_VIEW);

  const nextNewArrivals = () => setNewArrivalsIndex((prev) => (prev + 1) % newArrivalsTotal);
  const prevNewArrivals = () => setNewArrivalsIndex((prev) => (prev - 1 + newArrivalsTotal) % newArrivalsTotal);

  const nextBestSellers = () => setBestSellersIndex((prev) => (prev + 1) % bestSellersTotal);
  const prevBestSellers = () => setBestSellersIndex((prev) => (prev - 1 + bestSellersTotal) % bestSellersTotal);

  return (
    <div className='bg-white'>
      <NavBar2/>
      <Cart/>
      
      {/* Hero Section */}
      <div className='h-[70vh] md:h-[85vh] overflow-hidden mt-[110px] relative'>
        <img 
          className='w-full h-full object-cover' 
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=1080&fit=crop" 
          alt="Fashion Editorial" 
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent'></div>
        <div className='absolute bottom-[60px] left-[40px] md:left-[80px] max-md:bottom-[40px] max-md:left-[20px]'>
          <p className='font-[amma3] text-white/80 text-[12px] md:text-[14px] tracking-[6px] uppercase mb-[12px]'>Spring/Summer 2026</p>
          <h1 className='font-[amma4] text-white text-[36px] md:text-[56px] tracking-[4px] uppercase leading-tight'>The New<br/>Silhouette</h1>
          <button className='mt-[24px] px-[32px] py-[12px] bg-white text-black font-[amma3] text-[12px] tracking-[3px] uppercase hover:bg-black hover:text-white transition-all duration-300'>
            Explore Collection
          </button>
        </div>
      </div>

      {/* New Arrivals Slider */}
      <div className='py-[20px] md:py-[30px] px-[30px] max-md:px-[16px] overflow-hidden'>
        <div className='text-center mb-[40px]'>
          <p className='font-[amma3] text-gray-400 text-[11px] tracking-[4px] uppercase mb-[8px]'>Just Dropped</p>
          <h2 className='font-[amma4] text-gray-900 text-[24px] md:text-[32px] tracking-[3px] uppercase'>New Arrivals</h2>
        </div>
        
        <div className='relative'>
          <div className='overflow-hidden'>
            <div 
              className='flex transition-transform duration-500 ease-in-out'
              style={{ transform: `translateX(-${newArrivalsIndex * 100}%)` }}
            >
              {Array.from({ length: newArrivalsTotal }).map((_, slideIdx) => (
                <div key={slideIdx} className='min-w-full grid grid-cols-2 md:grid-cols-4 gap-x-[16px] gap-y-[30px]'>
                  {newArrivals.slice(slideIdx * ITEMS_PER_VIEW, slideIdx * ITEMS_PER_VIEW + ITEMS_PER_VIEW).map((item) => (
                    <div key={item.id} className='group cursor-pointer' onClick={() => navigate('/productDetails', { state: { product: {...item, brand: "ECHO STUDIO"} } })}>
                      <div className='relative overflow-hidden bg-gray-50 aspect-[3/4] mb-[12px]'>
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                        />
                        <div className='absolute top-[10px] left-[10px] px-[8px] py-[4px] bg-black text-white text-[9px] font-[amma3] tracking-[2px] uppercase'>
                          New
                        </div>
                      </div>
                      <h3 className='font-[amma4] text-[13px] text-gray-900 uppercase tracking-[1px] mb-[4px] truncate text-center'>{item.name}</h3>
                      <p className='font-[amma3] text-[13px] text-gray-700 text-center'>${item.price}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Slider Arrows */}
          <div className='flex justify-center items-center gap-[12px] mt-[30px]'>
            <button 
              onClick={prevNewArrivals}
              className='w-[36px] h-[36px] border border-gray-300 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors'
            >
              <i className="ri-arrow-left-s-line text-[18px]"></i>
            </button>
            <div className='flex gap-[6px]'>
              {Array.from({ length: newArrivalsTotal }).map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setNewArrivalsIndex(idx)}
                  className={`w-[6px] h-[6px] rounded-full transition-colors ${
                    newArrivalsIndex === idx ? 'bg-black' : 'bg-gray-300'
                  }`}
                ></button>
              ))}
            </div>
            <button 
              onClick={nextNewArrivals}
              className='w-[36px] h-[36px] border border-gray-300 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors'
            >
              <i className="ri-arrow-right-s-line text-[18px]"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Shop by Category - Editorial Layout */}
      <div className='py-[30px] md:py-[40px] px-[30px] max-md:px-[16px]'>
        <div className='flex gap-[30px] max-w-[1400px] mx-auto'>
          
          {/* Left - Large Featured Image */}
          <div className='w-1/2 max-md:w-full max-md:hidden'>
            <div className='relative overflow-hidden h-[700px]'>
              <img 
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&h=1300&fit=crop" 
                alt="Featured Category"
                className='w-full h-full object-cover'
              />
            </div>
          </div>

          {/* Right - Header + Category Grid */}
          <div className='w-1/2 max-md:w-full flex flex-col gap-[50px]'>
            
            {/* Header Section */}
            <div>
              <p className='font-[amma3] text-gray-500 text-[10px] tracking-[5px] uppercase mb-[12px]'>ECHOSTUDIO</p>
              <h2 className='font-[amma4] text-gray-900 text-[24px] md:text-[32px] tracking-[4px] uppercase mb-[20px]'>Shop Category</h2>
              <Link 
                to="/collections"
                className='inline-block border border-gray-900 px-[32px] py-[14px] font-[amma3] text-[11px] tracking-[3px] uppercase text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300'
              >
                View More
              </Link>
            </div>

            {/* Category Grid - 2x2 */}
            <div className='grid grid-cols-2 gap-x-[20px] gap-y-[16px]'>
              {[
                { name: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=650&fit=crop" },
                { name: "Sari", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=650&fit=crop" },
                { name: "Co-ord Set", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=650&fit=crop" },
                { name: "Skirts", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0afe0?w=500&h=650&fit=crop" }
              ].map((cat, idx) => (
                <Link 
                  key={idx} 
                  to="/collections"
                  className='group cursor-pointer'
                >
                  <div className='relative overflow-hidden bg-gray-50 aspect-[4/5] mb-[8px]'>
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                  </div>
                  <h3 className='font-[amma4] text-[11px] text-gray-800 uppercase tracking-[2px] text-center'>
                    {cat.name}
                  </h3>
                </Link>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Best Sellers Slider */}
      <div className='py-[60px] md:py-[80px] px-[30px] max-md:px-[16px] border-t border-gray-100 overflow-hidden'>
        <div className='text-center mb-[40px]'>
          <p className='font-[amma3] text-gray-400 text-[11px] tracking-[4px] uppercase mb-[8px]'>Customer Favorites</p>
          <h2 className='font-[amma4] text-gray-900 text-[24px] md:text-[32px] tracking-[3px] uppercase'>Best Sellers</h2>
        </div>
        
        <div className='relative'>
          <div className='overflow-hidden'>
            <div 
              className='flex transition-transform duration-500 ease-in-out'
              style={{ transform: `translateX(-${bestSellersIndex * 100}%)` }}
            >
              {Array.from({ length: bestSellersTotal }).map((_, slideIdx) => (
                <div key={slideIdx} className='min-w-full grid grid-cols-2 md:grid-cols-4 gap-x-[16px] gap-y-[30px]'>
                  {bestSellers.slice(slideIdx * ITEMS_PER_VIEW, slideIdx * ITEMS_PER_VIEW + ITEMS_PER_VIEW).map((item) => (
                    <div key={item.id} className='group cursor-pointer' onClick={() => navigate('/productDetails', { state: { product: {...item, brand: "ECHO STUDIO"} } })}>
                      <div className='relative overflow-hidden bg-gray-50 aspect-[3/4] mb-[12px]'>
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                        />
                      </div>
                      <h3 className='font-[amma4] text-[13px] text-gray-900 uppercase tracking-[1px] mb-[4px] truncate text-center'>{item.name}</h3>
                      <p className='font-[amma3] text-[13px] text-gray-700 text-center'>${item.price}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Slider Arrows */}
          <div className='flex justify-center items-center gap-[12px] mt-[30px]'>
            <button 
              onClick={prevBestSellers}
              className='w-[36px] h-[36px] border border-gray-300 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors'
            >
              <i className="ri-arrow-left-s-line text-[18px]"></i>
            </button>
            <div className='flex gap-[6px]'>
              {Array.from({ length: bestSellersTotal }).map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setBestSellersIndex(idx)}
                  className={`w-[6px] h-[6px] rounded-full transition-colors ${
                    bestSellersIndex === idx ? 'bg-black' : 'bg-gray-300'
                  }`}
                ></button>
              ))}
            </div>
            <button 
              onClick={nextBestSellers}
              className='w-[36px] h-[36px] border border-gray-300 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors'
            >
              <i className="ri-arrow-right-s-line text-[18px]"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Full Shop Section */}
      <div className='border-t border-gray-100'>
        <SortingBox setAscName={setAscName} setDescName={setDescName} setAscGrade={setAscGrade} setDescGrade={setDescGrade} />
        <FashionCard ascName={ascName} descName={descName} ascGrade={ascGrade} descGrade={descGrade} />
      </div>
    
    </div>
  )
}

export default Home
