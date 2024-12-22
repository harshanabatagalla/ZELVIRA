import React, { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'

const Navbar = ({ setToken }) => {
  const [showModal, setShowModal] = useState(false)

  const handleLogout = () => {
    setToken('')
    setShowModal(false)
  }

  return (
    <div className='flex justify-between items-center py-2 px-[4%]'>
      <NavLink to='/' className='w-[max(10%,80px)]'>
        <img src={assets.logo} alt="avatar" className='' />
      </NavLink>
      <button
        className='bg-gray-600 text-white sm:px-7 sm:py-2 px-5 py-2 rounded-full text-xs sm:text-sm'
        onClick={() => setShowModal(true)}  // Show modal on click
      >
        Logout
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl mb-4 text-gray-500">Are you sure you want to logout?</h3>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 "
                onClick={() => setShowModal(false)}  // Close modal without logging out
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 "
                onClick={handleLogout}  // Confirm logout
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
