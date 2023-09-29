import React from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
// PDF
import { Page, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CountUp from "react-countup";

// Import Images
import logoDark from "assets/images/logo-dark.png";
import logoLight from "assets/images/logo-light.png";
import { useLocation } from "react-router-dom";
import {
  BondeLivraison,
  useFetchBLLigneVenteQuery,
} from "features/bl/bondeLSlice";
import Amount from "./Amount";
import HeaderPDF from "../../../Common/HearderPDF";
import ClientBL from "./ClientBL";
import TableBL from "./TableBL";
import MontantTotal from "./MontantTotal";
import FooterPDF from "Common/FooterPDF";

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
  const {
    designationBL,
    dateBL,
    raison_sociale,
    adresse,
    tel,
    montant,
    idbl,
    mat,
  } = props;

  return (
    <Document>
      <Page size="A4" style={styles.body} wrap>
        <HeaderPDF />
        <ClientBL
          numero={designationBL}
          date={dateBL}
          nom={raison_sociale}
          adr={adresse}
          tel={tel}
          matricule={mat}
        />
        <View style={{ flex: 2 }}>
          <TableBL id={idbl} />
          <MontantTotal mnt={montant} />
        </View>
        <View>
          <Amount amount={montant} />
        </View>
        <View fixed>
          <FooterPDF />
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

  const mntTotal: number | undefined = allLigneVente?.reduce(
    (sum, i) => (sum += parseInt(i.montantTtl)),
    0
  );

  //Print the Invoice
  const printBL = () => {
    window.print();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            title="Détails Bon de Livraison"
            pageTitle="Bon de Livraison"
          />
          <Row className="justify-content-center">
            <Col xxl={9} className="justify-content-center">
              <Card id="demo">
                <Card.Header className="text-center">
                  <div className="profile-user mx-auto mb-3">
                    <input
                      id="profile-img-file-input"
                      type="file"
                      className="profile-img-file-input"
                    />
                    <label htmlFor="profile-img-file-input" className="d-block">
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
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col lg={4}>
                      <div className="mb-2">
                        <div className="mb-2">
                          <span>
                            <strong>Anis Radhouani </strong>{" "}
                          </span>
                        </div>
                        <div className="mb-2">
                          <span>Av. palestine cité ennour</span>
                        </div>
                        <div className="mb-2">
                          <span>2123, Gafsa</span>
                        </div>
                        <div className="mb-2">
                          <span>
                            <strong>M.F:</strong> <span>1687166/T</span>
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4}></Col>
                    <Col lg={4} className="text-end">
                      <div className="mb-2">
                        <div className="mb-2">
                          <span>
                            <strong>أنيس رضواني</strong>{" "}
                          </span>
                        </div>
                        <div className="mb-2">
                          <span>شارع فلسطين حي النور</span>
                        </div>
                        <div className="mb-2">
                          <span>فقصة 2123</span>
                          <br />
                        </div>
                        <div className="mb-2">
                          <span>
                            <strong>المعرف الجبائي: </strong>
                          </span>
                          <span> 1687166/T</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={4}>
                      <div className="text-center fs-16 border border-dark">
                        <span className="text-center">
                          <strong> Bon de Livraison</strong>
                        </span>
                      </div>
                      <table className="table table-bordered table-nowrap border-dark">
                        <thead className="border"></thead>
                        <tbody>
                          <tr>
                            <th>Numéro</th>
                            <th>Date</th>
                            <th>Page</th>
                          </tr>
                          <tr>
                            <td>{locationBLDetail.state.designationBL}</td>
                            <td>{locationBLDetail.state.dateBL}</td>
                            <td>1</td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                    <Col lg={3}></Col>
                    <Col lg={5} className="col-6">
                      <table className="border table-nowrap border-dark">
                        <tbody>
                          <tr>
                            <th>Client: </th>
                            <td>{locationBLDetail.state.raison_sociale}</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>{locationBLDetail.state.adresse}</td>
                          </tr>
                          <tr>
                            <th>M.F: </th>
                            <td>{locationBLDetail.state.mat}</td>
                          </tr>
                          <tr>
                            <th>Mode Paiement: </th>
                            <td>Espèce</td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <div className="table-responsive">
                      <Table className="table-borderless table-nowrap align-middle mb-0">
                        <thead>
                          <tr className="table-active">
                            <th scope="col" style={{ width: "50px" }}>
                              #
                            </th>
                            <th scope="col">Details Produit</th>
                            <th scope="col" className="text-end">
                              Prix Unitaire
                            </th>
                            <th scope="col" className="text-center">
                              Quantité
                            </th>
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
                              <td className="text-end">
                                {" "}
                                <CountUp
                                  end={parseInt(lignevente.PU!)}
                                  separator=","
                                  duration={0}
                                />
                              </td>
                              <td className="text-center">
                                {lignevente.quantiteProduit}
                              </td>
                              <td className="text-end">
                                <CountUp
                                  end={parseInt(lignevente.montantTtl!)}
                                  separator=","
                                  duration={0}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <table className="table table-bordered table-nowrap  border-dark">
                        <tbody>
                          <tr>
                            <th>Base</th>
                            <th>TVA%</th>
                            <th>TVA</th>
                          </tr>
                          <tr>
                            <td className="text-end">
                              {(locationBLDetail.state.montant / 1.19).toFixed(
                                3
                              )}
                            </td>
                            <td className="text-center">19.00</td>
                            <td className="text-end">
                              {(
                                locationBLDetail.state.montant -
                                locationBLDetail.state.montant / 1.19
                              ).toFixed(3)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                    <Col lg={4}></Col>
                    <Col lg={4} className="justify-content-end">
                      <table className="justify-content-end border table-nowrap border-dark">
                        <tbody>
                          <tr>
                            <th>Total H.T</th>
                            <td className="text-end">
                              {(locationBLDetail.state.montant / 1.19).toFixed(
                                3
                              )}
                            </td>
                          </tr>

                          <tr>
                            <th>T.V.A: </th>
                            <td className="text-end">
                              {(
                                locationBLDetail.state.montant -
                                locationBLDetail.state.montant / 1.19
                              ).toFixed(3)}
                            </td>
                          </tr>
                          <tr>
                            <th>Total T.T.C:</th>
                            <td className="text-end">
                              {locationBLDetail.state.montant}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                  </Row>
                  <Row>
                    <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                      <Button
                        variant="outline-secondary"
                        type="submit"
                        onClick={printBL}
                      >
                        <i className="ri-printer-line align-bottom me-1"></i>{" "}
                        Imprimer
                      </Button>
                      <PDFDownloadLink
                        document={<PDF_REPORT_BL {...locationBLDetail.state} />}
                        className="outline-secondary"
                        fileName={`bon_de_livraison_numero_${locationBLDetail.state.designationBL}`}
                      >
                        <Button variant="outline-info" type="submit">
                          <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                          Télécharger
                        </Button>
                      </PDFDownloadLink>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DetailsBL;
