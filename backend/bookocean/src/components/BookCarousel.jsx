import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image, Container, Row, Col, Button } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopBooks } from "../actions/bookActions";

function BookCarousel() {
  const dispatch = useDispatch();
  const [slide, setSlide] = useState(0);

  const bookTopRated = useSelector((state) => state.bookTopRated);
  const { error, loading, books } = bookTopRated;

  useEffect(() => {
    dispatch(listTopBooks());
  }, [dispatch]);

  const handleSlide = (selectedIndex) => {
    setSlide(selectedIndex);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel
      activeIndex={slide}
      onSelect={handleSlide}
      interval={null}
      style={{ marginTop: "40px", height: "400px", backgroundColor: "#c5c2be" }}
      prevIcon={null}
      nextIcon={null}
      // prevLabel=""
      // nextIcon={(null, disabled)}
    >
      {books.map((book) => (
        <Carousel.Item key={book._id}>
          <Container>
            <Row>
              <Col md={3} style={{marginLeft:"50px"}}>
                <Link
                  to={`/book/${book._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Image
                    src={`http://127.0.0.1:8000/${book.image}`}
                    alt={book.name}
                    rounded
                  />
                </Link>
              </Col>

              <Col md={5} style={{ marginTop: "70px" }}>
                <div className="carousel-item-content">
                  <h4 className="carousel-header">{book.name}</h4>

                  <p>{book.description}</p>
                  <p className="price-text">Rs {book.price}</p>
                  <div>
                    <Button variant="warning">Buy</Button>
                    <Link to={`/book/${book._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              </Col>

              <Col md={3} style={{ marginTop: "70px" }}>
                {book.rating} Rating from {book.numReviews} reviews
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BookCarousel;
