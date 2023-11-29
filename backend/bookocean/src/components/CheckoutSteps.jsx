import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <div>
      <Nav className="checkout-steps">
        <Nav.Item className="checkout-step-item">
          <LinkContainer to="/login">
            <Nav.Link disabled={!step1}>
              <span className={`checkout-step ${step1 ? "current-active-link" : ""}`}>Login</span>
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item className="checkout-steps">
          <LinkContainer to="/shipping">
            <Nav.Link disabled={!step2}>
              <span className={`checkout-step ${step2 ? "current-active-link" : ""}`}>Shipping</span>
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>


        <Nav.Item className="checkout-steps">
          <LinkContainer to="/placeorder">
            <Nav.Link disabled={!step3}>
              <span className={`checkout-step ${step3 ? "current-active-link" : ""}`}>Place Order</span>
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item className="checkout-steps">
          <LinkContainer to="/pay">
            <Nav.Link disabled={!step4}>
              <span className={`checkout-step ${step4 ? "current-active-link" : ""}`}>Payment</span>
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>

      </Nav>
    </div>
  );
}

export default CheckoutSteps;
