import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";

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
import FooterPDF from "Common/FooterPDF";

// Import Images
import logoDark from "assets/images/SRC.png";
import logoLight from "assets/images/SRC.png";

import { Link, useLocation } from "react-router-dom";
import { useFetchAllLigneVenteQuery } from "features/ligneVente/ligneVenteSlice";
import { useFetchCategoriesQuery } from "features/category/categorySlice";
import HeaderPDF from "../../../Common/HearderPDF";
import ClientDevis from "./ClientDevis";
import FooterDevis from "../../../Common/FooterPDF";
import Amount from "./Amount";
import ProposalSignature from "./ProposalSignature";
import TableDevis from "./TableDevis";
import { Devis, useGetDevisLigneVenteQuery } from "features/devis/devisSlice";
import MontantTotalDevis from "./MontantTotalDevis";
import CountUp from "react-countup";

// Create styles
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
const PDF_REPORT_Devis = (props: Devis) => {
  const { designationDevis, dateDevis, nomclient, montantDevis, idDevis } =
    props;
  return (
    <Document>
      <Page size="A4" style={styles.body} wrap>
        <HeaderPDF />
        <ClientDevis
          numero={designationDevis!}
          date={dateDevis!}
          nom={nomclient!}
        />
        <View style={{ flex: 2 }}>
          <TableDevis id={idDevis} />
          <MontantTotalDevis mnt={montantDevis} />
        </View>
        <View>
          <Amount amount={montantDevis!} />
        </View>
        <View fixed>
          <FooterPDF />
        </View>
      </Page>
    </Document>
  );
};

const DevisDetails = () => {
  document.title = "Devis | Radhouani";
  const locationDevis = useLocation();

  const { data: allLigneVente } = useGetDevisLigneVenteQuery(
    locationDevis.state.idDevis
  );

  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Détails Devis" pageTitle="Devis" />
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
                            Devis N°
                          </p>
                          <h5 className="fs-15 mb-0">
                            <span id="invoice-no">
                              {locationDevis.state.designationDevis}
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
                              {locationDevis.state.dateDevis}
                            </span>{" "}
                          </h5>
                        </Col>
                        <Col lg={3} className="col-6"></Col>
                        <Col lg={3} className="col-6">
                          <p className="text-muted mb-2 text-uppercase fw-semibold fs-14">
                            Montant Total
                          </p>
                          <h5 className="fs-15 mb-0">
                            <span id="total-amount">
                              <CountUp
                                end={locationDevis.state.montantDevis}
                                separator=","
                                suffix="DT"
                              />
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
                            {locationDevis.state.nomclient}
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
                                    end={parseInt(lignevente?.PU!)}
                                    separator=","
                                  />
                                </td>
                                <td>
                                  <CountUp
                                    end={parseInt(lignevente?.quantiteProduit!)}
                                    separator=","
                                  />
                                </td>
                                <td className="text-end">
                                  <CountUp
                                    end={parseInt(lignevente?.montantTtl!)}
                                    separator=","
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
                                  end={locationDevis.state.montantDevis}
                                  separator=","
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
                          className="btn btn-success"
                        >
                          <i className="ri-printer-line align-bottom me-1"></i>{" "}
                          Imprimer
                        </Link>
                        <PDFDownloadLink
                          document={
                            <PDF_REPORT_Devis {...locationDevis.state} />
                          }
                          className="btn btn-primary"
                          fileName={`devis_numero_${locationDevis.state.designationDevis}`}
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

export default DevisDetails;
