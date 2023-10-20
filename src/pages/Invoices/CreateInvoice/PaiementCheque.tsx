import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/de";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/fr";
import { frFR } from "@mui/x-date-pickers/locales";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";

interface FormFields {
  montant: string;
  dateEchance: string;
  numCheque: string;
  nomBanque: string;
  numeroFacture: string;
  nomClient: string;
  [key: string]: string;
}

const PaiementCheque = () => {
  let now = dayjs();
  const [valueDate, setValueDate] = React.useState<Dayjs | null>(now);
  const newDate = `${valueDate?.year()}-${
    valueDate!.month() + 1
  }-${valueDate!.date()}`;

  const [formFields, setFormFields] = useState<FormFields[]>([
    {
      montant: "",
      dateEchance: "",
      numCheque: "",
      nomBanque: "",
      numeroFacture: "",
      nomClient: "",
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
      montant: "",
      dateEchance: "",
      numCheque: "",
      nomBanque: "",
      numeroFacture: "",
      nomClient: "",
    };
    setFormFields([...formFields, object]);
  };

  const removeFields = (index: number) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  useEffect(() => {
    formFields[formFields.length - 1]["dateEchance"] = newDate;
    localStorage.setItem("echeances", JSON.stringify(formFields));
  }, [formFields]);

  return (
    <div>
      <Card.Body className="p-1">
        <Row>
          <Col lg={2} sm={6}>
            <Form.Label htmlFor="montant">Echéance</Form.Label>
          </Col>
          <Col lg={3} sm={6}>
            <Form.Label htmlFor="dateEchance">Date</Form.Label>
          </Col>
          <Col lg={3} sm={6}>
            <Form.Label htmlFor="numCheque">Numéro de Chèque</Form.Label>
          </Col>
          <Col lg={3} sm={6}>
            <Form.Label htmlFor="nomBanque">Banque (agence)</Form.Label>
          </Col>
          <Col lg={1}></Col>
        </Row>
        {formFields.map((inputField, index) => (
          <Row className="g-3" style={{ marginBottom: 15 }}>
            <Col lg={2} sm={6}>
              <Form.Control
                type="text"
                id="montant"
                name="montant"
                onChange={(event) => handleFormChange(event, index)}
              />
            </Col>
            <Col lg={3} sm={6}>
              <div>
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
                        id: "dateEchance",
                        name: "dateEchance",
                      },
                    }}
                    value={valueDate}
                    onChange={(newValue) => setValueDate(newValue)}
                    format="YYYY-MM-DD"
                  />
                </LocalizationProvider>
              </div>
            </Col>
            <Col lg={3} sm={6}>
              <Form.Control
                type="text"
                id="numCheque"
                name="numCheque"
                onChange={(event) => handleFormChange(event, index)}
                // value={inputField.numCheque}
              />
            </Col>
            <Col lg={3} sm={6}>
              <Form.Control
                type="text"
                id="nomBanque"
                name="nomBanque"
                onChange={(event) => handleFormChange(event, index)}
                // value={inputField.nomBanque}
              />
            </Col>
            <Col lg={1} className="mt-4">
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
      </Card.Body>
      <Button
        onClick={addFields}
        variant="primary"
        className="p-1"
        id="btn-new-event"
      >
        <i className="mdi mdi-plus"></i>{" "}
      </Button>
    </div>
  );
};

export default PaiementCheque;
