import BreadCrumb from "Common/BreadCrumb";
import React from "react";
import { Container, Row } from "react-bootstrap";

import ProductFilter from "./ProductFilter";

const ListView = () => {
  document.title = "Liste des Produits | Radhouani";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Liste des Produits " pageTitle="Produit" />
          <Row>
            <ProductFilter />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ListView;
