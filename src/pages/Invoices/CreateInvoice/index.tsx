import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Breadcrumb from "Common/BreadCrumb";
import PassagerInvoice from "./PassagerInvoice";
import ProInvoice from "./ProInvoice";

const CreateInvoice = () => {
  document.title = "Créer Facture | Radhouani";
  const [show, setShow] = useState(true);

  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
      <React.Fragment>
        <div className="page-content">
          <Breadcrumb title="Créer Facture" pageTitle="Factures" />
          <Row>
            <Col className="justify-content-center d-flex">
              <ToggleButtonGroup
                className="mb-2 gap-2"
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton
                  value="Passager"
                  onClick={() => setShow(true)}
                  className="rounded"
                >
                  Passager
                </ToggleButton>
                <ToggleButton
                  value="Professionnel"
                  onClick={() => setShow(false)}
                  className="rounded"
                >
                  Professionnel
                </ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Row>
          {show ? <PassagerInvoice /> : <ProInvoice />}
        </div>
      </React.Fragment>
    </div>
  );
};

export default CreateInvoice;
