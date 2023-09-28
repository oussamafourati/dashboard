import React, { useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import CountUp from "react-countup";
import {
  useGetChargeDayQuery,
  useGetChargeLastYearQuery,
  useGetChargeAnneeQuery,
  useGetChargeMonthQuery,
} from "features/charge/chargeSlice";

interface WidgetsProps {
  id: number;
  name: string;
  defaultamount: number;
  amount: number;
  icon: string;
  iconColor: string;
}

const ChargeWidgets = () => {
  const { data: YearCharge = [] } = useGetChargeAnneeQuery();
  const { data: DayCharge = [] } = useGetChargeDayQuery();
  const { data: LastYear = [] } = useGetChargeLastYearQuery();
  const { data: allChargesMois = [] } = useGetChargeMonthQuery();

  const chargeYear = YearCharge.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const chargeDay = DayCharge.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const chargeTotalLastYear = LastYear.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const chargeTotalThisMonth = allChargesMois.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const [categoryid, setCategoryid] = useState<number>();
  const handlesousCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const getstateid = e.target.value;
    setCategoryid(parseInt(getstateid));
  };

  const widgetsData: Array<WidgetsProps> = [
    {
      id: 4,
      name: "TOTAL CHARGE",
      defaultamount: chargeDay!,
      amount: categoryid!,
      icon: "bi bi-currency-dollar",
      iconColor: "warning",
    },
  ];
  return (
    <Col>
      {(widgetsData || []).map((item: any, key: number) => (
        <Card className="card-animate mb-3 bg-warning bg-opacity-25 border-0">
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
                <Form.Select
                  size="sm"
                  className="m-2 rounded-4 shadow bg-warning bg-opacity-25 border-0 text-dark"
                  id="choices-charge-input"
                  name="choices-charge-input"
                  onChange={handlesousCategory}
                >
                  <option value={chargeDay} selected>
                    Aujourd'hui
                  </option>
                  <option value={chargeTotalThisMonth}>Mois en cours</option>
                  <option value={chargeYear}>Année en cours</option>
                  <option value={chargeTotalLastYear}>Année Dernière</option>
                </Form.Select>
              </div>
              <div className="avatar-sm flex-shrink-0">
                <span
                  className={
                    "avatar-title bg-warning bg-opacity-25 text-" +
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

export default ChargeWidgets;
