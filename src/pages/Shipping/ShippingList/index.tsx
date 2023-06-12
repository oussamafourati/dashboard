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
import TableCreatedProduit from "../CreateArrivageProduit";
import { useFetchCategoriesQuery } from "features/category/categorySlice";
import { useNavigate } from "react-router-dom";

const AddArrivageProduit = () => {
  document.title = "Arrivage | Radhouani";

  const { data: allCategory = [] } = useFetchCategoriesQuery();
  const { data: allArrivageProduit = [] } = useGetAllArrivagesProduitQuery();
  const navigate = useNavigate();

  const [createProduit] = useAddProduitMutation();
  const [createArrivage] = useAddArrivageMutation();
  const arrivageValue = {
    idArrivage: 1,
    designation: "",
    montantTotal: 0,
    dateArrivage: "",
    raison_sociale: "",
    fournisseurID: 17,
  };

  const [arrivageData, setArrivageData] = useState(arrivageValue);
  const {
    idArrivage,
    designation,
    montantTotal,
    dateArrivage,
    raison_sociale,
  } = arrivageData;
  const mnt = allArrivageProduit.reduce(
    (sum, i) => (sum += i.quantite * i.prixAchatTtc),
    0
  );
  console.log(mnt);
  const onChangeArrivage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrivageData((prevState) => ({
      ...prevState,
      montantTotal: mnt,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitArrivage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createArrivage(arrivageData).then(() => setArrivageData(arrivageData));
    notify();
    navigate("/shipments");
  };

  const produitValue = {
    idproduit: 1,
    nomProduit: "",
    imageProduit: "",
    marque: "",
    remarqueProduit: "",
    fournisseurID: 17,
    categoryID: 18,
  };

  const [produitData, setProduitData] = useState(produitValue);
  const {
    nomProduit,
    imageProduit,
    marque,
    remarqueProduit,
    fournisseurID,
    categoryID,
  } = produitData;

  const onChangeProduit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduitData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitProduit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduit(produitData).then(() => setProduitData(produitData));
    notifyProduit();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (document.getElementById("imageProduit") as HTMLFormElement)
      .files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setProduitData({
      ...produitData,
      imageProduit: base64 as string,
    });
  };

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        const base64Data = base64String.split(",")[1]; // Extract only the Base64 data

        resolve(base64Data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      fileReader.readAsDataURL(file);
    });
  }

  const notifyProduit = () => {
    Swal.fire({
      icon: "success",
      title: "Ajouté",
      text: "Le Produit a été créer avec succès",
    });
  };

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
    MontantTotalProduit: 1,
    MontantTotal: 1,
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
    prixAchatHt,
    prixAchatTtc,
    prixVente,
    remise,
    PourcentageBenifice,
    Benifice,
    PrixRemise,
    PourcentageRemise,
    MontantTotalProduit,
    MontantTotal,
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

  const [modal_AddProduitModals, setmodal_AddProduitModals] =
    useState<boolean>(false);
  function tog_AddProduitModals() {
    setmodal_AddProduitModals(!modal_AddProduitModals);
  }

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
                        // onChange={onChangeArrivage}
                        readOnly={true}
                        value={mnt}
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
                      >
                        Ajouter
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
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
                <Col lg={1}>
                  <div className="hstack gap-2 justify-content-end">
                    <Button
                      variant="warning"
                      id="add-btn"
                      onClick={() => tog_AddProduitModals()}
                    >
                      +
                    </Button>
                  </div>
                </Col>
                <form
                  onSubmit={onSubmitArrivageProduct}
                  id="formArrivageProduit"
                >
                  {selected.map((s) => {
                    return (
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
                      </Col>
                    );
                  })}{" "}
                  <Card.Body>
                    <Col lg={12}>
                      <div className="hstack gap-2 justify-content-end">
                        <Button
                          variant="success"
                          id="add-btn"
                          type="submit"
                          form="formArrivageProduit"
                        >
                          Ajouter Produit
                        </Button>
                      </div>
                    </Col>
                  </Card.Body>{" "}
                  <TableCreatedProduit />
                </form>
              </Row>
            </Card.Body>
          </Card>
        </Container>
        <Modal
          id="showModal"
          className="fade zoomIn"
          size="lg"
          show={modal_AddProduitModals}
          onHide={() => {
            tog_AddProduitModals();
          }}
          centered
        >
          <Modal.Header className="px-4 pt-4" closeButton>
            <h5 className="modal-title fs-18" id="exampleModalLabel">
              Ajouter Nouveau Produit
            </h5>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Form
              className="tablelist-form"
              onSubmit={onSubmitProduit}
              id="formProduit"
            >
              <Row>
                <div
                  id="alert-error-msg"
                  className="d-none alert alert-danger py-2"
                ></div>
                <input type="hidden" id="id-field" />
                <Col lg={12}>
                  <div className="mb-3">
                    <Form.Label htmlFor="nomProduit">Désignation</Form.Label>
                    <Form.Control
                      type="text"
                      value={produitData.nomProduit}
                      onChange={onChangeProduit}
                      id="nomProduit"
                      placeholder="Taper Nom du produit"
                      required
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="marque">Marque</Form.Label>
                    <Form.Control
                      type="text"
                      value={produitData.marque}
                      onChange={onChangeProduit}
                      id="marque"
                      placeholder="Taper marque"
                      required
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="remarqueProduit">Remarque</Form.Label>
                    <Form.Control
                      type="text"
                      value={produitData.remarqueProduit}
                      onChange={onChangeProduit}
                      id="remarqueProduit"
                      placeholder="Taper remarque Produit"
                      required
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="etat">Fournisseur</Form.Label>
                    <select
                      className="form-select"
                      data-choices
                      data-choices-search-false
                      id="choices-payment-status"
                      required
                    >
                      <option value="">Selectionner Fournisseur</option>
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
                <Col lg={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="etat">Categorie</Form.Label>
                    <select
                      className="form-select"
                      data-choices
                      data-choices-search-false
                      id="choices-payment-status"
                      required
                    >
                      <option value="">Selectionner Categorie</option>
                      {allCategory.map((category) => (
                        <option
                          key={category.idcategory}
                          value={category.idcategory}
                        >
                          {category.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="mb-3">
                    <label htmlFor="avatar" className="form-label d-block">
                      Image <span className="text-danger">*</span>
                    </label>

                    <div className="position-relative d-inline-block">
                      <div className="position-absolute top-100 start-100 translate-middle">
                        <label
                          htmlFor="imageProduit"
                          className="mb-0"
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          title="Select Client Physique Avatar"
                        >
                          <span className="avatar-xs d-inline-block">
                            <span className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                              <i className="ri-image-fill"></i>
                            </span>
                          </span>
                        </label>
                        <input
                          className="form-control d-none"
                          type="file"
                          name="imageProduit"
                          id="imageProduit"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e)}
                        />
                      </div>
                      <div className="avatar-lg">
                        <div className="avatar-title bg-light rounded-3">
                          <img
                            src={`data:image/jpeg;base64, ${produitData.imageProduit}`}
                            alt=""
                            id="category-img"
                            className="avatar-md h-auto rounded-3 object-fit-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="error-msg mt-1">
                      Please add a category images.
                    </div>
                  </div>
                </Col>

                <Col lg={12} className="modal-footer">
                  <div className="hstack gap-2 justify-content-end">
                    <Button
                      className="btn-ghost-danger"
                      onClick={() => {
                        tog_AddProduitModals();
                      }}
                    >
                      <i className="ri-close-line align-bottom me-1"></i> Fermer
                    </Button>
                    <Button
                      onClick={() => {
                        tog_AddProduitModals();
                      }}
                      type={"submit"}
                      variant="primary"
                      id="add-btn"
                      form="formProduit"
                    >
                      Ajouter
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default AddArrivageProduit;
