import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
  Modal,
} from "react-bootstrap";

import Flatpickr from "react-flatpickr";

const PaiementCheque = () => {
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
      <Card.Body className="p-4">
        <Row>
          <Col lg={3}>
            <Form.Label htmlFor="invoicenoInput">Echéance</Form.Label>
          </Col>
          <Col lg={2}>
            <Form.Label htmlFor="date-field">Date</Form.Label>
          </Col>
          <Col lg={3}>
            <Form.Label htmlFor="invoicenoInput">Numéro de Chèque</Form.Label>
          </Col>
          <Col lg={3}>
            <Form.Label htmlFor="invoicenoInput">Banque (agence)</Form.Label>
          </Col>
        </Row>
        {inputFields.map((inputField, index) => (
          <Row style={{ marginBottom: 20 }}>
            <Col lg={3}>
              <Form.Control type="text" id="invoicenoInput" />
            </Col>
            <Col lg={2}>
              <div>
                <Flatpickr
                  className="form-control flatpickr-input"
                  options={{
                    dateFormat: "d M, Y",
                  }}
                />
              </div>
            </Col>
            <Col lg={3}>
              <Form.Control type="text" id="invoicenoInput" />
            </Col>
            <Col lg={3}>
              <Form.Control type="text" id="invoicenoInput" />
            </Col>
            <Col lg={1}>
              <Button
                onClick={() => handleRemoveFields(index)}
                className="btn btn-soft-danger w-10"
              >
                <i className="mdi mdi-archive-remove-outline align-bottom me-1"></i>{" "}
              </Button>
            </Col>
          </Row>
        ))}
      </Card.Body>
      <Button
        onClick={handleAddFields}
        variant="soft-primary"
        className="w-10"
        id="btn-new-event"
      >
        <i className="mdi mdi-plus"></i>{" "}
      </Button>
    </div>
  );
};

export default PaiementCheque;
