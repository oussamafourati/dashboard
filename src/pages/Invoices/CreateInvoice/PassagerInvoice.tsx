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
import CountUp from "react-countup";
import Breadcrumb from "Common/BreadCrumb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/fr";
import { frFR } from "@mui/x-date-pickers/locales";
import dayjs, { Dayjs } from "dayjs";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material/Autocomplete";
import Swal from "sweetalert2";
import PaiementTotal from "./PaiementTotal";
import PaiementEspece from "./PaiementEspece";
import PaiementCheque from "./PaiementCheque";
import {
  ClientPhysique,
  useAddClientPhysiqueMutation,
  useGetOneClientQuery,
} from "features/clientPhysique/clientPhysiqueSlice";
import { useAddFactureMutation } from "features/facture/factureSlice";
import {
  ArrivageProduit,
  useGetAllArrivagesProduitQuery,
} from "features/arrivageProduit/arrivageProduitSlice";
import { useCreateNewLigneVenteMutation } from "features/ligneVente/ligneVenteSlice";
import {
  incremented,
  amountAdded,
} from "../../../features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
// PDF
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import HeaderInvoice from "../InvoiceDetails/HeaderInvoice";
import ClientDevis from "pages/Devis/DevisDetails/ClientDevis";
import Amount from "pages/Devis/DevisDetails/Amount";
import ProposalSignature from "pages/Devis/DevisDetails/ProposalSignature";

interface FormFields {
  PU: string;
  quantiteProduit: string;
  productName: string;
  montantTtl: string;
  numFacture: string;
  subTtl: string;
  [key: string]: string;
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#ffffff",
    fontFamiy: "Source Sans",
    fontSize: 12,
    lineHeight: 1.4,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 32,
    height: "100vh",
  },
  top: {
    flex: 1,
  },
});
// const PDF_REPORT_Document = (props: any) => {
//   const { rowData } = props;
//   return (
//     <Document>
//       <Page size="A4" style={styles.body}>
//         <View style={styles.top}>
//           <HeaderInvoice />
//           <ClientDevis />
//         </View>
//         <View>
//           <Amount />
//           <ProposalSignature />
//         </View>
//       </Page>
//     </Document>
//   );
// };

