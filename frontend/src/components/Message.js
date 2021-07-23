import React from "react";
import { Alert } from "react-bootstrap";
const Message = ({ variant, children }) => {
  return (
    <Alert className=" p-4 mt-4 mb-4   text-center    " variant={variant}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
