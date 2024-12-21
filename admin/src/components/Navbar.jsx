import React from 'react'
import { assets } from '../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex justify-between items-center py-2 px-[4%] '>
            <NavLink to='/' className='w-[max(10%,80px)]'>
                <img src={assets.logo} alt="avatar" className='' />
            </NavLink>
            <button className='bg-gray-600 text-white sm:px-7 sm:py-2 px-5 py-2 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    )
}

export default Navbar
