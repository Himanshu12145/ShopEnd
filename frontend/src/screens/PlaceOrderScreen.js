import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  // const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    // if (!userInfo) {
    //   history.push("/login");
    // }
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  // Calculation of prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 4999 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2
                className="text-secondary pb-3 "
                style={{ fontSize: "1.6rem" }}
              >
                Shipping To
              </h2>
              <p className="text-light">
                <strong className="text-info m-sm-5">Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country},
              </p>
            </ListGroup.Item>
            <ListGroup.Item className="text-light">
              <h2 className="text-secondary pt-0 mt-0">Payment Method</h2>
              <strong className="text-info m-sm-5">Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="text-secondary">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            className="text-decoration-none text-info"
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} className="text-light">
                          {item.qty} x &#8377; {item.price} = &#8377;{" "}
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Col
                  className="text-secondary p-3"
                  style={{ fontSize: "1.6rem" }}
                >
                  Order Summary{" "}
                </Col>
              </ListGroup.Item>
              <ListGroup.Item className="text-light">
                <Row>
                  <Col className="text-info">Items</Col>
                  <Col> &#8377; {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="text-light">
                <Row>
                  <Col className="text-info">Shipping</Col>
                  <Col> &#8377; {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="text-light">
                <Row>
                  <Col className="text-info">Tax </Col>
                  <Col> &#8377; {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="text-light">
                <Row>
                  <Col className="text-info">Total </Col>
                  <Col>&#8377; {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100 p-3 mb-3 "
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
