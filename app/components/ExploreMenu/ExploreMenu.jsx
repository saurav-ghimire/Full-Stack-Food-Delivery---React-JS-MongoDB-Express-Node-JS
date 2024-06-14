import { menu_list } from "@/app/assets/assets";
import Image from "next/image";
import './ExploreMenu.css'

function ExploreMenu() {
  console.log(menu_list)
  return ( 
    <div className="explore-menu" id="explore-menu">
      <h2>Explore our menu</h2>
      <p className="explore-menu-text">Discover a tantalizing array of dishes crafted with the finest ingredients. From savory starters to indulgent desserts, our menu is a culinary journey waiting to be explored. </p>
      <div className="explore-menu-list">
        {
          menu_list.slice(0, 7).map((item, index) => (
            <div className="explore-menu-item" key={index}>
              <Image src={item.menu_image} alt="Menu IMage" />
              <h3>{item?.menu_name}</h3>
            </div>
          ))
        }
      </div>
    </div>
   );
}

export default ExploreMenu;