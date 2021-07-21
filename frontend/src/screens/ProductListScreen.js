import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  deleteProduct,
  listProducts,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (userInfo && !userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
    // eslint-disable-next-line
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="  ">
        <Col
          className=""
          // style={{ marginRight: "340px" }}
        >
          <h1 className=" " style={{ fontSize: "2rem" }}>
            Products
          </h1>
        </Col>
        <Col
          className="text-right"
          // style={{ marginLeft: "200px" }}
        >
          <Button
            className="my-3 btn float-end "
            onClick={createProductHandler}
          >
            <i className="fas fa-plus fa-lg"> </i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr style={{ fontSize: "1.4rem" }}>
                <th className=" pt-2  pb-3 text-secondary">ID</th>
                <th className="  pt-2 pb-3 text-secondary">NAME</th>
                <th className=" pt-2  pb-3 text-secondary">PRICE</th>
                <th className=" pt-2  pb-3 text-secondary">CATEGORY</th>
                <th className="  pt-2 pb-3 text-secondary">BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="text-light">{product._id}</td>
                  <td className="text-info">{product.name}</td>
                  <td className="text-light"> &#8377;{product.price}</td>
                  <td className="text-info"> {product.category}</td>
                  <td className="text-light">{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="info" className="btn m-2  ">
                        <i className="fas fa-edit fa-lg"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn m-2 ps-3"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash fa-lg"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
