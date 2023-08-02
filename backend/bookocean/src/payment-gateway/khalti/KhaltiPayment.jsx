import React from "react";
import axios from "axios";
import khaltiConfig from "./KhaltiConfig";
import { Image } from "react-bootstrap";

const KhaltiPayment = () => {
  const initiatePayment = async () => {
    try {
      const payload = {
        amount: 1000,
        mobile: "9812345678",
        productIdentity: "1234567890",
        productName: "Test Product",
        productUrl: "https://example.com/product",
      };

      const response = await axios.post(
        `${khaltiConfig.url}epayment/initiate/`,
        payload,
        {
          headers: {
            Authorization: `Key ${khaltiConfig.key}`,
          },
        }
      );

      console.log(response.data);
      // Handle the response and further processing
    } catch (error) {
      console.error("Error initiating payment:", error.message);
      // Handle errors or display error message to the user
    }
  };

  return (
    <div onClick={initiatePayment}>
      <Image className="payment-icon" src="./khalti.svg" />
    </div>
  );
};

export default KhaltiPayment;
