import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Produit {
  idproduit: number;
  nomProduit: string;
  imageProduit: string;
  marque: string;
  remarqueProduit: string;
  seuil?: string | string[];
  categoryID?: number;
  nom?: string;
  sousCategoryID?: number;
  title?: string;
}

export const produitSlice = createApi({
  reducerPath: "produit",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://app.src.smartschools.tn/product/",
    baseUrl: "https://app.src.com.tn/product/",
  }),
  tagTypes: ["Produit"],
  endpoints(builder) {
    return {
      fetchProduits: builder.query<Produit[], number | void>({
        query() {
          return `/getAllProducts`;
        },
        providesTags: ["Produit"],
      }),
      getProduit: builder.query<Produit, number>({
        query: (idproduit) => `getOneProduct/${idproduit}`,
        providesTags: (result, error, idproduit) => [
          { type: "Produit", idproduit },
        ],
      }),
      getProductByName: builder.query<Produit, string>({
        query: (nomProduit) => `getnomProduct/${nomProduit}`,
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
      updateProduct: builder.mutation<void, Produit>({
        query: ({ idproduit, ...rest }) => ({
          url: `updateproduct/${idproduit}`,
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
  useGetProduitQuery,
  useFetchProduitsQuery,
  useGetProductByNameQuery,
  useAddProduitMutation,
  useDeleteProduitMutation,
  useUpdateProductMutation,
} = produitSlice;
