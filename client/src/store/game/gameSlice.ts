import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface GameState {
  players: number;
  spies: number;
  timer: number;
  set: number;
}

// Define the initial state using that type
const initialState: GameState = {
  players: 3,
  spies: 1,
  timer: 10,
  set: 1,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {}
});

export default gameSlice.reducer;
