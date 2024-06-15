"use client"
import { storeContext } from '@/app/context/storeContext';
import './checkout.css';

const Checkout = () => {
  const {totalPrice,cartItems,food_list} = storeContext();
  
  let totalItem = 0;

  // Loop through each key in the cartItems object
  for (let key in cartItems) {
      // Add the value associated with the current key to the total
      totalItem += cartItems[key];
  }

  return (
    <div className="checkout">
      <div className="shipping">
        <h2>Shipping</h2>
        <form className="shippingForm">
          <div className="formGroup">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>
          <div className="formGroup">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" required />
          </div>
          <div className="formGroup">
            <label htmlFor="streetAddress">Street Address</label>
            <input type="text" id="streetAddress" name="streetAddress" required />
          </div>
          <div className="formGroup">
            <label htmlFor="apt">Apt / Suite / Unit (Optional)</label>
            <input type="text" id="apt" name="apt" />
          </div>
          <div className="formGroup">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" required />
          </div>
          <div className="formGroup">
            <label htmlFor="province">Province</label>
            <select id="province" name="province" required>
              <option value="">Select</option>
              <option value="ON">Ontario</option>
              <option value="QC">Quebec</option>
              <option value="BC">British Columbia</option>
            </select>
          </div>
          <div className="formGroup">
            <label htmlFor="postalCode">Postal Code</label>
            <input type="text" id="postalCode" name="postalCode" required />
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
                <div className="bag-summary-single">
                  <p>{item.name}, Quantity: {cartItems[item._id]}, Price: <span>{cartItems[item._id] * item.price}</span></p>
                  
                </div>
              )
            }
          })
        }
          
        </div>
      </div>
    </div>
  );
};

export default Checkout;
