"use client";
import { storeContext } from '@/app/context/storeContext';
import './Cart.css';
import Image from 'next/image';
import { FaPlus, FaMinus } from "react-icons/fa";
import Link from 'next/link';

function Cart() {
  
  const { cartItems, addToCart, removeFromCart, food_list } = storeContext();
  
  

  return ( 
    <div className="cart-wrapper">
      {
        Object.keys(cartItems).length === 0 ? <div className="cart-empty-message">
          <p>No Items in the Cart</p>
          <Link href="/" className="go-to-home-btn">Return Home</Link>
        </div> : <div>
      <h2 className="cart-title">Our Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <tr key={index}>
                  <td className="cart-image">
                    <Image src={item.image} alt={item.name} width={50} height={50} />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="food-item-counter">
                      <div className="icon-container" onClick={() => removeFromCart(item._id)}>
                        <FaMinus className="minus-icon" />
                      </div>
                      <span>{cartItems[item._id]}</span>
                      <div className="icon-container" onClick={() => addToCart(item._id)}>
                        <FaPlus className="plus-icon" />
                      </div>
                    </div>
                  </td>
                  <td>${(item.price * cartItems[item._id]).toFixed(2)}</td>
                  <td className="remove-icon" onClick={() => removeFromCart(item._id)}>🗑️</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      </div>
      }
    </div>
  );
}

export default Cart;
