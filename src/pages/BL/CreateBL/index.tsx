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
  useAddClientMoraleMutation,
  useFetchClientMoralesQuery,
} from "features/clientMoral/clientMoralSlice";

import {
  useCreateNewBLMutation,
  useFetchAllBLQuery,
} from "features/bl/bondeLSlice";
import ModalClientMoral from "pages/ClientMor/ModalClientMoral";
import { useCreateNewLigneVenteMutation } from "features/ligneVente/ligneVenteSlice";
import Swal from "sweetalert2";

interface FormFields {
  PU: string;
  quantiteProduit: string;
  productName: string;
  montantTtl: string;
  numBL: string;
  benifice: string;
  blID: string;
  [key: string]: string;
}

const CreateBL: React.FC = () => {
  const navigate = useNavigate();
  let dateNow = dayjs();
  const [nowDate, setNowDate] = React.useState<Dayjs | null>(dateNow);

  let { data = [] } = useFetchAllBLQuery();
  let lastFacture = data.slice(-1);
  let key = parseInt(lastFacture[0]?.designationBL!.substr(0, 3)) + 1;
  const newKey = `${key}/${nowDate?.year()}`;
  document.title = "Créer BL | Radhouani";

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
        "https://app.src.smartschools.tn/clientMo/moraleclients"
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
        `https://app.src.smartschools.tn/clientMo/oneClientMorale/${clientMoraleid}`
      );
      const resstatedata = await reqstatedata.json();
      setSelected(await resstatedata);
      setClientid(clientMoraleid);
    } else {
      setSelected([]);
    }
  };

  // sweetalert Notification
  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "La bon de livraison a été créer avec succès",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const errorBL = (err: any) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `Ooops, ${err}, Quelque chose n'a pas fonctionné !!`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  //Query to Fetch All Client Morale
  const { data: allClientMorale = [], isLoading } =
    useFetchClientMoralesQuery();

  // Mutation to create a new Client
  const [createClientMorale] = useAddClientMoraleMutation();

  const [clientMData, setClientMData] = useState({
    idclient_m: 99,
    raison_sociale: "",
    adresse: "",
    tel: "",
    mail: "",
    mat: "",
    logo: "",
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
  };

  const handleClientMoraleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileLogo = (
      document.getElementById("logo") as HTMLInputElement
    ).files?.item(0) as File;

    const base64 = await convertToBase64(fileLogo);
    setClientMData({
      ...clientMData,
      logo: base64 as string,
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
  const [valueDate, setValueDate] = React.useState<Dayjs | null>(now);
  const newDate = `${valueDate?.year()}-${
    valueDate!.month() + 1
  }-${valueDate!.date()}`;

  let dateNowBL = dayjs();
  const [nowDateBL, setNowDateBL] = React.useState<Dayjs | null>(dateNowBL);

  let { data: allBL = [] } = useFetchAllBLQuery();
  let lastBL = allBL.slice(-1);
  let keyBL = parseInt(lastBL[0]?.designationBL!.substr(0, 3)) + 1;
  let idLastDevis = (lastBL[0]?.idbl! + 1).toString();

  const newDevisKey = `${keyBL}/${nowDateBL?.year()}`;

  const [formFields, setFormFields] = useState<FormFields[]>([
    {
      PU: "",
      montantTtl: "",
      quantiteProduit: "",
      productName: "",
      numBL: "",
      benifice: "",
      blID: "",
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
    formFields.reduce((sum, i) => (sum += parseInt(i.montantTtl!)), 0) || 0;

  const addFields = () => {
    let object: FormFields = {
      PU: "",
      montantTtl: "",
      quantiteProduit: "",
      productName: "",
      numBL: "",
      benifice: pourcentageBenifice.toString(),
      blID: "",
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

  const [createLigneVenteDevis] = useCreateNewLigneVenteMutation();
  useEffect(() => {
    formFields[formFields.length - 1]["productName"] = acValue?.nomProduit!;
    formFields[formFields.length - 1]["blID"] = idLastDevis;
    localStorage.setItem("bl", JSON.stringify(formFields));
  }, [formFields]);

  async function handleAddDevisLigneVente() {
    try {
      var jsonData = JSON.parse(localStorage.getItem("bl") || "[]");

      for (var i = 0; i < jsonData.length; i++) {
        var lignevente = jsonData[i];
        lignevente["numBL"] = newDevisKey;
        lignevente["benifice"] = pourcentageBenifice!;
        await createLigneVenteDevis(lignevente);
      }
    } catch (err) {
      errorBL(err);
    }
  }

  let result: number =
    formFields.reduce((sum, i) => (sum += parseInt(i.montantTtl!)), 0) || 0;

  const [idbl, setIdbl] = useState(1);
  const [designationBL, setDesignationBL] = useState("");
  const [montant, setMontant] = useState("");
  const [dateBL, setDateBL] = useState("");
  const [nomclient, setNomclient] = useState("");
  const [clientID, setClientID] = useState(0);
  const [addBL] = useCreateNewBLMutation();

  async function handleAddBL() {
    try {
      await addBL({
        idbl,
        designationBL: newDevisKey,
        montant: result,
        dateBL: newDate,
        clientID: clientValue?.idclient_m!,
      })
        .unwrap()
        .then(handleAddDevisLigneVente)
        .then(() => notify())
        .then(() => navigate("/liste-bl"));
      setDesignationBL("");
      setMontant("");
      setDateBL("");
      setNomclient("");
      setClientID(0);
    } catch (err) {
      errorBL(err);
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            title="Créer Bon de livraison"
            pageTitle="Bon de livraison"
          />
          <Row className="justify-content-center">
            <Col xxl={12}>
              <Card>
                {/* <Form
                  className="needs-validation"
                  id="invoice_form"
                  onSubmit={(event) => handleSubmit(event, acValue)}
                > */}
                <Card.Body className="border-bottom border-bottom-dashed p-3">
                  <Row>
                    <Col lg={4} sm={6}>
                      <div>
                        <div className="input-group d-flex gap-2 mb-4">
                          <Autocomplete
                            id="nomClient"
                            sx={{ width: 320 }}
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
                            variant="outline-info"
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
                        label=" Numero Bon de Livraison"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                        size="small"
                        value={newKey}
                        type="text"
                        id="invoicenoInput"
                        placeholder="25000355"
                        sx={{ width: 220 }}
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
                              inputProps: { ["placeholder"]: "DD-MM-YYYY" },
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
                      <Col lg={4}>
                        <Form.Label htmlFor="nomProduit">
                          Détail Produit
                        </Form.Label>
                      </Col>
                      <Col lg={2} className="text-center">
                        <Form.Label htmlFor="quantiteProduit">
                          Quantité
                        </Form.Label>
                      </Col>
                      <Col lg={2} className="text-center">
                        <Form.Label htmlFor="PU">Prix Unitaire</Form.Label>
                      </Col>
                      <Col className="text-center" lg={1}>
                        <Form.Label htmlFor="benifice">Benifice</Form.Label>
                      </Col>
                      <Col className="text-center" lg={2}>
                        <Form.Label htmlFor="montantTtl">Montant</Form.Label>
                      </Col>
                      <Col lg={1}></Col>
                    </Row>
                    {formFields.map((form, index) => (
                      <Row key={index} className="mb-3">
                        <Col lg={4}>
                          <Autocomplete
                            id="nomProduit"
                            sx={{ width: 230 }}
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
                        <Col className="text-center" lg={2}>
                          <TextField
                            className="mb-2"
                            sx={{ width: 100 }}
                            id="quantiteProduit"
                            type="number"
                            size="small"
                            name="quantiteProduit"
                            placeholder="0.0"
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.quantiteProduit}
                          />
                        </Col>
                        <Col className="text-center mt-2" lg={2}>
                          {/* <TextField
                              id="PU"
                              type="number"
                              size="small"
                              name="PU"
                              placeholder="00.00"
                              value={form.PU}
                              sx={{ width: 180 }}
                              className="mb-2"
                            > */}
                          <CountUp end={parseInt(form.PU)} separator="," />

                          {/* </TextField> */}
                        </Col>
                        <Col className="text-center mt-2" lg={1}>
                          {/* <TextField
                              sx={{ width: 100 }}
                              id="benifice"
                              type="number"
                              size="small"
                              name="benifice"
                              placeholder="0.0"
                              onChange={() => onChangePourcentageBenifice}
                              value={pourcentageBenifice}
                              className="mb-2"
                              variant="standard"
                            /> */}
                          <CountUp end={pourcentageBenifice} separator="," />
                        </Col>
                        <Col className="text-center mt-2" lg={2}>
                          {/* <TextField
                              className="mb-2"
                              sx={{ width: 220 }}
                              id="montantTtl"
                              size="small"
                              type="number"
                              name="montantTtl"
                              placeholder="00.00"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={
                                (form.montantTtl = (
                                  parseInt(form.PU) *
                                    parseInt(form.quantiteProduit) -
                                  (parseInt(form.PU) *
                                    parseInt(form.quantiteProduit) *
                                    pourcentageBenifice!) /
                                    100
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
                                  parseInt(form.quantiteProduit) +
                                ((parseInt(form.PU) / 1.19) *
                                  parseInt(form.quantiteProduit) *
                                  pourcentageBenifice) /
                                  100
                              ).toString())
                            )}
                            separator=","
                            startVal={0}
                          />
                        </Col>
                        <Col className="mt-2" lg={1}>
                          <Link
                            to="#"
                            className="link-danger"
                            onClick={() => removeFields(index)}
                          >
                            <i className="ri-close-line ri-xl" />
                          </Link>
                        </Col>
                      </Row>
                    ))}
                    <Row className="mb-4">
                      <Col>
                        <div>
                          <Link
                            to="#"
                            className="link-secondary"
                            onClick={addFields}
                          >
                            <i className="ri-add-fill me-1 ri-xl" />
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <Row className="border-top border-top-dashed ">
                    <Row className="mt-4 align-items-center">
                      <Col xxl={3} md={5}></Col>
                      <Col className="col-md-auto ms-auto">
                        <TextField
                          sx={{ width: 100 }}
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
                  </Row>
                  {/* <Row className="mb-4">
                      <Col lg={8}></Col>
                      <Col lg={4} className="text-center mt-3">
                        <TextField
                          label="Total"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ width: 355 }}
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
                        <CountUp
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
                    </Row> */}
                  <Row className="mb-4">
                    <Row className="mt-4 align-items-center">
                      <Col xxl={10} md={5}></Col>
                      <Col className="col-md-auto ms-auto">
                        <Form.Label htmlFor="total" className="fs-18 fw-bold">
                          Total:{" "}
                        </Form.Label>
                      </Col>
                      <Col className="col-md-auto ms-auto pb-2">
                        <CountUp
                          className="fs-18 fw-meduim"
                          end={formFields.reduce(
                            (sum, i) =>
                              (sum +=
                                parseInt(i.PU) * parseInt(i.quantiteProduit) +
                                ((parseInt(i.PU) / 1.19) *
                                  parseInt(i.quantiteProduit) *
                                  pourcentageBenifice) /
                                  100),
                            0
                          )}
                          separator=","
                          duration={1}
                          startVal={0}
                        />
                      </Col>
                    </Row>
                  </Row>
                  <div className="hstack gap-2 justify-content-end d-print-none mt-0">
                    <Button
                      variant="success"
                      type="submit"
                      onClick={handleAddBL}
                    >
                      <i className="ri-save-3-line align-bottom me-1"></i>{" "}
                      Enregister
                    </Button>
                    {/* <Button variant="primary">
                        <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                        Telecharger
                      </Button> */}
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateBL;
