import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormContainer from "../components/FormContainer";

import {
  authorList,
  categoryList,
  detailBook,
  updateBook,
} from "../actions/bookActions";
import { BOOK_UPDATE_RESET } from "../constants/bookConstants";

function BookEditScreen() {
  const { id: bookId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const [showAuthorInput, setShowAuthorInput] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookDetails = useSelector((state) => state.bookDetails);
  const { error, loading, book } = bookDetails;

  const bookUpdate = useSelector((state) => state.bookUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = bookUpdate;

  const { authors, loading: authorLoading } = useSelector(
    (state) => state.authorList
  );

  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.categoryList
  );

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BOOK_UPDATE_RESET });
      navigate(-1);
    } else {
      if (!book.name || book._id !== Number(bookId)) {
        dispatch(detailBook(bookId));
        dispatch(authorList());
        dispatch(categoryList());
      } else {
        setName(book.name);
        setPrice(book.price);
        setImage(book.image);
        setAuthor(book.author);
        setCategory(book.category);
        setCountInStock(book.countInStock);
        setDescription(book.description);
      }
    }
  }, [dispatch, navigate, successUpdate, book, bookId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateBook({
        _id: bookId,
        name,
        price,
        image,
        category,
        author,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("bookId", bookId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/books/upload/",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
      toast.success("successfully image upload");
    } catch (error) {
      setUploading(false);
      toast.error(error);
    }
  };

  const handleButtonClick = () => {
    setShowInput(true);
  };
  const handleAuthorButtonClick = () => {
    setShowAuthorInput(true);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <ToastContainer />

      <FormContainer>
        <h1>Edit Book</h1>
        <Button className="btn btn-light my-3" onClick={handleGoBack}>
          Go Back
        </Button>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="select-input"
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                className="select-input"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <div className="input-group-i">
                Current Image:
                <Link to={`http://127.0.0.1:8000${image}`}>
                  <span
                    style={{ textDecoration: "none" }}
                    className="input-group"
                  >
                    <p className="image-text">{image}</p>
                  </span>
                </Link>
              </div>

              <div className="input-group-i">
                Change Image
                <Form.Control
                  className="select-input-image"
                  type="file"
                  custom="true"
                  onChange={uploadFileHandler}
                ></Form.Control>
              </div>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <div className="search-list">
                {!showAuthorInput && (
                  <Select
                    className="select"
                    isClearable
                    isSearchable
                    placeholder="Select author"
                    value={author ? { value: author, label: author } : null}
                    onChange={(selectedOption) => {
                      setAuthor(selectedOption.value);
                    }}
                    options={authors.map((author) => ({
                      value: author.name,
                      label: author.name,
                    }))}
                    defaultValue={{ value: author, label: author }}
                  />
                )}
                {!showAuthorInput && (
                  <i
                    className="fa fa-plus icon"
                    onClick={handleAuthorButtonClick}
                  ></i>
                )}

                {showAuthorInput && (
                  <input
                    type="text"
                    value={author.value ? author.value : author}
                    placeholder="add new author"
                    onChange={(e) => setAuthor(e.target.value)}
                    className="select-input"
                  />
                )}
              </div>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <div className="search-list">
                {!showInput && (
                  <Select
                    className="select"
                    isClearable
                    isSearchable
                    placeholder="Select category"
                    value={
                      category ? { value: category, label: category } : null
                    }
                    onChange={(selectedOption) => {
                      setCategory(selectedOption.value);
                    }}
                    options={categories.map((category) => ({
                      value: category.name,
                      label: category.name,
                    }))}
                    defaultValue={{
                      value: category,
                      label: category,
                    }}
                  />
                )}
                {!showInput && (
                  <i
                    className="fa fa-plus icon"
                    onClick={handleButtonClick}
                  ></i>
                )}

                {showInput && (
                  <input
                    type="text"
                    value={category}
                    placeholder="add new category"
                    onChange={(e) => setCategory(e.target.value)}
                    className="select-input"
                  />
                )}
              </div>
            </Form.Group>

            <Form.Group controlId="countinstock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                className="select-input"
                type="number"
                placeholder="Enter stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                className="select-input"
                as="textarea"
                row="8"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="button">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default BookEditScreen;
