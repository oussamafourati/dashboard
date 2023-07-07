import React from "react";
import { Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

const PaiementTotal = () => {
  return (
    <div>
      <br />
      <Row>
        <Col lg={4}>
          <Form.Label htmlFor="amountTotalPay">
            Montant Total Encaissé
          </Form.Label>
          <Form.Control type="number" id="amountTotalPay" placeholder="0.00" />
        </Col>
      </Row>
    </div>
  );
};

export default PaiementTotal;
