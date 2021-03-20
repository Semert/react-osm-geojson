import React from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import Popovers from "../utils/Popovers";

const BboxValues = ({ bbox, setBbox, handleFill, handleSubmit }) => {
  return (
    <div className="bbox-form">
      <Form inline data-aos="fade-up">
        <InputGroup className="mb-2 mr-sm-2">
          <InputGroup.Prepend>
            <InputGroup.Text>N</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={bbox.max_lat}
            placeholder={" 48.142 (max_lat)"}
            onChange={(e) => setBbox({ ...bbox, max_lat: e.target.value })}
            type="number"
          />
        </InputGroup>
        <InputGroup className="mb-2 mr-sm-2">
          <InputGroup.Prepend>
            <InputGroup.Text>S</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={bbox.min_lat}
            placeholder={" 48.14 (min_lat)"}
            onChange={(e) => setBbox({ ...bbox, min_lat: e.target.value })}
            type="number"
          />
        </InputGroup>

        <InputGroup className="mb-2 mr-sm-2">
          <InputGroup.Prepend>
            <InputGroup.Text>E</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={bbox.max_lon}
            placeholder={" 12.541 (max_lon)"}
            onChange={(e) => setBbox({ ...bbox, max_lon: e.target.value })}
            type="number"
          />
        </InputGroup>

        <InputGroup className="mb-2 mr-sm-2">
          <InputGroup.Prepend>
            <InputGroup.Text>W</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder={" 12.54 (min_lon)"}
            value={bbox.min_lon}
            onChange={(e) => setBbox({ ...bbox, min_lon: e.target.value })}
            type="number"
          />
        </InputGroup>
        <Button onClick={handleSubmit} className="mb-2">
          Submit
        </Button>
        <Popovers handleFill={handleFill} />
      </Form>
    </div>
  );
};

export default BboxValues;
