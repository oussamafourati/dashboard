import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Compte } from "./compteSlice";
import type { RootState } from "../../app/store";

type AuthState = {
  results: Compte | null;
  token: string | null;
  message: string | null;
};

const slice = createSlice({
  name: "auth",
  initialState: { results: null, token: null, message: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { results, token, message },
      }: PayloadAction<{ results: Compte; token: string; message: string }>
    ) => {
      state.results = results;
      state.token = token;
      state.message = message;
    },
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.results;
