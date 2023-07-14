import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import PassagerInvoice from "./PassagerInvoice";
import ProInvoice from "./ProInvoice";

const CreateInvoice = () => {
  document.title = "Créer Facture | Radhouani";
  const [buttonText, setButtonText] = useState("Passager");
  const [toggle, setToggle] = useState(true);
  const handleClick = (text: string) => {
    setButtonText(text);
    setToggle(!toggle);
    setButtonText(text);
  };
  const [show, setShow] = useState(true);
  return (
    <div>
      <React.Fragment>
        <div className="page-content">
          <Breadcrumb title="Créer Facture" pageTitle="Factures" />
          <Row>
            <Col className="justify-content-center d-flex gap-2 mb-2">
              <Button
                variant="outline-info"
                onClick={() => setShow(true)}
                size="sm"
              >
                Passager
              </Button>
              <Button
                variant="outline-info"
                onClick={() => setShow(false)}
                size="sm"
              >
                Professionnel
              </Button>
            </Col>
          </Row>
          {show ? <PassagerInvoice /> : <ProInvoice />}
        </div>
      </React.Fragment>
    </div>
  );
};

export default CreateInvoice;
