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

const InvoiceFilter = () => {
  const [type, setType] = useState("");
  const [status, setStatus] = useState(3);

  return (
    <React.Fragment>
      <Row>
        <Col lg={3}>
          <Card className="p-2">
            <Card.Header className="mb-2">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-0">Filters</h5>
                </div>
              </div>
            </Card.Header>
            <Accordion flush defaultActiveKey="0" className="filter-accordion">
              <ClientFilter type={type} setType={setType} />
            </Accordion>
            <Accordion flush defaultActiveKey="0" className="filter-accordion">
              <StatusFilter status={status} setStatus={setStatus} />
            </Accordion>
          </Card>
        </Col>
        {type ? (
          <Col lg={9}>
            {type === "tous" ? (
              <InvoiceListTable />
            ) : type === "passager" ? (
              <InvoiceListTablePassager />
            ) : (
              <InvoiceListTablePro />
            )}
          </Col>
        ) : (
          <Col lg={9}>
            {status === 2 ? (
              <InvoiceListTablePaye />
            ) : status === 0 ? (
              <InvoiceListTableImpaye />
            ) : (
              <InvoiceListTableSemiPaye />
            )}
          </Col>
        )}
      </Row>
    </React.Fragment>
  );
};

export default InvoiceFilter;
