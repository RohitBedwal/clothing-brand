import React, { useState } from 'react'
import Header from '../components/Header';
import NavBar2 from '../components/NavBar2';
import SideBar from '../components/SideBar';
import SortingBox from '../components/SortingBox';
import FashionCard from '../components/FashionCard';
import Cart from '../pages/Cart';


const ProductByCategory = () => {
    
      const[ascName,setAscName]= useState(false);
        const[descName,setDescName]= useState(false);
        const[ascGrade,setAscGrade]= useState(false);
        const[descGrade,setDescGrade]= useState(false);
      

  return (
    <div className='bg-white'>
    <Header/>
    <NavBar2/>
    <Cart/>
    <SideBar />
    
    <div className='h-[50vh] md:h-[60vh] overflow-hidden mt-[110px] relative'>
      <img 
        className='w-full h-full object-cover' 
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop" 
        alt="Collection" 
      />
      <div className='absolute inset-0 bg-black/30'></div>
      <div className='absolute inset-0 flex items-center justify-center'>
        <h1 className='font-[amma4] text-white text-[32px] md:text-[48px] tracking-[6px] uppercase'>Collection</h1>
      </div>
    </div>

  <SortingBox setAscName={setAscName} setDescName={setDescName} setAscGrade={setAscGrade} setDescGrade={setDescGrade} />
  <FashionCard ascName={ascName} descName={descName} ascGrade={ascGrade} descGrade={descGrade} />
  </div>
  )
}

export default ProductByCategory
