import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Arrivage {
  idArrivage: number;
  designation: string;
  montantTotal: string;
  dateArrivage: string;
  raison_sociale: string;
  fournisseurID?: number;
  piecejointe: string;
}

export const arrivageSlice = createApi({
  reducerPath: "arrivage",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/arrivage/",
  }),
  tagTypes: ["Arrivage"],
  endpoints(builder) {
    return {
      getAllArrivages: builder.query<Arrivage[], number | void>({
        query() {
          return "/allArrivage";
        },
        providesTags: ["Arrivage"],
      }),
      getOneArrivage: builder.query<Arrivage, number | void>({
        query(idArrivage) {
          return `/oneArrivage/${idArrivage}`;
        },
        providesTags: ["Arrivage"],
      }),
      getArrivageByFournisseur: builder.query<Arrivage[], number | void>({
        query(fournisseurID) {
          return `/ArrivagebyFournisseur/${fournisseurID}`;
        },
        providesTags: ["Arrivage"],
      }),
      addArrivage: builder.mutation<void, Arrivage>({
        query(payload) {
          return {
            url: "/newArrivage",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Arrivage"],
      }),
      updateArrivage: builder.mutation<void, Arrivage>({
        query: ({ idArrivage, ...rest }) => ({
          url: `/editArrivage/${idArrivage}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["Arrivage"],
      }),
      deleteArrivage: builder.mutation<void, number>({
        query: (idArrivage) => ({
          url: `removeArrivage/${idArrivage}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Arrivage"],
      }),
    };
  },
});

export const {
  useGetArrivageByFournisseurQuery,
  useAddArrivageMutation,
  useDeleteArrivageMutation,
  useGetAllArrivagesQuery,
  useGetOneArrivageQuery,
  useUpdateArrivageMutation,
} = arrivageSlice;
