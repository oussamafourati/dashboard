import React, { useMemo, useState } from "react";
import TableContainer from "Common/TableContainer";
import { Button, Col, Offcanvas, Row } from "react-bootstrap";
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
        Header: (
          <div className="form-check">
            {" "}
            <input
              className="form-check-input"
              type="checkbox"
              id="checkAll"
              value="option"
            />{" "}
          </div>
        ),
        Cell: (cellProps: any) => {
          return (
            <div className="form-check">
              {" "}
              <input
                className="form-check-input"
                type="checkbox"
                name="chk_child"
                defaultValue="option1"
              />{" "}
            </div>
          );
        },
        id: "#",
      },
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
          <Offcanvas.Title>#{info.idCompte}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="text-center mt-3">
            <h5 className="overview-title">{info.fullname}</h5>
            <h5 className="overview-title">{info.username}</h5>
            <h5 className="overview-title">{info.code}</h5>
            {/* <p className="text-muted">
              by{" "}
              <Link to="#" className="text-reset">
                Admin
              </Link>
            </p> */}
          </div>

          {/* <h6 className="fs-14">Description</h6>
          <p className="text-muted overview-desc">{info.description}</p> */}
        </Offcanvas.Body>
        <div className="p-3 border-top">
          <Row>
            <Col lg={3}></Col>
            <Col lg={5} sm={6}>
              <div data-bs-dismiss="offcanvas">
                <Button
                  variant="danger"
                  type="button"
                  className="btn btn-danger w-100 remove-list"
                  data-bs-toggle="modal"
                  data-bs-target="#delteModal"
                  data-remove-id="12"
                  onClick={() => AlertDelete(info.idcategory)}
                >
                  <i className="ri-delete-bin-line me-1 align-bottom"></i>{" "}
                  Supprimer
                </Button>
              </div>
            </Col>
            <Col lg={3}></Col>
            {/* <Col sm={6}>
              <Button
                variant="secondary"
                type="button"
                className="w-100 edit-list"
                data-bs-dismiss="offcanvas"
                data-edit-id="12"
              >
                <i className="ri-pencil-line me-1 align-bottom"></i> Modifier
              </Button>
            </Col> */}
          </Row>
        </div>
      </Offcanvas>
    </React.Fragment>
  );
};

export default ProductTable;
