import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api";
import premadeSets from "../../data/premadeSets";
import { Set, EditableLocation } from "../../interfaces/Set";

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
        const updatedSets = state.customSets.filter((set) => set.id !== action.payload.setId);
        state.customSets = updatedSets;
      })
      .addCase(updateLocations.fulfilled, (state, action) => {
        const { setId, locations } = action.payload;
        const updatedCustomSets = [...state.customSets];
        const index = updatedCustomSets.findIndex((set) => set.id === setId);
        if (index !== -1) {
          updatedCustomSets[index].locations = locations;
        }
        state.customSets = updatedCustomSets;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        const { setId, locationId } = action.payload;
        const updatedCustomSets = state.customSets.map((set) => {
          if (set.id === setId) {
            const updatedLocations = set.locations.filter((location) => location.id !== locationId);
            return { ...set, locations: updatedLocations };
          }
          return set;
        });
        state.customSets = updatedCustomSets;
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
  await API.delete(`/sets/${setId}`);
  return { setId };
});

export const updateLocations = createAsyncThunk(
  "set/updateLocations",
  async (data: { setId: number; locations: EditableLocation[] }) => {
    const response = await API.post(`/locations`, data);
    return { setId: data.setId, locations: response.data };
  }
);

export const deleteLocation = createAsyncThunk(
  "set/deleteLocation",
  async (data: { setId: number; locationId: number }) => {
    await API.delete(`/locations/${data.locationId}`);
    return data;
  }
);

export default setSlice.reducer;
