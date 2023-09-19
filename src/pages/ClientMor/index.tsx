import React, { useState, useMemo } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import TableContainer from "Common/TableContainer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  useFetchClientMoralesQuery,
  useAddClientMoraleMutation,
  useDeleteClientMoraleMutation,
  ClientMorale,
} from "features/clientMoral/clientMoralSlice";

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

  const notify = () => {
    Swal.fire({
      icon: "success",
      title: "Ajouté",
      text: "Le Client Morale a été créer avec succès",
    });
  };

  const [selectedEtatClient, setSelectedEtatClient] = useState<string>("");
  // This function is triggered when the select changes
  const selectChangeEtatClient = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedEtatClient(value);
  };

  const { data = [] } = useFetchClientMoralesQuery();
  const [createClientMorale] = useAddClientMoraleMutation();
  const [deleteClientMorale] = useDeleteClientMoraleMutation();

  const etatActive = data.filter((clienmorale) => clienmorale.etat === 1);
  const etatNonActive = data.filter((clienmorale) => clienmorale.etat === 0);

  const clienMoraleInitialValue = {
    idclient_m: 99,
    raison_sociale: "",
    adresse: "",
    tel: "",
    mail: "",
    mat: "",
    logo: "",
    rib: "",
    etat: 1,
    remarque: "",
    credit: 123,
    piecejointes: "",
  };

  const [formData, setFormData] = useState(clienMoraleInitialValue);

  const {
    raison_sociale,
    adresse,
    tel,
    mail,
    mat,
    logo,
    rib,
    etat,
    remarque,
    credit,
    piecejointes,
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      etat: parseInt(selectedEtatClient),
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createClientMorale(formData).then(() =>
      setFormData(clienMoraleInitialValue)
    );
    notify();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileLogo = (
      document.getElementById("logo") as HTMLInputElement
    ).files?.item(0) as File;

    const base64 = await convertToBase64(fileLogo);

    setFormData({
      ...formData,
      logo: base64 as string,
    });
  };

  function convertToBase64(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        const base64Data = base64String.split(",")[1];

        resolve(base64Data);
      };
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  document.title = "Client Morale | Radhouani";

  const columns = useMemo(
    () => [
      {
        Header: "Logo",
        disableFilters: true,
        filterable: true,
        accessor: (clienmorale: ClientMorale) => {
          return (
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <img
                  src={`data:image/jpeg;base64, ${clienmorale.logo}`}
                  alt=""
                  className="avatar-xs rounded-circle user-profile-img"
                />
              </div>
            </div>
          );
        },
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
        Header: "E-mail",
        accessor: "mail",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Etat",
        disableFilters: true,
        filterable: true,
        accessor: (clientMorale: ClientMorale) => {
          switch (clientMorale.etat) {
            case 1:
              return (
                <span className="badge badge-soft-success text-uppercase">
                  {" "}
                  actif
                </span>
              );
            case 0:
              return (
                <span className="badge badge-soft-danger text-uppercase">
                  {" "}
                  inactif
                </span>
              );
            default:
              return (
                <span className="badge badge-soft-danger text-uppercase">
                  {" "}
                  inactif
                </span>
              );
          }
        },
      },
      {
        Header: "Remarque",
        accessor: "remarque",
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
              <Form className="tablelist-form" onSubmit={onSubmit}>
                <Row>
                  <div
                    id="alert-error-msg"
                    className="d-none alert alert-danger py-2"
                  ></div>
                  <input type="hidden" id="id-field" />
                  <Col lg={12} className="text-center">
                    <div className="mb-3">
                      <div className="position-relative d-inline-block">
                        <div className="position-absolute top-100 start-100 translate-middle">
                          <label
                            htmlFor="logo"
                            className="mb-0"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            title="Select Client Physique Avatar"
                          >
                            <span className="avatar-xs d-inline-block">
                              <span className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                <i className="ri-image-fill"></i>
                              </span>
                            </span>
                          </label>
                          <input
                            className="form-control d-none"
                            type="file"
                            name="logo"
                            id="logo"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e)}
                          />
                        </div>
                        <div className="avatar-lg">
                          <div className="avatar-title bg-light rounded-3">
                            <img
                              src={`data:image/jpeg;base64, ${formData.logo}`}
                              alt=""
                              id="category-img"
                              className="avatar-md h-auto rounded-3 object-fit-cover"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="error-msg mt-1">
                        Please add a category images.
                      </div>
                    </div>
                  </Col>
                  <Col lg={6} className="mt-3">
                    <div className="mb-3">
                      <Form.Label htmlFor="raison_sociale">
                        Raison Sociale <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.raison_sociale}
                        onChange={onChange}
                        id="raison_sociale"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={6} className="mt-3">
                    <div className="mb-3">
                      <Form.Label htmlFor="mat">
                        Matricule Fiscale <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.mat}
                        onChange={onChange}
                        id="mat"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Form.Label htmlFor="tel">
                        Telephone <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.tel}
                        onChange={onChange}
                        id="tel"
                        required
                        minLength={8}
                        maxLength={8}
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Form.Label htmlFor="adresse">
                        Adresse <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.adresse}
                        onChange={onChange}
                        id="adresse"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Form.Label htmlFor="rib">
                        RIB <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.rib}
                        onChange={onChange}
                        id="rib"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Form.Label htmlFor="mail">E-mail</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.mail}
                        onChange={onChange}
                        id="mail"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="mb-3">
                      <Form.Label htmlFor="etat">Etat</Form.Label>
                      <select
                        className="form-select"
                        data-choices
                        data-choices-search-false
                        id="etat"
                        onChange={selectChangeEtatClient}
                        required
                      >
                        <option value="">Choisir</option>
                        <option value={1}>Actif</option>
                        <option value={0}>Inactif</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={5}>
                    <div className="mb-3">
                      <Form.Label htmlFor="remarque">Remarque</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.remarque}
                        onChange={onChange}
                        id="remarque"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={12} className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        className="btn-ghost-danger"
                        onClick={() => {
                          tog_AddCouponsModals();
                        }}
                      >
                        <i className="ri-close-line align-bottom me-1"></i>{" "}
                        Fermer
                      </Button>
                      <Button
                        onClick={() => {
                          tog_AddCouponsModals();
                        }}
                        type={"submit"}
                        variant="primary"
                        id="add-btn"
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

export default ClientMor;
