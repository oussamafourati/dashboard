import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import CountUp from "react-countup";
import {
  useGetAllChargesQuery,
  useGetChargeDayQuery,
  useGetChargeLastYearQuery,
  useGetChargeThreeMonthsQuery,
  useGetChargeAnneeQuery,
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
  const { data: AllCharge = [] } = useGetAllChargesQuery();
  const { data: YearCharge = [] } = useGetChargeAnneeQuery();
  const { data: DayCharge = [] } = useGetChargeDayQuery();
  const { data: LastYear = [] } = useGetChargeLastYearQuery();
  const { data: ThreeMonths = [] } = useGetChargeThreeMonthsQuery();

  const chargeTotal = AllCharge.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

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
      defaultamount: chargeYear,
      amount: categoryid!,
      icon: "bi bi-currency-dollar",
      iconColor: "warning",
    },
  ];
  return (
    <React.Fragment>
      {(widgetsData || []).map((item: any, key: number) => (
        <Col key={key}>
          <Card className="card-animate mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div
                  className={"vr rounded bg-" + item.iconColor + " opacity-50"}
                  style={{ width: "3px" }}
                ></div>
                <div className="flex-grow-1 ms-3">
                  <p className="text-uppercase fw-medium text-muted fs-12 text-truncate">
                    {item.name}
                  </p>
                  <h4 className="fs-14 fw-semibold mb-2">
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
                    <option value={chargeDay}>Aujourd'hui</option>
                    <option value={chargeTotalLastThreeMonths}>
                      {" "}
                      Mois en cours
                    </option>
                    <option value={chargeYear}>Année en cours</option>
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
                      " rounded fs-2"
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
