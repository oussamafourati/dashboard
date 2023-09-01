import React from "react";
import ChargeWidgets from "./ChargeWidgets";
import VenteWidgets from "./VenteWidgets";
import AchatWidgets from "./AchatWidgets";
import ImpayeWidgets from "./ImpayeWidgets";
import PayeWidgets from "./PayeWidgets";

const Widgets = () => {
  return (
    <React.Fragment>
      <VenteWidgets />
      <AchatWidgets />
      <ChargeWidgets />
      <PayeWidgets />
      <ImpayeWidgets />
    </React.Fragment>
  );
};

export default Widgets;
