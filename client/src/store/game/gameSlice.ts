import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import premadeSets from "../../data/premadeSets";
import { SelectedSet, Set } from "../../interfaces/Set";

interface GameState {
  players: string[];
  spyCount: number;
  timer: number;
  premadeSets: Set[];
  customSets: Set[];
  selectedSet: SelectedSet;
}

const initialState: GameState = {
  players: ["", "", ""],
  spyCount: 1,
  timer: 10,
  premadeSets: premadeSets,
  customSets: [],
  selectedSet: { type: "premade", id: 1 },
};

type SpyCountAndTimerActionPayload = { type: "set"; value: number } | { type: "increment" } | { type: "decrement" };

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<string[]>) => {
      state.players = action.payload;
    },
    setBlankPlayers: (state) => {
      state.players = state.players.map((player, index) => (player.trim() === "" ? `Player ${index + 1}` : player));
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
    setCustomSets: (state, action) => {
      state.customSets = action.payload;
    },
    setSelectedSet: (state, action: PayloadAction<SelectedSet>) => {
      state.selectedSet = { type: action.payload.type, id: action.payload.id };
    },
    resetState: () => initialState,
  },
});

export const { setPlayers, setBlankPlayers, setSpyCount, setTimer, setCustomSets, setSelectedSet, resetState } =
  gameSlice.actions;

export default gameSlice.reducer;
