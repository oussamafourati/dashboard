import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Notes {
  idNote: number;
  nomNote: string;
  description: string;
  created_at: string;
}

export const notesSlice = createApi({
  reducerPath: "notes",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.src.com.tn/notes/",
  }),
  tagTypes: ["Notes"],
  endpoints(builder) {
    return {
      getAllNotes: builder.query<Notes[], number | void>({
        query() {
          return "/allNotes";
        },
        providesTags: ["Notes"],
      }),
      fetchNotesDay: builder.query<Notes[], number | void>({
        query() {
          return "/notesToDay";
        },
        providesTags: ["Notes"],
      }),
      fetchNotesWeek: builder.query<Notes[], number | void>({
        query() {
          return "/notesThisWeek";
        },
        providesTags: ["Notes"],
      }),
      fetchNotesMonth: builder.query<Notes[], number | void>({
        query() {
          return "/notesThisMonth";
        },
        providesTags: ["Notes"],
      }),
      fetchNotesNextMonth: builder.query<Notes[], number | void>({
        query() {
          return "/notesNextMonth";
        },
        providesTags: ["Notes"],
      }),
      addNewNote: builder.mutation<void, Notes>({
        query(payload) {
          return {
            url: "/newNote",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Notes"],
      }),
      removeNote: builder.mutation<void, number>({
        query: (idNote) => ({
          url: `removeNote/${idNote}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Notes"],
      }),
    };
  },
});

export const {
  useFetchNotesMonthQuery,
  useFetchNotesNextMonthQuery,
  useFetchNotesWeekQuery,
  useFetchNotesDayQuery,
  useAddNewNoteMutation,
  useGetAllNotesQuery,
  useRemoveNoteMutation,
} = notesSlice;
