import React, { useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import EcheanceToDay from "pages/Echeances/EcheanceToDay";
import EcheanceWeek from "pages/Echeances/EcheanceWeek";
import EcheanceThisMonth from "pages/Echeances/EcheanceThisMonth";
import EcheanceNextMonth from "pages/Echeances/EcheanceNextMonth";
import AllEcheances from "pages/Echeances/AllEcheances";

const EcheanceListTable = () => {
  // The selected Date Echeance
  const [selectedEcheance, setSelectedEcheance] = useState<String>();

  // This function will be triggered when a radio button is selected
  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEcheance(event.target.value);
  };
  document.title = "Echéances | Radhouani";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Liste des Echéances" pageTitle="Echéances" />
          <Col xxl={9} className="text-center">
            <Card className="mt-5">
              <Card.Header className="align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">
                  Liste des Echéances
                </h4>
                <div className="flex-shrink-0">
                  <select
                    className="form-select"
                    id="choices-category-input"
                    name="choices-category-input"
                    onChange={selectHandler}
                  >
                    <option value=""></option>
                    <option value="toDay">Aujourd'hui</option>
                    <option value="thisWeek">Semaine en cours</option>
                    <option value="thisMonth">Mois en cours</option>
                    <option value="nextMonth">Mois prochain</option>
                  </select>
                </div>
              </Card.Header>

              <Card.Body>
                {!selectedEcheance ? (
                  <AllEcheances />
                ) : selectedEcheance === "thisWeek" ? (
                  <EcheanceWeek />
                ) : selectedEcheance === "thisMonth" ? (
                  <EcheanceThisMonth />
                ) : selectedEcheance === "toDay" ? (
                  <EcheanceToDay />
                ) : (
                  <EcheanceNextMonth />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcheanceListTable;
