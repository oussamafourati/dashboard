import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Echance {
  idEchance: number;
  montant: string;
  dateEchance: string;
  numCheque?: string;
  nomBanque?: string;
  numeroFacture: string;
  nomClient: string;
}

export const echanceSlice = createApi({
  reducerPath: "echance",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/echance/",
  }),
  tagTypes: ["Echance"],
  endpoints(builder) {
    return {
      getAllEchances: builder.query<Echance[], number | void>({
        query() {
          return "/allEchances";
        },
        providesTags: ["Echance"],
      }),
      getDayEchances: builder.query<Echance[], number | void>({
        query() {
          return "/alldayEchances";
        },
        providesTags: ["Echance"],
      }),
      getWeekEchances: builder.query<Echance[], number | void>({
        query() {
          return "/weekechances";
        },
        providesTags: ["Echance"],
      }),
      getMonthEchances: builder.query<Echance[], number | void>({
        query() {
          return "/monthechances";
        },
        providesTags: ["Echance"],
      }),
      getNextMonthEchances: builder.query<Echance[], number | void>({
        query() {
          return "/nextmonth";
        },
        providesTags: ["Echance"],
      }),
      getOneEchance: builder.query<Echance, number | void>({
        query(idEchance) {
          return `/oneEchance/${idEchance}`;
        },
        providesTags: ["Echance"],
      }),
      addNewEchance: builder.mutation<void, Echance>({
        query(payload) {
          return {
            url: "/newEchance",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Echance"],
      }),
    };
  },
});

export const {
  useGetDayEchancesQuery,
  useGetMonthEchancesQuery,
  useGetNextMonthEchancesQuery,
  useGetWeekEchancesQuery,
  useAddNewEchanceMutation,
  useGetAllEchancesQuery,
  useGetOneEchanceQuery,
} = echanceSlice;
