import React, { useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import {
  useFetchNotesDayQuery,
  useFetchNotesMonthQuery,
  useFetchNotesNextMonthQuery,
  useFetchNotesWeekQuery,
  useGetAllNotesQuery,
} from "features/notes/notesSlice";

const DetailsNote = () => {
  const { data: noteToDay = [] } = useFetchNotesDayQuery();

  const { data: noteThisWeek = [] } = useFetchNotesWeekQuery();

  const { data: noteThisMonth = [] } = useFetchNotesMonthQuery();

  const { data: notesNextMonth = [] } = useFetchNotesNextMonthQuery();

  const { data: AllNotes = [] } = useGetAllNotesQuery();

  const [clickedButton, setClickedButton] = useState("Tous");

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setClickedButton(button.name);
  };

  return (
    <React.Fragment>
      <Col>
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-end">
              <Button
                variant="soft-secondary"
                size="sm"
                className={clickedButton === "all" ? "me-1 active" : "me-1"}
                onClick={buttonHandler}
                name="all"
              >
                Tous
              </Button>
              <Button
                variant="soft-secondary"
                size="sm"
                className={clickedButton === "Tous" ? "me-1 active" : "me-1"}
                onClick={buttonHandler}
                name="Tous"
              >
                aujourd'hui
              </Button>
              <Button
                variant="soft-secondary"
                size="sm"
                name="1Mois"
                className={clickedButton === "1Mois" ? "me-1 active" : "me-1"}
                onClick={buttonHandler}
              >
                ce semaine
              </Button>
              <Button
                variant="soft-secondary"
                size="sm"
                name="6Mois"
                className={clickedButton === "6Mois" ? "me-1 active" : "me-1"}
                onClick={buttonHandler}
              >
                mois en cours
              </Button>
              <Button
                variant="soft-secondary"
                size="sm"
                name="1Annee"
                className={clickedButton === "1Annee" ? "me-1 active" : "me-1"}
                onClick={buttonHandler}
              >
                mois prochain
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            {clickedButton === "Tous" ? (
              <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                <thead className="text-muted table-light">
                  <tr>
                    <th scope="col">Titre</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(noteToDay || []).map((item, key) => (
                    <tr key={key}>
                      <td>
                        <strong>{item.nomNote}</strong>
                      </td>
                      <td>{item.description}</td>
                      <td>{item.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : clickedButton === "1Mois" ? (
              <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                <thead className="text-muted table-light">
                  <tr>
                    <th scope="col">Titre</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(noteThisWeek || []).map((item, key) => (
                    <tr key={key}>
                      <td>
                        <strong>{item.nomNote}</strong>
                      </td>
                      <td>{item.description}</td>
                      <td>{item.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : clickedButton === "6Mois" ? (
              <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                <thead className="text-muted table-light">
                  <tr>
                    <th scope="col">Titre</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(noteThisMonth || []).map((item, key) => (
                    <tr key={key}>
                      <td>
                        <strong>{item.nomNote}</strong>
                      </td>
                      <td>{item.description}</td>
                      <td>{item.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : clickedButton === "1Annee" ? (
              <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                <thead className="text-muted table-light">
                  <tr>
                    <th scope="col">Titre</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(notesNextMonth || []).map((item, key) => (
                    <tr key={key}>
                      <td>
                        <strong>{item.nomNote}</strong>
                      </td>
                      <td>{item.description}</td>
                      <td>{item.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : clickedButton === "all" ? (
              <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                <thead className="text-muted table-light">
                  <tr>
                    <th scope="col">Titre</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(AllNotes || []).map((item, key) => (
                    <tr key={key}>
                      <td>
                        <strong>{item.nomNote}</strong>
                      </td>
                      <td>{item.description}</td>
                      <td>{item.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default DetailsNote;
