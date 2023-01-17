import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const Product = ({ product }) => {
  return (
    <Card
      className="my-3 p-3 rounded bg-primary "
      // style={{ background: "#250D49" }}
    >
      <Link to={`/product/${product._id}`} alt="">
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          className="text-decoration-none"
          alt=""
        >
          <Card.Title as="div">
            <strong className="text-white ">{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">&#8377; {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
