import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/de";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useGetOneClientQuery } from "features/clientPhysique/clientPhysiqueSlice";
import { useAddFactureMutation } from "features/facture/factureSlice";
import {
  ArrivageProduit,
  useGetAllArrivagesProduitQuery,
} from "features/arrivageProduit/arrivageProduitSlice";

interface FormFields {
  PU: string;
  quantiteProduit: string;
  productName: string;
  montantTtl: string;
  numFacture: string;
  [key: string]: string;
}

const CreateDevis = () => {
  document.title = "Créer Devis | Radhouani";

  const { data: allArrivageProduit = [] } = useGetAllArrivagesProduitQuery();
  const { data: OneClient } = useGetOneClientQuery(18);

  const [addFacture] = useAddFactureMutation();

  const factureValue = {
    idFacture: 1,
    designationFacture: "",
    dateFacturation: "",
    prixUnitaire: 1,
    MontantTotal: 1,
    quantiteProduit: 1,
    datePaiement: "",
    modePaiement: "",
    statusFacture: 1,
    clientID: 1,
    produitID: 1,
    nomClient: OneClient?.raison_sociale!,
    nomProduit: "",
  };

  const [factureData, setFactureData] = useState(factureValue);
  const {
    idFacture,
    designationFacture,
    dateFacturation,
    prixUnitaire,
    MontantTotal,
    quantiteProduit,
    datePaiement,
    modePaiement,
    statusFacture,
    clientID,
    produitID,
    nomClient,
    nomProduit,
  } = factureData;

  // const onChangeFacture = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFactureData((prevState) => ({
  //     ...prevState,
  //     [e.target.id]: e.target.value,
  //   }));
  // };

  // const onSubmitFacture = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   addFacture(factureData).then(() => setFactureData(factureValue));
  //   // notify();
  // };

  // The selected Reglement
  const [selectedReglement, setSelectedReglement] = useState<String>();

  // This function will be triggered when a radio button is selected
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReglement(event.target.value);
  };

  const [acValue, setACValue] = useState<ArrivageProduit | null>(
    allArrivageProduit[0]
  );

  const [formFields, setFormFields] = useState<FormFields[]>([
    {
      PU: "",
      montantTtl: "",
      quantiteProduit: "",
      productName: "",
      numFacture: "",
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

  const montantTotal =
    formFields.reduce((sum, i) => (sum += parseInt(i.montanttotal!)), 0) || 0;

  const addFields = () => {
    let object: FormFields = {
      PU: "",
      montantTtl: "",
      quantiteProduit: "",
      productName: "",
      numFacture: "",
    };
    setFormFields([...formFields, object]);
  };

  const removeFields = (index: number) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const onFactureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFactureData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const [count, setCount] = useState<number | undefined>();
  const rem = 100 - (count! * 100) / montantTotal;
  let now = dayjs();

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    stateVal: ArrivageProduit | null
  ) => {
    factureData["nomProduit"] = acValue?.nomProduit!;
    factureData["produitID"] = acValue?.produitID!;
    factureData["dateFacturation"] = now.toString();
    event.preventDefault();
    addFacture(factureData).then(() => setFactureData(factureValue));
  };

  const submit = (e: React.FormEvent) => {
    factureData["nomProduit"] = acValue?.nomProduit!;
    factureData["produitID"] = acValue?.produitID!;
    factureData["dateFacturation"] = now.toString();
    e.preventDefault();
    addFacture(factureData).then(() => setFactureData(factureValue));
    console.log("formFields", formFields);
  };
  const [displayText, setDisplayText] = useState<string>("");

  const [codeClient, setCodeClient] = useState<string>("");
  const onChangeCodeClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeClient(e.target.value);
  };

  return (
    <div>
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb title="Créer Devis" pageTitle="Devis" />
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
                        <Col lg={4} sm={6}>
                          <TextField
                            sx={{ width: 380 }}
                            label="Nom Client"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            size="small"
                            type="text"
                            id="nomClient"
                            onChange={onFactureChange}
                            value={factureData.nomClient}
                          />
                        </Col>
                        <Col lg={4} sm={6}>
                          <TextField
                            sx={{ width: 380 }}
                            label="Numero Devis"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            size="small"
                            type="number"
                            id="designationFacture"
                            placeholder="25000355"
                            onChange={onFactureChange}
                            value={factureData.designationFacture}
                          />
                        </Col>
                        <Col lg={4} sm={6}>
                          <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale="de"
                          >
                            <DatePicker
                              sx={{ width: 380 }}
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
                          <Col lg={4}>
                            <Form.Label htmlFor="nomProduit">
                              Détail Produit
                            </Form.Label>
                          </Col>
                          <Col lg={3}>
                            <Form.Label htmlFor="PrixUnitaire">
                              Prix Unitaire
                            </Form.Label>
                          </Col>
                          <Col lg={2}>
                            <Form.Label htmlFor="MontantAR">
                              {" "}
                              Montant après Remise
                            </Form.Label>
                          </Col>
                          <Col lg={1}>
                            <Form.Label htmlFor="quantiteProduit">
                              Quantité
                            </Form.Label>
                          </Col>
                          <Col lg={1}>
                            <Form.Label htmlFor="MontantTotal">
                              Montant{" "}
                            </Form.Label>
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
                                onChange={(event, value) => {
                                  setACValue(value);
                                  const updatedPrixUnitaire = [...formFields];
                                  updatedPrixUnitaire[index].PU =
                                    value!.prixVente!.toString();
                                  setFormFields(updatedPrixUnitaire);
                                }}
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
                                  />
                                )}
                              />
                            </Col>
                            <Col lg={3}>
                              <TextField
                                id="PU"
                                type="number"
                                size="small"
                                name="PU"
                                placeholder="00.00"
                                value={form.PU}
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
                                  onChange={(event) =>
                                    handleFormChange(event, index)
                                  }
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </Col>
                            ) : (
                              ""
                            )}
                            <Col lg={1} sm={6}>
                              <TextField
                                sx={{ width: 80 }}
                                id="quantiteProduit"
                                type="number"
                                size="small"
                                name="qty"
                                placeholder="0.0"
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                                value={form.qty}
                              />
                            </Col>
                            <Col lg={1} sm={6}>
                              <TextField
                                sx={{ width: 95 }}
                                id="MontantTotal"
                                size="small"
                                type="number"
                                name="montanttotal"
                                placeholder="0.0"
                                onChange={(event) =>
                                  handleFormChange(event, index)
                                }
                                value={
                                  (form.montanttotal = (
                                    parseInt(form.prixunitaire) *
                                    parseInt(form.qty)
                                  ).toString())
                                }
                                InputProps={{
                                  readOnly: true,
                                }}
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
                        <Button variant="success" type="submit">
                          <i className="ri-printer-line align-bottom me-1"></i>{" "}
                          Enregister
                        </Button>
                        <Link to="#" className="btn btn-primary">
                          <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                          Telecharger Devis
                        </Link>
                      </div>
                    </Card.Body>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    </div>
  );
};

export default CreateDevis;
