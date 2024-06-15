import Image from 'next/image';
import './FoodItemCard.css';
import { assets } from '@/app/assets/assets';
import { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";



function FoodItemCard({ item }) {
  const [itemCount, setItemCount] = useState(0);
  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <Image src={item?.image} layout="fill" className="food-item-image" alt={item?.name} />
        <Image src={assets.add_icon_white} alt="" />
        {
          !itemCount 
          ? <FaPlus className="first-add" onClick={() => setItemCount(prev=>prev+1)}  /> 
          
          :   <div className="food-item-counter">
          <div className="icon-container" onClick={() => setItemCount(prev=>prev+1)}>
            <FaPlus className="plus-icon" />
          </div>
          <span className="item-count">{itemCount}</span>
          <div className="icon-container" onClick={() => setItemCount(prev=>prev-1)}>
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
