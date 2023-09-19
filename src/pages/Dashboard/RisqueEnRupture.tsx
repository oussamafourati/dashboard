import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { stockReport } from "../../Common/data";
import { useGetQtyProduitQuery } from "features/arrivageProduit/arrivageProduitSlice";
import SimpleBar from "simplebar-react";

const RiskRupture = () => {
  const { data: QtyProduct = [] } = useGetQtyProduitQuery();
  const result2 = QtyProduct.filter(
    (QteProduct) => QteProduct.TotalQuantity! <= QteProduct.seuil_product!
  );

  return (
    <React.Fragment>
      <Col>
        <Card>
          <Card.Body>
            {result2.length === 0 ? (
              <SimpleBar className="mt-5 text-center p-4">
                <div>
                  <p className="fs-18 text-muted fw-medium">
                    Vous n'avez pas de produits qui risquent d'être en rupture
                    de stock
                  </p>
                </div>
              </SimpleBar>
            ) : (
              <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                <thead className="text-muted table-light">
                  <tr>
                    <th scope="col">Nom Produit</th>
                    <th scope="col">Montant</th>
                    <th scope="col">Quantité</th>
                  </tr>
                </thead>
                <tbody>
                  {(result2 || []).map((item, key) => (
                    <tr key={key}>
                      <td>
                        <Link
                          to="/product-overview"
                          className="fw-medium link-primary"
                        >
                          {item.nomProduit}
                        </Link>
                      </td>
                      {/* <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-2">
                            <img
                              src={item.productImage}
                              alt=""
                              className="avatar-xs rounded-circle"
                            />
                          </div>
                          <div className="flex-grow-1">
                            <Link to="/product-overview" className="text-reset">
                              {item.productName}
                            </Link>
                          </div>
                        </div>
                      </td> */}

                      <td>
                        <span className="text-secondary">{item.SUMTOTAL}</span>
                      </td>
                      {/* <td>
                        <Status status={item.stockStatus} />
                      </td> */}
                      <td>{item.TotalQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RiskRupture;
