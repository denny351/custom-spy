import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import testSets from "../../testData/sets";
import { Set } from "../../interfaces/Set";

interface GameState {
  players: string[];
  spyCount: number;
  timer: number;
  sets: Set[];
  selectedSetId: number;
}

const initialState: GameState = {
  players: ["", "", ""],
  spyCount: 1,
  timer: 10,
  sets: testSets,
  selectedSetId: 1,
};

type SpyCountAndTimerActionPayload = { type: "set"; value: number } | { type: "increment" } | { type: "decrement" };

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<string[]>) => {
      state.players = action.payload;
    },
    setSpyCount: (state, action: PayloadAction<SpyCountAndTimerActionPayload>) => {
      switch (action.payload.type) {
        case "set":
          state.spyCount = action.payload.value;
          break;
        case "increment":
          if (state.spyCount < state.players.length - 1) {
            state.spyCount += 1;
          }
          break;
        case "decrement":
          if (state.spyCount > 1) {
            state.spyCount -= 1;
          }
          break;
        default:
          break;
      }
    },
    setTimer: (state, action: PayloadAction<SpyCountAndTimerActionPayload>) => {
      switch (action.payload.type) {
        case "set":
          state.timer = action.payload.value;
          break;
        case "increment":
          state.timer += 1;
          break;
        case "decrement":
          if (state.timer > 1) {
            state.timer -= 1;
          }
          break;
        default:
          break;
      }
    },
    setSets: (state, action) => {
      state.sets = action.payload;
    },
    setSelectedSetId: (state, action) => {
      state.selectedSetId = action.payload;
    },
  },
});

export const { setPlayers, setSpyCount, setTimer, setSets, setSelectedSetId } = gameSlice.actions;

export default gameSlice.reducer;
