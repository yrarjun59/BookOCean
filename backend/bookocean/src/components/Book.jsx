import React from "react";
import { Card, Image } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import slugify from "slugify";

const cardStyle = {
  maxHeight: "350px",
  maxWidth: "200px",
  overflow: "hidden",
  // borderRadius: "10px",
};

const ratingStyle = {
  backgroundColor: "#D90077",
  position: "absolute",
  top: "30%",
  left: "-75px",
  fontSize: "16px",
  transform: "rotate(270deg)",
  color: "white",
  paddingRight: "8px",
  paddingLeft: "8px",
};

function Book({ book }) {
  return (
    <Card style={cardStyle} as="div">
      <div style={ratingStyle}>
        {book.numReviews > 0 ? (
          <Rating
            value={book.rating}
            text={`${book.rating}(${book.numReviews})`}
            color={"#FFDD07"}
          />
        ) : (
          ""
        )}
      </div>
      {/* <Link to={`/book/${slugify(book.name)}`} style={{ textDecoration: "none" }}> */}
      <Link to={`/book/${book._id}`} style={{ textDecoration: "none" }}>
        <Card.Img
          src={`http://127.0.0.1:8000/${book.image}`}
          style={{
            width: "200px",
            height: "270px",
            objectFit: "contain",
          }}
          alt="image"
        />

        <Card.Body
          as="div"
          style={{
            height: "calc(100% - 270px)",
            width: "200px",
            position: "relative",
            background: "white",
            top: "-40px",
          }}
        >
          <p className="book-title" style={{ textAlign: "center" }}>
            {book.name}
          </p>
          <p style={{ color: "red", fontSize: "15px", textAlign: "center" }}>
            Rs {book.price}
          </p>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default Book;
