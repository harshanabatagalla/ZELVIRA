import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/admin_assets/assets';
import axios from 'axios'


const Orders = ({ token }) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.get(backendUrl + '/api/order/list', { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }

  const statusHandler = async (orderId, status) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <h3 className="">Order Page</h3>
      <div className="">
        {
          orders.map((order, index) => (
            <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 md:p-8 p-5 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
              <img src={assets.parcel_icon} alt="parcel" className='w-12' />
              <div>
                <div>
                  {
                    order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return <p className="py-0.5" key={index}> {item.name} X {item.quantity} <span>{item.size}</span></p>
                      } else {
                        return <p className="py-0.5" key={index}> {item.name} X {item.quantity} <span>{item.size}</span>,</p>
                      }
                    })
                  }
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zip}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <select className='p-2 border-2 border-gray-200 font-semibold' name="status" id="status" onChange={(e) => statusHandler(order._id, e.target.value)} value={order.status}>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
