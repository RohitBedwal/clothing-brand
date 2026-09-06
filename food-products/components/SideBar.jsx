import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useContext, useRef } from 'react'
import { sideBarContext } from '../context/CategoryContext'

const fashionCategories = [
  { name: "New Arrivals", count: 48 },
  { name: "Dresses", count: 32 },
  { name: "Tops & Blouses", count: 28 },
  { name: "Trousers & Jeans", count: 24 },
  { name: "Jackets & Coats", count: 18 },
  { name: "Knitwear", count: 22 },
  { name: "Skirts", count: 16 },
  { name: "Suits & Tailoring", count: 14 },
  { name: "Sarees", count: 20 },
  { name: "Accessories", count: 36 },
  { name: "Bags", count: 26 },
  { name: "Jewelry", count: 30 },
  { name: "Shoes", count: 34 },
  { name: "Sale", count: 42 }
];

const SideBar = () => {
    const { open, setOpen } = useContext(sideBarContext)
   
    const openSiderBarRef = useRef(null);
    const blackbox = useRef(null);
    useGSAP(() => {
        if (open) {
            gsap.to(openSiderBarRef.current, {
                left: 0,
                opacity: 1,
                duration: .35,
            })
            gsap.to(blackbox.current, {
                x: "0%",
                duration: .001
            })
        }
        else {
            gsap.to(openSiderBarRef.current, {
                left: -400,
                duration: .35,
                opacity: 0
            })
            gsap.to(blackbox.current, {
                x: "-100%",
                duration: .001
            })
        }
    }, [open])

    return (
        <>
            <div ref={blackbox} onClick={() => { setOpen(false) }} className='bg-black opacity-30 w-full h-screen -x-[100%] z-40 fixed'>
            </div>
            <div ref={openSiderBarRef} className='bg-white h-full w-[350px] max-md:w-[300px] opacity-0 overflow-scroll fixed z-50'>
                <div className='p-[24px] border-b border-gray-100'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-[amma4] uppercase text-[18px] tracking-[3px] text-gray-900'>Menu</h2>
                        <button onClick={() => { setOpen(false) }}>
                            <i className="text-[18px] cursor-pointer ri-close-line text-gray-500 hover:text-gray-900 transition-colors"></i>
                        </button>
                    </div>
                </div>
                
                <div className='py-[16px]'>
                    {fashionCategories.map((category, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => { setOpen(false) }}
                            className='flex justify-between py-[14px] items-center mx-[24px] border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer px-[8px]'
                        >
                            <h2 className='font-[amma3] text-gray-700 uppercase text-[13px] tracking-[1px]'>
                                {category.name}
                                <span className='pl-[6px] text-gray-400'>({category.count})</span>
                            </h2>
                            <h3 className='font-[amma3] text-[14px]'>
                                <i className="text-[16px] ri-arrow-right-s-line text-gray-400"></i>
                            </h3>
                        </div>
                    ))}
                </div>

                <div className='p-[24px] border-t border-gray-100 mt-[16px]'>
                    <div className='text-center'>
                        <p className='font-[amma3] text-[11px] text-gray-400 tracking-[2px] uppercase mb-[8px]'>Need Help?</p>
                        <p className='font-[amma3] text-[13px] text-gray-600'>+1 (800) ECHO-STU</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar
