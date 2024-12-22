import axios from 'axios';
import React from 'react'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


const Login = ({setToken}) => {
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onSubmitHandler = async(e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl+'/api/user/admin',{email,password});
            if(response.data.success){
                setToken(response.data.token);
            }
            else{
                console.log("error login");
                toast.error(response.data.message);
            }
        } catch (error) {
            
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3 min-w-72">
                            <p className="text-sm font-md text-gray-700 mb-2">Email</p>
                            <input type='email' onChange={(e)=>{setEmail(e.target.value)}} value={email} className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" placeholder='your@email.com' required />
                        </div>
                        <div className="mb-3 min-w-72">
                            <p className="text-sm font-md text-gray-700 mb-2">Password</p>
                            <input type='password' onChange={(e)=>{setPassword(e.target.value)}} value={password} className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" placeholder='Enter your password' required />
                        </div>
                        <button type='submit' className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black">Login</button>
                    </form>
            </div>
        </div>
    )
}

export default Login