import Image from 'next/image';
import './FoodItemCard.css';
import { assets } from '@/app/assets/assets';
import { useContext } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";
import { storeContext } from '@/app/context/storeContext';

function FoodItemCard({ item }) {
  const { cartItems, addToCart, removeFromCart } = storeContext();

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <Image src={item?.image} layout="fill" className="food-item-image" alt={item?.name} />
        {
          !cartItems[item?._id] 
            ? <FaPlus className="first-add" onClick={() => addToCart(item._id)} /> 
            : <div className="food-item-counter">
                <div className="icon-container" onClick={() => addToCart(item._id)}>
                  <FaPlus className="plus-icon" />
                </div>
                <span className="item-count">{cartItems[item._id]}</span>
                <div className="icon-container" onClick={() => removeFromCart(item._id)}>
                  <FaMinus className="minus-icon" />
                </div>
              </div>
        }
      </div>
      <div className="food-item-info">
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
      </div>
    </div>
  );
}

export default FoodItemCard;
