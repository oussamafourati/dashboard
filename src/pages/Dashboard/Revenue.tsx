import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RevenueCharts } from "./DashboardCharts";
import CountUp from "react-countup";
import { useSelector, useDispatch } from "react-redux";
//import images
import bodyLight from "assets/images/sidebar/body-light-1.png";
import { getChartData as getChartApiData } from "../../slices/thunk";

import {
  useGetAllChargesQuery,
  useGetChargeMonthQuery,
  useGetChargeAnneeQuery,
  useGetAllChargesSixMonthsQuery,
} from "features/charge/chargeSlice";
import {
  useFetchAllFactureQuery,
  useFetchFacturesSixMonthsQuery,
  useFetchFactureMonthQuery,
  useFetchFactureYearQuery,
} from "features/facture/factureSlice";
import {
  useGetAllArrivagesQuery,
  useGetThisYearArrivageQuery,
  useGetArrivagesSixMonthsQuery,
  useGetThisMonthArrivageQuery,
} from "features/arrivage/arrivageSlice";

const Revenue = () => {
  const dispatch: any = useDispatch();

  //Charges
  const { data: AllCharges = [] } = useGetAllChargesQuery();
  const { data: allChargesAnnee = [] } = useGetChargeAnneeQuery();
  const { data: allCharges6Mois = [] } = useGetAllChargesSixMonthsQuery();
  const { data: allChargesMois = [] } = useGetChargeMonthQuery();
  const TotalCahrges = AllCharges.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const TotalCahrgesAnnee = allChargesAnnee.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const TotalCahrges6Mois = allCharges6Mois.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const TotalCahrgesMois = allChargesMois.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  //Ventes ou bien Factures
  const { data: allVentes = [] } = useFetchAllFactureQuery();
  const { data: allVentesAnnee = [] } = useFetchFactureYearQuery();
  const { data: allVentes6Mois = [] } = useFetchFacturesSixMonthsQuery();
  const { data: allVentesMois = [] } = useFetchFactureMonthQuery();

  const TotalVentes = allVentes.reduce((sum, i) => (sum += i.MontantTotal), 0);
  const TotalVentesAnnee = allVentesAnnee.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );
  const TotalVentes6Mois = allVentes6Mois.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );
  const TotalVentesMois = allVentesMois.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  // Achats ou bien Arrivage
  const { data: allAchats = [] } = useGetAllArrivagesQuery();
  const { data: allYearAchats = [] } = useGetThisYearArrivageQuery();
  const { data: allSixMonthsAchats = [] } = useGetArrivagesSixMonthsQuery();
  const { data: allThisMonthAchats = [] } = useGetThisMonthArrivageQuery();

  const TotalAchats = allAchats.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const TotalAchatsAnnee = allYearAchats.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const TotalAchatsMois = allSixMonthsAchats.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const TotalAchats6Mois = allThisMonthAchats.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const [chartData, setchartData] = useState<any>([]);

  const [activeChart, setactiveChart] = useState<string>("all");

  const { revenueChartData } = useSelector((state: any) => ({
    revenueChartData: state.Dashboard.chartData,
  }));

  useEffect(() => {
    setchartData(revenueChartData);
  }, [revenueChartData]);

  const onChangeChartPeriod = (pType: any) => {
    dispatch(getChartApiData(pType));
    setactiveChart(pType);
  };

  useEffect(() => {
    dispatch(getChartApiData("all"));
    setactiveChart("all");
  }, [dispatch]);

  return (
    <React.Fragment>
      <Col xxl={12} className="order-last">
        <Card>
          <Card.Header className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Bilan</h4>
            <div>
              <Button
                variant="soft-secondary"
                size="sm"
                className={activeChart === "all" ? "me-1 active" : "me-1"}
                onClick={() => onChangeChartPeriod("all")}
              >
                Tous
              </Button>
              <Button
                variant="soft-secondary"
                size="sm"
                className={activeChart === "monthly" ? "me-1 active" : "me-1"}
                onClick={() => onChangeChartPeriod("monthly")}
              >
                1Mois
              </Button>
              <Button
                variant="soft-secondary"
                size="sm"
                className={
                  activeChart === "halfyearly" ? "me-1 active" : "me-1"
                }
                onClick={() => onChangeChartPeriod("halfyearly")}
              >
                6Mois
              </Button>
              <Button
                variant="soft-primary"
                size="sm"
                className={activeChart === "yearly" ? "active" : ""}
                onClick={() => onChangeChartPeriod("yearly")}
              >
                1Année
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xxl={8}>
                <RevenueCharts
                  chartData={chartData}
                  dataColors='["--tb-secondary", "--tb-danger", "--tb-success"]'
                />
              </Col>
              <Col xxl={4}>
                <Row className="g-0 text-center">
                  <Col xs={6} sm={6}>
                    <div className="p-3 border border-dashed border-bottom-0">
                      <h5 className="mb-1">
                        <span className="counter-value" data-target="65802">
                          <CountUp start={0} end={TotalCahrges} separator="," />
                        </span>
                      </h5>
                      <p className="text-muted mb-0">Charges</p>
                    </div>
                  </Col>
                  <Col xs={6} sm={6}>
                    <div className="p-3 border border-dashed border-start-0">
                      <h5 className="mb-1">
                        <span className="counter-value" data-target="98851.35">
                          <CountUp
                            start={0}
                            end={TotalVentes}
                            separator=","
                            decimals={2}
                          />
                        </span>
                      </h5>
                      <p className="text-muted mb-0">Vente</p>
                    </div>
                  </Col>
                  <Col xs={6} sm={6}>
                    <div className="p-3 border border-dashed">
                      <h5 className="mb-1">
                        <span className="counter-value" data-target="2450">
                          <CountUp start={0} end={TotalAchats} separator="," />
                        </span>
                      </h5>
                      <p className="text-muted mb-0">Achats</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="overflow-hidden">
          <div
            className="position-absolute opacity-50 start-0 end-0 top-0 bottom-0"
            style={{ backgroundImage: `url(${bodyLight})` }}
          ></div>
          <Card.Body className="d-flex justify-content-end align-items-center z-1">
            <div>
              <Link
                to="/product-create"
                className="btn btn-success btn-label btn-hover rounded-pill"
              >
                <i className="bi bi-box-seam label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                Ajouter Produit
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Revenue;
