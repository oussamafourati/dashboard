import React, { useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import CountUp from "react-countup";

import {
  useFetchAllChargesin1dayQuery,
  useFetchAllChargesin2daysQuery,
  useFetchAllChargesin3daysQuery,
  useGetChargeDayQuery,
} from "features/charge/chargeSlice";

const TableCharges = () => {
  const { data: chargeToDay = [] } = useGetChargeDayQuery();

  const { data: chargeInOneDay = [] } = useFetchAllChargesin1dayQuery();

  const { data: chargeInTwoDays = [] } = useFetchAllChargesin2daysQuery();

  const { data: chargeInThreeDays = [] } = useFetchAllChargesin3daysQuery();

  const [clickedButton, setClickedButton] = useState("Tous");

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setClickedButton(button.name);
  };

  return (
    <React.Fragment>
      <Col>
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-end">
              <Button
                variant="soft-secondary"
                size="sm"
                className={clickedButton === "Tous" ? "me-1 active" : "me-1"}
                onClick={buttonHandler}
                name="Tous"
              >
                aujourd'hui
              </Button>
              <Button
                variant="soft-secondary"
                size="sm"
                name="1Mois"
                className={clickedButton === "1Mois" ? "me-1 active" : "me-1"}
                onClick={buttonHandler}
              >
                en un jour
              </Button>
              <Button
                variant="soft-secondary"
                size="sm"
                name="6Mois"
                className={clickedButton === "6Mois" ? "me-1 active" : "me-1"}
                onClick={buttonHandler}
              >
                dans 2 jours
              </Button>
              <Button
                variant="soft-secondary"
                size="sm"
                name="1Annee"
                className={clickedButton === "1Annee" ? "me-1 active" : "me-1"}
                onClick={buttonHandler}
              >
                dans 3 jours
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            {clickedButton === "Tous" ? (
              <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                <thead className="text-muted table-light">
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Montant</th>
                    <th scope="col">Date</th>
                    <th scope="col">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {(chargeToDay || []).map((item, key) => (
                    <tr key={key}>
                      <td>
                        <strong>{item.descriptionCharge}</strong>
                      </td>
                      <td>
                        <span className="text-secondary">
                          <CountUp
                            start={0}
                            end={parseInt(item.montantCharges)}
                            separator=","
                            duration={1}
                          />{" "}
                          DT
                        </span>
                      </td>
                      <td>{item.dateCharges}</td>
                      <td>{item.typeCharges}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : clickedButton === "1Mois" ? (
              <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                <thead className="text-muted table-light">
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Montant</th>
                    <th scope="col">Date</th>
                    <th scope="col">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {(chargeInOneDay || []).map((item, key) => (
                    <tr key={key}>
                      <td>
                        <strong>{item.descriptionCharge}</strong>
                      </td>
                      <td>
                        <span className="text-secondary">
                          <CountUp
                            start={0}
                            end={parseInt(item.montantCharges)}
                            separator=","
                            duration={1}
                          />{" "}
                          DT
                        </span>
                      </td>
                      <td>{item.dateCharges}</td>
                      <td>{item.typeCharges}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : clickedButton === "6Mois" ? (
              <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                <thead className="text-muted table-light">
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Montant</th>
                    <th scope="col">Date</th>
                    <th scope="col">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {(chargeInTwoDays || []).map((item, key) => (
                    <tr key={key}>
                      <td>
                        <strong>{item.descriptionCharge}</strong>
                      </td>
                      <td>
                        <span className="text-secondary">
                          <CountUp
                            start={0}
                            end={parseInt(item.montantCharges)}
                            separator=","
                            duration={1}
                          />{" "}
                          DT
                        </span>
                      </td>
                      <td>{item.dateCharges}</td>
                      <td>{item.typeCharges}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : clickedButton === "1Annee" ? (
              <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                <thead className="text-muted table-light">
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Montant</th>
                    <th scope="col">Date</th>
                    <th scope="col">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {(chargeInThreeDays || []).map((item, key) => (
                    <tr key={key}>
                      <td>
                        <strong>{item.descriptionCharge}</strong>
                      </td>
                      <td>
                        <span className="text-secondary">
                          <CountUp
                            start={0}
                            end={parseInt(item.montantCharges)}
                            separator=","
                            duration={1}
                          />{" "}
                          DT
                        </span>
                      </td>
                      <td>{item.dateCharges}</td>
                      <td>{item.typeCharges}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <SimpleBar className="mt-5 text-center p-4">
                <div>
                  <p className="fs-18 text-muted fw-medium">
                    Vous n'avez rien à payer ces jours-ci
                  </p>
                </div>
              </SimpleBar>
            )}
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default TableCharges;
