import {
  useGetAllArrivagesQuery,
  useGetLastYearArrivageQuery,
  useGetThisMonthArrivageQuery,
  useGetThisYearArrivageQuery,
  useGetToDayArrivageQuery,
} from "features/arrivage/arrivageSlice";
import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import CountUp from "react-countup";

interface WidgetsProps {
  id: number;
  name: string;
  amount: number;
  icon: string;
  iconColor: string;
}

const AchatWidgets = () => {
  const { data: ThisYearArrivage = [] } = useGetThisYearArrivageQuery();
  const { data: ThisMonthArrivage = [] } = useGetThisMonthArrivageQuery();
  const { data: ToDayArrivage = [] } = useGetToDayArrivageQuery();
  const { data: LastYearArrivage = [] } = useGetLastYearArrivageQuery();
  const arrivageTotal = ThisYearArrivage.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const thisMonthTotal = ThisMonthArrivage.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const toDayTotal = ToDayArrivage.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const LastArrivageTotal = LastYearArrivage.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const [selectedValeur, setSelectedValeur] = useState<number>();
  const handleSelectedValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValeur(parseInt(e.target.value));
  };

  const widgetsData: Array<WidgetsProps> = [
    {
      id: 2,
      name: "TOTAL ACHAT",
      amount: selectedValeur!,
      icon: "ph-storefront",
      iconColor: "info",
    },
  ];
  return (
    <React.Fragment>
      {(widgetsData || []).map((item: any, key: number) => (
        <Col key={key}>
          <Card className="card-animate mb-5">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div
                  className={"vr rounded bg-" + item.iconColor + " opacity-50"}
                  style={{ width: "4px" }}
                ></div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-uppercase fw-medium text-muted fs-14 text-truncate">
                    {item.name}
                  </p>
                  <h4 className="fs-22 fw-semibold mb-3">
                    {item.decimal ? "$" : ""}
                    <span className="counter-value" data-target="98851.35">
                      <CountUp start={0} end={item.amount} />
                    </span>
                  </h4>
                  <select
                    className="form-select"
                    id="choices-category-input"
                    name="choices-category-input"
                    onChange={handleSelectedValue}
                  >
                    <option value=""></option>
                    <option value={toDayTotal}>Aujourd'hui</option>
                    <option value={thisMonthTotal}> Mois Dernier</option>
                    <option value={arrivageTotal}>Année en cours</option>
                    <option value={LastArrivageTotal}>Année Dernière</option>
                  </select>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span
                    className={
                      "avatar-title bg-" +
                      item.iconColor +
                      "-subtle text-" +
                      item.iconColor +
                      " rounded fs-3"
                    }
                  >
                    <i className={item.icon}></i>
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

export default AchatWidgets;
