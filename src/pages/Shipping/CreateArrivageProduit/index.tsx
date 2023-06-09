import React, { useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  useDeleteArrivageProduitMutation,
  useGetAllArrivagesProduitQuery,
} from "features/arrivageProduit/arrivageProduitSlice";
import { useFetchProduitsQuery } from "features/produit/productSlice";
import Swal from "sweetalert2";

const TableCreatedProduit = () => {
  document.title = "Arrivage | Radhouani";
  const { data: allProduit = [] } = useFetchProduitsQuery();
  const { data: allArrivageProduit = [] } = useGetAllArrivagesProduitQuery();
  const [deleteArrivageProduit] = useDeleteArrivageProduitMutation();

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
          deleteArrivageProduit(id);
          swalWithBootstrapButtons.fire(
            "Supprimé !",
            "Le Produit a été supprimé.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Le Produit est en sécurité :)",
            "error"
          );
        }
      });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            {/* <Col xxl={12}> */}
            <Card id="shipmentsList">
              <Card.Body>
                <div className="table-responsive">
                  <Table className="table-striped table-borderless align-middle table-nowrap mb-0">
                    {/* <Table className="table-striped table-nowrap align-middle mb-0"> */}
                    <thead>
                      <tr>
                        <th scope="col">ID Produit</th>
                        <th scope="col">Désignation</th>
                        {/* <th scope="col">prix Achat Ht</th> */}
                        <th scope="col">prix Achat Ttc</th>
                        <th scope="col">prix Vente</th>
                        <th scope="col">Benifice</th>
                        <th scope="col">Benifice en %</th>
                        <th scope="col">Remise</th>
                        <th scope="col">Remise en %</th>
                        <th scope="col">Quantité</th>
                        <th scope="col">Prix Total du Produit</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {allArrivageProduit.map((produit) => (
                        <tr key={produit.idArrivageProduit}>
                          <td className="fw-medium">
                            {produit.idArrivageProduit}
                          </td>
                          <td>{produit.nomProduit}</td>
                          {/* <td>{produit.prixAchatHt}</td> */}
                          <td>{produit.prixAchatTtc}</td>
                          <td>{produit.prixVente}</td>
                          <td>{produit.Benifice}</td>
                          <td>{produit.PourcentageBenifice} %</td>
                          <td>{produit.remise}</td>
                          <td>{produit.PourcentageRemise} %</td>
                          <td>{produit.quantite}</td>
                          <td>{produit.quantite * produit.prixAchatTtc}</td>
                          <td>
                            <div className="hstack gap-3 fs-15">
                              <Link
                                to="#"
                                className="link-danger"
                                onClick={() =>
                                  AlertDelete(produit.idArrivageProduit)
                                }
                              >
                                <i className="ri-delete-bin-5-line"></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={9}>
                          <strong>Total</strong>
                        </td>
                        <td>
                          {allArrivageProduit.reduce(
                            (sum, i) => (sum += i.quantite * i.prixAchatTtc),
                            0
                          )}
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
              </Card.Body>
            </Card>
            {/* </Col> */}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TableCreatedProduit;
