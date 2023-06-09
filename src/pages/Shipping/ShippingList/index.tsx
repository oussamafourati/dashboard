import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
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
import TableCreatedProduit from "../CreateArrivageProduit";

const AddArrivageProduit = () => {
  document.title = "Arrivage | Radhouani";

  const notify = () => {
    Swal.fire({
      icon: "success",
      title: "Ajouté",
      text: "L'arrivage a été créer avec succès",
    });
  };

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

  // All Fournisseur
  const { data: allfournisseur = [] } = useFetchFournisseurQuery();

  // All Products
  const { data: allProduit = [] } = useFetchProduitsQuery();

  const [createProduit] = useAddProduitMutation();
  const [createArrivageProduit] = useAddArrivageProduitMutation();
  // Product's Values and Functions
  const initialArrivageProduit = {
    idArrivageProduit: 1,
    produitID: 2,
    arrivageID: 1,
    quantite: 50,
    piecejointes: "",
    nomProduit: "",
    prixAchatHt: 1,
    prixAchatTtc: 1,
    prixVente: 1,
    remise: 1,
    PourcentageBenifice: 1,
    Benifice: 1,
    PrixRemise: 1,
    PourcentageRemise: 1,
  };

  const [arrivageProductData, setArrivageProductData] = useState(
    initialArrivageProduit
  );
  const {
    idArrivageProduit,
    produitID,
    arrivageID,
    quantite,
    piecejointes,
    nomProduit,
    prixAchatHt,
    prixAchatTtc,
    prixVente,
    remise,
    PourcentageBenifice,
    Benifice,
    PrixRemise,
    PourcentageRemise,
  } = arrivageProductData;

  const onChangeArrivageProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrivageProductData((prevState) => ({
      ...prevState,
      produitID: parseInt(arrProduitID),
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitArrivageProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createArrivageProduit(arrivageProductData).then(() =>
      setArrivageProductData(arrivageProductData)
    );
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
              {/* <Form className="tablelist-form"> */}
              <input type="hidden" id="id-field" />
              <Row>
                <Col lg={3}>
                  <div className="mb-3">
                    <Form.Label htmlFor="designation">Designation</Form.Label>
                    <Form.Control
                      type="text"
                      id="designation"
                      onChange={onChangeArrivageProduct}
                      placeholder="Designation"
                      // value={formData.designation}
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
                      onChange={onChangeArrivageProduct}
                      // value={formData.montantTotal}
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
                      onChange={onChangeArrivageProduct}
                      // value={formData.dateArrivage}
                      required
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
                      {/* {allfournisseur.map((fournisseur) => (
                          <option
                            key={formData.fournisseurID}
                            value={formData.fournisseurID}
                          >
                            {fournisseur.raison_sociale}
                          </option>
                        ))} */}
                    </select>
                  </div>
                </Col>
                <Row>
                  <Col lg={2}>
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
                    </div>
                  </Col>
                  {selected.map((s) => {
                    return (
                      <form onSubmit={onSubmitArrivageProduct}>
                        <Col lg={12}>
                          <Card.Body>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="prixAchatHt">
                                    Prix d'Achat HT
                                  </Form.Label>
                                  <div className="input-group has-validation mb-3">
                                    <Form.Control
                                      type="number"
                                      value={arrivageProductData.prixAchatHt}
                                      onChange={onChangeArrivageProduct}
                                      id="prixAchatHt"
                                      placeholder="Taper prix"
                                      aria-label="Price"
                                      aria-describedby="product-price-addon"
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a product price.
                                    </div>
                                  </div>
                                </div>
                              </Col>
                              <Col lg={2}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="tva">TVA</Form.Label>
                                  <div className="input-group has-validation mb-3">
                                    <Form.Control
                                      type="text"
                                      value={"19%"}
                                      // onChange={onChange}
                                      // defaultValue="19"
                                      id="tva"
                                      placeholder="Taper prix"
                                      aria-label="Price"
                                      aria-describedby="product-price-addon"
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a product price.
                                    </div>
                                  </div>
                                </div>
                              </Col>
                              {/* <Col lg={3}>
                                  <div className="mb-3">
                                    <Form.Label htmlFor="prixAchatTtc">
                                      Prix d'Achat TTC
                                    </Form.Label>
                                    <input
                                      type="number"
                                      id="prixAchatTtc"
                                      placeholder="Prix Achat TTC"
                                      // required
                                      onChange={onChangeArrivageProduct}
                                      value={arrivageProductData.prixAchatTtc}
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a product stocks.
                                    </div>
                                  </div>
                                </Col> */}
                              <Col lg={3}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="prixVente">
                                    Prix de Vente
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    id="prixVente"
                                    placeholder=" Taper Prix de Vente"
                                    required
                                    value={arrivageProductData.prixVente}
                                    onChange={onChangeArrivageProduct}
                                  />
                                  <div className="invalid-feedback">
                                    Please enter a product orders.
                                  </div>
                                </div>
                              </Col>
                              <Col lg={2}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="remise">
                                    Prix après Remise
                                  </Form.Label>
                                  <div className="input-group has-validation mb-3">
                                    <Form.Control
                                      type="text"
                                      value={arrivageProductData.remise}
                                      onChange={onChangeArrivageProduct}
                                      id="remise"
                                      placeholder="Taper Remise"
                                      aria-label="discount"
                                      aria-describedby="product-discount-addon"
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a product discount.
                                    </div>
                                  </div>
                                </div>
                              </Col>
                              <Col lg={2}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="quantite">
                                    Quantité
                                  </Form.Label>
                                  <div className="input-group has-validation mb-3">
                                    <Form.Control
                                      type="text"
                                      value={arrivageProductData.quantite}
                                      onChange={onChangeArrivageProduct}
                                      id="quantite"
                                      placeholder="Taper Quantite"
                                      aria-label="discount"
                                      aria-describedby="product-discount-addon"
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a product discount.
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                          <Card.Body>
                            <Row>
                              {/* <Col lg={3}>
                                  <div className="mb-3">
                                    <Form.Label htmlFor="Benifice">
                                      Benifice
                                    </Form.Label>
                                    <div className="input-group has-validation mb-3">
                                      <input
                                        type="text"
                                        value={arrivageProductData.Benifice}
                                        onChange={onChangeArrivageProduct}
                                        // readOnly={true}
                                        id="Benifice"
                                        placeholder="Taper Benifice"
                                        aria-label="discount"
                                        aria-describedby="product-discount-addon"
                                        required
                                      />
                                      <div className="invalid-feedback">
                                        Please enter a product discount.
                                      </div>
                                    </div>
                                  </div>
                                </Col> */}
                              {/* <Col lg={3}>
                                  <div className="mb-3">
                                    <Form.Label htmlFor="PourcentageBenifice">
                                      Benifice en %
                                    </Form.Label>
                                    <div className="input-group has-validation mb-3">
                                      <span
                                        className="input-group-text"
                                        id="product-discount-addon"
                                      >
                                        %
                                      </span>
                                      <Form.Control
                                        type="text"
                                        value={
                                          arrivageProductData.PourcentageBenifice
                                        }
                                        id="PourcentageBenifice"
                                        placeholder="Taper Remise"
                                        aria-label="discount"
                                        aria-describedby="product-discount-addon"
                                        readOnly={true}
                                        required
                                      />
                                      <div className="invalid-feedback">
                                        Please enter a product discount.
                                      </div>
                                    </div>
                                  </div>
                                </Col> */}

                              {/* <Col lg={3}>
                                  <div className="mb-3">
                                    <Form.Label htmlFor="PourcentageRemise">
                                      Remise Max en %
                                    </Form.Label>
                                    <div className="input-group has-validation mb-3">
                                      <span
                                        className="input-group-text"
                                        id="product-discount-addon"
                                      >
                                        %
                                      </span>
                                      <Form.Control
                                        type="text"
                                        value={
                                          arrivageProductData.PourcentageRemise
                                        }
                                        id="PourcentageRemise"
                                        placeholder="Taper Pourcentage Remise"
                                        aria-label="discount"
                                        aria-describedby="product-discount-addon"
                                        required
                                      />
                                      <div className="invalid-feedback">
                                        Please enter a product discount.
                                      </div>
                                    </div>
                                  </div>
                                </Col> */}
                            </Row>
                            <Col lg={12}>
                              <div className="hstack gap-2 justify-content-end">
                                <Button
                                  variant="success"
                                  id="add-btn"
                                  type="submit"
                                >
                                  Ajouter Produit
                                </Button>
                              </div>
                            </Col>
                          </Card.Body>
                          <TableCreatedProduit />
                        </Col>
                      </form>
                    );
                  })}
                </Row>

                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end">
                    <Button variant="success" id="add-btn" type="submit">
                      Ajouter
                    </Button>
                  </div>
                </Col>
              </Row>
              {/* </Form> */}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddArrivageProduit;
