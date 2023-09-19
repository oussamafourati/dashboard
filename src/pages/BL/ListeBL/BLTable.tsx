import React, { useMemo } from "react";
import { Card, Col, Row } from "react-bootstrap";
import TableContainer from "Common/TableContainer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Charges,
  useGetAllChargesQuery,
  useAddChargeMutation,
  useDeleteChargesMutation,
} from "features/charge/chargeSlice";
import { BondeLivraison, useFetchAllBLQuery } from "features/bl/bondeLSlice";

const BLTable = () => {
  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Le bon de livraison a été créer avec succès",
      showConfirmButton: false,
      timer: 2500,
    });
  };
  const { data: AllBLs = [] } = useFetchAllBLQuery();
  const [createCharge] = useAddChargeMutation();
  const [deleteCharge] = useDeleteChargesMutation();

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
          deleteCharge(id);
          swalWithBootstrapButtons.fire(
            "Supprimé !",
            "Le bon de livraison a été supprimé.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Le bon de livraison est en sécurité :)",
            "error"
          );
        }
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Designation Bon de Livraison",
        accessor: "designationBL",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Raison Sociale",
        accessor: "raison_sociale",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Montant",
        accessor: "montant",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Date Bon de Livraison",
        disableFilters: true,
        filterable: true,
        accessor: "dateBL",
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (bl: BondeLivraison) => {
          return (
            <ul className="hstack gap-2 list-unstyled mb-0">
              <li>
                <Link
                  to="/details-bl"
                  className="link-primary"
                  data-bs-toggle="modal"
                  state={bl}
                >
                  <i className="ri-eye-line ri-xl" />
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => AlertDelete(bl.idbl)}
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

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card id="invoiceList">
            <Card.Body className="bg-soft-light border-end-0">
              <div className="flex-shrink-0">
                <div className="d-flex gap-2 flex-row-reverse">
                  <Link to="/nouveau-bl" className="btn btn-primary">
                    <i className="ri-add-line align-bottom me-1"></i> Ajouter
                  </Link>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div>
                <div className="table-responsive table-card">
                  <TableContainer
                    columns={columns || []}
                    data={AllBLs || []}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={10}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Rechercher Bon de livraison..."
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BLTable;
