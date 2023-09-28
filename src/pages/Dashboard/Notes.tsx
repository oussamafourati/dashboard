import React, { useMemo, useState } from "react";
import { Button, Card, Dropdown, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

//TableContainer
import TableContainer from "../../Common/TableContainer";
import { Link } from "react-router-dom";
import AddNote from "./AddNote";
import {
  Notes,
  useGetAllNotesQuery,
  useRemoveNoteMutation,
} from "features/notes/notesSlice";

const Note = () => {
  const { data: AllNotes = [] } = useGetAllNotesQuery();

  const [deleteNote] = useRemoveNoteMutation();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const AlertDelete = async (id: any) => {
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
          deleteNote(id);
          swalWithBootstrapButtons.fire(
            "Supprimé !",
            "La note a été supprimée.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Note est en sécuritée :)",
            "error"
          );
        }
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Titre",
        accessor: "nomNote",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Description",
        disableFilters: true,
        filterable: true,
        accessor: "description",
      },
      {
        Header: "Date",
        accessor: "created_at",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (notes: Notes) => {
          return (
            <div className="d-flex gap-2">
              <div className="remove">
                <Button
                  variant="ghost-danger"
                  size="sm"
                  className="btn-ghost-danger btn-icon remove-item-btn"
                  onClick={() => AlertDelete(notes.idNote)}
                >
                  <i className="ph-trash"></i>
                </Button>
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  const [modal_AddNotesModals, setmodal_AddNotesModals] =
    useState<boolean>(false);
  function tog_AddNotesModals() {
    setmodal_AddNotesModals(!modal_AddNotesModals);
  }
  return (
    <React.Fragment>
      <div className="col-xxl-5 col-lg-6">
        <Card className="card-height-100">
          <Card.Header className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Notes</h4>
            <div className="hstack gap-2 list-unstyled mb-0">
              <div className="flex-shrink-0">
                <Link
                  to="#"
                  className="btn btn-soft-info btn-sm"
                  onClick={() => tog_AddNotesModals()}
                >
                  <i className="bi bi-plus-square align-middle"></i>
                </Link>
              </div>
              <Dropdown className="text-center">
                <Dropdown.Toggle
                  href="#!"
                  className="btn btn-soft-secondary btn-sm btn-icon dropdown arrow-none"
                >
                  <i className="mdi mdi-dots-horizontal" />
                </Dropdown.Toggle>
                <Dropdown.Menu as="ul" className="dropdown-menu-end">
                  <li>
                    <Dropdown.Item href="/orders-overview">
                      <i className="ri-eye-fill align-bottom me-2 text-muted" />{" "}
                      View
                    </Dropdown.Item>
                  </li>
                  <li>
                    <Dropdown.Item href="#" className="remove-list">
                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted" />
                      Delete
                    </Dropdown.Item>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Card.Header>
          <TableContainer
            columns={columns || []}
            data={AllNotes || []}
            isGlobalFilter={false}
            iscustomPageSize={false}
            isBordered={false}
            customPageSize={6}
            className="custom-header-css"
            tableClass="table-centered align-middle table-nowrap mb-0"
            theadClass="text-muted table-light"
            SearchPlaceholder="Search Products..."
          />
        </Card>
      </div>
      <Modal
        id="showModal"
        className="fade zoomIn"
        size="lg"
        show={modal_AddNotesModals}
        onHide={() => {
          tog_AddNotesModals();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Ajouter Note
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <AddNote />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Note;
