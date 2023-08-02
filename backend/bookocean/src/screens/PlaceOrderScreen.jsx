import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen() {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, navigate]);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, order, navigate, dispatch]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div style={{ marginLeft: "100px", marginRight: "100px" }}>
      {cart.cartItems.length === 0 ? (
        <Link to="/">
          <h2>Please Order Items</h2>
        </Link>
      ) : (
        <>
          <Row>
            <CheckoutSteps step1 step2 step3 step4 />
            <Col md={7}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Shipping: </strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city}
                    {"  "}
                    {cart.shippingAddress.postalCode},{"  "}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p style={{ textTransform: "capitalize" }}>
                    Method: {cart.paymentMethod}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="button"
                    className="btn-order-place"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrder}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4} style={{ marginLeft: "40px" }}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item className="order-summary">
                    <h2
                      style={{
                        marginLeft: "10px",
                        fontSize: "15px",
                      }}
                    >
                      Order Summary
                    </h2>
                    <div style={{ display: "flex" }}>
                      <h2 style={{ marginLeft: "10px", fontSize: "15px" }}>
                        {cart.cartItems.length} Items
                      </h2>
                      <h2 style={{ marginLeft: "250px", fontSize: "15px" }}>
                        Rs {cart.totalPrice}
                      </h2>
                    </div>
                  </ListGroup.Item>

                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={`http://127.0.0.1:8000/${item.image}`}
                              alt={item.name}
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "contain",
                              }}
                            />
                          </Col>

                          <Col style={{ marginLeft: "100px" }}>
                            <Link
                              className="book-title"
                              to={`/book/${item.bookId}`}
                            >
                              <h5 style={{ textTransform: "capitalize" }}>
                                {item.name}
                              </h5>
                            </Link>
                            <span
                              style={{ marginLeft: "50px" }}
                              className="book-title"
                            >
                              X {item.qty}
                            </span>
                          </Col>

                          <Col style={{ marginLeft: "20px", color: "#03314b" }}>
                            Rs {item.price * item.qty}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <ListGroup.Item>
                    <Row className="flex">
                      <Col>Delivery Fee:</Col>
                      <Col className="ml-left">Rs {cart.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row className="flex">
                      <Col>Tax:</Col>
                      <Col className="ml-left">Rs {cart.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row className="flex">
                      <Col>Total:</Col>
                      <Col className="ml-left total-price">
                        Rs {cart.totalPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default PlaceOrderScreen;
