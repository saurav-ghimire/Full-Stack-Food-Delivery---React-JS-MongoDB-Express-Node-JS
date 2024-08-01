"use client"
import { menu_list } from "@/app/assets/assets";
import Image from "next/image";
import './ExploreMenu.css'
import { useEffect, useState } from "react";
import axios from "axios";

function ExploreMenu({category,setCategory}) {
    const [menu, setMenu] = useState([]);
    const fetchMenu = async() => {
      const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'api/category/all');
      console.log(response);
      if(response?.data?.success){
        setMenu(response?.data?.allCategory)
      }
    }
    useEffect(() => {
      fetchMenu();
    },[]);
    
  return ( 
    <div className="explore-menu" id="explore-menu">
      <h2>Explore our menu</h2>
      <p className="explore-menu-text">Discover a tantalizing array of dishes crafted with the finest ingredients. From savory starters to indulgent desserts, our menu is a culinary journey waiting to be explored. </p>
      <div className="explore-menu-list">
        {
          menu.slice(0, 7).map((item, index) => (
            <div onClick={() =>setCategory(prev=>prev===item.title? "All" : item.title)} className="explore-menu-item" key={index}>
              <Image className={category===item.title ? 'active' : ''} src={process.env.NEXT_PUBLIC_BACKEND_URL +'images/'+item.image} alt="Menu IMage" width={150} height={150} />
              <h3 className={category===item.title ? 'active' : ''}>{item?.title}</h3>
            </div>
          ))
        }
      </div>
    </div>
   );
}

export default ExploreMenu;