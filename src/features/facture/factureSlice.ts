import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Facture {
  idFacture: number;
  designationFacture?: string;
  dateFacturation?: string;
  datePaiement: string;
  modePaiement?: string;
  statusFacture: number;
  MontantTotal?: number;
  nomClient?: string;
  clientID?: number;
  adresse?: string;
  tel?: string;
  raison_sociale?: string;
  PU?: string;
  montantTtl?: string;
  quantiteProduit?: string;
  productName?: string;
  nomEmployee?:string;
  mat?: string;
}

export const facturetSlice = createApi({
  reducerPath: "facture",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.src.com.tn/factures/",
    headers: {
      "Content-type": "application/json",
    },
  }),
  tagTypes: ["Facture"],
  endpoints(builder) {
    return {
      // factures passager
      fetchFactures: builder.query<Facture[], number | void>({
        query() {
          return `/allFactures`;
        },
        providesTags: ["Facture"],
      }),
      // all factures
      fetchAllFacture: builder.query<Facture[], number | void>({
        query() {
          return `/allFacture`;
        },
        providesTags: ["Facture"],
      }),
      fetchFacturesPro: builder.query<Facture[], number | void>({
        query() {
          return `/facturesPro`;
        },
        providesTags: ["Facture"],
      }),
      fetchFacturesSixMonths: builder.query<Facture[], number | void>({
        query() {
          return `/facturessixmonths`;
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
      fetchFactureDay: builder.query<Facture[], number | void>({
        query() {
          return "/facturesday";
        },
        providesTags: ["Facture"],
      }),
      fetchFactureMonth: builder.query<Facture[], number | void>({
        query() {
          return "/facturesmonth";
        },
        providesTags: ["Facture"],
      }),
      fetchFactureLastMonth: builder.query<Facture[], number | void>({
        query() {
          return "/factureslastmonth";
        },
        providesTags: ["Facture"],
      }),
      fetchFacturesJanuary: builder.query<Facture[], number | void>({
        query() {
          return "/facturesJanuary";
        },
        providesTags: ["Facture"],
      }),
      fetchfacturesfebruary: builder.query<Facture[], number | void>({
        query() {
          return "/facturesfebruary";
        },
        providesTags: ["Facture"],
      }),
      fetchfacturesmarch: builder.query<Facture[], number | void>({
        query() {
          return "/facturesmarch";
        },
        providesTags: ["Facture"],
      }),
      fetchfacturesapril: builder.query<Facture[], number | void>({
        query() {
          return "/facturesapril";
        },
        providesTags: ["Facture"],
      }),
      fetchfacturesmay: builder.query<Facture[], number | void>({
        query() {
          return "/facturesmay";
        },
        providesTags: ["Facture"],
      }),
      fetchfacturesjuin: builder.query<Facture[], number | void>({
        query() {
          return "/facturesjuin";
        },
        providesTags: ["Facture"],
      }),
      fetchfacturesjuillet: builder.query<Facture[], number | void>({
        query() {
          return "/facturesjuillet";
        },
        providesTags: ["Facture"],
      }),
      fetchfacturesaugust: builder.query<Facture[], number | void>({
        query() {
          return "/facturesaugust";
        },
        providesTags: ["Facture"],
      }),
      fetchfacturesseptember: builder.query<Facture[], number | void>({
        query() {
          return "/facturesseptember";
        },
        providesTags: ["Facture"],
      }),
      fetchfacturesoctober: builder.query<Facture[], number | void>({
        query() {
          return "/facturesoctober";
        },
        providesTags: ["Facture"],
      }),
      fetchfacturesnovember: builder.query<Facture[], number | void>({
        query() {
          return "/facturesnovember";
        },
        providesTags: ["Facture"],
      }),
      fetchfacturesDecember: builder.query<Facture[], number | void>({
        query() {
          return "/facturesDecember";
        },
        providesTags: ["Facture"],
      }),
      fetchFactureYear: builder.query<Facture[], number | void>({
        query() {
          return "/facturesyear";
        },
        providesTags: ["Facture"],
      }),
      fetchFactureLastYear: builder.query<Facture[], number | void>({
        query() {
          return "/factureslastyear";
        },
        providesTags: ["Facture"],
      }),
      fetchFactureWeek: builder.query<Facture[], number | void>({
        query() {
          return "/facturesweek";
        },
        providesTags: ["Facture"],
      }),
      getFactureImpayeToDay: builder.query<Facture[], number | void>({
        query() {
          return "/factureimpayetoday";
        },
        providesTags: ["Facture"],
      }),
      getFactureImpayeThisMonth: builder.query<Facture[], number | void>({
        query() {
          return "/factureimpayethismonth";
        },
        providesTags: ["Facture"],
      }),
      getFactureImpayeThisYear: builder.query<Facture[], number | void>({
        query() {
          return "/factureimpayethisyear";
        },
        providesTags: ["Facture"],
      }),
      getFactureImpayeLastYear: builder.query<Facture[], number | void>({
        query() {
          return "/factureimpayelastyear";
        },
        providesTags: ["Facture"],
      }),
      getLigneVente: builder.query<Facture[], number | void>({
        query(idFacture) {
          return `/ligneventedufacture/${idFacture}`;
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
          method: "PUT",
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
  useGetLigneVenteQuery,
  useGetFactureImpayeLastYearQuery,
  useGetFactureImpayeThisMonthQuery,
  useGetFactureImpayeThisYearQuery,
  useGetFactureImpayeToDayQuery,
  useFetchFactureWeekQuery,
  useFetchFacturesSixMonthsQuery,
  useFetchFacturesJanuaryQuery,
  useFetchfacturesDecemberQuery,
  useFetchfacturesaprilQuery,
  useFetchfacturesaugustQuery,
  useFetchfacturesfebruaryQuery,
  useFetchfacturesjuilletQuery,
  useFetchfacturesjuinQuery,
  useFetchfacturesmarchQuery,
  useFetchfacturesmayQuery,
  useFetchfacturesnovemberQuery,
  useFetchfacturesoctoberQuery,
  useFetchfacturesseptemberQuery,
  useFetchFactureLastMonthQuery,
  useFetchAllFactureQuery,
  useFetchFactureDayQuery,
  useFetchFactureLastYearQuery,
  useFetchFactureMonthQuery,
  useFetchFactureYearQuery,
  useFetchFacturesProQuery,
  useFetchFactureImpayeQuery,
  useFetchFacturePayeQuery,
  useAddFactureMutation,
  useDeleteFactureMutation,
  useFetchFacturesQuery,
  useUpdateFactureMutation,
  useFetchOneFactureQuery,
} = facturetSlice;
