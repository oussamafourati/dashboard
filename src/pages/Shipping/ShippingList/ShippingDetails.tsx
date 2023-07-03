import React from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useGetAllArrivagesProduitQuery } from "features/arrivageProduit/arrivageProduitSlice";
import { useFetchFournisseurQuery } from "features/fournisseur/fournisseurSlice";

const ShippingDetails = () => {
  const locationDetail = useLocation();
  const { data = [] } = useGetAllArrivagesProduitQuery();
  const { data: AllFournisseur = [] } = useFetchFournisseurQuery();

  const fournisseurDetail = AllFournisseur.filter(
    (four) => four.idfournisseur === locationDetail.state.fournisseurID
  );
  const result = data.filter(
    (wor) => wor.arrivageID === locationDetail.state.idArrivage
  );
  const arrivageTotal = result.reduce((sum, i) => (sum += i.quantite), 0);

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <div className="d-flex align-items-center">
            <h5 className="card-title mb-0 flex-grow-1">Shipping Details</h5>
            <div className="flex-shrink-0">
              <p className="mb-0">Delivery Date:</p>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xxl={4} lg={6}>
              <Card className="bg-secondary bg-opacity-10 border-0">
                <Card.Body>
                  <div className="d-flex gap-3">
                    <div className="flex-grow-1">
                      <h6 className="fs-18 mb-3">Détail Arrivage</h6>
                      <p className="mb-0">
                        ID:{" "}
                        <span className="fw-medium">
                          <b>{locationDetail.state.idArrivage}</b>
                        </span>
                      </p>
                      <p className="mb-1">
                        Désignation:{" "}
                        <span className="fw-medium">
                          {locationDetail.state.designation}
                        </span>
                      </p>
                      <p className="mb-1">
                        Montant Total:
                        <span className="fw-medium">
                          {locationDetail.state.montantTotal} dt
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
                        Quantité Total:
                        <span className="fw-medium">{arrivageTotal}</span>
                      </p>
                      <p className="mb-1">
                        Catégorie:
                        {/* <span className="fw-medium">{arrivageTotal}</span> */}
                      </p>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <div className="avatar-title bg-warning-subtle text-warning rounded fs-3">
                        <i className="ph-map-pin"></i>
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
                    <h6 className="fs-18 mb-3">Détail Fournisseur</h6>
                    {fournisseurDetail.map((fournisseur) => (
                      <>
                        <div
                          style={{ paddingRight: 80 }}
                          className="flex-grow-1"
                          key={fournisseur.idfournisseur}
                        >
                          <p className="mb-0 fw-medium">
                            {fournisseur.raison_sociale}
                          </p>
                          <p className="mb-0">{fournisseur.adresse}</p>
                        </div>
                        <div className="avatar-sm flex-shrink-0">
                          <img
                            src={`data:image/jpeg;base64,${fournisseur.logo}`}
                            alt={fournisseur.raison_sociale}
                            className="avatar-sm rounded"
                          />
                        </div>
                      </>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="d-flex align-items-center gap-3 mb-4">
            <h5 className="card-title flex-grow-1 mb-0">Liste des produits</h5>
          </div>
          <Row className="justify-content-between">
            <Table>
              <thead>
                <tr>
                  <td>Nom Produit</td>
                  <td>Quantité</td>
                  <td>PrixHT</td>
                  <td>PrixTTC</td>
                  <td>Prix Vente</td>
                  <td>Bénificie</td>
                  <td>Prix Remise</td>
                </tr>
              </thead>
              <tbody>
                {result.map((item, i) => (
                  <tr key={item.idArrivageProduit}>
                    <td>{item.nomProduit}</td>
                    <td>{item.quantite}</td>
                    <td>{item.prixAchatHt}</td>
                    <td>{item.prixAchatTtc}</td>
                    <td>{item.prixVente}</td>
                    <td>{item.Benifice}</td>
                    <td>{item.PrixRemise}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default ShippingDetails;
