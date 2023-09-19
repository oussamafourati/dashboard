import React, { useMemo, useState } from "react";
import { Card, Col, Dropdown, Modal } from "react-bootstrap";

//TableContainer
import TableContainer from "../../Common/TableContainer";
import { recentOrders } from "../../Common/data";
import { Link } from "react-router-dom";
import CustomDropdownToggle from "Common/CustomDropdownToggle";
import AddNote from "./AddNote";
import { useGetAllNotesQuery } from "features/notes/notesSlice";

const Notes = () => {
  const { data: AllNotes = [] } = useGetAllNotesQuery();
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
      <Col xl={12}>
        <Card>
          <Card.Header className="align-items-center d-flex mb-n2">
            <h4 className="card-title mb-0 flex-grow-1">Notes</h4>
            <div className="flex-shrink-0">
              <Link
                to="#"
                className="btn btn-soft-info btn-sm"
                onClick={() => tog_AddNotesModals()}
              >
                <i className="bi bi-plus-square align-middle"></i>
              </Link>
            </div>
          </Card.Header>

          {/* <Card.Body> */}
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
          {/* </Card.Body> */}
        </Card>
      </Col>
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

export default Notes;
