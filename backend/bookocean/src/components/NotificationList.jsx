import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import "../assets/css/Notifications.css";

const NotificationModal = ({ show, handleClose, notifications }) => {
  return (
    <Modal show={show} onHide={handleClose} className="notification-modal">
      <Modal.Header closeButton>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="notification-container">
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              <Row>
                <Col xs={2} className="notification-image">
                  <img
                    src={notification.user.profile.profile_image}
                    alt="Recipient"
                  />
                </Col>
                <Col xs={10}>
                  <div className="notification-message">
                    {notification.user.username}:{notification.message}
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