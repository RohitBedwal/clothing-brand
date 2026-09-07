import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cartOpenContext } from '../context/CartContext';
import { quickViewContext } from '../context/QuickViewContext';
import { formatPrice } from '../src/utils/formatPrice';
import productService from '../services/productService';

const FashionCard = ({ ascName, descName, ascGrade, descGrade, products: propProducts }) => {
    const { setCart, addToCart } = useContext(cartOpenContext)
    const { openQuickView } = useContext(quickViewContext)
    const [hoveredId, setHoveredId] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (propProducts && propProducts.length > 0) {
            setProducts(propProducts);
            return;
        }
        const fetchProducts = async () => {
            try {
                const data = await productService.getProducts({ limit: 24 });
                setProducts(data.products || []);
            } catch {
                setProducts([]);
            }
        };
        fetchProducts();
    }, [propProducts]);

    let sortedProducts = [...products];

    if (ascName) {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (descName) {
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (ascGrade) {
        sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (descGrade) {
        sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
    }

    const getImage = (p) => p.images?.[0]?.url || p.image || '/placeholder.png';
    const getPrice = (p) => Number(p.price) || 0;
    const getComparePrice = (p) => p.compareAtPrice ? Number(p.compareAtPrice) : null;

    return (
        <div className='bg-white'>
            <div className='w-full min-h-screen px-[30px] max-md:px-[16px] py-[40px]'>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[20px] gap-y-[40px] max-w-[1400px] mx-auto'>

                    {sortedProducts.map((product) => {
                        const price = getPrice(product);
                        const comparePrice = getComparePrice(product);
                        const hasDiscount = comparePrice && comparePrice > price;
                        const categoryName = product.category?.name || product.category || '';

                        return (
                            <div
                                key={product.id}
                                className='group cursor-pointer'
                                onMouseEnter={() => setHoveredId(product.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={() => navigate('/productDetails', { state: { product } })}
                            >
                                <div className='relative overflow-hidden bg-gray-50 aspect-[3/4] mb-[16px]'>
                                    <img
                                        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                                        src={getImage(product)}
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
                                            addToCart(product);
                                            setCart(true);
                                        }}
                                        className={`absolute bottom-[12px] right-[12px] h-[40px] w-[40px] bg-white flex items-center justify-center transition-all duration-300 shadow-sm ${
                                            hoveredId === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                        } hover:bg-black hover:text-white`}
                                    >
                                        <i className="ri-shopping-bag-line text-[16px]"></i>
                                    </div>
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openQuickView(product);
                                        }}
                                        className={`absolute bottom-[12px] right-[60px] h-[40px] w-[40px] bg-white flex items-center justify-center transition-all duration-300 shadow-sm ${
                                            hoveredId === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                        } hover:bg-black hover:text-white`}
                                    >
                                        <i className="ri-eye-line text-[16px]"></i>
                                    </div>
                                </div>

                                <div className='px-[4px]'>
                                    {categoryName && <p className='font-[amma3] text-[11px] text-gray-400 uppercase tracking-[2px] mb-[4px]'>{categoryName}</p>}
                                    <h3 className='font-[amma4] text-[14px] text-gray-900 uppercase tracking-[1px] mb-[6px] leading-tight'>{product.name}</h3>
                                    <div className='flex items-center gap-[8px]'>
                                        <span className={`font-[amma3] text-[14px] ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
                                            {formatPrice(price)}
                                        </span>
                                        {hasDiscount && (
                                            <span className='font-[amma3] text-[13px] text-gray-400 line-through'>
                                                {formatPrice(comparePrice)}
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
