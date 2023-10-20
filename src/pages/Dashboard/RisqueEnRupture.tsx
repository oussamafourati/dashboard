import React from "react";
import { Card, Col } from "react-bootstrap";
import { useGetQtyProduitQuery } from "features/arrivageProduit/arrivageProduitSlice";
import SimpleBar from "simplebar-react";
import CountUp from "react-countup";

const RiskRupture = () => {
  const { data: QtyProduct = [] } = useGetQtyProduitQuery();
  const result2 = QtyProduct.filter(
    (QteProduct) =>
      parseInt(QteProduct.seuil_product!) >= parseInt(QteProduct.TotalQuantity!)
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
                    <th scope="col">Seuil</th>
                  </tr>
                </thead>
                <tbody>
                  {(result2 || []).map((item, key) => (
                    <tr key={key}>
                      <td>{item.nomProduit}</td>
                      <td>
                        <CountUp start={0} end={item.SUMTOTAL!} separator="," />{" "}
                        DT
                      </td>
                      <td>{item.TotalQuantity}</td>
                      <td>{item.seuil_product}</td>
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
