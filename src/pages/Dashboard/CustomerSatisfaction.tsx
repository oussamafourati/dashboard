import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { SatisfactionChart } from "./DashboardCharts";

const CustomerSatisfaction = () => {
  return (
    <React.Fragment>
      <Col xxl={3}>
        <Card className="card-height-100">
          <Card.Header className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Rapport des Ventes</h4>
          </Card.Header>
          <Card.Body>
            <div
              id="area_chart_spline"
              data-colors='["--tb-primary", "--tb-success"]'
              className="apex-charts"
              dir="ltr"
            ></div>
            <SatisfactionChart dataColors='["--tb-primary", "--tb-success"]' />

            <div className="mt-3 p-3 border rounded text-center">
              <Row>
                <Col xl={6} className="border-end">
                  <h6 className="fs-17">{1234785}DT</h6>
                  <p className="text-muted mb-0">
                    <i className="bi bi-app-indicator text-primary align-middle me-1"></i>{" "}
                    Mois en cours
                  </p>
                </Col>
                <Col xl={6}>
                  <h6 className="fs-17">{9650214}DT</h6>
                  <p className="text-muted mb-0">
                    <i className="bi bi-app-indicator text-success align-middle me-1"></i>{" "}
                    Mois Dernier
                  </p>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default CustomerSatisfaction;
