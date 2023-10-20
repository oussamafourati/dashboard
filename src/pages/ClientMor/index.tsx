import React, { useState, useMemo } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import TableContainer from "Common/TableContainer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  useFetchClientMoralesQuery,
  useDeleteClientMoraleMutation,
  ClientMorale,
} from "features/clientMoral/clientMoralSlice";
import DetailsClientMoral from "./DetailsClientMoral";
import ModalClientMoral from "./ModalClientMoral";

const ClientMor = () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const AlertDelete = async (id: number) => {
    swalWithBootstrapButtons
      .fire({
        title: "Êtes-vous sûr?",
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimez-le !",
        cancelButtonText: "Non, annulez !",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteClientMorale(id);
          swalWithBootstrapButtons.fire(
            "Supprimé !",
            "Le Client a été supprimé.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Le Client est en sécurité :)",
            "error"
          );
        }
      });
  };

  const { data = [] } = useFetchClientMoralesQuery();
  const [deleteClientMorale] = useDeleteClientMoraleMutation();

  document.title = "Client Morale | Radhouani";

  const [modal_AddDetailClMorModals, setmodal_AddDetailClMorModals] =
    useState<boolean>(false);
  function tog_AddDetailClMorModals() {
    setmodal_AddDetailClMorModals(!modal_AddDetailClMorModals);
  }

  const columns = useMemo(
    () => [
      {
        Header: " ",
        accessor: (clientmorale: ClientMorale) => {
          return (
            <Link
              to="#"
              state={clientmorale}
              onClick={() => tog_AddDetailClMorModals()}
            >
              <div className="d-flex align-items-center gap-2">
                <div className="flex-shrink-0">
                  <img
                    src={`data:image/jpeg;base64, ${clientmorale.logo}`}
                    alt=""
                    className="rounded-2 user-profile-img"
                    width="100"
                  />
                </div>
              </div>
            </Link>
          );
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Raison sociale",
        accessor: "raison_sociale",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Matricule",
        accessor: "mat",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "RIB",
        accessor: "rib",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Adresse",
        accessor: "adresse",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Telephone",
        accessor: "tel",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (clientMorale: ClientMorale) => {
          return (
            <ul className="hstack gap-2 list-unstyled mb-0">
              <li>
                <Link
                  to="/client-morale"
                  onClick={() => AlertDelete(clientMorale.idclient_m)}
                  data-bs-toggle="modal"
                  className="link-danger"
                >
                  <i className="ri-delete-bin-5-line ri-xl" />
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    []
  );

  const [modal_AddCouponsModals, setmodal_AddCouponsModals] =
    useState<boolean>(false);
  function tog_AddCouponsModals() {
    setmodal_AddCouponsModals(!modal_AddCouponsModals);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Client Morale" pageTitle="Tableau de bord" />
          <div id="couponsList">
            <Row>
              <Col xxl={12}>
                <Row className="align-items-center">
                  <Col className="col-md-auto ms-auto">
                    <Button
                      variant="success"
                      onClick={() => tog_AddCouponsModals()}
                      className="add-btn"
                    >
                      <i className="bi bi-plus-circle me-1 align-middle"></i>
                      Ajouter
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div>
                  <TableContainer
                    columns={columns || []}
                    data={data || []}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={10}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Rechercher Client Morale..."
                  />
                </div>
              </Col>
            </Row>
          </div>
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
                Ajouter Client Morale
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <ModalClientMoral />
            </Modal.Body>
          </Modal>
          <Modal
            id="showModal"
            className="fade zoomIn"
            size="xl"
            show={modal_AddDetailClMorModals}
            onHide={() => {
              tog_AddDetailClMorModals();
            }}
            centered
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title fs-18" id="exampleModalLabel">
                Détails
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              {" "}
              <DetailsClientMoral />{" "}
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ClientMor;
