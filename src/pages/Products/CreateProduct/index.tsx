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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
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

const CreateProduct = () => {
  document.title = "Créer produit | Radhouani";

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
    const categoryid = e.target.value;
    if (categoryid !== "") {
      const reqstatedata = await fetch(
        `http://localhost:8000/subCategory/onesubcategory?idcategory=${categoryid}`
      );
      const resstatedata = await reqstatedata.json();
      setSousCategory(await resstatedata);
      console.log(reqstatedata);
      setCategoryid(categoryid);
    } else {
      setSousCategory([]);
    }
    console.log(categoryid);
  };

  const handlesousCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const getstateid = e.target.value;
    setSousCategoryid(getstateid);
  };

  const navigate = useNavigate();

  //Toast Notification For Product
  const notify = () => {
    toast.success("Le produit a été créé avec succès", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  //Toast Notification For Category
  const notifyCategory = () => {
    toast.success("Le catégorie a été créé avec succès", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  //Toast Notification For SubCategory
  const notifySubCategory = () => {
    toast.success("Le sous-catégory a été créé avec succès", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  //Toast Notification For Fournisseur
  const notifyFournisseur = () => {
    toast.success("Le fournisseur a été créé avec succès", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // Modal to create a new category
  const [modal_AddCategoryModals, setmodal_AddCategoryModals] =
    useState<boolean>(false);
  function tog_AddCategorysModals() {
    setmodal_AddCategoryModals(!modal_AddCategoryModals);
  }

  // Modal to create a new subcategory
  const [modal_AddSubCategoryModals, setmodal_AddSubCategoryModals] =
    useState<boolean>(false);
  function tog_AddSubCategorysModals() {
    setmodal_AddSubCategoryModals(!modal_AddSubCategoryModals);
  }

  // Modal to create a new fournisseur
  const [modal_AddFournisseurModals, setmodal_AddFournisseurModals] =
    useState<boolean>(false);
  function tog_AddFournisseurModals() {
    setmodal_AddFournisseurModals(!modal_AddFournisseurModals);
  }

  // Fetch All Categories
  const { data: listeCategories = [] } = useFetchCategoriesQuery();

  // Fetch All Fournisseurs
  const { data: listeFournisseur = [] } = useFetchFournisseurQuery();

  // Fetch All SubCategory
  const { data: listSubCategory = [] } = useFetchSubCategoriesQuery();

  // Mutation to create product
  const [createProduct] = useAddProduitMutation();

  // Mutation to create a new Category
  const [createNewCategory] = useCreateCategoryMutation();

  //Mutation to create a new subcategory
  const [createNewSubCategory] = useCreateSubCategoryMutation();

  //Mutation to create a new fournisseur
  const [createNewFournisseur] = useAddFournisseurMutation();

  // Category's Values and Functions
  const initialCategoryValue = {
    idcategory: 1,
    nom: "",
    image: "",
    id_parent: 0,
    final_level: 0,
  };

  const [categoryData, setCategoryData] = useState(initialCategoryValue);
  const { idcategory, nom, image, id_parent, final_level } = categoryData;
  const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmitCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewCategory(categoryData).then(() => setCategoryData(categoryData));
    notifyCategory();
  };

  const handleFileCategoryUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (document.getElementById("image") as HTMLFormElement).files[0];
    const base64 = await convertToBase64(file);
    setCategoryData({ ...categoryData, image: base64 as string });
  };

  // SubCategory's Values and Functions
  const initialSubCategoryValue = {
    idSubCategory: 1,
    title: "",
    subDescription: "",
    parentID: 4,
  };

  const [subCategoryData, setSubCategoryData] = useState(
    initialSubCategoryValue
  );
  const { idSubCategory, title, subDescription, parentID } = subCategoryData;
  const onChangeSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubCategoryData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmitSubCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewSubCategory(subCategoryData).then(() =>
      setSubCategoryData(subCategoryData)
    );
    notifySubCategory();
  };

  // Category's Values and Functions
  const initialFournisseurValue = {
    idfournisseur: 99,
    raison_sociale: "",
    adresse: "",
    tel: 14785236,
    mail: "",
    type: 1,
    matricule_fiscale: 1,
    logo: "",
    rib: 1142250,
    etat: 1,
    piecejointes: "",
  };

  const [fournisseurData, setFournisseurData] = useState(
    initialFournisseurValue
  );
  const {
    raison_sociale,
    adresse,
    tel,
    mail,
    type,
    matricule_fiscale,
    logo,
    rib,
    etat,
    piecejointes,
  } = fournisseurData;
  const onChangeFournisseur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFournisseurData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmitFournisseur = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewFournisseur(fournisseurData).then(() =>
      setFournisseurData(fournisseurData)
    );
    notifyFournisseur();
  };

  const handleFileUploadFournisseur = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileLogo = (
      document.getElementById("logo") as HTMLInputElement
    ).files?.item(0) as File;
    const filePJ = (
      document.getElementById("piecejointes") as HTMLInputElement
    ).files?.item(0) as File;

    const base64 = await convertToBase64(fileLogo);
    const base64PJ = await convertToBase64(filePJ);

    setFournisseurData({
      ...fournisseurData,
      logo: base64 as string,
      piecejointes: base64PJ as string,
    });
  };

  // Product's Values and Functions
  const initialValue = {
    idproduit: 1,
    nomProduit: "",
    imageProduit: "",
    marque: "",
    prixAchatHt: 1234,
    prixAchatTtc: 1234,
    prixVente: 1234,
    remise: 15,
    remarqueProduit: "",
    fournisseurID: 1,
    categoryID: 5,
  };

  const [formData, setFormData] = useState(initialValue);
  const {
    nomProduit,
    imageProduit,
    marque,
    prixAchatHt,
    prixAchatTtc,
    prixVente,
    remise,
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

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   createProduct(formData).then(() => setFormData(formData));
  //   notify();
  // };

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
    setFormData({ ...formData, imageProduit: base64 as string });
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
            // onSubmit={onSubmit}
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
                    {/* ******* Select Category ******* */}
                    <div>
                      <div className="d-flex align-items-start">
                        <div className="flex-grow-1">
                          <Form.Label>Catégorie</Form.Label>
                        </div>
                        <div className="flex-shrink-0">
                          <Link
                            to="#"
                            onClick={() => tog_AddCategorysModals()}
                            className="float-end text-decoration-underline"
                          >
                            Ajouter Nouveau
                          </Link>
                        </div>
                      </div>
                      <div>
                        <select
                          className="form-select"
                          id="choices-category-input"
                          name="choices-category-input"
                          onChange={handlecategory}
                        >
                          <option value="">Selectionner categorie</option>
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
                    {/* ******* Select SubCategory ******* */}
                    <div>
                      <div className="d-flex align-items-start">
                        <div className="flex-grow-1">
                          <Form.Label>Sous-Catégorie</Form.Label>
                        </div>
                        <div className="flex-shrink-0">
                          <Link
                            to="#"
                            onClick={() => tog_AddSubCategorysModals()}
                            className="float-end text-decoration-underline"
                          >
                            Ajouter Nouveau
                          </Link>
                        </div>
                      </div>
                      <div>
                        <select
                          className="form-select"
                          id="choices-category-input"
                          name="choices-category-input"
                          onChange={handlesousCategory}
                        >
                          <option value="">Selectionner sous-categorie</option>
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
                    {/* ******* Select Fournisseur ******* */}
                    <div>
                      <div className="d-flex align-items-start">
                        <div className="flex-grow-1">
                          <Form.Label>Fournisseur</Form.Label>
                        </div>
                        <div className="flex-shrink-0">
                          <Link
                            to="#"
                            onClick={() => tog_AddFournisseurModals()}
                            className="float-end text-decoration-underline"
                          >
                            Ajouter Nouveau
                          </Link>
                        </div>
                      </div>
                      <div>
                        <select
                          className="form-select"
                          id="choices-fournisseur-input"
                          name="choices-fournisseur-input"
                        >
                          <option value="">
                            Selectionner fournisseur du produit
                          </option>
                          {listeFournisseur.map((fournisseur) => (
                            <option
                              key={fournisseur.idfournisseur}
                              value="Appliances"
                            >
                              {fournisseur.raison_sociale}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="error-msg mt-1">
                        Please select a product category.
                      </div>
                    </div>
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
                          <div className="avatar-xxl p-1">
                            <div className="avatar-title bg-light rounded-3">
                              <img
                                src={`data:image/jpeg;base64, ${formData.imageProduit}`}
                                alt={formData.nomProduit}
                                id="category-img"
                                className="avatar-xxl h-auto rounded-3 object-fit-cover"
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

                <Card>
                  <Card.Header>
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="bi bi-list-ul"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">
                          Information Generale
                        </h5>
                        <p className="text-muted mb-0">
                          Taper tous les information ci-dessus.
                        </p>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg={6}>
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
                      <Col lg={6}>
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
                          <Form.Label htmlFor="prixAchatTtc">
                            Prix d'Achat TTC
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="prixAchatTtc"
                            placeholder="Prix Achat TTC"
                            required
                            onChange={onChange}
                            value={formData.prixAchatTtc}
                          />
                          <div className="invalid-feedback">
                            Please enter a product stocks.
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
                            required
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
                          <Form.Label htmlFor="remise">Remise</Form.Label>
                          <div className="input-group has-validation mb-3">
                            <span
                              className="input-group-text"
                              id="product-discount-addon"
                            >
                              %
                            </span>
                            <Form.Control
                              type="text"
                              value={formData.remise}
                              onChange={onChange}
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
                    </Row>
                  </Card.Body>
                </Card>
                <div className="text-end mb-3">
                  <Button
                    variant="success"
                    onClick={() => navigate("/products-list")}
                    type="submit"
                    className="w-sm"
                  >
                    Ajouter
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
          {/* ******Modal For Category****** */}
          <Modal
            id="showModal"
            className="fade zoomIn"
            size="sm"
            show={modal_AddCategoryModals}
            onHide={() => {
              tog_AddCategorysModals();
            }}
            centered
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title fs-18" id="exampleModalLabel">
                Ajouter Nouveau Catégorie
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <Form className="tablelist-form" onSubmit={onSubmitCategory}>
                <Row>
                  <Col lg={12}>
                    <div className="mb-3">
                      <Form.Label htmlFor="nom">
                        Nom Catégorie <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={categoryData.nom}
                        onChange={onChangeCategory}
                        id="nom"
                        placeholder="Taper le nom du catégorie"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label d-block">
                        Image <span className="text-danger">*</span>
                      </label>
                      <div className="position-relative d-inline-block">
                        <div className="position-absolute top-100 start-100 translate-middle">
                          <label
                            htmlFor="image"
                            className="mb-0"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            title="Select Category's Image"
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
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={(e) => handleFileCategoryUpload(e)}
                          />
                        </div>
                        <div className="avatar-xl">
                          <div className="avatar-title bg-light rounded-3">
                            <img
                              src={`data:image/jpeg;base64, ${categoryData.image}`}
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
                          tog_AddCategorysModals();
                        }}
                      >
                        <i className="ri-close-line align-bottom me-1"></i>{" "}
                        Fermer
                      </Button>
                      <Button
                        type={"submit"}
                        onClick={() => {
                          tog_AddCategorysModals();
                        }}
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

          {/* ******Modal For Sub Category****** */}
          <Modal
            id="showModal"
            className="fade zoomIn"
            size="lg"
            show={modal_AddSubCategoryModals}
            onHide={() => {
              tog_AddSubCategorysModals();
            }}
            centered
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title fs-18" id="exampleModalLabel">
                Ajouter Nouveau Sous-Catégorie
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <Form className="tablelist-form" onSubmit={onSubmitSubCategory}>
                <Row>
                  <Col lg={12}>
                    <div className="mb-3">
                      <Form.Label htmlFor="title">
                        Titre Sous-Catégorie
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={subCategoryData.title}
                        onChange={onChangeSubCategory}
                        id="title"
                        placeholder="Taper le title du sous-catégorie"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="mb-3">
                      <Form.Label htmlFor="statusSelect">Catégorie</Form.Label>
                      <select
                        className="form-select"
                        name="choices-single-default"
                        id="status-Field"
                      >
                        <option value="">Choisir Catégorie</option>
                        {listeCategories.map((category) => (
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
                      <Form.Label htmlFor="subDescription">
                        Description
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={subCategoryData.subDescription}
                        onChange={onChangeSubCategory}
                        id="subDescription"
                        placeholder="Taper Description"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={12} className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        className="btn-ghost-danger"
                        onClick={() => {
                          tog_AddSubCategorysModals();
                        }}
                      >
                        <i className="ri-close-line align-bottom me-1"></i>{" "}
                        Fermer
                      </Button>
                      <Button
                        type={"submit"}
                        onClick={() => {
                          tog_AddSubCategorysModals();
                        }}
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

          {/* ******Modal For Fournisseur****** */}
          <Modal
            id="showModal"
            className="fade zoomIn"
            size="xl"
            show={modal_AddFournisseurModals}
            onHide={() => {
              tog_AddFournisseurModals();
            }}
            centered
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title fs-18" id="exampleModalLabel">
                Ajouter Fournisseur
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <Form className="tablelist-form" onSubmit={onSubmitFournisseur}>
                <Row>
                  <div
                    id="alert-error-msg"
                    className="d-none alert alert-danger py-2"
                  ></div>
                  <input type="hidden" id="id-field" />
                  <Col lg={12}>
                    <div className="mb-3">
                      <div className="position-relative d-inline-block">
                        <div className="position-absolute top-100 start-100 translate-middle">
                          <label
                            htmlFor="logo"
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
                            className="form-control d-none"
                            type="file"
                            name="logo"
                            id="logo"
                            accept="image/*"
                            onChange={(e) => handleFileUploadFournisseur(e)}
                          />
                        </div>
                        <div className="avatar-lg">
                          <div className="avatar-title bg-light rounded-3">
                            <img
                              src={`data:image/jpeg;base64, ${fournisseurData.logo}`}
                              alt=""
                              id="category-img"
                              className="avatar-xl h-auto rounded-3 object-fit-cover"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="error-msg mt-1">
                        Please add a fournisseur logo.
                      </div>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="mb-3">
                      <Form.Label htmlFor="raison_sociale">
                        Nom Fournisseur
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={fournisseurData.raison_sociale}
                        onChange={onChangeFournisseur}
                        id="raison_sociale"
                        placeholder="Taper Raison sociale"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="matricule_fiscale">
                        Matricule Fiscale
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={fournisseurData.matricule_fiscale}
                        onChange={onChangeFournisseur}
                        id="matricule_fiscale"
                        placeholder="Taper le marticule fiscale"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="rib">RIB</Form.Label>
                      <Form.Control
                        type="text"
                        value={fournisseurData.rib}
                        onChange={onChangeFournisseur}
                        id="rib"
                        placeholder="Taper RIB "
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="adresse">Adresse</Form.Label>
                      <Form.Control
                        type="text"
                        value={fournisseurData.adresse}
                        onChange={onChangeFournisseur}
                        id="adresse"
                        placeholder="Taper l'adresse du fournisseur"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="tel">Telephone</Form.Label>
                      <Form.Control
                        type="text"
                        value={fournisseurData.tel}
                        onChange={onChangeFournisseur}
                        id="tel"
                        placeholder="Taper numéro"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="mail">E-mail</Form.Label>
                      <Form.Control
                        type="email"
                        value={fournisseurData.mail}
                        onChange={onChangeFournisseur}
                        id="mail"
                        placeholder="Taper e-mail"
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="statusSelect">Type</Form.Label>
                      <select
                        className="form-select"
                        name="choices-single-default"
                        id="status-Field"
                      >
                        <option value="">Choisir Type Fournisseur</option>
                        <option value="Morale">Morale</option>
                        <option value="Physique">Physique</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="statusSelect">Etat</Form.Label>
                      <select
                        className="form-select"
                        name="choices-single-default"
                        id="status-Field"
                      >
                        <option value="">Choisir Etat Fournisseur</option>
                        <option value="Actif">Actif</option>
                        <option value="Inactif">Inactif</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label
                        htmlFor="piecejointes"
                        className="form-label d-block"
                      >
                        Piece Jointe
                      </label>

                      <div className="position-relative d-inline-block">
                        <div className="position-absolute top-100 start-100 translate-middle">
                          <label
                            htmlFor="piecejointes"
                            className="mb-0"
                            data-bs-toggle="tooltip"
                            data-bs-placement="right"
                            title="Select Fournisseur's Piece Jointe"
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
                            name="piecejointes"
                            id="piecejointes"
                            accept="image/*"
                            onChange={(e) => handleFileUploadFournisseur(e)}
                          />
                        </div>
                        <div className="avatar-xl">
                          <div className="avatar-title bg-light rounded-3">
                            <img
                              src={`data:image/jpeg;base64, ${fournisseurData.piecejointes}`}
                              alt=""
                              id="category-img"
                              className="avatar-xl h-auto rounded-3 object-fit-cover"
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
                          tog_AddFournisseurModals();
                        }}
                      >
                        <i className="ri-close-line align-bottom me-1"></i>{" "}
                        Fermer
                      </Button>
                      <Button
                        type={"submit"}
                        onClick={() => {
                          tog_AddFournisseurModals();
                        }}
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
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default CreateProduct;
