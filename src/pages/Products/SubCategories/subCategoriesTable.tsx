import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import {
  SubCategory,
  useDeleteSubCategoryMutation,
  useFetchSubCategoriesQuery,
} from "features/subCategory/subCategorySlice";
import Swal from "sweetalert2";

const SubCategoriesTable = () => {
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const { data = [] } = useFetchSubCategoriesQuery();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const AlertDelete = async (id: any) => {
    swalWithBootstrapButtons
      .fire({
        title: "Êtes-vous sûr?",
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimez-le !",
        cancelButtonText: "Non, annulez !",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteSubCategory(id);
          swalWithBootstrapButtons.fire(
            "Supprimé !",
            "Le Sous-Catégorie a été supprimé.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Le Sous-Catégorie est en sécurité :)",
            "error"
          );
        }
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "idSubCategory",
        Filter: true,
      },
      {
        Header: "Subcategory",
        accessor: "title",
        Filter: true,
      },
      {
        Header: "Category",
        accessor: "nom",
        Filter: true,
      },
      {
        Header: "subDescription",
        accessor: "subDescription",
        Filter: true,
      },
      {
        Header: "Action",
        Filter: true,
        accessor: (subCat: SubCategory) => {
          return (
            <span>
              <ul className="hstack gap-2 list-unstyled mb-0">
                <li>
                  <Link
                    to="/sub-categories"
                    onClick={() => AlertDelete(subCat.idSubCategory)}
                    className="badge badge-soft-danger"
                  >
                    Supprimer
                  </Link>
                </li>
              </ul>
            </span>
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
          data={data || []}
          isGlobalFilter={true}
          customPageSize={10}
          divClassName="table-responsive mb-1"
          tableClassName="gridjs-table"
          theadClassName="gridjs-thead"
          SearchPlaceholder="Rechercher catégorie, sous-catégorie..."
        />
      </div>
    </React.Fragment>
  );
};

export default SubCategoriesTable;
