import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Compte {
  idCompte: number;
  username: string;
  password: string;
  role: number;
  code: string;
}

export const compteSlice = createApi({
  reducerPath: "compte",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/user",
  }),
  tagTypes: ["Compte"],
  endpoints(builder) {
    return {
      fetchAllUsers: builder.query<Compte[], number | void>({
        query() {
          return `/allUsers`;
        },
        providesTags: ["Compte"],
      }),
      fetchOneUser: builder.query<Compte, string | void>({
        query: (code) => `/oneUser/${code}`,
        providesTags: ["Compte"],
      }),
      //   createCategory: builder.mutation<void, Compte>({
      //     query(payload) {
      //       return {
      //         url: `/new`,
      //         method: "POST",
      //         body: payload,
      //       };
      //     },
      //     invalidatesTags: ["Category"],
      //   }),
      //   updateCategory: builder.mutation<void, Category>({
      //     query: ({ idcategory, ...rest }) => ({
      //       url: `edit/${idcategory}`,
      //       method: "PUT",
      //       body: rest,
      //     }),
      //     invalidatesTags: ["Category"],
      //   }),
      //   deleteCategory: builder.mutation<void, number>({
      //     query: (idcategory) => ({
      //       url: `delete/${idcategory}`,
      //       method: "DELETE",
      //     }),
      //     invalidatesTags: ["Category"],
      //   }),
    };
  },
});

export const { useFetchAllUsersQuery, useFetchOneUserQuery } = compteSlice;
