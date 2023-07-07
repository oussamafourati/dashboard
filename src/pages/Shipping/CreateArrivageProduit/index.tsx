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
import {
  Produit,
  useAddProduitMutation,
  useFetchProduitsQuery,
  useGetProductByNameQuery,
} from "features/produit/productSlice";
import Swal from "sweetalert2";
import {
  Arrivage,
  useGetAllArrivagesQuery,
} from "features/arrivage/arrivageSlice";
import {
  ArrivageProduit,
  useAddArrivageProduitMutation,
  useDeleteArrivageProduitMutation,
  useGetAllArrivagesProduitQuery,
} from "features/arrivageProduit/arrivageProduitSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Category } from "features/category/categorySlice";
import { SubCategory } from "features/subCategory/subCategorySlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const CreateArrivageProduit = () => {
  document.title = "Arrivage | Radhouani";
  const location = useLocation();

  const { data: allProduit = [] } = useFetchProduitsQuery();
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

  const [prixAchatHT, setPrixAchatHT] = useState<number>(1);
  const [prixAchatTTC, setPrixAchatTTc] = useState<number>(1);
  const [prixvente, setPrixVente] = useState<number>(1);
  const [benifice, setBenifice] = useState<number>(1);
  const [pourcentageBenifice, setPourcentageBenifice] = useState<number>(1);
  const [prixRemise, setPrixRemise] = useState<number>(1);
  const [pourcentageRemise, setPourcentageRemise] = useState<number>(1);

  const onChangePAHT = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrixAchatHT(parseInt(event.target.value));
    setPrixAchatTTc(parseInt(event.target.value) * 1.19);
  };
  const onChangePATTC = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrixAchatTTc(parseInt(event.target.value));
    setPrixAchatHT(parseInt(event.target.value) / 1.19);
  };

  const onChangePV = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrixVente(parseInt(event.target.value));
    setBenifice(parseInt(event.target.value) - prixAchatTTC);
    setPourcentageBenifice(
      ((parseInt(event.target.value) - prixAchatTTC) * 100) /
        parseInt(event.target.value)
    );
  };

  const onChangeBenifice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBenifice(parseInt(event.target.value));
    setPrixVente(parseInt(event.target.value) + prixAchatTTC);
    setPourcentageBenifice(
      (parseInt(event.target.value) * 100) /
        (parseInt(event.target.value) + prixAchatTTC)
    );
  };
  const onChangePourcentageBenifice = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPourcentageBenifice(parseInt(event.target.value));
    setBenifice(
      (prixAchatTTC * parseInt(event.target.value)) /
        (100 - parseInt(event.target.value))
    );
    setPrixVente(
      (prixAchatTTC * parseInt(event.target.value)) /
        (100 - parseInt(event.target.value)) +
        prixAchatTTC
    );
  };

  const onChangePrixRemise = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrixRemise(parseInt(event.target.value));
    setPourcentageRemise(
      ((prixvente - parseInt(event.target.value)) * 100) / prixvente
    );
  };
  const onChangePourcentagePrixRemise = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPourcentageRemise(parseInt(event.target.value));
    setPrixRemise((prixvente * (100 - parseInt(event.target.value))) / 100);
  };

  const [CreateArrivageProduit] = useAddArrivageProduitMutation();

  const [arrivageProduitData, setArrivageProduitData] = useState({
    idArrivageProduit: 1,
    produitID: 34,
    arrivageID: location.state.idArrivage,
    quantite: 1,
    prixAchatHt: 1,
    prixAchatTtc: 1,
    prixVente: 1,
    Benifice: 1,
    PourcentageBenifice: 1,
    PrixRemise: 1,
    PourcentageRemise: 1,
    MontantTotalProduit: 1,
    piecejointes: "",
    nomProduit: "",
    designation: "",
    montantTotal: 1,
    dateArrivage: "",
  });

  const [text, setText] = useState<string>("");
  const [products, setProducts] = useState<Produit[]>([]);
  const [productsName, setProductsName] = useState<Produit[]>([]);
  const [nameProducts, setNameProducts] = useState("");
  const [suggestions, setSuggestions] = useState<Produit[]>([]);
  useEffect(() => {
    const loadProduct = async () => {
      const response = await fetch(
        "http://localhost:8000/product/getAllProducts"
      );
      const resData = await response.json();
      setProducts(resData);
    };
    loadProduct();
  }, []);

  const onSuggestHandler = (text: string) => {
    setText(text);
    setSuggestions([]);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text: string = e.target.value;
    let matches: Produit[] = [];
    if (text.length > 0) {
      matches = products.filter((prd) => {
        const regex = new RegExp(`${text}`, "gi");
        return prd?.nomProduit!.match(regex);
      });
    }
    setSuggestions(matches);
    setText(text);
  };
  const { data } = useGetProductByNameQuery(text);
  const [acValue, setACValue] = useState<Produit | null>(allProduit[0]);
  const onChangeArrivageProduit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrivageProduitData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmitArrivageProduit = (e: React.FormEvent<HTMLFormElement>) => {
    arrivageProduitData["produitID"] = acValue?.idproduit!;
    arrivageProduitData["prixAchatHt"] = prixAchatHT;
    arrivageProduitData["prixAchatTtc"] = prixAchatTTC;
    arrivageProduitData["prixVente"] = prixvente;
    arrivageProduitData["Benifice"] = benifice;
    arrivageProduitData["PourcentageBenifice"] = pourcentageBenifice;
    arrivageProduitData["PrixRemise"] = prixRemise;
    arrivageProduitData["PourcentageRemise"] = pourcentageRemise;
    arrivageProduitData["MontantTotalProduit"] =
      prixAchatTTC * arrivageProduitData["quantite"];

    e.preventDefault();
    CreateArrivageProduit(arrivageProduitData).then(() =>
      setArrivageProduitData(arrivageProduitData)
    );
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

  // Produit

  const [category, setCategory] = useState<Category[]>([]);
  const [categoryid, setCategoryid] = useState("");
  const [sousCategory, setSousCategory] = useState<SubCategory[]>([]);
  const [sousCategoryid, setSousCategoryid] = useState("");
  useEffect(() => {
    const getCategory = async () => {
      const reqdata = await fetch("http://localhost:8000/category/all");
      const resdata = await reqdata.json();
      setCategory(resdata);
    };
    getCategory();
  }, []);
  const handlecategory = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    if (categoryId !== "") {
      const reqstatedata = await fetch(
        `http://localhost:8000/subCategory/onesubcategory?idcategory=${categoryId}`
      );
      const resstatedata = await reqstatedata.json();
      setSousCategory(resstatedata);
      setCategoryid(categoryId);
    } else {
      setSousCategory([]);
    }
  };
  const handlesousCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const getstateid = e.target.value;
    setSousCategoryid(getstateid);
  };

  const [createProduit] = useAddProduitMutation();

  const [produitData, setProduitData] = useState({
    idproduit: 1,
    nomProduit: "",
    imageProduit: "",
    marque: "",
    remarqueProduit: "",
    sousCategoryID: 1,
    categoryID: 1,
  });

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
  const onChangeProduit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduitData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitProduit = (e: React.FormEvent<HTMLFormElement>) => {
    produitData["categoryID"] = parseInt(categoryid);
    produitData["sousCategoryID"] = parseInt(sousCategoryid);
    e.preventDefault();
    createProduit(produitData).then(() => setProduitData(produitData));
    notifyProduit();
    setmodal_AddProduitModals(!modal_AddProduitModals);
  };

  const notifyProduit = () => {
    Swal.fire({
      icon: "success",
      title: "Ajouté",
      text: "Le Produit a été créer avec succès",
    });
  };

  return (
    <React.Fragment>
      <div className="page-content" style={{ marginTop: 20 }}>
        <Container fluid={true}>
          <div className="mx-auto">
            <Card
              id="shipmentsList"
              style={{
                width: 1150,
              }}
              className="mx-auto"
            >
              <Card.Body className="mx-auto">
                <Row>
                  <Row>
                    <Col lg={8}>
                      <label htmlFor="productdetail" className="form-label">
                        Produit
                      </label>
                      <div className="input-group mb-4">
                        <Autocomplete
                          id="country-select-demo"
                          sx={{ width: 300 }}
                          options={allProduit}
                          autoHighlight
                          onChange={(event, value) => setACValue(value)}
                          getOptionLabel={(option) => option.nomProduit}
                          renderOption={(props, option) => (
                            <Box
                              component="li"
                              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                              {...props}
                            >
                              {option.nomProduit}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Choisir Produit"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password",
                              }}
                              size="small"
                            />
                          )}
                        />

                        <div className="hstack gap-2 justify-content-end">
                          <Button
                            variant="success"
                            id="add-btn"
                            onClick={() => tog_AddProduitModals()}
                            style={{ marginLeft: 5 }}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      {/* {suggestions &&
                        suggestions.map((product) => (
                          <div>
                            <ul>
                              <li
                                key={product.idproduit}
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  onSuggestHandler(product?.nomProduit!)
                                }
                              >
                                {product.nomProduit}
                              </li>
                            </ul>
                          </div>
                        ))} */}
                    </Col>
                  </Row>
                  <form
                    onSubmit={onSubmitArrivageProduit}
                    id="formArrivageProduit"
                  >
                    <Row>
                      <Col lg={2} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="quantite">Quantité</Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="text"
                              value={arrivageProduitData.quantite}
                              onChange={onChangeArrivageProduit}
                              id="quantite"
                              placeholder="0"
                              aria-label="Price"
                              aria-describedby="product-price-addon"
                            />
                            <div className="invalid-feedback">
                              Please enter a product price.
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={1}></Col>
                      <Col lg={4} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="prixAchatHt">
                            Prix d'Achat HT
                          </Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="number"
                              value={prixAchatHT!}
                              onChange={onChangePAHT}
                              id="prixAchatHt"
                              placeholder="00.00"
                              aria-label="prixAchatHt"
                              aria-describedby="product-price-addon"
                              autoComplete="off"
                              required
                            />
                            <span
                              className="input-group-text"
                              id="product-discount-addon"
                            >
                              TVA : 19%
                            </span>
                            <div className="invalid-feedback">
                              Please enter a product price.
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={1}></Col>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="prixAchatTtc">
                            Prix Achat Ttc
                          </Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="number"
                              value={prixAchatTTC}
                              onChange={onChangePATTC}
                              id="prixAchatTtc"
                              placeholder="00.00"
                              aria-label="Price"
                              aria-describedby="product-price-addon"
                            />
                            <div className="invalid-feedback">
                              Please enter a product price.
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="prixVente">
                            Prix de Vente
                          </Form.Label>
                          <Form.Control
                            type="number"
                            id="prixVente"
                            placeholder="00.00"
                            value={prixvente}
                            min={prixAchatTTC}
                            max="9999"
                            onChange={onChangePV}
                            aria-label="discount"
                            aria-describedby="product-discount-addon"
                          />
                        </div>
                      </Col>
                      <Col lg={1}></Col>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="PourcentageBenifice">
                            Benifice %
                          </Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="number"
                              id="PourcentageBenifice"
                              placeholder="0"
                              aria-label="discount"
                              aria-describedby="product-discount-addon"
                              value={pourcentageBenifice}
                              onChange={onChangePourcentageBenifice}
                            />
                            <span
                              className="input-group-text"
                              id="product-discount-addon"
                            >
                              %
                            </span>
                            <div className="invalid-feedback">
                              Please enter a product orders.
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={1}></Col>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="Benifice">Benifice</Form.Label>
                          <Form.Control
                            type="number"
                            id="Benifice"
                            placeholder="00.00"
                            value={benifice}
                            onChange={onChangeBenifice}
                            aria-label="discount"
                            aria-describedby="product-discount-addon"
                          />
                          <div className="invalid-feedback">
                            Please enter a product orders.
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="PrixRemise">
                            Remise Plafond
                          </Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="number"
                              value={prixRemise}
                              min={prixAchatTTC}
                              max={prixvente}
                              onChange={onChangePrixRemise}
                              id="PrixRemise"
                              placeholder="00.00"
                              aria-label="discount"
                              aria-describedby="product-discount-addon"
                            />
                            <div className="invalid-feedback">
                              Please enter a product discount.
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={1}></Col>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="PourcentageRemise">
                            Remise Plafond %
                          </Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="number"
                              value={pourcentageRemise}
                              onChange={onChangePourcentagePrixRemise}
                              id="PourcentageRemise"
                              placeholder="0"
                              aria-label="discount"
                              aria-describedby="product-discount-addon"
                              required
                            />
                            <span
                              className="input-group-text"
                              id="product-discount-addon"
                            >
                              %
                            </span>
                            <div className="invalid-feedback">
                              Please enter a product discount.
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={2}></Col>
                      <Col lg={3} style={{ marginTop: 25 }}>
                        <div className="hstack gap-2">
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
                    </Row>
                    <Row>
                      <Card
                        id="shipmentsList"
                        className="mx-auto"
                        // style={{ height: "5.5rem", width: "58.4rem" }}
                      >
                        <Card.Body>
                          <div className="table-responsive">
                            <Table className="table-striped table-borderless align-middle table-nowrap">
                              {/* <Table className="table-striped table-nowrap align-middle mb-0"> */}
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Nom Produit</th>
                                  <th scope="col">prix Achat Ttc</th>
                                  <th scope="col">prix Vente</th>
                                  <th scope="col">Benifice</th>
                                  <th scope="col">Benifice en %</th>
                                  <th scope="col">Remise</th>
                                  <th scope="col">Remise en %</th>
                                  <th scope="col">Quantité</th>
                                  <th scope="col">Prix Total</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {allArrivageProduit.map((produitArr) => {
                                  if (
                                    produitArr.arrivageID ===
                                    location.state.idArrivage
                                  ) {
                                    return (
                                      <tr key={produitArr.idArrivageProduit}>
                                        <td className="fw-medium">
                                          {produitArr.idArrivageProduit}
                                        </td>
                                        <td>{produitArr?.nomProduit!}</td>
                                        <td>{produitArr?.prixAchatTtc!}</td>
                                        <td>{produitArr?.prixVente!}</td>
                                        <td>{produitArr?.Benifice!}</td>
                                        <td>
                                          {produitArr?.PourcentageBenifice!} %
                                        </td>
                                        <td>{produitArr?.PrixRemise!}</td>
                                        <td>
                                          {produitArr.PourcentageRemise!}%
                                        </td>
                                        <td>{produitArr?.quantite!}</td>
                                        <td>
                                          {produitArr.MontantTotalProduit}
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
                                        </td>
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
                  </form>
                </Row>
              </Card.Body>
            </Card>
          </div>
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
            <form
              id="createproduct-form"
              autoComplete="off"
              className="needs-validation"
              noValidate
              onSubmit={onSubmitProduit}
            >
              <Row>
                <Col lg={8}>
                  <Card>
                    <Card.Body>
                      <div className="mb-3">
                        <Form.Label htmlFor="nomProduit">
                          Titre du produit
                        </Form.Label>
                        <Form.Control
                          type="text"
                          id="nomProduit"
                          placeholder="..."
                          required
                          onChange={onChangeProduit}
                          value={produitData.nomProduit}
                        />

                        <div className="invalid-feedback">
                          Veuillez saisir le titre du produit.
                        </div>
                      </div>
                      <Row>
                        <Col lg={6} style={{ marginBottom: 15 }}>
                          <div className="mb-3">
                            <Form.Label htmlFor="marque">Marque</Form.Label>
                            <Form.Control
                              type="text"
                              id="marque"
                              placeholder="..."
                              value={produitData.marque}
                              onChange={onChangeProduit}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-4">
                            <Form.Label htmlFor="remarqueProduit">
                              Description
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="remarqueProduit"
                              placeholder="..."
                              value={produitData.remarqueProduit}
                              onChange={onChangeProduit}
                              as="textarea"
                              rows={3}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          {/* ******* Select Category ******* */}
                          <div>
                            <div className="d-flex align-items-start">
                              <div className="flex-grow-1">
                                <Form.Label>Catégorie</Form.Label>
                              </div>
                            </div>
                            <div className="input-group mb-3">
                              <select
                                className="form-select"
                                id="choices-category-input"
                                name="choices-category-input"
                                onChange={handlecategory}
                              >
                                <option value="">Choisir ...</option>
                                {category.map((category) => (
                                  <option
                                    key={category.idcategory}
                                    value={category.idcategory}
                                  >
                                    {category.nom}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="error-msg mt-1">
                              svp selectionner la categorie.
                            </div>
                          </div>
                        </Col>
                        <Col>
                          {/* ******* Select SubCategory ******* */}
                          <div>
                            <div className="d-flex align-items-start">
                              <div className="flex-grow-1">
                                <Form.Label>Sous-Catégorie</Form.Label>
                              </div>
                            </div>
                            <div className="input-group mb-3">
                              <select
                                className="form-select"
                                id="choices-sous-category-input"
                                name="choices-sous-category-input"
                                onChange={handlesousCategory}
                              >
                                <option value="">Choisir ...</option>
                                {sousCategory.map((souscategory) => (
                                  <option
                                    key={souscategory.idSubCategory}
                                    value={souscategory.idSubCategory}
                                  >
                                    {souscategory.title}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="error-msg mt-1">
                              svp selectionner la categorie.
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card style={{ height: "22.1rem", marginBottom: 0 }}>
                    <Card.Body
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="text-center mb-3">
                        <div className="position-relative d-inline-block">
                          <div className="position-absolute top-100 start-100 translate-middle">
                            <label
                              htmlFor="imageProduit"
                              className="mb-0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Select Fournisseur Logo"
                            >
                              <span className="avatar-xs d-inline-block">
                                <span className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                  <i className="ri-image-fill"></i>
                                </span>
                              </span>
                            </label>
                            <input
                              className="d-none"
                              type="file"
                              name="imageProduit"
                              id="imageProduit"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e)}
                            />
                          </div>
                          <div className="avatar-xl">
                            <div className="avatar-title bg-light rounded-4">
                              <img
                                src={`data:image/jpeg;base64, ${produitData.imageProduit}`}
                                alt={produitData.nomProduit}
                                id="category-img"
                                className="avatar-xl h-auto rounded-4 object-fit-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="error-msg mt-1">
                        Please add a product images.
                      </div>
                    </Card.Body>
                  </Card>
                  <Row>
                    <div className="text-end mb-3" style={{ marginTop: 13 }}>
                      <Button variant="primary" type="submit" className="w-sm">
                        Ajouter
                      </Button>
                    </div>
                  </Row>
                </Col>
              </Row>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default CreateArrivageProduit;
