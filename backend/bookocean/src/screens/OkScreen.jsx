import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

function OkScreen() {
  const profileData = {
    name: "John Doe",
    email: "johndoe@example.com",
    username: "johndoe123",
    image: "/images/profiles/user-default.png",
    location: "New York, USA",
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col sm={12} md={4} className="d-flex justify-content-center">
          <Image src={profileData.image} alt="Profile Image" fluid />
          <h3 className="text-center mt-3">{profileData.name}</h3>
        </Col>
        <Col sm={12} md={8}>
          <h5>Email</h5>
          <p>{profileData.email}</p>
          <h5>Username</h5>
          <p>{profileData.username}</p>
          <h5>Location</h5>
          <p>{profileData.location}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default OkScreen;
