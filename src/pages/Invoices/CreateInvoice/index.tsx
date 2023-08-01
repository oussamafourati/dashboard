import React, { useState } from "react";
import { Row, Col, ToggleButton } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import PassagerInvoice from "./PassagerInvoice";
import ProInvoice from "./ProInvoice";

const CreateInvoice = () => {
  document.title = "Créer Facture | Radhouani";
  const [checked, setChecked] = useState<boolean>(true);
  const [show, setShow] = useState(true);

  return (
    <div>
      <React.Fragment>
        <div className="page-content">
          <Breadcrumb title="Créer Facture" pageTitle="Factures" />
          <Row>
            <Col className="justify-content-center d-flex gap-2 mb-1">
              <ToggleButton
                className="mb-2"
                id="toggle-check"
                type="checkbox"
                variant="outline-info"
                checked={checked}
                value={1}
                onChange={(e) => setChecked(e.currentTarget.checked)}
                onClick={() => setShow(true)}
              >
                Passager
              </ToggleButton>
              <ToggleButton
                className="mb-2"
                id="toggle-check2"
                type="checkbox"
                variant="outline-info"
                onClick={() => setShow(false)}
                checked={!checked}
                value={2}
                onChange={(e) => setChecked(e.currentTarget.checked)}
              >
                Professionnel
              </ToggleButton>
            </Col>
          </Row>
          {show ? <PassagerInvoice /> : <ProInvoice />}
        </div>
      </React.Fragment>
    </div>
  );
};

export default CreateInvoice;
