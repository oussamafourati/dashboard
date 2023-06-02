import React, { useState, useEffect, useMemo } from "react";
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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "Common/BreadCrumb";
import { sellerGrid } from "Common/data";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import {
  Fournisseur,
  useAddFournisseurMutation,
  useDeleteFournisseurMutation,
  useFetchFournisseurQuery,
} from "features/fournisseur/fournisseurSlice";

const SellersGridView = () => {
  const notify = () => {
    toast.success("Le fournisseur a été créé avec succès", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const { data = [] } = useFetchFournisseurQuery();
  const [createFournisseur] = useAddFournisseurMutation();
  const [deleteFournisseur] = useDeleteFournisseurMutation();

  const etatActive = data.filter((fournisseur) => fournisseur.etat === 1);
  const etatNonActive = data.filter((fournisseur) => fournisseur.etat === 0);

  const deleteHandler = async (id: any) => {
    await deleteFournisseur(id);
  };

  const [formData, setFormData] = useState({
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
  });

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
    e.preventDefault();
    createFournisseur(formData).then(() => setFormData(formData));
    notify();
  };

  const handleFileUpload = async (
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
    console.log(base64);

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
      piecejointes: base64PJ as string,
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

  document.title = "Fournisseur | Toner eCommerce + Admin React Template";

  // Pagination
  const [pagination, setPagination] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [currentpages, setCurrentpages] = useState<any>([]);
  const perPageData = 8;

  const handleClick = (e: any) => {
    setCurrentPage(Number(e.target.id));
  };

  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;

  const currentdata = useMemo(
    () => sellerGrid.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  useEffect(() => {
    setCurrentpages(currentdata);
  }, [currentPage, currentdata]);

  const searchTeamMember = (ele: any) => {
    let search = ele.target.value;
    if (search) {
      search = search.toLowerCase();
      setCurrentpages(
        sellerGrid.filter((data: any) =>
          data.sellerName.toLowerCase().includes(search)
        )
      );
      setPagination(false);
    } else {
      setCurrentpages(currentdata);
      setPagination(true);
    }
  };

  const pageNumbers: any = [];
  for (let i = 1; i <= Math.ceil(sellerGrid.length / perPageData); i++) {
    pageNumbers.push(i);
  }

  const handleprevPage = () => {
    let prevPage = currentPage - 1;
    setCurrentPage(prevPage);
  };

  const handlenextPage = () => {
    let nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    if (pageNumbers.length && pageNumbers.length < currentPage) {
      setCurrentPage(pageNumbers.length);
    }
  }, [currentPage, pageNumbers.length]);

  const [modal_AddSellerModals, setmodal_AddSellerModals] =
    useState<boolean>(false);
  function tog_AddSellerModals() {
    setmodal_AddSellerModals(!modal_AddSellerModals);
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Fournisseur" pageTitle="Tableau de bord" />
          <Row>
            <Col xl={3} md={6}>
              <Card className="card-animate bg-info-subtle border-0 overflow-hidden">
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
                          stopColor="rgba(var(--tb-info-rgb), 0.1)"
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
                          stopColor="rgba(var(--tb-info-rgb), 0.1)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <Card.Body className="position-relative">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <p className="text-uppercase fs-14 fw-medium text-muted mb-0">
                        Fournisseur Totale
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-24 fw-semibold mb-4">
                        <CountUp end={data.length} />
                      </h4>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={3} md={6}>
              <Card className="card-animate bg-success-subtle border-0 overflow-hidden">
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
                          stopColor="rgba(var(--tb-success-rgb), 0.1)"
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
                          stopColor="rgba(var(--tb-success-rgb), 0.1)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <Card.Body className="position-relative">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <p className="text-uppercase fs-14 fw-medium text-muted mb-0">
                        Fournisseur Actif
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-24 fw-semibold mb-4">
                        <CountUp end={etatActive.length} />
                      </h4>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-white text-success rounded fs-3">
                        <i className="ph-check-square-offset"></i>
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={3} md={6}>
              <Card className="card-animate bg-warning-subtle border-0 overflow-hidden">
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
                          stopColor="rgba(var(--tb-warning-rgb), 0.1)"
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
                          stopColor="rgba(var(--tb-warning-rgb), 0.1)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <Card.Body className="position-relative">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <p className="text-uppercase fs-14 fw-medium text-muted mb-0">
                        Fournisseur Inactif
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-24 fw-semibold mb-4">
                        <CountUp end={etatNonActive.length} />
                      </h4>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-white text-warning rounded fs-3">
                        <i className="ph-clock"></i>
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-4 justify-content-between">
            <Col xxl={2} sm={6}>
              <Button
                onClick={() => tog_AddSellerModals()}
                variant="success"
                data-bs-toggle="modal"
                data-bs-target="#createModal"
              >
                Ajouter Fournisseur
              </Button>
            </Col>
            {/* <Col xxl={2} sm={6}>
              <select
                className="form-select mt-3 mt-sm-0"
                data-choices
                data-choices-search-false
                name="choices-single-default"
                id="idStatus"
              >
                <option value="all">All</option>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option defaultValue="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
              </select>
            </Col> */}
          </Row>

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
                    <Form.Label htmlFor="raison_sociale">
                      Raison Sociale
                    </Form.Label>
                    <Form.Control
                      onChange={onChange}
                      value={formData.raison_sociale}
                      type="text"
                      id="raison_sociale"
                      placeholder="Entrer raison_sociale"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <Form.Label htmlFor="adresse">Adresse</Form.Label>
                    <Form.Control
                      type="text"
                      id="adresse"
                      placeholder="Entrer adresse"
                      required
                      value={formData.adresse}
                      onChange={onChange}
                    />
                  </div>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <Form.Label htmlFor="tel">Téléphone</Form.Label>
                        <Form.Control
                          type="text"
                          id="tel"
                          placeholder="Entrer Téléphone"
                          required
                          value={formData.tel}
                          onChange={onChange}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Form.Label htmlFor="mail">E-mail</Form.Label>
                        <Form.Control
                          type="email"
                          id="mail"
                          placeholder="Entrer Email"
                          required
                          onChange={onChange}
                          value={formData.mail}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Form.Label htmlFor="type">Type Fournisseur</Form.Label>
                        <select
                          className="form-select"
                          data-choices
                          data-choices-search-false
                          id="choices-payment-status"
                          required
                        >
                          <option value="">
                            Selectionner Type de Fournisseur
                          </option>
                          <option value="Morale">Morale</option>
                          <option value="Physique">Physique</option>
                        </select>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Form.Label htmlFor="matricule_fiscale">
                          Matricule Fiscale
                        </Form.Label>
                        <Form.Control
                          type="text"
                          id="matricule_fiscale"
                          placeholder="Entrer Matricule Fiscale"
                          required
                          onChange={onChange}
                          value={formData.matricule_fiscale}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Form.Label htmlFor="rib">R.I.B</Form.Label>
                        <Form.Control
                          type="text"
                          id="rib"
                          placeholder="Entrer Rib"
                          required
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
                          data-choices
                          data-choices-search-false
                          id="choices-payment-status"
                          required
                        >
                          <option value="">Selectionner Etat</option>
                          <option value="1">Actif</option>
                          <option value="0">Inactif</option>
                        </select>
                      </div>
                    </Col>
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
                  </Row>
                </div>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    variant="light"
                    onClick={() => {
                      tog_AddSellerModals();
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

          <Row id="seller-list">
            {data.map((fournisseur) => (
              <Col xxl={3} lg={6} key={fournisseur.idfournisseur}>
                <Card>
                  <Card.Body className="p-4">
                    <div className="avatar-md mx-auto">
                      <div className="avatar-title bg-light rounded">
                        <img
                          src={`data:image/jpeg;base64, ${fournisseur.logo}`}
                          alt=""
                          className="avatar-lg"
                        />
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <Link to="/seller-overview">
                        <h5 className="mb-1">{fournisseur.raison_sociale}</h5>
                      </Link>
                      {fournisseur.type === 0 ? (
                        <span className="badge badge-soft-danger text-uppercase">
                          inactif
                        </span>
                      ) : (
                        <span className="badge badge-soft-success text-uppercase">
                          actif
                        </span>
                      )}
                      <p className="text-muted fs-16 mb-4">
                        {fournisseur.adresse}
                      </p>
                    </div>
                    <Row>
                      <div className="col-6">
                        <div className="text-center">
                          <p className="text-muted mb-2 fs-15">Téléphone</p>
                          <h6 className="mb-0">{fournisseur.tel}</h6>
                        </div>
                      </div>
                      <div className="col-6 border-start border-start-dashed">
                        <div className="text-center">
                          <p className="text-muted mb-2 fs-15">E-mail</p>
                          <h6 className="mb-0">{fournisseur.mail}</h6>
                        </div>
                      </div>
                    </Row>
                    <div className="mt-4 hstack gap-2">
                      {/* <Button variant="soft-secondary" className="w-100">
                        Voir détails
                      </Button> */}
                      <Dropdown className="flex-shrink-0">
                        <Dropdown.Toggle className="btn btn-soft-info btn-icon arrow-none">
                          <i className="ph-dots-three-outline-vertical-fill"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu as="ul">
                          <li>
                            {" "}
                            <Dropdown.Item href="#" className="edit-list">
                              {" "}
                              Modifier{" "}
                            </Dropdown.Item>{" "}
                          </li>
                          <li>
                            {" "}
                            <Dropdown.Item
                              onClick={() =>
                                deleteHandler(fournisseur.idfournisseur)
                              }
                              className="remove-list"
                            >
                              {" "}
                              Supprimer{" "}
                            </Dropdown.Item>{" "}
                          </li>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {!currentpages && (
            <div id="noresult">
              <div className="text-center py-4">
                <div className="avatar-md mx-auto mb-4">
                  <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                    <i className="bi bi-search"></i>
                  </div>
                </div>
                <h5 className="mt-2">Sorry! No Result Found</h5>
              </div>
            </div>
          )}

          {pagination && (
            <Row className="mb-4" id="pagination-element">
              <Col lg={12}>
                <div className="pagination-block pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                  <div
                    className={
                      currentPage <= 1 ? "page-item disabled" : "page-item"
                    }
                  >
                    <Button
                      variant="link"
                      href="#"
                      className="page-link"
                      id="page-prev"
                      onClick={() => handleprevPage()}
                    >
                      <i className="mdi mdi-chevron-left" />
                    </Button>
                  </div>
                  <span id="page-num" className="pagination">
                    {pageNumbers.map((item: any, key: any) => (
                      <React.Fragment key={key}>
                        <div
                          className={
                            currentPage === item
                              ? "page-item active"
                              : "page-item"
                          }
                        >
                          <Link
                            className="page-link clickPageNumber"
                            to="#"
                            key={key}
                            id={item}
                            onClick={(e) => handleClick(e)}
                          >
                            {item}
                          </Link>
                        </div>
                      </React.Fragment>
                    ))}
                  </span>
                  <div
                    className={
                      currentPage >= pageNumbers.length
                        ? "page-item disabled"
                        : "page-item"
                    }
                  >
                    <Button
                      variant="link"
                      href="#"
                      className="page-link"
                      id="page-next"
                      onClick={() => handlenextPage()}
                    >
                      <i className="mdi mdi-chevron-right" />
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default SellersGridView;
