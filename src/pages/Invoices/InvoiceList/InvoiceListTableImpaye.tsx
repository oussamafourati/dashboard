import React, { useState, useMemo, useCallback } from "react";
import { Card } from "react-bootstrap";
import TableContainer from "Common/TableContainer";
import { Link, useNavigate } from "react-router-dom";
import {
  Facture,
  useDeleteFactureMutation,
  useFetchAllFactureQuery,
  useFetchFactureImpayeQuery,
  useFetchFacturesProQuery,
} from "features/facture/factureSlice";
import Swal from "sweetalert2";

const InvoiceListTableImpaye = () => {
  const { data = [] } = useFetchAllFactureQuery();
  const impayefacture = data.filter((facture) => facture.statusFacture === 0);
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
                  to="/details-factures"
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
      <Card.Body>
        <div>
          <TableContainer
            columns={columns || []}
            data={impayefacture || []}
            isGlobalFilter={true}
            iscustomPageSize={false}
            isBordered={false}
            customPageSize={10}
            className="custom-header-css table align-middle table-nowrap"
            tableClassName="table-centered align-middle table-nowrap mb-0"
            theadClassName="text-muted table-light"
            SearchPlaceholder="Recherche..."
          />
        </div>
      </Card.Body>
    </React.Fragment>
  );
};

export default InvoiceListTableImpaye;
