import React, { useEffect } from 'react';
import axios from 'axios';
import khaltiConfig from './khaltiConfig';
import PaymentScreen from './PaymentScreen';

const key = khaltiConfig.key;
const url = khaltiConfig.url;


const  Payment  = async (id, totalAmount, product_name) => {
  
    //  initiate payment
        const payload = {
          return_url: `http://localhost:5173/#/order/${id}`,
          website_url: 'http://localhost:5173/',
          // amount: totalAmount * 100, 
          amount: 100 * 100, 
          purchase_order_id: 2,
          purchase_order_name: 'my_order',
          customer_info: {
            name: 'user_name',
            email: 'user_name@gmail.com',
            phone: 9840320008,
            address: 'Address 3 Main Street',
          },
        };
      
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Key ${key}`,
          },
        };
      
        try {
          const { data } = await axios.post(url, payload, config);
          const { pidx, payment_url } = data
          window.location.href = payment_url;
        } catch (error) {
          console.log(error.message)
          console.throw(error.message)
        }
       
}

export default Payment;