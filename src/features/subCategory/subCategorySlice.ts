import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SubCategory {
  idSubCategory: number;
  title: string;
  subDescription: string;
  parentID: number;
  nom?: string;
}

export const subCategorySlice = createApi({
  reducerPath: "subCategory",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.src.com.tn/subCategory/",
  }),
  tagTypes: ["SubCategory"],
  endpoints(builder) {
    return {
      fetchSubCategories: builder.query<SubCategory[], number | void>({
        query() {
          return `/allsubcategories`;
        },
        providesTags: ["SubCategory"],
      }),
      fetchOneSybCategory: builder.query<SubCategory, number | void>({
        query(idSubCategory) {
          return `/one/${idSubCategory}`;
        },
        providesTags: ["SubCategory"],
      }),
      createSubCategory: builder.mutation<void, SubCategory>({
        query(payload) {
          return {
            url: `/newsubcategory`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["SubCategory"],
      }),
      updateSubCategory: builder.mutation<void, SubCategory>({
        query: ({ idSubCategory, ...rest }) => ({
          url: `editsubcategory/${idSubCategory}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["SubCategory"],
      }),
      deleteSubCategory: builder.mutation<void, number>({
        query: (idSubCategory) => ({
          url: `deletesubcategory/${idSubCategory}`,
          method: "DELETE",
        }),
        invalidatesTags: ["SubCategory"],
      }),
    };
  },
});

export const {
  useFetchSubCategoriesQuery,
  useFetchOneSybCategoryQuery,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
} = subCategorySlice;
