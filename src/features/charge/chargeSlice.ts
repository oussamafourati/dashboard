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
    baseUrl: "http://localhost:8000/charges/",
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
      getOneCharges: builder.query<Charges, number | void>({
        query(idCharges) {
          return `/oneCharge/${idCharges}`;
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
