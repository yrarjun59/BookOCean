import React, { useEffect } from 'react';
import axios from 'axios';
import khaltiConfig from './khaltiConfig';
import PaymentScreen from './PaymentScreen';

const key = khaltiConfig.key;
const url = khaltiConfig.url;


const  Payment  = async (userDetails, productDetails) => {
  
    //  initiate payment
        // const payload = {
        //   return_url: `http://localhost:5173/#/order/${id}`,
        //   website_url: 'http://localhost:5173/',
        //   // amount: totalAmount * 100, 
        //   amount: 100 * 100, 
        //   purchase_order_id: 2,
        //   purchase_order_name: 'my_order',
        //   customer_info: {
        //     name: 'user_name',
        //     email: 'user_name@gmail.com',
        //     phone: 9840320008,
        //     address: 'Address 3 Main Street',
        //   },
        // };

        const payload = {
            return_url: `http://localhost:5173/#/order/${productDetails.orderId}`,
            website_url: "http://localhost:5173/",
            amount: productDetails.totalAmount * 100,
            purchase_order_id: productDetails.orderId,
            purchase_order_name: productDetails.productName,
            customer_info: {
              "name": userDetails.name,
              "email": userDetails.email,
              "phone":'9840320008',
              "address": userDetails.address,
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
            // error_message = error.message
            // console.log({error_message})
            console.log(error)
        }
       
}

export default Payment;