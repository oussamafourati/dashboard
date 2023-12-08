import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
} from "react-bootstrap";

import withRouter from "Common/withRouter";

//Import Breadcrumb
import Breadcrumb from "Common/BreadCrumb";

import avatar from "../../assets/images/users/avatar.png";
import { useFetchUserInfoQuery } from "features/compte/compteSlice";


const UserProfile = () => {
  document.title = "Profil | Radhouani";

  const [user, setUser] = useState<string>("");
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile") || ""));
  }, []);

 const {data: allInfo = []} = useFetchUserInfoQuery(user);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Tableau de bord" pageTitle="Profil" />

          <Row>
            <Col lg="12">
              <Card>
                <Card.Body>
                  <div className="d-flex">
                    <div className="mx-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                          {allInfo.map((compte)=>(
                            <div key={compte.idCompte}>
                            <Form.Label htmlFor="fullname" className="fs-24 fw-bold">
              Nom: 
            </Form.Label>
            <span id="username" className="fs-20">
                {" "}
                {compte.fullname}
              </span>
            <div className="text-muted mb-2 gap-2">
              {compte.role === 0 ? (
                <span className="badge badge-soft-info text-uppercase fs-18">
                  Caissier
                </span>
              ) : (
                <span className="badge badge-soft-secondary text-uppercase fs-18">
                  Admin
                </span>
              )}
            </div>
            <div className="mb-2">
              <Form.Label htmlFor="username" className="fs-22 fw-bold">
                Nom Utilisateur :
              </Form.Label>
              <span id="username" className="fs-20">
                {" "}
                {compte.username}
              </span>
            </div>
            <div className="mb-2">
              <Form.Label htmlFor="rib" className="fs-22 fw-bold">
                Code :
              </Form.Label>
              <span id="rib" className="fs-20">
                {" "}
                {compte.code}
              </span>
            </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
