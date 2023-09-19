import React, { useState, useMemo, useCallback } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import TableContainer from "Common/TableContainer";
import { Link, useNavigate } from "react-router-dom";
import {
  Facture,
  useDeleteFactureMutation,
  useFetchAllFactureQuery,
  useFetchOneFactureQuery,
  useUpdateFactureMutation,
} from "features/facture/factureSlice";
import Swal from "sweetalert2";
import dayjs, { Dayjs } from "dayjs";

const InvoiceListTable = () => {
  const { data = [] } = useFetchAllFactureQuery();
  const [deleteFacture] = useDeleteFactureMutation();

  const [isMultiDeleteButton, setIsMultiDeleteButton] =
    useState<boolean>(false);

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
  let now = dayjs();

  const [value, setValue] = React.useState<Dayjs | null>(now);
  const newDate = `${value?.year()}-${value!.month() + 1}-${value!.date()}`;

  const [newStatus, setNewStatus] = useState<number>(0);
  const [newDateP, setNewDateP] = useState<string>("");

  const [updateFacture] = useUpdateFactureMutation();

  function btnClick() {
    const linkTag = document.getElementById("link_cp");
    linkTag!.replaceWith(newDate);
    const span = document.createElement("span");
    span.className = "badge badge-soft-success";
    span.textContent = "Payé";
    const statusTag = document.getElementById("status_impaye");
    statusTag!.replaceWith(span);
  }

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

  const ConfirmerPaiement = async (id: number) => {
    swalWithBootstrapButtons
      .fire({
        title: "Confirmer Paiement",
        text: "Êtes-vous sûr de confirmer le paiement ?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Annuler",
        confirmButtonText: "Confirmer",
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          btnClick();
          updateFacture({
            idFacture: id,
            datePaiement: newDate,
            statusFacture: 2,
          });
          Swal.fire("Confirmer!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changement non enregistrer!", "", "info");
        }
      });
  };
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
          navigate("/liste-factures");
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
      {
        Header: "Numéro Facture",
        accessor: "designationFacture",
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
        disableFilters: true,
        filterable: true,
        accessor: (facture: Facture) => {
          switch (facture.statusFacture) {
            case 2:
              return <p>{facture.datePaiement}</p>;
            case 0:
              return (
                <div className="flex-shrink-0">
                  <Link
                    id="link_cp"
                    to="#"
                    onClick={() => ConfirmerPaiement(facture.idFacture)}
                    className="btn btn-sm btn-soft-info"
                  >
                    Confirmation
                  </Link>
                </div>
              );
            default:
              return (
                <div className="flex-shrink-0">
                  <Link
                    id="link_cp"
                    to="#"
                    onClick={() => ConfirmerPaiement(facture.idFacture)}
                    className="btn btn-sm btn-soft-info"
                  >
                    C.P
                  </Link>
                </div>
              );
          }
        },
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
                <span id="status_impaye" className="badge badge-soft-danger">
                  {"Impayé"}
                </span>
              );
            case 1:
              return (
                <span className="badge badge-soft-danger">{"Impayé"}</span>
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
                  <i className="ri-eye-line ri-lg" />
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => AlertDelete(facture.idFacture)}
                  data-bs-toggle="modal"
                  className="link-danger"
                >
                  <i className="ri-delete-bin-5-line ri-lg" />
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
          </div>
        </div>
      </Card.Body>
    </React.Fragment>
  );
};

export default InvoiceListTable;
