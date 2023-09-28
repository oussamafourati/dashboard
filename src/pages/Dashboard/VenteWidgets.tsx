import React, { useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import CountUp from "react-countup";
import {
  useFetchAllFactureQuery,
  useFetchFactureDayQuery,
  useFetchFactureLastYearQuery,
  useFetchFactureMonthQuery,
  useFetchFactureYearQuery,
} from "features/facture/factureSlice";

interface WidgetsProps {
  id: number;
  name: string;
  amount: number;
  defaultamount: number;
  icon: string;
  iconColor: string;
}

const VenteWidgets = () => {
  const { data: TotalfactureDay = [] } = useFetchFactureDayQuery();
  const { data: Totalfacture = [] } = useFetchAllFactureQuery();
  const { data: TotalfactureMonth = [] } = useFetchFactureMonthQuery();
  const { data: TotalfactureYear = [] } = useFetchFactureYearQuery();
  const { data: TotalfactureLastYear = [] } = useFetchFactureLastYearQuery();

  const [selectedValeur, setSelectedValeur] = useState<number>();
  const handleSelectedValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValeur(parseInt(e.target.value));
  };

  const venteTotal = Totalfacture.reduce(
    (sum, i) => (sum += i.MontantTotal!),
    0
  );

  const venteTotalDay = TotalfactureDay.reduce(
    (sum, i) => (sum += i.MontantTotal!),
    0
  );

  const venteTotalMonth = TotalfactureMonth.reduce(
    (sum, i) => (sum += i.MontantTotal!),
    0
  );

  const venteTotalYear = TotalfactureYear.reduce(
    (sum, i) => (sum += i.MontantTotal!),
    0
  );

  const venteTotalLastYear = TotalfactureLastYear.reduce(
    (sum, i) => (sum += i.MontantTotal!),
    0
  );

  const widgetsData: Array<WidgetsProps> = [
    {
      id: 1,
      name: "TOTAL VENTE",
      defaultamount: venteTotalDay,
      amount: selectedValeur!,
      icon: "ph-wallet",
      iconColor: "secondary",
    },
  ];
  return (
    <Col>
      {(widgetsData || []).map((item: any, key: number) => (
        <Card className="card-animate mb-2 bg-secondary bg-opacity-25 border-0">
          <Card.Body key={key}>
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
                  id="choices-vente-input"
                  name="choices-vente-input"
                  onChange={handleSelectedValue}
                  size="sm"
                  className="m-2 rounded-4 shadow bg-secondary bg-opacity-25 border-0 text-dark"
                >
                  <option value={venteTotalDay} selected>
                    Aujourd'hui
                  </option>
                  <option value={venteTotalMonth}> Mois en cours</option>
                  <option value={venteTotalYear}>Année en cours</option>
                  <option value={venteTotalLastYear}>Année Dernière</option>
                </Form.Select>
              </div>
              <div className="avatar-sm flex-shrink-0">
                <span
                  className={
                    "avatar-title bg-secondary bg-opacity-25 text-" +
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
      ))}
    </Col>
  );
};

export default VenteWidgets;
