import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { stockReport } from "../../Common/data";
import { useGetQtyProduitQuery } from "features/arrivageProduit/arrivageProduitSlice";
import SimpleBar from "simplebar-react";

const Status = ({ status }: any) => {
  switch (status) {
    case "In Stock":
      return <span className="badge badge-soft-success"> {status}</span>;
    case "Low Stock":
      return <span className="badge badge-soft-warning"> {status}</span>;
    default:
      return <span className="badge badge-soft-danger"> {status}</span>;
  }
};

const MoinsRisque = () => {
  const { data: QtyProduct = [] } = useGetQtyProduitQuery();
  const result3 = QtyProduct.filter(
    (QteProduct) =>
      QteProduct.TotalQuantity! > 21 && QteProduct.TotalQuantity! < 50
  );
  return (
    <React.Fragment>
      <Col xxl={9}>
        <Card>
          <Card.Body>
            {result3.length === 0 ? (
              <SimpleBar>
                <div>
                  <p className="fs-18 text-muted fw-medium">
                    Vous n'avez pas de produits entre 21 et 50 pièces
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
                  {(result3 || []).map((item, key) => (
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

export default MoinsRisque;
