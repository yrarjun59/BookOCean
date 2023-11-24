import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NotificationModal from "./NotificationList";
import { getnotificationList } from "../actions/bookActions";

function useAutoLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutTimerRef = useRef(null);

  const logoutHandler = () => {
    clearTimeout(logoutTimerRef.current); // Clear the previous timer
    dispatch(logout());
    navigate("/login");
  };

  const handleUserActivity = () => {
    clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(logoutHandler, 5 * 60 * 1000); // logout automatically after 5 minutes
  };

  useEffect(() => {
    const activityEvents = ["mousemove", "keydown"];

    activityEvents.forEach((event) => {
      document.addEventListener(event, handleUserActivity);
    });

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      clearTimeout(logoutTimerRef.current);
      activityEvents.forEach((event) => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, []);

  return logoutHandler
}

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const notificationList = useSelector((state) => state.notificationList);
  const { notifications } = notificationList;
  const {new_notifications} = notificationList

  const dispatch = useDispatch();
  const logoutHandler = useAutoLogout()


  useEffect(() => {
    dispatch(getnotificationList());
  }, [dispatch]);

  const getNotificationCount = () => {
    const unreadNotifications = new_notifications ? new_notifications:0
    return unreadNotifications > 9 ? "9+" : unreadNotifications;
  };

  const [showModal, setShowModal] = useState(false);

  const handleNotificationClick = () => {
    dispatch(getnotificationList());
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <header
      style={{ boxShadow: "0 5px 5px #ffffff", backgroundColor: "#ffffff" }}
    >
      <Navbar expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Image
              className="logo"
              src="/book.svg"
              alt="Logo"
              width={200}
              height={30}
            />
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav style={{ marginLeft: "280px" }} className="ml-auto">
              {userInfo && !userInfo.isAdmin && (
                <LinkContainer to="/cart">
                  
                  <Nav.Link className="cartNav">
                    <i className="fas fa-shopping-cart cart-icon"></i>
                    <span className="cartItems">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </span>
                  </Nav.Link>
                  
                  
                </LinkContainer>
              )}

            
                 {/* Only for admin */}
                 {userInfo && userInfo.isAdmin && (
                 <Nav.Link
                    className="bellNav"
                    onClick={handleNotificationClick}
                  >
                    <i className="fa-regular fa-bell bell-icon"></i>
                    <span className="notification-number">
                      {getNotificationCount()?getNotificationCount():0}
                    </span>
                  </Nav.Link> 
                 )}


              {userInfo ? (
                <>
                 
                  <NavDropdown
                    style={{ marginLeft: "30px" }}
                    title={
                      

                      <Image
                        src={userInfo.profile ? `http://127.0.0.1:8000${userInfo.profile.profile_image}` :""}
                        alt="profile_image"
                        roundedCircle
                        width={30}
                        height={30}
                      />

                    }
                    id="username"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    {userInfo && !userInfo.isAdmin && (
                      <>
                        <LinkContainer to="/my-books">
                          <NavDropdown.Item>My Books</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/my-orders">
                          <NavDropdown.Item>My Orders</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/my-book-requests">
                          <NavDropdown.Item>My Book Requests</NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}

                    <NavDropdown.Item onClick={logoutHandler}>
                      {/* <NavDropdown.Item> */}
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fa-solid fa-circle-arrow-right user-login">
                      Login
                    </i>
                  </Nav.Link>
                </LinkContainer>
              )}
{/* 
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenue">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/booklist">
                    <NavDropdown.Item>Books</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/requestlist">
                    <NavDropdown.Item>Requests</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )} */}


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {userInfo && userInfo.isAdmin &&(

      <NotificationModal
        show={showModal}
        handleClose={handleCloseModal}
        notifications={notifications}
      />
      )}
    </header>
  );
}

export default Header;
