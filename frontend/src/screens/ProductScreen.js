import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import Meta from "../components/Meta";
import Rating from "../components/Rating";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Message from "../components/Message";
import Loader from "../components/Loader";
const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  // Product details state
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  // User Login State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Product Review details state
  const { success: successProductReview, error: errorProductReview } =
    useSelector((state) => state.productReviewCreate);

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({
        type: PRODUCT_CREATE_REVIEW_RESET,
      });
    }
    dispatch(listProductDetails(match.params.id));
    // eslint-disable-next-line
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup
                variant="flush"
                className="  text-lg-start text-center "
              >
                <ListGroup.Item>
                  <h3 className=" pb-0 mb-0">{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="  text-lg-start text-center">
                  Price: &#8377; {product.price}{" "}
                </ListGroup.Item>
                <ListGroup.Item className=" mb-2 pb-4">
                  Description: {product.description}{" "}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row className=" p-3">
                      <Col>Price:</Col>
                      <Col>
                        <strong>&#8377; {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row className=" p-3">
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row className=" p-3">
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup className="  ">
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block p-4  "
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2
                style={{ fontSize: "1.8rem" }}
                className="pt-3 mt-4 text-decoration-none"
              >
                Customers Review
              </h2>
              {product.reviews.length === 0 && (
                <Message variant="info">No reviews</Message>
              )}
              <ListGroup
                variant="flush"
                className="  text-lg-start text-center "
              >
                {product.reviews.map((review, index) => (
                  <ListGroup.Item
                    className={`${index === 0 ? "pt-3" : ""}`}
                    key={review._id}
                  >
                    <div
                      style={{ fontSize: "1.2rem" }}
                      className={`${index === 0 ? "mt-3" : ""} mb-2`}
                    >
                      {review.name}
                    </div>
                    <Rating value={review.rating} className="" />
                    <span
                      className="pb-0 mb-0 text-secondary "
                      style={{ fontSize: "0.7rem" }}
                    >
                      {review.createdAt.substring(0, 10)}
                    </span>
                    <p className="pt-0 mt-3 text-info ">{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2 className=" text-center ">Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label className="text-secondary">
                          Rating
                        </Form.Label>
                        <Form.Control
                          className="p-3"
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="5">5 - Excellent</option>
                          <option value="4">4 - Very Good</option>
                          <option value="3">3 - Good</option>
                          <option value="2">2 - Fair</option>
                          <option value="1">1 - Poor</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label className="mt-3 text-secondary">
                          Comment
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type="submit"
                        variant="primary"
                        className=" mt-4 p-3 w-100 "
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Please{" "}
                      <Link
                        to="/login"
                        className="text-decoration-none text-white-50 "
                      >
                        Sign In
                      </Link>{" "}
                      or{" "}
                      <Link
                        to="/register"
                        className="text-decoration-none text-white-50 "
                      >
                        Register with Us
                      </Link>{" "}
                      to add a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
