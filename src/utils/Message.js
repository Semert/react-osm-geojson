import React from "react";
import { Alert } from "react-bootstrap";
import "./Message.css";

const Message = ({ variant, children }) => {
  return (
    <Alert className="help-message" variant={variant}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "danger",
};

export default Message;
