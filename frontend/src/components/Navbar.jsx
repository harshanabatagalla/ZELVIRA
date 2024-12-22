import React, { useContext } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

  const [visible, setVisible] = useState(false);
  const { showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'>
        <img src={assets.logo} alt='logo' className='w-36' />
      </Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1 uppercase'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1 uppercase'>
          <p>Collection</p>
          <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1 uppercase'>
          <p>About</p>
          <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1 uppercase'>
          <p>contact</p>
          <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img src={assets.search_icon} alt='search' className='w-5 cursor-pointer' onClick={() => { setShowSearch(!showSearch) }} />
        <div className='group relative'>
          <img onClick={() => token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt='profile' />
          {/* Dropdown */}
          {token &&
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-gray-500 rounded'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={()=> navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          }
        </div>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} alt='cart' className='w-5 cursor-pointer min-w-5' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full aspect-square text-[8px]'>{getCartCount()}</p>
        </Link>
        <img src={assets.menu_icon} alt='menu' className='w-5 cursor-pointer sm:hidden' onClick={() => { setVisible(true) }} />
      </div>

      {/* sidebar menu to small screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div className='flex items-center gap-4 p-3 cursor-pointer' onClick={() => { setVisible(false) }}>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' />
            <p>Back</p>
          </div>
          <NavLink onClick={() => { setVisible(false) }} to='/' className='py-2 pl-6 border'> HOME </NavLink>
          <NavLink onClick={() => { setVisible(false) }} to='/collection' className='py-2 pl-6 border'> COLLECTION </NavLink>
          <NavLink onClick={() => { setVisible(false) }} to='/about' className='py-2 pl-6 border'> ABOUT </NavLink>
          <NavLink onClick={() => { setVisible(false) }} to='/contact' className='py-2 pl-6 border'> CONTACT </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar