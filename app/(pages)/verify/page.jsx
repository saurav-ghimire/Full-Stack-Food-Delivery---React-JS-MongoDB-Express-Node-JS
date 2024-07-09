"use client"
import axios from 'axios';
import './Verify.css'
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { storeContext } from '@/app/context/storeContext';


function Verify() {
  const { token } = storeContext();

  const searchParams = useSearchParams();
  const router = useRouter();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
  const [error, setError] = useState("Loading...");
  const verifyPayment = async () => {
      
      
      const response = await axios.post(`${url}api/order/verify`, { success, orderId },{ headers: { token } });
      console.log(response.data)
      if(response.data.success){
        router.push('/myorders')
      }else{
        router.push('/')
      }
  }

  useEffect(() => {
    verifyPayment();
    
  },[token]);

  return ( 
    <div>
      {
        error && error
      }
    </div>
  );
}

export default Verify;