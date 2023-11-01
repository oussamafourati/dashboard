import React, { useMemo, useState } from "react";
import TableContainer from "Common/TableContainer";
import { Button, Col, Form, Offcanvas, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Compte,
  useDeleteCompteMutation,
  useFetchAllUsersQuery,
} from "features/compte/compteSlice";
import Swal from "sweetalert2";

const ProductTable = () => {
  const { data = [] } = useFetchAllUsersQuery();

  const [deleteAccount] = useDeleteCompteMutation();

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
          deleteAccount(id);
          swalWithBootstrapButtons.fire(
            "Supprimé !",
            "Le compte a été supprimé.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Le compte est en sécurité :)",
            "error"
          );
        }
      });
  };

  const [show, setShow] = useState<boolean>(false);
  const [info, setInfo] = useState<any>([]);

  const columns = useMemo(
    () => [
      {
        Header: "Nom",
        accessor: "fullname",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Nom d'utilisateur",
        accessor: "username",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Code",
        accessor: "code",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Role",
        disableFilters: true,
        filterable: true,
        accessor: (compte: Compte) => {
          switch (compte.role) {
            case 0:
              return (
                <span className="badge badge-soft-info text-uppercase">
                  {" "}
                  Caissier
                </span>
              );
            case 1:
              return (
                <span className="badge badge-soft-dark text-uppercase">
                  {" "}
                  Admin
                </span>
              );
            default:
              return (
                <span className="badge badge-soft-dark text-uppercase">
                  {" "}
                  Admin
                </span>
              );
          }
        },
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (account: Compte) => {
          return (
            <React.Fragment>
              <ul className="hstack gap-2 list-unstyled mb-0">
                <li>
                  <Link
                    className="link-success"
                    to="#"
                    onClick={() => {
                      setShow(true);
                      setInfo(account);
                    }}
                  >
                    <i className="ri-eye-line ri-xl" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/modifier-compte"
                    className="link-info"
                    state={account}
                  >
                    <i className="ri-edit-line ri-xl" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="link-danger"
                    onClick={() => AlertDelete(account.idCompte)}
                  >
                    <i className="ri-delete-bin-5-line ri-xl" />
                  </Link>
                </li>
              </ul>
            </React.Fragment>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
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
        SearchPlaceholder="Rechercher..."
      />
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{info.fullname}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Col lg={12} className="text-center">
            <Form.Label htmlFor="fullname" className="fs-24 fw-bold">
              {info.fullname}
            </Form.Label>
            <div className="text-muted mb-2 gap-2">
              {info.role === 0 ? (
                <span className="badge badge-soft-info text-uppercase fs-18">
                  Caissier
                </span>
              ) : (
                <span className="badge badge-soft-secondary text-uppercase fs-18">
                  Admin
                </span>
              )}
            </div>
            <div className="mb-2">
              <Form.Label htmlFor="username" className="fs-22 fw-bold">
                Nom Utilisateur :
              </Form.Label>
              <span id="username" className="fs-20">
                {" "}
                {info.username}
              </span>
            </div>
            <div className="mb-2">
              <Form.Label htmlFor="rib" className="fs-22 fw-bold">
                Code :
              </Form.Label>
              <span id="rib" className="fs-20">
                {" "}
                {info.code}
              </span>
            </div>
          </Col>
        </Offcanvas.Body>
        <div className="p-3 border-top">
          <ul className="hstack gap-5 list-unstyled mb-0">
            <li className="m-5">
              <Link
                to="/modifier-compte"
                state={info}
                type="button"
                className="w-100 edit-list link-success"
                data-bs-dismiss="offcanvas"
                data-edit-id="12"
              >
                <i className="ri-pencil-line me-1 align-bottom"></i> Modifier
              </Link>
            </li>
            <li>
              <Button
                variant="link"
                type="button"
                className="btn link-danger w-100 remove-list"
                data-bs-toggle="modal"
                data-bs-target="#delteModal"
                data-remove-id="12"
                onClick={() => AlertDelete(info.idcategory)}
              >
                <i className="ri-delete-bin-line me-1 align-bottom"></i>{" "}
                Supprimer
              </Button>
            </li>
          </ul>
        </div>
      </Offcanvas>
    </React.Fragment>
  );
};

export default ProductTable;
