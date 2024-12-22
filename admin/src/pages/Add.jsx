import React, { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {

    const [image1, SetImage1] = useState(false);
    const [image2, SetImage2] = useState(false);
    const [image3, SetImage3] = useState(false);
    const [image4, SetImage4] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Men');
    const [subCategory, setSubCategory] = useState('Topwear');
    const [sizes, setSizes] = useState([]);
    const [bestseller, setBestseller] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData();

            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('subCategory', subCategory);
            formData.append('bestSeller', bestseller);
            formData.append('sizes', JSON.stringify(sizes));

            image1 && formData.append('image1', image1);
            image2 && formData.append('image2', image2);
            image3 && formData.append('image3', image3);
            image4 && formData.append('image4', image4);

            const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                setName('');
                setDescription('');
                setPrice('');
                SetImage1(false);
                SetImage2(false);
                SetImage3(false);
                SetImage4(false);
                setSizes([]);
                setBestseller(false);
                setIsLoading(false);
            }
            else {
                toast.error(response.data.message);
                setIsLoading(false);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    return (
        <form className='flex flex-col w-full items-start gap-3' onSubmit={onSubmitHandler}>
            <div className="">

                <p className="mb-2">Upload Image</p>
                <div className="flex gap-2">
                    <label htmlFor="image1">
                        <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" className='w-20 h-20 object-cover' />
                        <input type="file" id="image1" hidden accept="image/*" onChange={(e) => { SetImage1(e.target.files[0]) }} />
                    </label>
                    <label htmlFor="image2">
                        <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" className='w-20 h-20 object-cover' />
                        <input type="file" id="image2" hidden accept="image/*" onChange={(e) => { SetImage2(e.target.files[0]) }} />
                    </label>
                    <label htmlFor="image3">
                        <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" className='w-20 h-20 object-cover' />
                        <input type="file" id="image3" hidden accept="image/*" onChange={(e) => { SetImage3(e.target.files[0]) }} />
                    </label>
                    <label htmlFor="image4">
                        <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" className='w-20 h-20 object-cover' />
                        <input type="file" id="image4" hidden accept="image/*" onChange={(e) => { SetImage4(e.target.files[0]) }} />
                    </label>
                </div>

            </div>

            <div className="w-full">
                <p className="mb-2">Product Name</p>
                <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" className="w-full max-w-[500px] px-3 py-2" placeholder='Product name (e.g., Organic Cotton T-Shirt)' required />
            </div>

            <div className="w-full">
                <p className="mb-2">Product Description</p>
                <textarea onChange={(e) => { setDescription(e.target.value) }} value={description} type="text" className="w-full max-w-[500px] px-3 py-2" placeholder='Describe the product' required />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 sm:gap-8'>

                <div className="">
                    <p className="mb-2">Product Category</p>
                    <select onChange={(e) => { setCategory(e.target.value) }} id="category" className="w-full px-3 py-2">
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div className="">
                    <p className="mb-2">Sub Category</p>
                    <select onChange={(e) => { setSubCategory(e.target.value) }} id="subCategory" className="w-full px-3 py-2">
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Product Price</p>
                    <input onChange={(e) => { setPrice(e.target.value) }} value={price} type="number" className="w-full sm:w-[120px] px-3 py-2" placeholder='250' required min={1} />
                </div>

            </div>

            <div>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-2'>
                    <div onClick={() => { setSizes((prev) => prev.includes("S") ? prev.filter((item) => item !== "S") : [...prev, "S"]); }}>
                        <p className={`${sizes.includes("S") ? 'bg-pink-100 border-pink-400' : 'bg-slate-200'} px-3 py-1 cursor-pointer border`}>S</p>
                    </div>
                    <div onClick={() => { setSizes((prev) => prev.includes("M") ? prev.filter((item) => item !== "M") : [...prev, "M"]); }}>
                        <p className={`${sizes.includes("M") ? 'bg-pink-100 border-pink-400' : 'bg-slate-200'} px-3 py-1 cursor-pointer border`}>M</p>
                    </div>
                    <div onClick={() => { setSizes((prev) => prev.includes("L") ? prev.filter((item) => item !== "L") : [...prev, "L"]); }}>
                        <p className={`${sizes.includes("L") ? 'bg-pink-100 border-pink-400' : 'bg-slate-200'} px-3 py-1 cursor-pointer border`}>L</p>
                    </div>
                    <div onClick={() => { setSizes((prev) => prev.includes("XL") ? prev.filter((item) => item !== "XL") : [...prev, "XL"]); }}>
                        <p className={`${sizes.includes("XL") ? 'bg-pink-100 border-pink-400' : 'bg-slate-200'} px-3 py-1 cursor-pointer border`}>XL</p>
                    </div>
                    <div onClick={() => { setSizes((prev) => prev.includes("XXL") ? prev.filter((item) => item !== "XXL") : [...prev, "XXL"]); }}>
                        <p className={`${sizes.includes("XXL") ? 'bg-pink-100 border-pink-400' : 'bg-slate-200'} px-3 py-1 cursor-pointer border`}>XXL</p>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <input type="checkbox" id="bestseller" onChange={() => { setBestseller(prev => !prev) }} checked={bestseller} />
                <label htmlFor="bestseller" className='cursor-pointer'>Add to bestseller</label>
            </div>

            <button className={`${isLoading ? 'bg-slate-300 cursor-not-allowed text-slate-500' : 'bg-black cursor-pointer' }  text-white px-4 py-3 mt-2 w-40`}>
                { isLoading && <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="gray" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" />
                </svg>}
                {isLoading ? 'Adding' : 'Add Product'}
            </button>
        </form>
    )
}

export default Add
