import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { listOrders } from "../../actions/orderActions";
import { useNavigate } from "react-router-dom";
import Paginate from "../../components/Paginate";
import formateDate from "../../assets/js/formateDate";
import Paginat from "../../components/Paginat";


function OrderListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, page, pages } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div className="mx-100">
      <h1>Orders</h1>
      {loading ? (
        <spinLoader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>Total</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{formateDate(order.createdAt)}</td>
                  <td>Rs {order.totalPrice}</td>

                  <td>
                    {order.isPaid ? (
                      formateDate(order.paidAt)
                    ) : (
                      <i className="fas fa-solid fa-x" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    {order.isDelivered ? (
                      formateDate(order.deliveredAt)
                    ) : (
                      <i className="fas fa-solid fa-x" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginat
            pages={pages}
            page={page}
            isAdmin={true}
          />
        </div>
      )}
       
    </div>
  );
}

export default OrderListScreen;
