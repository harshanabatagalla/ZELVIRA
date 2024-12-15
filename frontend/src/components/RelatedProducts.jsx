import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category, subCategory}) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let tempProducts = products.slice();
            tempProducts = tempProducts.filter( (product) => product.category == category && product.subCategory == subCategory);
            setRelated(tempProducts.slice(0, 5));
        }
    }, [products])
    
    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'RELATED '} text2={'PRODUCTS'} />
            </div>
            {/* Rendering products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    related.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts
