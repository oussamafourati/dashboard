import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface BondeLivraison {
  idbl: number;
  designationBL: string;
  dateBL: string;
  montant: number;
  clientid: number;
  raison_sociale: string;
  PU: string;
  montantTtl: string;
  quantiteProduit: string;
  productName: string;
  adresse: string;
  tel: string;
}

export const blSlice = createApi({
  reducerPath: "bl",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/bl/",
  }),
  tagTypes: ["BondeLivraison"],
  endpoints(builder) {
    return {
      fetchAllBL: builder.query<BondeLivraison[], number | void>({
        query: () => "/allBL",
        providesTags: (result) =>
          result
            ? result.map(({ idbl }) => ({ type: "BondeLivraison", idbl }))
            : ["BondeLivraison"],
      }),
      fetchOneBL: builder.query<BondeLivraison, number | void>({
        query(idbl) {
          return `/oneBL/${idbl}`;
        },
        providesTags: ["BondeLivraison"],
      }),
      fetchBLLigneVente: builder.query<BondeLivraison[], number | void>({
        query(idbl) {
          return `/tousLignesVente/${idbl}`;
        },
        providesTags: ["BondeLivraison"],
      }),
      getAllBLYear: builder.query<BondeLivraison[], number | void>({
        query: () => "/allBLyear",
        providesTags: (result) =>
          result
            ? result.map(({ idbl }) => ({ type: "BondeLivraison", idbl }))
            : ["BondeLivraison"],
      }),
      getAllBLDay: builder.query<BondeLivraison[], number | void>({
        query: () => "/allBLday",
        providesTags: (result) =>
          result
            ? result.map(({ idbl }) => ({ type: "BondeLivraison", idbl }))
            : ["BondeLivraison"],
      }),
      getAllBLWeek: builder.query<BondeLivraison[], number | void>({
        query: () => "/allBLweek",
        providesTags: (result) =>
          result
            ? result.map(({ idbl }) => ({ type: "BondeLivraison", idbl }))
            : ["BondeLivraison"],
      }),
      getAllBLMonth: builder.query<BondeLivraison[], number | void>({
        query: () => "/allBLmonth",
        providesTags: (result) =>
          result
            ? result.map(({ idbl }) => ({ type: "BondeLivraison", idbl }))
            : ["BondeLivraison"],
      }),
      createNewBL: builder.mutation<void, BondeLivraison>({
        query(payload) {
          return {
            url: `/newBL`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["BondeLivraison"],
      }),
      updateBL: builder.mutation<void, BondeLivraison>({
        query: ({ idbl, ...rest }) => ({
          url: `editBL/${idbl}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["BondeLivraison"],
      }),
      deleteBL: builder.mutation<void, number>({
        query: (idbl) => ({
          url: `/deleteBL/${idbl}`,
          method: "DELETE",
        }),
        invalidatesTags: ["BondeLivraison"],
      }),
    };
  },
});

export const {
  useGetAllBLDayQuery,
  useGetAllBLMonthQuery,
  useGetAllBLWeekQuery,
  useGetAllBLYearQuery,
  useFetchBLLigneVenteQuery,
  useCreateNewBLMutation,
  useDeleteBLMutation,
  useFetchAllBLQuery,
  useFetchOneBLQuery,
  useUpdateBLMutation,
} = blSlice;
