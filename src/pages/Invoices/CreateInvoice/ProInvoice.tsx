import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
  Modal,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import Flatpickr from "react-flatpickr";

// Import Images
import logoDark from "assets/images/logo-dark.png";
import logoLight from "assets/images/logo-light.png";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import {
  ClientMorale,
  useAddClientMoraleMutation,
  useFetchClientMoralesQuery,
} from "features/clientMoral/clientMoralSlice";

const ProInvoice = () => {
  document.title = "Créer Facture | Radhouani";

  const [clientMorale, setClientMorale] = useState<ClientMorale[]>([]);
  const [selected, setSelected] = useState<ClientMorale[]>([]);
  const [clientid, setClientid] = useState("");

  useEffect(() => {
    const getClientMorale = async () => {
      const reqdata = await fetch(
        "http://localhost:8000/clientMo/moraleclients"
      );
      const resdata = await reqdata.json();
      console.log(resdata);
      setClientMorale(resdata);
    };
    getClientMorale();
  }, []);

  const handleClient = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const clientMoraleid = e.target.value;
    if (clientMoraleid !== "") {
      const reqstatedata = await fetch(
        `http://localhost:8000/clientMo/oneClientMorale/${clientMoraleid}`
      );
      const resstatedata = await reqstatedata.json();
      setSelected(await resstatedata);
      console.log(reqstatedata);
      setClientid(clientMoraleid);
    } else {
      setSelected([]);
    }
    console.log(clientMoraleid);
  };

  //Query to Fetch All Client Morale
  const { data: allClientMorale = [] } = useFetchClientMoralesQuery();

  // Mutation to create a new Client
  const [createClientMorale] = useAddClientMoraleMutation();

  //Toast Notification For Client Morale
  const notifyClientMorale = () => {
    toast.success("Le client morale a été créé avec succès", {
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

  const [clientMData, setClientMData] = useState({
    idclient_m: 99,
    raison_sociale: "",
    adresse: "",
    tel: 14785236,
    mail: "",
    mat: 1,
    logo: "",
    rib: 1142250,
    etat: 1,
    remarque: "",
    credit: 123,
    piecejointes: "",
  });

  const {
    raison_sociale,
    adresse,
    tel,
    mail,
    mat,
    logo,
    rib,
    etat,
    remarque,
    credit,
    piecejointes,
  } = clientMData;

  const onClientMoraleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientMData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onClientMoraleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createClientMorale(clientMData).then(() => setClientMData(clientMData));
    notifyClientMorale();
  };

  const handleClientMoraleFileUpload = async (
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

    setClientMData({
      ...clientMData,
      logo: base64 as string,
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

  // Modal to create a new client morale
  const [modal_AddClientMoraleModals, setmodal_AddClientMoraleModals] =
    useState<boolean>(false);
  function tog_AddClientMoraleModals() {
    setmodal_AddClientMoraleModals(!modal_AddClientMoraleModals);
  }

  return (
    <Container fluid={true}>
      <Breadcrumb title="Créer Facture Pro" pageTitle="Factures" />

      <Row className="justify-content-center">
        <Col xxl={9}>
          <Card>
            <Form className="needs-validation" id="invoice_form">
              <Card.Body className="border-bottom border-bottom-dashed p-4">
                <Row>
                  <Col lg={4}>
                    <div className="profile-user mx-auto mb-3">
                      <input
                        id="profile-img-file-input"
                        type="file"
                        className="profile-img-file-input"
                      />
                      <label
                        htmlFor="profile-img-file-input"
                        className="d-block"
                      >
                        <span
                          className="overflow-hidden border border-dashed d-flex align-items-center justify-content-center rounded"
                          style={{ height: "60px", width: "256px" }}
                        >
                          <img
                            src={logoDark}
                            className="card-logo card-logo-dark user-profile-image img-fluid"
                            alt="logo dark"
                          />
                          <img
                            src={logoLight}
                            className="card-logo card-logo-light user-profile-image img-fluid"
                            alt="logo light"
                          />
                        </span>
                      </label>
                    </div>
                    <div>
                      <div className="mb-3">
                        <select
                          className="form-select"
                          id="choices-category-input"
                          name="choices-category-input"
                          onChange={handleClient}
                        >
                          <option value="">Selectionner Client</option>
                          {clientMorale.map((clientm) => (
                            <option
                              key={clientm.idclient_m}
                              value={clientm.idclient_m}
                            >
                              {clientm.raison_sociale}
                            </option>
                          ))}
                        </select>
                        {selected.map((s) => {
                          return (
                            <div className="mb-2">
                              <Form.Control
                                type="text"
                                id="registrationNumber"
                                value={s.raison_sociale}
                                placeholder="Nom Client Pro"
                                required
                              />
                              <div className="invalid-feedback">
                                Please enter a registration no, Ex.,
                                012345678912
                              </div>
                              <div>
                                <Form.Control
                                  type="number"
                                  data-plugin="cleave-phone"
                                  id="compnayContactno"
                                  placeholder="Matricule Fiscale"
                                  value={s.mat}
                                  required
                                />
                                <div className="invalid-feedback">
                                  Please enter a contact number
                                </div>
                              </div>
                              <div>
                                <Form.Control
                                  type="number"
                                  data-plugin="cleave-phone"
                                  id="compnayContactno"
                                  value={s.tel}
                                  placeholder="Numéro Téléphone"
                                  required
                                />
                                <div className="invalid-feedback">
                                  Please enter a contact number
                                </div>
                              </div>
                              <div className="mb-2">
                                <textarea
                                  className="form-control"
                                  id="companyAddress"
                                  value={s.adresse}
                                  placeholder="Taper votre adresse"
                                />
                                <div className="invalid-feedback">Adresse</div>
                              </div>
                              <div className="mb-2 mb-lg-0"></div>
                              <div className="mb-2">
                                <Form.Control
                                  type="email"
                                  id="companyEmail"
                                  value={s.mail}
                                  placeholder="Adresse e-mail"
                                  required
                                />
                                <div className="invalid-feedback">
                                  Please enter a valid email, Ex.,
                                  example@gamil.com
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Col>
                  <Col lg={4}></Col>
                  <Col lg={4}>
                    <div className="mb-2">
                      <span>
                        <strong>Matricule Fiscale:</strong>{" "}
                        <span>147852369</span>
                      </span>
                      <div className="mb-2">
                        <span>
                          <strong>Adresse:</strong>{" "}
                          <span>Cite Ennour, Gafsa</span>
                          <br />
                          <span> </span>
                          <span>2123, Gafsa</span>
                        </span>
                      </div>
                      <div className="mb-2 mb-lg-0">
                        <span>
                          <strong>Tél:</strong> <span>76001002</span>
                        </span>
                      </div>
                      <div className="mb-2">
                        <span>
                          <strong>Email:</strong>{" "}
                          <span>radhouani@gmail.com</span>
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <Button onClick={() => tog_AddClientMoraleModals()}>
                      Ajouter Nouveau Client
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Body className="p-4">
                <Row className="g-3">
                  <Col lg={3} sm={6}>
                    <Form.Label htmlFor="invoicenoInput">
                      Numero Facture
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="invoicenoInput"
                      placeholder="Numero Facture"
                      defaultValue="#VL25000355"
                    />
                  </Col>
                  <Col lg={3} sm={6}>
                    <div>
                      <Form.Label htmlFor="date-field">Date</Form.Label>
                      <Flatpickr
                        className="form-control flatpickr-input"
                        placeholder="Selectionner Date"
                        options={{
                          dateFormat: "d M, Y",
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={3} sm={6}>
                    <Form.Label htmlFor="choices-payment-status">
                      Status de Payement
                    </Form.Label>
                    <select
                      className="form-select"
                      data-choices
                      data-choices-search-false
                      id="choices-payment-status"
                      required
                    >
                      <option value="">Selectionner Status</option>
                      <option value="Paid">Payé</option>
                      <option value="Unpaid">Impayé</option>
                      <option value="Refund">Rembourser</option>
                    </select>
                  </Col>
                  <Col lg={3} sm={6}>
                    <div>
                      <Form.Label htmlFor="totalamountInput">
                        Montant Total
                      </Form.Label>
                      <span>1780</span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Body className="p-4">
                <div className="table-responsive">
                  <Table className="invoice-table table-borderless table-nowrap mb-0">
                    <thead className="align-middle">
                      <tr className="table-active">
                        <th scope="col" style={{ width: "50px" }}>
                          #
                        </th>
                        <th scope="col">Details Produit</th>
                        <th scope="col" style={{ width: "120px" }}>
                          <div className="d-flex currency-select input-light align-items-center">
                            Prix unitaire
                          </div>
                        </th>
                        <th scope="col" style={{ width: "120px" }}>
                          Quantité
                        </th>
                        <th
                          scope="col"
                          className="text-end"
                          style={{ width: "180px" }}
                        >
                          Montant
                        </th>
                        <th
                          scope="col"
                          className="text-end"
                          style={{ width: "105px" }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody id="newlink">
                      <tr id="1" className="product">
                        <th scope="row" className="product-id">
                          1
                        </th>
                        <td className="text-start">
                          <div className="mb-2">
                            <Form.Control
                              type="text"
                              id="productName-1"
                              placeholder="Ref. Art"
                              required
                            />
                            <div className="invalid-feedback">
                              Please enter a product name
                            </div>
                          </div>
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            className="product-price"
                            id="productRate-1"
                            step="0.01"
                            placeholder="0.00"
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter a rate
                          </div>
                        </td>
                        <td>
                          <div className="input-step">
                            <Button className="minus">–</Button>
                            <input
                              type="number"
                              className="product-quantity"
                              id="product-qty-1"
                              defaultValue="0"
                            />
                            <Button className="plus">+</Button>
                          </div>
                        </td>
                        <td className="text-end">
                          <div>
                            <Form.Control
                              type="number"
                              className="product-line-price"
                              id="productPrice-1"
                              placeholder="$0.00"
                            />
                          </div>
                        </td>
                        <td className="product-removal">
                          <Link to="#" className="btn btn-danger">
                            Supprimer
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr id="newForm" style={{ display: "none" }}>
                        <td className="d-none">
                          <p>Add New Form</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Link
                            to="#"
                            id="add-item"
                            className="btn btn-soft-secondary fw-medium"
                          >
                            <i className="ri-add-fill me-1 align-bottom"></i>{" "}
                            Ajouter élement
                          </Link>
                        </td>
                      </tr>
                      <tr className="border-top border-top-dashed mt-2">
                        <td colSpan={3}></td>
                        <td className="p-0" colSpan={2}>
                          <Table className="table-borderless table-sm table-nowrap align-middle mb-0">
                            <tbody>
                              <tr>
                                <th scope="row">Total</th>
                                <td style={{ width: "150px" }}>
                                  <Form.Control
                                    type="number"
                                    id="cart-subtotal"
                                    placeholder="0.00"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Taxe (19%)</th>
                                <td>
                                  <Form.Control
                                    type="number"
                                    id="cart-tax"
                                    placeholder="$0.00"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Reduction </th>
                                <td>
                                  <Form.Control
                                    type="number"
                                    id="cart-discount"
                                    placeholder="$0.00"
                                  />
                                </td>
                              </tr>
                              <tr className="border-top border-top-dashed">
                                <th scope="row">Montant Total</th>
                                <td>
                                  <Form.Control
                                    type="number"
                                    id="cart-total"
                                    placeholder="0.00"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <Row className="mt-3">
                  <Col lg={4}>
                    <div className="mb-2">
                      <Form.Label
                        htmlFor="choices-payment-type"
                        className="text-muted text-uppercase fw-semibold"
                      >
                        Payment Details
                      </Form.Label>
                      <select
                        className="form-select"
                        data-choices
                        data-choices-search-false
                        id="choices-payment-type"
                      >
                        <option value="">Methode de Payement</option>
                        <option value="Mastercard">Espèce</option>
                        <option value="Credit Card">par chèque</option>
                        <option value="Visa">Visa</option>
                      </select>
                    </div>
                    <div>
                      <Form.Control
                        type="number"
                        id="amountTotalPay"
                        placeholder="0.00"
                      />
                    </div>
                  </Col>
                </Row>
                <div className="mt-4">
                  <Form.Label
                    htmlFor="exampleFormControlTextarea1"
                    className="text-muted text-uppercase fw-semibold"
                  >
                    NOTES
                  </Form.Label>
                  <textarea
                    className="form-control alert alert-warning"
                    id="exampleFormControlTextarea1"
                    placeholder="Notes"
                    defaultValue="Tous les comptes doivent être payés dans les 7 jours suivant la réception de la facture. A régler par chèque ou carte bancaire ou paiement direct en ligne."
                  />
                </div>
                <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                  <Button variant="success" type="submit">
                    <i className="ri-printer-line align-bottom me-1"></i>{" "}
                    Enregister
                  </Button>
                  <Link to="#" className="btn btn-primary">
                    <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                    Telecharger Facture
                  </Link>
                </div>
              </Card.Body>
            </Form>
          </Card>
        </Col>
      </Row>
      {/* ******Modal For Client Morale****** */}
      <Modal
        id="showModal"
        className="fade zoomIn"
        size="lg"
        show={modal_AddClientMoraleModals}
        onHide={() => {
          tog_AddClientMoraleModals();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Ajouter Client Morale
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form className="tablelist-form" onSubmit={onClientMoraleSubmit}>
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
                        name="logo"
                        id="logo"
                        accept="image/*"
                        onChange={(e) => handleClientMoraleFileUpload(e)}
                      />
                    </div>
                    <div className="avatar-lg">
                      <div className="avatar-title bg-light rounded-3">
                        <img
                          src={`data:image/jpeg;base64, ${clientMData.logo}`}
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
              <Col lg={12}>
                <div className="mb-3">
                  <Form.Label htmlFor="raison_sociale">
                    Raison Sociale
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={clientMData.raison_sociale}
                    onChange={onClientMoraleChange}
                    id="raison_sociale"
                    placeholder="Taper Raison sociale"
                    required
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="mat">Matricule Fiscale</Form.Label>
                  <Form.Control
                    type="text"
                    value={clientMData.mat}
                    onChange={onClientMoraleChange}
                    id="mat"
                    placeholder="Taper matricule fiscale"
                    required
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="rib">RIB</Form.Label>
                  <Form.Control
                    type="text"
                    value={clientMData.rib}
                    onChange={onClientMoraleChange}
                    id="rib"
                    placeholder="Taper RIB "
                    required
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="tel">Telephone</Form.Label>
                  <Form.Control
                    type="text"
                    value={clientMData.tel}
                    onChange={onClientMoraleChange}
                    id="tel"
                    placeholder="Taper numéro"
                    required
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="adresse">Adresse</Form.Label>
                  <Form.Control
                    type="text"
                    value={clientMData.adresse}
                    onChange={onClientMoraleChange}
                    id="adresse"
                    placeholder="Taper l'adresse du fournisseur"
                    required
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="mail">E-mail</Form.Label>
                  <Form.Control
                    type="text"
                    value={clientMData.mail}
                    onChange={onClientMoraleChange}
                    id="mail"
                    placeholder="Taper e-mail"
                    required
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="etat">Etat</Form.Label>
                  <select
                    className="form-select"
                    data-choices
                    data-choices-search-false
                    id="choices-payment-status"
                    required
                  >
                    <option value="">Selectionner Etat</option>
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="remarque">Remarque</Form.Label>
                  <Form.Control
                    type="text"
                    value={clientMData.remarque}
                    onChange={onClientMoraleChange}
                    id="remarque"
                    placeholder="Taper remarque"
                    required
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="credit">Credit</Form.Label>
                  <Form.Control
                    type="text"
                    value={clientMData.credit}
                    onChange={onClientMoraleChange}
                    id="credit"
                    placeholder="Entrer crédit"
                    required
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <label htmlFor="avatar" className="form-label d-block">
                    Piece Jointes <span className="text-danger">*</span>
                  </label>

                  <div className="position-relative d-inline-block">
                    <div className="position-absolute top-100 start-100 translate-middle">
                      <label
                        htmlFor="piecejointes"
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
                        name="piecejointes"
                        id="piecejointes"
                        accept="image/*"
                        onChange={(e) => handleClientMoraleFileUpload(e)}
                      />
                    </div>
                    <div className="avatar-lg">
                      <div className="avatar-title bg-light rounded-3">
                        <img
                          src={`data:image/jpeg;base64, ${clientMData.piecejointes}`}
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
              {/* <Col lg={6}>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="ProductSelect">Product Type</Form.Label>
                                            <select className="form-select" name="categorySelect" id="productType-field">
                                                <option value="">Select Product</option>
                                                <option value="Headphone">Headphone</option>
                                                <option value="Watch">Watch</option>
                                                <option value="Furniture">Furniture</option>
                                                <option value="Clothing">Clothing</option>
                                                <option value="Footwear">Footwear</option>
                                                <option value="Lighting">Lighting</option>
                                                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                                                <option value="Books">Books</option>
                                                <option value="Other Accessories">Other Accessories</option>
                                            </select>
                                        </div> */}
              {/* </Col> */}
              {/* <Col lg={6}>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="startDate">Start Date</Form.Label>
                                            {/* <Form.Control type="text" id="startdate-field" data-provider="flatpickr" data-date-format="d M, Y" placeholder="Select date" required/> */}
              {/* <Flatpickr
                                                className="form-control flatpickr-input"
                                                placeholder='Select date'
                                                options={{
                                                    dateFormat: "d M, Y",
                                                }}
                                            />
                                        </div>
                                    </Col> */}
              {/* <Col lg={6}>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="endDate">END Date</Form.Label>
                                            <Flatpickr
                                                className="form-control flatpickr-input"
                                                placeholder='Select date'
                                                options={{
                                                    dateFormat: "d M, Y",
                                                }}
                                            />
                                        </div>
                                    </Col> */}
              <Col lg={12} className="modal-footer">
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddClientMoraleModals();
                    }}
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Fermer
                  </Button>
                  <Button
                    onClick={() => {
                      tog_AddClientMoraleModals();
                    }}
                    type={"submit"}
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
      <ToastContainer />
    </Container>
  );
};

export default ProInvoice;