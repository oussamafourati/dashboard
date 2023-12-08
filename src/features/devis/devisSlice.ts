import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Devis {
  idDevis: number;
  designationDevis: string;
  montantDevis: string;
  dateDevis?: string;
  nomclient?: string;
  PU?: string;
  montantTtl?: string;
  quantiteProduit?: string;
  productName?: string;
  employee?: string;
}

export const devisSlice = createApi({
  reducerPath: "devis",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.src.com.tn/devis/",
  }),
  tagTypes: ["Devis"],
  endpoints(builder) {
    return {
      getDevis: builder.query<Devis[], number | void>({
        query() {
          return "/allDevis";
        },
        providesTags: ["Devis"],
      }),
      getDevisLigneVente: builder.query<Devis[], number | void>({
        query(idDevis) {
          return `/ligneventedevis/${idDevis}`;
        },
        providesTags: ["Devis"],
      }),
      fetchYearDevis: builder.query<Devis[], number | void>({
        query() {
          return "/allDevisyear";
        },
        providesTags: ["Devis"],
      }),
      fetchMonthDevis: builder.query<Devis[], number | void>({
        query() {
          return "/allDevismonth";
        },
        providesTags: ["Devis"],
      }),
      fetchWeekDevis: builder.query<Devis[], number | void>({
        query() {
          return "/allDevisweek";
        },
        providesTags: ["Devis"],
      }),
      fetchDayDevis: builder.query<Devis[], number | void>({
        query() {
          return "/allDevisday";
        },
        providesTags: ["Devis"],
      }),
      addNewDevis: builder.mutation<void, Devis>({
        query(payload) {
          return {
            url: "/newDevis",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Devis"],
      }),
      deleteDevis: builder.mutation<void, number>({
        query: (idDevis) => ({
          url: `removeDevis/${idDevis}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Devis"],
      }),
    };
  },
});

export const {
  useGetDevisLigneVenteQuery,
  useFetchDayDevisQuery,
  useFetchMonthDevisQuery,
  useFetchWeekDevisQuery,
  useFetchYearDevisQuery,
  useAddNewDevisMutation,
  useGetDevisQuery,
  useDeleteDevisMutation,
} = devisSlice;
