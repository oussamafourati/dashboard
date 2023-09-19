import React, { useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import InvoiceListTable from "./InvoiceListTable";
import InvoiceListTablePassager from "./InvoiceListTablePassager";
import InvoiceListTablePro from "./InvoiceListTablePro";
import StatusFilter from "./StatusFilter";
import ClientFilter from "./ClientFilter";
import InvoiceListTablePaye from "./InvoiceListTablePaye";
import InvoiceListTableImpaye from "./InvoiceListTableImpaye";
import InvoiceListTableSemiPaye from "./InvoiceListTableSemiPaye";
import InvoiceListTablePassagerPaye from "./InvoiceListTablePassagerPaye";
import InvoiceListTablePassagerImpaye from "./InvoiceListTablePassagerImpaye";
import InvoiceListTablePassagerSemipaye from "./InvoiceListTablePassagerSemipaye";
import InvoiceListTableProImpaye from "./InvoiceListTableProImpaye";
import InvoiceListTableProSemipaye from "./InvoiceListTableProSemipaye";
import InvoiceListTableProPaye from "./InvoiceListTableProPaye";

const InvoiceFilter = () => {
  const [type, setType] = useState("");
  const [status, setStatus] = useState(3);

  return (
    <React.Fragment>
      <Row>
        <Col lg={2}>
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <h5 className="card-title mb-4">Filters</h5>
            </div>
          </div>
          <Accordion flush defaultActiveKey="0" className="filter-accordion">
            <ClientFilter type={type} setType={setType} />
          </Accordion>
          <Accordion flush defaultActiveKey="0" className="filter-accordion">
            <StatusFilter status={status} setStatus={setStatus} />
          </Accordion>
        </Col>
        <Col lg={10}>
          {!type && status === 3 ? (
            <InvoiceListTable />
          ) : type === "tous" && status === 3 ? (
            <InvoiceListTable />
          ) : type === "" && status === 0 ? (
            <InvoiceListTableImpaye />
          ) : type === "" && status === 2 ? (
            <InvoiceListTablePaye />
          ) : type === "" && status === 1 ? (
            <InvoiceListTableSemiPaye />
          ) : type === "passager" && status === 3 ? (
            <InvoiceListTablePassager />
          ) : type === "pro" && status === 3 ? (
            <InvoiceListTablePro />
          ) : type === "tous" && status === 0 ? (
            <InvoiceListTableImpaye />
          ) : type === "tous" && status === 1 ? (
            <InvoiceListTableSemiPaye />
          ) : type === "tous" && status === 2 ? (
            <InvoiceListTablePaye />
          ) : type === "passager" && status === 2 ? (
            <InvoiceListTablePassagerPaye />
          ) : type === "passager" && status === 1 ? (
            <InvoiceListTablePassagerSemipaye />
          ) : type === "passager" && status === 0 ? (
            <InvoiceListTablePassagerImpaye />
          ) : type === "pro" && status === 0 ? (
            <InvoiceListTableProImpaye />
          ) : type === "pro" && status === 1 ? (
            <InvoiceListTableProSemipaye />
          ) : type === "pro" && status === 2 ? (
            <InvoiceListTableProPaye />
          ) : (
            ""
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default InvoiceFilter;
