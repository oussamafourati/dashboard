import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useGetAllArrivagesProduitQuery } from "features/arrivageProduit/arrivageProduitSlice";
import { useFetchFournisseurQuery } from "features/fournisseur/fournisseurSlice";
import CountUp from "react-countup";

const ArrivageDetails = () => {
  const locationDetail = useLocation();
  const { data = [] } = useGetAllArrivagesProduitQuery();
  const { data: AllFournisseur = [] } = useFetchFournisseurQuery();

  const fournisseurDetail = AllFournisseur.filter(
    (four) => four.idfournisseur === locationDetail.state.fournisseurID
  );
  const result = data.filter(
    (wor) => wor.arrivageID === locationDetail.state.idArrivage
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Card>
            <Card.Body>
              <Row>
                <Col xxl={4} lg={6}>
                  <Card className="bg-secondary bg-opacity-10 border-0">
                    <Card.Body>
                      <div className="d-flex gap-3">
                        <div className="flex-grow-1">
                          <h6 className="fs-18 mb-3">Détail Arrivage</h6>
                          <p className="mb-1">
                            Désignation:{" "}
                            <span className="fw-medium">
                              {locationDetail.state.designation}
                            </span>
                          </p>
                          <p className="mb-1">
                            Montant Total:{" "}
                            <span className="fw-medium">
                              <strong>
                                <CountUp
                                  end={locationDetail.state.montantTotal}
                                  separator=","
                                />
                              </strong>
                              DT
                            </span>
                          </p>
                          <p className="mb-0">
                            Date Arrivage:{" "}
                            <span className="fw-medium">
                              {locationDetail.state.dateArrivage}
                            </span>
                          </p>
                        </div>
                        <div className="avatar-sm flex-shrink-0">
                          <div className="avatar-title bg-secondary-subtle text-secondary rounded fs-3">
                            <i className="ph-shopping-cart"></i>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xxl={4} lg={6}>
                  <Card className="bg-warning bg-opacity-10 border-0">
                    <Card.Body>
                      <div className="d-flex gap-3">
                        <div className="flex-grow-1">
                          <h6 className="fs-18 mb-3">Détail Produit</h6>
                          <p className="mb-1">
                            Nombre des produits :{" "}
                            <span className="fw-medium">
                              <strong>{result.length}</strong>
                            </span>
                          </p>
                        </div>
                        <div className="avatar-sm flex-shrink-0">
                          <div className="avatar-title bg-warning-subtle text-warning rounded fs-3">
                            <i className="bi bi-box-seam"></i>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xxl={4} lg={6}>
                  <Card className="bg-success bg-opacity-10 border-0">
                    <Card.Body>
                      <div className="d-flex gap-3">
                        <div className="flex-grow-1">
                          <h6 className="fs-18 mb-3">Détail Fournisseur</h6>
                          <p className="mb-1">
                            Nom :
                            {fournisseurDetail.map((fournisseur) => (
                              <span className="fw-medium">
                                {" "}
                                <strong>{fournisseur.raison_sociale}</strong>
                              </span>
                            ))}
                          </p>
                          <p className="mb-1">
                            Adresse :
                            {fournisseurDetail.map((fournisseur) => (
                              <span className="fw-medium">
                                {" "}
                                <strong>{fournisseur.adresse}</strong>
                              </span>
                            ))}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          {fournisseurDetail.map((fournisseur) => (
                            <img
                              src={`data:image/jpeg;base64,${fournisseur.logo}`}
                              alt={fournisseur.raison_sociale}
                              className="rounded"
                              width={90}
                            />
                          ))}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <div className="d-flex align-items-center gap-3 mb-4">
                <h5 className="card-title flex-grow-1 mb-0">
                  Liste des produits
                </h5>
              </div>
              <Row className="justify-content-between">
                <Table>
                  <thead>
                    <tr>
                      <th>Nom Produit</th>
                      <th>Quantité</th>
                      <th>PrixHT</th>
                      <th>PrixTTC</th>
                      <th>Prix Vente</th>
                      <th>Bénificie</th>
                      <th>Prix Remise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((item, i) => (
                      <tr key={item.idArrivageProduit}>
                        <td>{item.nomProduit}</td>
                        <td>
                          <CountUp end={item.quantite} separator="," />
                        </td>
                        <td>
                          {" "}
                          <CountUp
                            end={item?.prixAchatHt!}
                            separator=","
                          />{" "}
                        </td>
                        <td>
                          {" "}
                          <CountUp
                            end={item.prixAchatTtc!}
                            separator=","
                          />{" "}
                        </td>
                        <td>
                          {" "}
                          <CountUp end={item.prixVente!} separator="," />
                        </td>
                        <td>
                          {" "}
                          <CountUp end={item.Benifice!} separator="," />
                        </td>
                        <td>
                          {" "}
                          <CountUp end={item.PrixRemise!} separator="," />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ArrivageDetails;
