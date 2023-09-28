import { createAsyncThunk } from "@reduxjs/toolkit";
//Include Both Helper File with needed methods

export const getChartData = createAsyncThunk(
  "dashboard/getChartData",
  async (data: any) => {
    try {
      var response;

      return response;
    } catch (error) {
      return error;
    }
  }
);
