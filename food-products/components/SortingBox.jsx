import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'

const SortingBox = ({setAscName,setAscGrade,setDescName,setDescGrade}) => {
  


  const [sortbox,setSortBox] = useState(false);
  const box = useRef(null)
  useGSAP(() => {
       
   
       if(sortbox){
        gsap.to(box.current, {
           x:0, 
          duration:.3,
         opacity:1,
         display:"block",
         
         
      }
      )
       
    }
    else{
      gsap.to(box.current, {
        x:195,
        
        duration:.3,
        display:"none",
       opacity:0})

    }



}, [sortbox])




  return (
    <div className='h-[100px] relative'>
                <div className='flex justify-between h-[60px] border-b border-gray-100 w-full bg-white items-center px-[30px] max-md:px-[16px]'>
            
            <div className='font-[amma4] text-gray-800 pr-[40px] border-r border-gray-200 h-full items-center flex text-[18px] tracking-[4px] uppercase'>Shop All</div>
           
            <div onClick={()=>{sortbox?setSortBox(false):setSortBox(true)}} className='h-full cursor-pointer px-[40px] border-l border-gray-200 flex items-center'>
                <p className='font-[amma3] text-gray-500 pr-[10px] uppercase text-[11px] tracking-[2px]'>Sort by</p>
                <i className="text-[14px] ri-arrow-down-s-line text-gray-500"></i>
            
        </div>
                </div>
                <div ref={box} className='w-[200px] opacity-0 border border-gray-100 bg-white z-20 right-[30px] top-[60px] absolute h-max overflow-hidden shadow-sm'>
                    <h3 onClick={()=>{setAscName(true)
                    setSortBox(false)
                    setAscGrade(false)
                    setDescGrade(false)
                    setDescName(false)
                    }} className='pl-[20px] hover:bg-gray-50 transition-all duration-300 cursor-pointer pt-[16px] font-[amma3] text-[13px] capitalize text-gray-500'>Name, A - Z</h3>
                    <h3 onClick={()=>{setAscName(false)
                    setAscGrade(false)
                    setDescGrade(false)
                    setDescName(true)
                    setSortBox(false)

                    }} className='pl-[20px] hover:bg-gray-50 transition-all duration-300 cursor-pointer pt-[16px] font-[amma3] text-[13px] capitalize text-gray-500'>Name, Z - A</h3>
                    <h3 onClick={()=>{setAscName(false)
                    setAscGrade(true)
                    setDescGrade(false)
                    setDescName(false)
                    setSortBox(false)

                    }} className='pl-[20px] hover:bg-gray-50 transition-all duration-300 pt-[16px] cursor-pointer font-[amma3] text-[13px] capitalize text-gray-500'>Price, High to Low</h3>
                    <h3 onClick={()=>{setAscName(false)
                    setAscGrade(false)
                    setDescGrade(true)
                    setDescName(false)
                    setSortBox(false)

                    }} className='pl-[20px] hover:bg-gray-50 transition-all duration-300 cursor-pointer py-[16px] font-[amma3] text-[13px] capitalize text-gray-500'>Price, Low to High</h3>
                </div>
                </div>
  )
}

export default SortingBox
