import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import KhaltiPayment from "../payment-gateway/khalti/KhaltiPayment";

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handlePaymentOptionClick = (option, e) => {
    e.preventDefault();
    setPaymentMethod(option);
    dispatch(savePaymentMethod(option));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form.Label>Select Payment Method</Form.Label>
      <div className="payment-options">
        {/* <div className="payment-option">
          <Image className="payment-icon" src="./esewa.svg" />
        </div>

        <div className="payment-option">
          <KhaltiPayment />
        </div> */}

        <div
          className="payment-option"
          onClick={(e) => handlePaymentOptionClick("cash", e)}
        >
          <Image className="payment-icon-cash" src="./Cash.png" />
        </div>
      </div>
    </FormContainer>
  );
}

export default PaymentScreen;
