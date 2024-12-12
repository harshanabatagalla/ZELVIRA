import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const featchProductData = async () => {
    products.map((product) => {
      if (product._id === productId) {
        setProductData(product);
        setImage(product.image[0]);
        return;
      }
    })
  }

  useEffect(() => {
    featchProductData();
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 '>

      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((img, index) => (
                <img key={index} src={img} alt="product" className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" onClick={() => setImage(img)} />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="product" className="w-full h-auto" />
          </div>
        </div>

        {/* product info */}
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p className="">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => { setSize(item) }}
                  key={index}
                  className={`border py-2 px-4 bg-gray-100 ${item == size ? 'border-orange-500' : ''}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button className='bg-black text-white px-8 py-3 text:sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery available for this product.</p>
            <p className="">Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* description & review */}
      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 py-3 text-sm font-semibold">Description</p>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border py-6 px-6 text-sm text-gray-500">
          <p>This product is thoughtfully designed to bring you a perfect mix of comfort and style. Made from high-quality materials, it feels soft on the skin and ensures long-lasting durability. Its versatile design makes it suitable for various occasions, whether you’re heading to work, meeting friends, or attending a casual outing. With a focus on simplicity and elegance, it’s a piece you’ll want to wear again and again.</p>
          <p>Available in multiple sizes and colors, this product is crafted to cater to diverse preferences. Its timeless appeal makes it a great addition to any wardrobe, offering both functionality and fashionable charm.</p>
        </div>
      </div>

      {/* related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  )
    : <div className="opacity-0"></div>
}

export default Product
