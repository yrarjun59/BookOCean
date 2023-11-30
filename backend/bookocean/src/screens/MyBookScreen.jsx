import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Table, Image, Modal } from "react-bootstrap";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import formateDate from "../assets/js/formateDate";
import { mybooks } from "../actions/bookActions";
import BookEditScreen from "./BookEditScreen";

function MyBookScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const listMyBooks = useSelector((state) => state.mybooks);
  const { loading, error, books } = listMyBooks;

  const bookDelete = useSelector((state) => state.bookDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bookDelete;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(mybooks());
    }
  }, [userInfo, dispatch, navigate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id));
    }
  };

  return (
    <div className="mx-100">
      {books.length > 0 ? (
        <Row className="align-items-center">
          <Col className="" style={{ margin: "10px" }}>
            <h2>My Books</h2>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <div>
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>Upload Date</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Author</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book._id}>
                        <td>{formateDate(book.createdAt)}</td>
                        <td>
                          <Link to={`/book/${book._id}`}>
                            <Image
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "contain",
                              }}
                              src={`http://127.0.0.1:8000${book.image}`}
                            />
                          </Link>
                        </td>
                        <td>
                          <Link to={`/book/${book._id}`}>{book.name}</Link>
                        </td>
                        <td>Rs {book.price}</td>
                        <td>{book.category}</td>
                        <td>{book.author}</td>
                        <td>
                          <Link to={`/mybook/${book._id}/edit`}>
                            <Button variant="light" className="btn-sm">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </Link>

                          <Button
                            style={{ marginLeft: "30px" }}
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteHandler(book._id)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Col>
        </Row>
      ) : (
        <h2>You have no books</h2>
      )}
      
    </div>
  );
}

export default MyBookScreen;
