import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {

  const { backendUrl, currency, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.get(backendUrl + '/api/order/userOrders', { headers: { token } });
      if (response.data.success) {
        let allOrderItems = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrderItems.push(item)
          })
        })
        setOrderData(allOrderItems.reverse());
      }
    } catch (error) {
      toast.error(error.message)
      console.error(error);
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t pt-16'>
      <div className="text-2xl">
        <Title text1={'MY '} text2={'ORDERS'} />
      </div>
      <div className="">
        {
          orderData.map((product, index) => (
            <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-6 text-sm">
                <img src={product.image[0]} alt="product" className="w-16 sm:w-20" />
                <div className="">
                  <p className="sm:text-base front-medium">{product.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700 ">
                    <p className='text-lg'>{currency}{product.price}</p>
                    <p className="">Quantity: {product.quantity}</p>
                    <p className="px-2 sm:px-3 sm:p-1 border bg-slate-50">{product.size}</p>
                  </div>
                  <p className="mt-1">Date: <span className="text-gray-400">{new Date(product.date).toDateString()}</span></p>
                  <p className="mt-1">Payment: <span className="text-gray-400">{product.paymentMethod}</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{product.status}</p>
                </div>
                <button className="border px-4 py-2 text-sm font-medium rounded-sm" onClick={loadOrderData}>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders
