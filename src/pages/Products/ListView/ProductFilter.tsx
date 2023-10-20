import React from "react";
import { Col } from "react-bootstrap";
import ProductTable from "./ProductTable";

const ProductFilter = () => {
  return (
    <React.Fragment>
      <Col xl={12} lg={8}>
        <ProductTable />
      </Col>
    </React.Fragment>
  );
};

export default ProductFilter;
