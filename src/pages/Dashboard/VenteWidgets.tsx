import { useGetAllArrivagesQuery } from "features/arrivage/arrivageSlice";
import {
  useGetAllChargesQuery,
  useGetChargeDayQuery,
  useGetChargeLastYearQuery,
  useGetChargeThreeMonthsQuery,
} from "features/charge/chargeSlice";
import { useFetchFacturePayeQuery } from "features/facture/factureSlice";
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

const VenteWidgets = () => {
  const { data: facturePaye = [] } = useFetchFacturePayeQuery();

  const [categoryid, setCategoryid] = useState<number>();
  const handlesousCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const getstateid = e.target.value;
    setCategoryid(parseInt(getstateid));
  };

  const widgetsData: Array<WidgetsProps> = [
    {
      id: 1,
      name: "TOTAL VENTE",
      amount: 98851.35,
      icon: "ph-wallet",
      iconColor: "secondary",
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
                    onChange={handlesousCategory}
                  >
                    <option value=""></option>
                    <option value="">Aujourd'hui</option>
                    <option value=""> Mois Dernier</option>
                    <option value="">Année en cours</option>
                    <option value="">Année Dernière</option>
                  </select>
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

export default VenteWidgets;
