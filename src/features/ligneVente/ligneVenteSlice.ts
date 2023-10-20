import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LigneVente {
  PU: string;
  montantTtl: string;
  quantiteProduit: string;
  productName: string;
  numFacture: string;
  benifice: string;
  numDevis?: string;
  numBL?: string;
  blID?: string;
  factureID?: string;
  devisID?: string;
  TotalQuantity?: number;
  TotalVente?: number;
  nom?: string;
  total_sold?: number;
}

export const LigneVenteSlice = createApi({
  reducerPath: "lignevente",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.src.smartschools.tn/lignevente/",
    headers: {
      "Content-type": "application/json",
    },
  }),
  tagTypes: ["LigneVente"],
  endpoints(builder) {
    return {
      fetchAllLigneVente: builder.query<LigneVente[], number | void>({
        query(numFacture) {
          return `/allLigneVente/:${numFacture}`;
        },
        providesTags: ["LigneVente"],
      }),
      fetchTopSelling: builder.query<LigneVente[], number | void>({
        query() {
          return `/topselling`;
        },
        providesTags: ["LigneVente"],
      }),
      fetchTopCategories: builder.query<LigneVente[], number | void>({
        query() {
          return `/topcategories`;
        },
        providesTags: ["LigneVente"],
      }),
      fetchOneLigneVente: builder.query<LigneVente, number | void>({
        query(idlignevente) {
          return `/oneLigneVente/${idlignevente}`;
        },
        providesTags: ["LigneVente"],
      }),
      createNewLigneVente: builder.mutation<void, LigneVente>({
        query(payload) {
          return {
            url: `/newLigneVente`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["LigneVente"],
      }),
      deleteLigneVente: builder.mutation<void, number>({
        query: (idlignevente) => ({
          url: `removeLigneVente/${idlignevente}`,
          method: "DELETE",
        }),
        invalidatesTags: ["LigneVente"],
      }),
    };
  },
});

export const {
  useFetchTopCategoriesQuery,
  useFetchTopSellingQuery,
  useCreateNewLigneVenteMutation,
  useDeleteLigneVenteMutation,
  useFetchAllLigneVenteQuery,
  useFetchOneLigneVenteQuery,
} = LigneVenteSlice;
