import React, { useState, useMemo, useCallback } from "react";
import { Button, Card, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import TableContainer from "Common/TableContainer";
import { ListView } from "Common/data";
import Flatpickr from "react-flatpickr";
import { Link, useNavigate } from "react-router-dom";
import {
  Facture,
  useDeleteFactureMutation,
  useFetchFacturesQuery,
} from "features/facture/factureSlice";
import Swal from "sweetalert2";

const InvoiceListTablePassager = () => {
  const { data = [] } = useFetchFacturesQuery();
  const [deleteFacture] = useDeleteFactureMutation();

  const [modal_AddUserModals, setmodal_AddUserModals] =
    useState<boolean>(false);
  const [isMultiDeleteButton, setIsMultiDeleteButton] =
    useState<boolean>(false);

  function tog_AddUserModals() {
    setmodal_AddUserModals(!modal_AddUserModals);
  }

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkAll") as HTMLInputElement;
    const ele = document.querySelectorAll(".invoiceCheckBox");

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    checkedbox();
  }, []);

  const checkedbox = () => {
    const ele = document.querySelectorAll(".invoiceCheckBox:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
  };
  const navigate = useNavigate();
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
          deleteFacture(id);
          swalWithBootstrapButtons.fire(
            "Supprimé !",
            "La Facture a été supprimée.",
            "success"
          );
          navigate("/invoices-list");
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "La Facture est en sécuritée :)",
            "error"
          );
        }
      });
  };

  const columns = useMemo(
    () => [
      // {
      //     Header: (<div className="form-check">
      //         <input className="form-check-input" type="checkbox" id="checkAll" onClick={() => checkedAll()} />
      //     </div>),
      //     Cell: (cellProps: any) => {
      //         return (<div className="form-check">
      //             <input className="invoiceCheckBox form-check-input" type="checkbox" name="chk_child" value={cellProps.row.original.id} onChange={() => checkedbox()} />
      //         </div>);
      //     },
      //     id: '#',
      // },
      {
        Header: "Numéro Facture",
        accessor: "designationFacture",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Date Facturation",
        disableFilters: true,
        filterable: true,
        accessor: "dateFacturation",
      },
      {
        Header: "Montant Total",
        accessor: "MontantTotal",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Date Paiement",
        accessor: "datePaiement",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Nom Client",
        accessor: "nomClient",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Status",
        disableFilters: true,
        filterable: true,
        accessor: (facture: Facture) => {
          switch (facture.statusFacture) {
            case 2:
              return <span className="badge badge-soft-success">{"Payé"}</span>;
            case 0:
              return (
                <span className="badge badge-soft-danger">{"Impayé"}</span>
              );
            case 1:
              return (
                <span className="badge badge-soft-warning">{"Semi-Payé"}</span>
              );
            default:
              return (
                <span className="badge badge-soft-danger">{"Impayé"}</span>
              );
          }
        },
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (facture: Facture) => {
          return (
            <ul className="hstack gap-2 list-unstyled mb-0">
              <li>
                <Link
                  to="/invoices-details"
                  state={facture}
                  className="link-primary"
                  data-bs-toggle="modal"
                >
                  <i className="ri-eye-line ri-xl" />
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => AlertDelete(facture.idFacture)}
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
    [checkedAll]
  );

  return (
    <React.Fragment>
      <Card.Header className="border-0">
        <div className="d-flex align-items-center justify-content-end">
          <div className="flex-shrink-0">
            <div className="d-flex gap-2 flex-wrap">
              {isMultiDeleteButton && (
                <Button variant="danger" className="btn-icon">
                  <i className="ri-delete-bin-2-line"></i>
                </Button>
              )}
              <Link
                to="/invoices-create"
                className="btn btn-primary"
                onClick={tog_AddUserModals}
              >
                <i className="ri-add-line align-bottom me-1"></i> Créer Facture
              </Link>
            </div>
          </div>
        </div>
      </Card.Header>
      {/* <Card.Body className="bg-soft-light border border-dashed border-start-0 border-end-0">
              <form>
                <Row className="g-3">
                  <Col xxl={5} sm={12}>
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search bg-light border-light"
                        placeholder="rechercher facture par date, client, status..."
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                  <Col xxl={3} sm={4}>
                    <Flatpickr
                      className="form-control bg-light border-light"
                      placeholder="Selectionner Date"
                      options={{
                        mode: "range",
                        dateFormat: "d M, Y",
                      }}
                    />
                  </Col>
                  <Col xxl={3} sm={4}>
                    <div className="input-light">
                      <select
                        className="form-control"
                        data-choices
                        data-choices-search-false
                        name="choices-single-default"
                        id="idStatus"
                      >
                        <option value="">Status</option>
                        <option defaultValue="all">Tous</option>
                        <option value="Unpaid">Payée</option>
                        <option value="Paid">Impayée</option>
                        <option value="Cancel">Annulée</option>
                        <option value="Refund">Remboursée</option>
                      </select>
                    </div>
                  </Col>
                </Row>
              </form>
            </Card.Body> */}
      <Card.Body>
        <div>
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
              SearchPlaceholder="Recherche..."
            />
            <div className="noresult" style={{ display: "none" }}>
              <div className="text-center">
                {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px"></lord-icon> */}
                <h5 className="mt-2">Sorry! No Result Found</h5>
                <p className="text-muted mb-0">
                  We've searched more than 150+ invoices We did not find any
                  invoices for you search.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>

      <Modal
        className="fade"
        show={modal_AddUserModals}
        onHide={() => {
          tog_AddUserModals();
        }}
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title" id="exampleModalLabel">
            Add User
          </h5>
        </Modal.Header>
        <Form className="tablelist-form">
          <Modal.Body className="p-4">
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>
            <input type="hidden" id="id-field" />

            <div className="text-center">
              <div className="position-relative d-inline-block">
                <div className="position-absolute  bottom-0 end-0">
                  <label
                    htmlFor="customer-image-input"
                    className="mb-0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Select Image"
                  >
                    <div className="avatar-xs cursor-pointer">
                      <div className="avatar-title bg-light border rounded-circle text-muted">
                        <i className="ri-image-fill"></i>
                      </div>
                    </div>
                  </label>
                  <Form.Control
                    className="d-none"
                    value=""
                    id="users-image-input"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                  />
                </div>
                <div className="avatar-lg p-1">
                  <div className="avatar-title bg-light rounded-circle">
                    {/* <img src="../assets/images/users/user-dummy-img.jpg" id="users-img-field" className="avatar-md rounded-circle object-cover" /> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <Form.Label htmlFor="user-name">User Name</Form.Label>
              <Form.Control
                type="text"
                id="user-name-field"
                placeholder="Enter Name"
                required
              />
            </div>
            <div className="mb-3">
              <Form.Label htmlFor="email-field">User Email</Form.Label>
              <Form.Control
                type="email"
                id="email-field"
                placeholder="Enter Email"
                required
              />
            </div>

            <div className="mb-3">
              <Form.Label htmlFor="date-field">Date</Form.Label>
              <Flatpickr
                className="form-control flatpickr-input"
                placeholder="Select Date"
                options={{
                  mode: "range",
                  dateFormat: "d M, Y",
                }}
              />
            </div>

            <div>
              <label htmlFor="account-status" className="form-label">
                Account Status
              </label>
              <select
                className="form-control"
                required
                id="account-status-field"
              >
                <option value="">Account Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">inactive</option>
              </select>
            </div>
          </Modal.Body>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <Button
                className="btn-ghost-danger"
                onClick={() => {
                  tog_AddUserModals();
                }}
              >
                Close
              </Button>
              <Button variant="success" id="add-btn">
                Add User
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default InvoiceListTablePassager;
