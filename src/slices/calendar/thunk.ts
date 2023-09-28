import { createAsyncThunk } from "@reduxjs/toolkit";

export const getEvents = createAsyncThunk("calendar/getEvents", async () => {
  try {
  } catch (error) {
    return error;
  }
});

export const addNewEvent = createAsyncThunk(
  "calendar/addNewEvent",
  async (event: any) => {
    try {
    } catch (error) {
      return error;
    }
  }
);

export const updateEvent = createAsyncThunk(
  "calendar/updateEvent",
  async (event: any) => {
    try {
    } catch (error) {
      return error;
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "calendar/deleteEvent",
  async (event: any) => {
    try {
    } catch (error) {
      return error;
    }
  }
);

export const getCategories = createAsyncThunk(
  "calendar/getCategories",
  async () => {
    try {
    } catch (error) {
      return error;
    }
  }
);

export const getUpCommingEvent = createAsyncThunk(
  "calendar/getUpCommingEvent",
  async () => {
    try {
    } catch (error) {
      return error;
    }
  }
);

export const resetCalendar = createAsyncThunk(
  "calendar/resetCalendar",
  async (event: boolean) => {
    try {
      const response = "";
      return response;
    } catch (error) {
      return error;
    }
  }
);
