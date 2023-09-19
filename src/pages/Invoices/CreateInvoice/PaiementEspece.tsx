import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import { useState } from "react";
import { Link } from "react-router-dom";

const PaiementEspece = () => {
  const [inputFields, setInputFields] = useState<string[]>([""]);

  const handleAddFields = () => {
    const newInputFields = [...inputFields];
    newInputFields.push("");
    setInputFields(newInputFields);
  };

  const handleRemoveFields = (index: number) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

  const [value, setValue] = useState<string>("");
  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = event.target.value;
    setInputFields(newInputFields);
    setValue(event.target.value);
  };

  return (
    <div>
      <Card.Body className="p-1">
        <Row>
          <Col lg={6}>
            <Form.Label htmlFor="invoicenoInput">Echéance</Form.Label>
          </Col>
          <Col lg={6}>
            <Form.Label htmlFor="date">Date</Form.Label>
          </Col>
        </Row>
        {inputFields.map((inputField, index) => (
          <Row className="g-3" style={{ marginBottom: 15 }}>
            <Col lg={6} sm={9}>
              <Form.Control
                type="text"
                id="invoicenoInput"
                name="invoicenoInput"
              />
            </Col>
            <Col lg={4} sm={9}>
              <div>
                <Flatpickr
                  className="form-control flatpickr-input"
                  options={{
                    dateFormat: "d M, Y",
                  }}
                  id="date"
                  name="date"
                />
              </div>
            </Col>
            <Col lg={1} sm={6} className="mt-4">
              <Link
                to="#"
                className="link-danger"
                onClick={() => handleRemoveFields(index)}
              >
                <i className="ri-close-fill ri-xl" />
              </Link>
            </Col>
          </Row>
        ))}
      </Card.Body>
      <Button
        onClick={handleAddFields}
        variant="primary"
        className="p-1"
        id="btn-new-event"
      >
        <i className="mdi mdi-plus"></i>{" "}
      </Button>
    </div>
  );
};

export default PaiementEspece;
