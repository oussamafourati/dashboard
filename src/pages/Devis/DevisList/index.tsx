import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import CountUp from "react-countup";
import InvoiceListTable from "./InvoiceListTable";

const DevisList = () => {
  document.title = "Liste des devis | Radhouani";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Liste des Devis" pageTitle="Devis" />
          <InvoiceListTable />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DevisList;
