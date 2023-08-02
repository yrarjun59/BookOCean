import React, { useEffect, useState } from "react";
import ModelFormContainer from "../components/ModelFormContainer";
import Message from "../components/Message";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authorList,
  categoryList,
  createBook,
  requestBook,
} from "../actions/bookActions";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookRequestScreen() {
  const bookRequest = useSelector((state) => state.bookRequest);
  const {
    loading,
    error: bookRequestError,
    success: bookRequestSuccess,
  } = bookRequest;

  const {
    authors,
    error,
    loading: authorLoading,
  } = useSelector((state) => state.authorList);

  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.categoryList
  );

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [referenceLink, setReferenceLink] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !author || !referenceLink) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(
      requestBook({
        name,
        author,
        referenceLink,
      })
    );
  };

  useEffect(() => {
    dispatch(authorList());
    dispatch(categoryList());
  }, [dispatch, bookRequestSuccess]);

  useEffect(() => {
    if (bookRequestSuccess) {
      toast.info("Book Successfully Requested");
      navigate("/my-book-requests");
    }
  }, [bookRequestSuccess, navigate]);
  return (
    <div>
      <ModelFormContainer>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{bookRequestError}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="select-input"
                type="name"
                placeholder="book name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Author</Form.Label>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="writer name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="select-input"
                />
              </div>
            </Form.Group>

            <Form.Group controlId="countinstock">
              <Form.Label>Reference Link</Form.Label>
              <Form.Control
                className="select-input"
                type="text"
                placeholder="eg: https://www.amazon.com/s?k=upanishads"
                value={referenceLink}
                onChange={(e) => setReferenceLink(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="button">
              Request Book
            </Button>
          </Form>
        )}
      </ModelFormContainer>
    </div>
  );
}

export default BookRequestScreen;
