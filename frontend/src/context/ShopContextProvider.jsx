import { ShopContext } from "./ShopContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    const addToCart = async (productId, size) => {

        if (!size) {
            toast.error('Select product size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[productId]) {
            if (cartData[productId][size]) {
                cartData[productId][size] += 1;
            }
            else {
                cartData[productId][size] = 1;
            }
        }
        else {
            cartData[productId] = {};
            cartData[productId][size] = 1;
        }
        setCartItems(cartData);
        toast.success('Item added to cart');

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/add', {productId, size}, {headers:{token}});
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const countCartItems = () => {
        let totalCount = 0;
        for (const productId in cartItems) {
            for (const size in cartItems[productId]) {
                if (cartItems[productId][size] > 0) {
                    totalCount += cartItems[productId][size];
                }
            };
        };
        return totalCount;
    };

    const updateQuantity = async (productId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[productId][size] = quantity;

        setCartItems(cartData);

        if(token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', {productId, size, quantity}, {headers:{token}});
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const productId in cartItems) {
            let productData = products.find(
                (product) => product._id === productId
            );

            if (!productData){
                continue;
            }
            
            for (const size in cartItems[productId]) {
                if (cartItems[productId][size] > 0) {
                    totalAmount += productData.price * cartItems[productId][size];
                }
            }
        }
        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');

            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getUserCart = async(token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}});

            if(response.data.success){
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getProductsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            getUserCart(token);
        } else {
            setCartItems({});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        countCartItems,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
