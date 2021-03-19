import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return (
    <Alert
      style={{
        marginTop: 15,
        zIndex: 999,
        position: "absolute",
        bottom: 50,
        right: "30%",
        cursor: "pointer",
        color: "black",
        fontWeight: "bold",
        fontSize: 19,
        boxShadow: "5px 5px grey",
      }}
      variant={variant}
    >
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "danger",
};

export default Message;
