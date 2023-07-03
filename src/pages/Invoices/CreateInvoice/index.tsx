import React, { useState } from "react";
import Breadcrumb from "Common/BreadCrumb";
import { Switch } from "antd";

import PassagerInvoice from "./PassagerInvoice";
import ProInvoice from "./ProInvoice";

const CreateInvoice = () => {
  document.title = "Créer Facture | Radhouani";

  const [toggle, setToggle] = useState<boolean>(false);
  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumb title="Créer Facture" pageTitle="Factures" />
        <Switch
          checkedChildren="Pro"
          unCheckedChildren="Passager"
          onClick={toggler}
        />
        {toggle ? <ProInvoice /> : <PassagerInvoice />}
      </div>
    </React.Fragment>
  );
};

export default CreateInvoice;
