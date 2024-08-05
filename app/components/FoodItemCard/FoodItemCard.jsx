import Image from 'next/image';
import './FoodItemCard.css';
import { assets } from '@/app/assets/assets';
import { FaPlus, FaMinus } from "react-icons/fa";
import { useStoreContext } from '@/app/context/storeContext';
import { useState } from 'react';
import Link from 'next/link';

function FoodItemCard({ item }) {
  const { cartItems, addToCart, removeFromCart } = useStoreContext();
  const [clickSound] = useState(new Audio('/success.mp3')); // Adjust the path to your sound file
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <Image src={url + 'images/' + item?.image} layout="fill" className="food-item-image" alt={item?.name} />
        {
          !cartItems[item?._id] 
            ? <FaPlus className="first-add" onClick={() =>
               {
                addToCart(item._id);
                clickSound.currentTime = 0;
                  clickSound.play();
               }
              } /> 
            : <div className="food-item-counter">
                
                <div className="icon-container" onClick={() => removeFromCart(item._id)}>
                  <FaMinus className="minus-icon" />
                </div>
                <span className="item-count">{cartItems[item._id]}</span>
                <div className="icon-container" onClick={() => {
                  addToCart(item._id);
                  clickSound.currentTime = 0;
                  clickSound.play();
                  }}>
                  <FaPlus className="plus-icon" />
                </div>
              </div>
        }
      </div>
      <div className="food-item-info">
       <Link href={`/food/${item?._id}`}>
        <div className="food-item-name-rating">
            <p>{item?.name}</p>
          </div>
          <p className="food-item-desc">{item?.description}</p>
          <p className="food-item-price">
            <span>
              ${item?.price}
              {item?.discount && (
                <span className="food-item-discount">-{item?.discount}%</span>
              )}
            </span>
            <Image src={assets.rating_starts} alt="rating" />
          </p>
       </Link>
      </div>
    </div>
  );
}

export default FoodItemCard;
