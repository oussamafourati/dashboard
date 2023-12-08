import React from "react";
import ChargeWidgets from "./ChargeWidgets";
import VenteWidgets from "./VenteWidgets";
import AchatWidgets from "./AchatWidgets";
import ImpayeWidgets from "./ImpayeWidgets";
import PayeWidgets from "./PayeWidgets";
import BenificeWidgets from "./BenificeWidgets";
import { Col, Row } from "react-bootstrap";
import CapitalWidgets from "./CapitalWidgets";

const Widgets = () => {
  return (
    <React.Fragment>
      <Row>
        <VenteWidgets />
        <AchatWidgets />
        <ChargeWidgets />
        <ImpayeWidgets />
      </Row>
      <Row className="justify-content-center">
        <PayeWidgets />
        <BenificeWidgets />
        <CapitalWidgets />
      </Row>
    </React.Fragment>
  );
};

export default Widgets;
