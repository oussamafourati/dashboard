import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/fr";
import { frFR } from "@mui/x-date-pickers/locales";

import { useAddArrivageMutation } from "features/arrivage/arrivageSlice";
import {
  Fournisseur,
  useFetchFournisseurQuery,
} from "../../../features/fournisseur/fournisseurSlice";

const CreateArrivage = () => {
  document.title = "Arrivage | Radhouani";

  const [fournisseurState, setFournisseurState] = useState<Fournisseur[]>([]);
  const [selected, setSelected] = useState<Fournisseur[]>([]);
  const [fournisseurStateID, setFournisseurStateID] = useState("");
  useEffect(() => {
    const getFournisseur = async () => {
      const reqFournisseur = await fetch(
        "http://localhost:8000/fournisseur/allFournisseur"
      );
      const resFournisseur = await reqFournisseur.json();
      setFournisseurState(resFournisseur);
    };
    getFournisseur();
  }, []);

  const handleFournisseur = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fournisseurId = e.target.value;
    if (fournisseurId !== "") {
      const reqFournisseurData = await fetch(
        `http://localhost:8000/fournisseur/oneFournisseur/${fournisseurId}`
      );
      const resfournisseurdata = await reqFournisseurData.json();
      setSelected(await resfournisseurdata);
      setFournisseurStateID(fournisseurId);
    } else {
      setSelected([]);
    }
  };

  const navigate = useNavigate();
  let now = dayjs();
  const [value, setValue] = React.useState<Dayjs | null>(now);
  const newDate = `${value?.year()}-${value!.month() + 1}-${value!.date()}`;

  const [createArrivage] = useAddArrivageMutation();

  const arrivageValue = {
    idArrivage: Math.floor(100000 + Math.random() * 900000),
    designation: "",
    montantTotal: "",
    dateArrivage: now.toString(),
    raison_sociale: "",
    fournisseurID: 17,
    piecejointe: "",
  };
  const [arrivageData, setArrivageData] = useState(arrivageValue);

  const onChangeArrivage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrivageData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        const base64Data = base64String.split(",")[1]; // Extract only the Base64 data
        resolve(base64Data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      fileReader.readAsDataURL(file);
    });
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (document.getElementById("piecejointe") as HTMLFormElement)
      .files[0];
    const base64 = await convertToBase64(file);
    setArrivageData({
      ...arrivageData,
      piecejointe: base64 as string,
    });
  };

  const onSubmitArrivage = (e: React.FormEvent<HTMLFormElement>) => {
    arrivageData["dateArrivage"] = newDate;
    arrivageData["fournisseurID"] = parseInt(fournisseurStateID);
    e.preventDefault();
    createArrivage(arrivageData).then(() => setArrivageData(arrivageData));
    notify();
    navigate("/nouveau-arrivage-produit", { state: { arrivageData } });
  };

  const notify = () => {
    Swal.fire({
      icon: "success",
      title: "Ajouté",
      text: "L'arrivage a été créer avec succès",
    });
  };

  // All Fournisseur
  const { data: allfournisseur = [] } = useFetchFournisseurQuery();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Arrivage" pageTitle="Tableau de bord" />
          <Card className="mx-auto">
            <Card.Header>
              <h6 className="card-title mb-0" id="addCategoryLabel">
                Créer Achats
              </h6>
            </Card.Header>
            <Card.Body>
              <form
                className="tablelist-form"
                onSubmit={onSubmitArrivage}
                id="formArrivage"
              >
                <input type="hidden" id="id-field" />
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="designation">Designation</Form.Label>
                      <Form.Control
                        type="text"
                        name="designation"
                        id="designation"
                        onChange={onChangeArrivage}
                        value={arrivageData.designation}
                        required
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="montantTotal">
                        Montant Total
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="montantTotal"
                        id="montantTotal"
                        onChange={onChangeArrivage}
                        value={arrivageData.montantTotal}
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label htmlFor="statusSelect" className="form-label">
                        Fournisseur
                      </label>
                      <div className="input-group mb-3">
                        <select
                          className="form-select"
                          name="statusSelect"
                          id="statusSelect"
                          onChange={handleFournisseur}
                        >
                          <option value="">Raison Sociale</option>
                          {allfournisseur.map((fournisseur) => (
                            <option
                              key={fournisseur.idfournisseur}
                              value={fournisseur.idfournisseur}
                            >
                              {fournisseur.raison_sociale}
                            </option>
                          ))}
                        </select>
                        <div className="flex-shrink-0">
                          <Button
                            className="float-end"
                            variant="success"
                            id="add-btn"
                            onClick={() => navigate("/liste-fournisseurs")}
                            style={{ marginLeft: 7 }}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={2}>
                    <div className="mb-3">
                      <Form.Label htmlFor="dateArrivage">
                        Date d'arrivage{" "}
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={2}>
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
                            id: "dateArrivage",
                            name: "dateArrivage",
                            size: "small",
                            inputProps: { ["placeholder"]: "AAAA-MM-DD" },
                          },
                        }}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        format="YYYY-MM-DD"
                      />
                    </LocalizationProvider>
                  </Col>
                </Row>
                <Row>
                  <div className="text-center mb-3">
                    <div className="position-relative d-inline-block">
                      <div className="position-absolute top-100 start-100 translate-middle">
                        <label
                          htmlFor="piecejointe"
                          className="mb-0"
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          title="Select Fournisseur Logo"
                        >
                          <span className="avatar-xs d-inline-block">
                            <span className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                              <i className="ri-image-fill"></i>
                            </span>
                          </span>
                        </label>
                        <input
                          className="d-none"
                          type="file"
                          name="piecejointe"
                          id="piecejointe"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e)}
                        />
                      </div>
                      <div className="avatar-xl">
                        <div className="avatar-title bg-light rounded-4">
                          <img
                            src={`data:image/jpeg;base64, ${arrivageData.piecejointe}`}
                            alt={arrivageData.piecejointe}
                            id="category-img"
                            className="avatar-xl h-auto rounded-4 object-fit-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="hstack gap-2 justify-content-end">
                    <Button
                      variant="success"
                      id="add-btn"
                      type="submit"
                      form="formArrivage"
                    >
                      Ajouter
                    </Button>
                  </div>
                </Row>
              </form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateArrivage;