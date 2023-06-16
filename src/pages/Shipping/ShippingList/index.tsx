import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import Swal from "sweetalert2";
import { useAddArrivageMutation } from "features/arrivage/arrivageSlice";
import { useFetchFournisseurQuery } from "../../../features/fournisseur/fournisseurSlice";
import {
  useAddProduitMutation,
  useFetchProduitsQuery,
} from "features/produit/productSlice";
import {
  ArrivageProduit,
  useAddArrivageProduitMutation,
  useGetAllArrivagesProduitQuery,
} from "features/arrivageProduit/arrivageProduitSlice";
import { useFetchCategoriesQuery } from "features/category/categorySlice";
import { useNavigate } from "react-router-dom";
import CreateArrivageProduit from "../CreateArrivageProduit";

const AddArrivageProduit = () => {
  document.title = "Arrivage | Radhouani";

  const [showTasks, setShowTasks] = useState(false);
  const showDone = () => setShowTasks(true);

  const navigate = useNavigate();

  const [createArrivage] = useAddArrivageMutation();
  const arrivageValue = {
    idArrivage: 1,
    designation: "",
    montantTotal: 0,
    dateArrivage: "",
    raison_sociale: "",
    fournisseurID: 17,
  };
  // const today = new Date();
  const [arrivageData, setArrivageData] = useState(arrivageValue);
  const {
    idArrivage,
    designation,
    montantTotal,
    dateArrivage,
    raison_sociale,
  } = arrivageData;

  const onChangeArrivage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrivageData((prevState) => ({
      ...prevState,
      dateArrivage: new Date().toLocaleDateString("en-GB"),
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitArrivage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createArrivage(arrivageData).then(() => setArrivageData(arrivageData));
    notify();
    navigate("/shipment");
  };

  const notify = () => {
    Swal.fire({
      icon: "success",
      title: "Ajouté",
      text: "L'arrivage a été créer avec succès",
    });
  };

  // All Fournisseur
  const { data: allfournisseur = [] } = useFetchFournisseurQuery();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Arrivage" pageTitle="Tableau de bord" />
          <Card>
            <Card.Header>
              <h6 className="card-title mb-0" id="addCategoryLabel">
                Créer Achats
              </h6>
            </Card.Header>
            <Card.Body>
              <form
                className="tablelist-form"
                onSubmit={onSubmitArrivage}
                id="formArrivage"
              >
                <input type="hidden" id="id-field" />
                <Row>
                  <Col lg={3}>
                    <div className="mb-3">
                      <Form.Label htmlFor="designation">Designation</Form.Label>
                      <Form.Control
                        type="text"
                        id="designation"
                        onChange={onChangeArrivage}
                        placeholder="Designation"
                        value={arrivageData.designation}
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="mb-3">
                      <Form.Label htmlFor="montantTotal">
                        Montant Total
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="montantTotal"
                        placeholder="taper le total"
                        onChange={onChangeArrivage}
                        value={arrivageData.montantTotal}
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="mb-3">
                      <Form.Label htmlFor="dateArrivage">
                        Date d'arrivage
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="dateArrivage"
                        placeholder="Selectionner date"
                        onChange={onChangeArrivage}
                        value={arrivageData.dateArrivage}
                      />
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="mb-3">
                      <label htmlFor="statusSelect" className="form-label">
                        Fournisseur
                      </label>
                      <select
                        className="form-select"
                        name="choices-single-default"
                        id="statusSelect"
                        required
                      >
                        <option value="">Raison Sociale</option>
                        {allfournisseur.map((fournisseur) => (
                          <option
                            key={fournisseur.idfournisseur}
                            value={fournisseur.idfournisseur}
                          >
                            {fournisseur.raison_sociale}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        variant="success"
                        id="add-btn"
                        type="submit"
                        form="formArrivage"
                        // onClick={() => navigate("/shipment")}
                      >
                        Ajouter
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
            </Card.Body>
          </Card>
          {showTasks ? <CreateArrivageProduit /> : null}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddArrivageProduit;
