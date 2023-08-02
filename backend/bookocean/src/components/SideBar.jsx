import React from "react";
import { Nav, Col } from "react-bootstrap";

const Sidebar = () => {
  return (
    <Col xs={2}>
      <Nav className="flex-column">
        <Nav.Link href="#all-categories">All Categories</Nav.Link>
        <Nav.Link href="#category1">Category 1</Nav.Link>
        <Nav.Link href="#category2">Category 2</Nav.Link>
        <Nav.Link href="#category3">Category 3</Nav.Link>
        <Nav.Link href="#category4">Category 4</Nav.Link>
        <Nav.Link href="#category5">Category 5</Nav.Link>
        <Nav.Link href="#category6">Category 6</Nav.Link>
        <Nav.Link href="#category7">Category 7</Nav.Link>
        <Nav.Link href="#category8">Category 8</Nav.Link>
        <Nav.Link href="#category9">Category 9</Nav.Link>
        <Nav.Link href="#category10">Category 10</Nav.Link>
      </Nav>
    </Col>
  );
};

export default Sidebar;
