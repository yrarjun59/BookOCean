import React from "react";
import { Modal, Row, Col,Button, Toast } from "react-bootstrap";
import "../assets/css/Notifications.css";
import { useDispatch } from "react-redux";
import { getnotificationList, markNotfications } from "../actions/bookActions";
import { ToastContainer, toast } from "react-toastify";

const NotificationModal = ({ show, handleClose, notifications }) => {

  const dispath = useDispatch()

  const hasUnreadNotifications = notifications.filter(
    (notification) => notification.is_read==false
  );

  const markAllAsRead = () => {
    toast.success("All Notifications marked as read.");
    console.log("all are marked as read");
    dispath(markNotfications());
    dispath(getnotificationList());
    handleClose(); 
  };


  return (
    <Modal show={show} onHide={handleClose} className="notification-modal">
      <Modal.Header closeButton>

        <Modal.Title>Notifications</Modal.Title>
        <Button
    variant="primary"
    className="ml-3"
    onClick={markAllAsRead}
    disabled={!hasUnreadNotifications}
  >
  Mark All as Read
</Button>

      </Modal.Header>
      <Modal.Body>
      <ToastContainer />
        
        <div className="notification-container">
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              <Row>
                <Col xs={2} className="notification-image">
                  <img
                    src={notification.user?notification.user.profile.profile_image:""}
                    alt="Recipient"
                  />
                </Col>
                <Col xs={10}>
                  <div className="notification-message">
                    {notification.user.username} requested {notification.message}
                  </div>
                  <div className="notification-time">
                    {notification.time_ago}
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NotificationModal;