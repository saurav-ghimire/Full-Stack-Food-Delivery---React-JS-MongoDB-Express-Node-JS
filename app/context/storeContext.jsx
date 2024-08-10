"use client"
import axios from 'axios';
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyContext = createContext(null);

export const MyProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  const [food_list, setFoodList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Safely access localStorage inside useEffect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token") || "";
      setToken(storedToken);
    }
  }, []);

  // Fetch food list and cart data in a single API call
  const fetchInitialData = async () => {
    try {
      const [foodResponse, cartResponse] = await axios.all([
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/food/foods'),
        token ? axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/cart/get', { headers: { token } }) : Promise.resolve({ data: { cartData: {} } })
      ]);

      if (foodResponse.data) {
        setFoodList(foodResponse.data.data);
      } else {
        console.error("No food data found in response");
      }

      setCartItems(cartResponse.data.cartData || {});
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchInitialData();
    }
  }, [token]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId]) {
        updatedCart[itemId] += 1;
      } else {
        updatedCart[itemId] = 1;
      }
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/cart/add', { itemId }, {
          headers: { token }
        });
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }

      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/cart/remove', { itemId }, {
          headers: { token }
        });
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  // Memoize the total price calculation to avoid unnecessary recalculations
  const calculateTotalPrice = useMemo(() => {
    let total = 0;
    food_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        total += item.price * cartItems[item._id];
      }
    });
    return total;
  }, [cartItems, food_list]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice);
  }, [calculateTotalPrice]);

  const contextValue = useMemo(() => ({
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    setToken,
    token,
    totalPrice,
    fetchInitialData // exposed for potential manual refreshes
  }), [food_list, cartItems, token, totalPrice]);

  return (
    <MyContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </MyContext.Provider>
  );
};

export const useStoreContext = () => useContext(MyContext);
