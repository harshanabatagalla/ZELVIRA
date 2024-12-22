import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/admin_assets/assets'

const List = ({ token }) => {

    const [list, setList] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list', { headers: { token } });
            if (response.data.success) {
                setList(response.data.products);
            }
            else {
                console.log(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.delete(
                `${backendUrl}/api/product/remove`,
                {
                    headers: { token }, // Add the token to the headers
                    data: { id } // Use the `data` property to send the `id` in the request body
                }
            );
            
            if (response.data.success) {
                toast.success(response.data.message);
                fetchList();
                setShowDeleteModal(false);
                setSelectedProduct(null);
            }
            else {
                console.log(response.data.message);
                toast.error(response.data.message);
                setSelectedProduct(null);
                setShowDeleteModal(false);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    const selectProductToRemove = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    }

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <>
            <p className="mb-2">All Product List</p>
            <div className="flex flex-col gap-2">
                {/* list table titile */}
                <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Sub Category</b>
                    <b>Price</b>
                    <b className='text-center'>Action</b>
                </div>
                {/* product list */}
                {list.map((product, index) => (
                    <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border gap-2 text-sm">
                        <img src={product.image[0]} alt="product" className="w-10 h-10 object-cover" />
                        <p>{product.name}</p>
                        <p>{product.category}</p>
                        <p>{product.subCategory}</p>
                        <p>{currency + product.price}</p>
                        <div className="flex gap-1 justify-center">
                            <img src={assets.bin_icon_red} onClick={() => { selectProductToRemove(product) }} alt="delete" className="w-4 mr-4 sm:w-5 cursor-pointer" />
                        </div>
                    </div>
                ))}
            </div>
            {/* delete modal */}
            {showDeleteModal &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                        <h2 className="text-xl border-b pb-2 mb-4 text-black ">Confirm Delete</h2>
                        <h3 className="text-lg mb-4 text-gray-500">Are you sure you want to delete this item?</h3>
                        <div className='flex items-center gap-4 bg-orange-100 py-3 px-4 rounded-md mb-5'>
                            <img src={selectedProduct.image[0]} alt="product" className="w-20 h-20 object-cover" />
                            <div className='flex flex-col items-start text-orange-800'>
                                <p className='text-md'>{selectedProduct.name}</p>
                                <p className='text-sm'>{selectedProduct.category}</p>
                                <p className='text-sm'>{selectedProduct.subCategory}</p>
                            </div>
                        </div>
                        <div className="flex justify-start gap-4">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 "
                                onClick={() => { setSelectedProduct(null); setShowDeleteModal(false) }}
                            >
                                No, cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 "
                                onClick={() => removeProduct(selectedProduct._id)}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default List
