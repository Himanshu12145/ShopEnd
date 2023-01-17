import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1 className="mt-0 pt-0 " style={{ fontSize: "2rem" }}>
        Orders
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table hover responsive className="table-sm">
          <thead>
            <tr style={{ fontSize: "1.4rem" }}>
              <th className="  pb-4 text-secondary ">ID</th>
              <th className="  pb-4 text-secondary">USER</th>
              <th className="  pb-4 text-secondary">DATE</th>
              <th className="  pb-4 text-secondary">TOTAL</th>
              <th className="  pb-4 text-secondary">PAID</th>
              <th className="  pb-4 text-secondary">DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr className=" text-light " key={index}>
                <td>{order._id}</td>
                <td className=" text-info ">{order.user && order.user.name}</td>
                <td> {order.createdAt.substring(0, 10)}</td>
                <td className=" text-info "> &#8377; {order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-times fa-lg"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </td>
                <td className=" text-info ">
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-times fa-lg"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="" className="btn btn-primary  p-2">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
