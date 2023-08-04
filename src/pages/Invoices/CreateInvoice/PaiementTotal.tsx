import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

interface ChildProps {
  setCount: (count: number) => void;
}
const PaiementTotal: React.FC<ChildProps> = ({ setCount }) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(event.target.value));
  };

  return (
    <div>
      <br />
      <Row>
        <Col lg={4}>
          <Form.Label htmlFor="amountTotalPay">Montant Encaissé</Form.Label>
          <Form.Control
            type="text"
            id="amountTotalPay"
            placeholder="0.00"
            onChange={onChangeHandler}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PaiementTotal;
