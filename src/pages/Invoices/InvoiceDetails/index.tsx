import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
// Import Images
import logoDark from "assets/images/logo-dark.png";
import logoLight from "assets/images/logo-light.png";
import { Link, useLocation } from "react-router-dom";
import { useFetchAllLigneVenteQuery } from "features/ligneVente/ligneVenteSlice";
import {
  ClientPhysique,
  useGetOneClientQuery,
} from "features/clientPhysique/clientPhysiqueSlice";
import {
  Facture,
  useFetchOneFactureQuery,
  useGetLigneVenteQuery,
} from "features/facture/factureSlice";
import FooterPDF from "Common/FooterPDF";
// PDF
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CountUp from "react-countup";
import ClientFacture from "./ClientFacture";
import Amount from "./Amount";
import ProposalSignature from "pages/Devis/DevisDetails/ProposalSignature";
import TableFacture from "./TableFacture";
import MontantTotalFacture from "./MontantTotalFacture";
import HeaderPDF from "Common/HearderPDF";

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#ffffff",
    fontFamiy: "Source Sans",
    fontSize: 12,
    lineHeight: 1.4,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 32,
    height: "100vh",
  },
  top: {
    flex: 1,
  },
});
const PDF_REPORT_Facture = (props: Facture) => {
  const {
    designationFacture,
    dateFacturation,
    raison_sociale,
    nomClient,
    adresse,
    tel,
    mat,
    modePaiement,
    MontantTotal,
    idFacture,
  } = props;

  return (
    <Document>
      <Page size="A4" style={styles.body} wrap>
        <HeaderPDF />
        <ClientFacture
          numero={designationFacture!}
          date={dateFacturation!}
          nom={nomClient!}
          adr={adresse!}
          mp={modePaiement!}
          matricule={mat!}
        />
        <View style={{ flex: 2 }}>
          <TableFacture id={idFacture} />
          <MontantTotalFacture mnt={MontantTotal!} />
        </View>
        <View>
          <Amount amount={MontantTotal!} />
        </View>
        <View fixed>
          <FooterPDF />
        </View>
      </Page>
    </Document>
  );
};

const InvoiceDetails = () => {
  document.title = "Détails Facture | Radhouani";
  const locationDetail = useLocation();

  const { data: allLigneVente } = useGetLigneVenteQuery(
    locationDetail.state.idFacture
  );

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
                          <div className="mb-2">
                            <span>
                              <strong>Matricule Fiscale:</strong>{" "}
                              <span>147852369</span>
                            </span>
                          </div>
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
                              <CountUp
                                start={0}
                                end={locationDetail.state.MontantTotal}
                                separator=","
                                suffix="DT"
                              />
                            </span>
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
                            {locationDetail.state?.nomClient}
                          </p>
                          <p
                            className="text-muted mb-1"
                            id="billing-address-line-1"
                          >
                            Gafsa
                          </p>
                          <p className="text-muted mb-1">
                            <span>Téléphone: 26823569</span>
                            <span id="billing-phone-no"></span>
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
                            {allLigneVente?.map((lignevente, key) => (
                              <tr key={key}>
                                <th scope="row">01</th>
                                <td className="text-start">
                                  <span className="fw-medium">
                                    {lignevente.productName}
                                  </span>
                                </td>
                                <td>
                                  <CountUp
                                    start={0}
                                    end={parseInt(lignevente?.PU!)}
                                    separator=","
                                    duration={0}
                                  />
                                </td>
                                <td>{lignevente.quantiteProduit}</td>
                                <td className="text-end">
                                  <CountUp
                                    start={0}
                                    end={parseInt(lignevente?.montantTtl!)}
                                    separator=","
                                    duration={0}
                                  />
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
                                <CountUp
                                  start={0}
                                  end={locationDetail.state.MontantTotal}
                                  separator=","
                                  suffix="DT"
                                />
                              </th>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                        <Link
                          onClick={printInvoice}
                          to="#"
                          className="btn btn-soft-secondary"
                        >
                          <i className="ri-printer-line align-bottom me-1"></i>{" "}
                          Imprimer
                        </Link>
                        <PDFDownloadLink
                          document={
                            <PDF_REPORT_Facture {...locationDetail.state} />
                          }
                          className="btn btn-soft-primary"
                          fileName={`facture_numero_${locationDetail.state.designationFacture}`}
                        >
                          <i className="ri-download-2-line align-bottom me-1"></i>
                          Télécharger
                        </PDFDownloadLink>
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
