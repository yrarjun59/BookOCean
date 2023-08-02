import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authorList, categoryList, createBook } from "../actions/bookActions";
import Loader from "../components/Loader";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";

function BookCreateScreen() {
  const bookCreate = useSelector((state) => state.bookCreate);
  const {
    loading,
    error: bookCreateError,
    success: bookCreateSuccess,
  } = bookCreate;

  const {
    authors,
    error,
    loading: authorLoading,
  } = useSelector((state) => state.authorList);

  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.categoryList
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const [showAuthorInput, setShowAuthorInput] = useState(false);
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if ( !name || !price ||!author || !category ||!countInStock ||!description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    dispatch(
      createBook({
        name,
        price,
        image,
        author,
        category,
        description,
        countInStock,
      })
    )

    if(bookCreateSuccess){
      navigate("/")
    }
  };

  useEffect(() => {
    if (bookCreateError) {
      toast.error("Error Occurred");
    }
    dispatch(authorList());
    dispatch(categoryList());
  }, [dispatch, bookCreateSuccess, bookCreateError, navigate]);

  const handleCategoryButtonClick = () => {
    setShowCategoryInput(true);
  };
  const handleAuthorButtonClick = () => {
    setShowAuthorInput(true);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <FormContainer>
        <Button className="btn btn-light my-3" onClick={handleGoBack}>
          Go Back
        </Button>

        <h1>Add Book</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{bookCreateError}</Message>
        ) : (
          
          <Form onSubmit={submitHandler}>
          <ToastContainer />

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
              <div className="input-group">
                <input
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="select-input"
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                className="select-input"
                type="file"
                size="sm"
                onChange={(e) => setImage(e.target.files[0])}
              />
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
                    value={author}
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
                {!showCategoryInput && (
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
                  />
                )}
                
                {!showCategoryInput && (
                  <i
                    className="fa fa-plus icon"
                    onClick={handleCategoryButtonClick}
                  ></i>
                )}

                {showCategoryInput && (
                  <input
                    type="text"
                    value={category.value ? category.value : category}
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
                row="10"
                value={description}
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="button">
              Create Book
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default BookCreateScreen;
