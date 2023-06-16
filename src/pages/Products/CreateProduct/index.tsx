import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Modal,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { useAddProduitMutation } from "features/produit/productSlice";
import {
  Category,
  useCreateCategoryMutation,
  useFetchCategoriesQuery,
} from "features/category/categorySlice";
import {
  useAddFournisseurMutation,
  useFetchFournisseurQuery,
} from "features/fournisseur/fournisseurSlice";
import {
  SubCategory,
  useCreateSubCategoryMutation,
  useFetchSubCategoriesQuery,
} from "features/subCategory/subCategorySlice";
import Swal from "sweetalert2";

const CreateProduct = () => {
  document.title = "Créer produit | Radhouani";

  const navigate = useNavigate();

  // Mutation to create product
  const [createProduct] = useAddProduitMutation();

  // Product's Values and Functions
  const initialValue = {
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

  const [formData, setFormData] = useState(initialValue);
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
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Le Produit a été créer avec succès",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const onSubmitProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduct(formData).then(() => setFormData(formData));
    notify();
    navigate("/products-list");
  };

  //Common Function
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
    console.log(base64);
    setFormData({
      ...formData,
      imageProduit: base64 as string,
    });
  };

  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files: any) {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  /* Formats the size */
  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Créer Produit" pageTitle="Produits" />
          <form
            id="createproduct-form"
            autoComplete="off"
            className="needs-validation"
            noValidate
            onSubmit={onSubmitProduct}
          >
            <Row>
              <Col xl={9} lg={8}>
                <Card>
                  <Card.Header>
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="bi bi-box-seam"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">Information produit</h5>
                        <p className="text-muted mb-0">
                          Remplissez toutes les informations ci-dessous.
                        </p>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <Form.Label htmlFor="nomProduit">
                        Titre du produit
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="nomProduit"
                        placeholder="Taper titre du produit"
                        required
                        onChange={onChange}
                        value={formData.nomProduit}
                      />

                      <div className="invalid-feedback">
                        Veuillez saisir le titre du produit.
                      </div>
                    </div>
                    <Row>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="prixAchatHt">
                            Prix d'Achat HT
                          </Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="text"
                              value={formData.prixAchatHt}
                              onChange={onChange}
                              id="prixAchatHt"
                              placeholder="Taper prix"
                              aria-label="Price"
                              aria-describedby="product-price-addon"
                              // required
                            />
                            <div className="invalid-feedback">
                              Please enter a product price.
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={2} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="TVA">TVA</Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="text"
                              value={"19%"}
                              readOnly={true}
                              // onChange={onChange}
                              id="TVA"
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
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="prixVente">
                            Prix de Vente
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="prixVente"
                            placeholder=" Taper Prix de Vente"
                            // required
                            value={formData.prixVente}
                            onChange={onChange}
                          />
                          <div className="invalid-feedback">
                            Please enter a product orders.
                          </div>
                        </div>
                      </Col>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="PrixRemise">
                            Prix en Remise
                          </Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="text"
                              value={formData.PrixRemise}
                              onChange={onChange}
                              id="PrixRemise"
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
                    </Row>
                    <Row>
                      <Col lg={5}>
                        <div className="mb-3">
                          <Form.Label htmlFor="marque">Marque</Form.Label>
                          <Form.Control
                            type="text"
                            id="marque"
                            placeholder="Taper la marque"
                            value={formData.marque}
                            onChange={onChange}
                          />
                        </div>
                      </Col>
                      <Col lg={5}>
                        <div className="mb-3">
                          <Form.Label htmlFor="remarqueProduit">
                            Remarque
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="remarqueProduit"
                            placeholder="Taper remarque"
                            value={formData.remarqueProduit}
                            onChange={onChange}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Header>
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="bi bi-images"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">Image de galerie</h5>
                        <p className="text-muted mb-0">
                          Ajouter images de galerie.
                        </p>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="dropzone my-dropzone">
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
                                src={`data:image/jpeg;base64, ${formData.imageProduit}`}
                                alt={formData.nomProduit}
                                id="category-img"
                                className="avatar-xl h-auto rounded-4 object-fit-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="error-msg mt-1">
                      Please add a product images.
                    </div>
                  </Card.Body>
                </Card>
                <div className="text-end mb-3">
                  <Button
                    variant="success"
                    // onClick={() => navigate("/products-list")}
                    type="submit"
                    className="w-sm"
                  >
                    Ajouter
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateProduct;
