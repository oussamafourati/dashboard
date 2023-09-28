import React, { useState, useMemo } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import TableContainer from "Common/TableContainer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useFetchClientPhysiquesQuery,
  useDeleteClientPhysiqueMutation,
  useAddClientPhysiqueMutation,
  ClientPhysique,
} from "features/clientPhysique/clientPhysiqueSlice";
import TableDetails from "./TableDetails";

const ClientPhy = () => {
  const { data = [] } = useFetchClientPhysiquesQuery();
  const [deleteClientPhysique] = useDeleteClientPhysiqueMutation();
  const [createClientPhysique] = useAddClientPhysiqueMutation();

  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Le Client Physique a été créer avec succès",
      showConfirmButton: false,
      timer: 2500,
    });
  };

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

  const clientPhysiqueInitialValue = {
    idclient_p: 99,
    raison_sociale: "",
    adresse: "",
    tel: "",
    mail: "",
    cin: "",
    avatar: "",
    rib: "",
    etat: 1,
    remarque: "",
    credit: 123,
    piecejointes: "",
  };
  const [formData, setFormData] = useState(clientPhysiqueInitialValue);

  const {
    raison_sociale,
    adresse,
    tel,
    mail,
    cin,
    avatar,
    rib,
    etat,
    remarque,
    credit,
    piecejointes,
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    formData["etat"] = parseInt(selectedEtat);
    e.preventDefault();
    createClientPhysique(formData).then(() =>
      setFormData(clientPhysiqueInitialValue)
    );
    notify();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileLogo = (
      document.getElementById("avatar") as HTMLInputElement
    ).files?.item(0) as File;
    const base64 = await convertToBase64(fileLogo);
    setFormData({
      ...formData,
      avatar: base64 as string,
    });
  };

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        const base64Data = base64String.split(",")[1];

        resolve(base64Data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const [modal_AddDetailClPhyModals, setmodal_AddDetailClPhyModals] =
    useState<boolean>(false);
  function tog_AddDetailClPhyModals() {
    setmodal_AddDetailClPhyModals(!modal_AddDetailClPhyModals);
  }

  document.title = "Client Physique | Radhouani";

  const columns = useMemo(
    () => [
      {
        Header: "Nom",
        disableFilters: true,
        filterable: true,
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
                    className="avatar-sm rounded-circle user-profile-img"
                  />
                </div>
                <div className="flex-grow-1 ms-2 user_name text-dark">
                  {clientPhy.raison_sociale}
                </div>
              </div>
            </Link>
          );
        },
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
      // {
      //   Header: "E-mail",
      //   accessor: "mail",
      //   disableFilters: true,
      //   filterable: true,
      // },
      // {
      //   Header: "Etat",
      //   disableFilters: true,
      //   filterable: true,
      //   accessor: (clientPhy: ClientPhysique) => {
      //     switch (clientPhy.etat) {
      //       case 0:
      //         return (
      //           <span className="badge badge-soft-danger text-uppercase">
      //             {" "}
      //             inactif
      //           </span>
      //         );
      //       case 1:
      //         return (
      //           <span className="badge badge-soft-success text-uppercase">
      //             {" "}
      //             actif
      //           </span>
      //         );
      //       default:
      //         return (
      //           <span className="badge badge-soft-danger text-uppercase">
      //             {" "}
      //             inactif
      //           </span>
      //         );
      //     }
      //   },
      // },
      // {
      //   Header: "Remarque",
      //   accessor: "remarque",
      //   disableFilters: true,
      //   filterable: true,
      // },
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
              <form className="tablelist-form" onSubmit={onSubmit}>
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
                            htmlFor="avatar"
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
                            name="avatar"
                            id="avatar"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e)}
                          />
                        </div>
                        <div className="avatar-lg">
                          <div className="avatar-title bg-light rounded-3">
                            <img
                              src={`data:image/jpeg;base64, ${formData.avatar}`}
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
                        Nom Client <span className="text-danger">*</span>
                      </Form.Label>
                      <input
                        type="text"
                        value={formData.raison_sociale}
                        onChange={onChange}
                        id="raison_sociale"
                        required
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col lg={6} className="mt-3">
                    <div className="mb-3">
                      <Form.Label htmlFor="cin">
                        C.I.N <span className="text-danger">*</span>
                      </Form.Label>
                      <input
                        className="form-control"
                        type="number"
                        value={formData.cin}
                        onChange={onChange}
                        id="cin"
                        minLength={8}
                        maxLength={8}
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={5}>
                    <div className="mb-3">
                      <Form.Label htmlFor="adresse">
                        Adresse <span className="text-danger">*</span>
                      </Form.Label>
                      <input
                        className="form-control"
                        type="text"
                        value={formData.adresse}
                        onChange={onChange}
                        id="adresse"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="mb-3">
                      <Form.Label htmlFor="tel">
                        Telephone <span className="text-danger">*</span>
                      </Form.Label>
                      <input
                        className="form-control"
                        type="number"
                        value={formData.tel}
                        onChange={onChange}
                        id="tel"
                        maxLength={8}
                        minLength={8}
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Form.Label htmlFor="rib">
                        RIB<span className="text-danger">*</span>
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
                  <Col lg={5}>
                    <div className="mb-3">
                      <Form.Label htmlFor="mail">E-mail</Form.Label>
                      <Form.Control
                        type="email"
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
                        onChange={selectChangeEtat}
                        className="form-select"
                        name="choices-single-default"
                        id="etat"
                      >
                        <option value="">Choisir</option>
                        <option value={1}>Actif</option>
                        <option value={0}>Inactif</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={4}>
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
                        type={"submit"}
                        onClick={() => {
                          tog_AddCouponsModals();
                        }}
                        variant="primary"
                        id="add-btn"
                      >
                        Ajouter
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
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
