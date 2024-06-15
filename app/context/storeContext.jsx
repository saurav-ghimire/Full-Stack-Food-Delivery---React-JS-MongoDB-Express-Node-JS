"use client"
import { createContext, useContext } from 'react';
import { food_list } from '../assets/assets';

const MyContext = createContext(null);

export const MyProvider = ({ children }) => {
  const contextValue = {
    food_list
  }
  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export const storeContext = () => useContext(MyContext);
