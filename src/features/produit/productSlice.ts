import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Produit {
  idproduit: number;
  nomProduit: string;
  imageProduit: string;
  marque: string;
  prixAchatHt: number;
  prixAchatTtc: number;
  prixVente: number;
  remise: number;
  remarqueProduit: string;
  nom: string;
}

export const produitSlice = createApi({
  reducerPath: "produit",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/product/",
  }),
  tagTypes: ["Produit"],
  endpoints(builder) {
    return {
      fetchProduits: builder.query<Produit[], number | void>({
        query() {
          return `/getAll`;
        },
        providesTags: ["Produit"],
      }),
      addProduit: builder.mutation<void, Produit>({
        query(payload) {
          return {
            url: "/newProduct",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Produit"],
      }),
      updateProduit: builder.mutation<void, Produit>({
        query: ({ idproduit, ...rest }) => ({
          url: `/updateproduct/${idproduit}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["Produit"],
      }),
      deleteProduit: builder.mutation<void, number>({
        query: (idproduit) => ({
          url: `deleteproduct/${idproduit}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Produit"],
      }),
    };
  },
});

export const {
  useFetchProduitsQuery,
  useAddProduitMutation,
  useDeleteProduitMutation,
  useUpdateProduitMutation,
} = produitSlice;
