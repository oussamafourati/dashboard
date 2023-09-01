import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import CountUp from "react-countup";
import {
  useGetAllArrivagesQuery,
  useGetLastYearArrivageQuery,
  useGetThisMonthArrivageQuery,
  useGetThisYearArrivageQuery,
  useGetToDayArrivageQuery,
} from "features/arrivage/arrivageSlice";

interface WidgetsProps {
  id: number;
  name: string;
  defaultamount: number;
  amount: number;
  icon: string;
  iconColor: string;
}

const AchatWidgets = () => {
  const { data: allArrivage = [] } = useGetAllArrivagesQuery();
  const { data: ThisYearArrivage = [] } = useGetThisYearArrivageQuery();
  const { data: ThisMonthArrivage = [] } = useGetThisMonthArrivageQuery();
  const { data: ToDayArrivage = [] } = useGetToDayArrivageQuery();
  const { data: LastYearArrivage = [] } = useGetLastYearArrivageQuery();

  const arrivageTotal = allArrivage.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const arrivageTotalYear = ThisYearArrivage.reduce(
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
      defaultamount: arrivageTotal,
      amount: selectedValeur!,
      icon: "ph-storefront",
      iconColor: "info",
    },
  ];
  return (
    <React.Fragment>
      {(widgetsData || []).map((item: any, key: number) => (
        <Col key={key}>
          <Card className="card-animate mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div
                  className={"vr rounded bg-" + item.iconColor + " opacity-50"}
                  style={{ width: "3px" }}
                ></div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-uppercase fw-medium text-muted fs-12 text-truncate">
                    {item.name}
                  </p>
                  <h4 className="fs-14 fw-semibold mb-2">
                    {!selectedValeur ? (
                      <span className="counter-value" data-target="98851.35">
                        <CountUp
                          start={0}
                          end={item.defaultamount}
                          separator=","
                        />{" "}
                        DT
                      </span>
                    ) : (
                      <span className="counter-value" data-target="98851.35">
                        <CountUp start={0} end={item.amount} separator="," /> DT
                      </span>
                    )}
                  </h4>
                  <select
                    className="form-select"
                    id="choices-achat-input"
                    name="choices-achat-input"
                    onChange={handleSelectedValue}
                  >
                    <option value=""></option>
                    <option value={toDayTotal}>Aujourd'hui</option>
                    <option value={thisMonthTotal}>Mois en cours</option>
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
                      " rounded fs-2"
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
