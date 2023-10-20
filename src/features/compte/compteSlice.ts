import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "app/store";

export interface UserResponse {
  results: Compte;
  token: string;
  message: string;
}
export interface Compte {
  idCompte: number;
  fullname: string;
  username: string;
  password: string;
  role: number;
  code: string;
  avatar: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const compteSlice = createApi({
  reducerPath: "compte",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.src.smartschools.tn/user/",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
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
      login: builder.mutation<UserResponse, LoginRequest>({
        query: (credentials) => ({
          url: "/login",
          method: "POST",
          body: credentials,
        }),
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
