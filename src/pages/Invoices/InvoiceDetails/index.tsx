import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
// Import Images
import logoDark from "assets/images/logo-dark.png";
import logoLight from "assets/images/logo-light.png";
import { Link, useLocation } from "react-router-dom";
import { useFetchAllLigneVenteQuery } from "features/ligneVente/ligneVenteSlice";

const InvoiceDetails = () => {
  document.title = "Détails Facture | Radhouani";
  const locationDetail = useLocation();

  const { data: allLigneVente } = useFetchAllLigneVenteQuery(
    locationDetail.state.designationFacture
  );

  console.log("allLigneVente", allLigneVente);
  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Détails Facture" pageTitle="Factures" />
          <Row className="justify-content-center">
            <Col xxl={9}>
              <Card id="demo">
                <Row>
                  <Col lg={12}>
                    <Card.Header className="border-bottom-dashed p-4">
                      <Col lg={4}>
                        <div className="mb-2">
                          <div className="profile-user mx-auto mb-3">
                            <input
                              id="profile-img-file-input"
                              type="file"
                              className="profile-img-file-input"
                            />
                            <label
                              htmlFor="profile-img-file-input"
                              className="d-block"
                            >
                              <span
                                className="overflow-hidden border border-dashed d-flex align-items-center justify-content-center rounded"
                                style={{ height: "60px", width: "256px" }}
                              >
                                <img
                                  src={logoDark}
                                  className="card-logo card-logo-dark user-profile-image img-fluid"
                                  alt="logo dark"
                                />
                                <img
                                  src={logoLight}
                                  className="card-logo card-logo-light user-profile-image img-fluid"
                                  alt="logo light"
                                />
                              </span>
                            </label>
                          </div>
                          <span>
                            <strong>Matricule Fiscale:</strong>{" "}
                            <span>147852369</span>
                          </span>
                          <div className="mb-2">
                            <span>
                              <strong>Adresse:</strong>{" "}
                              <span>Cite Ennour, Gafsa</span>
                              <br />
                              <span> </span>
                              <span>2123, Gafsa</span>
                            </span>
                          </div>
                          <div className="mb-2">
                            <span>
                              <strong>Tél:</strong> <span>76001002</span>
                            </span>
                          </div>
                          <div className="mb-2">
                            <span>
                              <strong>Email:</strong>{" "}
                              <span>radhouani@gmail.com</span>
                            </span>
                          </div>
                        </div>
                      </Col>
                    </Card.Header>
                  </Col>
                  <Col lg={12}>
                    <Card.Body className="p-4">
                      <Row className="g-3">
                        <Col lg={3} className="col-6">
                          <p className="text-muted mb-2 text-uppercase fw-semibold fs-14">
                            Facture No
                          </p>
                          <h5 className="fs-15 mb-0">
                            <span id="invoice-no">
                              {locationDetail.state.designationFacture}
                            </span>
                          </h5>
                        </Col>
                        <Col lg={3} className="col-6">
                          <p className="text-muted mb-2 text-uppercase fw-semibold fs-14">
                            Date
                          </p>
                          <h5 className="fs-15 mb-0">
                            <span id="invoice-date">
                              {" "}
                              {locationDetail.state.dateFacturation}
                            </span>{" "}
                          </h5>
                        </Col>
                        <Col lg={3} className="col-6">
                          <p className="text-muted mb-2 text-uppercase fw-semibold fs-14">
                            ÉTAT DU PAIEMENT
                          </p>
                          {locationDetail.state.statusFacture === 2 ? (
                            <span
                              className="badge badge-soft-success"
                              id="payment-status"
                            >
                              Payé
                            </span>
                          ) : locationDetail.state.statusFacture === 0 ? (
                            <span
                              className="badge badge-soft-danger"
                              id="payment-status"
                            >
                              Impayé
                            </span>
                          ) : (
                            <span
                              className="badge badge-soft-warning"
                              id="payment-status"
                            >
                              Semi-payé
                            </span>
                          )}
                        </Col>
                        <Col lg={3} className="col-6">
                          <p className="text-muted mb-2 text-uppercase fw-semibold fs-14">
                            Montant Total
                          </p>
                          <h5 className="fs-15 mb-0">
                            <span id="total-amount">
                              {locationDetail.state.MontantTotal}
                            </span>{" "}
                            Dt
                          </h5>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Col>
                  <Col lg={12}>
                    <Card.Body className="p-4 border-top border-top-dashed">
                      <Row className="g-3">
                        <Col className="col-6">
                          <h6 className="text-muted text-uppercase fw-semibold fs-14 mb-3">
                            Client
                          </h6>
                          <p className="fw-medium mb-2 fs-16" id="billing-name">
                            {locationDetail.state.nomClient}
                          </p>
                          <p
                            className="text-muted mb-1"
                            id="billing-address-line-1"
                          >
                            Cité Ennour, Gafsa
                          </p>
                          <p className="text-muted mb-1">
                            <span>Téléphone: </span>
                            <span id="billing-phone-no">96003004</span>
                          </p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Col>
                  <Col lg={12}>
                    <Card.Body className="p-4">
                      <div className="table-responsive">
                        <Table className="table-borderless text-center table-nowrap align-middle mb-0">
                          <thead>
                            <tr className="table-active">
                              <th scope="col" style={{ width: "50px" }}>
                                #
                              </th>
                              <th scope="col">Details Produit</th>
                              <th scope="col">Prix Unitaire</th>
                              <th scope="col">Quantité</th>
                              <th scope="col" className="text-end">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody id="products-list">
                            {allLigneVente?.map((lignevente) => (
                              <tr>
                                <th scope="row">01</th>
                                <td className="text-start">
                                  <span className="fw-medium">
                                    {lignevente.productName}
                                  </span>
                                </td>
                                <td>{lignevente.PU}</td>
                                <td>{lignevente.quantiteProduit}</td>
                                <td className="text-end">
                                  {lignevente.montantTtl}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                      <div className="border-top border-top-dashed mt-2">
                        <Table
                          className="table-borderless table-nowrap align-middle mb-0 ms-auto"
                          style={{ width: "250px" }}
                        >
                          <tbody>
                            <tr className="border-top border-top-dashed fs-15">
                              <th scope="row">Montant Total</th>
                              <th className="text-end">
                                {locationDetail.state.MontantTotal} Dt
                              </th>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                        <Link
                          onClick={printInvoice}
                          to="#"
                          className="btn btn-success"
                        >
                          <i className="ri-printer-line align-bottom me-1"></i>{" "}
                          Imprimer
                        </Link>
                        <Link to="#" className="btn btn-primary">
                          <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                          Télécharger
                        </Link>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default InvoiceDetails;
