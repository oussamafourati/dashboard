import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import {
  SubCategory,
  useDeleteSubCategoryMutation,
  useFetchSubCategoriesQuery,
} from "features/subCategory/subCategorySlice";

const SubCategoriesTable = () => {
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const { data = [] } = useFetchSubCategoriesQuery();

  const deleteHandler = async (id: any) => {
    await deleteSubCategory(id);
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
        accessor: "parentID",
        Filter: true,
      },
      {
        Header: "subDescription",
        accessor: "subDescription",
        Filter: true,
      },
      {
        Header: "Action",
        accessor: (subCat: SubCategory) => {
          return (
            <span>
              <ul className="hstack gap-2 list-unstyled mb-0">
                <li>
                  <Link
                    to="/sub-categories"
                    onClick={() => deleteHandler(subCat.idSubCategory)}
                    className="badge badge-soft-danger"
                  >
                    Delete
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
