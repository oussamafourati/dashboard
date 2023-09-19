import React from "react";
import { Card, Col } from "react-bootstrap";
import CountUp from "react-countup";
import { useFetchFactureImpayeQuery } from "features/facture/factureSlice";

interface WidgetsProps {
  id: number;
  name: string;
  amount: number;
  icon: string;
  iconColor: string;
}

const PayeWidgets = () => {
  const { data: AllArrivages = [] } = useFetchFactureImpayeQuery();

  const arrivageTotal = AllArrivages.reduce(
    (sum, i) => (sum += i.MontantTotal!),
    0
  );

  const widgetsData: Array<WidgetsProps> = [
    {
      id: 3,
      name: "TOTAL Payés",
      amount: arrivageTotal,
      icon: "ph-check-square-offset",
      iconColor: "success",
    },
  ];
  return (
    <Col lg={4}>
      {(widgetsData || []).map((item: any, key: number) => (
        <Card className="card-animate mb-3 bg-success bg-opacity-25 border-0">
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
                <h4 className="fs-15 fw-semibold mb-3">
                  <span className="counter-value" data-target="98851.35">
                    <CountUp start={0} end={item.amount} separator="," /> DT
                  </span>
                </h4>
                {/* </div> */}
              </div>
              <div className="avatar-sm flex-shrink-0">
                <span
                  className={
                    "avatar-title bg-success bg-opacity-25 text-" +
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
      ))}{" "}
    </Col>
  );
};

export default PayeWidgets;
