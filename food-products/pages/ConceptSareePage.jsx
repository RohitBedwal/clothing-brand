import React from 'react'
import NavBar2 from '../components/NavBar2'
import { fashionProducts } from '../components/FashionCard'

const conceptSareeProducts = fashionProducts.filter((_, i) => i % 3 === 0).map((p) => ({
  ...p,
  category: 'Concept Saree',
}))

const ConceptSareePage = () => {
  return (
    <div className='bg-white min-h-screen'>
      <NavBar2 />

      <div className='pt-[110px] pb-[80px]'>
        <div className='px-[30px] max-md:px-[16px] max-w-[1200px] mx-auto mb-[60px]'>
          <p className='font-[amma3] text-[11px] text-gray-400 uppercase tracking-[4px] mb-[12px]'>ECHO STUDIO</p>
          <h1 className='font-[amma4] text-[36px] md:text-[52px] text-gray-900 uppercase tracking-[6px] mb-[24px] leading-tight'>
            Concept Saree Dresses
          </h1>
          <div className='w-[40px] h-[1px] bg-gray-900 mb-[24px]'></div>
          <p className='font-[amma3] text-[14px] text-gray-500 uppercase tracking-[1px] leading-relaxed max-w-[700px]'>
            A modern reinterpretation of India's most iconic garment. Our concept saree dresses merge the fluid elegance of traditional draping with contemporary silhouettes, creating pieces that honor heritage while embracing the now. Each design is meticulously crafted to deliver the drama of a saree with the ease of a single garment.
          </p>
        </div>

        <div className='bg-gray-100 h-[400px] max-md:h-[250px] mb-[48px] mx-[30px] max-md:mx-[16px] flex items-center justify-center'>
          <p className='font-[amma3] text-[12px] text-gray-400 uppercase tracking-[4px]'>Editorial Image</p>
        </div>

        <div className='px-[30px] max-md:px-[16px] max-w-[1200px] mx-auto'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[20px] gap-y-[40px]'>
            {conceptSareeProducts.map((product) => (
              <div key={product.id} className='group cursor-pointer'>
                <div className='relative overflow-hidden bg-gray-50 aspect-[3/4] mb-[16px]'>
                  <img
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                    src={product.image}
                    alt={product.name}
                  />

                  <div className={`absolute bottom-[12px] right-[12px] h-[40px] w-[40px] bg-white flex items-center justify-center transition-all duration-300 shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black hover:text-white`}>
                    <i className="ri-shopping-bag-line text-[16px]"></i>
                  </div>
                  <div className={`absolute bottom-[12px] right-[60px] h-[40px] w-[40px] bg-white flex items-center justify-center transition-all duration-300 shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black hover:text-white`}>
                    <i className="ri-eye-line text-[16px]"></i>
                  </div>
                </div>

                <div className='px-[4px]'>
                  <p className='font-[amma3] text-[11px] text-gray-400 uppercase tracking-[2px] mb-[4px]'>{product.category}</p>
                  <h3 className='font-[amma4] text-[14px] text-gray-900 uppercase tracking-[1px] mb-[6px] leading-tight'>{product.name}</h3>
                  <div className='flex items-center gap-[8px]'>
                    <span className={`font-[amma3] text-[14px] ${product.originalPrice ? 'text-red-600' : 'text-gray-900'}`}>
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className='font-[amma3] text-[13px] text-gray-400 line-through'>
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConceptSareePage
