import React from "react";
import SimpleBar from "simplebar-react";
import { Card, Col } from "react-bootstrap";
import { useFetchTopSellingQuery } from "features/ligneVente/ligneVenteSlice";

const ProductDelivery = () => {
  const { data: TopSellingProduct = [] } = useFetchTopSellingQuery();

  return (
    <React.Fragment>
      <Col xxl={4} lg={6}>
        <Card>
          <Card.Header className="d-flex">
            <h5 className="card-title flex-grow-1 mb-0">Meilleures Ventes</h5>
          </Card.Header>
          <Card.Body className="px-0">
            <SimpleBar style={{ maxHeight: "415px" }}>
              <div className="vstack gap-3 px-3">
                {(TopSellingProduct || []).map((item, key) => (
                  <div className="p-3 border border-dashed rounded-3" key={key}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="flex-grow-1">
                        <h6>{item.productName}</h6>
                        <p className="mb-0">
                          <span className="text-info">
                            {item.TotalQuantity}
                          </span>
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="badge badge-soft-dark">
                          {item.TotalVente}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SimpleBar>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default ProductDelivery;
