import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Compte {
  idCompte: number;
  fullname: string;
  username: string;
  password: string;
  role: number;
  code: string;
  avatar: string;
}

export const compteSlice = createApi({
  reducerPath: "compte",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/user/",
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
      createUser: builder.mutation<void, Compte>({
        query(payload) {
          return {
            url: `/createCompte`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Compte"],
      }),
      login: builder.mutation({
        query(body: { username: string; password: string }) {
          return {
            url: `/login`,
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["Compte"],
      }),
      deleteCompte: builder.mutation<void, number>({
        query: (idCompte) => ({
          url: `removeUser/${idCompte}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Compte"],
      }),
    };
  },
});

export const {
  useLoginMutation,
  useFetchAllUsersQuery,
  useFetchOneUserQuery,
  useCreateUserMutation,
  useDeleteCompteMutation,
} = compteSlice;
