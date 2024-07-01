"use client"
import axios from 'axios';

import { createContext, useContext, useState, useEffect } from 'react';

const MyContext = createContext(null);

export const MyProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const fetchFoodList = async() => {
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

  const addToCart =  async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) =>  ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) =>  ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
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
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
    });
    if(token){
      try {
        await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/cart/remove', { itemId }, {
          headers: { token }
        });
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price when cartItems or food_list changes
  const calculateTotalPrice = () => {
    let total = 0;
    food_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        total += item.price * cartItems[item._id];
      }
    });
    return total;
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    fetchFoodList();
  }, []);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cartItems, food_list]); // Depend on cartItems and food_list

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    setToken,
    token,
    totalPrice
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export const storeContext = () => useContext(MyContext);
