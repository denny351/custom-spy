import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api";
import premadeSets from "../../data/premadeSets";
import { Set } from "../../interfaces/Set";

interface SetsState {
  premadeSets: Set[];
  customSets: Set[];
}

const initialState: SetsState = {
  premadeSets: premadeSets,
  customSets: [],
};

export const setSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSets.fulfilled, (state, action) => {
        state.customSets = action.payload;
      })
      .addCase(createSet.fulfilled, (state, action) => {
        const newSet = { ...action.payload, locations: [] };
        state.customSets = [...state.customSets, newSet];
      })
      .addCase(deleteSet.fulfilled, (state, action) => {
        state.customSets = action.payload;
      });
  },
});

export const getSets = createAsyncThunk("set/getSets", async () => {
  const response = await API.get("/sets");
  return response.data;
});

export const createSet = createAsyncThunk("set/createSet", async (name: string) => {
  const response = await API.post("/sets", { name });
  return response.data;
});

export const deleteSet = createAsyncThunk("set/deleteSet", async (setId: number) => {
  const response = await API.get(`/sets/${setId}`);
  return response.data;
});

export const {} = setSlice.actions;

export default setSlice.reducer;
