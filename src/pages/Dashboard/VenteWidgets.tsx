import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
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
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const venteTotalDay = TotalfactureDay.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const venteTotalMonth = TotalfactureMonth.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const venteTotalYear = TotalfactureYear.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const venteTotalLastYear = TotalfactureLastYear.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const widgetsData: Array<WidgetsProps> = [
    {
      id: 1,
      name: "TOTAL VENTE",
      defaultamount: venteTotal,
      amount: selectedValeur!,
      icon: "ph-wallet",
      iconColor: "secondary",
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
                  <select
                    className="form-select"
                    id="choices-vente-input"
                    name="choices-vente-input"
                    onChange={handleSelectedValue}
                  >
                    <option value=""></option>
                    <option value={venteTotalDay}>Aujourd'hui</option>
                    <option value={venteTotalMonth}> Mois en cours</option>
                    <option value={venteTotalYear}>Année en cours</option>
                    <option value={venteTotalLastYear}>Année Dernière</option>
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

export default VenteWidgets;
