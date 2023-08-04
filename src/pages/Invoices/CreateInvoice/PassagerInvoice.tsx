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
import dayjs, { Dayjs } from "dayjs";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PaiementTotal from "./PaiementTotal";
import PaiementEspece from "./PaiementEspece";
import PaiementCheque from "./PaiementCheque";
import {
  ClientPhysique,
  useAddClientPhysiqueMutation,
} from "features/clientPhysique/clientPhysiqueSlice";
import { Facture, useAddFactureMutation } from "features/facture/factureSlice";
import {
  ArrivageProduit,
  useGetAllArrivagesProduitQuery,
  useGetOneArrivProduitQuery,
} from "features/arrivageProduit/arrivageProduitSlice";
import {
  LigneVente,
  useCreateNewLigneVenteMutation,
} from "features/ligneVente/ligneVenteSlice";
import Swal from "sweetalert2";

interface FormFields {
  nomproduit: string;
  prixunitaire: string;
  qty: string;
  montanttotal: string;
  subTotal: string;
  [key: string]: string;
}

const PassagerInvoice: React.FC = () => {
  document.title = "Créer Facture | Radhouani";

  {
    /********** Client Physique *********/
  }
  const [clientPhysique, setClientPhysique] = useState<ClientPhysique[]>([]);
  const [selected, setSelected] = useState<ClientPhysique[]>([]);
  const [clientPhyId, setClientPhyId] = useState("");

  useEffect(() => {
    const getClientPhysique = async () => {
      const reqdata = await fetch("http://localhost:8000/clientPyh/clients");
      const resdata = await reqdata.json();
      setClientPhysique(resdata);
    };
    getClientPhysique();
  }, []);

  const handleClientPhy = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const clientPhysiqueId = e.target.value;
    if (clientPhysiqueId !== "") {
      const reqstatedata = await fetch(
        `http://localhost:8000/clientPyh/one/18`
      );
      const resstatedata = await reqstatedata.json();
      setSelected(await resstatedata);
      setClientPhyId(clientPhysiqueId);
    } else {
      setSelected([]);
    }
  };

  // Mutation to create a new Client
  const [createClientPhysique] = useAddClientPhysiqueMutation();

  const [clientValue, setClientValue] = useState<ClientPhysique | null>(
    clientPhysique[0]
  );

  const [formData, setFormData] = useState({
    idclient_p: 99,
    raison_sociale: "",
    adresse: "",
    tel: "",
    mail: "",
    cin: "",
    avatar: "",
    rib: "",
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
    cin,
    avatar,
    rib,
    etat,
    remarque,
    credit,
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
    createClientPhysique(formData).then(() => setFormData(formData));
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileLogo = (
      document.getElementById("avatar") as HTMLInputElement
    ).files?.item(0) as File;
    const base64 = await convertToBase64(fileLogo);
    setFormData({
      ...formData,
      avatar: base64 as string,
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

  {
    /******  Arrivage/Produit *******/
  }
  // Get All Arrivage/Produit
  const { data: allArrivageProduit = [] } = useGetAllArrivagesProduitQuery();

  const [acValue, setACValue] = useState<ArrivageProduit | null>(
    allArrivageProduit[0]
  );
  const { data: OneArrivage } = useGetOneArrivProduitQuery(acValue?.produitID!);
  console.log("acValue", OneArrivage);
  const [ArriProdData, setArriProdData] = useState({
    idArrivageProduit: 1,
    produitID: 1,
    arrivageID: 1,
    quantite: 1,
    piecejointes: "",
    prixAchatHt: 1,
    prixAchatTtc: 1,
    prixVente: 1,
    Benifice: 1,
    PourcentageBenifice: 1,
    PrixRemise: 1,
    PourcentageRemise: 1,
    MontantTotalProduit: 1,
    nomProduit: "",
    designation: "",
    montantTotal: 1,
    dateArrivage: "",
    fournisseurID: 1,
  });

  const {
    idArrivageProduit,
    produitID,
    arrivageID,
    quantite,
    prixAchatHt,
    prixAchatTtc,
    prixVente,
    Benifice,
    PourcentageBenifice,
    PrixRemise,
    PourcentageRemise,
    MontantTotalProduit,
    nomProduit,
    designation,
    montantTotal,
    dateArrivage,
    fournisseurID,
  } = ArriProdData;

  {
    /*****  Facture ******/
  }
  let now = dayjs();
  const [value, setValue] = React.useState<Dayjs | null>(now);
  const newDate = `${value?.year()}-${value!.month() + 1}-${value!.date()}`;

  const [idFacture, setIdLigneVente] = useState(0);
  const [designationFacture, setDesignationFacture] = useState("");
  const [dateFacturation, setDateFacturation] = useState("");
  const [datePaiement, setDatePaiement] = useState("");
  const [modePaiement, setModePaiement] = useState("");
  const [statusFacture, setStatusFacture] = useState(0);
  const [clientID, setClientID] = useState(18);
  const [addFacture, { isLoading }] = useAddFactureMutation();

  async function handleAddFacture() {
    try {
      await addFacture({
        idFacture,
        designationFacture,
        dateFacturation: newDate,
        datePaiement,
        modePaiement,
        statusFacture,
        clientID: clientValue?.idclient_p!,
      }).unwrap();
      // setDesignationFacture("");
      setIdLigneVente(1);
      setDateFacturation("");
      setDatePaiement("");
      setModePaiement("");
      setStatusFacture(0);
      setClientID(18);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    localStorage.setItem(
      "facture",
      JSON.stringify({
        idFacture,
        designationFacture,
        dateFacturation: newDate,
        datePaiement,
        modePaiement,
        statusFacture,
        clientID: clientValue?.idclient_p,
      })
    );
  }, [
    {
      idFacture,
      designationFacture,
      dateFacturation: newDate,
      datePaiement,
      modePaiement,
      statusFacture,
      clientID: clientValue?.idclient_p,
    },
  ]);

  const factureValue = {
    idFacture: 1,
    designationFacture: "",
    dateFacturation: "",
    datePaiement: "",
    modePaiement: "",
    statusFacture: 1,
    clientID: 18,
  };
  const [createLigneVente] = useCreateNewLigneVenteMutation();
  const [factureData, setFactureData] = useState(factureValue);
  const [formFields, setFormFields] = useState<FormFields[]>([
    {
      nomproduit: acValue?.nomProduit!,
      prixunitaire: "",
      qty: "",
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
    setFactureData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };
  const addFields = (e: React.FormEvent) => {
    let object: FormFields = {
      nomproduit: "",
      prixunitaire: "",
      qty: "",
      montanttotal: "",
      subTotal: "",
    };
    setFormFields([...formFields, object]);
    handleAddFacture();
  };
  const removeFields = (index: number) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const [count, setCount] = useState<number | undefined>();
  const rem = 100 - (count! * 100) / montantTotal;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // addFacture(factureData).then(() => setFactureData(factureValue));
    console.log(formFields);
  };

  // Modal to create a new client physique
  const [modal_AddClientPhyModals, setmodal_AddClientPhyModals] =
    useState<boolean>(false);
  function tog_AddClientPhyModals() {
    setmodal_AddClientPhyModals(!modal_AddClientPhyModals);
  }

  // Modal to add code user
  const [modal_AddCodeUser, setmodal_AddCodeUser] = useState<boolean>(false);
  function tog_AddCodeUser() {
    setmodal_AddCodeUser(!modal_AddCodeUser);
  }

  const [displayText, setDisplayText] = useState<string>("");

  const [codeClient, setCodeClient] = useState<string>("");
  const onChangeCodeClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeClient(e.target.value);
  };

  const handleSubmitCodeClient = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayText(codeClient);
    tog_AddCodeUser();
  };

  // The selected Reglement
  const [selectedReglement, setSelectedReglement] = useState<String>();

  // This function will be triggered when a radio button is selected
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReglement(event.target.value);
  };

  return (
    <Container fluid={true}>
      <Row className="justify-content-center">
        <Col xxl={12}>
          <Card>
            <Form
              className="needs-validation"
              id="invoice_form"
              onSubmit={submit}
            >
              <Card.Body className="border-bottom border-bottom-dashed p-4">
                <Row>
                  <Col lg={4}>
                    <div>
                      <div className="input-group d-flex gap-2 mb-4">
                        <Autocomplete
                          id="clientID"
                          sx={{ width: 300 }}
                          options={clientPhysique!}
                          autoHighlight
                          onChange={(event, value) => setClientValue(value)}
                          getOptionLabel={(option) => option.raison_sociale!}
                          renderOption={(props, option) => (
                            <li {...props} key={option.idclient_p}>
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
                          onClick={() => tog_AddClientPhyModals()}
                          variant="info"
                          size="sm"
                          className="rounded"
                        >
                          <i className="ri-user-add-line ri-xl"></i>
                        </Button>
                      </div>
                    </div>
                  </Col>
                  <Col lg={3} sm={6}>
                    <TextField
                      label="Numero Facture"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      type="text"
                      id="designationFacture"
                      placeholder="25000355"
                      value={designationFacture}
                      onChange={(e) => setDesignationFacture(e.target.value)}
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
                            inputProps: { ["placeholder"]: "AAAA.MM.DD" },
                          },
                        }}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        format="DD-MM-YYYY"
                      />
                    </LocalizationProvider>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Body className="p-4">
                <div>
                  <Row>
                    <Col lg={4}>
                      <Form.Label htmlFor="nomProduit">
                        Détail Produit
                      </Form.Label>
                    </Col>
                    <Col lg={1}>
                      <Form.Label htmlFor="quantiteProduit">
                        Quantité
                      </Form.Label>
                    </Col>
                    <Col lg={2}>
                      <Form.Label htmlFor="PrixUnitaire">
                        Prix Unitaire
                      </Form.Label>
                    </Col>
                    <Col lg={2}>
                      <Form.Label htmlFor="MontantAR">
                        {" "}
                        PU après Remise
                      </Form.Label>
                    </Col>
                    <Col lg={2}>
                      <Form.Label htmlFor="MontantTotal">Montant </Form.Label>
                    </Col>
                    <Col lg={1}></Col>
                  </Row>
                  {formFields.map((form, index) => (
                    <Row style={{ marginBottom: 20 }} key={index}>
                      <Col lg={4}>
                        <Autocomplete
                          id="nomProduit"
                          sx={{ width: 380 }}
                          options={allArrivageProduit!}
                          autoHighlight
                          onChange={(event, value) => setACValue(value)}
                          getOptionLabel={(option) => option.nomProduit!}
                          renderOption={(props, option) => (
                            <li {...props} key={option.idArrivageProduit}>
                              {option.nomProduit}
                              ---
                              <strong>{option.dateArrivage}</strong>---
                              <span style={{ color: "red" }}>
                                ({option.quantite})
                              </span>
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
                            />
                          )}
                        />
                      </Col>
                      <Col lg={1} sm={6}>
                        <TextField
                          sx={{ width: 80 }}
                          id="quantiteProduit"
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
                          id="PrixUnitaire"
                          type="number"
                          size="small"
                          name="prixunitaire"
                          placeholder="00.00"
                          onChange={(event) => handleFormChange(event, index)}
                          sx={{ width: 190 }}
                          value={acValue?.prixVente}
                        />
                      </Col>
                      {montantTotal !== count ? (
                        <Col lg={2}>
                          <TextField
                            sx={{ width: 190 }}
                            id="MontantAR"
                            size="small"
                            type="number"
                            name="montanttotalAR"
                            placeholder="0.0"
                            value={(
                              parseInt(form.prixunitaire) -
                              (parseInt(form.prixunitaire) * rem) / 100
                            ).toFixed(3)}
                            onChange={(event) => handleFormChange(event, index)}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </Col>
                      ) : (
                        ""
                      )}
                      <Col lg={2} sm={6}>
                        <TextField
                          sx={{ width: 190 }}
                          id="MontantTotal"
                          size="small"
                          type="number"
                          name="montanttotal"
                          placeholder="0.0"
                          onChange={(event) => handleFormChange(event, index)}
                          value={
                            (form.montanttotal = (
                              parseInt(form.prixunitaire) * parseInt(form.qty)
                            ).toString())
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Col>
                      {index ? (
                        <Col lg={1} style={{ marginTop: 13 }}>
                          <Link
                            to="#"
                            className="link-danger"
                            onClick={() => removeFields(index)}
                          >
                            <i className="ri-delete-bin-5-line ri-xl" />
                          </Link>
                        </Col>
                      ) : (
                        ""
                      )}
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
                  <Col lg={9}>
                    {clientPhyId === "18" ? (
                      <Row className="mt-3">
                        <Col lg={8}>
                          <div className="mb-2">
                            <fieldset>
                              <legend>Reglement</legend>
                              <PaiementTotal setCount={setCount} />
                            </fieldset>
                          </div>
                        </Col>
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
                      </Row>
                    ) : (
                      <Row className="mt-3">
                        <Col lg={7}>
                          <div className="mb-2">
                            <Form.Label htmlFor="Paiement partiel espèces">
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
                            {selectedReglement ===
                            "Paiement total en espèces" ? (
                              <>
                                <PaiementTotal setCount={setCount} />
                                {rem}
                              </>
                            ) : (
                              ""
                            )}

                            {selectedReglement ===
                            "Paiement partiel espèces" ? (
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
                    )}
                  </Col>
                  <Col lg={3} className="mt-3">
                    <TextField
                      label="Total"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ width: 280 }}
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
                <div className="hstack gap-2 justify-content-end d-print-none mt-3">
                  <Button
                    variant="success"
                    type="submit"
                    onClick={() => tog_AddCodeUser()}
                  >
                    <i className="ri-hand-coin-line align-bottom me-1"></i>{" "}
                    Paiement
                  </Button>
                  <Button variant="success" onClick={handleAddFacture}>
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
        show={modal_AddClientPhyModals}
        onHide={() => {
          tog_AddClientPhyModals();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Ajouter Client Physique
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form className="tablelist-form" onSubmit={onSubmit}>
            <Row>
              <div
                id="alert-error-msg"
                className="d-none alert alert-danger py-2"
              ></div>
              <input type="hidden" id="id-field" />
              <Col lg={12}>
                <div className="text-center mb-4">
                  <div className="position-relative d-inline-block">
                    <div className="position-absolute top-100 start-100 translate-middle">
                      <label
                        htmlFor="avatar"
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
                        name="avatar"
                        id="avatar"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e)}
                      />
                    </div>
                    <div className="avatar-xl">
                      <div className="avatar-title bg-light rounded-3">
                        <img
                          src={`data:image/jpeg;base64, ${formData.avatar}`}
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
              <Col lg={4}>
                <div className="mb-3">
                  <Form.Label htmlFor="raison_sociale">Nom Client</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.raison_sociale}
                    onChange={onChange}
                    id="raison_sociale"
                    required
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <Form.Label htmlFor="cin">C.I.N</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.cin}
                    onChange={onChange}
                    id="cin"
                    required
                  />
                </div>
              </Col>
              <Col lg={5}>
                <div className="mb-3">
                  <Form.Label htmlFor="tel">Telephone</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.tel}
                    onChange={onChange}
                    id="tel"
                    required
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="adresse">Adresse</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.adresse}
                    onChange={onChange}
                    id="adresse"
                    required
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="rib">RIB</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.rib}
                    onChange={onChange}
                    id="rib"
                    required
                  />
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
                    <option value="">Choisir</option>
                    <option value="Active">Actif</option>
                    <option value="Expired">Inactif</option>
                  </select>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="remarque">Remarque</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.remarque}
                    onChange={onChange}
                    id="remarque"
                    required
                  />
                </div>
              </Col>
              <Col lg={12} className="modal-footer">
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    className="btn-ghost-danger"
                    onClick={() => {
                      tog_AddClientPhyModals();
                    }}
                  >
                    <i className="ri-close-line align-bottom me-1"></i> Fermer
                  </Button>
                  <Button
                    type={"submit"}
                    onClick={() => {
                      tog_AddClientPhyModals();
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
        <Modal.Body className="text-center">
          <Form>
            <Row>
              <div>
                <div className="input-group d-flex flex-row gap-2">
                  <TextField
                    label="Code"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ maxLength: 3 }}
                    sx={{ width: 180 }}
                    size="small"
                    type="text"
                    id="codeInput"
                    placeholder="185"
                    onChange={onChangeCodeClient}
                  />
                  <Button
                    type={"submit"}
                    variant="info"
                    id="add-btn"
                    size="sm"
                    onClick={handleSubmitCodeClient}
                    className="rounded"
                  >
                    <i className="ri-check-double-line ri-xl"></i>
                  </Button>
                </div>
              </div>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PassagerInvoice;
