import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT  '} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="about" className='w-full md:max-w-[450px]' />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 font-light">
          <p className="">At ZELVIRA, we believe that fashion is more than just clothing—it's a reflection of your unique personality and lifestyle. Since our inception, we’ve been dedicated to creating stylish, high-quality apparel that combines comfort, elegance, and versatility. Our collections are thoughtfully curated to cater to diverse tastes, offering everything from timeless classics to the latest trends. Whether you’re dressing for work, a special occasion, or casual outings, ZELVIRA has something to make you look and feel your best.</p>
          <p className="">With a commitment to excellence, we prioritize quality craftsmanship and sustainable practices in every piece we design. Our passion for fashion goes hand-in-hand with our dedication to delivering a seamless shopping experience, both online and in-store. At ZELVIRA, we don’t just sell clothes—we create moments of confidence, style, and joy. Join us on our journey to redefine modern fashion while staying true to our core values of authenticity and innovation.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>To inspire confidence, creativity, and self-expression through fashion that is inclusive, sustainable, and timeless.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY  '} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-base">Quality Assurance</b>
          <p className='text-gray-600'>Our products are made from premium materials and crafted with attention to detail for long-lasting comfort and style.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-base">Convenience</b>
          <p className='text-gray-600'>Shop from the comfort of your home with our easy-to-use website and secure payment options.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-base">Exceptional Customer Service</b>
          <p className='text-gray-600'>Our dedicated team is here to assist you with any queries or concerns, ensuring a seamless shopping experience.</p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About
