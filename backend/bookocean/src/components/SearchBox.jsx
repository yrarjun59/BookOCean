import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}&page=1`);
    } else {
      navigate(navigate(location.pathname));
    }
  };
  
  return (
    <Form inline="true" onSubmit={submitHandler} style={{marginLeft:"40px"}}>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-10"
        style={{ width: "450px", borderRadius: "10px" }}
        placeholder="Search books..........."
      ></Form.Control>
    </Form>
  );
}

export default SearchBox;
