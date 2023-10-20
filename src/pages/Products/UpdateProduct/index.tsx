import React, { useEffect, useState } from "react";
import { Card, Button, Form, Row, Col, Container } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { useLocation, useNavigate } from "react-router-dom";
import { Category } from "features/category/categorySlice";
import { SubCategory } from "features/subCategory/subCategorySlice";
import { useUpdateProductMutation } from "features/produit/productSlice";
import Swal from "sweetalert2";
import { convertToBase64 } from "helpers/convertToBase64";

const UpdateProduct = () => {
  document.title = "Modifier produit | Radhouani";
  const LocationProduct = useLocation();
  const navigate = useNavigate();
  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Le Produit a été modifier avec succès",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const [nomProduit, setNomProduit] = useState<string>(
    LocationProduct.state.nomProduit
  );
  const handleChangeNameProduct = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setNomProduit(value);

  const [imageProduit, setImageProduit] = useState<string>(
    LocationProduct.state.imageProduit
  );

  const [marque, setMarque] = useState<string>(LocationProduct.state.marque);
  const handleChangeMarque = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setMarque(value);

  const [seuil, setSeuil] = useState<string>(LocationProduct.state.seuil);
  const handleChangeSeuil = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setSeuil(value);

  const [remarqueProduit, setRemarqueProduit] = useState<string>(
    LocationProduct.state.remarqueProduit
  );
  const handleChangeRemarqueProduit = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setRemarqueProduit(value);

  const [category, setCategory] = useState<Category[]>([]);
  const [categoryid, setCategoryid] = useState(
    LocationProduct.state.categoryID
  );
  const [sousCategory, setSousCategory] = useState<SubCategory[]>([]);
  const [sousCategoryid, setSousCategoryid] = useState(
    LocationProduct.state.sousCategoryID
  );
  useEffect(() => {
    const getCategory = async () => {
      const reqdata = await fetch(
        "https://app.src.smartschools.tn/category/all"
      );
      const resdata = await reqdata.json();
      setCategory(resdata);
    };
    getCategory();
  }, []);
  const handlecategory = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    if (categoryId !== "") {
      const reqstatedata = await fetch(
        `https://app.src.smartschools.tn/subCategory/onesubcategory?idcategory=${categoryId}`
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

  // Mutation to create product
  const [updateProduct] = useUpdateProductMutation();
  // Product's Values and Functions
  const [productData, setProductData] = useState({
    idproduit: 1,
    nomProduit: "",
    imageProduit: "",
    marque: "",
    remarqueProduit: "",
    seuil: "",
    sousCategoryID: 1,
    categoryID: 1,
  });

  const onSubmitProduct = (e: React.FormEvent<HTMLFormElement>) => {
    productData["categoryID"] = parseInt(categoryid);
    productData["sousCategoryID"] = parseInt(sousCategoryid);
    productData["nomProduit"] = nomProduit;
    productData["marque"] = marque;
    productData["remarqueProduit"] = remarqueProduit;
    productData["seuil"] = seuil;
    productData["imageProduit"] = imageProduit;
    productData["idproduit"] = LocationProduct.state.idproduit;

    e.preventDefault();
    updateProduct(productData).then(() => setProductData(productData));
    notify();
    navigate("/products-list");
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (document.getElementById("imageProduit") as HTMLFormElement)
      .files[0];
    const base64 = await convertToBase64(file);
    setImageProduit(base64 as string);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Modifier Produit" pageTitle="Produits" />
          <form
            id="createproduct-form"
            autoComplete="off"
            className="needs-validation"
            onSubmit={onSubmitProduct}
          >
            <Row>
              <Col lg={8}>
                <Card>
                  <Card.Body>
                    <div className="mb-3">
                      <Form.Label htmlFor="nomProduit">
                        Titre <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="nomProduit"
                        value={nomProduit}
                        onChange={handleChangeNameProduct}
                        required
                      />
                    </div>
                    <Row>
                      <Col lg={6} style={{ marginBottom: 15 }}>
                        <div className="mb-3">
                          <Form.Label htmlFor="marque">Marque</Form.Label>
                          <Form.Control
                            type="text"
                            id="marque"
                            value={marque}
                            onChange={handleChangeMarque}
                          />
                        </div>
                      </Col>
                      <Col lg={6} style={{ marginBottom: 15 }}>
                        <div className="mb-3">
                          <Form.Label htmlFor="seuil">Seuil</Form.Label>
                          <Form.Control
                            type="number"
                            id="seuil"
                            value={seuil}
                            onChange={handleChangeSeuil}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="remarqueProduit">
                            Description
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="remarqueProduit"
                            as="textarea"
                            rows={3}
                            value={remarqueProduit}
                            onChange={handleChangeRemarqueProduit}
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
                              <option value={LocationProduct.state.categoryID}>
                                {LocationProduct.state.nom}
                              </option>
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
                              <option
                                value={LocationProduct.state.sousCategoryID}
                              >
                                {LocationProduct.state.title}
                              </option>
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
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4}>
                <Card style={{ height: "24.5rem", marginBottom: 0 }}>
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
                              src={`data:image/jpeg;base64,${imageProduit}`}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                <Row>
                  <div className="text-end mb-3" style={{ marginTop: 13 }}>
                    <Button variant="primary" type="submit" className="w-sm">
                      Modifier
                    </Button>
                  </div>
                </Row>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UpdateProduct;
