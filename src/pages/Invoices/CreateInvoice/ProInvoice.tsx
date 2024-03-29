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
import Swal from "sweetalert2";
import CountUp from "react-countup";
import Breadcrumb from "Common/BreadCrumb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/fr";
import { frFR } from "@mui/x-date-pickers/locales";
import dayjs, { Dayjs } from "dayjs";
import PaiementTotal from "./PaiementTotal";
import PaiementEspece from "./PaiementEspece";
import PaiementCheque from "./PaiementCheque";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrivageProduit,
  useGetAllArrivagesProduitQuery,
} from "features/arrivageProduit/arrivageProduitSlice";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFetchOneUserQuery } from "features/compte/compteSlice";
import {
  ClientMorale,
  useFetchClientMoralesQuery,
} from "features/clientMoral/clientMoralSlice";
import ModalClientMoral from "pages/ClientMor/ModalClientMoral";
import { useCreateNewLigneVenteMutation } from "features/ligneVente/ligneVenteSlice";
import {
  useAddFactureMutation,
  useFetchAllFactureQuery,
} from "features/facture/factureSlice";

interface FormFields {
  PU: string;
  quantiteProduit: string;
  productName: string;
  montantTtl: string;
  numFacture: string;
  factureID: string;
  benifice: string;
  [key: string]: string;
}

