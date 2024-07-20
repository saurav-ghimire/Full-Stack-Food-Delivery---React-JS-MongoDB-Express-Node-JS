"use client";
import axios from 'axios';
import './myOrder.css';
import { storeContext } from '@/app/context/storeContext';
import { useEffect, useState } from 'react';

function MyOrder() {
  const [data, setData] = useState([]);
  const { token } = storeContext();

  const getOrders = async () => {
    if (token) {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/order/all`, { headers: { token } });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  };

  useEffect(() => {
    getOrders();
  }, [token]);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {data.length > 0 ? (
        data.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-summary">
              <div className="order-items-summary">
                {order.items.map((item, index) => (
                  <span key={item._id}>
                    {item.name} x {item.quantity}
                    {index < order.items.length - 1 && ', '}
                  </span>
                ))}
              </div>
              <div className="order-details-right">
                <div className="order-amount">
                  ${order.amount.toFixed(2)}
                </div>
                
              </div>

            </div>
            <div className='bottom-order-wrapper'>
              <div className='bottom-order-wrapper'>
              <div className="order-items-count">
                    Items: {order.items.length}
                  </div>
                  <div className="order-status">
                    <span className={`status-dot ${order.status === "Food Processing" ? "processing" : ""}`}></span>
                    {order.status}
                  </div>
              </div>
              <div className="track-order-button">
                <button>Track Order</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default MyOrder;
