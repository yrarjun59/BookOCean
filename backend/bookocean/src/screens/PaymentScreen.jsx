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

  const [paymentMethod, setPaymentMethod] = useState("Khalti");

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(savePaymentMethod(paymentMethod));
    // navigate("/");
    alert("Successfully ")
  };

  useEffect(() => {
  
    if (!shippingAddress.address) {
      navigate("/myorders");
    }
  }, [navigate, shippingAddress]);

  return (
    <FormContainer style={{height:"200px"}}>
      <CheckoutSteps step1 step2 step3 step4 />

    <Form onSubmit={submitHandler}>
    <Form.Group >
        <Form.Label style={{marginTop:"20px", marginLeft:"10px"}} as='legend'>Payment Options</Form.Label>
        <Col>

         <Button
         type='submit'
         style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            marginTop:"5px",
            marginLeft:"2px",
            cursor: 'pointer'
          }}
        > 
          <Image className="payment-icon" src="./khalti.svg" alt="Khalti Image" />
        </Button>

        </Col>
    </Form.Group>
</Form>
    </FormContainer>
  );
}

export default PaymentScreen;
