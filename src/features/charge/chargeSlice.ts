import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Charges {
  idCharges: number;
  typeCharges: string;
  montantCharges: string;
  dateCharges: string;
  descriptionCharge: string;
  piecejointes: string;
}

export const chargesSlice = createApi({
  reducerPath: "charges",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.src.com.tn/charges/",
  }),
  tagTypes: ["Charges"],
  endpoints(builder) {
    return {
      getAllCharges: builder.query<Charges[], number | void>({
        query() {
          return "/allCharges";
        },
        providesTags: ["Charges"],
      }),
      getChargeAnnee: builder.query<Charges[], number | void>({
        query() {
          return `/anneeCharges`;
        },
        providesTags: ["Charges"],
      }),
      getChargeDay: builder.query<Charges[], number | void>({
        query() {
          return `/dayCharges`;
        },
        providesTags: ["Charges"],
      }),
      getChargeMonth: builder.query<Charges[], number | void>({
        query() {
          return `/moisCharges`;
        },
        providesTags: ["Charges"],
      }),
      getChargeWeek: builder.query<Charges[], number | void>({
        query() {
          return `/weekCharges`;
        },
        providesTags: ["Charges"],
      }),
      getChargeThreeMonths: builder.query<Charges[], number | void>({
        query() {
          return `/lastCharges`;
        },
        providesTags: ["Charges"],
      }),
      getChargeLastYear: builder.query<Charges[], number | void>({
        query() {
          return `/lastYearCharges`;
        },
        providesTags: ["Charges"],
      }),
      getOneCharges: builder.query<Charges, number | void>({
        query(idCharges) {
          return `/oneCharge/${idCharges}`;
        },
        providesTags: ["Charges"],
      }),
      getAllChargesJav: builder.query<Charges[], number | void>({
        query() {
          return "/allChargesJan";
        },
        providesTags: ["Charges"],
      }),
      getAllChargesFeb: builder.query<Charges[], number | void>({
        query() {
          return "/allChargesFeb";
        },
        providesTags: ["Charges"],
      }),
      getAllChargesMar: builder.query<Charges[], number | void>({
        query() {
          return "/allChargesMar";
        },
        providesTags: ["Charges"],
      }),
      getAllChargesApr: builder.query<Charges[], number | void>({
        query() {
          return "/allChargesApr";
        },
        providesTags: ["Charges"],
      }),
      getAllChargesMay: builder.query<Charges[], number | void>({
        query() {
          return "/allChargesMay";
        },
        providesTags: ["Charges"],
      }),
      getAllChargesJuin: builder.query<Charges[], number | void>({
        query() {
          return "/allChargesJuin";
        },
        providesTags: ["Charges"],
      }),
      getAllChargesJuly: builder.query<Charges[], number | void>({
        query() {
          return "/allChargesJuly";
        },
        providesTags: ["Charges"],
      }),
      getAllChargesAug: builder.query<Charges[], number | void>({
        query() {
          return "/allChargesAug";
        },
        providesTags: ["Charges"],
      }),
      getAllChargesSep: builder.query<Charges[], number | void>({
        query() {
          return "/allChargesSep";
        },
        providesTags: ["Charges"],
      }),
      getAllChargesOct: builder.query<Charges[], number | void>({
        query() {
          return "/allChargesOct";
        },
        providesTags: ["Charges"],
      }),
      getAllChargesNov: builder.query<Charges[], number | void>({
        query() {
          return "/allChargesNov";
        },
        providesTags: ["Charges"],
      }),
      getAllChargesDec: builder.query<Charges[], number | void>({
        query() {
          return "/allChargesDec";
        },
        providesTags: ["Charges"],
      }),
      getAllChargesSixMonths: builder.query<Charges[], number | void>({
        query() {
          return "/allChargessixmonths";
        },
        providesTags: ["Charges"],
      }),
      fetchAllChargesin3days: builder.query<Charges[], number | void>({
        query() {
          return "/3daysCharges";
        },
        providesTags: ["Charges"],
      }),
      fetchAllChargesin2days: builder.query<Charges[], number | void>({
        query() {
          return "/2daysCharges";
        },
        providesTags: ["Charges"],
      }),
      fetchAllChargesin1day: builder.query<Charges[], number | void>({
        query() {
          return "/1daysCharges";
        },
        providesTags: ["Charges"],
      }),
      addCharge: builder.mutation<void, Charges>({
        query(payload) {
          return {
            url: "/newCharges",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Charges"],
      }),
      updateCharge: builder.mutation<void, Charges>({
        query: ({ idCharges, ...rest }) => ({
          url: `/editCharges/${idCharges}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["Charges"],
      }),
      deleteCharges: builder.mutation<void, number>({
        query: (idCharges) => ({
          url: `removeCharges/${idCharges}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Charges"],
      }),
    };
  },
});

export const {
  useFetchAllChargesin1dayQuery,
  useFetchAllChargesin2daysQuery,
  useFetchAllChargesin3daysQuery,
  useGetAllChargesSixMonthsQuery,
  useGetAllChargesAprQuery,
  useGetAllChargesAugQuery,
  useGetAllChargesDecQuery,
  useGetAllChargesFebQuery,
  useGetAllChargesJavQuery,
  useGetAllChargesJuinQuery,
  useGetAllChargesJulyQuery,
  useGetAllChargesMarQuery,
  useGetAllChargesMayQuery,
  useGetAllChargesNovQuery,
  useGetAllChargesOctQuery,
  useGetAllChargesSepQuery,
  useGetChargeLastYearQuery,
  useGetChargeThreeMonthsQuery,
  useGetChargeWeekQuery,
  useGetChargeMonthQuery,
  useGetChargeDayQuery,
  useGetChargeAnneeQuery,
  useGetOneChargesQuery,
  useGetAllChargesQuery,
  useAddChargeMutation,
  useUpdateChargeMutation,
  useDeleteChargesMutation,
} = chargesSlice;
