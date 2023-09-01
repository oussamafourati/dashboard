import React, { useState, useMemo, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  useGetAllArrivagesQuery,
  useAddArrivageMutation,
  useDeleteArrivageMutation,
  Arrivage,
} from "features/arrivage/arrivageSlice";
import { useFetchFournisseurQuery } from "../../../features/fournisseur/fournisseurSlice";
import Swal from "sweetalert2";
import dayjs, { Dayjs } from "dayjs";

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

  let now = dayjs();
  const [value, setValue] = React.useState<Dayjs | null>(now);
  const newDate = `${value?.year()}-${value!.month() + 1}-${value!.date()}`;

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
    montantTotal: "",
    dateArrivage: "",
    raison_sociale: "",
    fournisseurID: 17,
    piecejointe: "",
  });

  const {
    idArrivage,
    designation,
    montantTotal,
    dateArrivage,
    raison_sociale,
    fournisseurID,
    piecejointe,
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    formData["dateArrivage"] = newDate;
    e.preventDefault();
    addArrivage(formData).then(() => setFormData(formData));
    notify();
    navigate("/shipping-list", { state: formData });
  };

  const [modal_AddShippingModals, setmodal_AddShippingModals] =
    useState<boolean>(false);
  function tog_AddShippingModals() {
    setmodal_AddShippingModals(!modal_AddShippingModals);
  }

  const columns = useMemo(
    () => [
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
        accessor: (arrivageProd: Arrivage) => {
          return (
            <ul className="hstack gap-2 list-unstyled mb-0">
              <li>
                <Link to="/nouveau-arrivage-produit" state={arrivageProd}>
                  <i className="ri-folder-add-line ri-xl" />
                </Link>
              </li>
              <li>
                <Link
                  className="link-success"
                  to="/detail"
                  state={arrivageProd}
                >
                  <i className="ri-eye-line ri-xl" />
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="link-danger"
                  onClick={() => AlertDelete(arrivageProd.idArrivage)}
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Arrivage" pageTitle="Tableau de bord" />
          <Card id="shipmentsList">
            {/* <Card.Header className="border-bottom-dashed">
              <Row className="g-3">
                <Col xxl={3} lg={2}></Col>
                <Col xxl={3} lg={2}></Col>
                <Col xxl={3} lg={2}></Col>
                <Col xxl={3} lg={6}>
                  <Flatpickr
                    className="form-control flatpickr-input"
                    placeholder="Selectionner Date"
                    options={{
                      mode: "range",
                      dateFormat: "d.m.Y",
                    }}
                  />
                </Col>
              </Row>
            </Card.Header> */}
            <Card.Body>
              <Row className="align-items-center g-3">
                <Col className="col-xxl-auto col-sm-auto ms-auto">
                  <Button
                    onClick={() => navigate("/nouveau-arrivage")}
                    variant="success"
                    type="submit"
                    className="add-btn"
                  >
                    <i className="bi bi-plus-circle me-1 align-middle"></i>
                    Ajouter Arrivage
                  </Button>
                </Col>
              </Row>
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
                  SearchPlaceholder="Rechercher Arrivage..."
                />
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
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="de"
                      >
                        <DatePicker
                          defaultValue={now}
                          slotProps={{
                            textField: {
                              size: "small",
                              inputProps: { ["placeholder"]: "AAAA.MM.DD" },
                            },
                          }}
                          value={value}
                          onChange={(newValue) => setValue(newValue)}
                          format="YYYY-MM-DD"
                        />
                      </LocalizationProvider>
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
