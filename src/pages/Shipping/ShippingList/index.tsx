import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";

import {
  useGetAllArrivagesQuery,
  useAddArrivageMutation,
  useDeleteArrivageMutation,
} from "features/arrivage/arrivageSlice";
import { useFetchFournisseurQuery } from "../../../features/fournisseur/fournisseurSlice";
import Swal from "sweetalert2";
import { useFetchProduitsQuery } from "features/produit/productSlice";
import {
  ArrivageProduit,
  useGetAllArrivagesProduitQuery,
} from "features/arrivageProduit/arrivageProduitSlice";

const AddArrivageProduit = () => {
  document.title = "Arrivage | Radhouani";

  const [arrProduit, setArrProduit] = useState<ArrivageProduit[]>([]);
  const [selected, setSelected] = useState<ArrivageProduit[]>([]);
  const [arrProduitID, setArrProduitID] = useState("");

  useEffect(() => {
    const getArrivageProduit = async () => {
      const reqdata = await fetch(
        "http://localhost:8000/product/getAllProducts"
      );
      const resdata = await reqdata.json();
      console.log(resdata);
      setArrProduit(resdata);
    };
    getArrivageProduit();
  }, []);

  const handleArrivageProduit = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const arrivageProduitId = e.target.value;
    if (arrivageProduitId !== "") {
      const reqstatedata = await fetch(
        `http://localhost:8000/product/getOneProduct/${arrivageProduitId}`
      );
      const resstatedata = await reqstatedata.json();
      setSelected(await resstatedata);
      console.log(reqstatedata);
      setArrProduitID(arrivageProduitId);
    } else {
      setSelected([]);
    }
    console.log(arrivageProduitId);
  };

  const [isShown, setIsShown] = useState<boolean>(false);

  function tog_AddProductsComponent() {
    // 👇️ toggle shown state
    setIsShown((current) => !current);
  }

  const notify = () => {
    Swal.fire({
      icon: "success",
      title: "Ajouté",
      text: "L'arrivage a été créer avec succès",
    });
  };

  const { data = [] } = useGetAllArrivagesQuery();
  const { data: allfournisseur = [] } = useFetchFournisseurQuery();
  const { data: allProduit = [] } = useFetchProduitsQuery();
  const { data: allArrivageProduit = [] } = useGetAllArrivagesProduitQuery();
  const [deleteArrivage] = useDeleteArrivageMutation();
  const [addArrivage] = useAddArrivageMutation();

  const [formData, setFormData] = useState({
    idArrivage: 0,
    designation: "",
    montantTotal: 0,
    dateArrivage: "",
    raison_sociale: "",
    fournisseurID: 17,
  });

  const {
    idArrivage,
    designation,
    montantTotal,
    dateArrivage,
    raison_sociale,
    fournisseurID,
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addArrivage(formData).then(() => setFormData(formData));
    notify();
  };

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
              <Form className="tablelist-form" onSubmit={onSubmit}>
                <input type="hidden" id="id-field" />
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="designation">Designation</Form.Label>
                      <Form.Control
                        type="text"
                        id="designation"
                        onChange={onChange}
                        placeholder="designation"
                        value={formData.designation}
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
                        placeholder="taper le total"
                        onChange={onChange}
                        value={formData.montantTotal}
                        required
                      />
                    </div>
                  </Col>

                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="dateArrivage">
                        Date d'arrivage
                      </Form.Label>

                      <Form.Control
                        type="text"
                        id="dateArrivage"
                        placeholder="Selectionner date"
                        onChange={onChange}
                        value={formData.dateArrivage}
                        required
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
                        required
                      >
                        <option value="">Raison Sociale</option>
                        {allfournisseur.map((fournisseur) => (
                          <option
                            key={formData.fournisseurID}
                            value={formData.fournisseurID}
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
                        variant="warning"
                        id="add-btn"
                        onClick={() => tog_AddProductsComponent()}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <label htmlFor="statusSelect" className="form-label">
                        Produit
                      </label>
                      <select
                        className="form-select"
                        name="choices-single-default"
                        id="statusSelect"
                        onChange={handleArrivageProduit}
                      >
                        <option value="">Nom Produit</option>
                        {allProduit.map((produit) => (
                          <option
                            key={produit.idproduit}
                            value={produit.idproduit}
                          >
                            {produit.nomProduit}
                          </option>
                        ))}
                      </select>
                      {selected.map((s) => {
                        return (
                          <Col lg={7}>
                            <div className="mb-3">
                              <Form.Label htmlFor="dateArrivage">
                                <strong>Prix: </strong>
                              </Form.Label>
                              <span> {s.prixAchatTtc}</span>
                            </div>
                            <div className="mb-3">
                              <Form.Label htmlFor="dateArrivage">
                                Quantité
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="dateArrivage"
                                defaultValue={"5"}
                                //   onChange={onChange}
                                value={"5"}
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <Form.Label htmlFor="dateArrivage">
                                <strong>Prix Total: </strong>
                              </Form.Label>
                              <span> {s.prixAchatTtc * 5}</span>
                            </div>
                          </Col>
                        );
                      })}
                    </div>
                  </Col>

                  {isShown && (
                    <Col lg={4}>
                      <div className="mb-3">
                        <label htmlFor="statusSelect" className="form-label">
                          Produit
                        </label>
                        <select
                          className="form-select"
                          name="choices-single-default"
                          id="statusSelect"
                          onChange={handleArrivageProduit}
                        >
                          <option value="">Nom Produit</option>
                          {allProduit.map((produit) => (
                            <option
                              key={produit.idproduit}
                              value={produit.idproduit}
                            >
                              {produit.nomProduit}
                            </option>
                          ))}
                        </select>
                        {selected.map((s) => {
                          return (
                            <Col lg={7}>
                              <div className="mb-3">
                                <Form.Label htmlFor="dateArrivage">
                                  <strong>Prix: </strong>
                                </Form.Label>
                                <span> {s.prixAchatTtc}</span>
                              </div>
                              <div className="mb-3">
                                <Form.Label htmlFor="dateArrivage">
                                  Quantité
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  id="dateArrivage"
                                  defaultValue={"5"}
                                  //   onChange={onChange}
                                  value={"5"}
                                  required
                                />
                              </div>
                              <div className="mb-3">
                                <Form.Label htmlFor="dateArrivage">
                                  <strong>Prix Total: </strong>
                                </Form.Label>
                                <span> {s.prixAchatTtc * 5}</span>
                              </div>
                            </Col>
                          );
                        })}
                      </div>
                    </Col>
                  )}
                  <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                      <Button variant="success" id="add-btn" type="submit">
                        Ajouter
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddArrivageProduit;
