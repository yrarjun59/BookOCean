import React, { useEffect } from 'react';
import axios from 'axios';
import khaltiConfig from './khaltiConfig';

const key = khaltiConfig.key;
const url = khaltiConfig.url;


const  Payment  = async (userDetails, productDetails) => {
  
    //  initiate payment
        const payload = {
            return_url: `http://localhost:5173/#/order/${productDetails.orderId}`,
            website_url: "http://localhost:5173/",
            amount: productDetails.totalAmount * 100 ,            
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
          console.log(error)

          // this is not work when cors error occursr
            // const {response} = error
            // const data = response.data
            
            // const error_field = Object.keys(data)[0]
            // const {error_key} = data
            // console.log(`In ${error_field}: ${error_key}`)
        }
       
}

export default Payment;