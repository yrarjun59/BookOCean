import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Image, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createBook, deleteBook, listBooks } from "../../actions/bookActions";
import { BOOK_CREATE_RESET } from "../../constants/bookConstants";
import Paginate from "../../components/Paginate";
import BookEditScreen from "../BookEditScreen";

function BookListScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books, pages, page } = bookList;

  const bookDelete = useSelector((state) => state.bookDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bookDelete;

  const bookCreate = useSelector((state) => state.bookCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    book: createdBook,
  } = bookCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let keyword = location.search;

  useEffect(() => {
    dispatch({ type: BOOK_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigate("/login/");
    }

    if (successCreate) {
      navigate(`/admin/booklist`);
    } else {
      dispatch(listBooks(keyword));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdBook,
    keyword,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id));
    }
  };

  return (
    <div style={{ marginLeft: "100px" }}>
      <Row className="align-items-center">
        <Col>
          <h1>Books</h1>
        </Col>

        <Col className="" style={{ margin: "10px" }}>
          <Link to="/admin/book-create">
            <Button className="my-3">
              <i className="fas fa-plus"></i> Create Book
            </Button>
          </Link>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>Author</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>
                    <Link to={`/book/${book._id}`}>
                      <Image
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "contain",
                        }}
                        src={`http://127.0.0.1:8000${book.image}`}
                      />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/book/${book._id}`}>{book.name}</Link>
                  </td>
                  <td>{book.price}</td>
                  <td>{book.category}</td>
                  <td>{book.author}</td>
                  <td>
                    <Link to={`/admin/book/${book._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>

                    <Button
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
          <Paginate
            pages={pages}
            page={page}
            isAdmin={true}
            route="/admin/booklist"
          />
        </div>
      )}
    </div>
  );
}

export default BookListScreen;
