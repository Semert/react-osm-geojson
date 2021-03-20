import React from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

const Popovers = ({ handleFill }) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Hey there!</Popover.Title>
      <Popover.Content>
        You need to give <strong>bbox</strong> values. (North,South,East,West).
        For give an example, i've filled the inputs for you. Don't forget, the
        maximum bbox size is <strong>0.25.</strong> It's simple right?
      </Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
      <Button variant="success" className="mb-2 ml-2" onClick={handleFill}>
        Do you need help?
      </Button>
    </OverlayTrigger>
  );
};

export default Popovers;
