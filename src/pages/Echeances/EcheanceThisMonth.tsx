import React from "react";
import { useGetMonthEchancesQuery } from "features/Echance/echanceSlice";

const EcheanceThisMonth = () => {
  const { data: AllEcheancesThisMonth = [] } = useGetMonthEchancesQuery();
  return (
    <React.Fragment>
      <div className="table-responsive table-card">
        <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
          <thead className="text-muted table-light">
            <tr>
              <th scope="col">Montant</th>
              <th scope="col">Date</th>
              <th scope="col">Numéro Chèque</th>
              <th scope="col">Banque</th>
              <th scope="col">Numéro Facture</th>
              <th scope="col">Nom Client</th>
            </tr>
          </thead>
          <tbody>
            {(AllEcheancesThisMonth || []).map((item, key) => (
              <tr key={key}>
                <td>{item.montant}</td>
                <td>{item.dateEchance}</td>
                <td>
                  <span className="text-secondary">{item.numCheque}</span>
                </td>
                <td>{item.nomBanque}</td>
                <td>{item.numeroFacture}</td>
                <td>{item.nomClient}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default EcheanceThisMonth;
