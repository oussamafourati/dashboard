import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { TopCategoriesChart } from "./DashboardCharts";
import { useFetchTopCategoriesQuery } from "features/ligneVente/ligneVenteSlice";

const TopCategories = () => {
  const { data: TopCategories = [] } = useFetchTopCategoriesQuery();
  return (
    <React.Fragment>
      <Col xxl={4} lg={6}>
        <Card className="card-height-100">
          <Card.Header className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Top Catégories</h4>
          </Card.Header>
          <Card.Body>
            <div
              id="multiple_radialbar"
              data-colors='["--tb-primary", "--tb-danger", "--tb-success", "--tb-secondary"]'
              className="apex-charts"
              dir="ltr"
            ></div>
            <TopCategoriesChart dataColors='["--tb-primary", "--tb-danger", "--tb-success", "--tb-secondary"]' />

            <Row className="g-3">
              <Col md={6}>
                {TopCategories.map((categories, key) => (
                  <Card className="text-center border-dashed mb-0" key={key}>
                    <Card.Body>
                      <h6 className="fs-16">{categories.total_sold}</h6>
                      <i className="bi bi-square-fill text-primary me-1 fs-11"></i>{" "}
                      {categories.nom}
                    </Card.Body>
                  </Card>
                ))}
              </Col>
              {/* <Col md={6}>
                <Card className="text-center border-dashed mb-0">
                  <Card.Body>
                    <h6 className="fs-16">874</h6>
                    <i className="bi bi-square-fill text-danger me-1 fs-11"></i>{" "}
                    Peinture
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="text-center border-dashed mb-0">
                  <Card.Body>
                    <h6 className="fs-16">321</h6>
                    <i className="bi bi-square-fill text-success me-1 fs-11"></i>{" "}
                    Menuiserie
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="text-center border-dashed mb-0">
                  <Card.Body>
                    <h6 className="fs-16">741</h6>
                    <i className="bi bi-square-fill text-secondary me-1 fs-11"></i>{" "}
                    Autres
                  </Card.Body>
                </Card>
              </Col> */}
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default TopCategories;
