"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { food_list } from '../assets/assets';

const MyContext = createContext(null);

export const MyProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  
  const [token, setToken] = useState("");

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) {
        return { ...prev, [itemId]: 1 };
      } else {
        return { ...prev, [itemId]: prev[itemId] + 1 };
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
    });
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
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    setToken,
    token,
    totalPrice: calculateTotalPrice() // Calculate total price,
    

  };

  useEffect(() => {
    // Update total price whenever cartItems or food_list changes
    contextValue.totalPrice = calculateTotalPrice();
  }, [cartItems, food_list]); // Depend on cartItems and food_list

  
  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export const storeContext = () => useContext(MyContext);
