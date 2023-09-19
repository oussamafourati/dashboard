import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { useGetQtyProduitQuery } from "features/arrivageProduit/arrivageProduitSlice";
import { Link } from "react-router-dom";
import StockReport from "./EnRuptureStock";
import RiskRupture from "./RisqueEnRupture";
import bodyLight from "assets/images/sidebar/body-light-1.png";

const TopProducts = () => {
  const { data: QteProduct = [] } = useGetQtyProduitQuery();
  const result = QteProduct.filter(
    (QteProduct) => QteProduct.TotalQuantity === 0
  );

  const result2 = QteProduct.filter(
    (QtyProduct) => QtyProduct.TotalQuantity! <= QtyProduct.seuil_product!
  );

  {
    /* Modal En rupture de stock */
  }
  const [modal_AddCouponsModals, setmodal_AddCouponsModals] =
    useState<boolean>(false);
  function tog_AddCouponsModals() {
    setmodal_AddCouponsModals(!modal_AddCouponsModals);
  }

  {
    /* Modal Entre 1 et 20 */
  }
  const [modal_AddProduitModals, setmodal_AddProduitModals] =
    useState<boolean>(false);
  function tog_AddProduitModals() {
    setmodal_AddProduitModals(!modal_AddProduitModals);
  }

  return (
    <React.Fragment>
      <Card className="card-height-100">
        <Card.Header className="align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1">Rapport de stock</h4>
          {/* <div className="flex-shrink-0">
              <Link
                to="#"
                className="btn btn-soft-info btn-sm"
                onClick={() => tog_AddCouponsModals()}
              >
                <i className="ri-file-list-3-line align-middle"></i> Détails
              </Link>
            </div> */}
        </Card.Header>
        <Card.Body className="hstack gap-5 justify-content-center mb-0">
          <div
            className="position-absolute opacity-50 start-0 end-0 top-0 bottom-0"
            style={{ backgroundImage: `url(${bodyLight})` }}
          ></div>{" "}
          <div>
            <Link
              to="#"
              onClick={() => tog_AddCouponsModals()}
              className="btn btn-danger btn-label btn-hover rounded-pill"
            >
              <i className="bi bi-cart-x label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
              <span className="fs-18">{result.length}</span> Rupture de Stock
            </Link>
          </div>
          <div>
            <Link
              to="#"
              onClick={() => tog_AddProduitModals()}
              className="btn btn-warning btn-label btn-hover rounded-pill"
            >
              <i className="bi bi-exclamation-octagon label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
              <span className="fs-18">{result2.length}</span> à risque de
              rupture
            </Link>
          </div>
        </Card.Body>
      </Card>

      {/* Modal En rupture de stock */}
      <Modal
        id="showModal"
        className="fade zoomIn"
        size="lg"
        show={modal_AddCouponsModals}
        onHide={() => {
          tog_AddCouponsModals();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            En rupture de stock
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <StockReport />{" "}
        </Modal.Body>
      </Modal>

      {/* Modal entre 1 et 20 */}
      <Modal
        id="showModal"
        className="fade zoomIn"
        size="lg"
        show={modal_AddProduitModals}
        onHide={() => {
          tog_AddProduitModals();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Produits à risque de rupture
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <RiskRupture />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default TopProducts;
