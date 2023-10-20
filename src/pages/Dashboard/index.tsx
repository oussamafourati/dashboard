import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Revenue from "./Revenue";
import Widgets from "./Widgets";
import EcheanceToDay from "./EcheanceToDay";
import MeilleuresVentes from "./MeilleuresVentes";
import TopCategories from "./TopCategories";
import TransitionAlerts from "./AlertMessage";
import { useGetDayEchancesQuery } from "features/Echance/echanceSlice";
import AlertStock from "./AlertStock";
import AlertCharge from "./AlertCharge";
import Notes from "./Notes";
import { useFetchNotesDayQuery } from "features/notes/notesSlice";
import AlertNote from "./AlertNote";

const Dashboard = () => {
  document.title = "Tableau de bord | Radhouani";
  const { data: AllEcheancesForToDay = [] } = useGetDayEchancesQuery();
  const { data = [] } = useFetchNotesDayQuery();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {AllEcheancesForToDay.length > 0 ? (
            <Row>
              <TransitionAlerts />
            </Row>
          ) : (
            ""
          )}
          {data.length > 0 ? (
            <Row>
              <AlertNote />
            </Row>
          ) : (
            ""
          )}
          <Row>
            <Widgets />
          </Row>
          <Row>
            <Col lg={3}>
              <Row>
                <AlertStock />
              </Row>
              <Row>
                <AlertCharge />
              </Row>
            </Col>
            <Col lg={5}>
              <Revenue />
            </Col>
            <Col lg={4}>
              <EcheanceToDay />
            </Col>
          </Row>
          <Row>
            <MeilleuresVentes />
            <TopCategories />
            <Notes />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