const ProInvoice: React.FC = () => {
  document.title = "Créer Facture | Radhouani";
  const navigate = useNavigate();
  let dateNow = dayjs();
  const [nowDate, setNowDate] = React.useState<Dayjs | null>(dateNow);

  let { data = [] } = useFetchAllFactureQuery();
  let lastFacturePro = data.slice(-1);
  let key = parseInt(lastFacturePro[0]?.designationFacture!.substr(0, 3)) + 1;
  let idLastFacturePto = (lastFacturePro[0]?.idFacture! + 1).toString();

  const newKeyPro = `${key}/${nowDate?.year()}`;

  const [pourcentageBenifice, setPourcentageBenifice] = useState<number>(0);
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
        "https://app.src.com.tn/clientMo/moraleclients"
      );
      const resdata = await reqdata.json();
      setClientMorale(resdata);
    };
    getClientMorale();
  }, []);

  const handleClient = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const clientMoraleid = e.target.value;
    if (clientMoraleid !== "") {
      const reqstatedata = await fetch(
        `https://app.src.com.tn/clientMo/oneClientMorale/${clientMoraleid}`
      );
      const resstatedata = await reqstatedata.json();
      setSelected(await resstatedata);
      setClientid(clientMoraleid);
    } else {
      setSelected([]);
    }
  };

  //Query to Fetch All Client Morale
  const { data: allClientMorale = [], isLoading } =
    useFetchClientMoralesQuery();

  // Mutation to create a new Client

  const [state, setState] = useState({ loading: false });

  // Modal to create a new client morale
  const [modal_AddClientMoraleModals, setmodal_AddClientMoraleModals] =
    useState<boolean>(false);
  function tog_AddClientMoraleModals() {
    setmodal_AddClientMoraleModals(!modal_AddClientMoraleModals);
  }

  // The selected drink
  const [selectedReglement, setSelectedReglement] = useState<String>();
  const [paymentMode, setPaymentMode] = useState<string>("");
  useEffect(() => {
    if (selectedReglement === "Paiement total en espèces") {
      setPaymentMode("Espece");
    } else if (selectedReglement === "Paiement partiel espèces") {
      setPaymentMode("Par tranche");
    } else {
      setPaymentMode("Cheque");
    }
  });

  const [paymmentStatus, setPaymentStatus] = useState<number>(0);
  useEffect(() => {
    if (selectedReglement === "Paiement total en espèces") {
      setPaymentStatus(2);
    } else {
      setPaymentStatus(0);
    }
  });

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
  const [valueDate, setValueDate] = React.useState<Dayjs | null>(now);
  const newDate = `${valueDate?.year()}-${
    valueDate!.month() + 1
  }-${valueDate!.date()}`;

  const [createNewLigneVente] = useCreateNewLigneVenteMutation();

  const [formFields, setFormFields] = useState<FormFields[]>([
    {
      PU: "",
      montantTtl: "",
      quantiteProduit: "",
      productName: "",
      numFacture: "",
      benifice: "",
      factureID: "",
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

  const montantTotal =
    formFields.reduce((sum, i) => (sum += parseInt(i.montanttotal!)), 0) || 0;

  const addFields = () => {
    let object: FormFields = {
      PU: "",
      montantTtl: "",
      quantiteProduit: "",
      productName: "",
      numFacture: "",
      benifice: pourcentageBenifice!.toString(),
      factureID: "",
    };
    setFormFields([...formFields, object]);
  };

  const removeFields = (index: number) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const errorNotify = (err: any) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `Ooops, ${err}, Quelque chose n'a pas fonctionné !!`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  useEffect(() => {
    formFields[formFields.length - 1]["productName"] = acValue?.nomProduit!;
    // formFields[formFields.length - 1]["benifice"] = pourcentageBenifice!;
    localStorage.setItem("invoice", JSON.stringify(formFields));
  }, [formFields]);

  async function handleAddLigneVentePro() {
    try {
      var jsonData = JSON.parse(localStorage.getItem("invoice") || "[]");
      for (var i = 0; i < jsonData.length; i++) {
        var lignevente = jsonData[i];
        lignevente["numFacture"] = newKeyPro;
        lignevente["benifice"] = pourcentageBenifice;
        lignevente["factureID"] = idLastFacturePto;
        await createNewLigneVente(lignevente);
      }
    } catch (err) {
      errorNotify(err);
    }
  }

  // sweetalert Notification
  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "La facture a été créer avec succès",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const [totalInvoice, setTotalInvoice] = useState<number>(0);

  useEffect(() => {
    setTotalInvoice(
      formFields.reduce((sum, i) => (sum += parseInt(i.montantTtl)), 0)
    );
  });

  let result: number =
    formFields.reduce((sum, i) => (sum += parseInt(i.montantTtl!)), 0) || 0;

    const nomemployee = JSON.parse(localStorage.getItem("profile") || "");

  const [idFacture, setIdLigneVente] = useState(0);
  const [designationFacture, setDesignationFacture] = useState("");
  const [dateFacturation, setDateFacturation] = useState("");
  const [datePaiement, setDatePaiement] = useState("");
  const [modePaiement, setModePaiement] = useState("");
  const [statusFacture, setStatusFacture] = useState(0);
  const [MontantTotal, setMontantTotal] = useState(0);
  const [nomClient, setNomClient] = useState("");
  const [nomEmployee, setNomEmployee] = useState("");
  const [clientID, setClientID] = useState(23);
  const [addFacture] = useAddFactureMutation();

  async function handleAddFacture() {
    try {
      await addFacture({
        idFacture,
        designationFacture: newKeyPro,
        dateFacturation: newDate,
        datePaiement: newDate,
        modePaiement: paymentMode,
        statusFacture: paymmentStatus,
        MontantTotal: totalInvoice,
        nomClient: clientValue!.raison_sociale!,
        nomEmployee:nomemployee!,
        clientID: clientValue?.idclient_m!,
      })
        .unwrap()
        .then(handleAddLigneVentePro)
        .then(() => notify())
        .then(() => navigate("/liste-factures"));
      setDesignationFacture("");
      setIdLigneVente(1);
      setDateFacturation("");
      setDatePaiement("");
      setModePaiement("");
      setNomClient("");
      setStatusFacture(0);
      setNomEmployee("");
      setClientID(23);
    } catch (err) {
      errorNotify(err);
    }
  }

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

  const handleSubmitCodeClient = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayText(codeClient);
    tog_AddCodeUser();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            title="Créer Facture Professionnel"
            pageTitle="Factures"
          />
          <Row className="justify-content-center">
            <Col xxl={12}>
              <Card>
                <Form
                  className="needs-validation"
                  id="invoice_form"
                  onSubmit={(event) => handleSubmit(event, acValue)}
                >
                  <Card.Body className="border-bottom border-bottom-dashed p-3">
                    <Row>
                      <Col lg={4} sm={6}>
                        <div>
                          <div className="input-group d-flex gap-2 mb-2">
                            <Autocomplete
                              id="nomClient"
                              sx={{ width: 320 }}
                              options={clientMorale!}
                              autoHighlight
                              onChange={(event, value) => setClientValue(value)}
                              getOptionLabel={(option) =>
                                option.raison_sociale!
                              }
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
                              variant="soft-info"
                              size="sm"
                              className="rounded"
                            >
                              <i className="ri-user-add-line ri-xl"></i>
                            </Button>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4} sm={6}>
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
                          placeholder="25000355"
                          sx={{ width: 220 }}
                          className="mb-2"
                          value={newKeyPro}
                        />
                      </Col>
                      <Col lg={4} sm={6}>
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          adapterLocale="fr"
                          localeText={
                            frFR.components.MuiLocalizationProvider.defaultProps
                              .localeText
                          }
                        >
                          <DatePicker
                            defaultValue={now}
                            slotProps={{
                              textField: {
                                size: "small",
                              },
                            }}
                            format="DD-MM-YYYY"
                            value={valueDate}
                            onChange={(newValue) => setValueDate(newValue)}
                            sx={{ width: 220 }}
                          />
                        </LocalizationProvider>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Body className="p-3">
                    <div>
                      <Row>
                        <Col lg={4} className="text-center">
                          <Form.Label htmlFor="nomProduit">
                            Détail Produit
                          </Form.Label>
                        </Col>
                        <Col lg={1} className="text-center">
                          <Form.Label htmlFor="quantiteProduit">
                            Quantité
                          </Form.Label>
                        </Col>
                        <Col lg={2} className="text-center">
                          <Form.Label htmlFor="PU">Prix Unitaire</Form.Label>
                        </Col>
                        <Col lg={1} className="text-center">
                          <Form.Label htmlFor="benifice">Benifice</Form.Label>
                        </Col>
                        <Col lg={3} className="text-center">
                          <Form.Label htmlFor="montantTtl">Montant</Form.Label>
                        </Col>
                        <Col lg={1}></Col>
                      </Row>
                      {formFields.map((form, index) => (
                        <Row key={index}>
                          <Col lg={4} sm={6} className="mb-2">
                            <Autocomplete
                              id="nomProduit"
                              sx={{ width: 220 }}
                              options={allArrivageProduit}
                              autoHighlight
                              onChange={(event, value) => {
                                setACValue(value);
                                const updatedPU = [...formFields];
                                updatedPU[index].PU =
                                  value!.prixVente!.toString();
                                setFormFields(updatedPU);
                              }}
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
                              className="mb-2"
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
                          <Col lg={1} sm={6} className="text-center">
                            <TextField
                              className="mb-2"
                              sx={{ width: 80 }}
                              id="quantiteProduit"
                              type="number"
                              size="small"
                              name="quantiteProduit"
                              placeholder="0.0"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={form.quantiteProduit}
                            />
                          </Col>
                          <Col lg={2} sm={6} className="text-center mt-2">
                            {/* <TextField
                              id="PU"
                              type="number"
                              size="small"
                              name="PU"
                              placeholder="00.00"
                              value={form.PU}
                              sx={{ width: 195 }}
                              className="mb-2"
                            />   */}
                            <CountUp end={parseInt(form.PU)} separator="," />
                          </Col>
                          <Col lg={1} sm={6} className="text-center mt-2">
                            {/* <TextField
                              sx={{ width: 95 }}
                              id="benifice"
                              type="number"
                              size="small"
                              name="benifice"
                              placeholder="0.0"
                              onChange={() => onChangePourcentageBenifice}
                              value={pourcentageBenifice}
                              className="mb-2"
                            />{" "} */}
                            <CountUp end={pourcentageBenifice} separator="," />
                          </Col>
                          <Col lg={3} sm={6} className="text-center mt-2">
                            <CountUp
                              end={parseInt(
                                (form.montantTtl = (
                                  parseInt(form.PU) *
                                    parseFloat(form.quantiteProduit) +
                                  ((parseInt(form.PU) / 1.19) *
                                    parseFloat(form.quantiteProduit) *
                                    pourcentageBenifice) /
                                    100
                                ).toString())
                              )}
                              duration={1}
                              separator=","
                            />
                          </Col>
                          <Col lg={1} className="text-center mt-2" sm={6}>
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
                      {/* <Row>
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
                              className="btn btn-info p-1"
                              onClick={addFields}
                            >
                              <i className="ri-add-fill me-1 align-bottom"></i>
                            </Link>
                          </div>
                        </Col>
                      </Row> */}
                      <Button
                        onClick={addFields}
                        variant="primary"
                        className="p-1 mb-2"
                        id="btn-new-event"
                      >
                        <i className="mdi mdi-plus"></i>{" "}
                      </Button>
                      <Row className="mt-1">
                        <Col lg={10}></Col>
                        <Col lg={1} className="mt-1">
                          <TextField
                            sx={{ width: 88 }}
                            label="% Bénifice"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            size="small"
                            type="number"
                            name="pourcentageBenifice"
                            onChange={onChangePourcentageBenifice}
                            value={pourcentageBenifice}
                            id="pourcentageBenifice"
                            placeholder="0.00"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-1">
                        <Col lg={9}></Col>
                        <Col className="col-md-auto ms-auto mt-2">
                          <Form.Label htmlFor="total" className="fs-18 fw-bold">
                            Total Prix Achat:{" "}
                          </Form.Label>
                        </Col>
                        <Col className="col-md-auto ms-auto pb-2 mt-2">
                          <CountUp
                            className="fs-18 fw-meduim"
                            end={formFields.reduce(
                              (sum, i) =>
                                (sum +=
                                  (parseInt(i.PU) / 1.19) *
                                    parseInt(i.quantiteProduit) +
                                  ((parseInt(i.PU) / 1.19) *
                                    parseInt(i.quantiteProduit) *
                                    pourcentageBenifice) /
                                    100),
                              0
                            )}
                            separator=","
                            startVal={0}
                          />
                        </Col>
                      </Row>
                      <Row className="mt-1">
                        <Col lg={9}></Col>
                        <Col className="col-md-auto ms-auto mt-2">
                          <Form.Label htmlFor="total" className="fs-18 fw-bold">
                            Total Prix Vente:{" "}
                          </Form.Label>
                        </Col>
                        <Col className="col-md-auto ms-auto pb-2 mt-2">
                          <CountUp
                            className="fs-18 fw-meduim"
                            end={formFields.reduce(
                              (sum, i) => (sum += parseInt(i.montantTtl!)),
                              0
                            )}
                            separator=","
                            startVal={0}
                          />
                        </Col>
                      </Row>
                    </div>
                    <Row className="border-top border-top-dashed mt-1">
                      <Col lg={9}>
                        <Row className="mt-2">
                          <Col lg={9}>
                            <div className="mb-2">
                              <Form.Label htmlFor="choices-reglement-status">
                                Reglement
                              </Form.Label>
                              <p>
                                <input
                                  className="m-2"
                                  type="radio"
                                  name="choices-reglement-status"
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
                                  name="choices-reglement-status"
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
                                  name="choices-reglement-status"
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

                              {selectedReglement ===
                              "Paiement partiel chèque" ? (
                                <PaiementCheque />
                              ) : (
                                ""
                              )}
                            </div>
                          </Col>
                          <Col lg={3} sm={6}>
                            <Form.Label htmlFor="choices-payment-status">
                              Status de Payement
                            </Form.Label>
                            {!selectedReglement ? (
                              <div>
                                <p className="fs-15 badge badge-soft-danger">
                                  Impayé
                                </p>
                              </div>
                            ) : selectedReglement ===
                              "Paiement total en espèces" ? (
                              <div>
                                <p className="fs-15 badge badge-soft-success">
                                  Payé
                                </p>
                              </div>
                            ) : selectedReglement ===
                              "Paiement partiel espèces" ? (
                              <div>
                                <p className="fs-15 badge badge-soft-danger">
                                  Impayé
                                </p>
                              </div>
                            ) : selectedReglement ===
                              "Paiement partiel chèque" ? (
                              <div>
                                <p className="fs-15 badge badge-soft-danger">
                                  Impayé
                                </p>
                              </div>
                            ) : (
                              ""
                            )}
                          </Col>
                        </Row>
                      </Col>
                      {/* <Col lg={3} className="mt-3">
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
                              (sum, i) => (sum += parseInt(i.montantTtl!)),
                              0
                            ) || (0).toString()
                          }
                          id="cart-subtotal"
                          placeholder="0.00"
                        />
                      </Col> */}
                    </Row>
                    <div className="hstack gap-2 justify-content-end d-print-none mt-0">
                      {/* <Button
                        variant="success"
                        type="submit"
                        onClick={() => tog_AddCodeUser()}
                      >
                        <i className="ph ph-coin align-bottom me-1 fs-5"></i>{" "}
                        Paiement
                      </Button> */}
                      <Button
                        variant="secondary"
                        type="submit"
                        onClick={handleAddFacture}
                      >
                        <i className="ri-save-3-fill align-bottom me-1"></i>{" "}
                        Enregister
                      </Button>
                      {/* <Link to="#" className="btn btn-primary">
                        <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                        Telecharger
                      </Link> */}
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
                Ajouter Client
              </h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <ModalClientMoral />
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProInvoice;
