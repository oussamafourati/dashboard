import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Facture {
  idFacture: number;
  designationFacture: string;
  dateFacturation: string;
  datePaiement: string;
  modePaiement: string;
  statusFacture: number;
  clientID: number;
}

export const facturetSlice = createApi({
  reducerPath: "facture",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/factures/",
    headers: {
      "Content-type": "application/json",
    },
  }),
  tagTypes: ["Facture"],
  endpoints(builder) {
    return {
      fetchFactures: builder.query<Facture[], number | void>({
        query() {
          return `/allFactures`;
        },
        providesTags: ["Facture"],
      }),
      fetchOneFacture: builder.query<Facture, number | void>({
        query(idFacture) {
          return `/oneFacture/${idFacture}`;
        },
        providesTags: ["Facture"],
      }),
      fetchFacturePaye: builder.query<Facture[], number | void>({
        query() {
          return "/factureimpaye";
        },
        providesTags: ["Facture"],
      }),
      fetchFactureImpaye: builder.query<Facture[], number | void>({
        query() {
          return "/facturepaye";
        },
        providesTags: ["Facture"],
      }),
      addFacture: builder.mutation<void, Facture>({
        query(payload) {
          return {
            url: `/newFacture`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Facture"],
      }),
      updateFacture: builder.mutation<void, Facture>({
        query: ({ idFacture, ...rest }) => ({
          url: `/editFacture/${idFacture}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["Facture"],
      }),
      deleteFacture: builder.mutation<void, number>({
        query: (idFacture) => ({
          url: `removeFacture/${idFacture}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Facture"],
      }),
    };
  },
});

export const {
  useFetchFactureImpayeQuery,
  useFetchFacturePayeQuery,
  useAddFactureMutation,
  useDeleteFactureMutation,
  useFetchFacturesQuery,
  useUpdateFactureMutation,
  useFetchOneFactureQuery,
} = facturetSlice;
