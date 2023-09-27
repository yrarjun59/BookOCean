import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./AdminDashboard.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllRequestedBooks, listBooks, listTopBooks } from "../../actions/bookActions";
import { listUsers } from "../../actions/userActions";
import { listOrders } from "../../actions/orderActions";
import Loader from "../../components/Loader";


function AdminDashboard() {
  const dispatch = useDispatch()

  const bookList = useSelector((state) => state.bookList);
  const { books,loading,totalBooks } = bookList;

  const orderList = useSelector((state) => state.orderList);
  const { orders, loading:ordersLoading } = orderList;

  const listRequestBooks = useSelector((state) => state.allRequestedBooks);
  const { books:requestBooks, loading:requestLoading } = listRequestBooks;

  const userList = useSelector((state) => state.userList);
  const { users, loading:uesrsLoading } = userList;

  const totalUsers = users ? users.length : 0;
  const bookRequests = requestBooks ? requestBooks.length : 0;
  const totalOrders = orders ? orders.length : 0;


  useEffect(()=>{
    dispatch(listUsers());
    dispatch(listOrders());
    dispatch(getAllRequestedBooks())
    dispatch(listBooks());
  },[dispatch])


  return (
    <Container className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      {(loading || uesrsLoading || requestLoading || ordersLoading) ? (
          <Loader/>
      ):(
<>
<Row>
        <Col md={6} lg={6}>
        <Link to="/admin/booklist" className="text-decoration">
          <Card className="dashboard-card total-books">
            <Card.Body>
              <Card.Title>Total Books</Card.Title>
              <Card.Text className="dashboard-card-value">{totalBooks}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
        </Col>

        <Col md={6} lg={6}>
        <Link to="/admin/userlist" className="text-decoration">
          <Card className="dashboard-card total-users">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="dashboard-card-value">{totalUsers}</Card.Text>
            </Card.Body>
          </Card>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md={6} lg={6}>
        <Link to="admin/requestlist" className="text-decoration">
          <Card className="dashboard-card book-requests">
            <Card.Body>
              <Card.Title>Book Requests</Card.Title>
              <Card.Text className="dashboard-card-value">{bookRequests}</Card.Text>
            </Card.Body>
          </Card>
          </Link>
        </Col>

        <Col md={6} lg={6}>
        <Link to="/admin/orderlist" className="text-decoration">
          <Card className="dashboard-card total-orders">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text className="dashboard-card-value">{totalOrders}</Card.Text>
            </Card.Body>
          </Card>
          </Link>
        </Col>
      </Row>
      </>
      ) 
    }
      
    </Container>
  );
}

export default AdminDashboard;
