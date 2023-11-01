import React from "react";
import { Container } from "react-bootstrap";

// Import Components
import Breadcrumb from "Common/BreadCrumb";
import PersonalInformation from "./PersonalInformation";

const Settings = () => {
  document.title = "Créer Compte | Radhouani";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Créer Compte" pageTitle="Comptes" />
          <PersonalInformation />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Settings;
