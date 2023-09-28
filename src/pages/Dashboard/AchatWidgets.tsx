import React, { useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
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
      defaultamount: toDayTotal,
      amount: selectedValeur!,
      icon: "ph-storefront",
      iconColor: "dark",
    },
  ];
  return (
    <Col>
      {(widgetsData || []).map((item: any, key: number) => (
        <Card className="card-animate mb-3 bg-dark bg-opacity-25 rounded-9">
          <Card.Body key={key}>
            {/* <div className="p-1 bg-white rounded"> */}
            <div className="d-flex justify-content-between">
              <div
                className={"vr rounded bg-" + item.iconColor + " opacity-50"}
                style={{ width: "6px" }}
              ></div>
              <div className="flex-grow-1 ms-2">
                <p className="text-uppercase fw-medium text-dark fs-15 text-truncate">
                  {item.name}
                </p>
                <h4 className="fs-14 fw-bold mb-2">
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

                <Form.Select
                  id="choices-achat-input"
                  name="choices-achat-input"
                  onChange={handleSelectedValue}
                  size="sm"
                  className="m-2 rounded-4 shadow bg-dark bg-opacity-10 border-0 text-dark"
                >
                  <option value={toDayTotal} selected>
                    Aujourd'hui
                  </option>
                  <option value={thisMonthTotal}>Mois en cours</option>
                  <option value={arrivageTotalYear}>Année en cours</option>
                  <option value={LastArrivageTotal}>Année Dernière</option>
                </Form.Select>
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
            {/* </div> */}
          </Card.Body>
        </Card>
      ))}
    </Col>
  );
};

export default AchatWidgets;
