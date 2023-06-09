import React, { useState, useMemo } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import TableContainer from "Common/TableContainer";
import { shipments } from "Common/data";
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import {
  useGetAllArrivagesQuery,
  useAddArrivageMutation,
  useDeleteArrivageMutation,
  Arrivage,
} from "features/arrivage/arrivageSlice";
import { useFetchFournisseurQuery } from "../../../features/fournisseur/fournisseurSlice";
import Swal from "sweetalert2";
import AddArrivageProduit from "../CreateArrivageProduit";

const Shipments = () => {
  const navigate = useNavigate();

  document.title = "Arrivage | Radhouani";
  const notify = () => {
    Swal.fire({
      icon: "success",
      title: "Ajouté",
      text: "L'arrivage a été créer avec succès",
    });
  };

  // All Arrivage
  const { data = [] } = useGetAllArrivagesQuery();

  //All Fournisseur
  const { data: allfournisseur = [] } = useFetchFournisseurQuery();

  const [deleteArrivage] = useDeleteArrivageMutation();
  const [addArrivage] = useAddArrivageMutation();

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
          deleteArrivage(id);
          swalWithBootstrapButtons.fire(
            "Supprimé !",
            "L'arrivage a été supprimé.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "L'arrivage est en sécurité :)",
            "error"
          );
        }
      });
  };

  const [formData, setFormData] = useState({
    idArrivage: 0,
    designation: "",
    montantTotal: 0,
    dateArrivage: "",
    raison_sociale: "",
    fournisseurID: 17,
  });

  const {
    idArrivage,
    designation,
    montantTotal,
    dateArrivage,
    raison_sociale,
    fournisseurID,
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addArrivage(formData).then(() => setFormData(formData));
    notify();
  };

  const [modal_AddShippingModals, setmodal_AddShippingModals] =
    useState<boolean>(false);
  function tog_AddShippingModals() {
    setmodal_AddShippingModals(!modal_AddShippingModals);
  }

  const columns = useMemo(
    () => [
      {
        Header: "ID arrivage",
        disableFilters: true,
        filterable: true,
        accessor: "idArrivage",
      },
      {
        Header: "Designation",
        accessor: "designation",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Montant Total",
        accessor: "montantTotal",
        disableFilters: true,
        filterable: true,
      },

      {
        Header: "Date Arrivage",
        accessor: "dateArrivage",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Fournisseur",
        accessor: "raison_sociale",
        disableFilters: true,
        filterable: true,
      },

      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (arrivage: Arrivage) => {
          return (
            <ul className="hstack gap-2 list-unstyled mb-0">
              <li>
                <Link to="#" className="badge badge-soft-primary edit-item-btn">
                  Modifier
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="badge badge-soft-danger remove-item-btn"
                  onClick={() => AlertDelete(arrivage.idArrivage)}
                >
                  Supprimer
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Arrivage" pageTitle="Tableau de bord" />

          <Card id="shipmentsList">
            <Card.Header className="border-bottom-dashed">
              <Row className="align-items-center g-3">
                <Col xxl={3} sm={6}>
                  <h6 className="card-title mb-0">Arrivage</h6>
                </Col>
                <Col className="col-xxl-auto col-sm-auto ms-auto">
                  <Button
                    variant="success"
                    onClick={() => navigate("/shipping-list")}
                    className="add-btn"
                  >
                    <i className="bi bi-plus-circle me-1 align-middle"></i>{" "}
                    Ajouter Arrivage
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Header className="border-bottom-dashed">
              <Row className="g-3">
                <Col xxl={3} lg={6}>
                  <div className="search-box">
                    <input
                      type="text"
                      className="form-control search"
                      placeholder="Rechercher arrivage par date..."
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </Col>
                <Col xxl={3} lg={6}>
                  <Flatpickr
                    className="form-control flatpickr-input"
                    placeholder="Selectionner Date"
                    options={{
                      mode: "range",
                      dateFormat: "d M, Y",
                    }}
                  />
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive table-card">
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
                  SearchPlaceholder="Search Products..."
                />
              </div>
              <div className="noresult" style={{ display: "none" }}>
                <div className="text-center py-4">
                  <div className="avatar-md mx-auto mb-4">
                    <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                      <i className="bi bi-search"></i>
                    </div>
                  </div>
                  <h5 className="mt-2">Sorry! No Result Found</h5>
                  <p className="text-muted mb-0">
                    We've searched more than 150+ shipment orders We did not
                    find any shipment orders for you search.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Modal
            className="fade zoomIn"
            size="xl"
            show={modal_AddShippingModals}
            onHide={() => {
              tog_AddShippingModals();
            }}
            centered
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title fs-18" id="exampleModalLabel">
                Ajouter Arrivage
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <div
                id="alert-error-msg"
                className="d-none alert alert-danger py-2"
              ></div>
              <Form className="tablelist-form" onSubmit={onSubmit}>
                <input type="hidden" id="id-field" />
                <Row>
                  <Col lg={12}>
                    <div className="mb-3">
                      <Form.Label htmlFor="designation">Designation</Form.Label>
                      <Form.Control
                        type="text"
                        id="designation"
                        onChange={onChange}
                        placeholder="designation"
                        value={formData.designation}
                        required
                      />
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="mb-3">
                      <Form.Label htmlFor="montantTotal">
                        Montant Total
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="montantTotal"
                        placeholder="taper le total"
                        onChange={onChange}
                        value={formData.montantTotal}
                        required
                      />
                    </div>
                  </Col>

                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="dateArrivage">
                        Date d'arrivage
                      </Form.Label>

                      <Form.Control
                        type="text"
                        id="dateArrivage"
                        placeholder="Selectionner date"
                        onChange={onChange}
                        value={formData.dateArrivage}
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label htmlFor="statusSelect" className="form-label">
                        Fournisseur
                      </label>
                      <select
                        className="form-select"
                        name="choices-single-default"
                        id="statusSelect"
                        required
                      >
                        <option value="">Raison Sociale</option>
                        {allfournisseur.map((fournisseur) => (
                          <option
                            key={formData.fournisseurID}
                            value={formData.fournisseurID}
                          >
                            {fournisseur.raison_sociale}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        className="btn-ghost-danger"
                        onClick={() => {
                          tog_AddShippingModals();
                        }}
                        data-bs-dismiss="modal"
                      >
                        <i className="ri-close-line align-bottom me-1"></i>{" "}
                        Fermer
                      </Button>
                      <Button
                        variant="primary"
                        id="add-btn"
                        onClick={() => {
                          tog_AddShippingModals();
                        }}
                        type="submit"
                      >
                        Ajouter
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Shipments;
