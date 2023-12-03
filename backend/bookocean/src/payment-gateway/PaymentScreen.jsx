import React, { useEffect ,useState} from 'react'
import axios from 'axios';
import "../assets/css/Payment.css";
import khaltiConfig from './khaltiConfig';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from "../components/Message";
import SpinLoader from "../components/SpinLoader";

const key = khaltiConfig.key;
const url = khaltiConfig.url;

function PaymentScreen() {
  const {id} = useParams();
  const [pidx, setPidx] = useState(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  // async function initiatePayment(){
  //   const payload = {
  //     return_url: `http://localhost:5173/#/order/${id}`,
  //     website_url: 'http://localhost:5173/',
  //     // amount: totalAmount * 100, 
  //     amount: 100 * 100, 
  //     purchase_order_id: 2,
  //     purchase_order_name: 'my_order',
  //     customer_info: {
  //       name: 'user_name',
  //       email: 'user_name@gmail.com',
  //       phone: 9840320008,
  //       address: 'Address 3 Main Street',
  //     },
  //   };
  
  //   const config = {
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: `Key ${key}`,
  //     },
  //   };
  
  //   try {
  //     const { data } = await axios.post(url, payload, config);
  //     const pidx = data.pidx; // payment_id
  //     console.log(pidx);
  //     const { payment_url } = pidx
  //     console.log(payment_url)
  //     setPidx(pidx)
  //     pidx && setLoading(false)
  //   } catch (error) {
  //     console.log(error.message)
  //     error = error.message
  //     setError(error)
  //   }
  // }

  // useEffect(()=>{
  //   initiatePayment()
  // },[])


  return  loading ? (
  <SpinLoader/>
    ): error ? (
      <Message variant="danger">{error}</Message>
    ): (
     <div className="payment-page-container">
      <h2 class="payment-header">payment Page</h2>
      <div className="iframe-wrapper">
        <iframe
          title="payment Page"
          src={`https://test-pay.khalti.com/?pidx=${pidx}`}
          // src={`https://test-pay.khalti.com/?pidx=J3eMMuPaVGFzuxXgdjo3ck`}
          width="100%"
          height="800px"
        ></iframe>
      </div>
    </div>
  )
}

export default PaymentScreen