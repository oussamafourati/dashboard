import React, { useState, useMemo, useCallback } from "react";
import { Button, Card, Col } from "react-bootstrap";
import TableContainer from "Common/TableContainer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Devis,
  useDeleteDevisMutation,
  useGetDevisQuery,
} from "features/devis/devisSlice";
import CountUp from "react-countup";

const InvoiceListTable = () => {
  const { data: AllDevis = [] } = useGetDevisQuery();
  const [deleteDevis] = useDeleteDevisMutation();
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
          deleteDevis(id);
          swalWithBootstrapButtons.fire(
            "Supprimé !",
            "Le Devis a été supprimé.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Le Devis est en sécurité :)",
            "error"
          );
        }
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Numéro",
        accessor: (devis: Devis) => {
          return (
            <Link to="/details-devis" className="fw-medium" state={devis}>
              {devis.designationDevis}
            </Link>
          );
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Client",
        disableFilters: true,
        filterable: true,
        accessor: "nomclient",
      },
      {
        Header: "Date",
        accessor: "dateDevis",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Montant",
        accessor: (devis: Devis) => {
          return (
            <CountUp
              end={parseInt(devis.montantDevis!)}
              separator=","
              duration={0}
            />
          );
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (devis: Devis) => {
          return (
            <ul className="hstack gap-2 list-unstyled mb-0">
              {/* <li>
                <Link to="#" className="link-primary" data-bs-toggle="modal">
                  <i className="ri-eye-line ri-xl" />
                </Link>
              </li> */}
              <li>
                <Link
                  to="#"
                  onClick={() => AlertDelete(devis.idDevis)}
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
      <Col lg={12}>
        <Card id="invoiceList">
          <Card.Header className="border-0">
            <div className="d-flex justify-content-end">
              <div className="flex-shrink-0">
                <div className="d-flex gap-2 flex-wrap">
                  {isMultiDeleteButton && (
                    <Button variant="danger" className="btn-icon">
                      <i className="ri-delete-bin-2-line"></i>
                    </Button>
                  )}
                  <Link
                    to="/nouveau-devis"
                    className="btn btn-primary"
                    onClick={tog_AddUserModals}
                  >
                    <i className="ri-add-line align-bottom me-1"></i> Créer
                  </Link>
                </div>
              </div>
            </div>
          </Card.Header>
          <Card.Body className="m-2">
            <div>
              <div className="table-responsive table-card">
                <TableContainer
                  columns={columns || []}
                  data={AllDevis || []}
                  isGlobalFilter={true}
                  iscustomPageSize={false}
                  isBordered={false}
                  customPageSize={10}
                  className="custom-header-css table align-middle table-nowrap"
                  tableClassName="table-centered align-middle table-nowrap mb-0"
                  theadClassName="text-muted table-light"
                  SearchPlaceholder="Rechercher..."
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default InvoiceListTable;
