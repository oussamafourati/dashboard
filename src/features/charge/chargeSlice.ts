import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Charges {
  idCharges: number;
  typeCharges: string;
  montantCharges: number;
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
      getSommeCharges: builder.query<Charges, number | void>({
        query() {
          return "/sommeCharges";
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
  useGetOneChargesQuery,
  useGetAllChargesQuery,
  useAddChargeMutation,
  useUpdateChargeMutation,
  useDeleteChargesMutation,
  useGetSommeChargesQuery,
} = chargesSlice;