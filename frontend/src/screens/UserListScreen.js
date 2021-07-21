import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1 style={{ fontSize: "2rem" }} className="mt-0 pt-0 ">
        Users
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table hover responsive className="table-sm">
          <thead>
            <tr style={{ fontSize: "1.4rem" }}>
              <th className="  pb-4 text-secondary">ID</th>
              <th className="  pb-4 text-secondary ">NAME</th>
              <th className="  pb-4 text-secondary ">EMAIL</th>
              <th className="  pb-4 text-secondary ">ADMIN</th>
              <th className="  pb-4 text-secondary "></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className=" text-light " key={index}>
                <td className="  ">{user._id}</td>
                <td className=" text-info ">{user.name}</td>
                <td className="  ">
                  {" "}
                  <a
                    className="text-decoration-none text-light"
                    href={`mailto:${user.email}`}
                  >
                    {user.email}
                  </a>
                </td>
                <td className="  ">
                  {user.isAdmin ? (
                    <i
                      className="fas fa-check fa-lg     "
                      style={{ color: "green" }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-times fa-lg"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </td>
                <td className="   ">
                  <LinkContainer
                    // style={{
                    //   marginLeft: "10px",
                    //   marginRight: "10px",
                    // }}
                    to={`/admin/user/${user._id}/edit`}
                    className=" "
                  >
                    <Button variant="light" className="btn m-2  ">
                      <i className="fas fa-edit fa-lg "></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    // style={{ marginLeft: "" }}
                    variant="danger"
                    className="btn m-2 ps-3"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash fa-lg "></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
