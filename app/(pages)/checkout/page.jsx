"use client";
import { storeContext } from '@/app/context/storeContext';
import './checkout.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
const Checkout = () => {
  const { totalPrice, token, cartItems, food_list } = storeContext();
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  let totalItem = 0;
  
  // Loop through each key in the cartItems object
  for (let key in cartItems) {
    totalItem += cartItems[key];
  }

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    apt: "",
    city: "",
    province: "",
    postalCode: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: totalPrice
    };

    try {
      let response = await axios.post(`${url}api/order/place`, orderData, { headers: { token } });
      if (response.data.success) {
        const { success_url } = response.data;
        window.location.replace(success_url);
      } else {
        console.log(response.data);
        alert("Error");
      }
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  return (
    <div className="checkout">
      <div className="shipping">
        <h2>Details</h2>
        <form className="shippingForm" onSubmit={placeOrder}>
          <div className='formGroupWrapper'>
            <div className="formGroup">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" onChange={onChangeHandler} value={data.firstName} required />
            </div>
            <div className="formGroup">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" onChange={onChangeHandler} value={data.lastName} required />
            </div>
          </div>
          <div className='formGroupWrapper'>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" onChange={onChangeHandler} value={data.email} required />
            </div>
            <div className="formGroup">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" onChange={onChangeHandler} value={data.phone} required />
            </div>
          </div>
          <div className='innerTitle'>
            <h2>Delivery Address</h2>
          </div>
          <div className="formGroup">
            <label htmlFor="streetAddress">Street Address</label>
            <input type="text" id="streetAddress" name="streetAddress" onChange={onChangeHandler} value={data.streetAddress} required />
          </div>
          <div className="formGroup">
            <label htmlFor="apt">Apt / Suite / Unit (Optional)</label>
            <input type="text" id="apt" name="apt" onChange={onChangeHandler} value={data.apt} />
          </div>
          <div className="formGroup">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" onChange={onChangeHandler} value={data.city} required />
          </div>
          <div className="formGroup">
            <label htmlFor="province">Province</label>
            <select id="province" name="province" onChange={onChangeHandler} value={data.province} required>
              <option value="">Select</option>
              <option value="ON">Ontario</option>
              <option value="QC">Quebec</option>
              <option value="BC">British Columbia</option>
            </select>
          </div>
          <div className="formGroup">
            <label htmlFor="postalCode">Postal Code</label>
            <input type="text" id="postalCode" name="postalCode" onChange={onChangeHandler} value={data.postalCode} required />
          </div>

          <div className="paynow">
            <button type='submit'>Pay Now</button>
          </div>
        </form>
      </div>
      <div className="orderSummary">
        <h2>Order Summary</h2>
        <div className="summaryDetails">
          <p>Subtotal: <span>${totalPrice}</span></p>
          <p>Taxes: <span>Included</span></p>
          <p>Shipping: <span>{totalItem} item</span></p>
          <p>Total: <span>${totalPrice} CAD</span></p>
        </div>
        <div className="promoCode">
          <label htmlFor="promoCode">Apply a Promo Code or Discount (one per order)</label>
          <input type="text" id="promoCode" name="promoCode" />
          <button type="button">APPLY</button>
        </div>
        <div className="bagSummary">
          <p><strong>Cart Summary</strong></p>
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div className="bag-summary-single" key={index}>
                  <p>{item.name}, Quantity: {cartItems[item._id]}, Price: <span>{cartItems[item._id] * item.price}</span></p>
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
