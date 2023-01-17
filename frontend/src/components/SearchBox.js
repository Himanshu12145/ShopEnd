import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} inline className="d-flex my-2">
      <Form.Control
        type="text"
        name="q"
        placeholder="Search Products..."
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5 form-control me-sm-2"
      ></Form.Control>
      <Button type="submit" className=" p-2 px-4  btn btn-secondary  ">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
