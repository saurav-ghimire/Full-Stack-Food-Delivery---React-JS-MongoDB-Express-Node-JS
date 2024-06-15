import Image from 'next/image';
import './FoodItemCard.css';
import { assets } from '@/app/assets/assets';

function FoodItemCard({ item }) {
  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <Image src={item?.image} layout="fill" className="food-item-image" alt={item?.name} />
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
