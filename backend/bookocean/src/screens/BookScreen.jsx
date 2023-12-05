import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { detailBook, createBookReview } from "../actions/bookActions";
import { BOOK_CREATE_REVIEW_RESET } from "../constants/bookConstants";
import { addToCart } from "../actions/cartActions";
import formateDate from "../assets/js/formateDate";
import "../assets/css/recommend.css"
import RBook from "../components/rBook";
import SpinLoader from "../components/SpinLoader";




function BookScreen() {
  const { id: bookId } = useParams();

  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);


  const dispatch = useDispatch();

  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error, book,recommended_books } = bookDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bookReviewCreate = useSelector((state) => state.bookReviewCreate);
  const {
    loading: loadingbookReview,
    error: errorbookReview,
    success: successbookReview,
  } = bookReviewCreate;



  const showRecommendationsAfterDelay = () => {
    setTimeout(() => {
      setShowRecommendations(true);
    }, 5000); 
  };

  useEffect(() => {
    if (successbookReview) {
      setRating(0);
      setComment("");
      dispatch({ type: BOOK_CREATE_REVIEW_RESET });
    }

    dispatch(detailBook(bookId));
    showRecommendationsAfterDelay();
  }, [dispatch, successbookReview,showRecommendations]);

  const addToCartHandler = () => {
    dispatch(addToCart(bookId));
    navigate(`/cart`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBookReview(bookId, {
        rating,
        comment,
      })
    );
  };

  return (
    <div className="mx-5">
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={4}>
              <Image
                src={`http://127.0.0.1:8000${book.image}`}
                alt={book.name}
                style={{
                  width: "300px",
                  height: "400px",
                  objectFit: "contain",
                }}
              />
            </Col>

            <Col md={5} style={{ marginLeft: "-100px" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <p>{`${book.category}>${book.author}`}</p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={book.rating}
                    text={`${book.numReviews} reviews`}
                    color={"#c96c25"}
                  />
                </ListGroup.Item>

                <ListGroup.Item>Price: Rs {book.price}</ListGroup.Item>

                <ListGroup.Item>Description: {book.description}</ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>Rs {book.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Rating
                      value={book.rating}
                      text={`${book.numReviews} reviews`}
                      color={"#c96c25"}
                    />
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {book.countInStock > 0 ? <h5 style={{color:"green"}}>Available</h5> : <h5 style={{color:"red"}}>Not Available</h5>}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {userInfo && !userInfo.isAdmin &&(
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-deliver"
                      disabled={book.countInStock == 0}
                      type="button"
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                  )}

                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* for Reviews */}
          <Row>
            <Col md={4}>
              <h4 style={{ marginLeft: "20px", marginTop: "20px" }}>Reviews</h4>
              {book.reviews.length === 0 && (
                <Message variant="info">No Reviews</Message>
              )}

              <ListGroup variant="flush">
                {book.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <Image
                      roundedCircle
                      style={{ width: "30px", height: "30px" }}
                      src={`http://127.0.0.1:8000${review.user.profile.profile_image}`}
                    />
                    <strong style={{ color: "blue", marginLeft: "3px" }}>
                      @{review.user.profile.username}
                    </strong>
                    <Rating value={review.rating} color="#c96c25" />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p style={{ color: "black", fontWeight: "bold" }}>
                      {review.comment}
                    </p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h4>Write a review</h4>

                  {loadingbookReview && <Loader />}
                  {successbookReview && (
                    <Message variant="success">Review Submitted</Message>
                  )}
                  {errorbookReview && (
                    <Message variant="danger">{errorbookReview}</Message>
                  )}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment">
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Write a Review of Book"
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        disabled={loadingbookReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Please <Link to="/login">login</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/* for Recommendation books        */}

            {/* <Col md={8}> 
              {showRecommendations && (
            <>
              <h4>Books on Same Category</h4>
              <Row>
                {recommended_books.length > 0 ? (
                  recommended_books.map((book) => (
                    <Col key={book._id} xs={3} sm={4} md={2} lg={3}>

                      <div className="recommended-book">
                        <RBook book={book} />
                      </div>
                    </Col>
                  ))
                ) : (
                  ""
                )}
              </Row>
          </>
                   )}
            </Col> */}
          </Row>

        </div>
      )}
    </div>
  );
}


export default BookScreen;
