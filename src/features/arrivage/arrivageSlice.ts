import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Arrivage {
  idArrivage: number;
  designation: string;
  montantTotal: string;
  dateArrivage: string;
  raison_sociale: string;
  fournisseurID?: number;
  piecejointe: string;
  value_occurrence?: number;
  TOTAL_ARRIVAGE?: string;
}

export const arrivageSlice = createApi({
  reducerPath: "arrivage",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:8000/arrivage/",
    baseUrl: "https://app.src.smartschools.tn/arrivage/",
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
      fetchTopFournisseur: builder.query<Arrivage[], number | void>({
        query() {
          return "/topfournisseur";
        },
        providesTags: ["Arrivage"],
      }),
      getArrivagesSixMonths: builder.query<Arrivage[], number | void>({
        query() {
          return "/allArrivageSixMonth";
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
      getLastYearArrivage: builder.query<Arrivage[], number | void>({
        query() {
          return `/ArrivageLastYear`;
        },
        providesTags: ["Arrivage"],
      }),
      getThisYearArrivage: builder.query<Arrivage[], number | void>({
        query() {
          return `/ArrivageThisYear`;
        },
        providesTags: ["Arrivage"],
      }),
      getThisMonthArrivage: builder.query<Arrivage[], number | void>({
        query() {
          return `/thisMonthArrivage`;
        },
        providesTags: ["Arrivage"],
      }),
      getToDayArrivage: builder.query<Arrivage[], number | void>({
        query() {
          return `/ArrivageToDay`;
        },
        providesTags: ["Arrivage"],
      }),
      getArrivageDec: builder.query<Arrivage[], number | void>({
        query() {
          return `/allArrivageDec`;
        },
        providesTags: ["Arrivage"],
      }),
      getArrivageNov: builder.query<Arrivage[], number | void>({
        query() {
          return `/allArrivageNov`;
        },
        providesTags: ["Arrivage"],
      }),
      getArrivageOct: builder.query<Arrivage[], number | void>({
        query() {
          return `/allArrivageOct`;
        },
        providesTags: ["Arrivage"],
      }),
      getArrivageSep: builder.query<Arrivage[], number | void>({
        query() {
          return `/allArrivageSep`;
        },
        providesTags: ["Arrivage"],
      }),
      getArrivageAug: builder.query<Arrivage[], number | void>({
        query() {
          return `/allArrivageAug`;
        },
        providesTags: ["Arrivage"],
      }),
      getArrivageJuly: builder.query<Arrivage[], number | void>({
        query() {
          return `/allArrivageJuly`;
        },
        providesTags: ["Arrivage"],
      }),
      getArrivageJuin: builder.query<Arrivage[], number | void>({
        query() {
          return `/allArrivageJuin`;
        },
        providesTags: ["Arrivage"],
      }),
      getArrivageMay: builder.query<Arrivage[], number | void>({
        query() {
          return `/allArrivageMay`;
        },
        providesTags: ["Arrivage"],
      }),
      getArrivageApr: builder.query<Arrivage[], number | void>({
        query() {
          return `/allArrivageApr`;
        },
        providesTags: ["Arrivage"],
      }),
      getArrivageMar: builder.query<Arrivage[], number | void>({
        query() {
          return `/allArrivageMar`;
        },
        providesTags: ["Arrivage"],
      }),
      getArrivageFeb: builder.query<Arrivage[], number | void>({
        query() {
          return `/allArrivageFeb`;
        },
        providesTags: ["Arrivage"],
      }),
      getArrivageJan: builder.query<Arrivage[], number | void>({
        query() {
          return `/allArrivageJan`;
        },
        providesTags: ["Arrivage"],
      }),
      getArrivageWeek: builder.query<Arrivage[], number | void>({
        query() {
          return `/allweekArrivage`;
        },
        providesTags: ["Arrivage"],
      }),
      fetchArrivageMonth: builder.query<Arrivage[], number | void>({
        query() {
          return `/thisMonthArrivage`;
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
  useFetchArrivageMonthQuery,
  useFetchTopFournisseurQuery,
  useGetArrivageWeekQuery,
  useGetArrivagesSixMonthsQuery,
  useGetArrivageAprQuery,
  useGetArrivageAugQuery,
  useGetArrivageDecQuery,
  useGetArrivageFebQuery,
  useGetArrivageJanQuery,
  useGetArrivageJuinQuery,
  useGetArrivageJulyQuery,
  useGetArrivageMarQuery,
  useGetArrivageMayQuery,
  useGetArrivageNovQuery,
  useGetArrivageOctQuery,
  useGetArrivageSepQuery,
  useGetToDayArrivageQuery,
  useGetThisMonthArrivageQuery,
  useGetThisYearArrivageQuery,
  useGetLastYearArrivageQuery,
  useGetArrivageByFournisseurQuery,
  useAddArrivageMutation,
  useDeleteArrivageMutation,
  useGetAllArrivagesQuery,
  useGetOneArrivageQuery,
  useUpdateArrivageMutation,
} = arrivageSlice;
