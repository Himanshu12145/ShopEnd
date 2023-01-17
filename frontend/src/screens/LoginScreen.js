import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, Form, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1 className="text-secondary mt-3 text-center text-lg-start">Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <div className="form-floating mb-4 text-info mt-3">
          <input
            type="email"
            className="form-control "
            id="floatingInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
          <label htmlFor="floatingInput">Email Address</label>
        </div>
        <div className="form-floating text-info mb-4">
          <input
            type="password"
            className="form-control "
            id="floatingPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {/* <div className="form-floating mb-4">
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </div>
        <Form.Group controlId="password">
          <Form.Label> Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group> */}

        <Button type="submit" className="w-100 p-3 mb-3 " variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3 text-info  text-center text-lg-start">
        <Col>
          New Customer ?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : `/register`}
            className="  text-secondary text-decoration-none"
          >
            Register Here
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
