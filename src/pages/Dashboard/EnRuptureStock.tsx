import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetQtyProduitQuery } from "features/arrivageProduit/arrivageProduitSlice";
import SimpleBar from "simplebar-react";

const StockReport = () => {
  const { data: QtyProduct = [] } = useGetQtyProduitQuery();
  const result = QtyProduct.filter(
    (QteProduct) => parseInt(QteProduct.TotalQuantity!) == 0
  );
  return (
    <React.Fragment>
      <Col>
        <Card>
          <Card.Body>
            {result.length === 0 ? (
              <SimpleBar className="mt-5 text-center p-4">
                <div>
                  <p className="fs-18 text-muted fw-medium">
                    Vous n'avez pas de produits en rupture de stock
                  </p>
                </div>
              </SimpleBar>
            ) : (
              <div className="table-responsive table-card">
                <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                  <thead className="text-muted table-light">
                    <tr>
                      <th scope="col">Nom Produit</th>
                      <th scope="col">Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(result || []).map((item, key) => (
                      <tr key={key}>
                        <td>
                          <Link
                            to="/product-overview"
                            className="fw-medium link-primary"
                          >
                            {item.nomProduit}
                          </Link>
                        </td>
                        <td>
                          <span className="text-secondary">
                            {item.SUMTOTAL}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default StockReport;
