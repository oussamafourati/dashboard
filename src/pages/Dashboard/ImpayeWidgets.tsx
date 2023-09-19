import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import CountUp from "react-countup";
import {
  useGetFactureImpayeLastYearQuery,
  useGetFactureImpayeThisMonthQuery,
  useGetFactureImpayeThisYearQuery,
  useGetFactureImpayeToDayQuery,
} from "features/facture/factureSlice";

interface WidgetsProps {
  id: number;
  name: string;
  defaultamount: number;
  amount: number;
  icon: string;
  iconColor: string;
}

const ImpayeWidgets = () => {
  // To Day Unpaid Invoice
  const { data: allToDayFactureImpaye = [] } = useGetFactureImpayeToDayQuery();
  let ToDayFactureImpaye = allToDayFactureImpaye.reduce(
    (sum, i) => (sum += i.MontantTotal!),
    0
  );

  // This Month Unpaid Invoice
  const { data: allThisMonthFactureImpaye = [] } =
    useGetFactureImpayeThisMonthQuery();
  let ThisMonthFactureImpaye = allThisMonthFactureImpaye.reduce(
    (sum, i) => (sum += i.MontantTotal!),
    0
  );

  // This Year Unpaid Invoice
  const { data: allThisYearFactureImpaye = [] } =
    useGetFactureImpayeThisYearQuery();
  let ThisYearFactureImpaye = allThisYearFactureImpaye.reduce(
    (sum, i) => (sum += i.MontantTotal!),
    0
  );

  // Last Year Unpaid Invoice
  const { data: allLastYearFactureImpaye = [] } =
    useGetFactureImpayeLastYearQuery();
  let LastYearFactureImpaye = allLastYearFactureImpaye.reduce(
    (sum, i) => (sum += i.MontantTotal!),
    0
  );

  const [categoryid, setCategoryid] = useState<number>();
  const handlesousCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const getstateid = e.target.value;
    setCategoryid(parseInt(getstateid));
  };

  const widgetsData: Array<WidgetsProps> = [
    {
      id: 3,
      name: "TOTAL Impayé",
      defaultamount: ToDayFactureImpaye!,
      amount: categoryid!,
      icon: "ri-hand-coin-line",
      iconColor: "danger",
    },
  ];
  return (
    <Col>
      {(widgetsData || []).map((item: any, key: number) => (
        <Card className="card-animate mb-3 bg-danger bg-opacity-25 border-0">
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
                  {!categoryid ? (
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
                  id="choices-charge-input"
                  name="choices-charge-input"
                  onChange={handlesousCategory}
                >
                  <option value=""></option>
                  <option value={ToDayFactureImpaye} selected>
                    Aujourd'hui
                  </option>
                  <option value={ThisMonthFactureImpaye}>Mois en cours</option>
                  <option value={ThisYearFactureImpaye}>Année en cours</option>
                  <option value={LastYearFactureImpaye}>Année Dernière</option>
                </select>
              </div>
              <div className="avatar-sm flex-shrink-0">
                <span
                  className={
                    "avatar-title bg-danger bg-opacity-25 text-" +
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

export default ImpayeWidgets;
