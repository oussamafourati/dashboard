import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Produit,
  useAddProduitMutation,
  useFetchProduitsQuery,
  useUpdateProduitMutation,
} from "features/produit/productSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useGetAllArrivagesQuery } from "features/arrivage/arrivageSlice";
import {
  useAddArrivageProduitMutation,
  useDeleteArrivageProduitMutation,
  useGetAllArrivagesProduitQuery,
} from "features/arrivageProduit/arrivageProduitSlice";

const CreateArrivageProduit = () => {
  document.title = "Arrivage | Radhouani";

  const { data: allProduit = [] } = useFetchProduitsQuery();
  const { data: allArrivage = [] } = useGetAllArrivagesQuery();

  const [createProduit] = useAddProduitMutation();
  const [CreateArrivageProduit] = useAddArrivageProduitMutation();

  const arrivageProduitValue = {
    idArrivageProduit: 1,
    produitID: 3,
    arrivageID: 1,
    quantite: 1,
    piecejointes: "",
  };

  const [arrivageProduitData, setArrivageProduitData] =
    useState(arrivageProduitValue);
  const { idArrivageProduit, produitID, arrivageID, quantite, piecejointes } =
    arrivageProduitData;

  const onChangeArrivageProduit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrivageProduitData((prevState) => ({
      ...prevState,
      produitID: parseInt(IDproduit),
      arrivageID: parseInt(IDarrivage),
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitArrivageProduit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    CreateArrivageProduit(arrivageProduitData).then(() =>
      setArrivageProduitData(arrivageProduitData)
    );
  };

  const produitValue = {
    idproduit: 1,
    nomProduit: "",
    imageProduit: "",
    marque: "",
    prixAchatHt: 1,
    prixAchatTtc: 1,
    prixVente: 1,
    Benifice: 1,
    PourcentageBenifice: 1,
    PrixRemise: 1,
    PourcentageRemise: 1,
    MontantTotalProduit: 1,
    remarqueProduit: "",
    fournisseurID: 17,
    categoryID: 18,
  };

  const [produitData, setProduitData] = useState(produitValue);
  const {
    nomProduit,
    imageProduit,
    marque,
    prixAchatHt,
    prixAchatTtc,
    prixVente,
    Benifice,
    PourcentageBenifice,
    PrixRemise,
    PourcentageRemise,
    MontantTotalProduit,
    remarqueProduit,
    fournisseurID,
    categoryID,
  } = produitData;

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (document.getElementById("imageProduit") as HTMLFormElement)
      .files[0];
    const base64 = await convertToBase64(file);
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

  const [produit, setProduit] = useState<Produit[]>([]);
  const [selected, setSelected] = useState<Produit[]>([]);
  const [IDproduit, setIDProduit] = useState("");

  useEffect(() => {
    const getProduit = async () => {
      const reqdata = await fetch(
        "http://localhost:8000/product/getAllProducts"
      );
      const resdata = await reqdata.json();
      setProduit(resdata);
    };
    getProduit();
  }, []);

  const handleProduit = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const produitId = e.target.value;
    if (produitId !== "") {
      const reqstatedata = await fetch(
        `http://localhost:8000/product/getOneProduct/${produitId}`
      );
      const resstatedata = await reqstatedata.json();
      setSelected(await resstatedata);
      setIDProduit(produitId);
    } else {
      setSelected([]);
    }
  };

  const [arrivage, setArrivage] = useState<Produit[]>([]);
  const [selectedArrivage, setSelectedArrivage] = useState<Produit[]>([]);
  const [IDarrivage, setIDArrivage] = useState("");

  useEffect(() => {
    const getArrivage = async () => {
      const reqdata = await fetch("http://localhost:8000/arrivage/allArrivage");
      const resdata = await reqdata.json();
      setArrivage(resdata);
    };
    getArrivage();
  }, []);

  const handleArrivage = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const arrivageId = e.target.value;
    if (arrivageId !== "") {
      const reqstatedata = await fetch(
        `http://localhost:8000/arrivage/oneArrivage/${arrivageId}`
      );
      const resstatedata = await reqstatedata.json();
      setSelectedArrivage(await resstatedata);
      setIDArrivage(arrivageId);
    } else {
      setSelectedArrivage([]);
    }
  };

  const [modal_AddProduitModals, setmodal_AddProduitModals] =
    useState<boolean>(false);
  function tog_AddProduitModals() {
    setmodal_AddProduitModals(!modal_AddProduitModals);
  }

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
        } else if (result.dismiss === Swal.DismissReason.cancel) {
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
            <Card id="shipmentsList">
              <Card.Body>
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
                        onChange={handleProduit}
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
                  <Col lg={1}></Col>
                  <Col lg={2}>
                    <div className="mb-3">
                      <label htmlFor="arrivageSelect" className="form-label">
                        Arrivage
                      </label>
                      <select
                        className="form-select"
                        name="choices-single-default"
                        id="arrivageSelect"
                        onChange={handleArrivage}
                      >
                        <option value="">Désignation</option>
                        {allArrivage.map((arr) => (
                          <option key={arr.idArrivage} value={arr.idArrivage}>
                            {arr.designation}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Col>

                  <form
                    onSubmit={onSubmitArrivageProduit}
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
                                      value={s.prixAchatHt}
                                      // onChange={onChangeProduit}
                                      readOnly={true}
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
                                      readOnly={true}
                                      // onChange={onChange}
                                      // defaultValue="19"
                                      id="tva"
                                      placeholder="Taper prix"
                                      aria-label="Price"
                                      aria-describedby="product-price-addon"
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
                                    value={s.prixVente}
                                    readOnly={true}
                                    // onChange={onChangeArrivageProduct}
                                  />
                                  <div className="invalid-feedback">
                                    Please enter a product orders.
                                  </div>
                                </div>
                              </Col>
                              {/* <Col lg={2}>
                                <div className="mb-3">
                                  <Form.Label htmlFor="remise">
                                    Prix après Remise
                                  </Form.Label>
                                  <div className="input-group has-validation mb-3">
                                    <Form.Control
                                      type="text"
                                      // value={arrivageProductData.remise}
                                      // onChange={onChangeArrivageProduct}
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
                              </Col> */}
                            </Row>
                          </Card.Body>
                        </Col>
                      );
                    })}{" "}
                    <Col lg={2}>
                      <div className="mb-3">
                        <Form.Label htmlFor="quantite">Quantité</Form.Label>
                        <div className="input-group has-validation mb-3">
                          <Form.Control
                            type="text"
                            value={arrivageProduitData.quantite}
                            onChange={onChangeArrivageProduit}
                            id="quantite"
                            placeholder="Taper Quantite"
                            aria-label="discount"
                            aria-describedby="product-discount-addon"
                          />
                          <div className="invalid-feedback">
                            Please enter a product discount.
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Row>
                      <Card id="shipmentsList">
                        <Card.Body>
                          <div className="table-responsive">
                            <Table className="table-striped table-borderless align-middle table-nowrap mb-0">
                              {/* <Table className="table-striped table-nowrap align-middle mb-0"> */}
                              <thead>
                                <tr>
                                  <th scope="col">ID Produit</th>
                                  <th scope="col">Nom Produit</th>
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
                                {allArrivageProduit.map((produitArr) => {
                                  if (
                                    produitArr.arrivageID ==
                                    parseInt(IDarrivage)
                                  ) {
                                    return (
                                      <tr key={produitArr.idArrivageProduit}>
                                        {" "}
                                        <td className="fw-medium">
                                          {produitArr.idArrivageProduit}
                                        </td>
                                        <td>{produitArr.nomProduit}</td>
                                        <td>{produitArr.prixAchatTtc}</td>
                                        <td>{produitArr.prixVente}</td>
                                        <td>{produitArr.Benifice}</td>
                                        <td>
                                          {produitArr.PourcentageBenifice} %
                                        </td>
                                        <td>{produitArr.PrixRemise}</td>
                                        <td>
                                          {produitArr.PourcentageRemise} %
                                        </td>
                                        <td>{produitArr.quantite}</td>
                                        <td>
                                          {produitArr.quantite} *
                                          {produitArr!.prixAchatTtc}
                                        </td>
                                        <td>
                                          <div className="hstack gap-3 fs-15">
                                            <Link
                                              to="#"
                                              className="link-danger"
                                              onClick={() =>
                                                AlertDelete(
                                                  produitArr.idArrivageProduit
                                                )
                                              }
                                            >
                                              <i className="ri-delete-bin-5-line"></i>
                                            </Link>
                                          </div>
                                        </td>{" "}
                                      </tr>
                                    );
                                  }
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>
                      {/* </Col> */}
                    </Row>
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
                  </form>
                </Row>
              </Card.Body>
            </Card>
          </Row>
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
            <Form className="tablelist-form" onSubmit={onSubmitProduit}>
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
                    <Form.Label htmlFor="prixAchatHt">Prix Achat HT</Form.Label>
                    <Form.Control
                      type="text"
                      value={produitData.prixAchatHt}
                      onChange={onChangeProduit}
                      id="prixAchatHt"
                      placeholder="Taper prixAchatHt"
                      required
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="prixVente">prixVente</Form.Label>
                    <Form.Control
                      type="text"
                      value={produitData.prixVente}
                      onChange={onChangeProduit}
                      id="prixVente"
                      placeholder="Taper prixVente"
                      required
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="PrixRemise">PrixRemise</Form.Label>
                    <Form.Control
                      type="text"
                      value={produitData.PrixRemise}
                      onChange={onChangeProduit}
                      id="PrixRemise"
                      placeholder="Taper PrixRemise"
                      required
                    />
                  </div>
                </Col>
                {/* <Col lg={6}>
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
                </Col> */}
                {/* <Col lg={6}>
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
                </Col> */}
                <Col lg={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="Fournisseur">Fournisseur</Form.Label>
                    <select
                      className="form-select"
                      data-choices
                      data-choices-search-false
                      id="Fournisseur"
                      // required
                    >
                      <option value="">Selectionner Fournisseur</option>
                      {/* {allfournisseur.map((fournisseur) => (
                        <option
                          key={fournisseur.idfournisseur}
                          value={fournisseur.idfournisseur}
                        >
                          {fournisseur.raison_sociale}
                        </option>
                      ))} */}
                    </select>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="Categorie">Categorie</Form.Label>
                    <select
                      className="form-select"
                      data-choices
                      data-choices-search-false
                      id="Categorie"
                      // required
                    >
                      <option value="">Selectionner Categorie</option>
                      {/* {allCategory.map((category) => (
                        <option
                          key={category.idcategory}
                          value={category.idcategory}
                        >
                          {category.nom}
                        </option>
                      ))} */}
                    </select>
                  </div>
                </Col>
                {/* <Col lg={12}>
                  <div className="mb-3">
                    <label
                      htmlFor="imageProduit"
                      className="form-label d-block"
                    >
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
                            id="imageProduit"
                            className="avatar-md h-auto rounded-3 object-fit-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="error-msg mt-1">
                      Please add a category images.
                    </div>
                  </div>
                </Col> */}

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
                      type="submit"
                      variant="primary"
                      id="add-btn"
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

export default CreateArrivageProduit;
