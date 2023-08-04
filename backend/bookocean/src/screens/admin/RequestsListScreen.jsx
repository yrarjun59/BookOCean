import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Table, Image, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import formateDate from "../../assets/js/formateDate";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getAllRequestedBooks } from "../../actions/bookActions";

function RequestsListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listRequestBooks = useSelector((state) => state.allRequestBooks);
  const { loading, error, books } = listRequestBooks;
  
  useEffect(() => {
      dispatch(getAllRequestedBooks());
  }, [dispatch]);


  return (
    <div className="mx-100">
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
      ;
    </div>
  );
}

export default RequestsListScreen;
