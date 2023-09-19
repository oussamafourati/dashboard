import React, { useMemo } from "react";
import {
  Echance,
  useGetWeekEchancesQuery,
} from "features/Echance/echanceSlice";
import { Link } from "react-router-dom";
import TableContainer from "Common/TableContainer";

const EcheanceWeek = () => {
  const { data: AllEcheanceThisWeek = [] } = useGetWeekEchancesQuery();
  const columns = useMemo(
    () => [
      {
        Header: "Nom Client",
        accessor: "nomClient",
        Filter: true,
      },
      {
        Header: "Numéro Facture",
        accessor: (echeance: Echance) => {
          return (
            <React.Fragment>
              <Link
                className="link-secondary"
                to="/details-factures"
                state={echeance}
              >
                {echeance.numeroFacture}
              </Link>
            </React.Fragment>
          );
        },
        Filter: true,
      },
      {
        Header: "Montant",
        accessor: "montant",
        Filter: true,
      },
      {
        Header: "Date",
        accessor: "dateEchance",
        Filter: true,
      },
      {
        Header: "Numéro Chèque",
        accessor: "numCheque",
        Filter: true,
      },
      {
        Header: "Banque",
        accessor: "nomBanque",
        Filter: true,
      },
    ],
    []
  );
  return (
    <React.Fragment>
      <div>
        <TableContainer
          columns={columns}
          data={AllEcheanceThisWeek || []}
          isGlobalFilter={true}
          isAddUserList={false}
          customPageSize={10}
          divClassName="table-responsive mb-1"
          tableClassName="gridjs-table"
          theadClassName="gridjs-thead"
          isProductsFilter={true}
          SearchPlaceholder="Rechercher..."
        />
      </div>
    </React.Fragment>
  );
};

export default EcheanceWeek;
