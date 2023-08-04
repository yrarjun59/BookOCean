import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const totalBooks = 150;
  const totalUsers = 50;
  const bookRequests = 10;
  const totalOrders = 20;


  return (
    <Container className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
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
          <Card className="dashboard-card total-users">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="dashboard-card-value">{totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} lg={6}>
          <Card className="dashboard-card book-requests">
            <Card.Body>
              <Card.Title>Book Requests</Card.Title>
              <Card.Text className="dashboard-card-value">{bookRequests}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={6}>
          <Card className="dashboard-card total-orders">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text className="dashboard-card-value">{totalOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
