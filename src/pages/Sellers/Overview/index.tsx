import React from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import CountUp from "react-countup";
import { useLocation } from "react-router-dom";
import profilebgImg from "../../../assets/images/fournissuer_cover.avif";
import { useGetArrivageByFournisseurQuery } from "features/arrivage/arrivageSlice";
import ProductList from "./ProductList";

const SellersOverview = () => {
  document.title = "Details Fournisseur | Radhouani";
  const LocationFournisseur = useLocation();
  const { data: fournisseurbyarrivage = [] } = useGetArrivageByFournisseurQuery(
    LocationFournisseur.state?.idfournisseur
  );
  const dataLength = fournisseurbyarrivage!.length;
  const montantTotalFactures = fournisseurbyarrivage.reduce(
    (sumAllFacture, i) => (sumAllFacture += parseInt(i.montantTotal)),
    0
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card className="border-0  shadow-none mx-n4 mt-n4">
                <Card.Body
                  className="profile-basic position-relative"
                  style={{
                    backgroundImage: `url(${profilebgImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></Card.Body>
                <Card.Body className="position-relative mt-n3">
                  <div className="mt-n5">
                    <div className="avatar-lg">
                      <div className="avatar-title bg-white shadow rounded">
                        <img
                          src={`data:image/jpeg;base64, ${LocationFournisseur.state?.logo}`}
                          alt=""
                          className="avatar-lg"
                        />
                      </div>
                    </div>
                  </div>
                </Card.Body>
                <Card.Body className="pt-0">
                  <Row className="justify-content-between gy-4">
                    <Col xl={5} md={7}>
                      <h4 className="mb-2">
                        {LocationFournisseur.state?.raison_sociale}
                      </h4>
                      <div className="text-muted mb-2 d-flex gap-2">
                        {LocationFournisseur.state?.type === 0 ? (
                          <span className="badge badge-soft-info text-uppercase">
                            Morale
                          </span>
                        ) : (
                          <span className="badge badge-soft-secondary text-uppercase">
                            Physique
                          </span>
                        )}
                        {LocationFournisseur.state?.etat === 0 ? (
                          <span className="badge badge-soft-danger text-uppercase">
                            Inactif
                          </span>
                        ) : (
                          <span className="badge badge-soft-success text-uppercase">
                            Actif
                          </span>
                        )}
                      </div>
                      <div className="mb-2">
                        <Form.Label htmlFor="matricule_fiscale">
                          Matricule Fiscale :
                        </Form.Label>
                        {LocationFournisseur.state?.matricule_fiscale}
                      </div>
                      <div className="mb-2">
                        <Form.Label htmlFor="descriptionCharge">
                          R.I.B :
                        </Form.Label>
                        {LocationFournisseur.state?.rib}
                      </div>
                      <div className="mb-2 text-muted">
                        <i className="bi bi-geo-alt align-middle me-1"></i>{" "}
                        {LocationFournisseur.state?.adresse}
                      </div>

                      <div className="mb-2 text-muted">
                        <i className="bi bi-telephone align-middle me-1"></i>{" "}
                        {LocationFournisseur.state?.tel}
                      </div>
                      <div className="mb-2 text-muted ">
                        <i className="bi bi-globe align-middle me-1"></i>{" "}
                        {LocationFournisseur.state?.mail}
                      </div>
                    </Col>
                    <Col xl={3} md={6}>
                      <Card className="card-animate bg-info-subtle border-0 overflow-hidden">
                        <div className="position-absolute end-0 start-0 top-0 z-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            // xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="400"
                            height="250"
                            preserveAspectRatio="none"
                            viewBox="0 0 400 250"
                          >
                            <g mask='url("#SvgjsMask1551")' fill="none">
                              <path
                                d="M306 65L446 -75"
                                strokeWidth="8"
                                stroke="url(#SvgjsLinearGradient1552)"
                                strokeLinecap="round"
                                className="BottomLeft"
                              ></path>
                              <path
                                d="M399 2L315 86"
                                strokeWidth="10"
                                stroke="url(#SvgjsLinearGradient1553)"
                                strokeLinecap="round"
                                className="TopRight"
                              ></path>
                              <path
                                d="M83 77L256 -96"
                                strokeWidth="6"
                                stroke="url(#SvgjsLinearGradient1553)"
                                strokeLinecap="round"
                                className="TopRight"
                              ></path>
                              <path
                                d="M281 212L460 33"
                                strokeWidth="6"
                                stroke="url(#SvgjsLinearGradient1553)"
                                strokeLinecap="round"
                                className="TopRight"
                              ></path>
                              <path
                                d="M257 62L76 243"
                                strokeWidth="6"
                                stroke="url(#SvgjsLinearGradient1553)"
                                strokeLinecap="round"
                                className="TopRight"
                              ></path>
                              <path
                                d="M305 123L214 214"
                                strokeWidth="6"
                                stroke="url(#SvgjsLinearGradient1552)"
                                strokeLinecap="round"
                                className="BottomLeft"
                              ></path>
                              <path
                                d="M327 222L440 109"
                                strokeWidth="6"
                                stroke="url(#SvgjsLinearGradient1552)"
                                strokeLinecap="round"
                                className="BottomLeft"
                              ></path>
                              <path
                                d="M287 109L362 34"
                                strokeWidth="10"
                                stroke="url(#SvgjsLinearGradient1553)"
                                strokeLinecap="round"
                                className="TopRight"
                              ></path>
                              <path
                                d="M259 194L332 121"
                                strokeWidth="8"
                                stroke="url(#SvgjsLinearGradient1553)"
                                strokeLinecap="round"
                                className="TopRight"
                              ></path>
                              <path
                                d="M376 186L240 322"
                                strokeWidth="8"
                                stroke="url(#SvgjsLinearGradient1553)"
                                strokeLinecap="round"
                                className="TopRight"
                              ></path>
                              <path
                                d="M308 153L123 338"
                                strokeWidth="6"
                                stroke="url(#SvgjsLinearGradient1553)"
                                strokeLinecap="round"
                                className="TopRight"
                              ></path>
                              <path
                                d="M218 62L285 -5"
                                strokeWidth="8"
                                stroke="url(#SvgjsLinearGradient1552)"
                                strokeLinecap="round"
                                className="BottomLeft"
                              ></path>
                            </g>
                            <defs>
                              <mask id="SvgjsMask1551">
                                <rect
                                  width="400"
                                  height="250"
                                  fill="#ffffff"
                                ></rect>
                              </mask>
                              <linearGradient
                                x1="100%"
                                y1="0%"
                                x2="0%"
                                y2="100%"
                                id="SvgjsLinearGradient1552"
                              >
                                <stop
                                  stopColor="rgba(var(--tb-info-rgb), 0)"
                                  offset="0"
                                ></stop>
                                <stop
                                  stopColor="rgba(var(--tb-info-rgb), 0.1)"
                                  offset="1"
                                ></stop>
                              </linearGradient>
                              <linearGradient
                                x1="0%"
                                y1="100%"
                                x2="100%"
                                y2="0%"
                                id="SvgjsLinearGradient1553"
                              >
                                <stop
                                  stopColor="rgba(var(--tb-info-rgb), 0)"
                                  offset="0"
                                ></stop>
                                <stop
                                  stopColor="rgba(var(--tb-info-rgb), 0.1)"
                                  offset="1"
                                ></stop>
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <Card.Body className="position-relative">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                              <p className="text-uppercase fs-14 fw-medium text-muted mb-0">
                                TOTAL DES Arrivages
                              </p>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-24 fw-semibold mb-4">
                                <CountUp end={dataLength} />
                              </h4>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-white text-primary rounded fs-3">
                                <i className="ph-file-text"></i>
                              </span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xl={3} md={6}>
                      <Card className="card-animate bg-success-subtle border-0 overflow-hidden">
                        <div className="position-absolute end-0 start-0 top-0 z-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            // xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="400"
                            height="250"
                            preserveAspectRatio="none"
                            viewBox="0 0 400 250"
                          >
                            <g mask='url("#SvgjsMask1608")' fill="none">
                              <path
                                d="M390 87L269 208"
                                strokeWidth="10"
                                stroke="url(#SvgjsLinearGradient1609)"
                                strokeLinecap="round"
                                className="TopRight"
                              ></path>
                              <path
                                d="M358 175L273 260"
                                strokeWidth="8"
                                stroke="url(#SvgjsLinearGradient1610)"
                                strokeLinecap="round"
                                className="BottomLeft"
                              ></path>
                              <path
                                d="M319 84L189 214"
                                strokeWidth="10"
                                stroke="url(#SvgjsLinearGradient1609)"
                                strokeLinecap="round"
                                className="TopRight"
                              ></path>
                              <path
                                d="M327 218L216 329"
                                strokeWidth="8"
                                stroke="url(#SvgjsLinearGradient1610)"
                                strokeLinecap="round"
                                className="BottomLeft"
                              ></path>
                              <path
                                d="M126 188L8 306"
                                strokeWidth="8"
                                stroke="url(#SvgjsLinearGradient1610)"
                                strokeLinecap="round"
                                className="BottomLeft"
                              ></path>
                              <path
                                d="M220 241L155 306"
                                strokeWidth="10"
                                stroke="url(#SvgjsLinearGradient1610)"
                                strokeLinecap="round"
                                className="BottomLeft"
                              ></path>
                              <path
                                d="M361 92L427 26"
                                strokeWidth="6"
                                stroke="url(#SvgjsLinearGradient1609)"
                                strokeLinecap="round"
                                className="TopRight"
                              ></path>
                              <path
                                d="M391 188L275 304"
                                strokeWidth="8"
                                stroke="url(#SvgjsLinearGradient1609)"
                                strokeLinecap="round"
                                className="TopRight"
                              ></path>
                              <path
                                d="M178 74L248 4"
                                strokeWidth="10"
                                stroke="url(#SvgjsLinearGradient1610)"
                                strokeLinecap="round"
                                className="BottomLeft"
                              ></path>
                              <path
                                d="M84 52L-56 192"
                                strokeWidth="6"
                                stroke="url(#SvgjsLinearGradient1610)"
                                strokeLinecap="round"
                                className="BottomLeft"
                              ></path>
                              <path
                                d="M183 111L247 47"
                                strokeWidth="10"
                                stroke="url(#SvgjsLinearGradient1610)"
                                strokeLinecap="round"
                                className="BottomLeft"
                              ></path>
                              <path
                                d="M46 8L209 -155"
                                strokeWidth="6"
                                stroke="url(#SvgjsLinearGradient1609)"
                                strokeLinecap="round"
                                className="TopRight"
                              ></path>
                            </g>
                            <defs>
                              <mask id="SvgjsMask1608">
                                <rect
                                  width="400"
                                  height="250"
                                  fill="#ffffff"
                                ></rect>
                              </mask>
                              <linearGradient
                                x1="0%"
                                y1="100%"
                                x2="100%"
                                y2="0%"
                                id="SvgjsLinearGradient1609"
                              >
                                <stop
                                  stopColor="rgba(var(--tb-success-rgb), 0)"
                                  offset="0"
                                ></stop>
                                <stop
                                  stopColor="rgba(var(--tb-success-rgb), 0.1)"
                                  offset="1"
                                ></stop>
                              </linearGradient>
                              <linearGradient
                                x1="100%"
                                y1="0%"
                                x2="0%"
                                y2="100%"
                                id="SvgjsLinearGradient1610"
                              >
                                <stop
                                  stopColor="rgba(var(--tb-success-rgb), 0)"
                                  offset="0"
                                ></stop>
                                <stop
                                  stopColor="rgba(var(--tb-success-rgb), 0.1)"
                                  offset="1"
                                ></stop>
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <Card.Body className="position-relative">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                              <p className="text-uppercase fs-14 fw-medium text-muted mb-0">
                                Total Achat
                              </p>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-24 fw-semibold mb-4">
                                <CountUp
                                  end={montantTotalFactures}
                                  separator=","
                                />
                                Dt
                              </h4>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-white text-success rounded fs-3">
                                <i className="ph-check-square-offset"></i>
                              </span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <ProductList
                    idfournisseur={LocationFournisseur.state?.idfournisseur}
                  />
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SellersOverview;
