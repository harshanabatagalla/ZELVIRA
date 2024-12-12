import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img src={assets.logo} alt='logo' className='w-32 mb-5' />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Stay connected for updates, offers, and more. Explore, shop, and enjoy with us!
                    </p>
                </div>
                <div>
                    <p className='text font-medium mb-5'>COMPANY</p>
                    <ul className='text-gray-600 flex flex-col gap-1'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+94-763-226-659</li>
                        <li>hello@zelvira.com</li>
                    </ul>
                </div>
            </div>
                <div>
                    <hr/>
                    <p className='py-5 text-sm text-center'>Copyright {year} @ zelvira.com - All Right Reserved</p>
                </div>
        </div>
    )
}

export default Footer
