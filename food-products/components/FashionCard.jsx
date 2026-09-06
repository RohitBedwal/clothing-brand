import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cartOpenContext } from '../context/CartContext';

const fashionProducts = [
  {
    id: 1,
    name: "Silk Wrap Dress",
    category: "Women",
    price: 289,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    badge: "NEW",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 2,
    name: "Tailored Wool Blazer",
    category: "Men",
    price: 425,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    badge: null,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Cashmere Oversized Sweater",
    category: "Women",
    price: 195,
    originalPrice: 260,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
    badge: "SALE",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 4,
    name: "Linen Wide-Leg Trousers",
    category: "Women",
    price: 175,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&q=80",
    badge: null,
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 5,
    name: "Structured Leather Jacket",
    category: "Men",
    price: 595,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
    badge: "BESTSELLER",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 6,
    name: "Embroidered Organza Saree",
    category: "Women",
    price: 850,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
    badge: "LIMITED",
    sizes: ["Free Size"]
  },
  {
    id: 7,
    name: "Merino Wool Turtleneck",
    category: "Men",
    price: 145,
    originalPrice: 195,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a00?w=600&h=800&fit=crop",
    badge: "SALE",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 8,
    name: "Pleated Midi Skirt",
    category: "Women",
    price: 220,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0afe0?w=600&h=800&fit=crop",
    badge: null,
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 9,
    name: "Slim Fit Chinos",
    category: "Men",
    price: 125,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop",
    badge: null,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 10,
    name: "Quilted Down Vest",
    category: "Women",
    price: 275,
    originalPrice: 350,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
    badge: "SALE",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 11,
    name: "Italian Leather Crossbody",
    category: "Accessories",
    price: 340,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop",
    badge: "NEW",
    sizes: ["One Size"]
  },
  {
    id: 12,
    name: "Cotton Poplin Shirt",
    category: "Men",
    price: 165,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop",
    badge: null,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 13,
    name: "Draped Satin Blouse",
    category: "Women",
    price: 195,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop",
    badge: "NEW",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 14,
    name: "Wool Blend Overcoat",
    category: "Men",
    price: 485,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop",
    badge: null,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 15,
    name: "Chain Link Bracelet",
    category: "Accessories",
    price: 125,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=800&fit=crop",
    badge: null,
    sizes: ["One Size"]
  },
  {
    id: 16,
    name: "High-Rise Straight Jeans",
    category: "Women",
    price: 155,
    originalPrice: 195,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop",
    badge: "SALE",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 17,
    name: "Striped Knit Polo",
    category: "Men",
    price: 135,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1625910513413-5fc3e91f9397?w=600&h=800&fit=crop",
    badge: null,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 18,
    name: "Tulle Layered Gown",
    category: "Women",
    price: 1200,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop",
    badge: "LIMITED",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 19,
    name: "Canvas Weekender Bag",
    category: "Accessories",
    price: 215,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
    badge: null,
    sizes: ["One Size"]
  },
  {
    id: 20,
    name: "Ribbed Knit Dress",
    category: "Women",
    price: 245,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
    badge: "NEW",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 21,
    name: "Denim Utility Jacket",
    category: "Men",
    price: 225,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop",
    badge: null,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 22,
    name: "Velvet Evening Clutch",
    category: "Accessories",
    price: 175,
    originalPrice: 225,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop",
    badge: "SALE",
    sizes: ["One Size"]
  },
  {
    id: 23,
    name: "Corduroy Button-Down",
    category: "Men",
    price: 145,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop&q=80",
    badge: null,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 24,
    name: "Wrap Front Jumpsuit",
    category: "Women",
    price: 310,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&q=80",
    badge: "NEW",
    sizes: ["XS", "S", "M", "L"]
  }
];

const FashionCard = ({ ascName, descName, ascGrade, descGrade }) => {
    const {setCart, addToCart} = useContext(cartOpenContext)
    const [hoveredId, setHoveredId] = useState(null);
    const navigate = useNavigate();

    let sortedProducts = [...fashionProducts];

    if(ascName){
        sortedProducts.sort((a,b) => a.name.localeCompare(b.name));
    }
    else if(descName){
        sortedProducts.sort((a,b) => b.name.localeCompare(a.name));
    }
    else if(ascGrade){
        sortedProducts.sort((a,b) => b.price - a.price);
    }
    else if(descGrade){
        sortedProducts.sort((a,b) => a.price - b.price);
    }

    return (
        <div className='bg-white'>
            <div className='w-full min-h-screen px-[30px] max-md:px-[16px] py-[40px]'>
               
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[20px] gap-y-[40px] max-w-[1400px] mx-auto'>
                    
                    {sortedProducts.map((product) => {
                        return (
                            <div 
                                key={product.id} 
                                className='group cursor-pointer'
                                onMouseEnter={() => setHoveredId(product.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={() => navigate('/productDetails', { state: { product: {...product, brand: "ECHO STUDIO"} } })}
                            >
                                <div className='relative overflow-hidden bg-gray-50 aspect-[3/4] mb-[16px]'>
                                    <img 
                                        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' 
                                        src={product.image} 
                                        alt={product.name}
                                    />
                                    
                                    {product.badge && (
                                        <div className={`absolute top-[12px] left-[12px] px-[10px] py-[4px] text-[10px] font-[amma3] tracking-[2px] uppercase ${
                                            product.badge === 'SALE' ? 'bg-red-600 text-white' :
                                            product.badge === 'NEW' ? 'bg-black text-white' :
                                            product.badge === 'BESTSELLER' ? 'bg-amber-700 text-white' :
                                            'bg-gray-900 text-white'
                                        }`}>
                                            {product.badge}
                                        </div>
                                    )}
                                    
                                    <div 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart({...product, _id: product.id, image_url: product.image, product_name: product.name, brands: "Echo Studio"});
                                            setCart(true);
                                        }} 
                                        className={`absolute bottom-[12px] right-[12px] h-[40px] w-[40px] bg-white flex items-center justify-center transition-all duration-300 shadow-sm ${
                                            hoveredId === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                        } hover:bg-black hover:text-white`}
                                    >
                                        <i className="ri-shopping-bag-line text-[16px]"></i>
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
                        )
                    })}

                </div>

            </div>
        </div>
    )
}

export default FashionCard
