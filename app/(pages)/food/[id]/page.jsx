'use client'
import axios from 'axios';
import './singleFood.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaMinus } from "react-icons/fa";
import { useStoreContext } from '@/app/context/storeContext';
import Link from 'next/link';

function SingleFood({ params }) {
  const { cartItems, addToCart, removeFromCart, token } = useStoreContext();
  const [clickSound] = useState(new Audio('/success.mp3')); // Correct path: audio file in the public folder
  const [item, setItem] = useState();
  const { id } = params;
  const router = useRouter();

  const getProduct = async () => {
    const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/food/web/' + id);
    if (response?.data?.success) {
      setItem(response?.data?.response);
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // Function to play sound
  const playSound = () => {
    clickSound.currentTime = 0; // Reset audio to start
    clickSound.play();
  };

  return (
    <div className="single-food-page">
      <div className="food-container">
        <div className="food-image">
          <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}images/${item?.image}`} alt="Food Image" />
        </div>
        <div className="food-details">
          <h1 className="food-title">{item?.name}</h1>
          <p className="food-price">Price: ${item?.price}</p>
          <p className="food-category">Category: {item?.category?.title}</p>
          <p className="food-desc">{item?.description}</p>

          {/* Add to Cart functionality */}
          {
            !cartItems[item?._id] 
              ? <button className="add-to-cart-btn" onClick={() => {
                  addToCart(item._id);
                  playSound(); 
                }}>Add to Cart <FaPlus /></button> 
              : <div>
                  <div className="food-item-counter">
                    <div className="icon-container" onClick={() => {
                      removeFromCart(item._id);
                      playSound(); 
                    }}>
                      <FaMinus className="minus-icon" />
                    </div>
                    <span className="item-count">{cartItems[item._id]}</span>
                    <div className="icon-container" onClick={() => {
                      addToCart(item._id);
                      playSound(); 
                    }}>
                      <FaPlus className="plus-icon" />
                    </div>
                  </div>
                  <div>
                  {
                    token ? <Link href="/checkout"><button className="proceed-to-pay-btn">Proceed to Checkout</button></Link> : <div className='logonMessage'> <h3>Please Login For Checking Out</h3></div>
                  }
                  
                  </div>
              </div>
          }
        </div>
      </div>
    </div>
  );
}

export default SingleFood;
