import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Table, Image, Modal } from "react-bootstrap";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import formateDate from "../assets/js/formateDate";
import { myRequestBooks } from "../actions/bookActions";


function MyBookScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const listMyRequestBooks = useSelector((state) => state.requestBooks);
  const { loading, error, books } = listMyRequestBooks;

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
      dispatch(myRequestBooks());
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
                      <th>Request Date</th>
                      <th>Name</th>
                      <th>Author</th>
                      <th>Reference Link</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book._id}>
                        <td>{formateDate(book.requestAt)}</td>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>
                          <Link to={book.reference_link}>
                            {book.reference_link}
                          </Link>
                        </td>
                        <td>{book.isResponse ? <p>✔</p> : <p>❌</p>}</td>
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
      ;
    </div>
  );
}

export default MyBookScreen;
