import { storeContext } from "@/app/context/storeContext";
import './foodDisplay.css'
import FoodItemCard from "../FoodItemCard/FoodItemCard";

function FoodDisplay({category}) {

  const {food_list} = storeContext();
  
  
  return ( 
    <div className="food_display" id="food_display">
        <h2>Top Dishes Near You {category}</h2>
        <div className="food-display-list">
          {
            food_list.map((item,index) => {
              if(category === 'All' || category===item.category){
                return <FoodItemCard item={item} key={index} />
              }
             })
          }
        </div>
    </div>
   );
}

export default FoodDisplay;