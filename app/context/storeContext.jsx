"use client"
import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyContext = createContext(null);

export const MyProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/food/foods');
      if (response.data) {
        setFoodList(response.data.data);
      } else {
        console.error("No data found in response");
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  }

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
  }

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    let total = 0;
    food_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        total += item.price * cartItems[item._id];
      }
    });
    return total;
  };

  const loadCartData = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/cart/get', {
        headers: { token }
      });
      setCartItems(response.data.cartData);
      return { success: true, response };
    } catch (error) {
      console.error("Error loading cart data:", error);
      return { success: false, error };
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    fetchFoodList();
  }, []);

  useEffect(() => {
    if (token) {
      loadCartData();
    }
  }, [token]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cartItems, food_list]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    setToken,
    token,
    totalPrice,
    loadCartData
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </MyContext.Provider>
  );
};

export const useStoreContext = () => useContext(MyContext);
