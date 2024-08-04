'use client'
import { useEffect, useState } from 'react';
import './Menu.css';
import axios from 'axios';
import FoodItemCard from '@/app/components/FoodItemCard/FoodItemCard';
import { toast } from 'react-toastify';

function Menu() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [category, setCategory] = useState([]);
  const [food, setFood] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [filterCategory, setFilterCategory] = useState([]);

  const allCategory = async() => {
    const response = await axios.get(url+'api/category/all');
    if(response?.data?.success){
      setCategory(response?.data?.allCategory);
    }
  }

  const getFoods = async() => {
    const response = await axios.get(url + 'api/food/foods');
    if(response?.data?.success){
      setFood(response?.data?.data)
    }
  }

  useEffect(() => {
    allCategory();
    getFoods();
  },[]);
  
  
  const getFilterData = async(event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const selectedCategories = [];

    category.forEach((_, index) => {
      if (formData.get(`category${index}`)) {
        selectedCategories.push(formData.get(`category${index}`));
      }
    });
    if(formData.get('min-price') > formData.get('max-price')){
      toast.error('Minimun value cannot be more then maximun');
      return
    }
    const minPrice = formData.get('min-price');
    const maxPrice = formData.get('max-price');

    setFilterData({
      min : minPrice,
      max : maxPrice
    });
    setFilterCategory(selectedCategories);
  }

  
  
  return (
    <div className="menu-container">
      <div className="filter-section">
        <h2>Filters</h2>

        <form onSubmit={getFilterData}>
          <div className="filter-category">
            <h3>Category</h3>
            
            <ul>
              {
                category.map((data, index) => (
                  <li key={index}>
                    <input 
                      type="checkbox" 
                      id={`category${index}`} 
                      name={`category${index}`} 
                      value={data.title} 
                    />
                    <label htmlFor={`category${index}`}>{data?.title}</label>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="filter-price">
            <h3>Price</h3>
            <label htmlFor="min-price">Min:</label>
            <input type="number" id="min-price" name='min-price' placeholder="0" />
            <label htmlFor="max-price">Max:</label>
            <input type="number" id="max-price" name='max-price' placeholder="1000" />
          </div>
          <div>
            <button type='submit' className='filter-btn'>Filter Now</button>
          </div>
        </form>
      </div>

      <div className="product-section">
        <div>
        { filterData?.min ?<span>Min :{ filterData?.min}  </span>: '' }
        { filterData?.max ?<span>Max :{ filterData?.max}  </span>: '' }
        
          {
            filterCategory.map((data)=>(
              <span>{data}</span>
            ))
          }
          
          
        </div>
        <div className='foods-wrapper'>
          {
            food.map((item, index)=>(
              <FoodItemCard item={item} key={index} />
            ))
          }
        </div>
        </div>
    </div>
  );
}

export default Menu;
