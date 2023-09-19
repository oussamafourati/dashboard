import React, { useState, useEffect } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
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
  useGetChargeWeekQuery,
} from "features/charge/chargeSlice";
import {
  useFetchAllFactureQuery,
  useFetchFacturesSixMonthsQuery,
  useFetchFactureMonthQuery,
  useFetchFactureYearQuery,
  useFetchFactureWeekQuery,
} from "features/facture/factureSlice";
import {
  useGetAllArrivagesQuery,
  useGetThisYearArrivageQuery,
  useGetArrivagesSixMonthsQuery,
  useGetThisMonthArrivageQuery,
  useGetArrivageWeekQuery,
} from "features/arrivage/arrivageSlice";

const Revenue = () => {
  const dispatch: any = useDispatch();

  //Charges
  const { data: AllCharges = [] } = useGetChargeWeekQuery();
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
  const { data: allVentes = [] } = useFetchFactureWeekQuery();
  const { data: allVentesAnnee = [] } = useFetchFactureYearQuery();
  const { data: allVentes6Mois = [] } = useFetchFacturesSixMonthsQuery();
  const { data: allVentesMois = [] } = useFetchFactureMonthQuery();

  const TotalVentes = allVentes.reduce((sum, i) => (sum += i.MontantTotal!), 0);
  const TotalVentesAnnee = allVentesAnnee.reduce(
    (sum, i) => (sum += i.MontantTotal!),
    0
  );
  const TotalVentes6Mois = allVentes6Mois.reduce(
    (sum, i) => (sum += i.MontantTotal!),
    0
  );
  const TotalVentesMois = allVentesMois.reduce(
    (sum, i) => (sum += i.MontantTotal!),
    0
  );

  // Achats ou bien Arrivage
  const { data: allAchats = [] } = useGetArrivageWeekQuery();
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

  const TotalAchatsMois = allThisMonthAchats.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const TotalAchats6Mois = allSixMonthsAchats.reduce(
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

  const [clickedButton, setClickedButton] = useState("1Mois");

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setClickedButton(button.name);
  };

  const [modal_AddBilanModals, setmodal_AddBilanModals] =
    useState<boolean>(false);
  function tog_AddBilanModals() {
    setmodal_AddBilanModals(!modal_AddBilanModals);
  }

  return (
    <React.Fragment>
      <Link
        to="#"
        onClick={() => tog_AddBilanModals()}
        className="flex-shrink-0"
      >
        <Card>
          <Card.Header className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Bilan</h4>
            {/* <div>
              <Button
                variant="soft-secondary"
                size="sm"
                className={clickedButton === "Tous" ? "me-1 active" : "me-1"}
                onClick={buttonHandler}
                name="Tous"
              >
                Semaine
              </Button>
              <Button
                variant="soft-secondary"
                size="sm"
                name="1Mois"
                className={clickedButton === "1Mois" ? "me-1 active" : "me-1"}
                onClick={buttonHandler}
              >
                1Mois
              </Button>
              <Button
                variant="soft-secondary"
                size="sm"
                name="6Mois"
                className={clickedButton === "6Mois" ? "me-1 active" : "me-1"}
                onClick={buttonHandler}
              >
                6Mois
              </Button>
              <Button
                variant="soft-secondary"
                size="sm"
                name="1Annee"
                className={clickedButton === "1Annee" ? "me-1 active" : "me-1"}
                onClick={buttonHandler}
              >
                1Année
              </Button>
            </div> */}
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xxl={12}>
                <RevenueCharts
                  chartData={chartData}
                  dataColors='["--tb-secondary", "--tb-danger", "--tb-success"]'
                />
              </Col>
              {/* <Col xxl={4}>
                <Row className="g-0 text-center">
                  <Col xs={6} sm={6}>
                    <div className="p-3 border border-dashed border-bottom-0">
                      <h5 className="mb-1">
                        {!clickedButton ? (
                          <span className="counter-value" data-target="65802">
                            <CountUp
                              start={0}
                              end={TotalCahrgesMois}
                              suffix=" DT"
                              separator=","
                            />
                          </span>
                        ) : clickedButton === "Tous" ? (
                          <span className="counter-value" data-target="65802">
                            <CountUp
                              start={0}
                              end={TotalCahrges}
                              suffix=" DT"
                              separator=","
                            />
                          </span>
                        ) : clickedButton === "1Mois" ? (
                          <span className="counter-value" data-target="65802">
                            <CountUp
                              start={0}
                              end={TotalCahrgesMois}
                              suffix=" DT"
                              separator=","
                            />{" "}
                          </span>
                        ) : clickedButton === "6Mois" ? (
                          <span className="counter-value" data-target="65802">
                            <CountUp
                              start={0}
                              end={TotalCahrges6Mois}
                              suffix=" DT"
                              separator=","
                            />{" "}
                          </span>
                        ) : clickedButton === "1Annee" ? (
                          <span className="counter-value" data-target="65802">
                            <CountUp
                              start={0}
                              end={TotalCahrgesAnnee}
                              suffix=" DT"
                              separator=","
                            />{" "}
                          </span>
                        ) : (
                          ""
                        )}
                      </h5>
                      <p className="text-muted mb-0">Charges</p>
                    </div>
                  </Col>
                  <Col xs={6} sm={6}>
                    <div className="p-3 border border-dashed border-start-0">
                      <h5 className="mb-1">
                        {!clickedButton ? (
                          <span className="counter-value" data-target="65802">
                            <CountUp
                              start={0}
                              end={TotalVentesMois}
                              suffix=" DT"
                              separator=","
                            />
                          </span>
                        ) : clickedButton === "Tous" ? (
                          <span className="counter-value" data-target="65802">
                            <CountUp
                              start={0}
                              end={TotalVentes}
                              separator=","
                              suffix=" DT"
                            />
                          </span>
                        ) : clickedButton === "1Mois" ? (
                          <span className="counter-value" data-target="65802">
                            <CountUp
                              start={0}
                              end={TotalVentesMois}
                              suffix=" DT"
                              separator=","
                            />{" "}
                          </span>
                        ) : clickedButton === "6Mois" ? (
                          <span className="counter-value" data-target="65802">
                            <CountUp
                              start={0}
                              end={TotalVentes6Mois}
                              suffix=" DT"
                              separator=","
                            />{" "}
                          </span>
                        ) : (
                          <span className="counter-value" data-target="65802">
                            <CountUp
                              start={0}
                              end={TotalVentesAnnee}
                              suffix=" DT"
                              separator=","
                            />
                          </span>
                        )}
                      </h5>
                      <p className="text-muted mb-0">Vente</p>
                    </div>
                  </Col>
                  <Col xs={6} sm={6}>
                    <div className="p-3 border border-dashed">
                      <h5 className="mb-1">
                        {!clickedButton ? (
                          <span className="counter-value" data-target="65802">
                            <CountUp
                              start={0}
                              end={TotalAchatsMois}
                              suffix=" DT"
                              separator=","
                            />
                          </span>
                        ) : clickedButton === "Tous" ? (
                          <span className="counter-value" data-target="65802">
                            <CountUp
                              start={0}
                              end={TotalAchats}
                              suffix=" DT"
                              separator=","
                            />
                          </span>
                        ) : clickedButton === "1Mois" ? (
                          <span className="counter-value" data-target="65802">
                            <CountUp
                              start={0}
                              end={TotalAchatsMois}
                              suffix=" DT"
                              separator=","
                            />{" "}
                          </span>
                        ) : clickedButton === "6Mois" ? (
                          <span className="counter-value" data-target="65802">
                            <CountUp
                              start={0}
                              end={TotalAchats6Mois}
                              suffix=" DT"
                              separator=","
                            />{" "}
                          </span>
                        ) : (
                          <span className="counter-value" data-target="65802">
                            <CountUp
                              start={0}
                              end={TotalAchatsAnnee}
                              suffix=" DT"
                              separator=","
                            />
                          </span>
                        )}
                      </h5>
                      <p className="text-muted mb-0">Achats</p>
                    </div>
                  </Col>
                </Row>
              </Col> */}
            </Row>
          </Card.Body>
        </Card>
      </Link>
      <Modal
        id="showModal"
        className="fade zoomIn"
        size="xl"
        show={modal_AddBilanModals}
        onHide={() => {
          tog_AddBilanModals();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Bilan
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <RevenueCharts
            chartData={chartData}
            dataColors='["--tb-secondary", "--tb-danger", "--tb-success"]'
          />
        </Modal.Body>
      </Modal>
      {/* <Card className="overflow-hidden">
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
      </Card> */}
    </React.Fragment>
  );
};

export default Revenue;
