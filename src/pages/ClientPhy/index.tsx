import React, { useState, useMemo } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import TableContainer from "Common/TableContainer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useFetchClientPhysiquesQuery,
  useDeleteClientPhysiqueMutation,
  ClientPhysique,
} from "features/clientPhysique/clientPhysiqueSlice";
import TableDetails from "./TableDetails";
import ModalClientPhy from "./ModalClientPhy";

const ClientPhy = () => {
  document.title = "Client Physique | Radhouani";

  const { data = [] } = useFetchClientPhysiquesQuery();
  const [deleteClientPhysique] = useDeleteClientPhysiqueMutation();

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
          deleteClientPhysique(id);
          swalWithBootstrapButtons.fire(
            "Supprimé !",
            "Le Client Physique a été supprimé.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Le Client Physique est en sécurité :)",
            "error"
          );
        }
      });
  };
  const [selectedEtat, setSelectedEtat] = useState<string>("");
  // This function is triggered when the select changes
  const selectChangeEtat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedEtat(value);
  };

  const etatActive = data.filter((fournisseur) => fournisseur.etat === 1);
  const etatNonActive = data.filter((fournisseur) => fournisseur.etat === 0);

  const [modal_AddDetailClPhyModals, setmodal_AddDetailClPhyModals] =
    useState<boolean>(false);
  function tog_AddDetailClPhyModals() {
    setmodal_AddDetailClPhyModals(!modal_AddDetailClPhyModals);
  }

  const columns = useMemo(
    () => [
      {
        Header: " ",
        accessor: (clientPhy: ClientPhysique) => {
          return (
            <Link
              to="#"
              state={clientPhy}
              onClick={() => tog_AddDetailClPhyModals()}
            >
              <div className="d-flex align-items-center gap-2">
                <div className="flex-shrink-0">
                  <img
                    src={`data:image/jpeg;base64, ${clientPhy.avatar}`}
                    alt=""
                    className="rounded-2 user-profile-img"
                    width="40"
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
        Header: "Nom",
        accessor: "raison_sociale",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "C.I.N ",
        accessor: "cin",
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
        accessor: (clientPhy: ClientPhysique) => {
          return (
            <ul className="hstack gap-2 list-unstyled mb-0">
              <li>
                <Link
                  to="#"
                  onClick={() => AlertDelete(clientPhy.idclient_p)}
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
          <Breadcrumb title="Client Physique" pageTitle="Tableau de bord" />
          <div id="couponsList">
            <Row>
              <Col xxl={12}>
                <Row className="align-items-center">
                  <Col xxl={3} md={5}></Col>
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
                    tableClassName="gridjs-table"
                    theadClassName="gridjs-thead"
                    SearchPlaceholder="Rechercher..."
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
                Ajouter Client Physique
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <ModalClientPhy />
            </Modal.Body>
          </Modal>

          <Modal
            id="showModal"
            className="fade zoomIn"
            size="xl"
            show={modal_AddDetailClPhyModals}
            onHide={() => {
              tog_AddDetailClPhyModals();
            }}
            centered
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title fs-18" id="exampleModalLabel">
                Détails
              </h5>
            </Modal.Header>
            <Modal.Body> {<TableDetails />}</Modal.Body>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ClientPhy;
