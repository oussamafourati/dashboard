import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";

const StockReport = () => {
  // The selected Date Echeance
  const [selectedEcheance, setSelectedEcheance] = useState<String>();

  // This function will be triggered when a radio button is selected
  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEcheance(event.target.value);
  };
  return (
    <React.Fragment>
      <Col xxl={6}>
        <Card>
          <Card.Header className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Liste des Echéances</h4>
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
            <p>Hello</p>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default StockReport;
