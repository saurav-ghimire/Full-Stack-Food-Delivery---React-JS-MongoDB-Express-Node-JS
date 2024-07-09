"use client"
import axios from 'axios';
import './Verify.css'
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { storeContext } from '@/app/context/storeContext';


function Verify() {
  const { token } = storeContext();

  const searchParams = useSearchParams();
  const router = useRouter();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const url = process.env.NEXT_PUBLIC_BACKEND_URL

  const verifyPayment = async () => {
    
      
      const response = await axios.post(`${url}api/order/verify`, { success, orderId },{ headers: { token } });
      console.log(response.data)
      if(response.data.success){
        router.push('/myorder')
      }
  }

  useEffect(() => {
    verifyPayment();
  },[token]);

  return ( 
    <div>
      {url}
    </div>
  );
}

export default Verify;