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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/de";
import dayjs from "dayjs";
import PaiementTotal from "./PaiementTotal";
import PaiementEspece from "./PaiementEspece";
import PaiementCheque from "./PaiementCheque";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  ArrivageProduit,
  useGetAllArrivagesProduitQuery,
} from "features/arrivageProduit/arrivageProduitSlice";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFetchOneUserQuery } from "features/compte/compteSlice";
import {
  ClientMorale,
  useAddClientMoraleMutation,
  useFetchClientMoralesQuery,
} from "features/clientMoral/clientMoralSlice";

interface FormFields {
  nomproduit: string;
  prixunitaire: string;
  qty: string;
  benifice: string;
  montanttotal: string;
  subTotal: string;
  [key: string]: string;
}

const ProInvoice: React.FC = () => {
  document.title = "Créer Facture | Radhouani";

  const [pourcentageBenifice, setPourcentageBenifice] = useState<number>();
  const onChangePourcentageBenifice = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPourcentageBenifice(parseInt(event.target.value));
  };

  const [selectedd, setSelectedd] = useState("Paiement total en espèces");
  const { data: allArrivageProduit = [] } = useGetAllArrivagesProduitQuery();
  const handleChangeselect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedd(e.target.value);
  };

  const [inputFields, setInputFields] = useState<string[]>([""]);

  const handleAddFields = () => {
    const newInputFields = [...inputFields];
    newInputFields.push("");
    setInputFields(newInputFields);
  };

  const handleRemoveFields = (index: number) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

  const [value, setValue] = useState<string>("");
  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = event.target.value;
    setInputFields(newInputFields);
    setValue(event.target.value);
  };

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
  const { data: allClientMorale = [], isLoading } =
    useFetchClientMoralesQuery();

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

  const [state, setState] = useState({ loading: false });
  const onClientMoraleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createClientMorale(clientMData).then(() => setClientMData(clientMData));
    setState({ ...state, loading: true });
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

  // The selected drink
  const [selectedReglement, setSelectedReglement] = useState<String>();

  // This function will be triggered when a radio button is selected
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReglement(event.target.value);
  };

  const [acValue, setACValue] = useState<ArrivageProduit | null>(
    allArrivageProduit[0]
  );
  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    stateVal: ArrivageProduit | null
  ) => {
    event.preventDefault();
  };
  let transactionId = `${new Date().getDate()}${new Date().getHours()}${new Date().getSeconds()}${new Date().getMilliseconds()}`;
  const [count, setCount] = useState<number | undefined>();

  const [clientValue, setClientValue] = useState<ClientMorale | null>(
    clientMorale[0]
  );

  let now = dayjs();

  const [formFields, setFormFields] = useState<FormFields[]>([
    {
      nomproduit: "",
      prixunitaire: "",
      qty: "",
      benifice: "",
      montanttotal: "",
      subTotal: "",
    },
  ]);

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formFields);
  };
  const montantTotal =
    formFields.reduce((sum, i) => (sum += parseInt(i.montanttotal!)), 0) || 0;

  const addFields = () => {
    let object: FormFields = {
      nomproduit: "",
      prixunitaire: "",
      qty: "",
      benifice: "",
      montanttotal: "",
      subTotal: "",
    };
    setFormFields([...formFields, object]);
  };

  const removeFields = (index: number) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  // Modal to create a new client physique
  const [modal_AddCodeUser, setmodal_AddCodeUser] = useState<boolean>(false);
  function tog_AddCodeUser() {
    setmodal_AddCodeUser(!modal_AddCodeUser);
  }

  const rem = 100 - (count! * 100) / montantTotal;

  const [displayText, setDisplayText] = useState<string>("");

  const [codeClient, setCodeClient] = useState<string>("");
  const onChangeCodeClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeClient(e.target.value);
  };

  const { data: OneUser } = useFetchOneUserQuery(codeClient);

  const handleSubmitCodeClient = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayText(codeClient);
    tog_AddCodeUser();
  };

  return (
    <Container fluid={true}>
      <Row className="justify-content-center">
        <Col xxl={12}>
          <Card>
            <Form
              className="needs-validation"
              id="invoice_form"
              onSubmit={(event) => handleSubmit(event, acValue)}
            >
              <Card.Body className="border-bottom border-bottom-dashed p-4">
                <Row>
                  <Col lg={4}>
                    <div>
                      <div className="input-group d-flex gap-2 mb-2">
                        <Autocomplete
                          id="nomClient"
                          sx={{ width: 300 }}
                          options={clientMorale!}
                          autoHighlight
                          onChange={(event, value) => setClientValue(value)}
                          getOptionLabel={(option) => option.raison_sociale!}
                          renderOption={(props, option) => (
                            <li {...props} key={option.idclient_m}>
                              {option.raison_sociale}
                            </li>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Nom Client"
                              inputProps={{
                                ...params.inputProps,
                              }}
                              size="small"
                            />
                          )}
                        />
                        <Button
                          onClick={() => tog_AddClientMoraleModals()}
                          variant="info"
                          size="sm"
                          className="rounded"
                        >
                          <i className="ri-user-add-line ri-xl"></i>
                        </Button>
                      </div>
                      {selected.map((s) => {
                        return (
                          <div className="mb-2">
                            <strong>Raison Sociale: </strong>
                            <span>{s.raison_sociale}</span>

                            <div>
                              <strong>Matricule Fiscale: </strong>
                              <span>{s.mat}</span>
                            </div>
                            <div>
                              <strong>Numéro Téléphone: </strong>
                              <span>{s.tel}</span>
                            </div>
                            <div className="mb-2">
                              <strong>Adresse: </strong>
                              <span>{s.adresse}</span>
                            </div>
                            <div className="mb-2 mb-lg-0">
                              <strong>Email: </strong>
                              <span>{s.mail}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Col>
                  <Col lg={3} sm={6}>
                    <TextField
                      label=" Numero Facture"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                      size="small"
                      type="text"
                      id="invoicenoInput"
                      placeholder="#VL25000355"
                    />
                  </Col>
                  <Col lg={3} sm={6}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="de"
                    >
                      <DatePicker
                        defaultValue={now}
                        slotProps={{
                          textField: {
                            size: "small",
                            inputProps: { ["placeholder"]: "JJ.MM.AAAA" },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Body className="p-4">
                <div>
                  <Row>
                    <Col lg={5}>
                      <Form.Label htmlFor="nomProduit">
                        Détail Produit
                      </Form.Label>
                    </Col>
                    <Col lg={2}>
                      <Form.Label htmlFor="PrixUnitaire">
                        Prix Unitaire
                      </Form.Label>
                    </Col>
                    <Col lg={1}>
                      <Form.Label htmlFor="Benifice">Benifice</Form.Label>
                    </Col>
                    <Col lg={1}>
                      <Form.Label htmlFor="Quantite">Quantité</Form.Label>
                    </Col>
                    <Col lg={2}>
                      <Form.Label htmlFor="Montant">Montant</Form.Label>
                    </Col>

                    <Col lg={1}></Col>
                  </Row>
                  {formFields.map((form, index) => (
                    <Row style={{ marginBottom: 20 }} key={index}>
                      <Col lg={5}>
                        <Autocomplete
                          id="nomProduit"
                          sx={{ width: 440 }}
                          options={allArrivageProduit}
                          autoHighlight
                          onChange={(event, value) => setACValue(value)}
                          getOptionLabel={(option) => option.nomProduit!}
                          renderOption={(props, option) => (
                            <li {...props} key={option.idArrivageProduit}>
                              {option.nomProduit}__{option.dateArrivage}
                            </li>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Référence"
                              inputProps={{
                                ...params.inputProps,
                              }}
                              size="small"
                              fullWidth
                            />
                          )}
                        />
                      </Col>
                      <Col lg={2}>
                        <TextField
                          id="PrixUnitaire"
                          type="number"
                          size="small"
                          name="prixunitaire"
                          placeholder="prixunitaire"
                          onChange={(event) => handleFormChange(event, index)}
                          value={form.prixunitaire}
                        />
                      </Col>
                      <Col lg={1}>
                        <TextField
                          id="benifice"
                          type="number"
                          size="small"
                          name="benifice"
                          defaultValue={form.benifice}
                          placeholder="0.0"
                          onChange={(event) => {
                            handleFormChange(event, index),
                              onChangePourcentageBenifice;
                          }}
                          value={pourcentageBenifice}
                        />
                      </Col>
                      <Col lg={1}>
                        <TextField
                          id="Quantite"
                          type="number"
                          size="small"
                          name="qty"
                          placeholder="0.0"
                          onChange={(event) => handleFormChange(event, index)}
                          value={form.qty}
                        />
                      </Col>
                      <Col lg={2}>
                        <TextField
                          id="Montant"
                          size="small"
                          type="number"
                          name="montanttotal"
                          placeholder="0.0"
                          onChange={(event) => handleFormChange(event, index)}
                          value={
                            (form.montanttotal = (
                              (parseInt(form.prixunitaire) +
                                parseInt(form.prixunitaire) *
                                  (pourcentageBenifice! / 100)) *
                              parseInt(form.qty)
                            ).toString())
                          }
                        />
                      </Col>
                      <Col lg={1} style={{ marginTop: 13 }}>
                        <Link
                          to="#"
                          className="link-danger"
                          onClick={() => removeFields(index)}
                        >
                          <i className="ri-delete-bin-5-line ri-xl" />
                        </Link>
                      </Col>
                    </Row>
                  ))}
                  <Row>
                    <Col id="newForm" style={{ display: "none" }}>
                      <div className="d-none">
                        <p>Add New Form</p>
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <Link
                          to="#"
                          id="add-item"
                          className="btn btn-soft-secondary fw-medium"
                          onClick={addFields}
                        >
                          <i className="ri-add-fill me-1 align-bottom"></i>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
                <Row className="border-top border-top-dashed mt-2">
                  <Col lg={9}></Col>
                  <Col lg={3} className="mt-3">
                    <TextField
                      label="Total"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                      size="small"
                      type="number"
                      name="subTotal"
                      value={
                        formFields.reduce(
                          (sum, i) => (sum += parseInt(i.montanttotal!)),
                          0
                        ) || (0).toString()
                      }
                      id="cart-subtotal"
                      placeholder="0.00"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={9}>
                    <Row className="mt-3">
                      <Col lg={7}>
                        <div className="mb-2">
                          <Form.Label htmlFor="choices-payment-status">
                            Reglement
                          </Form.Label>
                          <p>
                            <input
                              className="m-2"
                              type="radio"
                              name="reglement"
                              value="Paiement total en espèces"
                              id="Paiement total en espèces"
                              onChange={radioHandler}
                            />
                            <label htmlFor="Paiement total en espèces">
                              Total en espèces
                            </label>
                            <input
                              className="m-2"
                              type="radio"
                              name="reglement"
                              value="Paiement partiel espèces"
                              id="Paiement partiel espèces"
                              onChange={radioHandler}
                            />
                            <label htmlFor="Paiement partiel espèces">
                              Partiel espèces
                            </label>
                            <input
                              className="m-2"
                              type="radio"
                              name="reglement"
                              value="Paiement partiel chèque"
                              id="Paiement partiel chèque"
                              onChange={radioHandler}
                            />
                            <label htmlFor="Paiement partiel chèque">
                              Partiel chèque
                            </label>
                          </p>
                          {selectedReglement === "Paiement total en espèces" ? (
                            <>
                              <PaiementTotal setCount={setCount} />
                            </>
                          ) : (
                            ""
                          )}

                          {selectedReglement === "Paiement partiel espèces" ? (
                            <PaiementEspece />
                          ) : (
                            ""
                          )}

                          {selectedReglement === "Paiement partiel chèque" ? (
                            <PaiementCheque />
                          ) : (
                            ""
                          )}
                        </div>
                      </Col>
                      {selectedReglement === "Paiement total en espèces" ? (
                        <Col lg={3} sm={6}>
                          <Form.Label htmlFor="choices-payment-status">
                            Status de Payement
                          </Form.Label>
                          <div>
                            <p className="fs-15 badge badge-soft-success">
                              Payé
                            </p>
                          </div>
                        </Col>
                      ) : (
                        ""
                      )}
                      {selectedReglement === "Paiement partiel espèces" ? (
                        <Col lg={3} sm={6}>
                          <Form.Label htmlFor="choices-payment-status">
                            Status de Payement
                          </Form.Label>
                          <div>
                            <p className="fs-15 badge badge-soft-danger">
                              Impayé
                            </p>
                          </div>
                        </Col>
                      ) : (
                        ""
                      )}
                      {selectedReglement === "Paiement partiel chèque" ? (
                        <Col lg={3} sm={6}>
                          <Form.Label htmlFor="choices-payment-status">
                            Status de Payement
                          </Form.Label>
                          <div>
                            <p className="fs-15 badge badge-soft-warning">
                              Semi-Payé
                            </p>
                          </div>
                        </Col>
                      ) : (
                        ""
                      )}
                    </Row>
                  </Col>
                  <Col lg={2} className="mt-3">
                    <TextField
                      label="% Bénifice"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      type="number"
                      name="benifice"
                      onChange={onChangePourcentageBenifice}
                      value={pourcentageBenifice}
                      id="benifice"
                      placeholder="0.00"
                    />
                  </Col>
                </Row>
                <div className="hstack gap-2 justify-content-end d-print-none mt-3">
                  <Button
                    variant="success"
                    type="submit"
                    onClick={() => tog_AddCodeUser()}
                  >
                    <i className="ri-hand-coin-line align-bottom me-1"></i>{" "}
                    Paiement
                  </Button>
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
      {/* ******Modal For Client Physique****** */}
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
          <Form className="tablelist-form">
            <Row>
              <div
                id="alert-error-msg"
                className="d-none alert alert-danger py-2"
              ></div>
              <input type="hidden" id="id-field" />
              <Col lg={12}>
                <div className="text-center mb-3">
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
              <Col lg={6} className="mt-2">
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
              <Col lg={6} className="mt-2">
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
              <Col lg={4}>
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
              <Col lg={3}>
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
              <Col lg={5}>
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
              <Col lg={5}>
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
              <Col lg={3}>
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
              <Col lg={4}>
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
      {/* ******Modal For User****** */}
      <Modal
        id="showModal"
        className="fade zoomIn"
        size="sm"
        show={modal_AddCodeUser}
        onHide={() => {
          tog_AddCodeUser();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Ajouter Code
          </h5>
        </Modal.Header>
        <Modal.Body className="text-center p-4">
          <Form className="tablelist-form">
            <Row>
              <div
                id="alert-error-msg"
                className="d-none alert alert-danger py-2"
              ></div>
              <input type="hidden" id="id-field" />
              <Col lg={6}>
                <TextField
                  label="Code"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ maxLength: 3 }}
                  size="small"
                  type="text"
                  id="codeInput"
                  placeholder="185"
                  onChange={onChangeCodeClient}
                />
              </Col>
              <Col lg={6}>
                <div className="gap-2">
                  <Button
                    type={"submit"}
                    variant="primary"
                    id="add-btn"
                    onClick={handleSubmitCodeClient}
                  >
                    <i className="ri-add-box-line"></i>
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
