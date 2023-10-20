import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Fournisseur {
  idfournisseur: number;
  raison_sociale: string;
  adresse: string;
  tel: string;
  mail: string;
  type: number;
  matricule_fiscale: string;
  logo: string;
  rib: string;
  etat: number;
  piecejointes: string;
}

export const fournisseurSlice = createApi({
  reducerPath: "fournisseur",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.src.smartschools.tn/fournisseur/",
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
