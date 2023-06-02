import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Fournisseur {
  idfournisseur: number;
  raison_sociale: string;
  adresse: string;
  tel: number;
  mail: string;
  type: number;
  matricule_fiscale: number;
  logo: string;
  rib: number;
  etat: number;
  piecejointes: string;
}

export const fournisseurSlice = createApi({
  reducerPath: "fournisseur",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/fournisseur/",
  }),
  tagTypes: ["Fournisseur"],
  endpoints(builder) {
    return {
      fetchFournisseur: builder.query<Fournisseur[], number | void>({
        query() {
          return `/allFournisseur`;
        },
        providesTags: ["Fournisseur"],
      }),
      addFournisseur: builder.mutation<void, Fournisseur>({
        query(payload) {
          return {
            url: "/newfournisseur",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Fournisseur"],
      }),
      updateFournisseur: builder.mutation<void, Fournisseur>({
        query: ({ idfournisseur, ...rest }) => ({
          url: `/editFournisseur/${idfournisseur}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["Fournisseur"],
      }),
      deleteFournisseur: builder.mutation<void, number>({
        query: (idfournisseur) => ({
          url: `deleteFournisseur/${idfournisseur}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Fournisseur"],
      }),
    };
  },
});

export const {
  useAddFournisseurMutation,
  useDeleteFournisseurMutation,
  useFetchFournisseurQuery,
  useUpdateFournisseurMutation,
} = fournisseurSlice;
