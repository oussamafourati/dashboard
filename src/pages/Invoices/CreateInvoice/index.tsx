import React, { useState } from "react";

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
        <Switch
          checkedChildren="Passager"
          unCheckedChildren="Pro"
          onClick={toggler}
        />
        {toggle ? <PassagerInvoice /> : <ProInvoice />}
      </div>
    </React.Fragment>
  );
};

export default CreateInvoice;
