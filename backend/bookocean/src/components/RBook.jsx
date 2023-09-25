import React from "react";
import { Card, Image } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { useEffect } from "react";


const cardStyle = {
    maxHeight: "250px",
    maxWidth: "180px",
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

function RBook({ book }) {


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

        {/* <Link to={`/book/${book._id}`} style={{ textDecoration: "none" }}> */}
        <a href={`/#/book/${book._id}`} target="_blank">
          <Card.Img
            src={`http://127.0.0.1:8000/${book.image}`}
            style={{
              width: "180px",
              height: "250px",
              objectFit: "contain",
            }}
            alt="image"
          />
          
  
          <Card.Body
            as="div"
            style={{
              height: "300px",
              width: "200px",
              position: "relative",
              background: "white",
            }}
          >
          </Card.Body>
          </a>
        {/* </Link> */}

      </Card>
    );
  }

export default RBook;