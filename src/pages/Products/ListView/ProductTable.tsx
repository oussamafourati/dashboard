import React, { useMemo, useState } from "react";
import TableContainer from "Common/TableContainer";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  useDeleteProduitMutation,
  useFetchProduitsQuery,
  Produit,
} from "features/produit/productSlice";
import Swal from "sweetalert2";
import { ArrivageProduit } from "features/arrivageProduit/arrivageProduitSlice";

const ProductTable = () => {
  const { data = [] } = useFetchProduitsQuery();
  const [arrProd, setArrProd] = useState<ArrivageProduit>();

  const [deleteProduit] = useDeleteProduitMutation();

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
          deleteProduit(id);
          swalWithBootstrapButtons.fire(
            "Supprimé !",
            "Le Produit a été supprimé.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Le Produit est en sécurité :)",
            "error"
          );
        }
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Nom Produit",
        Filter: true,
        accessor: (produit: Produit) => {
          return (
            <>
              <div className="d-flex align-items-center gap-2">
                <div className="flex-shrink-0">
                  <img
                    src={`data:image/jpeg;base64, ${produit.imageProduit}`}
                    alt=""
                    className="avatar-xs rounded-circle user-profile-img"
                  />
                </div>
                <div className="flex-grow-1 ms-2 user_name">
                  {produit.nomProduit}
                </div>
              </div>
            </>
          );
        },
      },
      {
        Header: "Seuil",
        accessor: "seuil",
        Filter: true,
      },
      {
        Header: "Marque",
        accessor: "marque",
        Filter: true,
      },
      {
        Header: "Description",
        accessor: "remarqueProduit",
        Filter: true,
      },
      {
        Header: "Category",
        accessor: "nom",
        Filter: true,
      },
      {
        Header: "Sous-Category",
        accessor: "title",
        Filter: true,
      },
      {
        Header: "Action",
        Filter: false,
        accessor: (produit: Produit) => {
          return (
            <React.Fragment>
              <Link
                className="link-success"
                to="/product-overview"
                state={produit}
              >
                <i className="ri-eye-line ri-xl" />
              </Link>
              <Link
                to="#"
                className="link-danger"
                onClick={() => AlertDelete(produit.idproduit)}
              >
                <i className="ri-delete-bin-5-line ri-xl" />
              </Link>
            </React.Fragment>
          );
        },
      },
    ],
    []
  );
  return (
    <React.Fragment>
      <Row>
        <Col xxl={12}>
          <Row className="align-items-center">
            <Col xxl={3} md={5}></Col>
            <Col className="col-md-auto ms-auto">
              <Link
                to="/product-create"
                className="btn btn-success"
                id="addproduct-btn"
              >
                {" "}
                <i className="ri-add-line align-bottom me-1"></i> Ajouter
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <div>
        <TableContainer
          columns={columns}
          data={data || []}
          isGlobalFilter={true}
          isAddUserList={false}
          customPageSize={10}
          // divClassName="table-responsive mb-1"
          tableClassName="gridjs-table"
          theadClassName="gridjs-thead"
          isProductsFilter={true}
          SearchPlaceholder="Rechercher..."
        />
      </div>
    </React.Fragment>
  );
};

export default ProductTable;
