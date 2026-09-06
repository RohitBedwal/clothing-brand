import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useContext, useRef, useState } from 'react'
import { ContextApi } from '../context/InputContext';
import { Link, useNavigate } from 'react-router-dom';
import { sideBarContext } from '../context/CategoryContext';
import { cartOpenContext } from '../context/CartContext';

const NavBar2 = ({setSearchName}) => {
    const {input,setInput} = useContext(ContextApi)
    const {setOpen} = useContext(sideBarContext)
    const{setCart} = useContext(cartOpenContext)
    const blackbox = useRef(null); 
    const navigate = useNavigate();
    
    function submitHandler(e){
        e.preventDefault(); 
        navigate('/search');
        setSearchName(true)
        setSearchBar(false); 
    }


    const CloseRef = useRef(null);
    const[searchBar,setSearchBar] = useState(false)
    useGSAP(() => {
       
            if(searchBar){
                gsap.to(CloseRef.current, {
                    transform:"translateY(100%)",
                     duration:.3,
                     opacity:100
                 }
                 )
                 gsap.to(blackbox.current,{
                    y:"0%",
                    duration:.001,
                    
                })
            }
           else{
                gsap.to(CloseRef.current, {
                    transform:"translateY(0%)",
                    duration:.3,
                    opacity:0
                 }
                 )
                
                 gsap.to(blackbox.current,{
                    y:"-100%",
                    duration:.001,
                    
                })
        

            }


    }, [searchBar])
    



  return (
    <div>
        
        <div ref={CloseRef} className='flex justify-between h-[80px] border-b border-gray-100 fixed w-full mt-[30px] bg-white z-30 items-center px-[30px] max-md:px-[16px]'>
            <div className='font-[amma4] text-gray-900 text-[22px] tracking-[8px] uppercase'>Echo Studio</div>
            
            <div className='hidden md:flex items-center gap-x-[30px] text-[13px] font-[amma3] tracking-[3px] uppercase text-gray-700'>
                <Link to="/" className='hover:text-black transition-colors cursor-pointer'>Shop</Link>
                <Link to="/new-arrivals" className='hover:text-black transition-colors cursor-pointer'>New Arrivals</Link>
                <Link to="/category" className='hover:text-black transition-colors cursor-pointer'>Women</Link>
                <span className='hover:text-black transition-colors cursor-pointer'>Men</span>
                <Link to="/collections" className='hover:text-black transition-colors cursor-pointer'>Collections</Link>
                <span className='hover:text-black transition-colors cursor-pointer'>About</span>
            </div>
            
            <div className='flex gap-x-[20px] items-center'>
                <i onClick={()=>{!searchBar?setSearchBar(true):setSearchBar(false)}} className="text-[18px] cursor-pointer ri-search-line text-gray-800 hover:text-black transition-colors"></i>
                <i className="text-[18px] ri-user-3-line cursor-pointer text-gray-800 hover:text-black transition-colors"></i>
                <i onClick={()=>{setCart(true)}} className="text-[18px] ri-shopping-cart-line cursor-pointer text-gray-800 hover:text-black transition-colors"></i>
            </div>
            
        </div>

       
       
            <div ref={CloseRef} className='flex items-center opacity-0 gap-x-[5px] h-[70px] fixed w-full mt-[30px] top-0 translate-y-full z-10 bg-white px-[40px] max-md:px-[20px]'>
            <i className="text-[18px] ri-search-line text-gray-400"></i>
           <form className='w-[100%] text-center px-[5px]' action="" onSubmit={(e)=>{submitHandler(e)}}>
            <input onChange={(e)=>setInput(e.target.value)} value={input} className='focus:outline-none w-[100%] h-[40px] uppercase font-[amma3] text-[14px] tracking-[2px] placeholder-gray-400' type="text" placeholder='Search collections...' />
           </form>
           <button onClick={()=>{setSearchBar(false)}}><i className="text-[17px] cursor-pointer ri-close-large-fill text-gray-400"></i></button>
        
           <div>
           </div>
        </div>
    </div>
  )
}

export default NavBar2
