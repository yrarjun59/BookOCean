import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

function UserProfileEditScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const userDetail = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, loading: updateLoading } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch(getUserDetails("profile"));
        dispatch({ type: USER_PROFILE_UPDATE_RESET });
      } else {
        setName(user.name);
        setEmail(user.email);
        setImage(user.profile_image);
        setLocation(user.location);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        id: user.profile._id,
        name: user.profile.name,
        email: user.profile.email,
        location: user.profile.location,
        image: user.profile.image,
      })
    );
    navigate("/profile");
    dispatch(getUserDetails("profile"));
  };

  //   const uploadFileHandler = async (e) => {
  //     const file = e.target.files[0];
  //     const formData = new FormData();

  //     formData.append("image", file);
  //     formData.append("product_id", productId);

  //     setUploading(true);

  //     try {
  //       const config = {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       };

  //       const { data } = await axios.post(
  //         "",
  //         formData,
  //         config
  //       );

  //       setImage(data);
  //       setUploading(false);
  //     } catch (error) {
  //       setUploading(false);
  //     }
  //   };
  // };

  return (
    <div className="mx-100" style={{ marginLeft: "100px" }}>
      <Row>
        <Col md={4}>
          <h2>User Profile</h2>

          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          {updateLoading && <Loader />}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email location</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label>location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group
              controlId="image"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Form.Label>Current Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="current image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                size="sm"
                style={{ marginBottom: "10px" }}
                onChange={(e) => setImage(e.target.value)}
              />
              {uploading && <Loader />}
            </Form.Group>

            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </Form>
        </Col>
        ;
      </Row>
    </div>
  );
}

export default UserProfileEditScreen;
