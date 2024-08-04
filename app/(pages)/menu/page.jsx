'use client';
import { useEffect, useState } from 'react';
import './Menu.css';
import axios from 'axios';
import FoodItemCard from '@/app/components/FoodItemCard/FoodItemCard';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

function Menu() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [category, setCategory] = useState([]);
  const [food, setFood] = useState([]);
  const [filteredFood, setFilteredFood] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [filterCategory, setFilterCategory] = useState([]);

  // Fetch categories
  const allCategory = async () => {
    const response = await axios.get(`${url}api/category/all`);
    if (response?.data?.success) {
      setCategory(response?.data?.allCategory);
    }
  };

  // Fetch foods
  const getFoods = async () => {
    const response = await axios.get(`${url}api/food/foods`);
    if (response?.data?.success) {
      setFood(response?.data?.data);
      setFilteredFood(response?.data?.data); // Initialize filtered food
    }
  };

  useEffect(() => {
    allCategory();
    getFoods();
  }, []);

  // Handle category checkbox change
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setFilterCategory(prevCategories => {
      const updatedCategories = new Set(prevCategories);
      if (event.target.checked) {
        updatedCategories.add(value);
      } else {
        updatedCategories.delete(value);
      }
      return Array.from(updatedCategories);
    });
  };

  // Get filter data and validate
  const getFilterData = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const minPrice = parseFloat(formData.get('min-price')) || 0;
    const maxPrice = parseFloat(formData.get('max-price')) || Infinity;

    if (minPrice > maxPrice) {
      toast.error('Minimum value cannot be more than maximum');
      return;
    }

    setFilterData({
      min: minPrice,
      max: maxPrice,
    });
  };

  // Delete a filter category
  const deleteFilterCategory = (item) => {
    setFilterCategory(prevCategories => {
      const updatedCategories = prevCategories.filter(category => category !== item);
      return updatedCategories;
    });
  };

  // Filter products based on filterData and filterCategory
  const filterProducts = async() => {
    const categories = filterCategory.join(',');
    const response = await axios.get(`${url}api/food/filtered`,{
      params: {
        categories,
        minPrice: filterData.min,
        maxPrice: filterData.max
      }
    });
    console.log(response)
    if (response?.data?.success) {
      setFilteredFood(response?.data?.data);
    }
    
  };

  useEffect(() => {
    filterProducts();
  }, [filterData, filterCategory]);

  return (
    <div className="menu-container">
      <div className="filter-section">
        <h2>Filters</h2>

        <form onSubmit={getFilterData}>
          <div className="filter-category">
            <h3>Category</h3>
            <ul>
              {category.map((data, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    id={`category${index}`}
                    name={`category${index}`}
                    value={data.title}
                    checked={filterCategory.includes(data.title)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={`category${index}`}>{data?.title}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-price">
            <h3>Price</h3>
            <label htmlFor="min-price">Min:</label>
            <input type="number" id="min-price" name="min-price" placeholder="0" />
            <label htmlFor="max-price">Max:</label>
            <input type="number" id="max-price" name="max-price" placeholder="1000" />
          </div>
          <div>
            <button type="submit" className="filter-btn">Filter Now</button>
          </div>
        </form>
      </div>

      <div className="product-section">
        <div className="filter-result">
          {filterData.min && <span>Min: {filterData.min} </span>}
          {filterData.max && <span>Max: {filterData.max} </span>}
          {filterCategory.map((data, index) => (
            <div key={index} className="single-cat">
              <span onClick={() => deleteFilterCategory(data)}><FaTimes /></span>{data}
            </div>
          ))}
        </div>
        <div className="foods-wrapper">
          {
            filteredFood.length > 0 ? filteredFood.map((item, index) => (
              <FoodItemCard item={item} key={index} />
            ))
            : <div className='error-message'>
              <h4>No Food Found</h4>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Menu;
