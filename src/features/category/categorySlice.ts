import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Category {
  idcategory: number;
  nom: string;
  image: string;
  id_parent: number;
  final_level: number;
}

export const categorySlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/category",
  }),
  tagTypes: ["Category"],
  endpoints(builder) {
    return {
      fetchCategories: builder.query<Category[], number | void>({
        query: () => "/all",
        providesTags: (result) =>
          result
            ? result.map(({ idcategory }) => ({ type: "Category", idcategory }))
            : ["Category"],
      }),
      fetchOneCategory: builder.query<Category, number | void>({
        query(idCategory) {
          return `/one/${idCategory}`;
        },
        providesTags: ["Category"],
      }),
      createCategory: builder.mutation<void, Category>({
        query(payload) {
          return {
            url: `/new`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Category"],
      }),
      updateCategory: builder.mutation<void, Category>({
        query: ({ idcategory, ...rest }) => ({
          url: `edit/${idcategory}`,
          method: "PUT",
          body: rest,
        }),
        invalidatesTags: ["Category"],
      }),
      deleteCategory: builder.mutation<void, number>({
        query: (idcategory) => ({
          url: `/delete/${idcategory}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Category"],
      }),
    };
  },
});

export const {
  useFetchCategoriesQuery,
  useFetchOneCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categorySlice;
