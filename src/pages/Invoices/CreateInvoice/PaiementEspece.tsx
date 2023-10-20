import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/de";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/fr";
import { frFR } from "@mui/x-date-pickers/locales";
import { Link } from "react-router-dom";

const PaiementEspece = () => {
  const [inputFields, setInputFields] = useState<string[]>([""]);
  let now = dayjs();
  const [valueDate, setValueDate] = React.useState<Dayjs | null>(now);
  const newDate = `${valueDate?.year()}-${
    valueDate!.month() + 1
  }-${valueDate!.date()}`;
  const handleAddFields = () => {
    const newInputFields = [...inputFields];
    newInputFields[inputFields.length - 1] = newDate;
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

  return (
    <div>
      <Card.Body className="p-1">
        <Row>
          <Col lg={6}>
            <Form.Label htmlFor="invoicenoInput">Echéance</Form.Label>
          </Col>
          <Col lg={6}>
            <Form.Label htmlFor="date">Date</Form.Label>
          </Col>
        </Row>
        {inputFields.map((inputField, index) => (
          <Row className="g-3" style={{ marginBottom: 15 }}>
            <Col lg={6} sm={9}>
              <Form.Control
                type="text"
                id="invoicenoInput"
                name="invoicenoInput"
              />
            </Col>
            <Col lg={4} sm={9}>
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
                        id: "dateCharges",
                        name: "dateCharges",
                      },
                    }}
                    value={valueDate}
                    onChange={(newValue) => setValueDate(newValue)}
                    format="YYYY-MM-DD"
                  />
                </LocalizationProvider>
              </div>
            </Col>
            <Col lg={1} sm={6} className="mt-4">
              <Link
                to="#"
                className="link-danger"
                onClick={() => handleRemoveFields(index)}
              >
                <i className="ri-close-fill ri-xl" />
              </Link>
            </Col>
          </Row>
        ))}
      </Card.Body>
      <Button
        onClick={handleAddFields}
        variant="primary"
        className="p-1"
        id="btn-new-event"
      >
        <i className="mdi mdi-plus"></i>{" "}
      </Button>
    </div>
  );
};

export default PaiementEspece;
