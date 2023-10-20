import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/de";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/fr";
import { frFR } from "@mui/x-date-pickers/locales";
import { useAddNewNoteMutation } from "features/notes/notesSlice";

const AddNote = () => {
  let now = dayjs();
  const [value, setValue] = React.useState<Dayjs | null>(now);
  const newDate = `${value?.year()}-${value!.month() + 1}-${value!.date()}`;

  const navigate = useNavigate();

  const [addNewNote] = useAddNewNoteMutation();

  const [noteData, setNoteData] = useState({
    idNote: 1,
    nomNote: "",
    description: "",
    created_at: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmitNote = (e: React.FormEvent<HTMLFormElement>) => {
    noteData["created_at"] = newDate;
    e.preventDefault();
    addNewNote(noteData).then(() =>
      setNoteData({
        idNote: 1,
        nomNote: "",
        description: "",
        created_at: "",
      })
    );
    notifyNote();
    navigate("/");
  };

  const notifyNote = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "La Note a été créer avec succès",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  return (
    <React.Fragment>
      <form
        id="createproduct-form"
        autoComplete="off"
        className="needs-validation"
        onSubmit={onSubmitNote}
      >
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div className="mb-3">
                  <Form.Label htmlFor="nomNote">Titre</Form.Label>
                  <Form.Control
                    type="text"
                    id="nomNote"
                    required
                    onChange={onChange}
                    value={noteData.nomNote}
                  />
                </div>
                <Col lg={7}>
                  <div className="hstack gap-5 mb-3">
                    <Form.Label htmlFor="created_at">Date Charge</Form.Label>
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
                            id: "created_at",
                            name: "created_at",
                            inputProps: { ["placeholder"]: "AAAA.MM.DD" },
                          },
                        }}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        format="YYYY-MM-DD"
                      />
                    </LocalizationProvider>
                  </div>
                </Col>
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="description">Description</Form.Label>
                      <Form.Control
                        type="text"
                        id="description"
                        value={noteData.description}
                        onChange={onChange}
                        as="textarea"
                        rows={3}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <div className="text-end">
                    <Button variant="primary" type="submit" className="w-sm">
                      Ajouter
                    </Button>
                  </div>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </form>
    </React.Fragment>
  );
};

export default AddNote;
