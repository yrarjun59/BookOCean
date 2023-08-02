import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function AdminDashboard() {
  const totalBooks = 150;
  const totalUsers = 50;
  const bookRequests = 10;

  return (
    <Container fluid>
      <h1>Admin Dashboard</h1>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Books</Card.Title>
              <Card.Text>{totalBooks}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>{totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Book Requests</Card.Title>
              <Card.Text>{bookRequests}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
