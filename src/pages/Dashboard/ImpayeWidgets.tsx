import React from "react";
import { Card, Col } from "react-bootstrap";
import CountUp from "react-countup";
import { useFetchFacturePayeQuery } from "features/facture/factureSlice";

interface WidgetsProps {
  id: number;
  name: string;
  amount: number;
  icon: string;
  iconColor: string;
}

const ImpayeWidgets = () => {
  const { data: allArrivages = [] } = useFetchFacturePayeQuery();
  const arrivagesTotal = allArrivages.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const widgetsData: Array<WidgetsProps> = [
    {
      id: 3,
      name: "TOTAL Impayés",
      amount: arrivagesTotal,
      icon: "ph-clock",
      iconColor: "danger",
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
                  <h4 className="fs-18 fw-semibold mb-3">
                    <span className="counter-value" data-target="98851.35">
                      <CountUp start={0} end={item.amount} separator="," /> DT
                    </span>
                  </h4>
                  {/* </div> */}
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

export default ImpayeWidgets;
