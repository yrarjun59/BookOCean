import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image, Container, Row, Col, Button } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopBooks } from "../actions/bookActions";
import "../assets/css/Carousel.css"
import Rating from "./Rating";


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
      className="carousel-index"
      prevIcon={null}
      nextIcon={null}
      // prevLabel=""
      // nextIcon={(null, disabled)}
    >
      {books.map((book) => (
        <Carousel.Item key={book._id}>
          <div className="carousel-container">
                <Link
                  to={`/book/${book._id}`}
                  style={{ textDecoration: "none" }}
                >
            <Row>
              <Col md={3} style={{marginLeft:"30px"}}>
                  <Image
                    src={`http://127.0.0.1:8000${book.image}`}
                    className="carousel-image"
                    alt={book.name}
                  />
                {/* </Link> */}
              </Col>

              <Col md={6} style={{marginTop:"20px"}}>
              <Link to={`/book/${book._id}`} style={{ textDecoration: "none" }}>
                <div className="carousel-item-content">
                  <h4 className="carousel-header">{book.name}</h4>

                  <p className="book-description">{book.description}</p>
                  <p className="price-text">Rs {book.price}</p>

                  {/* Direct Buy for Later */}
                  {/* <div>
                    <Button variant="warning">Buy</Button>
                    <Link to={`/book/${book._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </div> */}

                </div>
              </Link>
              </Col>

              <Col md={2} style={{ marginTop: "50px" }}>
              <Rating
            value={book.rating}
            text={`${book.rating}(${book.numReviews})`}
            color={"#FFDD07"}
          />
              </Col>

            </Row>
            </Link>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BookCarousel;
