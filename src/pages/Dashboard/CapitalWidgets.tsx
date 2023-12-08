import React, { useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import CountUp from "react-countup";
import { useGetQtyProduitQuery } from "features/arrivageProduit/arrivageProduitSlice";

interface WidgetsProps {
  id: number;
  name: string;
  defaultamount: number;
  amount: number;
  icon: string;
  iconColor: string;
}

const CapitalWidgets = () => {
  const { data: QtyProduct = [] } = useGetQtyProduitQuery();
  
  const stockTotal = QtyProduct.reduce(
    (sum, i) => (sum += parseInt(i.TotalQuantity!)),
    0
  );

  const priceTotal = QtyProduct.reduce((sum, i) => (sum += i.SUMTOTAL!), 0);

  const widgetsData: Array<WidgetsProps> = [
    {
      id: 7,
      name: "Capital",
      defaultamount: stockTotal,
      amount: priceTotal!,
      icon: "ph-bank",
      iconColor: "dark",
    },
  ];
  return (
    <Col lg={4}>
      <Card className="card-animate mb-3 bg-light bg-opacity-50 border-0">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div
              className={
                "vr rounded bg-" + widgetsData[0].iconColor + " opacity-25"
              }
              style={{ width: "6px" }}
            ></div>
            <div className="flex-grow-1 ms-2">
              <p className="text-uppercase fw-medium text-dark fs-14 text-truncate">
                {widgetsData[0].name}
              </p>
              <h4 className="fs-15 fw-semibold mb-1">
                <span className="counter-value" data-target="98851.35">
                  <CountUp
                    start={0}
                    end={widgetsData[0].amount}
                    separator=","
                  />{" "}
                  DT
                </span>
              </h4>
              <span className="badge bg-dark me-1 text-light fs-14">
              <CountUp
                    start={0}
                    end={widgetsData[0].defaultamount}
                    separator=","
                  />
                      </span>{" "}
              {/* </div> */}
            </div>
            <div className="avatar-sm flex-shrink-0">
              <span
                className={
                  "avatar-title bg-dark bg-opacity-75 text-light rounded fs-1"
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

export default CapitalWidgets;
