import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import Swal from "sweetalert2";
import { useAddArrivageMutation } from "features/arrivage/arrivageSlice";
import {
  Fournisseur,
  useFetchFournisseurQuery,
} from "../../../features/fournisseur/fournisseurSlice";
import { useNavigate } from "react-router-dom";
import CreateArrivageProduit from "../CreateArrivageProduit";

const AddArrivageProduit = () => {
  document.title = "Arrivage | Radhouani";

  const [fournisseurState, setFournisseurState] = useState<Fournisseur[]>([]);
  const [selected, setSelected] = useState<Fournisseur[]>([]);
  const [fournisseurStateID, setFournisseurStateID] = useState("");

  useEffect(() => {
    const getFournisseur = async () => {
      const reqFournisseur = await fetch(
        "http://localhost:8000/fournisseur/allFournisseur"
      );
      const resFournisseur = await reqFournisseur.json();
      setFournisseurState(resFournisseur);
    };
    getFournisseur();
  }, []);

  const handleFournisseur = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fournisseurId = e.target.value;
    if (fournisseurId !== "") {
      const reqFournisseurData = await fetch(
        `http://localhost:8000/fournisseur/oneFournisseur/${fournisseurId}`
      );
      const resfournisseurdata = await reqFournisseurData.json();
      setSelected(await resfournisseurdata);
      setFournisseurStateID(fournisseurId);
    } else {
      setSelected([]);
    }
  };
  console.log("Fournisseur State: ", fournisseurState);
  console.log("Selected: ", selected);
  console.log("Fournisseur State ID: ", fournisseurStateID);

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
    fournisseurID,
  } = arrivageData;

  const onChangeArrivage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrivageData((prevState) => ({
      ...prevState,
      fournisseurID: parseInt(fournisseurStateID),
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
          <Card
            className="mx-auto"
            style={{
              width: "46rem",
              height: "23rem",
              marginTop: 65,
            }}
          >
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
                <Row style={{ marginBottom: 25 }}>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="designation">Designation</Form.Label>
                      <Form.Control
                        type="text"
                        id="designation"
                        onChange={onChangeArrivage}
                        placeholder="..."
                        value={arrivageData.designation}
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="montantTotal">
                        Montant Total
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="montantTotal"
                        placeholder="00.00"
                        onChange={onChangeArrivage}
                        value={arrivageData.montantTotal}
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginBottom: 15 }}>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="dateArrivage">
                        Date d'arrivage
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="dateArrivage"
                        placeholder="21/06/2023"
                        onChange={onChangeArrivage}
                        value={arrivageData.dateArrivage}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label htmlFor="statusSelect" className="form-label">
                        Fournisseur
                      </label>
                      <select
                        className="form-select"
                        name="choices-single-default"
                        id="statusSelect"
                        onChange={handleFournisseur}
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
                </Row>
                <Row>
                  <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        variant="success"
                        id="add-btn"
                        type="submit"
                        form="formArrivage"
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
