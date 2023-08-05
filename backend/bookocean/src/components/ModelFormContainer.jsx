import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function ModelFormContainer({ children }) {
  return (
    <Container>
      <Row>
        <Col xs={12} md={10}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default ModelFormContainer;

