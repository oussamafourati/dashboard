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
    };
  },
});

export const { useAddNewNoteMutation, useGetAllNotesQuery } = notesSlice;
