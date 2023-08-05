import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import spinLoader from "../components/SpinLoader";
import {
  getOrderDetails,
  payOrder,
  markOrderAsdelivered,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import formateDate from "../assets/js/formateDate";
import KhaltiPayment from "../payment-gateway/khalti/KhaltiPayment";
import { toast } from "react-toastify";


function OrderScreen() {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [khaltiDone, setKhaltiDone] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  useEffect(() => {
    if (!order || order._id !== Number(orderId) || successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId, successDeliver]);


  const successPaymentHandler = async () => {
    dispatch(payOrder(orderId));
    await KhaltiPayment(orderId, order.totalPrice);  
      setKhaltiDone(true);    
  };
  
  const markAsdeliverHandler = () => {
    dispatch(markOrderAsdelivered(order))
    console.log("order successfully delivered");
    alert("order");
  };

  return loading ? (
    <spinLoader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
    <div style={{ marginLeft: "100px", marginRight: "100px" }}>
      <h1>Order: {orderId}</h1>
      <Row>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {formateDate(order.paidAt)}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {"  "}
                {order.shippingAddress.postalCode},{"  "}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {formateDate(order.deliveredAt)}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4} style={{ marginLeft: "20px" }}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item className="order-summary">
                <h2 style={{ marginLeft: "10px", fontSize: "15px" }}>
                  Order Summary
                </h2>
                <div style={{ display: "flex" }}>
                  <h2 style={{ marginLeft: "10px", fontSize: "15px" }}>
                    {order.orderItems.length} Items
                  </h2>
                  <h2 style={{ marginLeft: "250px", fontSize: "15px" }}>
                    Rs {order.totalPrice}
                  </h2>
                </div>
              </ListGroup.Item>

              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
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
                        <Link className="book-title" to={`/book/${item.book}`}>
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
                  <Col className="ml-left">Rs {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row className="flex">
                  <Col>Tax:</Col>
                  <Col className="ml-left">Rs {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row className="flex">
                  <Col>Total:</Col>
                  <Col className="ml-left total-price">
                    Rs {order.totalPrice}
                  </Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <spinLoader />}
                    <Button
                      className="btn-paid"
                      amount={order.totalPrice}
                      onClick={successPaymentHandler}
                    >
                      Pay with Khalti
                    </Button>
                </ListGroup.Item>
              )}

              {order.isPaid && !userInfo.isAdmin && (
                 <Message variant="success">Please Wait for Delivery..</Message>
              )}
            </ListGroup>


            {loadingDeliver && <spinLoader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    className="btn-deliver"
                    onClick={markAsdeliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}

          </Card>
        </Col>
      </Row>
    </div>


</>
    
  );
}



export default OrderScreen;