const PassagerInvoice: React.FC = () => {
  const filterOptions = (
    options: ClientPhysique[],
    state: { inputValue: string }
  ) => {
    const inputValue = state.inputValue.toLowerCase();
    return options
      .filter((option) =>
        option.raison_sociale.toLowerCase().includes(inputValue)
      )
      .slice(0, 2); // Limit the number of suggestions
  };

  document.title = "Créer Facture | Radhouani";
  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(incremented());
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
  const [selectedEtat, setSelectedEtat] = useState<string>("");
  // This function is triggered when the select changes
  const selectChangeEtat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedEtat(value);
  };

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
    formData["etat"] = parseInt(selectedEtat);
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
  let numDevis = `${counter}/${value?.year()}`;
  const { data: oneClient } = useGetOneClientQuery(clientValue?.idclient_p!);

  const [idFacture, setIdLigneVente] = useState(0);
  const [designationFacture, setDesignationFacture] = useState("");
  const [dateFacturation, setDateFacturation] = useState("");
  const [datePaiement, setDatePaiement] = useState("");
  const [modePaiement, setModePaiement] = useState("");
  const [statusFacture, setStatusFacture] = useState(0);
  const [MontantTotal, setMontantTotal] = useState(0);
  const [nomClient, setNomClient] = useState("");
  const [clientID, setClientID] = useState(18);
  const [addFacture, { isLoading }] = useAddFactureMutation();

  async function handleAddFacture() {
    try {
      await addFacture({
        idFacture,
        designationFacture: numDevis,
        dateFacturation: newDate,
        datePaiement,
        modePaiement,
        statusFacture,
        MontantTotal,
        nomClient: clientValue?.raison_sociale!,
        clientID: clientValue?.idclient_p!,
      }).unwrap();
      setDesignationFacture("");
      setIdLigneVente(1);
      setDateFacturation("");
      setDatePaiement("");
      setModePaiement("");
      setNomClient("");
      setStatusFacture(0);
      setClientID(18);
      notify();
    } catch (err) {
      console.log(err);
    }
  }

  const factureValue = {
    idFacture: 1,
    designationFacture: "",
    dateFacturation: "",
    datePaiement: "",
    modePaiement: "",
    statusFacture: 1,
    MontantTotal: 1,
    clientID: 18,
  };
  const [createLigneVente] = useCreateNewLigneVenteMutation();
  const [factureData, setFactureData] = useState(factureValue);
  const [formFields, setFormFields] = useState<FormFields[]>([
    {
      PU: "",
      montantTtl: "",
      quantiteProduit: "",
      productName: "",
      numFacture: "",
      subTtl: "",
    },
  ]);
  const [acValue, setACValue] = useState<ArrivageProduit | null>(
    allArrivageProduit[0]
  );

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
      PU: "",
      montantTtl: "",
      quantiteProduit: "",
      productName: acValue?.nomProduit!,
      numFacture: designationFacture,
      subTtl: "",
    };
    setFormFields([...formFields, object]);
    e.preventDefault();
    createLigneVente(object);
  };
  const removeFields = (index: number) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const total = formFields.reduce(
    (sum, i) => (sum += parseInt(i.montantTtl)),
    0
  );

  const [count, setCount] = useState<number | undefined>();
  const [remise, setRemise] = useState<number | undefined>();
  useEffect(() => {
    setRemise(100 - (count! * 100) / total);
  });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // addFacture(factureData).then(() => setFactureData(factureValue));
    // console.log(formFields);
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
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Créer Facture Passager" pageTitle="Factures" />
          <Row className="justify-content-center">
            <Col xxl={12}>
              <Card>
                {/* <Form
              className="needs-validation"
              id="invoice_form"
              onSubmit={submit}
            > */}
                <Card.Body className="border-bottom border-bottom-dashed p-3">
                  <Row>
                    <Col lg={4} sm={6}>
                      <div>
                        <div className="input-group d-flex gap-2 mb-2">
                          <Autocomplete
                            id="clientID"
                            sx={{ width: 320 }}
                            options={clientPhysique!}
                            autoHighlight
                            defaultValue={{
                              idclient_p: 18,
                              raison_sociale: "Client Passager",
                              cin: "9001002",
                              adresse: "Gafsa",
                              tel: "22003004",
                              mail: "clientpassager@gmail.com",
                              avatar:
                                "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",
                              rib: "10203040506070808",
                              etat: 1,
                              remarque: "aucun remarque",
                              credit: 0,
                              piecejointes: "",
                            }}
                            filterOptions={filterOptions}
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
                        label="Numero Facture"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        size="small"
                        type="text"
                        id="designationFacture"
                        placeholder="25000355"
                        value={numDevis}
                        onChange={(e) => setDesignationFacture(e.target.value)}
                        sx={{ width: 320 }}
                        className="mb-2"
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
                              inputProps: { ["placeholder"]: "AAAA.MM.DD" },
                            },
                          }}
                          value={value}
                          onChange={(newValue) => setValue(newValue)}
                          format="DD-MM-YYYY"
                          sx={{ width: 320 }}
                        />
                      </LocalizationProvider>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Body className="p-3">
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
                      <Col lg={2} className="text-center">
                        <Form.Label htmlFor="PU">Prix Unitaire</Form.Label>
                      </Col>
                      <Col lg={2} className="text-center">
                        <Form.Label htmlFor="montantTtl">Montant </Form.Label>
                      </Col>
                      <Col lg={2} className="text-center">
                        <Form.Label htmlFor="MontantAR">
                          PU après Remise
                        </Form.Label>
                      </Col>
                      <Col lg={1} className="text-center"></Col>
                    </Row>
                    {formFields.map((form, index) => (
                      <Row key={index}>
                        <Col lg={4}>
                          <Autocomplete
                            id="nomProduit"
                            className="mb-3"
                            sx={{ width: 380 }}
                            options={allArrivageProduit!}
                            autoHighlight
                            onChange={(event, value) => {
                              setACValue(value);
                              const updatedValue = [...formFields];
                              updatedValue[index].PU =
                                value!.prixVente!.toString();
                              setFormFields(updatedValue);
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
                            className="mb-2"
                            sx={{ width: 80 }}
                            id="quantiteProduit"
                            type="text"
                            size="small"
                            name="quantiteProduit"
                            placeholder="0.0"
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.quantiteProduit}
                          />
                        </Col>
                        <Col lg={2} className="text-center mt-2">
                          {/* <TextField
                            className="mb-2"
                            id="PU"
                            type="text"
                            size="small"
                            name="PU"
                            placeholder="00.00"
                            sx={{ width: 190 }}
                            value={form.PU}
                          /> */}
                          <CountUp end={parseInt(form.PU)} separator="," />
                        </Col>
                        <Col lg={2} sm={6} className="text-center mt-2">
                          {/* <TextField
                            className="mb-2"
                            sx={{ width: 190 }}
                            id="montantTtl"
                            size="small"
                            type="number"
                            name="montantTtl"
                            placeholder="00.00"
                            onChange={(event) => handleFormChange(event, index)}
                            value={
                              (form.montantTtl = (
                                parseInt(form.PU) *
                                parseInt(form.quantiteProduit)
                              ).toString())
                            }
                            InputProps={{
                              readOnly: true,
                            }}
                          /> */}
                          <CountUp
                            end={parseInt(
                              (form.montantTtl = (
                                parseInt(form.PU) *
                                parseInt(form.quantiteProduit)
                              ).toString())
                            )}
                            separator=","
                          />
                        </Col>
                        {montantTotal !== count ? (
                          <Col lg={2} sm={6} className="text-center mt-2">
                            {/* <TextField
                              sx={{ width: 190 }}
                              id="MontantAR"
                              size="small"
                              type="number"
                              name="montanttotalAR"
                              placeholder="0.0"
                              value={(
                                parseInt(form.PU) -
                                (parseInt(form.PU) * remise!) / 100
                              ).toFixed(3)}
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              InputProps={{
                                readOnly: true,
                              }}
                            /> */}
                            <CountUp
                              end={
                                parseInt(form.PU) -
                                (parseInt(form.PU) * remise!) / 100
                              }
                              separator=","
                            />
                          </Col>
                        ) : (
                          ""
                        )}
                        <Col lg={1} className="mt-2">
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
                      
                    </Row>{" "} */}
                    <Button
                      onClick={addFields}
                      variant="primary"
                      className="p-1"
                      id="btn-new-event"
                    >
                      <i className="mdi mdi-plus"></i>{" "}
                    </Button>
                    <Row className="mt-1">
                      <Col lg={9}></Col>
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
                        name="subTtl"
                        value={
                          formFields.reduce(
                            (sum, i) => (sum += parseInt(i.montantTtl!)),
                            0
                          ) || (0).toString()
                        }
                        id="subTtl"
                        placeholder="0.00"
                      />
                    </Col> */}
                      <Col className="col-md-auto ms-auto">
                        <Form.Label htmlFor="total" className="fs-18 fw-bold">
                          Total:{" "}
                        </Form.Label>
                      </Col>
                      <Col className="col-md-auto ms-auto pb-2">
                        <CountUp
                          className="fs-18 fw-meduim"
                          end={
                            formFields.reduce(
                              (sum, i) => (sum += parseInt(i.montantTtl!)),
                              0
                            ) || 0
                          }
                          separator=","
                          startVal={0}
                        />
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
                            <Form.Label htmlFor="choices-reglement-status">
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
                          <Col lg={9}>
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
                                <PaiementTotal setCount={setCount} />
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
                      )}
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
                        name="subTtl"
                        value={
                          formFields.reduce(
                            (sum, i) => (sum += parseInt(i.montantTtl!)),
                            0
                          ) || (0).toString()
                        }
                        id="subTtl"
                        placeholder="0.00"
                      />
                    </Col> */}
                    <Col className="col-md-auto ms-auto mt-4"></Col>
                    <Col className="col-md-auto ms-auto pb-2 mt-4"></Col>
                  </Row>
                  <div className="hstack gap-2 justify-content-end d-print-none mt-2">
                    <Button
                      variant="success"
                      type="submit"
                      onClick={() => tog_AddCodeUser()}
                    >
                      <i className="ri-hand-coin-line align-bottom me-1"></i>{" "}
                      Paiement
                    </Button>
                    <Button variant="secondary" onClick={handleAddFacture}>
                      <i className="ri-save-3-fill align-bottom me-1"></i>{" "}
                      Enregister
                    </Button>
                    {/* <PDFDownloadLink
                      document={
                        <PDF_REPORT_Document rowData={designationFacture} />
                      }
                      className="btn btn-primary"
                      fileName={`facture_numero_${designationFacture}`}
                    >
                      <i className="ri-download-2-line align-bottom me-1"></i>
                      Télécharger
                    </PDFDownloadLink> */}
                    <Button variant="primary" onClick={handleAddFacture}>
                      <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                      Télécharger{" "}
                    </Button>
                  </div>
                </Card.Body>
                {/* </Form> */}
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
                      <Form.Label htmlFor="raison_sociale">
                        Nom Client
                      </Form.Label>
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
                        onChange={selectChangeEtat}
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
                        <i className="ri-close-line align-bottom me-1"></i>{" "}
                        Fermer
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
      </div>
    </React.Fragment>
  );
};

export default PassagerInvoice;
