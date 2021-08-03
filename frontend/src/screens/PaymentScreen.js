import React, { useState, useEffect } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label
            as="legend"
            className="text-secondary text-lg-start text-center"
            style={{ fontSize: "1.7rem" }}
          >
            {" "}
            Select Payment Method
          </Form.Label>
          <Col>
            <br />

            <Form.Check
              type="radio"
              className=" mt-3"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <br />

            {/* todo For integrating Stripe use this (below) */}
            {/* <Form.Check
              type="radio"
              className=" mt-3"
              label="Stripe Payment for home"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <br /> */}
          </Col>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="w-100 p-3 mb-3 mt-3 "
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
