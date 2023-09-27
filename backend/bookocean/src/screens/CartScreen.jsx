import React, { useEffect } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../actions/cartActions";

function CartScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="mx-5">
      <Row>
        <Col md={8}>
          <h1 style={{ color: "blue", margin: "10px", textAlign: "center" }}>
            Shopping Cart
          </h1>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your Cart is Empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.bookId}
                  className="my-3"
                  style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2);" }}
                >
                  <Row>
                    <Col md={2}>
                      <Image
                        src={`http://127.0.0.1:8000/${item.image}`}
                        fluid
                        rounded
                        style={{
                          width: "80px",
                          height: "100px",
                          objectFit: "contain",
                        }}
                      />
                    </Col>

                    <Col className="mt-4" md={3}>
                      <Link className="book-name" to={`/book/${item.bookId}/`}>
                        {item.name}
                      </Link>
                      <p>
                        by <span>{item.author}</span>
                      </p>
                    </Col>

                    <Col className="mt-4 cart-price" md={2}>
                      Rs {item.qty * item.price}
                    </Col>

                    <Col className="mt-2" md={2}>
                      <div className="my-3">
                        <i
                          className="fa-solid fa-minus"
                          onClick={() => {
                            const updatedQty = item.qty - 1;
                            if (updatedQty >= 1) {
                              dispatch(
                                updateCartItemQuantity(item.bookId, updatedQty)
                              );
                            }
                          }}
                          style={{
                            opacity: item.qty === 1 ? 0.5 : 1,
                            cursor: item.disabled ? "default" : "pointer",
                          }}
                          disabled={item.qty === 1}
                        ></i>

                        <span className="qty">{item.qty}</span>

                        <i
                          className="fa-solid fa-plus"
                          style={{
                            opacity: item.qty === item.countInStock ? 0.5 : 1,
                            cursor: item.disabled ? "default" : "pointer",
                          }}
                          onClick={() => {
                            const updatedQty = item.qty + 1;
                            if (updatedQty <= item.countInStock) {
                              dispatch(
                                updateCartItemQuantity(item.bookId, updatedQty)
                              );
                            }
                          }}
                          disabled={item.qty === item.countInStock}
                        ></i>
                      </div>
                    </Col>

                    <Col className="mt-3" md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.bookId)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col style={{ marginTop: "30px" }} md={4}>
          <Card className="mt-5">
            <ListGroup variant="flush">
              <h2 className="cart-order-summry">Cart Summary</h2>
              <ListGroup.Item
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <p style={{ fontSize: "15px" }}>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </p>
                <p className="total-price">
                  Rs
                  <span style={{ marginLeft: "5px" }}>
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </p>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup.Item>
              <Button
                type="button"
                className="checkout-button"
                disabled={cartItems.length === 0}
                hidden={cartItems.length === 0}
                onClick={() => checkoutHandler()}
              >
                Proceed to Order
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
