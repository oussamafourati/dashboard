import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ArrivageProduit {
  idArrivageProduit: number;
  produitID: number;
  arrivageID: number;
  quantite: number;
  piecejointes?: string;
  prixAchatHt?: number;
  prixAchatTtc?: number;
  prixVente?: number;
  Benifice?: number;
  PourcentageBenifice?: number;
  PrixRemise?: number;
  PourcentageRemise?: number;
  MontantTotalProduit?: number;
  nomProduit?: string;
  designation?: string;
  montantTotal?: number;
  dateArrivage?: string;
  fournisseurID?: number;
  TotalQuantity?: number;
  SUMTOTAL?: number;
  seuil_product?: number;
}

export const arrivageProduitSlice = createApi({
  reducerPath: "arrivageProduit",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/arrivageProduit/",
  }),
  tagTypes: ["ArrivageProduit"],
  endpoints(builder) {
    return {
      getAllArrivagesProduit: builder.query<ArrivageProduit[], number | void>({
        query() {
          return "/allArrivageProduit";
        },
        providesTags: ["ArrivageProduit"],
      }),
      getQtyProduit: builder.query<ArrivageProduit[], number | void>({
        query() {
          return "/qtyProduit";
        },
        providesTags: ["ArrivageProduit"],
      }),
      getOneArrivageProduit: builder.query<ArrivageProduit, number | void>({
        query(idArrivageProduit) {
          return `/oneArrivage/${idArrivageProduit}`;
        },
        providesTags: ["ArrivageProduit"],
      }),
      getOneArrivProduit: builder.query<ArrivageProduit, number>({
        query: (produitID) => `/ArrProduit/${produitID}`,
        providesTags: (result, error, produitID) => [
          { type: "ArrivageProduit", produitID },
        ],
      }),
      getFournisseurProduit: builder.query<ArrivageProduit[], number | void>({
        query: (fournisseurID) => `/fournisseurProduit/${fournisseurID}`,
        providesTags: ["ArrivageProduit"],
      }),
      addArrivageProduit: builder.mutation<void, ArrivageProduit>({
        query(payload) {
          return {
            url: "/newArrivageProduit",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["ArrivageProduit"],
      }),
      updateArrivageProduit: builder.mutation<void, ArrivageProduit>({
        query: ({ idArrivageProduit, ...rest }) => ({
          url: `/updateArrivageProduit/${idArrivageProduit}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["ArrivageProduit"],
      }),
      updateStore: builder.mutation<void, ArrivageProduit>({
        query: ({ idArrivageProduit, ...rest }) => ({
          url: `/updateStore/${idArrivageProduit}`,
          method: "PUT",
          body: rest,
        }),
        invalidatesTags: ["ArrivageProduit"],
      }),
      deleteArrivageProduit: builder.mutation<void, number>({
        query: (idArrivageProduit) => ({
          url: `removeArrivageProduit/${idArrivageProduit}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ArrivageProduit"],
      }),
    };
  },
});

export const {
  useGetQtyProduitQuery,
  useGetFournisseurProduitQuery,
  useGetOneArrivProduitQuery,
  useGetAllArrivagesProduitQuery,
  useGetOneArrivageProduitQuery,
  useAddArrivageProduitMutation,
  useDeleteArrivageProduitMutation,
  useUpdateArrivageProduitMutation,
  useUpdateStoreMutation,
} = arrivageProduitSlice;
