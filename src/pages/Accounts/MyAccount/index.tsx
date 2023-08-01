import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import Profile from "./Profile";

const MyAccount = () => {
  document.title = "Liste des comptes | Radhouani";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Liste des comptes" pageTitle="Compte" />
          <Profile />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MyAccount;
