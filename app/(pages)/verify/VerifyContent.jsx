"use client";
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStoreContext } from '@/app/context/storeContext';

function VerifyContent() {
  const { token } = useStoreContext();
  const searchParams = useSearchParams();
  const router = useRouter();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [error, setError] = useState("Loading...");

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}api/order/verify`, { success, orderId }, { headers: { token } });
      if (response.data.success) {
        router.push('/myorders');
      } else {
        setError("Verification failed. Redirecting to home...");
        router.push('/');
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token, success, orderId]);

  return (
    <div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default VerifyContent;
