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

const ChargeWidgets = () => {
  const { data = [] } = useGetAllChargesQuery();
  const { data: DayCharge = [] } = useGetChargeDayQuery();
  const { data: LastYear = [] } = useGetChargeLastYearQuery();
  const { data: ThreeMonths = [] } = useGetChargeThreeMonthsQuery();

  const chargeTotal = data.reduce(
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

  const chargeTotalLastThreeMonths = ThreeMonths.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  // const montantTotalPaye = facturePaye.reduce(
  //   (sum, i) => (sum += i.MontantTotal),
  //   0
  // );

  const [categoryid, setCategoryid] = useState<number>();
  const handlesousCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const getstateid = e.target.value;
    setCategoryid(parseInt(getstateid));
  };

  const widgetsData: Array<WidgetsProps> = [
    {
      id: 4,
      name: "TOTAL CHARGE",
      amount: categoryid!,
      icon: "bi bi-currency-dollar",
      iconColor: "warning",
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
                    <option value={chargeDay}>Aujourd'hui</option>
                    <option value={chargeTotalLastThreeMonths}>
                      {" "}
                      Mois Dernier
                    </option>
                    <option value={chargeTotal}>Année en cours</option>
                    <option value={chargeTotalLastYear}>Année Dernière</option>
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

export default ChargeWidgets;
