'use client'
import { useEffect, useState } from 'react';
import './Menu.css';
import axios from 'axios';

function Menu() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [category, setCategory] = useState([]);
  
  const allCategory = async() => {
    const response = await axios.get(url+'api/category/all');
    if(response?.data?.success){
      setCategory(response?.data?.allCategory);
    }
  }
  useEffect(() => {
    allCategory();
  },[]);
  
    
  
  return (
    <div className="menu-container">
      <div className="filter-section">
        <h2>Filters</h2>
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
        </div>

        <div className="filter-category">
          <h3>Category</h3>
          {/* Replace with your categories */}
          <ul>
            {
              category.map((data, index)=>(
                <li><input type="checkbox" id={`category${index}`} /><label htmlFor={`category${index}`}>{data?.title}</label></li>    
              ))
            }
            
          </ul>
        </div>

        <div className="filter-price">
          <h3>Price</h3>
          <label htmlFor="min-price">Min:</label>
          <input type="number" id="min-price" placeholder="0" />
          <label htmlFor="max-price">Max:</label>
          <input type="number" id="max-price" placeholder="1000" />
        </div>
        <div>
        
        <button className='filter-btn'>Filter Now</button>

        </div>
      </div>

      <div className="product-section">
        {/* Leave this section for your product components */}
      </div>
    </div>
  );
}

export default Menu;
