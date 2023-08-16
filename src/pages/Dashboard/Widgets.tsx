import { useGetAllArrivagesQuery } from "features/arrivage/arrivageSlice";
import {
  useGetAllChargesQuery,
  useGetChargeDayQuery,
  useGetChargeLastYearQuery,
  useGetChargeThreeMonthsQuery,
} from "features/charge/chargeSlice";
import { useFetchFacturePayeQuery } from "features/facture/factureSlice";
import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import CountUp from "react-countup";
import ChargeWidgets from "./ChargeWidgets";
import VenteWidgets from "./VenteWidgets";
import AchatWidgets from "./AchatWidgets";
import ImpayeWidgets from "./ImpayeWidgets";

interface WidgetsProps {
  id: number;
  name: string;
  amount: number;
  icon: string;
  iconColor: string;
}

const Widgets = () => {
  const { data: allArrivage = [] } = useGetAllArrivagesQuery();
  const { data: facturePaye = [] } = useFetchFacturePayeQuery();
  const arrivageTotal = allArrivage.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const [categoryid, setCategoryid] = useState<number>();
  const handlesousCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const getstateid = e.target.value;
    setCategoryid(parseInt(getstateid));
  };

  return (
    <React.Fragment>
      <VenteWidgets />
      <AchatWidgets />
      <ChargeWidgets />
      <ImpayeWidgets />
    </React.Fragment>
  );
};

export default Widgets;
