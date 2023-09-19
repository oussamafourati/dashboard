import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/de";
import dayjs, { Dayjs } from "dayjs";
import { Link } from "react-router-dom";
import "dayjs/locale/fr";
import { frFR } from "@mui/x-date-pickers/locales";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Swal from "sweetalert2";
import {
  ArrivageProduit,
  useGetAllArrivagesProduitQuery,
} from "features/arrivageProduit/arrivageProduitSlice";
import { useAddNewDevisMutation } from "features/devis/devisSlice";
import {
  incremented,
  amountAdded,
} from "../../../features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import CountUp from "react-countup";

interface FormFields {
  PU: string;
  quantiteProduit: string;
  productName: string;
  montantTtl: string;
  numDevis: string;
  subTtl: string;
  [key: string]: string;
}

const CreateDevis = () => {
  document.title = "Créer Devis | Radhouani";
  const count = useAppSelector((state) => state.counter.value);
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

  // Get All Arrivage/Produit
  const { data: allArrivageProduit = [] } = useGetAllArrivagesProduitQuery();

  const [acValue, setACValue] = useState<ArrivageProduit | null>(
    allArrivageProduit[0]
  );

  let now = dayjs();
  const [value, setValue] = React.useState<Dayjs | null>(now);
  const newDate = `${value?.year()}-${value!.month() + 1}-${value!.date()}`;
  let numDevis = `${count}/${value?.year()}`;
  const [idDevis, setIdDevis] = useState(1);
  const [designationDevis, setDesignationDevis] = useState("");
  const [montantDevis, setMontantDevis] = useState("");
  const [dateDevis, setDateDevis] = useState("");
  const [nomclient, setNomclient] = useState("");
  const [addFacture, { isLoading }] = useAddNewDevisMutation();

  async function handleAddDevis() {
    try {
      await addFacture({
        idDevis,
        designationDevis: numDevis,
        montantDevis,
        dateDevis: newDate,
        nomclient,
      }).unwrap();
      setDesignationDevis("");
      setMontantDevis("");
      setDateDevis("");
      setNomclient("");
      notify();
    } catch (err) {
      console.log(err);
    }
  }

  const [formFields, setFormFields] = useState<FormFields[]>([
    {
      PU: "",
      montantTtl: "",
      quantiteProduit: "",
      productName: "",
      numDevis: "",
      subTtl: "",
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

  const addFields = (e: React.FormEvent) => {
    let object: FormFields = {
      PU: "",
      montantTtl: "",
      quantiteProduit: "",
      productName: acValue?.nomProduit!,
      numDevis: designationDevis,
      subTtl: "",
    };
    setFormFields([...formFields, object]);
    // e.preventDefault();
    // createLigneVente(object);
  };
  const removeFields = (index: number) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
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
                  <Card.Body className="border-bottom border-bottom-dashed p-4">
                    <Row>
                      <Col lg={4} sm={6}>
                        <TextField
                          label="Nom Client"
                          sx={{ width: 290 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          size="small"
                          type="text"
                          id="nomclient"
                          value={nomclient}
                          onChange={(e) => setNomclient(e.target.value)}
                          className="mb-2"
                        />
                      </Col>
                      <Col lg={4} sm={6}>
                        <TextField
                          label="Numero Devis"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          size="small"
                          type="text"
                          id="designationDevis"
                          placeholder="5/2023"
                          value={numDevis}
                          InputProps={{
                            readOnly: true,
                          }}
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
                                inputProps: { ["placeholder"]: "JJ.MM.AAAA" },
                              },
                            }}
                            sx={{ width: 290 }}
                            className="mb-2"
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
                        <Col lg={6}>
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
                          <Form.Label
                            htmlFor="MontantTotal"
                            className="text-center"
                          >
                            Montant{" "}
                          </Form.Label>
                        </Col>
                        <Col lg={1}></Col>
                      </Row>
                      {formFields.map((form, index) => (
                        <Row style={{ marginBottom: 20 }} key={index}>
                          <Col lg={6}>
                            <Autocomplete
                              className="mb-2"
                              id="nomProduit"
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
                              id="quantiteProduit"
                              type="number"
                              size="small"
                              name="qty"
                              placeholder="0.0"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={form.qty}
                              className="mb-2"
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
                              className="mb-2"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                            /> */}
                            <CountUp end={parseInt(form.PU)} separator="," />
                          </Col>
                          <Col lg={2} sm={6} className="text-center mt-2">
                            {/* <TextField
                              className="mb-2"
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
                                  parseInt(form.PU) * parseInt(form.qty)
                                ).toString())
                              }
                              InputProps={{
                                readOnly: true,
                              }}
                            /> */}
                            <CountUp
                              end={parseInt(
                                (form.montanttotal = (
                                  parseInt(form.PU) * parseInt(form.qty)
                                ).toString())
                              )}
                              separator=","
                            />
                          </Col>
                          <Col lg={1} className="mt-2">
                            <Link
                              to="#"
                              className="link-danger"
                              onClick={() => removeFields(index)}
                            >
                              <i className="ri-close-fill ri-xl" />
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
                            <Button
                              id="add-item"
                              className="btn btn-secondary fw-medium"
                              onClick={addFields}
                            >
                              <i className="ri-add-fill me-1 align-bottom"></i>
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <Row className="border-top border-top-dashed mt-3">
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
                      </Col> */}
                      <Col className="col-md-auto ms-auto mt-4">
                        <Form.Label htmlFor="total" className="fs-18 fw-bold">
                          Total:{" "}
                        </Form.Label>
                      </Col>
                      <Col className="col-md-auto ms-auto pb-2 mt-4">
                        <CountUp
                          className="fs-18 fw-meduim"
                          end={
                            formFields.reduce(
                              (sum, i) => (sum += parseInt(i.montanttotal!)),
                              0
                            ) || 0
                          }
                          separator=","
                          startVal={0}
                        />
                      </Col>
                    </Row>
                    <div className="hstack gap-2 justify-content-end d-print-none mt-3">
                      <Button
                        variant="success"
                        type="submit"
                        onClick={handleClick}
                      >
                        <i className="ri-save-3-fill align-bottom me-1"></i>{" "}
                        Enregister
                      </Button>
                      <Link to="#" className="btn btn-primary">
                        <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                        Telecharger
                      </Link>
                    </div>
                  </Card.Body>
                  {/* </Form> */}
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
