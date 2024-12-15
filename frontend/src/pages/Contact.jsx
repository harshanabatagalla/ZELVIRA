import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT '} text2={'US'} />
      </div>
      
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} alt='contact' className='w-full max-w-[480px]' />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">509/87, Kandy Rd, <br/>Colombo 6, Sri Lanka.</p>
          <p className="text-gray-500">Tel: +94 112 36 558<br/>Email: hello@zelvira.com</p>
          <p className="font-semibold text-xl text-gray-600">Careers at ZELVIRA</p>
          <p className="text-gray-500">learn more about our teams and job openings</p>
          <a href='mailto:careers@zelvira.com'><button className="border border-black px-8 py-2 hover:bg-black hover:text-white transition-all duration-500">JOIN US</button></a>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact
