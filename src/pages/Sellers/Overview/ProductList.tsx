import React, { useMemo } from "react";
import TableContainer from "Common/TableContainer";
import { Link } from "react-router-dom";
import { Produit } from "features/produit/productSlice";
import { useGetFournisseurProduitQuery } from "features/arrivageProduit/arrivageProduitSlice";

interface MyProps {
  idfournisseur: number;
}

const ProductList = ({ idfournisseur }: MyProps) => {
  const { data: AllProductByFournisseur = [] } =
    useGetFournisseurProduitQuery(idfournisseur);

  const columns = useMemo(
    () => [
      {
        Header: "Nom Produit",
        Filter: true,
        accessor: (produit: Produit) => {
          return (
            <>
              <div className="d-flex align-items-center gap-2">
                <div className="flex-shrink-0">
                  <img
                    src={`data:image/jpeg;base64, ${produit.imageProduit}`}
                    alt=""
                    className="avatar-xs rounded-circle user-profile-img"
                  />
                </div>
                <div className="flex-grow-1 ms-2 user_name">
                  {produit.nomProduit}
                </div>
              </div>
            </>
          );
        },
      },
      {
        Header: "Date Arrivage",
        accessor: "dateArrivage",
        Filter: true,
      },
      {
        Header: "Description",
        accessor: "remarqueProduit",
        Filter: true,
      },
      {
        Header: "Prix Achat TTC",
        accessor: "prixAchatTtc",
        Filter: true,
      },
      {
        Header: "Prix Vente",
        accessor: "prixVente",
        Filter: true,
      },
      {
        Header: "Quantite",
        accessor: "quantite",
        Filter: true,
      },
      {
        Header: "Montant Total Produit",
        accessor: "MontantTotalProduit",
        Filter: true,
      },
      {
        Header: "Action",
        Filter: false,
        accessor: (produit: Produit) => {
          return (
            <React.Fragment>
              <Link
                className="link-success"
                to="/product-overview"
                state={produit}
              >
                <i className="ri-eye-line ri-xl" />
              </Link>
            </React.Fragment>
          );
        },
      },
    ],
    []
  );
  return (
    <React.Fragment>
      <div>
        <TableContainer
          columns={columns}
          data={AllProductByFournisseur || []}
          isGlobalFilter={true}
          isAddUserList={false}
          customPageSize={10}
          tableClassName="gridjs-table"
          theadClassName="gridjs-thead"
          isProductsFilter={true}
          SearchPlaceholder="Rechercher..."
        />
      </div>
    </React.Fragment>
  );
};

export default ProductList;
