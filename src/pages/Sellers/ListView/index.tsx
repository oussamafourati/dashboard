import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import CountUp from "react-countup";

import ListViewTable from "./listViewTable";
import {
  useAddFournisseurMutation,
  useFetchFournisseurQuery,
} from "features/fournisseur/fournisseurSlice";
import Swal from "sweetalert2";
import {
  Arrivage,
  useFetchTopFournisseurQuery,
} from "features/arrivage/arrivageSlice";

const SellersListView = () => {
  const [modal_AddSellerModals, setmodal_AddSellerModals] =
    useState<boolean>(false);
  function tog_AddSellerModals() {
    setmodal_AddSellerModals(!modal_AddSellerModals);
  }

  const { data = [] } = useFetchFournisseurQuery();

  const etatActive = data.filter((fournisseur) => fournisseur.etat! === 1);
  const etatNonActive = data.filter((fournisseur) => fournisseur.etat! === 0);

  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Le Fournisseur a été créer avec succès",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const [selectedOption, setSelectedOption] = useState<string>("");
  // This function is triggered when the select changes
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
  };
  const [selectedEtat, setSelectedEtat] = useState<string>("");
  // This function is triggered when the select changes
  const selectChangeEtat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedEtat(value);
  };

  const [createFournisseur] = useAddFournisseurMutation();

  const initialFournisseur = {
    idfournisseur: 99,
    raison_sociale: "",
    adresse: "",
    tel: "",
    mail: "",
    type: 0,
    matricule_fiscale: "",
    logo: "",
    rib: "",
    etat: 1,
    piecejointes: "",
  };
  const [formData, setFormData] = useState(initialFournisseur);

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
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    formData["type"] = parseInt(selectedOption);
    formData["etat"] = parseInt(selectedEtat);
    e.preventDefault();
    createFournisseur(formData).then(() => setFormData(initialFournisseur));
    notify();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileLogo = (
      document.getElementById("logo") as HTMLInputElement
    ).files?.item(0) as File;
    const base64 = await convertToBase64(fileLogo);

    setFormData({
      ...formData,
      raison_sociale,
      adresse,
      tel,
      mail,
      type,
      matricule_fiscale,
      logo: base64 as string,
      rib,
      etat,
      piecejointes,
    });
  };

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        const base64Data = base64String.split(",")[1];
        resolve(base64Data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  const [arrivage, setArrivage] = useState<Arrivage[]>([]);
  const { data: TopFournisseur = [] } = useFetchTopFournisseurQuery();
  useEffect(() => {
    const getArrivage = async () => {
      const reqdata = await fetch(
        "https://app.src.com.tn/arrivage/topfournisseur"
      );
      const resdata = await reqdata.json();
      setArrivage(resdata);
    };
    getArrivage();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Liste des fournisseurs" pageTitle="Fournisseur" />
          <Row>
            <Col xxl={3} md={6}>
              <Card className="card-height-100 bg-warning-subtle border-0 overflow-hidden">
                <div className="position-absolute end-0 start-0 top-0 z-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="400"
                    height="250"
                    preserveAspectRatio="none"
                    viewBox="0 0 400 250"
                  >
                    <g mask='url("#SvgjsMask1530")' fill="none">
                      <path
                        d="M209 112L130 191"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1531)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M324 10L149 185"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1532)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M333 35L508 -140"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1532)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M282 58L131 209"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1531)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M290 16L410 -104"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1532)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M216 186L328 74"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1531)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M255 53L176 132"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1531)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M339 191L519 11"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1531)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M95 151L185 61"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1532)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M249 16L342 -77"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1532)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M129 230L286 73"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1531)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M80 216L3 293"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1531)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                    </g>
                    <defs>
                      <mask id="SvgjsMask1530">
                        <rect width="400" height="250" fill="#ffffff"></rect>
                      </mask>
                      <linearGradient
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                        id="SvgjsLinearGradient1531"
                      >
                        <stop
                          stopColor="rgba(var(--tb-warning-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-warning-rgb), 0.2)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                        id="SvgjsLinearGradient1532"
                      >
                        <stop
                          stopColor="rgba(var(--tb-warning-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-warning-rgb), 0.2)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <Card.Body className="p-4 z-1 position-relative">
                  <p className="mb-0 fw-medium text-uppercase fs-14">
                    Total fournisseurs
                  </p>
                  <h4 className="fs-22 fw-semibold mb-3">
                    <CountUp start={0} end={data.length} duration={1} />
                  </h4>
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={3} md={6}>
              <Card className="card-height-100 bg-success-subtle border-0 overflow-hidden">
                <div className="position-absolute end-0 start-0 top-0 z-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="400"
                    height="250"
                    preserveAspectRatio="none"
                    viewBox="0 0 400 250"
                  >
                    <g mask='url("#SvgjsMask1608")' fill="none">
                      <path
                        d="M390 87L269 208"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1609)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M358 175L273 260"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1610)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M319 84L189 214"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1609)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M327 218L216 329"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1610)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M126 188L8 306"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1610)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M220 241L155 306"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1610)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M361 92L427 26"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1609)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M391 188L275 304"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1609)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M178 74L248 4"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1610)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M84 52L-56 192"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1610)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M183 111L247 47"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1610)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M46 8L209 -155"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1609)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                    </g>
                    <defs>
                      <mask id="SvgjsMask1608">
                        <rect width="400" height="250" fill="#ffffff"></rect>
                      </mask>
                      <linearGradient
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                        id="SvgjsLinearGradient1609"
                      >
                        <stop
                          stopColor="rgba(var(--tb-success-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-success-rgb), 0.2)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                        id="SvgjsLinearGradient1610"
                      >
                        <stop
                          stopColor="rgba(var(--tb-success-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-success-rgb), 0.2)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <Card.Body className="p-4 z-1 position-relative">
                  <p className="mb-0 fw-medium text-uppercase fs-14">
                    Fournisseur Actif
                  </p>
                  <h4 className="fs-22 fw-semibold mb-3">
                    {etatActive.length}
                  </h4>
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={3} md={6}>
              <Card className="card-height-100 bg-info-subtle border-0 overflow-hidden">
                <div className="position-absolute end-0 start-0 top-0 z-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="400"
                    height="250"
                    preserveAspectRatio="none"
                    viewBox="0 0 400 250"
                  >
                    <g mask='url("#SvgjsMask1551")' fill="none">
                      <path
                        d="M306 65L446 -75"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1552)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M399 2L315 86"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M83 77L256 -96"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M281 212L460 33"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M257 62L76 243"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M305 123L214 214"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1552)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M327 222L440 109"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1552)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M287 109L362 34"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M259 194L332 121"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M376 186L240 322"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M308 153L123 338"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M218 62L285 -5"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1552)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                    </g>
                    <defs>
                      <mask id="SvgjsMask1551">
                        <rect width="400" height="250" fill="#ffffff"></rect>
                      </mask>
                      <linearGradient
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                        id="SvgjsLinearGradient1552"
                      >
                        <stop
                          stopColor="rgba(var(--tb-info-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-info-rgb), 0.2)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                        id="SvgjsLinearGradient1553"
                      >
                        <stop
                          stopColor="rgba(var(--tb-info-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-info-rgb), 0.2)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <Card.Body className="p-4 z-1 position-relative">
                  <p className="mb-0 fw-medium text-uppercase fs-14">
                    Fournisseur Inactif
                  </p>
                  <h4 className="fs-22 fw-semibold mb-3">
                    {etatNonActive.length}
                  </h4>
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={3} md={6}>
              <Card className="bg-light border-0">
                <Card.Body className="p-3">
                  <div className="p-3 bg-white rounded">
                    <div className="d-flex align-items-center gap-2">
                      <div className="flex-grow-1">
                        <h6 className="fs-16 fw-bold">
                          <span className="text-success">#1</span>{" "}
                          {TopFournisseur[0]?.raison_sociale!}
                        </h6>
                        <h6 className="fs-14 fw-semibold mb-1">
                          <CountUp
                            end={parseInt(TopFournisseur[0]?.TOTAL_ARRIVAGE!)}
                            separator=","
                            suffix="DT"
                          />{" "}
                        </h6>
                        <p className="fs-13 fw-600 text-dark mb-0">
                          Total approvisionnements:{" "}
                          <span className="fs-15 fw-800 text-dark mb-0">
                            {TopFournisseur[0]?.value_occurrence!}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row id="sellersList">
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <Row className="g-3">
                    <Col className="col-lg-auto ms-auto">
                      <div className="hstack gap-2">
                        <Button
                          variant="success"
                          onClick={() => tog_AddSellerModals()}
                          className="add-btn"
                        >
                          <i className="bi bi-plus-circle me-1 align-middle"></i>
                          Ajouter
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <ListViewTable />
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal
        className="fade"
        id="createModal"
        show={modal_AddSellerModals}
        onHide={() => {
          tog_AddSellerModals();
        }}
        centered
      >
        <Modal.Header closeButton>
          <h1 className="modal-title fs-5" id="createModalLabel">
            Ajouter Fournisseur
          </h1>
        </Modal.Header>
        <Modal.Body>
          <Form className="create-form" onSubmit={onSubmit}>
            <input type="hidden" id="id-field" />
            <div
              id="alert-error-msg"
              className="d-none alert alert-danger py-2"
            ></div>
            <div>
              <div className="text-center mb-3">
                <div className="position-relative d-inline-block">
                  <div className="position-absolute top-100 start-100 translate-middle">
                    <label
                      htmlFor="logo"
                      className="mb-0"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="Select company logo"
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
                      onChange={(e) => handleFileUpload(e)}
                    />
                  </div>
                  <div className="avatar-lg">
                    <div className="avatar-title bg-light rounded-3">
                      <img
                        src={`data:image/jpeg;base64, ${formData.logo}`}
                        alt={formData.raison_sociale}
                        id="logo"
                        className="avatar-xl h-auto rounded-3 object-fit-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <Form.Label htmlFor="raison_sociale">Raison Sociale</Form.Label>
                <Form.Control
                  onChange={onChange}
                  value={formData.raison_sociale}
                  type="text"
                  id="raison_sociale"
                  required
                />
              </div>

              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="matricule_fiscale">
                      Matricule Fiscale
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="matricule_fiscale"
                      onChange={onChange}
                      value={formData.matricule_fiscale}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="adresse">Adresse</Form.Label>
                    <Form.Control
                      type="text"
                      id="adresse"
                      required
                      onChange={onChange}
                      value={formData.adresse}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="tel">Téléphone</Form.Label>
                    <Form.Control
                      type="number"
                      id="tel"
                      required
                      value={formData.tel}
                      minLength={8}
                      onChange={onChange}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="mail">E-mail</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={onChange}
                      value={formData.mail}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="type">Type Fournisseur</Form.Label>
                    <select
                      onChange={selectChange}
                      className="form-select"
                      data-choices
                      data-choices-search-false
                      id="type"
                      required
                    >
                      <option value="">Choisir</option>
                      <option value={0} selected>
                        Morale
                      </option>
                      <option value={1}>Physique</option>
                    </select>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="rib">R.I.B</Form.Label>
                    <Form.Control
                      type="number"
                      id="rib"
                      onChange={onChange}
                      value={formData.rib}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Form.Label htmlFor="etat">Etat Fournisseur</Form.Label>
                    <select
                      className="form-select"
                      onChange={selectChangeEtat}
                      data-choices
                      data-choices-search-false
                      id="etat"
                      required
                    >
                      <option value="">Choisir</option>
                      <option value={1}>Actif</option>
                      <option value={0}>Inactif</option>
                    </select>
                  </div>
                </Col>
                {/* <Col md={6}>
                      <div className="text-center mb-3">
                        <div className="position-relative d-inline-block">
                          <div className="position-absolute top-100 start-100 translate-middle">
                            <label
                              htmlFor="piecejointes"
                              className="mb-0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Select company logo"
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
                              onChange={(e) => handleFileUpload(e)}
                            />
                          </div>
                          <div className="avatar-lg">
                            <div className="avatar-title bg-light rounded-3">
                              <img
                                src={`data:image/jpeg;base64, ${formData.piecejointes}`}
                                alt={formData.raison_sociale}
                                id="companyPJ-img"
                                className="avatar-md h-auto rounded-3 object-fit-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col> */}
              </Row>
            </div>
            <div className="hstack gap-2 justify-content-end">
              <Button
                variant="light"
                onClick={() => {
                  tog_AddSellerModals();
                  setFormData(initialFournisseur);
                }}
              >
                Fermer
              </Button>
              <Button
                onClick={() => {
                  tog_AddSellerModals();
                }}
                type="submit"
                variant="success"
                id="addNew"
              >
                Ajouter
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default SellersListView;
