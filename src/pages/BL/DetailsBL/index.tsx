import React from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
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

// Import Images
import logoDark from "assets/images/logo-dark.png";
import logoLight from "assets/images/logo-light.png";
import { Link, useLocation } from "react-router-dom";
import {
  BondeLivraison,
  useFetchBLLigneVenteQuery,
} from "features/bl/bondeLSlice";
import Amount from "./Amount";
import ProposalSignature from "pages/Devis/DevisDetails/ProposalSignature";
import HeaderBL from "./HearderBL";
import ClientBL from "./ClientBL";
import TableBL from "./TableBL";
import MontantTotal from "./MontantTotal";

const styles = StyleSheet.create({
  body: {
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
const PDF_REPORT_BL = (props: BondeLivraison) => {
  const { designationBL, dateBL, raison_sociale, adresse, tel, montant, idbl } =
    props;

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.top}>
          <HeaderBL date={dateBL} numero={designationBL} />
          <ClientBL nom={raison_sociale} adr={adresse} tel={tel} />
        </View>
        <View style={{ flex: 2 }}>
          <TableBL id={idbl} />
          <MontantTotal mnt={montant} />
        </View>
        <View>
          <Amount amount={montant} />
          <ProposalSignature />
        </View>
      </Page>
    </Document>
  );
};

const DetailsBL = () => {
  document.title = "Détails Bon de Livraison | Radhouani";
  const locationBLDetail = useLocation();

  const { data: allLigneVente } = useFetchBLLigneVenteQuery(
    locationBLDetail.state.idbl
  );

  const mntTotal = allLigneVente?.reduce(
    (sum, i) => (sum += parseInt(i.montantTtl)),
    0
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            title="Détails Bon de Livraison"
            pageTitle="Bon de Livraison"
          />
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
                            Bon de Livraison N°:
                          </p>
                          <h5 className="fs-15 mb-0">
                            <span id="invoice-no">
                              {locationBLDetail.state.designationBL}
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
                              {locationBLDetail.state.dateBL}
                            </span>{" "}
                          </h5>
                        </Col>

                        <Col lg={3} className="col-6">
                          <p className="text-muted mb-2 text-uppercase fw-semibold fs-14">
                            Montant Total
                          </p>
                          <h5 className="fs-15 mb-0">
                            <span id="total-amount">{mntTotal}</span> Dt
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
                            {locationBLDetail.state.raison_sociale}
                          </p>
                          <p
                            className="text-muted mb-1"
                            id="billing-address-line-1"
                          >
                            {locationBLDetail.state.adresse}
                          </p>
                          <p className="text-muted mb-1">
                            <span>Téléphone: {locationBLDetail.state.tel}</span>
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
                                <th scope="row">{key + 1}</th>
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
                              <th className="text-end">{mntTotal} Dt</th>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                        <Button variant="outline-secondary" type="submit">
                          <i className="ri-printer-line align-bottom me-1"></i>{" "}
                          Imprimer
                        </Button>
                        <PDFDownloadLink
                          document={
                            <PDF_REPORT_BL {...locationBLDetail.state} />
                          }
                          className="outline-secondary"
                          fileName={`bon_de_livraison_numero_${locationBLDetail.state.designationBL}`}
                        >
                          <Button variant="outline-info" type="submit">
                            <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                            Télécharger
                          </Button>
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

export default DetailsBL;
