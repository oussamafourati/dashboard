import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import { useLocation } from "react-router-dom";

import { ArrivageProduit } from "features/arrivageProduit/arrivageProduitSlice";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

const Overview = () => {
  document.title = "Product Overview | Toner eCommerce + Admin React Template";
  const LocationProduct = useLocation();

  const [produitState, setProduitState] = useState<ArrivageProduit[]>([]);

  useEffect(() => {
    const getProduitState = async () => {
      const reqdata = await fetch(
        `http://localhost:8000/arrivageProduit/ArrProduit/${LocationProduct.state.idproduit}`
      );
      const resdata = await reqdata.json();
      setProduitState(resdata);
    };
    getProduitState();
  }, []);

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Détails" pageTitle="Produit" />
          <Row className="gx-lg-4">
            <Col xl={4} lg={8} className="mx-auto">
              <Row className="sticky-side-div">
                <Col lg={12}>
                  {/* <Alert variant="success" className="text-center">
                    Deals Of The Week
                  </Alert> */}
                </Col>

                <Col lg={10}>
                  <div className="bg-light rounded-2 position-relative ribbon-box overflow-hidden">
                    <img
                      src={`data:image/jpeg;base64,${LocationProduct.state.imageProduit}`}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </Col>
              </Row>
            </Col>

            <Col xl={8}>
              <div className="mt-5 mt-xl-0">
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <h4>{LocationProduct.state.nomProduit}</h4>
                    <div className="hstack gap-3 flex-wrap">
                      <div>
                        <span className="text-body fw-medium">
                          {LocationProduct.state.nom}
                        </span>
                      </div>
                      <div className="vr"></div>
                      <div className="text-muted">
                        Sous-Catégorie :{" "}
                        <span className="text-body fw-medium">
                          {LocationProduct.state.title}
                        </span>
                      </div>
                      <div className="vr"></div>
                      <div className="text-muted">
                        Date d'Arrivage :{" "}
                        {produitState.map((arpro) => (
                          <span className="text-body fw-medium">
                            {arpro.dateArrivage}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <Row className="mt-4">
                  <Col lg={3} sm={6} className="g-3">
                    <div className="p-2 border border-dashed rounded text-center">
                      <p className="mb-2 text-uppercase text-muted fs-13">
                        Prix Achat :
                      </p>
                      {produitState.map((arpro) => (
                        <h5 className="mb-0">{arpro?.prixVente!}</h5>
                      ))}
                    </div>
                  </Col>
                  <Col lg={3} sm={6} className="g-3">
                    <div className="p-2 border border-dashed rounded text-center">
                      <p className="mb-2 text-uppercase text-muted fs-13">
                        Prix Vente :
                      </p>
                      {produitState.map((arpro) => (
                        <h5 className="mb-0">{arpro?.prixAchatTtc!}</h5>
                      ))}
                    </div>
                  </Col>

                  <Col lg={3} sm={6} className="g-3">
                    <div className="p-2 border border-dashed rounded text-center">
                      <p className="mb-2 text-uppercase text-muted fs-13">
                        Pièce Disponible :
                      </p>
                      {produitState.map((arpro) => (
                        <h5 className="mb-0">{arpro.quantite}</h5>
                      ))}
                    </div>
                  </Col>
                </Row>

                <div className="mt-4 text-muted">
                  <h5 className="fs-15">Marque :</h5>
                  <p>{LocationProduct.state.marque}</p>
                </div>

                <div className="mt-3 mb-4">
                  <h5 className="fs-15 mb-3">Remarque :</h5>
                  <p>{LocationProduct.state.remarqueProduit}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Overview;
