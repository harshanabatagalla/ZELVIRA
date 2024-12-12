import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (productId, size) => {
        if (!size) {
            toast.error('Please select a size');
            return;
        }
        let tempCartItems = structuredClone(cartItems);
        if (tempCartItems[productId]) {
            if (tempCartItems[productId][size]) {
                tempCartItems[productId][size] += 1;
            } else {
                tempCartItems[productId][size] = 1;
            }
        }
        else {
            tempCartItems[productId] = {};
            tempCartItems[productId][size] = 1;
        }
        setCartItems(tempCartItems);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount ;
    }

    const updateQuantity = async (productId, size, quantity) => {
        let tempCartItems = structuredClone(cartItems);
        tempCartItems[productId][size] = quantity;
        setCartItems(tempCartItems);
    }

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;