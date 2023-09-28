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
    baseUrl: "http://localhost:8000/notes/",
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
  useFetchNotesDayQuery,
  useAddNewNoteMutation,
  useGetAllNotesQuery,
  useRemoveNoteMutation,
} = notesSlice;
