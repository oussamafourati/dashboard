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
import { Link } from "react-router-dom";

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
      <Card.Body className="p-1">
        <Row>
          <Col lg={3}>
            <Form.Label htmlFor="echeance">Echéance</Form.Label>
          </Col>
          <Col lg={2}>
            <Form.Label htmlFor="date-field">Date</Form.Label>
          </Col>
          <Col lg={3}>
            <Form.Label htmlFor="numCheque">Numéro de Chèque</Form.Label>
          </Col>
          <Col lg={3}>
            <Form.Label htmlFor="banque">Banque (agence)</Form.Label>
          </Col>
          <Col lg={1}></Col>
        </Row>
        {inputFields.map((inputField, index) => (
          <Row className="g-3" style={{ marginBottom: 15 }}>
            <Col lg={3}>
              <Form.Control type="text" id="echeance" />
            </Col>
            <Col lg={2}>
              <div>
                <Flatpickr
                  className="form-control flatpickr-input"
                  options={{
                    dateFormat: "d M, Y",
                  }}
                  id="date-field"
                />
              </div>
            </Col>
            <Col lg={3}>
              <Form.Control type="text" id="numCheque" />
            </Col>
            <Col lg={3}>
              <Form.Control type="text" id="banque" />
            </Col>
            <Col lg={1} sm={6} className="mt-4">
              {/* <Button onClick={() => handleRemoveFields(index)}>
                <i className="ri-close-fill ri-xl align-bottom me-1"></i>{" "}
              </Button> */}
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

export default PaiementCheque;
