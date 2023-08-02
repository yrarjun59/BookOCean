import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Book from "../components/Book";
import { useDispatch, useSelector } from "react-redux";
import { listBooks } from "../actions/bookActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { useLocation, useNavigate, Link } from "react-router-dom";
import BookCarousel from "../components/BookCarousel";
import AdminDashBoard from "./admin/AdminDashBoard";
import BookRequestScreen from "../screens/BookRequestScreen";

function HomeScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { books, error, loading, page, pages } = useSelector(
    (state) => state.bookList
  );

  let keyword = location.search;

  const [showModal, setShowModal] = useState(false);

  const handleBookRequest = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };



  useEffect(() => {
    dispatch(listBooks(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {userInfo && userInfo.isAdmin ? (
        <AdminDashBoard />
      ) : (
        <div className="m-100">
          <ToastContainer />

          <h1 className="moto-text">The Book is Magic You hold on Your hand</h1>
          {!keyword && <BookCarousel />}
          <h1 className="my-3 text-center font-bold">Latest Books</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div>
              <Modal
                show={showModal}
                onHide={handleCloseModal}
                style={{ width: "100%", margin: "0px" }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Request Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <BookRequestScreen />
                </Modal.Body>
              </Modal>
              <div>
                <Button onClick={handleBookRequest}>Request Book</Button>
                <Link to="/book/create">
                  <Button style={{ margin: "10px" }}>Add Book</Button>
                </Link>
              </div>

              <Row>
                {books.map((book) => (
                  <Col key={book._id} xs={6} sm={4} md={3} lg={3}>
                    <div className="mb-4">
                      <Book book={book} />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          )}
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </>
  );
}

export default HomeScreen;
