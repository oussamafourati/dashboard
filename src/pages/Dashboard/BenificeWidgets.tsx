import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import CountUp from "react-countup";
import {
  useFetchFacturePayeQuery,
  useFetchFactureYearQuery,
} from "features/facture/factureSlice";
import { useGetThisYearArrivageQuery } from "features/arrivage/arrivageSlice";
import { useGetChargeAnneeQuery } from "features/charge/chargeSlice";

interface WidgetsProps {
  id: number;
  name: string;
  amount: number;
  icon: string;
  iconColor: string;
}

const BenificeWidgets = () => {
  const { data: ThisYearArrivage = [] } = useGetThisYearArrivageQuery();
  const { data: YearCharge = [] } = useGetChargeAnneeQuery();
  const { data: TotalfactureYear = [] } = useFetchFactureYearQuery();
  const arrivagesTotal = ThisYearArrivage.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const chargeYear = YearCharge.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const venteTotalYear = TotalfactureYear.reduce(
    (sum, i) => (sum += i.MontantTotal!),
    0
  );

  const [totalBenifice, setTotalBenifice] = useState<number>(0);

  useEffect(() => {
    setTotalBenifice(venteTotalYear - (arrivagesTotal + chargeYear));
  });

  const widgetsData: Array<WidgetsProps> = [
    {
      id: 6,
      name: "TOTAL Bénifices ",
      amount: totalBenifice,
      icon: "bx bx-money",
      iconColor: "info",
    },
  ];
  return (
    <Col lg={4}>
      <Card className="card-animate mb-3 bg-info bg-opacity-25 border-0">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div
              className={
                "vr rounded bg-" + widgetsData[0].iconColor + " opacity-50"
              }
              style={{ width: "6px" }}
            ></div>
            <div className="flex-grow-1 ms-2">
              <p className="text-uppercase fw-medium text-dark fs-15 text-truncate">
                {widgetsData[0].name}
              </p>
              <h4 className="fs-15 fw-semibold mb-3">
                <span className="counter-value" data-target="98851.35">
                  <CountUp
                    start={0}
                    end={widgetsData[0].amount}
                    separator=","
                  />{" "}
                  DT
                </span>
              </h4>
              {/* </div> */}
            </div>
            <div className="avatar-sm flex-shrink-0">
              <span
                className={
                  "avatar-title bg-info bg-opacity-25 text-info rounded fs-1"
                }
              >
                <i className={widgetsData[0].icon}></i>
              </span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BenificeWidgets;
